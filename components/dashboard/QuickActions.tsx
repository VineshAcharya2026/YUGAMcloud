import { Card } from "@/components/ui/card";
import { Users, FileText, Wallet, Calendar, GraduationCap, Briefcase } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";

export function QuickActions() {
  const { data: session } = useSession();
  const role = session?.user?.role || "EMPLOYEE";

  const actions = [
    { title: "Onboard Employee", icon: <Users className="w-5 h-5 text-brand-600" />, href: "/employees", roles: ["ADMIN", "HR"] },
    { title: "Generate Offer", icon: <FileText className="w-5 h-5 text-amber-600" />, href: "/letters", roles: ["ADMIN", "HR"] },
    { title: "Run Payroll", icon: <Wallet className="w-5 h-5 text-emerald-600" />, href: "/payroll", roles: ["ADMIN", "HR"] },
    { title: "Mark Attendance", icon: <Calendar className="w-5 h-5 text-cyan-600" />, href: "/attendance", roles: ["ADMIN", "HR", "EMPLOYEE", "CANDIDATE"] },
    { title: "Apply Leave", icon: <FileText className="w-5 h-5 text-rose-600" />, href: "/leave", roles: ["ADMIN", "HR", "EMPLOYEE"] },
    { title: "View Courses", icon: <GraduationCap className="w-5 h-5 text-violet-600" />, href: "/training", roles: ["ADMIN", "HR", "EMPLOYEE", "CANDIDATE"] },
  ].filter(action => action.roles.includes(role));

  return (
    <Card className="p-6 h-full shadow-sm border-border">
      <h3 className="text-lg font-bold mb-6 text-text-1">Quick Actions</h3>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        {actions.map((action, i) => (
          <Link 
            key={i} 
            href={action.href}
            className="flex flex-col items-center justify-center p-4 rounded-xl border border-border bg-surface hover:bg-surface-2 hover:border-brand-200 transition-all text-center group"
          >
            <div className="mb-3 p-3 rounded-full bg-brand-50 group-hover:scale-110 transition-transform">
              {action.icon}
            </div>
            <span className="text-xs font-semibold text-text-2 group-hover:text-text-1">{action.title}</span>
          </Link>
        ))}
      </div>
    </Card>
  );
}
