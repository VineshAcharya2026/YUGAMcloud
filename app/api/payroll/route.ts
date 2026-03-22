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

    const records = await prisma.payslip.findMany({
      where: whereClause,
      include: {
        employee: {
          include: { user: { select: { name: true } } }
        }
      },
      orderBy: [
        { year: 'desc' },
        { month: 'desc' }
      ]
    });

    return NextResponse.json({ success: true, data: records }, { status: 200 });
  } catch (error) {
    console.error("GET /api/payroll error:", error);
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
    const { month, year } = body;

    // Simulate batch processing
    const activeEmployees = await prisma.employee.findMany({
      where: { status: "ACTIVE" }
    });

    // In a real scenario, this would calculate per-employee deductions based on attendance
    let count = 0;
    
    await prisma.$transaction(async (tx: any) => {
      for (const emp of activeEmployees) {
        // Check if already processed
        const existing = await tx.payslip.findFirst({
          where: { employeeId: emp.id, month, year }
        });
        
        if (!existing) {
          const basicPay = emp.salary * 0.6;
          const allowances = emp.salary * 0.4;
          const deductions = 0; // Tax or PF
          
          await tx.payslip.create({
            data: {
              employeeId: emp.id,
              month,
              year,
              basicSalary: basicPay,
              hra: allowances * 0.4,
              transportAll: allowances * 0.2,
              medicalAll: allowances * 0.1,
              perfBonus: allowances * 0.3,
              pfDeduction: deductions * 0.5,
              esiDeduction: deductions * 0.1,
              profTax: deductions * 0.1,
              tdsDeduction: deductions * 0.3,
              grossEarnings: basicPay + allowances,
              totalDeductions: deductions,
              netPay: basicPay + allowances - deductions,
              status: "GENERATED"
            }
          });
          count++;
        }
      }
    });

    return NextResponse.json({ success: true, count }, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/payroll error:", error);
    return NextResponse.json({ success: false, error: { message: "Internal Server Error" } }, { status: 500 });
  }
}
