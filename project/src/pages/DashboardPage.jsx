import React, { useState } from 'react';
import { AppLayout } from '../components/layout/AppLayout';
import { DashboardHeader } from '../components/pages/dashboard/DashboardHeader';
import { DashboardStats } from '../components/pages/dashboard/DashboardStats';
import { MediaFilterBar } from '../components/pages/dashboard/MediaFilterBar';
import { MediaGrid } from '../components/pages/dashboard/MediaGrid';
import { VaultStorageWidget } from '../components/pages/dashboard/VaultStorageWidget';
import { MOCK_MEDIA_ITEMS } from '../data/mockData';

export const DashboardPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  // Filter items
  const filteredItems = MOCK_MEDIA_ITEMS.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.speakers.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;

    if (activeFilter === 'slides') return item.chapterCount > 10;
    if (activeFilter === 'audio') return item.category.includes('Finance');
    if (activeFilter === 'bilingual') return item.languages.length > 2;

    return true;
  });

  return (
    <AppLayout>
      <div className="space-y-4">
        <DashboardHeader />
        <DashboardStats />
        <MediaFilterBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
        <MediaGrid items={filteredItems} />
        <VaultStorageWidget />
      </div>
    </AppLayout>
  );
};

export default DashboardPage;
