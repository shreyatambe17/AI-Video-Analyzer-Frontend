import React from 'react';
import { Terminal, Activity, Zap } from 'lucide-react';

export const PipelineStatusTicker = () => {
  return (
    <div className="bg-[#0b0e17] border border-cyan-500/20 rounded-xl px-4 py-2.5 my-4 flex flex-wrap items-center justify-between text-xs font-mono text-slate-300">
      <div className="flex items-center gap-4 flex-wrap">
        <span className="flex items-center gap-1.5 text-cyan-400 font-semibold">
          <Terminal className="w-3.5 h-3.5" />
          [PIPELINE: STANDBY]
        </span>
        <span className="text-slate-600">|</span>
        <span className="text-emerald-400">
          [CODEC_DAEMON: ACTIVE]
        </span>
        <span className="text-slate-600">|</span>
        <span className="text-purple-400">
          [GPU: 14.2k TOK/S]
        </span>
      </div>

      <span className="text-slate-400 text-[11px] hidden sm:block">
        BUFFER LATENCY: 12ms • ZERO LOSS ENCODING
      </span>
    </div>
  );
};
