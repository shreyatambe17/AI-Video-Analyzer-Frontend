import React from 'react';
import { Cpu, Zap, Activity, HardDrive } from 'lucide-react';
import { MOCK_TELEMETRY } from '../../../data/mockData';

export const GpuMetricsGrid = () => {
  const cards = [
    { title: 'LATENCY', val: `${MOCK_TELEMETRY.latencyMs} ms`, sub: 'Sub-millisecond buffer', color: 'text-cyan-400' },
    { title: 'GPU TOKEN BANDWIDTH', val: `${MOCK_TELEMETRY.tokensPerSec} tok/s`, sub: 'vLLM Latent Engine', color: 'text-purple-400' },
    { title: 'DIARIZATION CONFIDENCE', val: MOCK_TELEMETRY.diarizationConf, sub: 'PyAnnote Speaker Clustering', color: 'text-emerald-400' },
    { title: 'CONSENSUS VALIDATION', val: MOCK_TELEMETRY.consensus, sub: 'Multi-Modal Verified', color: 'text-amber-400' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-6 font-mono">
      {cards.map((c, i) => (
        <div key={i} className="bg-[#0b0e17] border border-cyan-500/20 rounded-xl p-4 backdrop-blur-md">
          <p className="text-[10px] text-slate-400 font-semibold uppercase">{c.title}</p>
          <p className={`text-2xl font-bold mt-1 ${c.color}`}>{c.val}</p>
          <p className="text-[11px] text-slate-500 mt-1">{c.sub}</p>
        </div>
      ))}
    </div>
  );
};
