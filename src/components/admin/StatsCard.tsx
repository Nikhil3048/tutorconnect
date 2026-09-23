import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: number | string;
  subtitle?: string;
  icon: LucideIcon;
  color: 'blue' | 'emerald' | 'amber' | 'purple' | 'rose' | 'indigo';
  onClick?: () => void;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  color,
  onClick
}) => {
  const colorMap = {
    blue: 'bg-blue-50 text-blue-600 border-blue-200',
    emerald: 'bg-emerald-50 text-emerald-600 border-emerald-200',
    amber: 'bg-amber-50 text-amber-600 border-amber-200',
    purple: 'bg-purple-50 text-purple-600 border-purple-200',
    rose: 'bg-rose-50 text-rose-600 border-rose-200',
    indigo: 'bg-indigo-50 text-indigo-600 border-indigo-200',
  };

  return (
    <div 
      onClick={onClick}
      className={`p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-all cursor-pointer group flex items-start justify-between`}
    >
      <div className="space-y-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 block">
          {title}
        </span>
        <h3 className="text-3xl font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
          {value}
        </h3>
        {subtitle && <p className="text-xs text-slate-400 font-medium">{subtitle}</p>}
      </div>

      <div className={`p-3.5 rounded-2xl border ${colorMap[color]} group-hover:scale-110 transition-transform duration-200 shrink-0`}>
        <Icon className="w-6 h-6" />
      </div>
    </div>
  );
};
