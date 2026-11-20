import React from 'react';
import { Cpu, Radio, Shield } from 'lucide-react';

export const IngestHeader = () => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 tracking-wider uppercase font-semibold">
          <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>INGEST SYS // OMNIVIDEO HUD</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1 font-mono">
          Multimodal Stream Ingestion
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Upload local raw video/audio payload or paste YouTube, Zoom, or Canvas URLs.
        </p>
      </div>

      <div className="flex items-center gap-3 self-start sm:self-auto">
        <div className="px-3 py-1.5 rounded-xl bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono text-cyan-300 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span>SYS:ONLINE 99.8%</span>
        </div>
      </div>
    </div>
  );
};
