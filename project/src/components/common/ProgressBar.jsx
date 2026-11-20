import React from 'react';

export const ProgressBar = ({ progress = 0, color = 'cyan', height = 'h-2' }) => {
  const colorGradients = {
    cyan: 'bg-gradient-to-r from-cyan-500 to-blue-500',
    purple: 'bg-gradient-to-r from-purple-500 to-pink-500',
    emerald: 'bg-gradient-to-r from-emerald-500 to-teal-400',
  };

  return (
    <div className={`w-full bg-slate-800/80 rounded-full overflow-hidden p-0.5 border border-slate-700/50 ${height}`}>
      <div 
        className={`h-full rounded-full transition-all duration-500 ${colorGradients[color] || colorGradients.cyan}`}
        style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
      />
    </div>
  );
};
