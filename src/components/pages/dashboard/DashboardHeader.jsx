import React from 'react';
import { PlusCircle, Database, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export const DashboardHeader = () => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 tracking-wider uppercase font-semibold">
          <Database className="w-3.5 h-3.5 text-cyan-400" />
          <span>OMNI-REPOSITORY</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
          Workspace Media Archive
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Centralized neural storage for continuous video ingestion, slide OCR & verbatim transcripts.
        </p>
      </div>

      <Link
        to="/ingest"
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium text-sm shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all self-start sm:self-auto"
      >
        <PlusCircle className="w-4 h-4" />
        <span>Ingest New Media</span>
      </Link>
    </div>
  );
};
