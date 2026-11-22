import React from 'react';
import { Radio, Sparkles } from 'lucide-react';

export const IngestHeader = () => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--color-border)]">
      <div>
        <div className="flex items-center gap-2 text-xs text-[var(--color-secondary)] tracking-wider uppercase font-bold">
          <Radio className="w-3.5 h-3.5 animate-pulse" />
          <span>INGEST SYS // OMNIVIDEO HUD</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text)] tracking-tight mt-1">
          Multimodal Stream Ingestion
        </h1>
        <p className="text-sm text-[var(--color-text-body)] mt-1 font-medium">
          Upload local raw video/audio payload or paste YouTube, Zoom, or Canvas URLs.
        </p>
      </div>

      <div className="flex items-center gap-3 self-start sm:self-auto">
        <div className="px-3 py-1.5 rounded-xl bg-white/60 border border-[var(--color-secondary)]/30 text-xs font-bold text-[var(--color-secondary)] flex items-center gap-2 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[var(--color-secondary)] animate-ping" />
          <span>SYS:ONLINE 99.8%</span>
        </div>
      </div>
    </div>
  );
};