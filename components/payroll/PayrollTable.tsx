"use client";

import { useQuery } from "@tanstack/react-query";
import { DataTable } from "@/components/shared/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export type PayrollData = {
  id: string;
  month: number;
  year: number;
  basicPay: number;
  allowances: number;
  deductions: number;
  netPay: number;
  status: string;
  employee: {
    empId: string;
    user: {
      name: string;
    }
  };
};

export const columns: ColumnDef<PayrollData>[] = [
  {
    accessorKey: "employee",
    header: "Employee",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-medium text-text-1">{row.original.employee.user.name}</span>
        <span className="text-xs text-text-3 font-mono">{row.original.employee.empId}</span>
      </div>
    ),
    filterFn: (row, id, value) => {
      return row.original.employee.user.name.toLowerCase().includes(value.toLowerCase());
    },
  },
  {
    accessorKey: "period",
    header: "Period",
    cell: ({ row }) => {
      const month = row.original.month;
      const year = row.original.year;
      const date = new Date(year, month - 1);
      return <span className="font-medium text-text-2">{format(date, "MMMM yyyy")}</span>;
    },
  },
  {
    accessorKey: "netPay",
    header: "Net Pay",
    cell: ({ row }) => {
      const amount = row.original.netPay;
      const formatted = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      }).format(amount);
      return <span className="font-bold text-text-1">{formatted}</span>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge 
          className={
            status === "PROCESSED" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
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
      return (
        <div className="flex justify-end pr-4">
          <Button variant="ghost" size="sm" className="h-8 text-brand-600 hover:text-brand-700 bg-brand-50 hover:bg-brand-100 border border-brand-200">
            <Download className="mr-2 w-3 h-3" /> PDF
          </Button>
        </div>
      );
    },
  },
];

export function PayrollTable() {
  const { data, isLoading } = useQuery({
    queryKey: ["payroll"],
    queryFn: async () => {
      const res = await fetch("/api/payroll");
      const json = await res.json();
      return json.data as PayrollData[];
    },
  });

  if (isLoading) return <div className="p-8 text-center text-text-3 animate-pulse">Loading payroll records...</div>;

  return (
    <DataTable 
      columns={columns} 
      data={data || []} 
      searchKey="employee" 
      searchPlaceholder="Search by employee name..." 
    />
  );
}
