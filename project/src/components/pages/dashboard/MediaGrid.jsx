import React from 'react';
import { MediaCard } from './MediaCard';

export const MediaGrid = ({ items }) => {
  if (items.length === 0) {
    return (
      <div className="text-center py-16 px-4 bg-[#0b0e17] rounded-2xl border border-slate-800 my-6">
        <p className="text-slate-400 font-mono text-sm">No media items found matching your filter or search criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-6">
      {items.map((item) => (
        <MediaCard key={item.id} item={item} />
      ))}
    </div>
  );
};
