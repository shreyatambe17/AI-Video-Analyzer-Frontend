import React from 'react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { BottomNavigation } from './BottomNavigation';

export const AppLayout = ({ children, hideSidebar = false }) => {
  return (
    <div className="min-h-screen bg-[#0c101d] text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      <Navbar />
      
      <div className="flex-1 flex w-full">
        {!hideSidebar && (
          <div className="hidden lg:block shrink-0">
            <Sidebar />
          </div>
        )}
        
        <main className="flex-1 min-w-0 overflow-y-auto p-4 sm:p-6 lg:p-7 pb-24 lg:pb-7">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <BottomNavigation />
    </div>
  );
};

export default AppLayout;
