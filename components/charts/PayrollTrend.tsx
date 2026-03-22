"use client";

import { Card } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const data = [
  { name: "Jan", amt: 22.4 },
  { name: "Feb", amt: 23.1 },
  { name: "Mar", amt: 24.5 },
  { name: "Apr", amt: 23.8 },
  { name: "May", amt: 25.2 },
  { name: "Jun", amt: 28.4 },
];

export function PayrollTrend() {
  return (
    <Card className="p-6 h-full shadow-sm border-border flex flex-col">
      <div className="mb-6 flex justify-between items-center">
        <h3 className="text-lg font-bold text-text-1">Payroll Trend (₹ Lakhs)</h3>
      </div>
      <div className="flex-1 min-h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--accent-cyan)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="var(--accent-cyan)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "var(--text-3)" }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "var(--text-3)" }} tickFormatter={(val) => `₹${val}L`} />
            <Tooltip 
              formatter={(value) => [`₹${value} Lakhs`, "Payroll"]}
              contentStyle={{ borderRadius: "8px", border: "1px solid var(--border)", boxShadow: "var(--shadow-md)" }}
            />
            <Area type="monotone" dataKey="amt" stroke="var(--accent-cyan)" strokeWidth={3} fillOpacity={1} fill="url(#colorAmt)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
