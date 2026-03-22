"use client";

import { useQuery } from "@tanstack/react-query";
import { DataTable } from "@/components/shared/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle } from "lucide-react";
import { useSession } from "next-auth/react";

export type LeaveData = {
  id: string;
  type: string;
  fromDate: string;
  toDate: string;
  reason: string;
  status: string;
  employee: {
    user: {
      name: string;
    }
  };
};

export const columns: ColumnDef<LeaveData>[] = [
  {
    accessorKey: "employee",
    header: "Employee",
    cell: ({ row }) => <span className="font-medium text-text-1">{row.original.employee.user.name}</span>,
  },
  {
    accessorKey: "type",
    header: "Leave Type",
    cell: ({ row }) => {
      const type = row.getValue("type") as string;
      return <Badge variant="secondary" className="bg-surface-2 text-text-2">{type.replace('_', ' ')}</Badge>;
    },
  },
  {
    accessorKey: "duration",
    header: "Duration",
    cell: ({ row }) => {
      const start = new Date(row.original.fromDate);
      const end = new Date(row.original.toDate);
      const days = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
      return (
        <div className="flex flex-col">
          <span className="text-sm font-medium text-text-1">{days} {days === 1 ? 'Day' : 'Days'}</span>
          <span className="text-xs text-text-3">
            {format(start, "MMM d")} - {format(end, "MMM d, yyyy")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "reason",
    header: "Reason",
    cell: ({ row }) => <span className="text-sm text-text-2 truncate max-w-[200px] block">{row.getValue("reason")}</span>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge 
          className={
            status === "APPROVED" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
            status === "REJECTED" ? "bg-rose-50 text-rose-700 border-rose-200" :
            status === "PENDING" ? "bg-amber-50 text-amber-700 border-amber-200" :
            "bg-slate-100 text-slate-700 border-slate-200"
          }
          variant="outline"
        >
          {status}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const status = row.original.status;
      if (status !== "PENDING") return null;
      return (
        <div className="flex justify-end gap-2 pr-4">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-text-3 hover:text-emerald-600 bg-surface hover:bg-emerald-50 border border-border">
            <CheckCircle2 className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-text-3 hover:text-rose-600 bg-surface hover:bg-rose-50 border border-border">
            <XCircle className="w-4 h-4" />
          </Button>
        </div>
      );
    },
  },
];

export function LeaveTable() {
  const { data: session } = useSession();
  const isAdminOrHR = session?.user?.role === "ADMIN" || session?.user?.role === "HR";

  const { data, isLoading } = useQuery({
    queryKey: ["leaves"],
    queryFn: async () => {
      const res = await fetch("/api/leave");
      const json = await res.json();
      return json.data as LeaveData[];
    },
  });

  // If simple employee, hide employee column
  const cols = isAdminOrHR ? columns : columns.filter(c => (c as any).accessorKey !== "employee");

  if (isLoading) return <div className="p-8 text-center text-text-3 animate-pulse">Loading leave applications...</div>;

  return (
    <DataTable 
      columns={cols} 
      data={data || []} 
      searchKey={isAdminOrHR ? "employee" : "type"} 
      searchPlaceholder={isAdminOrHR ? "Search by name..." : "Search by type..."} 
    />
  );
}
