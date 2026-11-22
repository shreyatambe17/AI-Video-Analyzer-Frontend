import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Video, Mic, MoreVertical, Play, MessageSquare, FileText, Download } from 'lucide-react';
import { motion } from 'framer-motion';

export const MediaCard = ({ item }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const isAudio = item.type === 'Audio';

  // 🔥 FIX: 10 Unique High-Quality Images
  const uniqueImages = [
    "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=600&q=80", // AI/Robot
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80", // Cyber Security
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80", // Coding
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80", // Matrix/Data
    "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=600&q=80", // Tech Setup
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80", // Globe/Network
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80", // Office/Work
    "https://images.unsplash.com/photo-1531297172861-cc90e30c83e1?auto=format&fit=crop&w=600&q=80", // Laptop dark
    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80", // Circuit board
    "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=600&q=80", // Tech laptop
  ];

  // 🔥 LOGIC: Har item ke ID se ek unique index nikalna
  const getUniqueImage = () => {
    // Agar backend se koi image aa rahi hai jo in default hand/laptop wali images se alag hai, toh use karo
    const isGenericUrl = !item.thumbnail || item.thumbnail.includes("photo-1516321318423") || item.thumbnail.includes("photo-1506744038136");
    
    if (!isGenericUrl) {
      return item.thumbnail; // Agar unique image hai toh wahi dikhao
    }

    // Agar generic/same image hai, toh ID ke characters ka sum le kar unique image select karo
    const stringId = String(item.id || item.title || 'default');
    let hash = 0;
    for (let i = 0; i < stringId.length; i++) {
      hash = stringId.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % uniqueImages.length;
    return uniqueImages[index];
  };

  return (
    <motion.div 
      variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
      className="glass-card overflow-hidden group flex flex-col justify-between relative transition-all duration-300 hover:scale-[1.03] hover:z-10 hover:shadow-2xl hover:shadow-[var(--color-primary)]/20 cursor-pointer"
    >
      
      {/* Thumbnail area */}
      <div 
        onClick={() => navigate(`/chat?mediaId=${encodeURIComponent(item.id)}`)}
        className="relative rounded-t-2xl overflow-hidden aspect-[16/9] bg-slate-200"
      >
        <img
          src={getUniqueImage()}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100">
          <div className="w-12 h-12 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center shadow-lg shadow-[var(--color-primary)]/40 backdrop-blur-md">
            <Play className="w-5 h-5 fill-white ml-0.5" />
          </div>
        </div>

        {/* Duration badge */}
        <div className="absolute bottom-3 right-3">
          <span className="bg-white/90 backdrop-blur-md text-[10px] font-bold text-[var(--color-text)] px-2 py-1 rounded-md shadow-sm">
            {item.duration}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-3.5 flex-1 flex flex-col justify-between">
        <div>
          <Link 
            to={`/chat?mediaId=${encodeURIComponent(item.id)}`}
            className="text-sm font-bold text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors line-clamp-2 leading-snug"
          >
            {item.title}
          </Link>

          <p className="text-[11px] font-medium text-[var(--color-text-muted)] mt-1.5 flex items-center gap-1.5">
            <span>{item.date}</span>
            <span className="w-1 h-1 rounded-full bg-[var(--color-text-muted)]/50" />
            <span>{item.size}</span>
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="flex items-center justify-between pt-2.5 mt-3 border-t border-[var(--color-border)]">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white/50">
            {isAudio ? (
              <Mic className="w-3 h-3 text-[var(--color-primary)]" />
            ) : (
              <Video className="w-3 h-3 text-[var(--color-secondary)]" />
            )}
            <span className="text-[10px] font-semibold text-[var(--color-text-body)]">{item.type}</span>
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpen(!menuOpen);
              }}
              className="p-1.5 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary-soft)] transition-colors"
            >
              <MoreVertical className="w-3.5 h-3.5" />
            </button>

            {menuOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
                <div className="absolute right-0 bottom-full mb-2 w-48 glass-strong rounded-xl shadow-xl z-50 py-1.5 text-xs text-[var(--color-text-body)] animate-slide-up">
                  <button
                    onClick={() => { setMenuOpen(false); navigate(`/chat?mediaId=${encodeURIComponent(item.id)}`); }}
                    className="w-full px-3.5 py-2 text-left hover:bg-[var(--color-primary-soft)] hover:text-[var(--color-primary)] flex items-center gap-2 font-medium transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" /> Open Chat
                  </button>
                  <button
                    onClick={() => { setMenuOpen(false); navigate('/notes'); }}
                    className="w-full px-3.5 py-2 text-left hover:bg-[var(--color-primary-soft)] hover:text-[var(--color-primary)] flex items-center gap-2 font-medium transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5" /> Notes & Chapters
                  </button>
                  <button
                    onClick={() => { setMenuOpen(false); navigate('/export'); }}
                    className="w-full px-3.5 py-2 text-left hover:bg-[var(--color-primary-soft)] hover:text-[var(--color-primary)] flex items-center gap-2 font-medium transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" /> Export PDF
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

    </motion.div>
  );
};

export default MediaCard;