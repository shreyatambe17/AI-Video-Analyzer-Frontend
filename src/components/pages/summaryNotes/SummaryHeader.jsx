import React from 'react';
import { BookOpen, Sparkles, Clock, FileText, Globe } from 'lucide-react';
import { MOCK_MEDIA_ITEMS } from '../../../data/mockData';

export const SummaryHeader = () => {
  const media = MOCK_MEDIA_ITEMS[0];

  return (
    <div className="bg-[#0b0e17] border border-cyan-500/30 rounded-2xl p-6 my-6 backdrop-blur-md shadow-xl shadow-cyan-500/5">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 font-bold">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>SYNTHESIS COMPLETE</span>
        </div>
        <span className="font-mono text-xs text-cyan-400 bg-cyan-950 px-2.5 py-0.5 rounded border border-cyan-500/30">
          ID: #{media.id.toUpperCase()}
        </span>
      </div>

      <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-4">
        {media.title}
      </h1>
      <p className="text-sm font-mono text-slate-400 mt-1">
        {media.speakers.join(' & ')} • Guest Colloquium
      </p>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-3 mt-6 pt-4 border-t border-slate-800/80 font-mono text-xs">
        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
          <p className="text-slate-400 text-[10px] uppercase">Duration</p>
          <p className="text-base font-bold text-cyan-400 mt-0.5">{media.duration}</p>
        </div>

        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
          <p className="text-slate-400 text-[10px] uppercase">Transcribed</p>
          <p className="text-base font-bold text-white mt-0.5">{media.wordCount.toLocaleString()}w</p>
        </div>

        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
          <p className="text-slate-400 text-[10px] uppercase">Locales</p>
          <p className="text-base font-bold text-purple-400 mt-0.5">{media.languages.join(', ')}</p>
        </div>
      </div>
    </div>
  );
};
