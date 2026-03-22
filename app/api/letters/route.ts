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

    const records = await prisma.letter.findMany({
      where: whereClause,
      include: {
        employee: {
          include: { user: { select: { name: true } } }
        }
      },
      orderBy: { issuedAt: 'desc' }
    });

    return NextResponse.json({ success: true, data: records }, { status: 200 });
  } catch (error) {
    console.error("GET /api/letters error:", error);
    return NextResponse.json({ success: false, error: { message: "Internal Server Error" } }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session || !["ADMIN", "HR"].includes(session.user.role as string)) {
      return NextResponse.json({ success: false, error: { message: "Unauthorized" } }, { status: 403 });
    }
    const body = await request.json();
    const { empId, type } = body;

    // Generate reference code
    const dateStr = new Date().toISOString().split('T')[0].replace(/-/g, '');
    const referenceNo = `YAI-${type.substring(0, 3)}-${dateStr}-${Math.floor(Math.random() * 1000)}`;

    const letter = await prisma.letter.create({
      data: {
        employee: { connect: { empId } },
        type: type as any,
        issuedBy: session.user.id,
        designation: "Software Engineer",
        department: "ENGINEERING",
        content: `{"content": "This is an automatically generated placeholder content for a ${type} letter for employee ${empId}. In a full implementation, this uses PDF rendering."}`
      }
    });

    return NextResponse.json({ success: true, data: letter }, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/letters error:", error);
    return NextResponse.json({ success: false, error: { message: "Internal Server Error" } }, { status: 500 });
  }
}
