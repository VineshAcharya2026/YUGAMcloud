import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const session = await auth();
    if (!session || !["ADMIN", "HR"].includes(session.user.role as string)) {
      return NextResponse.json({ success: false, error: { code: "UNAUTHORIZED", message: "Unauthorized access" } }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const department = searchParams.get("department");
    
    const where: any = {
      ...(department && department !== "ALL" ? { department } : {}),
      user: {
        name: { contains: search, mode: 'insensitive' }
      }
    };

    const employees = await prisma.employee.findMany({
      where,
      include: {
        user: { select: { name: true, email: true, avatar: true } }
      },
      orderBy: { joinedAt: 'desc' }
    });

    return NextResponse.json({ success: true, data: employees }, { status: 200 });
  } catch (error) {
    console.error("GET /api/employees error:", error);
    return NextResponse.json({ success: false, error: { code: "SERVER_ERROR", message: "Internal Server Error" } }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session || !["ADMIN", "HR"].includes(session.user.role as string)) {
      return NextResponse.json({ success: false, error: { message: "Unauthorized" } }, { status: 403 });
    }
    const body = await request.json();
    const { name, email, department, designation, salary, joinedAt, status } = body;

    const count = await prisma.employee.count();
    const empId = `YAI-${String(count + 1).padStart(3, '0')}`;
    const bcrypt = await import("bcryptjs");
    const hashedPassword = await bcrypt.hash("password123", 10);

    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: { name, email, password: hashedPassword, role: "EMPLOYEE" }
      });
      const employee = await tx.employee.create({
        data: {
          empId,
          userId: user.id,
          department,
          designation,
          salary: Number(salary),
          joinedAt: new Date(joinedAt),
          status,
        }
      });
      return employee;
    });

    return NextResponse.json({ success: true, data: result }, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/employees error:", error);
    if (error.code === 'P2002') return NextResponse.json({ success: false, error: { message: "Email already exists" } }, { status: 400 });
    return NextResponse.json({ success: false, error: { message: "Internal Server Error" } }, { status: 500 });
  }
}

