import { PipelineBoard } from "@/components/placement/PipelineBoard";
import { Button } from "@/components/ui/button";
import { Briefcase } from "lucide-react";

export default function PlacementPage() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-[1400px] mx-auto pb-10 h-[calc(100vh-120px)]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-surface rounded-2xl p-6 border border-border shadow-sm shrink-0">
        <div>
          <h1 className="text-[28px] font-display font-bold text-text-1 tracking-tight">Placement Pipeline</h1>
          <p className="text-text-3 font-medium mt-1">Track student interviews, offers, and placement success</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button className="bg-brand-600 hover:bg-brand-700 text-white font-medium shadow-sm shadow-brand-600/20">
            <Briefcase className="mr-2 h-4 w-4" />
            Add Application
          </Button>
        </div>
      </div>

      <div className="flex-1 min-h-0 bg-surface rounded-2xl p-6 border border-border shadow-sm">
        <PipelineBoard />
      </div>
    </div>
  );
}
