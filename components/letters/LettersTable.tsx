"use client";

import { useQuery } from "@tanstack/react-query";
import { DataTable } from "@/components/shared/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Download, Eye } from "lucide-react";

export type LetterData = {
  id: string;
  type: string;
  issuedAt: string;
  content: string;
  employee: {
    empId: string;
    user: {
      name: string;
    }
  };
};

export const columns: ColumnDef<LetterData>[] = [
  {
    accessorKey: "id",
    header: "Ref No.",
    cell: ({ row }) => <span className="font-mono text-xs font-semibold text-text-2">{row.original.id.substring(0, 8).toUpperCase()}</span>,
  },
  {
    accessorKey: "employee",
    header: "Employee",
    cell: ({ row }) => <span className="font-medium text-text-1">{row.original.employee.user.name}</span>,
    filterFn: (row, id, value) => {
      return row.original.employee.user.name.toLowerCase().includes(value.toLowerCase());
    },
  },
  {
    accessorKey: "type",
    header: "Letter Type",
    cell: ({ row }) => {
      const type = row.getValue("type") as string;
      return (
        <Badge 
          className={
            type === "OFFER" ? "bg-violet-50 text-violet-700 border-violet-200" :
            type === "RELIEVING" ? "bg-rose-50 text-rose-700 border-rose-200" :
            type === "EXPERIENCE" ? "bg-blue-50 text-blue-700 border-blue-200" :
            "bg-slate-100 text-slate-700 border-slate-200"
          }
          variant="outline"
        >
          {type.replace('_', ' ')}
        </Badge>
      );
    },
  },
  {
    accessorKey: "issuedAt",
    header: "Issue Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("issuedAt"));
      return <span className="text-sm font-medium text-text-2">{format(date, "dd MMM yyyy")}</span>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <div className="flex justify-end gap-2 pr-4">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-text-3 hover:text-brand-600 bg-surface hover:bg-brand-50 border border-border">
            <Eye className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-text-3 hover:text-emerald-600 bg-surface hover:bg-emerald-50 border border-border">
            <Download className="w-4 h-4" />
          </Button>
        </div>
      );
    },
  },
];

export function LettersTable() {
  const { data, isLoading } = useQuery({
    queryKey: ["letters"],
    queryFn: async () => {
      const res = await fetch("/api/letters");
      const json = await res.json();
      return json.data as LetterData[];
    },
  });

  if (isLoading) return <div className="p-8 text-center text-text-3 animate-pulse">Loading documents...</div>;

  return (
    <DataTable 
      columns={columns} 
      data={data || []} 
      searchKey="employee" 
      searchPlaceholder="Search by receiver name..." 
    />
  );
}
