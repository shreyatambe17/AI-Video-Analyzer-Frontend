import React from 'react';
import { Activity, Cpu } from 'lucide-react';
import { MOCK_TELEMETRY } from '../../../data/mockData';

export const TelemetryHeader = () => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800 font-mono">
      <div>
        <div className="flex items-center gap-2 text-xs text-cyan-400 tracking-wider uppercase font-semibold">
          <Activity className="w-3.5 h-3.5 text-cyan-400" />
          <span>REAL-TIME SYSTEM DIAGNOSTICS</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
          {MOCK_TELEMETRY.modelName} Telemetry Log
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          GPU token bandwidth, latency telemetry, and consensus verification logs.
        </p>
      </div>

      <div className="px-3 py-1.5 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-xs text-cyan-300 font-bold flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
        <span>{MOCK_TELEMETRY.activeSystem}</span>
      </div>
    </div>
  );
};
