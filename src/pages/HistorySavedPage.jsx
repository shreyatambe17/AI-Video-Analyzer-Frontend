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
  ExternalLink,
  Loader2
} from 'lucide-react';
import { AppLayout } from '../components/layout/AppLayout';
import { MOCK_HISTORY, MOCK_MEDIA_ITEMS } from '../data/mockData';
import { api } from '../services/api';

export const HistorySavedPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // If path is /saved or query has saved, default to saved tab
  const isSavedPath = location.pathname === '/saved' || location.search.includes('saved');
  const [activeTab, setActiveTab] = useState(isSavedPath ? 'saved' : 'activity'); // 'activity' | 'saved'
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

  const getActivityIcon = (type, color) => {
    switch (type) {
      case 'watch':
        return (
          <div className="w-8 h-8 rounded-full bg-blue-500/15 text-blue-400 flex items-center justify-center shrink-0">
            <Play className="w-4 h-4 fill-blue-400 ml-0.5" />
          </div>
        );
      case 'summary':
        return (
          <div className="w-8 h-8 rounded-full bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
        );
      case 'notes':
        return (
          <div className="w-8 h-8 rounded-full bg-amber-500/15 text-amber-400 flex items-center justify-center shrink-0">
            <FileText className="w-4 h-4" />
          </div>
        );
      case 'quiz':
        return (
          <div className="w-8 h-8 rounded-full bg-purple-500/15 text-purple-400 flex items-center justify-center shrink-0">
            <HelpCircle className="w-4 h-4" />
          </div>
        );
      case 'upload':
        return (
          <div className="w-8 h-8 rounded-full bg-cyan-500/15 text-cyan-400 flex items-center justify-center shrink-0">
            <UploadCloud className="w-4 h-4" />
          </div>
        );
      default:
        return (
          <div className="w-8 h-8 rounded-full bg-indigo-500/15 text-indigo-400 flex items-center justify-center shrink-0">
            <Clock className="w-4 h-4" />
          </div>
        );
    }
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header (Matching Screen 7) */}
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            History
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Your recent activity on the platform
          </p>
        </div>

        {/* Segmented Tab Bar (Matching Screen 7) */}
        <div className="flex items-center">
          <div className="flex items-center gap-1.5 p-1 bg-[#121828] border border-slate-800 rounded-xl w-full max-w-sm">
            <button
              type="button"
              onClick={() => setActiveTab('activity')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-semibold text-center transition-all ${
                activeTab === 'activity'
                  ? 'bg-[#5850ec] text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Recent Activity
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('saved')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-semibold text-center transition-all ${
                activeTab === 'saved'
                  ? 'bg-[#5850ec] text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Saved Summaries
            </button>
          </div>
        </div>

        {/* TAB 1: RECENT ACTIVITY LIST (Matching Screen 7) */}
        {activeTab === 'activity' && (
          <div className="space-y-3">
            {historyList.map((item) => (
              <div
                key={item.id}
                className="bg-[#121828] border border-slate-800/80 hover:border-indigo-500/40 rounded-2xl p-4 flex items-center justify-between gap-4 transition-all hover:shadow-lg group"
              >
                {/* Left: Icon + Text & Timestamp */}
                <div className="flex items-center gap-3.5 min-w-0">
                  {getActivityIcon(item.type, item.color)}

                  <div className="min-w-0">
                    <h3 className="text-xs sm:text-sm font-semibold text-white group-hover:text-indigo-300 transition-colors truncate">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {item.timestamp}
                    </p>
                  </div>
                </div>

                {/* Right: View Button & 3-Dots Menu */}
                <div className="flex items-center gap-2.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => navigate('/chat')}
                    className="px-3.5 py-1.5 rounded-xl border border-slate-700/80 hover:border-indigo-500 hover:bg-[#5850ec]/15 text-xs font-medium text-slate-200 hover:text-white transition-all cursor-pointer"
                  >
                    View
                  </button>
                  <button
                    type="button"
                    aria-label="Options"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: SAVED SUMMARIES */}
        {activeTab === 'saved' && (
          <div className="space-y-3">
            {savedList.map((item) => (
              <div
                key={item.id}
                className="bg-[#121828] border border-slate-800/80 hover:border-indigo-500/40 rounded-2xl p-4 flex items-center justify-between gap-4 transition-all hover:shadow-lg group"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/15 text-indigo-400 flex items-center justify-center shrink-0">
                    <Bookmark className="w-4 h-4 fill-indigo-400" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xs sm:text-sm font-semibold text-white group-hover:text-indigo-300 transition-colors truncate">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Saved on {item.date} • {item.type}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => navigate('/notes')}
                    className="px-3.5 py-1.5 rounded-xl border border-slate-700/80 hover:border-indigo-500 hover:bg-[#5850ec]/15 text-xs font-medium text-slate-200 hover:text-white transition-all cursor-pointer"
                  >
                    Open Summary
                  </button>
                  <button
                    type="button"
                    aria-label="Options"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </AppLayout>
  );
};

export default HistorySavedPage;
