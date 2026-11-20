import React from 'react';
import { PlaySquare, HelpCircle } from 'lucide-react';

export const LoginHeader = () => {
  return (
    <div className="flex items-center justify-between pb-8">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center">
          <PlaySquare className="w-5 h-5 text-cyan-400" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg text-white">OmniStudy</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-500/30">
              AI Edu
            </span>
          </div>
          <p className="text-xs text-slate-400">Lecture & Study Companion</p>
        </div>
      </div>

      <button className="px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-medium text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors">
        <HelpCircle className="w-4 h-4 text-cyan-400" />
        <span>Student Help</span>
      </button>
    </div>
  );
};
