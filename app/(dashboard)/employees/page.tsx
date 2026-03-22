import { EmployeeTable } from "@/components/employees/EmployeeTable";
import { AddEmployeeSheet } from "@/components/employees/AddEmployeeSheet";
import { Button } from "@/components/ui/button";
import { Plus, Download } from "lucide-react";

export default function EmployeesPage() {
  return (
    <div className="pe">
      <div className="ch">
        <div className="pt">
          <div>
            <div style={{fontSize: '26px', fontWeight: 700, letterSpacing: '-.3px'}}>Employees</div>
            <div style={{fontSize: '13px', color: 'var(--t2)', marginTop: '2px'}}>Manage your team and view records</div>
          </div>
          <div style={{display: 'flex', gap: '8px'}}>
            <Button variant="outline" className="btn btn-sec hidden sm:flex">
              <Download className="mr-2 h-[14px] w-[14px]" />
              Export
            </Button>
            <AddEmployeeSheet>
              <Button className="btn btn-pri">
                ＋ Add employee
              </Button>
            </AddEmployeeSheet>
          </div>
        </div>
      </div>

      <div className="cb">
        <EmployeeTable />
      </div>
    </div>
  );
}
