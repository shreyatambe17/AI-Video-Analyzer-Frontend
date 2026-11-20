import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  CloudUpload, 
  Film, 
  FileText, 
  Clock, 
  Layers, 
  Bookmark, 
  Settings,
  Download
} from 'lucide-react';
import { MOCK_USER } from '../../data/mockData';

export const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { label: 'Ingest Media', path: '/ingest', icon: CloudUpload },
    { label: 'My Media', path: '/', icon: Film },
    { label: 'Summaries', path: '/summaries', icon: FileText },
    { label: 'History', path: '/history', icon: Clock },
    { label: 'Flashcards', path: '/quiz', icon: Layers },
    { label: 'Saved', path: '/saved', icon: Bookmark },
    { label: 'Settings', path: '/settings', icon: Settings },
  ];

  const isItemActive = (path) => {
    if (path === '/' && (location.pathname === '/' || location.pathname === '/media')) return true;
    if (path === '/history' && location.pathname === '/history' && !location.search.includes('saved')) return true;
    if (path === '/saved' && (location.pathname === '/saved' || location.search.includes('saved'))) return true;
    return location.pathname === path;
  };

  return (
    <aside className="w-56 shrink-0 bg-[#111625] border-r border-slate-800/80 flex flex-col justify-between py-5 px-3 min-h-[calc(100vh-57px)]">
      {/* Top Sidebar Links */}
      <div className="space-y-1">
        {navItems.map((item) => {
          const active = isItemActive(item.path);
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              to={item.path}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                active
                  ? 'bg-[#5850ec] text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Icon className={`w-4 h-4 ${active ? 'text-white' : 'text-slate-400'}`} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Bottom Profile / Quick Action Card (Matching Screen 9) */}
      <div className="pt-4 border-t border-slate-800/70 space-y-3">
        <Link
          to="/settings"
          className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-800/40 hover:bg-slate-800/70 border border-slate-800 transition-colors"
        >
          <img 
            src={MOCK_USER.avatar} 
            alt={MOCK_USER.name} 
            className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-700"
          />
          <div className="overflow-hidden">
            <p className="text-xs font-semibold text-white truncate">{MOCK_USER.name}</p>
            <p className="text-[10px] text-slate-400 truncate">{MOCK_USER.role}</p>
          </div>
        </Link>

        <Link
          to="/export"
          className={`w-full py-2 px-3 rounded-xl text-xs font-medium flex items-center justify-center gap-2 transition-all ${
            location.pathname === '/export'
              ? 'bg-[#5850ec] text-white shadow-md shadow-indigo-600/30'
              : 'bg-indigo-600/20 text-indigo-300 hover:bg-indigo-600/30 border border-indigo-500/30'
          }`}
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export PDF</span>
        </Link>
      </div>
    </aside>
  );
};
