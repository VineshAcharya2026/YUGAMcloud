import { MetricsDashboard } from "@/components/reports/MetricsDashboard";
import { Button } from "@/components/ui/button";
import { Download, Filter } from "lucide-react";

export default function ReportsPage() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-[1400px] mx-auto pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-surface rounded-2xl p-6 border border-border shadow-sm">
        <div>
          <h1 className="text-[28px] font-display font-bold text-text-1 tracking-tight">HR Intelligence & Reports</h1>
          <p className="text-text-3 font-medium mt-1">Analytics, performance metrics, and organization insights</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-border text-text-2 hover:bg-surface-2 hidden sm:flex">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button className="bg-brand-600 hover:bg-brand-700 text-white font-medium shadow-sm shadow-brand-600/20">
            <Download className="mr-2 h-4 w-4" />
            Export Full Report
          </Button>
        </div>
      </div>

      <MetricsDashboard />
    </div>
  );
}
