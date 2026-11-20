import React, { useState } from 'react';
import { HardDrive, Lock, RefreshCw } from 'lucide-react';
import { ProgressBar } from '../../common/ProgressBar';
import { MOCK_USER } from '../../../data/mockData';

export const VaultStorageWidget = () => {
  const [autoSync, setAutoSync] = useState(true);

  const percentage = (MOCK_USER.storageUsed / MOCK_USER.storageLimit) * 100;

  return (
    <div className="bg-[#0b0e17] border border-cyan-500/20 rounded-2xl p-5 my-6 backdrop-blur-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        {/* Left Info */}
        <div className="flex-1 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <HardDrive className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-bold text-white tracking-wide">Vault Storage</span>
            </div>
            <span className="text-xs font-mono font-semibold text-cyan-400">
              {MOCK_USER.storageUsed} GB / {MOCK_USER.storageLimit} GB
            </span>
          </div>

          <ProgressBar progress={percentage} color="cyan" height="h-2.5" />

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-1.5 font-mono text-emerald-400">
              <Lock className="w-3.5 h-3.5" />
              <span>Zero-knowledge encrypted repository (AES-256)</span>
            </div>
          </div>
        </div>

        {/* Right Toggle */}
        <div className="sm:pl-6 sm:border-l sm:border-slate-800 flex items-center justify-between sm:justify-end gap-3">
          <div className="text-left sm:text-right">
            <span className="text-xs font-semibold text-slate-200 block">Auto-Sync</span>
            <span className="text-[10px] text-slate-400 font-mono">Google Drive & Dropbox</span>
          </div>
          <button
            type="button"
            onClick={() => setAutoSync(!autoSync)}
            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              autoSync ? 'bg-cyan-500 shadow-md shadow-cyan-500/30' : 'bg-slate-700'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                autoSync ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

      </div>
    </div>
  );
};
