import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Sparkles, Layers, Cpu, CheckCircle2 } from 'lucide-react';
import { ProgressBar } from '../../common/ProgressBar';

export const ActivePayloadCard = ({ payload }) => {
  const navigate = useNavigate();

  const handleStartProcessing = () => {
    navigate('/processing');
  };

  return (
    <div className="bg-[#0b0e17] border border-cyan-500/30 rounded-2xl p-6 my-6 backdrop-blur-md relative overflow-hidden shadow-xl shadow-cyan-500/10">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-widest">
            ACTIVE_PAYLOAD_STAGE
          </span>
        </div>
        <span className="text-xs font-mono font-semibold text-cyan-400 bg-cyan-950/80 px-2.5 py-0.5 rounded border border-cyan-500/30">
          [PAYLOAD_BUFFERED]
        </span>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mt-4">
        
        {/* Media Preview Thumbnail & Details */}
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative w-24 h-16 rounded-xl bg-slate-900 border border-cyan-500/30 overflow-hidden flex-shrink-0 flex items-center justify-center">
            <img
              src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=300&q=80"
              alt="Payload preview"
              className="w-full h-full object-cover opacity-70"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <Play className="w-6 h-6 text-cyan-400 fill-cyan-400/30" />
            </div>
          </div>

          <div>
            <h4 className="text-base font-bold font-mono text-white tracking-wide">
              {payload?.name || 'MIT_Quantum_Lecture_08.mp4'}
            </h4>
            <p className="text-xs font-mono text-slate-400 mt-1">
              {payload?.size || '1.42 GB'} • {payload?.duration || '01:48:22'} • <span className="text-cyan-400">{payload?.codec || 'H.265 / 4K'}</span>
            </p>
          </div>
        </div>

        {/* Progress Bar & Initiate Button */}
        <div className="w-full md:w-1/2 space-y-3">
          <ProgressBar progress={100} color="cyan" height="h-2" />
          
          <button
            onClick={handleStartProcessing}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 via-cyan-500 to-blue-600 hover:from-purple-500 hover:to-cyan-400 text-white font-mono text-sm font-bold tracking-wider uppercase shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all flex items-center justify-center gap-2 group"
          >
            <Sparkles className="w-5 h-5 text-white group-hover:scale-125 transition-transform" />
            <span>[ INITIATE NEURAL INGESTION ]</span>
          </button>
        </div>

      </div>

      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
        <span className="flex items-center gap-1 text-emerald-400">
          <CheckCircle2 className="w-3.5 h-3.5" />
          SYSTEM TELEMETRY CHANNEL READY
        </span>
        <span>LATENCY: 12ms</span>
      </div>
    </div>
  );
};
