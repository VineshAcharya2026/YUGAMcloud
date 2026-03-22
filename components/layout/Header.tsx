"use client";

import { usePathname } from "next/navigation";
import { useUIStore } from "@/store/useUIStore";
import { format } from "date-fns";
import { Bell, Search, Menu, LogOut, User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function Header() {
  const { isSidebarOpen, toggleSidebar } = useUIStore();
  const { data: session } = useSession();
  const pathname = usePathname();
  
  const segments = pathname.split('/').filter(Boolean);
  const breadcrumb = segments.length > 0 ? segments[segments.length - 1] : 'Home';
  const capitalizedBreadcrumb = breadcrumb.charAt(0).toUpperCase() + breadcrumb.slice(1);

  return (
    <div id="topbar">
      <div className={`tb-logo ${!isSidebarOpen ? 'c' : ''}`}>
        <div className="logo-mark">
          <svg viewBox="0 0 40 40" fill="none"><path d="M12 10L20 22L28 10" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/><path d="M20 22L20 31" stroke="white" strokeWidth="3" strokeLinecap="round"/></svg>
        </div>
        {isSidebarOpen && <span className="logo-text">YUGAM<span>CLOUD</span>.ai</span>}
      </div>
      <button onClick={toggleSidebar} className="ham" type="button">
        <svg width="16" height="12" viewBox="0 0 16 12"><rect width="16" height="1.5" rx=".75" fill="currentColor"/><rect y="5.25" width="16" height="1.5" rx=".75" fill="currentColor"/><rect y="10.5" width="16" height="1.5" rx=".75" fill="currentColor"/></svg>
      </button>
      <div className="bc">
        <span>Home</span><span style={{margin: '0 3px', color: 'var(--t3)'}}>›</span>
        <span className="bc-cur">{capitalizedBreadcrumb.replace(/-/g, ' ')}</span>
      </div>
      <div className="tb-right">
        <button onClick={() => alert("🔔 No new notifications")} type="button" className="btn btn-ghost btn-sm" style={{fontSize: '16px', padding: '5px 8px'}}>
          🔔
        </button>
        <DropdownMenu>
          <DropdownMenuTrigger {...{ asChild: true } as any}>
            <div className="tb-user">
              <div className="av">{session?.user?.name?.charAt(0) || "?"}</div>
              {isSidebarOpen && (
                <div style={{lineHeight: 1.3}}>
                  <div style={{fontSize: '13px', fontWeight: 600}}>{session?.user?.name || "User"}</div>
                  <div style={{fontSize: '11px', color: 'var(--t3)', textTransform: 'capitalize'}}>{session?.user?.role || "Employee"}</div>
                </div>
              )}
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 mt-2" align="end">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{session?.user?.name}</p>
                <p className="text-xs leading-none text-muted-foreground">{session?.user?.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => window.location.href = '/profile'}>
              <UserIcon className="mr-2 h-4 w-4" />
              <span>My Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => signOut()}>
              <LogOut className="mr-2 h-4 w-4 text-error" />
              <span className="text-error">Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <button onClick={() => signOut()} type="button" className="btn btn-ghost btn-sm" title="Sign out" style={{padding: '5px 8px'}}>
          ⎋
        </button>
      </div>
    </div>
  );
}
