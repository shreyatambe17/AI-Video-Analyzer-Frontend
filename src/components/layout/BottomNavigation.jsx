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
      className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#111625]/95 backdrop-blur-md border-t border-slate-800/90 px-2 py-1.5 shadow-2xl safe-area-bottom"
    >
      <div className="max-w-md mx-auto flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-1 py-1.5 px-2.5 rounded-xl transition-all duration-200 text-[10px] font-medium ${
                active
                  ? 'text-white bg-[#5850ec] shadow-sm shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <Icon className={`w-4 h-4 ${active ? 'text-white' : 'text-slate-400'}`} />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;
