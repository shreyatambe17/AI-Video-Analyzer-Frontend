import React from 'react';
import { Eye, FileText, CheckCircle2 } from 'lucide-react';

export const DocumentPreviewCard = () => {
  return (
    <div className="bg-[#0b0e17] border border-cyan-500/20 rounded-2xl p-6 my-6 backdrop-blur-md">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
        <div className="flex items-center gap-2">
          <Eye className="w-5 h-5 text-cyan-400" />
          <h2 className="text-lg font-bold text-white tracking-wide">Document Preview</h2>
        </div>
        <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/40">
          ✓ Ready
        </span>
      </div>

      {/* PDF Document Visual Mockup */}
      <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 relative overflow-hidden max-w-lg mx-auto shadow-2xl">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-[10px] font-mono text-slate-400">
          <span className="flex items-center gap-1.5 text-cyan-400 font-bold">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            OmniVideo AI Executive Report
          </span>
          <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-400">
            CONFIDENTIAL
          </span>
        </div>

        {/* Dummy Document Lines & Graphs */}
        <div className="my-6 space-y-4">
          <div className="h-4 bg-slate-800 rounded-md w-3/4 animate-pulse" />
          <div className="h-2 bg-slate-850 rounded w-full" />
          <div className="h-2 bg-slate-850 rounded w-5/6" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 space-y-2">
              <span className="text-[10px] font-mono text-cyan-400">Executive Takeaways</span>
              <div className="h-2 bg-cyan-500/30 rounded w-full" />
              <div className="h-2 bg-cyan-500/20 rounded w-2/3" />
            </div>
            <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 space-y-2">
              <span className="text-[10px] font-mono text-emerald-400">Vector Alignments</span>
              <div className="h-2 bg-emerald-500/30 rounded w-full" />
              <div className="h-2 bg-emerald-500/20 rounded w-2/3" />
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-900 flex items-center justify-between text-[10px] font-mono text-slate-500">
          <span>Generated with OmniVideo v2.4 Multi-Agent</span>
          <span>Page 1 of 14</span>
        </div>
      </div>

      {/* File Info Bar */}
      <div className="mt-4 p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs font-mono text-cyan-300">
        <span className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-cyan-400" />
          OmniVideo_Analysis_Report.pdf
        </span>
        <span className="text-slate-400">4.2 MB • 14 Pages</span>
      </div>
    </div>
  );
};
