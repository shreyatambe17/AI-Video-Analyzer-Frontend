import React, { useState } from 'react';
import { Link2, RefreshCw, CheckCircle } from 'lucide-react';

export const UrlFetchSection = ({ onFetchUrl }) => {
  const [url, setUrl] = useState('');
  const [isFetching, setIsFetching] = useState(false);
  const [fetched, setFetched] = useState(false);

  const handleFetch = (e) => {
    e.preventDefault();
    if (!url.trim()) return;
    setIsFetching(true);
    setFetched(false);

    setTimeout(() => {
      setIsFetching(false);
      setFetched(true);
      onFetchUrl({
        name: 'Stanford_CS231n_Lecture_14_Multimodal.mp4',
        size: '890.4 MB',
        duration: '01:12:45',
        codec: 'YouTube 1080p60 Stream',
      });
    }, 1200);
  };

  return (
    <div className="bg-[#0b0e17] border border-cyan-500/20 rounded-2xl p-5 my-6 backdrop-blur-md">
      <div className="flex items-center gap-2 mb-3">
        <Link2 className="w-4 h-4 text-cyan-400" />
        <h3 className="text-sm font-bold font-mono text-slate-200 uppercase tracking-wider">
          Remote Stream Ingestion (YouTube / Zoom / Canvas / RTSP)
        </h3>
      </div>

      <form onSubmit={handleFetch} className="flex flex-col sm:flex-row gap-3">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="[PASTE STREAM OR VIDEO URI (e.g. https://youtube.com/watch?v=...)]"
          className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm font-mono text-cyan-300 placeholder-slate-600 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/30"
        />

        <button
          type="submit"
          disabled={isFetching}
          className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-cyan-500/40 text-cyan-400 font-mono text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md shadow-cyan-500/10 disabled:opacity-50"
        >
          {isFetching ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin text-cyan-400" />
              <span>FETCHING...</span>
            </>
          ) : fetched ? (
            <>
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>STREAM READY</span>
            </>
          ) : (
            <>
              <RefreshCw className="w-4 h-4 text-cyan-400" />
              <span>FETCH</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};
