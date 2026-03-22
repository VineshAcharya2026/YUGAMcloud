import { LeaveTable } from "@/components/leave/LeaveTable";
import { ApplyLeaveDialog } from "@/components/leave/ApplyLeaveDialog";
import { Button } from "@/components/ui/button";
import { Send, CalendarDays } from "lucide-react";
import { StatCard } from "@/components/shared/StatCard";

export default function LeavePage() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-[1400px] mx-auto pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-surface rounded-2xl p-6 border border-border shadow-sm">
        <div>
          <h1 className="text-[28px] font-display font-bold text-text-1 tracking-tight">Leave Management</h1>
          <p className="text-text-3 font-medium mt-1">Apply for leaves, track balances, and manage approvals</p>
        </div>
        
        <div className="flex items-center gap-3">
          <ApplyLeaveDialog>
            <Button className="bg-brand-600 hover:bg-brand-700 text-white font-medium shadow-sm shadow-brand-600/20">
              <Send className="mr-2 h-4 w-4" />
              Apply Leave
            </Button>
          </ApplyLeaveDialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1 space-y-4">
          <StatCard 
            icon={<CalendarDays className="w-5 h-5 text-brand-600" />} 
            value="12" 
            label="Annual Leaves Left"
          />
          <StatCard 
            icon={<CalendarDays className="w-5 h-5 text-amber-600" />} 
            value="3" 
            label="Sick Leaves Left"
          />
        </div>
        <div className="bg-surface rounded-2xl p-6 border border-border shadow-sm md:col-span-3 min-h-[500px]">
          <h3 className="text-lg font-bold mb-4">Leave History</h3>
          <LeaveTable />
        </div>
      </div>
    </div>
  );
}
