"use client";

import { useQuery } from "@tanstack/react-query";
import { DataTable } from "@/components/shared/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export type AttendanceData = {
  id: string;
  date: string;
  status: string;
  checkIn: string | null;
  checkOut: string | null;
  employee: {
    user: {
      name: string;
      email: string;
    }
  };
};

export const columns: ColumnDef<AttendanceData>[] = [
  {
    accessorKey: "employee",
    header: "Employee",
    cell: ({ row }) => {
      const user = row.original.employee.user;
      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-brand-50 text-brand-700 text-xs">
              {user.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium text-text-1 text-sm">{user.name}</span>
          </div>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return row.original.employee.user.name.toLowerCase().includes(value.toLowerCase());
    },
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("date"));
      return <span className="text-sm text-text-2">{format(date, "dd MMM yyyy")}</span>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge 
          className={
            status === "PRESENT" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
            status === "ABSENT" ? "bg-error-bg text-error border-error/20" :
            status === "HALF_DAY" ? "bg-amber-50 text-amber-700 border-amber-200" :
            "bg-slate-100 text-slate-700 border-slate-200"
          }
          variant="outline"
        >
          {status.replace('_', ' ')}
        </Badge>
      );
    },
  },
  {
    accessorKey: "checkIn",
    header: "Check In",
    cell: ({ row }) => {
      const val = row.getValue("checkIn");
      return <span className="text-sm font-mono text-text-3">{val ? format(new Date(val as string), "HH:mm") : "--:--"}</span>;
    },
  },
  {
    accessorKey: "checkOut",
    header: "Check Out",
    cell: ({ row }) => {
      const val = row.getValue("checkOut");
      return <span className="text-sm font-mono text-text-3">{val ? format(new Date(val as string), "HH:mm") : "--:--"}</span>;
    },
  },
  {
    id: "hours",
    header: "Working Hours",
    cell: ({ row }) => {
      const checkIn = row.original.checkIn;
      const checkOut = row.original.checkOut;
      if (checkIn && checkOut) {
        const diff = new Date(checkOut).getTime() - new Date(checkIn).getTime();
        const hrs = Math.floor(diff / (1000 * 60 * 60));
        const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        return <span className="text-sm font-medium text-text-2">{hrs}h {mins}m</span>;
      }
      return <span className="text-sm text-text-3">-</span>;
    },
  },
];

export function AttendanceTable() {
  const { data, isLoading } = useQuery({
    queryKey: ["attendance"],
    queryFn: async () => {
      const res = await fetch("/api/attendance");
      const json = await res.json();
      return json.data as AttendanceData[];
    },
  });

  if (isLoading) return <div className="p-8 text-center text-text-3 animate-pulse">Loading attendance records...</div>;

  return (
    <DataTable 
      columns={columns} 
      data={data || []} 
      searchKey="employee" 
      searchPlaceholder="Search by employee name..." 
    />
  );
}
