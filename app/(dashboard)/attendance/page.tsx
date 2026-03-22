import { AttendanceTable } from "@/components/attendance/AttendanceTable";
import { Button } from "@/components/ui/button";
import { Download, Fingerprint } from "lucide-react";

export default function AttendancePage() {
  return (
    <div className="pe">
      <div className="ch">
        <div className="pt">
          <div>
            <div style={{fontSize: '26px', fontWeight: 700}}>Attendance Tracking</div>
            <div style={{fontSize: '13px', color: 'var(--t2)', marginTop: '2px'}}>Monitor daily presence, check-ins, and working hours</div>
          </div>
          <div style={{display: 'flex', gap: '8px', alignItems: 'center'}}>
            <Button variant="outline" className="btn btn-sec hidden sm:flex">
              <Download className="mr-2 h-[14px] w-[14px]" />
              Export Log
            </Button>
            <Button className="btn btn-ok">
              <Fingerprint className="mr-2 h-[14px] w-[14px]" />
              Web Check-in
            </Button>
          </div>
        </div>
      </div>

      <div className="cb" style={{minHeight: '500px'}}>
        <AttendanceTable />
      </div>
    </div>
  );
}
