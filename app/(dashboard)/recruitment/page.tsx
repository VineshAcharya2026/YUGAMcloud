import { JobBoard } from "@/components/recruitment/JobBoard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function RecruitmentPage() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-[1400px] mx-auto pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-surface rounded-2xl p-6 border border-border shadow-sm">
        <div>
          <h1 className="text-[28px] font-display font-bold text-text-1 tracking-tight">Recruitment Pipeline</h1>
          <p className="text-text-3 font-medium mt-1">Manage job postings, candidates, and interview schedules</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button className="bg-brand-600 hover:bg-brand-700 text-white font-medium shadow-sm shadow-brand-600/20">
            <Plus className="mr-2 h-4 w-4" />
            Post New Job
          </Button>
        </div>
      </div>

      <div className="min-h-[500px]">
        <JobBoard />
      </div>
    </div>
  );
}
