import React from 'react';
import { Building2 } from 'lucide-react';

export const SsoOptions = () => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => alert("Simulating Google Login...")}
          className="py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-sm font-medium text-slate-200 flex items-center justify-center gap-2 transition-all hover:border-slate-700"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
            <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.29v3.14C3.26 21.3 7.31 24 12 24z"/>
            <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.59H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.41l3.99-3.14z"/>
            <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.59l3.99 3.14c.95-2.83 3.6-4.98 6.72-4.98z"/>
          </svg>
          <span>Google</span>
        </button>

        <button
          type="button"
          onClick={() => alert("Simulating Campus SSO Login...")}
          className="py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-sm font-medium text-slate-200 flex items-center justify-center gap-2 transition-all hover:border-slate-700"
        >
          <Building2 className="w-4 h-4 text-cyan-400" />
          <span>Campus SSO</span>
        </button>
      </div>

      <div className="relative flex items-center justify-center my-6">
        <div className="border-t border-slate-800 w-full" />
        <span className="bg-[#06090e] px-3 text-[10px] font-mono text-slate-500 uppercase tracking-widest absolute">
          OR EMAIL
        </span>
      </div>
    </div>
  );
};
