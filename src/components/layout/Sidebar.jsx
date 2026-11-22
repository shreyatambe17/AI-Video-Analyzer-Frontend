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
  Download,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { MOCK_USER } from '../../data/mockData'; // Fallback ke liye

export const Sidebar = ({ collapsed = false }) => {
  const location = useLocation();

  // ✅ Fetch real user from local storage
  const savedUser = localStorage.getItem('user');
  const currentUser = savedUser ? JSON.parse(savedUser) : MOCK_USER;

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
    <aside
      className={`glass-strong h-[calc(100vh-64px)] sticky top-16 flex flex-col justify-between py-5 px-3 transition-all duration-300 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Top Sidebar Links */}
      <div className="space-y-1.5">
        {navItems.map((item) => {
          const active = isItemActive(item.path);
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              to={item.path}
              title={collapsed ? item.label : ''}
              className={`group relative flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 ${
                active
                  ? 'brand-gradient text-white shadow-lg glow-red'
                  : 'text-[var(--color-text-body)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary-soft)]'
              } ${collapsed ? 'justify-center' : ''}`}
            >
              <Icon
                className={`w-4 h-4 shrink-0 ${
                  active ? 'text-white' : 'text-[var(--color-secondary)] group-hover:text-[var(--color-primary)]'
                }`}
              />
              {!collapsed && <span className="truncate">{item.label}</span>}

              {/* Tooltip when collapsed */}
              {collapsed && (
                <span className="absolute left-full ml-3 px-2.5 py-1 rounded-lg bg-[var(--color-text)] text-white text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-50">
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      {/* Bottom Profile / Quick Action Card */}
      <div className={`pt-4 border-t border-[var(--color-border)] space-y-3 ${collapsed ? 'flex flex-col items-center' : ''}`}>
        <Link
          to="/settings"
          title={collapsed ? currentUser.name : ''}
          className={`flex items-center gap-2.5 p-2 rounded-xl glass-card hover:scale-[1.02] transition-transform ${
            collapsed ? 'justify-center' : ''
          }`}
        >
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-9 h-9 rounded-full object-cover ring-2 ring-[var(--color-primary)]/40 shrink-0"
          />
          {!collapsed && (
            <div className="overflow-hidden">
              <p className="text-xs font-semibold text-[var(--color-text)] truncate">{currentUser.name}</p>
              <p className="text-[10px] text-[var(--color-text-muted)] truncate">{currentUser.role}</p>
            </div>
          )}
        </Link>

        <Link
          to="/export"
          title={collapsed ? 'Export PDF' : ''}
          className={`w-full py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
            location.pathname === '/export'
              ? 'brand-gradient text-white shadow-lg glow-red'
              : 'bg-[var(--color-primary-soft)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white border border-[var(--color-primary)]/30'
          }`}
        >
          <Download className="w-4 h-4 shrink-0" />
          {!collapsed && <span>Export PDF</span>}
        </Link>
      </div>
    </aside>
  );
};