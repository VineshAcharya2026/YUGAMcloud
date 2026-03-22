import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  icon: ReactNode;
  value: string | number;
  label: string;
  trend?: number; // positive = up, negative = down
  trendLabel?: string;
  className?: string;
  valueColor?: string;
}

export function StatCard({ icon, value, label, trend, trendLabel, className, valueColor }: StatCardProps) {
  const isPositive = trend && trend > 0;
  const isNegative = trend && trend < 0;

  return (
    <div className={cn("st", className)}>
      <div style={{fontSize: '20px', marginBottom: '8px'}}>{icon}</div>
      <div style={{fontSize: '24px', fontWeight: 700, marginBottom: '3px'}} className={valueColor || "text-text-1"}>
        {value}
      </div>
      <div style={{fontSize: '13px', color: 'var(--t2)'}}>
        {label}
      </div>
      {trend !== undefined && (
        <div style={{
          fontSize: '11px', 
          fontWeight: 600, 
          marginTop: '5px',
          color: isPositive ? 'var(--ok)' : 'var(--err)'
        }}>
          {isPositive ? '↑ ' : '↓ '}
          {Math.abs(trend)}% {trendLabel && <span style={{color: 'var(--t3)', marginLeft: '4px', fontWeight: 500}}>vs last month</span>}
        </div>
      )}
    </div>
  );
}
