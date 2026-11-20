import React from 'react';
import { Search, Mic, SlidersHorizontal } from 'lucide-react';

export const MediaFilterBar = ({ 
  searchQuery, 
  setSearchQuery, 
  activeFilter, 
  setActiveFilter,
  sortBy,
  setSortBy
}) => {
  const filterOptions = [
    { id: 'all', label: 'All Media (14)' },
    { id: 'slides', label: 'With Slides' },
    { id: 'audio', label: 'Audio Only' },
    { id: 'bilingual', label: 'Bilingual' },
  ];

  return (
    <div className="space-y-4 my-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search transcripts, questions, speakers, slides or formula keywords..."
          className="w-full pl-11 pr-12 py-3 bg-[#0b0f19] border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/40 transition-all font-sans"
        />
        <button 
          type="button"
          title="Voice Search"
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-400 transition-colors p-1"
        >
          <Mic className="w-4 h-4" />
        </button>
      </div>

      {/* Filters and Sorting */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {filterOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setActiveFilter(opt.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeFilter === opt.id
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/10'
                  : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-slate-900 border border-slate-800 text-xs text-slate-300 rounded-lg px-3 py-1.5 focus:outline-none focus:border-cyan-500/40"
          >
            <option value="recent">Recently Analyzed</option>
            <option value="duration">Longest Duration</option>
            <option value="words">Most Words</option>
          </select>
        </div>
      </div>
    </div>
  );
};
