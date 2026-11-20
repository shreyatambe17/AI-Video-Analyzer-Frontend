import React from 'react';
import { ScanText, Code2, Sparkles } from 'lucide-react';

export const LiveOcrStream = () => {
  return (
    <div className="bg-[#0b0e17] border border-cyan-500/20 rounded-2xl p-5 my-6 backdrop-blur-md">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
        <div className="flex items-center gap-2">
          <ScanText className="w-4 h-4 text-cyan-400" />
          <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
            // DIAR_OUT STREAM & OCR EXTRACTION
          </h4>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-500/30">
          LATEX+ ACTIVE
        </span>
      </div>

      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs space-y-3 leading-relaxed">
        <p className="text-cyan-300">
          <span className="text-slate-500">[00:14:28.450]</span> SPK_01 (Dr. Thorne): "...at this stage, <span className="bg-cyan-950 text-cyan-200 px-1 py-0.5 rounded border border-cyan-500/40">when we project video frames into discrete latent tokens</span>, we observe exponential computational divergence..."
        </p>

        <div className="p-3 bg-slate-900/90 rounded-lg border border-cyan-500/20 text-slate-300">
          <p className="text-[11px] text-cyan-400 font-semibold mb-1">[SLIDE_OCR_EXTRACT #14]</p>
          <p className="italic font-serif text-sm text-cyan-100">
            {"H(ψ) = ∫ [ (ħ² / 2m) |∇ψ|² + V(r)|ψ|² ] d³r"}
          </p>
        </div>
      </div>
    </div>
  );
};
