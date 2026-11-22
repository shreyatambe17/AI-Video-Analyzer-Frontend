import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
  PanelLeftClose,
  PanelLeftOpen,
  CheckCircle2,
  Sparkles,
  Info,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_USER } from '../../data/mockData';

export const Navbar = ({ sidebarCollapsed = false, onToggleSidebar }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // 🔔 Notification States
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const notifRef = useRef(null);

  // Notifications Data
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Video Processing Complete', desc: 'Your lecture "Stanford AI" is ready.', time: '2 min ago', icon: CheckCircle2, color: 'text-emerald-500' },
    { id: 2, title: 'Summary Generated', desc: 'Flashcards and quiz are now available.', time: '1 hr ago', icon: Sparkles, color: 'text-[var(--color-primary)]' },
    { id: 3, title: 'System Update', desc: 'New UI theme applied successfully.', time: '2 hrs ago', icon: Info, color: 'text-[var(--color-secondary)]' },
  ]);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setNotificationsOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  // 👆 Close notification dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setNotificationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMarkAllRead = () => setHasUnread(false);

  // 🚪 LOGOUT FUNCTIONALITY
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

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
    <header className="sticky top-0 z-50 glass-strong border-b border-[var(--color-border-blue)]">
      <div className="w-full px-4 lg:px-6 h-16 flex items-center justify-between gap-4">

        {/* LEFT: Sidebar toggle + Brand */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onToggleSidebar}
            aria-label="Toggle sidebar"
            className="hidden lg:flex items-center justify-center w-9 h-9 rounded-xl text-[var(--color-text-body)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary-soft)] transition-all"
          >
            {sidebarCollapsed ? <PanelLeftOpen className="w-5 h-5" /> : <PanelLeftClose className="w-5 h-5" />}
          </button>

          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl brand-gradient flex items-center justify-center text-white shadow-md glow-red group-hover:scale-105 transition-transform">
              <Play className="w-4 h-4 fill-white ml-0.5" />
            </div>
            <span className="font-bold text-base tracking-tight gradient-text hidden sm:inline">
              AI Video Summarizer
            </span>
          </Link>
        </div>

        {/* CENTER: Nav links (desktop) */}
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
                    ? 'bg-[var(--color-primary-soft)] text-[var(--color-primary)] border border-[var(--color-primary)]/30 shadow-sm font-semibold'
                    : 'text-[var(--color-text-body)] hover:text-[var(--color-primary)] hover:bg-white/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${active ? 'text-[var(--color-primary)]' : 'text-[var(--color-secondary)]'}`} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* RIGHT: Notifications + Profile + Mobile toggle */}
        <div className="flex items-center gap-3 shrink-0">
          
          {/* 🔔 NOTIFICATION BELL */}
          <div className="relative" ref={notifRef}>
            <button
              type="button"
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              aria-label="Notifications"
              className={`relative p-2 rounded-lg transition-colors ${
                notificationsOpen ? 'bg-[var(--color-primary-soft)] text-[var(--color-primary)]' : 'text-[var(--color-text-body)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary-soft)]'
              }`}
            >
              <Bell className="w-4 h-4" />
              {hasUnread && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[var(--color-primary)] ring-2 ring-white animate-pulse" />
              )}
            </button>

            <AnimatePresence>
              {notificationsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-80 sm:w-96 glass-strong rounded-2xl shadow-2xl border border-[var(--color-border)] overflow-hidden z-50"
                >
                  <div className="p-4 border-b border-[var(--color-border)] flex items-center justify-between bg-white/40">
                    <h3 className="font-bold text-[var(--color-text)] text-sm">Notifications</h3>
                    {hasUnread && (
                      <button onClick={handleMarkAllRead} className="text-xs font-semibold text-[var(--color-primary)] hover:underline">
                        Mark all as read
                      </button>
                    )}
                  </div>
                  
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map((notif) => {
                      const Icon = notif.icon;
                      return (
                        <div key={notif.id} className="p-4 border-b border-[var(--color-border)]/50 hover:bg-white/60 transition-colors cursor-pointer flex gap-3">
                          <div className={`mt-0.5 ${notif.color}`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-[var(--color-text)]">{notif.title}</p>
                            <p className="text-xs text-[var(--color-text-body)] mt-0.5 leading-relaxed">{notif.desc}</p>
                            <p className="text-[10px] font-medium text-[var(--color-text-muted)] mt-1.5">{notif.time}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className="p-3 border-t border-[var(--color-border)] bg-white/40 text-center">
                    <button className="text-xs font-bold text-[var(--color-secondary)] hover:text-[var(--color-primary)] transition-colors">
                      View All Notifications
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            to="/settings"
            className="flex items-center gap-2.5 pl-2 border-l border-[var(--color-border)] hover:opacity-90 transition-opacity"
          >
            <img
              src={MOCK_USER.avatar}
              alt={MOCK_USER.name}
              className="w-8 h-8 rounded-full object-cover ring-2 ring-[var(--color-secondary)]/40"
            />
            <div className="hidden sm:block text-left text-xs leading-tight">
              <p className="font-semibold text-[var(--color-text)]">{MOCK_USER.name}</p>
              <p className="text-[11px] text-[var(--color-text-muted)]">{MOCK_USER.role}</p>
            </div>
          </Link>

          {/* Desktop Logout Button */}
          <button
            onClick={handleLogout}
            className="hidden sm:flex items-center justify-center w-9 h-9 rounded-xl text-[var(--color-text-muted)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary-soft)] transition-all"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((o) => !o)}
            className="xl:hidden p-2 rounded-lg text-[var(--color-text-body)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary-soft)] transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="xl:hidden glass-strong border-t border-[var(--color-border)] px-4 py-3 space-y-3 shadow-xl overflow-hidden max-h-[calc(100vh-64px)] overflow-y-auto"
          >
            <div className="flex items-center justify-between pb-3 border-b border-[var(--color-border)]">
              <div className="flex items-center gap-2.5">
                <img src={MOCK_USER.avatar} alt={MOCK_USER.name} className="w-9 h-9 rounded-full object-cover ring-2 ring-[var(--color-primary)]/40" />
                <div>
                  <p className="text-xs font-bold text-[var(--color-text)]">{MOCK_USER.name}</p>
                  <p className="text-[11px] text-[var(--color-text-muted)]">{MOCK_USER.email}</p>
                </div>
              </div>
              
              {/* Mobile Logout Button */}
              <button 
                onClick={handleLogout} 
                className="text-xs font-semibold text-[var(--color-primary)] hover:underline flex items-center gap-1"
              >
                <LogOut className="w-3.5 h-3.5" /> Logout
              </button>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-muted)] px-2">Navigation</span>
              {navLinks.map((item) => {
                const active = isActive(item.path);
                const Icon = item.icon;
                return (
                  <Link key={item.path} to={item.path}
                    className={`w-full px-3 py-2 rounded-xl text-xs font-medium flex items-center gap-2.5 transition-colors ${
                      active ? 'bg-[var(--color-primary-soft)] text-[var(--color-primary)] font-semibold' : 'text-[var(--color-text-body)] hover:bg-white/60'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${active ? 'text-[var(--color-primary)]' : 'text-[var(--color-secondary)]'}`} />
                    {item.label}
                  </Link>
                );
              })}
            </div>

            <div className="space-y-1 pt-2 border-t border-[var(--color-border)]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-muted)] px-2">Quick Access</span>
              {additionalMobileLinks.map((item) => {
                const active = isActive(item.path);
                const Icon = item.icon;
                return (
                  <Link key={item.path} to={item.path}
                    className={`w-full px-3 py-2 rounded-xl text-xs font-medium flex items-center gap-2.5 transition-colors ${
                      active ? 'bg-[var(--color-primary-soft)] text-[var(--color-primary)] font-semibold' : 'text-[var(--color-text-body)] hover:bg-white/60'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${active ? 'text-[var(--color-primary)]' : 'text-[var(--color-secondary)]'}`} />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;