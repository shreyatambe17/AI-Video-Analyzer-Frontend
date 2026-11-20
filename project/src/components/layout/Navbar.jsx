import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  PlaySquare, 
  Sparkles, 
  User, 
  Search, 
  Bell, 
  Activity, 
  Cpu, 
  BookOpen, 
  Upload,
  FileText,
  HelpCircle,
  BarChart3
} from 'lucide-react';
import { MOCK_USER, MOCK_TELEMETRY } from '../../data/mockData';

export const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-[#070a11]/90 backdrop-blur-md border-b border-cyan-500/20 px-4 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all">
            <div className="w-full h-full bg-[#0b0e17] rounded-[10px] flex items-center justify-center">
              <PlaySquare className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg tracking-wider text-white bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-100 to-cyan-400">
                OmniVideo AI
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950/80 text-cyan-400 border border-cyan-500/30 uppercase tracking-widest font-semibold">
                MULTIMODAL V2.4
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono hidden sm:block">
              Ingest & Analyze Media • Student Study Platform
            </p>
          </div>
        </Link>

        {/* Global Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-[#0d1320]/80 p-1.5 rounded-xl border border-slate-800">
          <Link
            to="/"
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
              isActive('/') 
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            Workspace
          </Link>
          <Link
            to="/ingest"
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
              isActive('/ingest') 
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            Ingest
          </Link>
          <Link
            to="/chat"
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
              isActive('/chat') 
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            Chat & Video Node
          </Link>
          <Link
            to="/summary"
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
              isActive('/summary') 
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            Notes & Chapters
          </Link>
          <Link
            to="/quiz"
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
              isActive('/quiz') 
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5 text-purple-400" />
            Flashcards & Quiz
          </Link>
          <Link
            to="/export"
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
              isActive('/export') 
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            Export PDF
          </Link>
        </nav>

        {/* Right HUD User Status & Controls */}
        <div className="flex items-center gap-3">
          
          {/* Live System Indicator */}
          <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-xs font-mono text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>SYS: ONLINE {MOCK_TELEMETRY.latencyMs}ms</span>
          </div>

          {/* User Profile */}
          <div className="flex items-center gap-2.5 pl-2 border-l border-slate-800">
            <Link to="/login" className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors">
              <img 
                src={MOCK_USER.avatar} 
                alt={MOCK_USER.name} 
                className="w-8 h-8 rounded-full border border-cyan-500/40 object-cover"
              />
              <div className="hidden lg:block text-left text-xs">
                <p className="font-semibold text-white leading-none">{MOCK_USER.name}</p>
                <p className="text-[10px] text-cyan-400 font-mono mt-0.5">{MOCK_USER.university}</p>
              </div>
            </Link>
          </div>
        </div>

      </div>
    </header>
  );
};
