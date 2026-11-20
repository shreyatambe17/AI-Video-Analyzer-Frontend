import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  ChevronDown, 
  CheckCircle2, 
  Clock, 
  MoreVertical, 
  Play, 
  FileText, 
  ExternalLink,
  Loader2,
  Trash2
} from 'lucide-react';
import { AppLayout } from '../components/layout/AppLayout';
import { MOCK_MEDIA_ITEMS } from '../data/mockData';
import { api } from '../services/api';

export const SummariesPage = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState(MOCK_MEDIA_ITEMS);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'video' | 'audio'
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  useEffect(() => {
    setIsLoading(true);
    api.getMedia(searchQuery, activeFilter)
      .then(res => {
        if (res && res.length > 0) setItems(res);
      })
      .finally(() => setIsLoading(false));
  }, [searchQuery, activeFilter]);

  const filteredItems = items.filter((item) => {
    if (selectedStatus === 'completed' && item.status !== 'Completed') return false;
    if (selectedStatus === 'processing' && item.status !== 'Processing') return false;
    return true;
  });

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this summary?')) {
      await api.deleteMedia(id);
      setItems(prev => prev.filter(m => m.id !== id));
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        
        {/* Header (Matching Screen 3) */}
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Summaries
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            View and manage all your video summaries
          </p>
        </div>

        {/* Filter Bar (Matching Screen 3) */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          
          {/* Search bar */}
          <div className="relative w-full lg:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search summaries..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#121828] border border-slate-800 text-slate-200 placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            />
          </div>

          {/* Filter pills & Dropdowns */}
          <div className="flex flex-wrap items-center gap-2.5">
            
            {/* Filter pills */}
            <div className="flex items-center gap-1.5 p-1 bg-[#121828] border border-slate-800 rounded-xl">
              <button
                type="button"
                onClick={() => setActiveFilter('all')}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  activeFilter === 'all'
                    ? 'bg-[#5850ec] text-white shadow-xs'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter('video')}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  activeFilter === 'video'
                    ? 'bg-[#5850ec] text-white shadow-xs'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                Video
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter('audio')}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  activeFilter === 'audio'
                    ? 'bg-[#5850ec] text-white shadow-xs'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                Audio
              </button>
            </div>

            {/* All Languages Dropdown */}
            <div className="relative">
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="appearance-none bg-[#121828] border border-slate-800 text-slate-300 text-xs font-medium rounded-xl pl-3 pr-7 py-2 focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                <option value="all">All Languages</option>
                <option value="en">English</option>
                <option value="es">Spanish</option>
              </select>
              <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* All Status Dropdown */}
            <div className="relative">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="appearance-none bg-[#121828] border border-slate-800 text-slate-300 text-xs font-medium rounded-xl pl-3 pr-7 py-2 focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="processing">Processing</option>
              </select>
              <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

          </div>

        </div>

        {/* List of Summaries (Matching Screen 3) */}
        <div className="space-y-3.5">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-[#121828] border border-slate-800/80 hover:border-indigo-500/40 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/5 group"
            >
              {/* Left Column: Thumbnail + Info */}
              <div className="flex items-center gap-4">
                
                {/* Thumbnail with duration badge */}
                <div 
                  onClick={() => navigate('/notes')}
                  className="relative w-36 sm:w-44 aspect-video rounded-xl overflow-hidden bg-slate-900 shrink-0 cursor-pointer"
                >
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute bottom-1.5 right-1.5">
                    <span className="bg-black/80 backdrop-blur-xs text-[10px] font-mono text-white px-1.5 py-0.5 rounded font-medium">
                      {item.duration}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-1.5">
                  <h3 
                    onClick={() => navigate('/notes')}
                    className="text-sm sm:text-base font-semibold text-white group-hover:text-indigo-400 cursor-pointer transition-colors"
                  >
                    {item.title}
                  </h3>
                  
                  <p className="text-xs text-slate-400">
                    {item.date}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md text-[11px] bg-slate-800/80 text-slate-400 border border-slate-700/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right Column: Status & View Summary Button */}
              <div className="flex items-center justify-between md:justify-end gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-800/60">
                {/* Status Badge */}
                {item.status === 'Completed' ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-950/60 text-emerald-400 border border-emerald-500/30">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Completed
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-950/60 text-amber-400 border border-amber-500/30">
                    <Clock className="w-3.5 h-3.5 animate-spin" />
                    Processing
                  </span>
                )}

                {/* View Summary Button */}
                <button
                  type="button"
                  onClick={() => navigate('/notes')}
                  className="px-3.5 py-1.5 rounded-xl border border-slate-700 hover:border-indigo-500 text-xs font-medium text-slate-200 hover:text-white hover:bg-[#5850ec]/20 transition-all flex items-center gap-1.5"
                >
                  <span>View Summary</span>
                </button>

                {/* 3-dots menu */}
                <button
                  type="button"
                  aria-label="Options"
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                >
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </AppLayout>
  );
};

export default SummariesPage;
