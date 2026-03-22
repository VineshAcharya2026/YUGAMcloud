import { PayrollTable } from "@/components/payroll/PayrollTable";
import { ProcessPayrollDialog } from "@/components/payroll/ProcessPayrollDialog";
import { Button } from "@/components/ui/button";
import { CopyPlus, TrendingUp } from "lucide-react";
import { StatCard } from "@/components/shared/StatCard";
import { prisma } from "@/lib/prisma";

export default async function PayrollPage() {
  // Get quick stats for the summary widget
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  
  const payrolls = await prisma.payslip.findMany({
    where: { month: currentMonth, year: currentYear }
  });
  
  const totalCost = payrolls.reduce((acc: number, curr: any) => acc + curr.netPay, 0);
  const formattedTCT = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(totalCost);

  return (
    <div className="pe">
      <div className="ch">
        <div className="pt">
          <div>
            <div style={{fontSize: '26px', fontWeight: 700}}>Payroll Management</div>
            <div style={{fontSize: '13px', color: 'var(--t2)', marginTop: '2px'}}>Process salaries, generate payslips, and preview expenses</div>
          </div>
          <div style={{display: 'flex', gap: '8px', alignItems: 'center'}}>
            <ProcessPayrollDialog>
              <Button className="btn btn-pri">
                <CopyPlus className="mr-2 h-[14px] w-[14px]" />
                Process Payroll Batch
              </Button>
            </ProcessPayrollDialog>
          </div>
        </div>
      </div>

      <div className="cb">
        <div className="sg">
          <StatCard 
            icon={<TrendingUp className="w-[18px] h-[18px] text-brand-600" />} 
            value={formattedTCT} 
            label={`Total Cost (${new Date().toLocaleString('default', { month: 'short' })})`}
            valueColor="text-brand-600"
          />
        </div>
        <div style={{marginTop: '20px', minHeight: '500px'}}>
          <div style={{fontSize: '16px', fontWeight: 700, marginBottom: '16px'}}>Salary Distribution History</div>
          <PayrollTable />
        </div>
      </div>
    </div>
  );
}
