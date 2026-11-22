import React, { useState, useEffect } from 'react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { BottomNavigation } from './BottomNavigation';
import { motion } from 'framer-motion';

export const AppLayout = ({ children, hideSidebar = false }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    const saved = localStorage.getItem('sidebarCollapsed');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', JSON.stringify(sidebarCollapsed));
  }, [sidebarCollapsed]);

  return (
    <div className="min-h-screen flex flex-col font-sans relative">
      {/* Decorative background blobs */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#FF6B6B]/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-32 w-[28rem] h-[28rem] bg-[#4FACFE]/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 left-1/3 w-80 h-80 bg-[#FF8FA3]/10 rounded-full blur-3xl" />
      </div>

      <Navbar
        sidebarCollapsed={sidebarCollapsed}
        onToggleSidebar={() => setSidebarCollapsed((s) => !s)}
      />

      <div className="flex-1 flex w-full">
        {!hideSidebar && (
          <motion.div
            initial={false}
            animate={{ width: sidebarCollapsed ? 80 : 256 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="hidden lg:block shrink-0"
          >
            <Sidebar collapsed={sidebarCollapsed} />
          </motion.div>
        )}

        <main className="flex-1 min-w-0 overflow-y-auto p-4 sm:p-6 lg:p-7 pb-24 lg:pb-7">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {children}
          </motion.div>
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <BottomNavigation />
    </div>
  );
};

export default AppLayout;