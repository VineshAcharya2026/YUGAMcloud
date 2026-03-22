import { Card } from "@/components/ui/card";
import { CheckCircle2, Clock, CalendarIcon, Briefcase } from "lucide-react";

export function ActivityFeed() {
  const activities = [
    { icon: <CheckCircle2 className="w-4 h-4 text-emerald-500" />, title: "Rahul Verma joined AWS Course", time: "2 hours ago" },
    { icon: <Briefcase className="w-4 h-4 text-brand-500" />, title: "Pooja Singh offer letter generated", time: "5 hours ago" },
    { icon: <Clock className="w-4 h-4 text-amber-500" />, title: "3 leave requests pending approval", time: "1 day ago" },
    { icon: <CalendarIcon className="w-4 h-4 text-cyan-500" />, title: "April Payroll processed successfully", time: "1 day ago" },
    { icon: <CheckCircle2 className="w-4 h-4 text-emerald-500" />, title: "Sneha Patel placed at TCS Digital", time: "2 days ago" },
    { icon: <Briefcase className="w-4 h-4 text-brand-500" />, title: "New Job: Next.js Developer posted", time: "2 days ago" },
  ];

  return (
    <Card className="p-6 h-full flex flex-col shadow-sm border-border">
      <h3 className="text-lg font-bold mb-6 text-text-1">Activity Feed</h3>
      <div className="flex-1 overflow-y-auto pr-2 space-y-6">
        {activities.map((activity, i) => (
          <div key={i} className="flex gap-4 items-start group">
            <div className="mt-0.5 bg-surface-2 p-2 rounded-full ring-2 ring-surface group-hover:bg-brand-50 transition-colors">
              {activity.icon}
            </div>
            <div>
              <p className="text-sm font-medium text-text-1">{activity.title}</p>
              <p className="text-xs text-text-3 mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
