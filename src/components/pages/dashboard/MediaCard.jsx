import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Video, Mic, MoreVertical, Play, MessageSquare, FileText, Download } from 'lucide-react';

export const MediaCard = ({ item }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const isAudio = item.type === 'Audio';

  return (
    <div className="bg-[#121828] border border-slate-800/90 hover:border-indigo-500/50 rounded-2xl p-3.5 transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/5 group flex flex-col justify-between relative">
      
      {/* Thumbnail area with duration badge */}
      <div 
        onClick={() => navigate(`/chat?mediaId=${encodeURIComponent(item.id)}`)}
        className="relative rounded-xl overflow-hidden aspect-[16/9] bg-slate-900 cursor-pointer group-hover:brightness-105 transition-all"
      >
        <img
          src={item.thumbnail}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Subtle dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Hover play icon indicator */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-10 h-10 rounded-full bg-[#5850ec]/90 text-white flex items-center justify-center shadow-lg">
            <Play className="w-4 h-4 fill-white ml-0.5" />
          </div>
        </div>

        {/* Duration badge at bottom right */}
        <div className="absolute bottom-2.5 right-2.5">
          <span className="bg-black/80 backdrop-blur-xs text-[11px] font-mono text-white px-2 py-0.5 rounded-md font-medium tracking-tight">
            {item.duration}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="pt-3">
        <Link 
          to={`/chat?mediaId=${encodeURIComponent(item.id)}`}
          className="text-sm font-semibold text-white group-hover:text-indigo-400 transition-colors line-clamp-1 block"
        >
          {item.title}
        </Link>

        <p className="text-xs text-slate-400 mt-1">
          {item.date} • {item.size}
        </p>

        {/* Bottom Bar: Video/Audio Pill & 3 Dots Menu */}
        <div className="flex items-center justify-between pt-3 mt-2 border-t border-slate-800/60">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            {isAudio ? (
              <Mic className="w-3.5 h-3.5 text-purple-400" />
            ) : (
              <Video className="w-3.5 h-3.5 text-indigo-400" />
            )}
            <span className="text-xs text-slate-400">{item.type}</span>
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpen(!menuOpen);
              }}
              className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Options"
            >
              <MoreVertical className="w-4 h-4" />
            </button>

            {menuOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setMenuOpen(false)} 
                />
                <div className="absolute right-0 bottom-full mb-1 w-44 bg-[#1a2238] border border-slate-700/80 rounded-xl shadow-xl z-50 py-1.5 text-xs text-slate-200">
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      navigate(`/chat?mediaId=${encodeURIComponent(item.id)}`);
                    }}
                    className="w-full px-3 py-2 text-left hover:bg-slate-700/60 flex items-center gap-2"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-indigo-400" />
                    Open Chat & Video
                  </button>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      navigate('/notes');
                    }}
                    className="w-full px-3 py-2 text-left hover:bg-slate-700/60 flex items-center gap-2"
                  >
                    <FileText className="w-3.5 h-3.5 text-purple-400" />
                    Notes & Chapters
                  </button>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      navigate('/export');
                    }}
                    className="w-full px-3 py-2 text-left hover:bg-slate-700/60 flex items-center gap-2"
                  >
                    <Download className="w-3.5 h-3.5 text-emerald-400" />
                    Export PDF
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

    </div>
  );
};

export default MediaCard;
