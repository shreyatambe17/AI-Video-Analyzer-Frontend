import React from 'react';
import { CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

export const BreakthroughsList = () => {
  const breakthroughs = [
    {
      title: 'Temporal pruning saves 42% VRAM',
      detail: 'across long-form video training runs while retaining 99.1% zero-shot retrieval accuracy.',
    },
    {
      title: 'Attention scaling bottlenecks resolved',
      detail: 'via sparse flash-temporal kernels executing in sub-linear O(T log T) latency.',
    },
    {
      title: 'Native Tri-Lingual Alignment',
      detail: 'achieves real-time Spanish and Japanese acoustic-to-frame tokenization parity with zero post-hoc re-encoding.',
    },
  ];

  return (
    <div className="bg-[#0b0e17] border border-cyan-500/20 rounded-2xl p-6 my-6 backdrop-blur-md">
      <div className="flex items-center gap-2 pb-4 border-b border-slate-800 mb-4 font-mono text-xs text-cyan-400 font-bold uppercase tracking-wider">
        <ShieldCheck className="w-4 h-4 text-cyan-400" />
        <span>KEY TAKEAWAYS & ARCHITECTURAL BREAKTHROUGHS</span>
      </div>

      <div className="space-y-3">
        {breakthroughs.map((b, idx) => (
          <div
            key={idx}
            className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-cyan-500/30 transition-all"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-slate-200 leading-relaxed font-sans">
              <span className="font-bold text-white">{b.title} </span>
              <span className="text-slate-400">{b.detail}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
