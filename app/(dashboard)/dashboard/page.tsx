import { DashboardBanner } from "@/components/dashboard/DashboardBanner"
import { StatCard } from "@/components/shared/StatCard"
import { Users, Briefcase, GraduationCap, Wallet } from "lucide-react"
import { AttendanceChart } from "@/components/charts/AttendanceChart"
import { PayrollTrend } from "@/components/charts/PayrollTrend"
import { ActivityFeed } from "@/components/dashboard/ActivityFeed"
import { QuickActions } from "@/components/dashboard/QuickActions"
import { auth } from "@/lib/auth";
import { format } from "date-fns";

export default async function DashboardPage() {
  const session = await auth();
  const firstName = session?.user?.name?.split(" ")[0] || "User";

  return (
    <div className="pe">
      <div className="ch">
        <div style={{fontSize: '26px', fontWeight: 700, letterSpacing: '-.3px'}}>Home</div>
        <div style={{fontSize: '13px', color: 'var(--t2)', marginTop: '3px'}}>
          {'Good morning, ' + firstName + ' 👋 · ' + format(new Date(), "EEEE, MMMM do, yyyy")}
        </div>
      </div>
      
      <div className="cb">
        <DashboardBanner />
        
        {/* 4 Stat Cards */}
        <div className="sg">
          <StatCard 
            icon={<Users className="w-[18px] h-[18px] text-brand-500" />} 
            value="247" 
            label="Total Employees" 
            trend={12} 
            trendLabel="vs last month"
          />
          <StatCard 
            icon={<Briefcase className="w-[18px] h-[18px] text-emerald-500" />} 
            value="89%" 
            label="Placement Rate" 
            trend={5} 
            trendLabel="vs last month"
            valueColor="text-emerald-600"
          />
          <StatCard 
            icon={<GraduationCap className="w-[18px] h-[18px] text-violet-500" />} 
            value="63" 
            label="Active Trainees" 
            trend={-2} 
            trendLabel="vs last month"
          />
          <StatCard 
            icon={<Wallet className="w-[18px] h-[18px] text-accent-cyan" />} 
            value="₹28.4L" 
            label="Monthly Payroll" 
            trend={8} 
            trendLabel="vs last month"
          />
        </div>

        {/* Charts Row */}
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px'}}>
          <AttendanceChart />
          <PayrollTrend />
        </div>

        {/* Bottom Row */}
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px'}}>
          <ActivityFeed />
          <QuickActions />
        </div>
      </div>
    </div>
  )
}
