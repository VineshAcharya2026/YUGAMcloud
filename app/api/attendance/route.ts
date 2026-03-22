import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET(request: Request) {
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

    const records = await prisma.attendance.findMany({
      where: whereClause,
      include: {
        employee: {
          include: { user: { select: { name: true, email: true } } }
        }
      },
      orderBy: { date: 'desc' },
      take: 100 // limit to last 100 records for performance
    });

    return NextResponse.json({ success: true, data: records }, { status: 200 });
  } catch (error) {
    console.error("GET /api/attendance error:", error);
    return NextResponse.json({ success: false, error: { message: "Internal Server Error" } }, { status: 500 });
  }
}
