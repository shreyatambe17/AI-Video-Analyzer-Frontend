import React from 'react';

export const ToggleSwitch = ({ enabled, onChange, label, sublabel }) => {
  return (
    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/30 transition-all cursor-pointer" onClick={() => onChange(!enabled)}>
      <div>
        <p className="text-sm font-medium text-slate-200">{label}</p>
        {sublabel && <p className="text-xs text-slate-400 font-mono mt-0.5">{sublabel}</p>}
      </div>
      <button
        type="button"
        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
          enabled ? 'bg-cyan-500 shadow-md shadow-cyan-500/30' : 'bg-slate-700'
        }`}
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
            enabled ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
};
