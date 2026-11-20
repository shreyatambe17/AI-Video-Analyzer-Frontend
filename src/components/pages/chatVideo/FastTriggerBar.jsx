import React from 'react';
import { Terminal, Zap } from 'lucide-react';

export const FastTriggerBar = ({ onTrigger }) => {
  const triggers = [
    { label: '> [SYS_EXEC] Summarize 10m', action: 'Summarize memory bottlenecks between 12:00 and 14:15' },
    { label: '> [SYS_TRANSLATE] ES', action: 'Translate core thesis to Spanish' },
    { label: '> [SYS_EXTRACT] Formulas', action: 'Extract LaTeX equations from slide #14' },
    { label: '> [SYS_QUIZ] Quiz Prep', action: 'Generate flashcards for this lecture chapter' },
  ];

  return (
    <div className="bg-[#0b0e17] border border-cyan-500/20 rounded-xl p-3 my-4 font-mono">
      <div className="flex items-center justify-between text-[11px] text-cyan-400 mb-2">
        <div className="flex items-center gap-1.5 font-bold">
          <Terminal className="w-3.5 h-3.5" />
          <span>COMMAND_BUFFER // FAST_TRIGGER</span>
        </div>
        <span className="text-emerald-400 font-semibold">[AUTORUN: ON]</span>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {triggers.map((t, idx) => (
          <button
            key={idx}
            onClick={() => onTrigger(t.action)}
            className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-cyan-950 border border-slate-800 hover:border-cyan-500/40 text-xs text-slate-300 hover:text-cyan-300 transition-all font-mono"
          >
            {t.label}
          </button>
        ))}
      </div>
    </div>
  );
};
