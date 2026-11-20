import React from 'react';
import { Cpu, Radio } from 'lucide-react';
import { MOCK_TELEMETRY } from '../../../data/mockData';

export const NodeHeader = () => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 tracking-wider uppercase font-semibold">
          <Cpu className="w-3.5 h-3.5 text-cyan-400" />
          <span>INTERACTIVE AI & VIDEO PROCESSING NODE</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold font-mono text-white tracking-tight mt-1 flex items-center gap-3">
          <span>{MOCK_TELEMETRY.modelName}</span>
          <span className="text-xs px-2.5 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-500/40">
            MULTIMODAL WORKSPACE
          </span>
        </h1>
      </div>

      <div className="flex items-center gap-3 font-mono text-xs text-slate-300">
        <div className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>LATENCY: {MOCK_TELEMETRY.latencyMs}ms</span>
          <span className="text-slate-600">|</span>
          <span>TOK/S: {MOCK_TELEMETRY.tokensPerSec}</span>
        </div>
      </div>
    </div>
  );
};
