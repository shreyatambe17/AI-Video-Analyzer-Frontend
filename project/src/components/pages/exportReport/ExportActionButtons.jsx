import React, { useState } from 'react';
import { Download, Share2, Check, Sparkles } from 'lucide-react';

export const ExportActionButtons = () => {
  const [downloading, setDownloading] = useState(false);
  const [downloadComplete, setDownloadComplete] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      setDownloadComplete(true);
      setTimeout(() => setDownloadComplete(false), 3000);
    }, 1500);
  };

  return (
    <div className="space-y-3 my-6 font-mono">
      <button
        onClick={handleDownload}
        disabled={downloading}
        className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 hover:from-cyan-300 hover:to-purple-500 text-black font-bold text-sm uppercase tracking-wider shadow-xl shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all flex items-center justify-center gap-2"
      >
        {downloading ? (
          <span>GENERATING HIGH-RES PDF...</span>
        ) : downloadComplete ? (
          <>
            <Check className="w-5 h-5 text-black" />
            <span>PDF DOWNLOADED SUCCESSFULLY!</span>
          </>
        ) : (
          <>
            <Download className="w-5 h-5 text-black fill-black" />
            <span>Download Comprehensive PDF Report</span>
          </>
        )}
      </button>

      <button
        type="button"
        onClick={() => alert("PDF report shared to Google Drive and campus email!")}
        className="w-full py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
      >
        <Share2 className="w-4 h-4 text-cyan-400" />
        <span>Share PDF via Email / Cloud Drive</span>
      </button>
    </div>
  );
};
