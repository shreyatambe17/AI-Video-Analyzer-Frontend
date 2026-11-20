import React, { useState } from 'react';
import { 
  Zap, 
  Play, 
  Copy, 
  Bookmark, 
  Volume2, 
  ThumbsUp, 
  ThumbsDown, 
  Download,
  Check,
  Sparkles
} from 'lucide-react';

export const AiChatStream = ({ messages, onTimestampClick }) => {
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [playingTts, setPlayingTts] = useState(false);

  const handleCopy = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-6 my-6 font-mono">
      {messages.map((msg, idx) => (
        <div key={idx} className="space-y-4">
          
          {/* User Query */}
          <div className="bg-cyan-950/40 border border-cyan-500/30 rounded-2xl p-4 text-xs">
            <div className="text-[10px] text-cyan-400 font-semibold mb-1">
              OPERATOR :: LOCAL @ 14:29:10
            </div>
            <p className="text-cyan-200 text-sm font-semibold">
              <span className="text-cyan-400">&gt; query:</span> {msg.query}
            </p>
          </div>

          {/* AI Exec Response */}
          <div className="bg-[#0b0e17] border border-cyan-500/30 rounded-2xl p-5 shadow-xl shadow-cyan-500/5 space-y-4">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
              <div className="flex items-center gap-2 text-cyan-400 font-bold">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>OMNI_CORE::EXEC_RESPONSE</span>
              </div>
              <span className="px-2.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30 text-[10px] font-semibold">
                MATCH: 99.4% // MULTI_ASR
              </span>
            </div>

            {/* Answer Content */}
            <p className="text-sm font-sans text-slate-200 leading-relaxed">
              Speaker <span className="text-cyan-300 font-mono font-bold">SPK_01 (Dr. Thorne)</span> demonstrates quadratic attention scaling creates severe GPU VRAM saturation during raw 4K streaming ingest:
            </p>

            {/* Timestamp Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => onTimestampClick('12:34')}
                className="px-3 py-1.5 rounded-lg bg-cyan-950/80 border border-cyan-500/40 hover:bg-cyan-900 text-cyan-300 text-xs font-mono font-bold flex items-center gap-1.5 transition-colors"
              >
                <Play className="w-3 h-3 fill-cyan-300" />
                <span>&gt; T_STAMP: 12:34</span>
              </button>

              <button
                onClick={() => onTimestampClick('13:48')}
                className="px-3 py-1.5 rounded-lg bg-cyan-950/80 border border-cyan-500/40 hover:bg-cyan-900 text-cyan-300 text-xs font-mono font-bold flex items-center gap-1.5 transition-colors"
              >
                <Play className="w-3 h-3 fill-cyan-300" />
                <span>&gt; T_STAMP: 13:48</span>
              </button>
            </div>

            {/* Raw Audio Verbatim Quote Box */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs font-mono">
              <div className="flex items-center justify-between pb-2 border-b border-slate-900 mb-2 text-slate-400">
                <span className="text-cyan-400 font-bold">[RAW_AUDIO_STREAM_VERBATIM [12:34]]</span>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => handleCopy("Once spatial dimensions exceed 2160p...", idx)}
                    className="p-1 text-slate-400 hover:text-cyan-300 transition-colors"
                    title="Copy Verbatim Quote"
                  >
                    {copiedIndex === idx ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                  <button className="p-1 text-slate-400 hover:text-cyan-300 transition-colors" title="Bookmark">
                    <Bookmark className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <p className="italic text-slate-300 font-serif text-sm leading-relaxed">
                "Once spatial dimensions exceed 2160p, standard matrix multiplication consumes roughly 78GB of high-bandwidth memory within six forward passes."
              </p>
            </div>

            {/* Translation Box */}
            <div className="bg-cyan-950/30 border border-cyan-500/30 rounded-xl p-4 text-xs font-mono">
              <div className="flex items-center justify-between pb-2 border-b border-cyan-500/20 mb-2 text-cyan-400">
                <span className="font-bold">[ES_SYS_TRANSLATION] MODEL: LATENT_v3</span>
                <span className="text-[10px] text-emerald-400">BLEU: 48.2</span>
              </div>
              <p className="text-cyan-100 font-sans text-sm leading-relaxed mb-3">
                "La atención cuadrática satura la memoria GPU durante la codificación de video en 4K, requiriendo tokenización espacial discontinua."
              </p>
              
              <button
                onClick={() => setPlayingTts(!playingTts)}
                className={`px-3 py-1.5 rounded-lg border text-xs font-mono font-semibold flex items-center gap-1.5 transition-colors ${
                  playingTts 
                    ? 'bg-purple-900 border-purple-500 text-purple-200 animate-pulse' 
                    : 'bg-slate-900 border-slate-700 text-slate-200 hover:border-cyan-500/40'
                }`}
              >
                <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>{playingTts ? 'SYNTHESIZING AUDIO...' : 'TTS_SYNTH'}</span>
              </button>
            </div>

            {/* Feedback Footer */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800 text-xs">
              <div className="flex items-center gap-3 text-slate-400">
                <span className="text-xs">Accuracy feedback:</span>
                <button className="flex items-center gap-1 text-slate-400 hover:text-emerald-400 transition-colors">
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>Accurate</span>
                </button>
                <button className="flex items-center gap-1 text-slate-400 hover:text-rose-400 transition-colors">
                  <ThumbsDown className="w-3.5 h-3.5" />
                </button>
              </div>

              <button className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-mono flex items-center gap-1.5 transition-colors">
                <Download className="w-3.5 h-3.5 text-cyan-400" />
                <span>EXPORT_TELEMETRY</span>
              </button>
            </div>

          </div>

        </div>
      ))}
    </div>
  );
};
