import React, { useState } from 'react';
import { Mic, MicOff, Send, Sparkles } from 'lucide-react';

export const MultimodalInputBar = ({ onSendMessage }) => {
  const [query, setQuery] = useState('');
  const [isMicActive, setIsMicActive] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    onSendMessage(query);
    setQuery('');
  };

  return (
    <div className="sticky bottom-16 z-40 bg-[#070a11]/90 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-2.5 my-4 shadow-2xl shadow-cyan-500/10">
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        
        {/* Microphone Toggle */}
        <button
          type="button"
          onClick={() => setIsMicActive(!isMicActive)}
          className={`p-3 rounded-xl border transition-all ${
            isMicActive
              ? 'bg-rose-950 border-rose-500 text-rose-400 animate-pulse shadow-lg shadow-rose-500/30'
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40'
          }`}
          title={isMicActive ? "Stop Voice Recording" : "Voice Input"}
        >
          {isMicActive ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
        </button>

        {/* Input Text Box */}
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-400 font-mono font-bold text-sm select-none">&gt;</span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter multimodal query (e.g. 'Summarize memory bottlenecks between 12:00 and 14:15')..."
            className="w-full pl-8 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm font-mono text-cyan-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/30"
          />
        </div>

        {/* Send Button */}
        <button
          type="submit"
          disabled={!query.trim()}
          className="p-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 text-black font-bold transition-all shadow-lg shadow-cyan-500/20"
        >
          <Send className="w-4 h-4 fill-black" />
        </button>
      </form>
    </div>
  );
};
