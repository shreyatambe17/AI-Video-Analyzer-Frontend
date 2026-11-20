import React from 'react';
import { Cpu, RefreshCw } from 'lucide-react';

export const ProcessingHeader = ({ progress }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 tracking-wider uppercase font-semibold">
          <Cpu className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
          <span>NEURAL PIPELINE // STEP 3 OF 5</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-mono text-white tracking-tight mt-1">
          Multimodal Stream Neural Ingestion
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Extracting verbatim transcripts, speaker voiceprints, LaTeX equations, and vector embeddings.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="px-4 py-2 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-mono text-sm font-bold flex items-center gap-2">
          <RefreshCw className="w-4 h-4 animate-spin text-cyan-400" />
          <span>{progress}% COMPLETED</span>
        </div>
      </div>
    </div>
  );
};
