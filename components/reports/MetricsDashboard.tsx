"use client";

import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend, PieChart, Pie, Cell } from "recharts";

const performanceData = [
  { name: "Excellent", value: 35 },
  { name: "Good", value: 45 },
  { name: "Average", value: 15 },
  { name: "Needs Improvement", value: 5 },
];

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'];

export function MetricsDashboard() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="p-6 shadow-sm border-border flex flex-col">
        <h3 className="text-lg font-bold text-text-1 mb-6">Performance Distribution</h3>
        <div className="flex-1 min-h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={performanceData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {performanceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid var(--border)" }} />
              <Legend verticalAlign="bottom" height={36}/>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>
      
      <Card className="p-6 shadow-sm border-border flex flex-col">
         <div className="flex flex-col items-center justify-center min-h-[300px] h-full text-center">
            <div className="w-16 h-16 bg-brand-50 text-brand-600 rounded-full flex items-center justify-center mb-4 text-2xl font-bold">
              +
            </div>
            <h3 className="text-xl font-bold text-text-1 mb-2">More Reports Coming Soon</h3>
            <p className="text-text-2 max-w-sm">Advanced analytics, attrition prediction, and custom report builder are currently in development.</p>
         </div>
      </Card>
    </div>
  );
}
