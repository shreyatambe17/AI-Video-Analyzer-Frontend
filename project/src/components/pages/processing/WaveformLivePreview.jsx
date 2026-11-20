import React from 'react';
import { Activity, Mic, Waves } from 'lucide-react';

export const WaveformLivePreview = () => {
  // Generate mock frequency bar heights
  const bars = [25, 45, 60, 85, 40, 70, 95, 100, 80, 65, 90, 50, 75, 45, 85, 95, 60, 40, 75, 55, 30, 85, 90, 60, 40, 20];

  return (
    <div className="bg-[#0b0e17] border border-cyan-500/20 rounded-2xl p-5 my-6 backdrop-blur-md">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4 text-xs font-mono text-cyan-400">
        <div className="flex items-center gap-2">
          <Waves className="w-4 h-4 text-cyan-400" />
          <span>FREQ_ANALYSIS [32Hz - 16kHz]</span>
        </div>
        <div className="flex items-center gap-3">
          <span>PEAK: -3.2 dBFS</span>
          <span>|</span>
          <span>RMS: -14 dB</span>
        </div>
      </div>

      {/* Animated Frequency Bars */}
      <div className="h-24 flex items-end justify-between gap-1 px-2 py-3 bg-slate-950/80 rounded-xl border border-slate-800">
        {bars.map((height, idx) => (
          <div
            key={idx}
            className="w-full rounded-t transition-all duration-300 bg-gradient-to-t from-cyan-600 via-cyan-400 to-purple-400 animate-pulse"
            style={{
              height: `${height}%`,
              animationDelay: `${(idx * 0.08).toFixed(2)}s`,
            }}
          />
        ))}
      </div>

      <div className="flex items-center justify-between mt-3 text-[11px] font-mono text-slate-400">
        <span>TIMESTAMP: 00:14:28.450</span>
        <span>FRAME #52,108</span>
        <span>TOTAL: 01:42:15.000</span>
      </div>
    </div>
  );
};
