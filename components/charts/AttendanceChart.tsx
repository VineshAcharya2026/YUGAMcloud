"use client";

import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";

const data = [
  { name: "Jan", present: 220, absent: 10, leave: 17 },
  { name: "Feb", present: 225, absent: 12, leave: 10 },
  { name: "Mar", present: 230, absent: 8, leave: 9 },
  { name: "Apr", present: 228, absent: 11, leave: 8 },
  { name: "May", present: 235, absent: 5, leave: 7 },
  { name: "Jun", present: 232, absent: 9, leave: 6 },
];

export function AttendanceChart() {
  return (
    <Card className="p-6 h-full shadow-sm border-border flex flex-col">
      <div className="mb-6 flex justify-between items-center">
        <h3 className="text-lg font-bold text-text-1">Monthly Attendance</h3>
      </div>
      <div className="flex-1 min-h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "var(--text-3)" }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "var(--text-3)" }} />
            <Tooltip 
              cursor={{ fill: "var(--surface-2)" }}
              contentStyle={{ borderRadius: "8px", border: "1px solid var(--border)", boxShadow: "var(--shadow-md)" }}
            />
            <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
            <Bar dataKey="present" name="Present" fill="var(--brand-500)" radius={[4, 4, 0, 0]} maxBarSize={40} />
            <Bar dataKey="absent" name="Absent" fill="var(--error)" radius={[4, 4, 0, 0]} maxBarSize={40} />
            <Bar dataKey="leave" name="On Leave" fill="var(--warning)" radius={[4, 4, 0, 0]} maxBarSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
