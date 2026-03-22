import { LettersTable } from "@/components/letters/LettersTable";
import { GenerateLetterDialog } from "@/components/letters/GenerateLetterDialog";
import { Button } from "@/components/ui/button";
import { FileText, Download } from "lucide-react";

export default function LettersPage() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-[1400px] mx-auto pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-surface rounded-2xl p-6 border border-border shadow-sm">
        <div>
          <h1 className="text-[28px] font-display font-bold text-text-1 tracking-tight">Official Letters</h1>
          <p className="text-text-3 font-medium mt-1">Generate, track, and download official HR documents</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-border text-text-2 hover:bg-surface-2 hidden sm:flex">
            <Download className="mr-2 h-4 w-4" />
            Bulk Export
          </Button>
          
          <GenerateLetterDialog>
            <Button className="bg-brand-600 hover:bg-brand-700 text-white font-medium shadow-sm shadow-brand-600/20">
              <FileText className="mr-2 h-4 w-4" />
              Generate Letter
            </Button>
          </GenerateLetterDialog>
        </div>
      </div>

      <div className="bg-surface rounded-2xl p-6 border border-border shadow-sm min-h-[500px]">
        <LettersTable />
      </div>
    </div>
  );
}
