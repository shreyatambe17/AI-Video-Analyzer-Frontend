import React from 'react';
import { PlusCircle, Database } from 'lucide-react';
import { Link } from 'react-router-dom';

export const DashboardHeader = () => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--color-border)]">
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-[var(--color-secondary)] tracking-wider uppercase font-semibold">
          <Database className="w-3.5 h-3.5" />
          <span>OMNI-REPOSITORY</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-text)] tracking-tight mt-1">
          Workspace Media Archive
        </h1>
        <p className="text-sm text-[var(--color-text-body)] mt-1">
          Centralized neural storage for continuous video ingestion, slide OCR & verbatim transcripts.
        </p>
      </div>

      <Link
        to="/ingest"
        className="btn-primary inline-flex items-center gap-2 self-start sm:self-auto"
      >
        <PlusCircle className="w-4 h-4" />
        <span>Ingest New Media</span>
      </Link>
    </div>
  );
};