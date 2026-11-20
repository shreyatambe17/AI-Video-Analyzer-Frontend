import React from 'react';

export const StatusBadge = ({ label, variant = 'cyan', icon: Icon }) => {
  const styles = {
    cyan: 'bg-cyan-950/70 text-cyan-400 border-cyan-500/40',
    emerald: 'bg-emerald-950/70 text-emerald-400 border-emerald-500/40',
    purple: 'bg-purple-950/70 text-purple-400 border-purple-500/40',
    amber: 'bg-amber-950/70 text-amber-400 border-amber-500/40',
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold border ${styles[variant] || styles.cyan}`}>
      {Icon && <Icon className="w-3 h-3" />}
      <span>{label}</span>
    </span>
  );
};
