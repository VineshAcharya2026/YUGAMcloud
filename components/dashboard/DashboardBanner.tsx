import { useSession } from "next-auth/react";
import { format } from "date-fns";

export function DashboardBanner() {
  const { data: session } = useSession();
  const firstName = session?.user?.name?.split(" ")[0] || "User";
  const role = session?.user?.role || "EMPLOYEE";
  const dateStr = format(new Date(), "EEEE, MMMM do, yyyy");

  // Mock stats based on role
  const chips = role === 'ADMIN' || role === 'HR' ? [
    { label: "Employees", value: "247" },
    { label: "Placement Rate", value: "89%" },
    { label: "Trainees", value: "63" },
    { label: "Payroll", value: "₹28.4L" }
  ] : role === 'EMPLOYEE' ? [
    { label: "Days Present", value: "22" },
    { label: "Leave Balance", value: "8" },
    { label: "Rating", value: "4.2/5" },
    { label: "Salary", value: "₹45K" }
  ] : [
    { label: "Applications", value: "3" },
    { label: "Interview", value: "1" },
    { label: "Course", value: "68%" },
    { label: "Pipeline", value: "Active" }
  ];

  return (
    <div className="banner">
      <div className="banner-grad"></div><div className="banner-grid"></div>
      <div className="banner-shape1"></div><div className="banner-shape2"></div>
      <div className="banner-c">
        <div style={{fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.7, marginBottom: '6px'}}>
          YUGAMCLOUD.ai — HRM Platform
        </div>
        <div style={{fontSize: '24px', fontWeight: 700, marginBottom: '14px'}}>
          Your Workspace Dashboard 🚀
        </div>
        <div style={{display: 'flex', gap: '10px', flexWrap: 'wrap'}}>
          {chips.map((chip, idx) => (
            <div key={idx} className="bchip">
              <div style={{fontSize: '18px', fontWeight: 700}}>{chip.value}</div>
              <div style={{fontSize: '11px', opacity: 0.8, marginTop: '1px'}}>{chip.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
