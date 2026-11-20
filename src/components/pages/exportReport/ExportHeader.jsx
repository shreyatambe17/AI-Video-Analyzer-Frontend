import React from 'react';
import { Download, FileCheck, Layers } from 'lucide-react';

export const ExportHeader = () => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 tracking-wider uppercase font-semibold">
          <Download className="w-3.5 h-3.5 text-cyan-400" />
          <span>COMPILATION & EXPORT HUB</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-mono text-white tracking-tight mt-1">
          Export Document & PDF Report
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Customize compilation modules, multi-language appendices, and high-fidelity typesetting.
        </p>
      </div>

      <div className="flex items-center gap-2">
        <span className="px-3 py-1.5 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-xs font-mono text-emerald-400 font-bold flex items-center gap-1.5">
          <FileCheck className="w-4 h-4" />
          <span>High-fidelity typesetting ready</span>
        </span>
      </div>
    </div>
  );
};
