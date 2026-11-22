import React, { useState, useEffect } from 'react';
import { Search, Plus, ChevronDown, Video, Loader2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppLayout } from '../components/layout/AppLayout';
import { MediaCard } from '../components/pages/dashboard/MediaCard';
import { UploadModal } from '../components/common/UploadModal';
import { api } from '../services/api';

export const DashboardPage = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all'); 
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
      <div className="space-y-6 animate-fade-in">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[var(--color-secondary)] tracking-wider uppercase font-semibold mb-1">
              <Sparkles className="w-4 h-4 text-[var(--color-secondary)]" />
              <span>My Workspace</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text)] tracking-tight">
              My Media Library
            </h1>
            <p className="text-sm text-[var(--color-text-body)] mt-1">
              Manage, search and explore your uploaded videos and audio files.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsUploadModalOpen(true)}
            className="btn-primary flex items-center gap-2 self-start sm:self-auto"
          >
            <Plus className="w-5 h-5" />
            <span>Upload Media</span>
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 glass-card p-3 sm:p-4">
          
          <div className="relative w-full lg:w-96">
            <Search className="w-4 h-4 text-[var(--color-text-muted)] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search videos, audio, topics..."
              className="input-glass pl-11"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full lg:w-auto overflow-x-auto pb-1 lg:pb-0">
            <div className="flex items-center gap-1 p-1 bg-white/60 border border-[var(--color-border)] rounded-xl shrink-0">
              {['all', 'video', 'audio'].map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all duration-300 ${
                    activeFilter === filter
                      ? 'bg-[var(--color-primary)] text-white shadow-sm'
                      : 'text-[var(--color-text-body)] hover:bg-white hover:text-[var(--color-primary)]'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-auto shrink-0">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none w-full bg-white/60 border border-[var(--color-border)] text-[var(--color-text-body)] text-xs font-semibold rounded-xl pl-4 pr-10 py-2.5 focus:outline-none focus:border-[var(--color-primary)] cursor-pointer"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="size">Largest Size</option>
              </select>
              <ChevronDown className="w-4 h-4 text-[var(--color-text-muted)] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

        </div>

        {/* Media Grid - UPDATED to show 4 columns and smaller gap */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 text-[var(--color-text-body)] gap-3">
            <Loader2 className="w-10 h-10 animate-spin text-[var(--color-primary)]" />
            <span className="text-sm font-medium animate-pulse">Loading your media library...</span>
          </div>
        ) : items.length > 0 ? (
          <motion.div 
            initial="hidden" animate="visible" 
            variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          >
            <AnimatePresence>
              {items.map((item) => (
                <MediaCard key={item.id} item={item} />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="glass-card text-center py-20 px-4">
            <Video className="w-12 h-12 text-[var(--color-text-muted)] mx-auto mb-3" />
            <p className="text-lg font-bold text-[var(--color-text)]">No media found</p>
            <p className="text-sm text-[var(--color-text-body)] mt-1">Try clearing your search query or upload a new file.</p>
          </div>
        )}

      </div>

      <UploadModal 
        isOpen={isUploadModalOpen} 
        onClose={() => setIsUploadModalOpen(false)} 
        onUploadComplete={handleUploadComplete} 
      />
    </AppLayout>
  );
};

export default DashboardPage;