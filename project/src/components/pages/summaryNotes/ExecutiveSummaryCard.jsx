import React, { useState } from 'react';
import { Sparkles, Copy, Check } from 'lucide-react';
import { MOCK_MEDIA_ITEMS } from '../../../data/mockData';

export const ExecutiveSummaryCard = () => {
  const [copied, setCopied] = useState(false);
  const media = MOCK_MEDIA_ITEMS[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(media.summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#0b0e17] border border-cyan-500/30 rounded-2xl p-6 my-6 backdrop-blur-md shadow-xl shadow-cyan-500/5">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-500/30">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white tracking-wide">Executive Summary</h2>
            <p className="text-xs font-mono text-slate-400">Zero-shot multi-agent consensus</p>
          </div>
        </div>

        <button
          onClick={handleCopy}
          className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-mono text-slate-200 flex items-center gap-1.5 transition-colors"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-cyan-400" />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>

      <div className="mt-4 space-y-4 text-slate-200 text-sm leading-relaxed font-sans">
        <p>
          {media.summary} By eliminating redundant background frame computations, the architecture scales continuous video comprehension to multimillion-frame horizons without catastrophic memory degradation.
        </p>
        <p>
          The lecture concludes with practical benchmarks proving unprecedented latency gains across simultaneous multilingual audio-visual alignment tasks.
        </p>
      </div>
    </div>
  );
};
