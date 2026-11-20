import React from 'react';
import { Link } from 'react-router-dom';
import { PlaySquare, LogIn } from 'lucide-react';

export const RegisterHeader = () => {
  return (
    <div className="flex items-center justify-between pb-8">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center">
          <PlaySquare className="w-5 h-5 text-cyan-400" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg text-white">OmniStudy</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30">
              Free Plan
            </span>
          </div>
          <p className="text-xs text-slate-400">Create Free Student Account</p>
        </div>
      </div>

      <Link
        to="/login"
        className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-200 hover:text-white flex items-center gap-1.5 transition-colors"
      >
        <LogIn className="w-4 h-4 text-cyan-400" />
        <span>Sign In</span>
      </Link>
    </div>
  );
};
