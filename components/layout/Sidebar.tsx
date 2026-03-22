"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/store/useUIStore";
import { 
  Users, CalendarDays, FileText, LayoutDashboard, 
  Wallet, GraduationCap, Briefcase, BarChart, Settings, UserMinus
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard, roles: ["ADMIN", "HR", "EMPLOYEE", "CANDIDATE"] },
  { name: "Employees", href: "/employees", icon: Users, roles: ["ADMIN", "HR"] },
  { name: "Attendance", href: "/attendance", icon: CalendarDays, roles: ["ADMIN", "HR", "EMPLOYEE"] },
  { name: "Payroll", href: "/payroll", icon: Wallet, badge: "HR", roles: ["ADMIN", "HR", "EMPLOYEE"] },
  { name: "Leave", href: "/leave", icon: UserMinus, roles: ["ADMIN", "HR", "EMPLOYEE"] }, // fixed icon to LayoutDashboard/others
  { name: "Letters", href: "/letters", icon: FileText, roles: ["ADMIN", "HR", "EMPLOYEE"] },
  { name: "Recruitment", href: "/recruitment", icon: Briefcase, roles: ["ADMIN", "HR"] },
  { name: "Training", href: "/training", icon: GraduationCap, roles: ["ADMIN", "HR", "EMPLOYEE", "CANDIDATE"] },
  { name: "Placement", href: "/placement", icon: BarChart, roles: ["ADMIN", "HR", "CANDIDATE"] },
  { name: "Reports", href: "/reports", icon: BarChart, roles: ["ADMIN", "HR"] },
  { name: "Settings", href: "/settings", icon: Settings, roles: ["ADMIN"] },
];

export function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const { isSidebarOpen } = useUIStore();
  const role = session?.user?.role || "EMPLOYEE";

  const filteredNav = navItems.filter((item) => item.roles.includes(role));

  return (
    <div id="nav" className={!isSidebarOpen ? 'c' : ''}>
      {isSidebarOpen && (
        <div className="nsw">
          <div className="ns-wrap">
            <span className="ns-ico">🔍</span>
            <input className="ns" placeholder="Search modules…" />
          </div>
        </div>
      )}
      <div className="ni-wrap">
        {filteredNav.map((it) => {
          const isActive = pathname.startsWith(it.href);
          return (
            <Link key={it.href} href={it.href} className={`ni ${isActive ? 'on' : ''}`} title={!isSidebarOpen ? it.name : undefined}>
              <span className="ni-icon flex items-center justify-center">
                <it.icon className="w-[18px] h-[18px]" />
              </span>
              {isSidebarOpen && <span className="ni-lbl">{it.name}</span>}
              {isSidebarOpen && it.badge && <span className="ni-badge">{it.badge}</span>}
            </Link>
          );
        })}
      </div>
      <div className="nfoot">
        <Link href="/profile" className="nu">
          <div className="av flex-shrink-0">{session?.user?.name?.[0] ?? '?'}</div>
          {isSidebarOpen && (
            <div style={{ overflow: 'hidden', flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '13px', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{session?.user?.name || "User"}</div>
              <div style={{ fontSize: '11px', color: 'var(--t3)', textTransform: 'capitalize' }}>{role}</div>
            </div>
          )}
        </Link>
      </div>
    </div>
  );
}
