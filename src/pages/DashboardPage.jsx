import React, { useState, useEffect } from 'react';
import { Search, Plus, ChevronDown, Video, Mic, Loader2 } from 'lucide-react';
import { AppLayout } from '../components/layout/AppLayout';
import { MediaCard } from '../components/pages/dashboard/MediaCard';
import { UploadModal } from '../components/common/UploadModal';
import { api } from '../services/api';

export const DashboardPage = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'video' | 'audio'
  const [sortBy, setSortBy] = useState('newest');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const fetchMedia = async () => {
    setIsLoading(true);
    const media = await api.getMedia(searchQuery, activeFilter, sortBy);
    setItems(media);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchMedia();
  }, [searchQuery, activeFilter, sortBy]);

  const handleUploadComplete = (newItem) => {
    setItems((prev) => [newItem, ...prev.filter(m => m.id !== newItem.id)]);
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        
        {/* Top Header: Title & "+ Upload Media" Button (Matching Screen 2) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              My Media
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              Manage your uploaded videos and audio files
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsUploadModalOpen(true)}
            className="self-start sm:self-auto px-4 py-2 rounded-xl bg-[#5850ec] hover:bg-[#4f46e5] text-white text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-md shadow-indigo-600/25 transition-all active:scale-[0.98] cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Upload Media</span>
          </button>
        </div>

        {/* Search & Filter Bar (Matching Screen 2) */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          
          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search your videos..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#121828] border border-slate-800 text-slate-200 placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            />
          </div>

          {/* Filter Pills and Sort Dropdown */}
          <div className="flex items-center gap-2.5 overflow-x-auto pb-1 md:pb-0">
            {/* Filter pills */}
            <div className="flex items-center gap-1.5 p-1 bg-[#121828] border border-slate-800 rounded-xl">
              <button
                type="button"
                onClick={() => setActiveFilter('all')}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
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
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
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
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  activeFilter === 'audio'
                    ? 'bg-[#5850ec] text-white shadow-xs'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                Audio
              </button>
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-[#121828] border border-slate-800 text-slate-300 text-xs font-medium rounded-xl pl-3.5 pr-8 py-2 focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="size">Largest Size</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

        </div>

        {/* Media Grid: 3 columns matching Screen 2 */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400 gap-2">
            <Loader2 className="w-8 h-8 animate-spin text-[#5850ec]" />
            <span className="text-xs font-medium">Loading media library...</span>
          </div>
        ) : items.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {items.map((item) => (
              <MediaCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-[#121828]/60 border border-slate-800/60 rounded-2xl">
            <Video className="w-10 h-10 text-slate-600 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-300">No media found</p>
            <p className="text-xs text-slate-500 mt-1">Try clearing your search query or upload a new file.</p>
          </div>
        )}

      </div>

      {/* Upload Media Modal */}
      <UploadModal 
        isOpen={isUploadModalOpen} 
        onClose={() => setIsUploadModalOpen(false)} 
        onUploadComplete={handleUploadComplete} 
      />
    </AppLayout>
  );
};

export default DashboardPage;
