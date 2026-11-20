import React, { useState } from 'react';
import { Play, Pause, Maximize2, ShieldCheck, Zap, Volume2 } from 'lucide-react';

export const CyberVideoPlayer = ({ currentTime = "00:14:28.450", speaker = "SPK_01: DR. THORNE" }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState('1.50x');

  return (
    <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-cyan-500/30 my-4 shadow-2xl shadow-cyan-500/10 group">
      
      {/* Video Content Graphic */}
      <div className="relative aspect-video w-full bg-slate-900 overflow-hidden flex items-center justify-center">
        <img
          src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80"
          alt="Stanford AI Lecture video feed"
          className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
        />

        {/* Top Overlay Bar */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/80 border border-emerald-500/40 text-emerald-400 font-semibold backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>FEED_ACTIVE // SYNCED</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-slate-950/80 border border-cyan-500/40 text-cyan-300 font-semibold backdrop-blur-md">
              4K @ 60.02 FPS
            </span>
            <button className="p-1.5 rounded-full bg-slate-950/80 border border-slate-700 text-slate-300 hover:text-cyan-400 backdrop-blur-md transition-colors">
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Center Play/Pause Toggle */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-16 h-16 rounded-full bg-cyan-950/80 border-2 border-cyan-400 text-cyan-300 flex items-center justify-center shadow-xl shadow-cyan-500/30 hover:scale-110 transition-transform backdrop-blur-md"
        >
          {isPlaying ? (
            <Pause className="w-7 h-7 fill-cyan-300" />
          ) : (
            <Play className="w-7 h-7 fill-cyan-300 ml-1" />
          )}
        </button>

        {/* Bottom Video Controls Bar */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono">
          <div className="px-3.5 py-1.5 rounded-xl bg-slate-950/90 border border-slate-700 text-cyan-300 font-bold backdrop-blur-md flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-cyan-400" />
            <span>{currentTime}</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-200">{speaker}</span>
          </div>

          <button
            onClick={() => setPlaybackSpeed(prev => prev === '1.50x' ? '2.00x' : '1.50x')}
            className="px-3 py-1.5 rounded-xl bg-amber-950/80 border border-amber-500/40 text-amber-300 font-bold backdrop-blur-md hover:bg-amber-900/80 transition-colors"
          >
            {playbackSpeed}
          </button>
        </div>

      </div>
    </div>
  );
};
