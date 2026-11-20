import React from 'react';
import { FileText, Languages } from 'lucide-react';
import { MOCK_MEDIA_ITEMS } from '../../../data/mockData';

export const TranscriptHeader = () => {
  const currentMedia = MOCK_MEDIA_ITEMS[0];

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 tracking-wider uppercase font-semibold">
          <FileText className="w-3.5 h-3.5 text-cyan-400" />
          <span>VERBATIM TRANSCRIPT // DIARIZATION ENGINE</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-mono text-white tracking-tight mt-1">
          {currentMedia.title}
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          {currentMedia.wordCount.toLocaleString()} words transcribed across {currentMedia.speakerCount} diarized speakers.
        </p>
      </div>

      <div className="flex items-center gap-2">
        <span className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
          Duration: {currentMedia.duration}
        </span>
      </div>
    </div>
  );
};
