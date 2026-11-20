import React, { useState } from 'react';
import { ListFilter, ChevronDown, ChevronUp, Clock, Tag } from 'lucide-react';
import { MOCK_CHAPTERS } from '../../../data/mockData';

export const ChapterBreakdownAccordion = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleChapter = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div className="bg-[#0b0e17] border border-cyan-500/20 rounded-2xl p-6 my-6 backdrop-blur-md">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-500/30">
            <ListFilter className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white tracking-wide">Chapter Breakdown</h2>
            <p className="text-xs font-mono text-slate-400">4 key chapters with dynamic highlights</p>
          </div>
        </div>
        <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">
          4 Chapters
        </span>
      </div>

      <div className="space-y-3 font-mono">
        {MOCK_CHAPTERS.map((chap, idx) => {
          const isOpen = openIndex === idx;

          return (
            <div
              key={idx}
              className={`rounded-xl border transition-all ${
                isOpen
                  ? 'bg-slate-900/90 border-cyan-500/40 shadow-lg shadow-cyan-500/5'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <button
                onClick={() => toggleChapter(idx)}
                className="w-full p-4 flex items-center justify-between text-left focus:outline-none"
              >
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 rounded bg-cyan-950 text-cyan-300 text-xs font-bold border border-cyan-500/30 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-cyan-400" />
                    {chap.time}
                  </span>
                  <span className="text-sm font-bold text-white">{chap.title}</span>
                </div>
                {isOpen ? (
                  <ChevronUp className="w-4 h-4 text-cyan-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-500" />
                )}
              </button>

              {isOpen && (
                <div className="px-4 pb-4 pt-1 border-t border-slate-800/80 text-xs text-slate-300 space-y-3 font-sans">
                  <p className="leading-relaxed">{chap.description}</p>
                  <div className="flex flex-wrap gap-2 pt-1 font-mono text-[11px]">
                    {chap.tags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-cyan-400">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
