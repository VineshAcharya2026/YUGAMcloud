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

    const records = await prisma.leaveRequest.findMany({
      where: whereClause,
      include: {
        employee: {
          include: { user: { select: { name: true } } }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ success: true, data: records }, { status: 200 });
  } catch (error) {
    console.error("GET /api/leave error:", error);
    return NextResponse.json({ success: false, error: { message: "Internal Server Error" } }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ success: false, error: { message: "Unauthorized" } }, { status: 401 });

    const body = await request.json();
    const { type, startDate, endDate, reason } = body;
    const empId = session.user.empId;

    if (!empId) {
      return NextResponse.json({ success: false, error: { message: "Employee profile not found" } }, { status: 400 });
    }

    const leaveRequest = await prisma.leaveRequest.create({
      data: {
        employeeId: empId,
        type: type as any,
        fromDate: new Date(startDate),
        toDate: new Date(endDate),
        days: 1, // simplified assumption for demo
        reason,
        status: "PENDING"
      }
    });

    return NextResponse.json({ success: true, data: leaveRequest }, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/leave error:", error);
    return NextResponse.json({ success: false, error: { message: "Internal Server Error" } }, { status: 500 });
  }
}
