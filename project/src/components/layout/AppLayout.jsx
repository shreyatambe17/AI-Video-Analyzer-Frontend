import React from 'react';
import { Navbar } from './Navbar';
import { BottomNavigation } from './BottomNavigation';

export const AppLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#06090e] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      <Navbar />
      
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-6 pb-24">
        {children}
      </main>

      <BottomNavigation />
    </div>
  );
};
