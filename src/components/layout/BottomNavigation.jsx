import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Film, 
  UploadCloud, 
  MessageSquare, 
  FileText, 
  HelpCircle, 
  Download 
} from 'lucide-react';
import { motion } from 'framer-motion';

export const BottomNavigation = () => {
  const location = useLocation();

  const navItems = [
    { label: 'Media', path: '/', icon: Film },
    { label: 'Ingest', path: '/ingest', icon: UploadCloud },
    { label: 'Chat', path: '/chat', icon: MessageSquare },
    { label: 'Notes', path: '/notes', icon: FileText },
    { label: 'Quiz', path: '/quiz', icon: HelpCircle },
    { label: 'Export', path: '/export', icon: Download },
  ];

  const isActive = (path) => {
    if (path === '/' && (location.pathname === '/' || location.pathname === '/media')) return true;
    return location.pathname === path;
  };

  return (
    <nav 
      aria-label="Mobile Navigation"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-50 glass-strong border-t border-[var(--color-border-blue)] px-3 py-2 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] safe-area-bottom"
    >
      <div className="max-w-md mx-auto flex items-center justify-between">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          const isExport = item.label === 'Export';

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`relative flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all duration-300 text-[10px] font-semibold ${
                active && !isExport
                  ? 'text-[var(--color-primary)]' 
                  : 'text-[var(--color-text-muted)] hover:text-[var(--color-secondary)]'
              }`}
            >
              {/* Active indicator for normal tabs */}
              {active && !isExport && (
                <motion.div 
                  layoutId="bottomNavIndicator"
                  className="absolute -top-2 w-8 h-1 bg-[var(--color-primary)] rounded-full shadow-[0_2px_8px_rgba(255,107,107,0.5)]" 
                />
              )}

              {/* Special styling for Export button */}
              {isExport ? (
                <div className={`flex flex-col items-center justify-center w-14 h-14 -mt-6 rounded-full shadow-lg transition-transform duration-300 ${
                  active ? 'bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] scale-105' : 'bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-primary)]/80 hover:scale-105'
                }`}>
                  <Icon className="w-5 h-5 text-white mb-0.5" />
                  <span className="text-[9px] text-white font-bold tracking-wider">{item.label}</span>
                </div>
              ) : (
                <>
                  <Icon className={`w-5 h-5 ${active ? 'text-[var(--color-primary)]' : 'text-[var(--color-secondary)]'}`} />
                  <span className="truncate">{item.label}</span>
                </>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;