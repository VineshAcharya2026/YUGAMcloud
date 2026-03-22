"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "@/components/shared/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { MoreHorizontal, FileText, Download, Trash2, Edit } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

// Type definition for the data expected by the table
export type EmployeeData = {
  id: string;
  empId: string;
  department: string;
  designation: string;
  salary: number;
  joinedAt: string;
  status: string;
  user: {
    name: string;
    email: string;
    avatar: string | null;
  };
};

export const columns: ColumnDef<EmployeeData>[] = [
  {
    accessorKey: "employee",
    header: "Employee",
    cell: ({ row }) => {
      const user = row.original.user;
      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9 border border-border">
            <AvatarImage src={user.avatar || ""} alt={user.name} />
            <AvatarFallback className="bg-brand-50 text-brand-700 font-medium">
              {user.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium text-text-1">{user.name}</span>
            <span className="text-xs text-text-3">{user.email}</span>
          </div>
        </div>
      );
    },
    // We use a custom filter function so searching by name works
    filterFn: (row, id, value) => {
      const name = row.original.user.name.toLowerCase();
      return name.includes(value.toLowerCase());
    },
  },
  {
    accessorKey: "empId",
    header: "Emp ID",
    cell: ({ row }) => <span className="font-mono text-xs font-medium text-text-2">{row.getValue("empId")}</span>,
  },
  {
    accessorKey: "department",
    header: "Department",
    cell: ({ row }) => {
      const dept = row.getValue("department") as string;
      return <span className="text-sm font-medium text-text-2 capitalize">{dept.replace('_', ' ').toLowerCase()}</span>;
    },
  },
  {
    accessorKey: "designation",
    header: "Role",
    cell: ({ row }) => <span className="text-sm text-text-2">{row.getValue("designation")}</span>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge 
          className={
            status === "ACTIVE" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
            status === "PROBATION" ? "bg-amber-50 text-amber-700 border-amber-200" :
            status === "NOTICE_PERIOD" ? "bg-rose-50 text-rose-700 border-rose-200" :
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
    accessorKey: "salary",
    header: "Salary",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("salary"));
      const formatted = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      }).format(amount);
      return <span className="font-medium text-text-2">{formatted}</span>;
    },
  },
  {
    accessorKey: "joinedAt",
    header: "Joined",
    cell: ({ row }) => {
      const date = new Date(row.getValue("joinedAt"));
      return <span className="text-sm text-text-3">{format(date, "MMM yyyy")}</span>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const employee = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger {...{ asChild: true } as any}>
            <Button variant="ghost" className="h-8 w-8 p-0 border-0 hover:bg-surface-2">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4 text-text-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px]">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => window.location.href = `/employees/${employee.id}`}>
              <Edit className="mr-2 h-4 w-4 text-text-3" /> View profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <FileText className="mr-2 h-4 w-4 text-brand-500" /> Generate payslip
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Download className="mr-2 h-4 w-4 text-emerald-500" /> Create offer letter
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-error focus:text-error focus:bg-error-bg">
              <Trash2 className="mr-2 h-4 w-4" /> Terminate employment
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function EmployeeTable() {
  const { data, isLoading } = useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      const res = await fetch("/api/employees");
      const json = await res.json();
      return json.data as EmployeeData[];
    },
  });

  if (isLoading) {
    return <div className="p-8 text-center text-text-3 animate-pulse">Loading directory...</div>;
  }

  return (
    <div className="w-full">
      <DataTable 
        columns={columns} 
        data={data || []} 
        searchKey="employee" 
        searchPlaceholder="Search by name..." 
      />
    </div>
  );
}
