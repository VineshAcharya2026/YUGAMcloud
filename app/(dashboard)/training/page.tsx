import { CourseCatalog } from "@/components/training/CourseCatalog";
import { Button } from "@/components/ui/button";
import { GraduationCap } from "lucide-react";

export default function TrainingPage() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-[1400px] mx-auto pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-surface rounded-2xl p-6 border border-border shadow-sm">
        <div>
          <h1 className="text-[28px] font-display font-bold text-text-1 tracking-tight">YUGAMCLOUD.ai Training</h1>
          <p className="text-text-3 font-medium mt-1">Access premium courses like Snowflake, Next.js, and Cloud</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button className="bg-brand-600 hover:bg-brand-700 text-white font-medium shadow-sm shadow-brand-600/20">
            <GraduationCap className="mr-2 h-4 w-4" />
            My Enrollments
          </Button>
        </div>
      </div>

      <div className="min-h-[500px]">
        <CourseCatalog />
      </div>
    </div>
  );
}
