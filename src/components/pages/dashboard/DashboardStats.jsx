import React from 'react';
import { Clock, ShieldCheck, Globe } from 'lucide-react';

export const DashboardStats = () => {
  const stats = [
    {
      icon: Clock,
      value: '48.5 hrs',
      label: 'Ingested Media',
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-950/40 border-cyan-500/30',
    },
    {
      icon: ShieldCheck,
      value: '99.6%',
      label: 'OCR + ASR Consensus',
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-950/40 border-emerald-500/30',
    },
    {
      icon: Globe,
      value: '12 Active',
      label: 'Translation Locales',
      color: 'text-purple-400',
      bgColor: 'bg-purple-950/40 border-purple-500/30',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div
            key={idx}
            className={`flex items-center gap-3.5 px-4 py-3 rounded-xl border ${stat.bgColor} backdrop-blur-md`}
          >
            <div className={`p-2.5 rounded-lg bg-slate-900/80 ${stat.color}`}>
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-lg font-bold font-mono text-white leading-tight">{stat.value}</p>
              <p className="text-xs text-slate-400 font-medium">{stat.label}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
