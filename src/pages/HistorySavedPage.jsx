import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Play, 
  Sparkles, 
  FileText, 
  HelpCircle, 
  UploadCloud, 
  MoreVertical, 
  Bookmark, 
  Clock, 
  Loader2,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppLayout } from '../components/layout/AppLayout';
import { MOCK_HISTORY, MOCK_MEDIA_ITEMS } from '../data/mockData';
import { api } from '../services/api';

export const HistorySavedPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isSavedPath = location.pathname === '/saved' || location.search.includes('saved');
  const [activeTab, setActiveTab] = useState(isSavedPath ? 'saved' : 'activity');
  const [historyList, setHistoryList] = useState(MOCK_HISTORY);
  const [savedList, setSavedList] = useState(MOCK_MEDIA_ITEMS);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    Promise.all([api.getHistory(), api.getMedia('', 'all')])
      .then(([historyData, mediaData]) => {
        if (historyData && historyData.length > 0) setHistoryList(historyData);
        if (mediaData && mediaData.length > 0) setSavedList(mediaData);
      })
      .finally(() => setIsLoading(false));
  }, []);

  // Unique images logic for square cards (kyunki backend se same image aa rahi hai)
  const getCardImage = (item) => {
    const fallbackImages = [
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80",
    ];
    if (item.thumbnail && !item.thumbnail.includes("photo-1506744038136") && !item.thumbnail.includes("photo-1516321318423")) {
      return item.thumbnail;
    }
    const stringId = String(item.id || item.title || 'default');
    let hash = 0;
    for (let i = 0; i < stringId.length; i++) hash = stringId.charCodeAt(i) + ((hash << 5) - hash);
    return fallbackImages[Math.abs(hash) % fallbackImages.length];
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'watch': return <div className="w-8 h-8 rounded-lg bg-[var(--color-secondary-soft)] text-[var(--color-secondary)] flex items-center justify-center"><Play className="w-4 h-4 fill-[var(--color-secondary)] ml-0.5" /></div>;
      case 'summary': return <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-500 flex items-center justify-center"><Sparkles className="w-4 h-4" /></div>;
      case 'notes': return <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-500 flex items-center justify-center"><FileText className="w-4 h-4" /></div>;
      case 'quiz': return <div className="w-8 h-8 rounded-lg bg-[var(--color-primary-soft)] text-[var(--color-primary)] flex items-center justify-center"><HelpCircle className="w-4 h-4" /></div>;
      case 'upload': return <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-500 flex items-center justify-center"><UploadCloud className="w-4 h-4" /></div>;
      default: return <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-500 flex items-center justify-center"><Clock className="w-4 h-4" /></div>;
    }
  };

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto space-y-6 animate-fade-in">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-[var(--color-text)] tracking-tight">
              {activeTab === 'activity' ? 'History' : 'Saved Summaries'}
            </h1>
            <p className="text-sm text-[var(--color-text-body)] mt-1">
              {activeTab === 'activity' ? 'Your recent activity on the platform.' : 'Your bookmarked study materials.'}
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex items-center gap-1.5 p-1 bg-white/60 border border-[var(--color-border)] rounded-xl w-full sm:max-w-xs shadow-sm shrink-0">
            <button
              type="button"
              onClick={() => setActiveTab('activity')}
              className={`flex-1 py-2 rounded-lg text-xs font-semibold text-center transition-all duration-300 ${
                activeTab === 'activity'
                  ? 'bg-[var(--color-primary)] text-white shadow-md'
                  : 'text-[var(--color-text-body)] hover:bg-white'
              }`}
            >
              Activity
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('saved')}
              className={`flex-1 py-2 rounded-lg text-xs font-semibold text-center transition-all duration-300 ${
                activeTab === 'saved'
                  ? 'bg-[var(--color-secondary)] text-white shadow-md'
                  : 'text-[var(--color-text-body)] hover:bg-white'
              }`}
            >
              Saved
            </button>
          </div>
        </div>

        {/* Content Area */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-[var(--color-primary)] gap-3">
            <Loader2 className="w-8 h-8 animate-spin" />
            <span className="text-sm font-bold animate-pulse">Loading your data...</span>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            
            {/* TAB 1: RECENT ACTIVITY (Square Grid) */}
            {activeTab === 'activity' && (
              <motion.div 
                key="activity"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
              >
                {historyList.map((item) => (
                  <div key={item.id} className="glass-card p-5 flex flex-col justify-between group hover:scale-[1.02] transition-transform duration-300">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      {getActivityIcon(item.type)}
                      <button className="p-1.5 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary-soft)] transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-[var(--color-text)] leading-snug line-clamp-2 group-hover:text-[var(--color-primary)] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-[11px] font-medium text-[var(--color-text-muted)] mt-2 flex items-center gap-1.5">
                        <Clock className="w-3 h-3" /> {item.timestamp}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-[var(--color-border)] flex justify-end">
                      <button
                        onClick={() => navigate('/chat')}
                        className="text-xs font-semibold text-[var(--color-primary)] flex items-center gap-1 hover:underline"
                      >
                        View Details <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {/* TAB 2: SAVED SUMMARIES (Square Grid with Images) */}
            {activeTab === 'saved' && (
              <motion.div 
                key="saved"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {savedList.map((item) => (
                  <div key={item.id} className="glass-card overflow-hidden group flex flex-col justify-between hover:scale-[1.02] hover:shadow-2xl hover:shadow-[var(--color-secondary)]/20 transition-all duration-300">
                    
                    {/* Image Thumbnail */}
                    <div className="relative aspect-video bg-slate-200 overflow-hidden">
                      <img 
                        src={getCardImage(item)} 
                        alt={item.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      
                      {/* Top Right Badge */}
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded-md shadow-sm">
                        <Bookmark className="w-3.5 h-3.5 fill-[var(--color-secondary)] text-[var(--color-secondary)]" />
                      </div>
                      
                      {/* Bottom Left Info */}
                      <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 bg-black/60 backdrop-blur-md rounded-md text-white text-[10px] font-semibold">
                        {item.duration}
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-sm font-bold text-[var(--color-text)] leading-snug line-clamp-2 group-hover:text-[var(--color-secondary)] transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-[11px] font-medium text-[var(--color-text-muted)] mt-1.5">
                          Saved on {item.date} • <span className="text-[var(--color-secondary)] font-bold">{item.type}</span>
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-3 mt-3 border-t border-[var(--color-border)]">
                        <button 
                          onClick={() => navigate('/notes')} 
                          className="text-xs font-bold text-[var(--color-secondary)] hover:text-[var(--color-primary)] transition-colors flex items-center gap-1"
                        >
                          Open Summary
                        </button>
                        <button className="p-1.5 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-secondary)] hover:bg-[var(--color-secondary-soft)] transition-colors">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                  </div>
                ))}
              </motion.div>
            )}

          </AnimatePresence>
        )}

      </div>
    </AppLayout>
  );
};

export default HistorySavedPage;