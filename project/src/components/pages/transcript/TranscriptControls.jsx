import React from 'react';
import { Search, Filter, Languages, Download } from 'lucide-react';

export const TranscriptControls = ({
  searchQuery,
  setSearchQuery,
  selectedSpeaker,
  setSelectedSpeaker,
  selectedLang,
  setSelectedLang
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 my-6">
      {/* Search Input */}
      <div className="relative w-full sm:w-80">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search transcript text..."
          className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500/60"
        />
      </div>

      <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
        {/* Speaker Filter */}
        <select
          value={selectedSpeaker}
          onChange={(e) => setSelectedSpeaker(e.target.value)}
          className="bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 rounded-xl px-3 py-2 focus:outline-none focus:border-cyan-500/40"
        >
          <option value="all">All Speakers (4)</option>
          <option value="SPK_01">SPK_01 (Prof. Fei-Fei Li / Dr. Thorne)</option>
          <option value="SPK_02">SPK_02 (Andrej Karpathy)</option>
          <option value="SPK_03">SPK_03 (Q&A Student)</option>
        </select>

        {/* Translation Selector */}
        <select
          value={selectedLang}
          onChange={(e) => setSelectedLang(e.target.value)}
          className="bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-400 rounded-xl px-3 py-2 focus:outline-none focus:border-cyan-500/40"
        >
          <option value="en">English (Verbatim Original)</option>
          <option value="es">Spanish (Español Latent_v3)</option>
          <option value="ja">Japanese (日本語)</option>
        </select>
      </div>
    </div>
  );
};
