import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export const VerificationBenefits = () => {
  const benefits = [
    'Unlimited YouTube URLs',
    '12 Languages Translation',
    'PDF & Markdown Export',
    'Slide OCR LaTeX formulas',
  ];

  return (
    <div className="bg-emerald-950/30 border border-emerald-500/30 rounded-xl p-4 my-3 font-mono">
      <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold mb-2">
        <CheckCircle2 className="w-4 h-4" />
        <span>INCLUDED WITH STUDENT VERIFICATION:</span>
      </div>

      <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300">
        {benefits.map((b, idx) => (
          <div key={idx} className="flex items-center gap-1.5">
            <span className="text-emerald-400 font-bold">•</span>
            <span>{b}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
