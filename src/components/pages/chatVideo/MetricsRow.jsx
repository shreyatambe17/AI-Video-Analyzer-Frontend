import React from 'react';

export const MetricsRow = () => {
  const metrics = [
    {
      title: 'DIARIZATION',
      value: '99.8%',
      subtitle: 'CONFIDENCE',
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-950/40 border-emerald-500/30',
      barColor: 'bg-emerald-400',
    },
    {
      title: 'GPU TOKENS',
      value: '14.2k',
      subtitle: 'T/S LOAD',
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-950/40 border-cyan-500/30',
      barColor: 'bg-cyan-400',
    },
    {
      title: 'CONSENSUS',
      value: 'VALID 3/3',
      subtitle: 'OCR+ASR',
      color: 'text-amber-400',
      bgColor: 'bg-amber-950/40 border-amber-500/30',
      barColor: 'bg-amber-400',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-4 font-mono">
      {metrics.map((m, idx) => (
        <div key={idx} className={`p-3.5 rounded-xl border ${m.bgColor} backdrop-blur-md`}>
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span>{m.title}</span>
            <span className="text-[10px] text-slate-500 font-semibold">{m.subtitle}</span>
          </div>
          <p className={`text-xl font-bold mt-1 ${m.color}`}>{m.value}</p>
          <div className="w-full bg-slate-900 rounded-full h-1 mt-2.5 overflow-hidden">
            <div className={`h-full ${m.barColor} w-4/5`} />
          </div>
        </div>
      ))}
    </div>
  );
};
