import React from 'react';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

export const ConsensusLog = () => {
  const items = [
    { module: 'ASR Speech-to-Text', status: 'PASS', score: '99.9%', engine: 'Whisper-Large-v3' },
    { module: 'LaTeX Equation OCR', status: 'PASS', score: '98.7%', engine: 'MathPix / Nougat' },
    { module: 'Speaker Diarization', status: 'PASS', score: '99.8%', engine: 'PyAnnote v3.1' },
    { module: 'Bilingual Translation', status: 'PASS', score: 'BLEU 48.2', engine: 'Latent_v3 NLLB' },
  ];

  return (
    <div className="bg-[#0b0e17] border border-cyan-500/20 rounded-2xl p-6 my-6 font-mono">
      <div className="flex items-center gap-2 pb-4 border-b border-slate-800 mb-4 text-xs font-bold text-white uppercase tracking-wider">
        <ShieldCheck className="w-4 h-4 text-emerald-400" />
        <span>Multi-Modal Consensus Audit Logs</span>
      </div>

      <div className="space-y-3 text-xs">
        {items.map((it, idx) => (
          <div key={idx} className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <div>
                <p className="font-bold text-slate-200">{it.module}</p>
                <p className="text-[10px] text-slate-500 font-mono mt-0.5">{it.engine}</p>
              </div>
            </div>

            <div className="text-right">
              <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                {it.status} ({it.score})
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
