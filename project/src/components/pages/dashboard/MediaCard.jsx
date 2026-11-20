import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, FileText, Download, Users, Layers, Clock, Sparkles } from 'lucide-react';
import { StatusBadge } from '../../common/StatusBadge';

export const MediaCard = ({ item }) => {
  return (
    <div className="bg-[#0b0e17] border border-slate-800 hover:border-cyan-500/40 rounded-2xl p-4 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/5 group flex flex-col justify-between">
      <div>
        {/* Thumbnail & Badges */}
        <div className="relative rounded-xl overflow-hidden aspect-video bg-slate-900 border border-slate-800">
          <img
            src={item.thumbnail}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

          {/* Status Badge */}
          <div className="absolute top-3 left-3">
            <StatusBadge label={item.status} variant={item.statusType} />
          </div>

          {/* Languages & Duration */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
            <div className="flex items-center gap-1">
              {item.languages.map((lang) => (
                <span
                  key={lang}
                  className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-black/70 text-slate-200 border border-white/10"
                >
                  {lang}
                </span>
              ))}
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-cyan-950/90 text-cyan-300 border border-cyan-500/40 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {item.duration}
            </span>
          </div>
        </div>

        {/* Info Content */}
        <div className="mt-4">
          <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
            {item.title}
          </h3>
          
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-2 font-mono">
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-slate-500" />
              {item.speakers.join(', ')}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <FileText className="w-3.5 h-3.5 text-slate-500" />
              {item.wordCount.toLocaleString()} words
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-slate-500" />
              {item.chapterCount} Chapters
            </span>
          </div>

          <p className="text-xs text-slate-400 mt-2.5 line-clamp-2 leading-relaxed">
            {item.summary}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-3 gap-2 mt-5 pt-4 border-t border-slate-800/80">
        <Link
          to="/chat"
          className="px-3 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Open Chat</span>
        </Link>
        
        <Link
          to="/transcript"
          className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Transcript</span>
        </Link>

        <Link
          to="/export"
          className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
        >
          <Download className="w-3.5 h-3.5" />
          <span>PDF</span>
        </Link>
      </div>
    </div>
  );
};
