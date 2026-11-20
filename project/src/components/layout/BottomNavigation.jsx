import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  UploadCloud, 
  Tv, 
  FileCode2, 
  BookOpenCheck, 
  Download, 
  Activity,
  Layers,
  Sparkles
} from 'lucide-react';

export const BottomNavigation = () => {
  const location = useLocation();

  const navItems = [
    { label: 'Ingest', path: '/ingest', icon: UploadCloud },
    { label: 'Chat & Video', path: '/chat', icon: Tv, highlight: true },
    { label: 'Transcript', path: '/transcript', icon: FileCode2 },
    { label: 'Notes & Summary', path: '/summary', icon: BookOpenCheck },
    { label: 'Export PDF', path: '/export', icon: Download },
    { label: 'Telemetry', path: '/telemetry', icon: Activity },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#070a11]/95 backdrop-blur-xl border-t border-cyan-500/20 px-3 py-2 shadow-2xl">
      <div className="max-w-4xl mx-auto flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all duration-200 text-[11px] font-mono tracking-wider ${
                isActive
                  ? 'text-cyan-400 bg-cyan-950/60 border border-cyan-500/40 shadow-lg shadow-cyan-500/10'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'text-cyan-400 scale-110' : 'text-slate-400'}`} />
                {item.highlight && !isActive && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                )}
              </div>
              <span className="whitespace-nowrap">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
