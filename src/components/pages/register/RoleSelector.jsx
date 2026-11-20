import React from 'react';
import { GraduationCap, UserCheck, TestTube } from 'lucide-react';

export const RoleSelector = ({ activeRole, setActiveRole }) => {
  const roles = [
    { id: 'student', label: 'Student', icon: GraduationCap },
    { id: 'ta', label: 'Teaching Asst', icon: UserCheck },
    { id: 'researcher', label: 'Researcher', icon: TestTube },
  ];

  return (
    <div className="grid grid-cols-3 gap-3 my-4 font-mono">
      {roles.map((r) => {
        const Icon = r.icon;
        const isSelected = activeRole === r.id;

        return (
          <button
            key={r.id}
            type="button"
            onClick={() => setActiveRole(r.id)}
            className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all ${
              isSelected
                ? 'bg-cyan-950/80 border-cyan-400 text-cyan-300 shadow-lg shadow-cyan-500/10'
                : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <Icon className={`w-5 h-5 ${isSelected ? 'text-cyan-400' : 'text-slate-500'}`} />
            <span className="text-xs font-bold">{r.label}</span>
          </button>
        );
      })}
    </div>
  );
};
