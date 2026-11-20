import React, { useState } from 'react';
import { Play, Copy, Check, Volume2 } from 'lucide-react';
import { MOCK_TRANSCRIPT } from '../../../data/mockData';

export const TranscriptList = ({ searchQuery, selectedSpeaker, selectedLang }) => {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const filtered = MOCK_TRANSCRIPT.filter((item) => {
    const matchesSearch = item.text.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpeaker = selectedSpeaker === 'all' || item.speaker.includes(selectedSpeaker);
    return matchesSearch && matchesSpeaker;
  });

  const handleCopy = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-4 my-6 font-mono">
      {filtered.map((item, idx) => (
        <div
          key={idx}
          className={`p-4 rounded-2xl border transition-all ${
            item.highlight
              ? 'bg-cyan-950/30 border-cyan-500/40 shadow-lg shadow-cyan-500/5'
              : 'bg-[#0b0e17] border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between pb-2 border-b border-slate-900 mb-2">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-0.5 rounded bg-slate-900 text-cyan-400 font-bold text-xs border border-cyan-500/30 flex items-center gap-1">
                <Play className="w-3 h-3 fill-cyan-400" />
                {item.timestamp}
              </span>
              <span className="text-xs font-semibold text-slate-300">{item.speaker}</span>
            </div>

            <button
              onClick={() => handleCopy(item.text, idx)}
              className="p-1 text-slate-400 hover:text-cyan-400 transition-colors"
              title="Copy snippet"
            >
              {copiedIndex === idx ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          <p className="text-sm font-sans text-slate-200 leading-relaxed">
            {item.text}
          </p>

          {selectedLang === 'es' && item.spanish && (
            <div className="mt-3 p-3 rounded-xl bg-slate-950 border border-purple-500/30 text-xs font-sans text-purple-200">
              <span className="font-mono text-[10px] text-purple-400 font-bold block mb-1">[ESPAÑOL TRANSLATION]</span>
              "{item.spanish}"
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
