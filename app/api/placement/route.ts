import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ success: false, error: { message: "Unauthorized" } }, { status: 401 });

    const role = session.user.role;
    const empId = session.user.empId;

    let whereClause = {};
    if (role === "EMPLOYEE" || role === "CANDIDATE") {
      if (!empId) return NextResponse.json({ success: false, error: { message: "No employee record found" } }, { status: 404 });
      whereClause = { employee: { empId } };
    }

    const records = await prisma.placementRecord.findMany({
      where: whereClause,
      include: {
        employee: {
          include: { user: { select: { name: true } } }
        }
      },
      orderBy: { offerDate: 'desc' }
    });

    const mapped = records.map((r: any) => ({
      ...r,
      role: r.designation,
      packageValue: r.ctcLPA,
      status: "SELECTED",
    }));

    return NextResponse.json({ success: true, data: mapped });
  } catch (error) {
    return NextResponse.json({ success: false, error: { message: "Internal Server Error" } }, { status: 500 });
  }
}
