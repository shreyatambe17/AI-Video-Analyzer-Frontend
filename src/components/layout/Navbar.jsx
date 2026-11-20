import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Play, 
  LayoutDashboard, 
  UploadCloud, 
  MessageSquare, 
  FileText, 
  HelpCircle, 
  Download, 
  Bell, 
  Menu, 
  X,
  History,
  Bookmark,
  Settings,
  LogOut,
  User
} from 'lucide-react';
import { MOCK_USER } from '../../data/mockData';

export const Navbar = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => {
    if (path === '/' && (location.pathname === '/' || location.pathname === '/media')) return true;
    return location.pathname === path;
  };

  const navLinks = [
    { label: 'Workspace', path: '/', icon: LayoutDashboard },
    { label: 'Ingest', path: '/ingest', icon: UploadCloud },
    { label: 'Chat & Video', path: '/chat', icon: MessageSquare },
    { label: 'Notes & Chapters', path: '/notes', icon: FileText },
    { label: 'Flashcards & Quiz', path: '/quiz', icon: HelpCircle },
    { label: 'Export PDF', path: '/export', icon: Download },
  ];

  const additionalMobileLinks = [
    { label: 'Summaries', path: '/summaries', icon: FileText },
    { label: 'History', path: '/history', icon: History },
    { label: 'Saved Summaries', path: '/saved', icon: Bookmark },
    { label: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200/90 shadow-xs">
      <div className="w-full px-4 lg:px-6 py-2.5 flex items-center justify-between gap-4">
        
        {/* Brand Logo matching reference */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
          <div className="w-8 h-8 rounded-xl bg-[#5850ec] flex items-center justify-center text-white shadow-sm shadow-indigo-500/30 group-hover:bg-[#4f46e5] transition-all">
            <Play className="w-4 h-4 fill-white ml-0.5" />
          </div>
          <span className="font-bold text-base tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
            AI Video Summarizer
          </span>
        </Link>

        {/* Center Navigation Links (Top Bar matching reference image) */}
        <nav className="hidden xl:flex items-center gap-1.5">
          {navLinks.map((item) => {
            const active = isActive(item.path);
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                  active
                    ? 'bg-indigo-50 text-[#5850ec] border border-indigo-200/60 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${active ? 'text-[#5850ec]' : 'text-slate-400'}`} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Section: Notifications & User Profile */}
        <div className="flex items-center gap-3 shrink-0">
          
          {/* Notification Bell */}
          <button 
            type="button" 
            aria-label="Notifications"
            className="relative p-2 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#5850ec] ring-2 ring-white" />
          </button>

          {/* User Profile Pill */}
          <Link 
            to="/settings" 
            className="flex items-center gap-2.5 pl-2 border-l border-slate-200 hover:opacity-90 transition-opacity"
          >
            <img 
              src={MOCK_USER.avatar} 
              alt={MOCK_USER.name} 
              className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200"
            />
            <div className="hidden sm:block text-left text-xs leading-tight">
              <p className="font-semibold text-slate-900">{MOCK_USER.name}</p>
              <p className="text-[11px] text-slate-500">{MOCK_USER.role}</p>
            </div>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 py-3 space-y-3 shadow-lg">
          
          {/* User Header in mobile menu */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <img 
                src={MOCK_USER.avatar} 
                alt={MOCK_USER.name} 
                className="w-9 h-9 rounded-full object-cover ring-1 ring-slate-200"
              />
              <div>
                <p className="text-xs font-bold text-slate-900">{MOCK_USER.name}</p>
                <p className="text-[11px] text-slate-500">{MOCK_USER.email}</p>
              </div>
            </div>
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs font-semibold text-indigo-600 hover:underline flex items-center gap-1"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign in
            </Link>
          </div>

          {/* Main nav items */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2">Navigation</span>
            {navLinks.map((item) => {
              const active = isActive(item.path);
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`w-full px-3 py-2 rounded-xl text-xs font-medium flex items-center gap-2.5 transition-colors ${
                    active
                      ? 'bg-indigo-50 text-[#5850ec] font-semibold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-[#5850ec]' : 'text-slate-400'}`} />
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Extra tools */}
          <div className="space-y-1 pt-2 border-t border-slate-100">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2">Quick Access</span>
            {additionalMobileLinks.map((item) => {
              const active = isActive(item.path);
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`w-full px-3 py-2 rounded-xl text-xs font-medium flex items-center gap-2.5 transition-colors ${
                    active
                      ? 'bg-indigo-50 text-[#5850ec] font-semibold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-[#5850ec]' : 'text-slate-400'}`} />
                  {item.label}
                </Link>
              );
            })}
          </div>

        </div>
      )}
    </header>
  );
};

export default Navbar;
