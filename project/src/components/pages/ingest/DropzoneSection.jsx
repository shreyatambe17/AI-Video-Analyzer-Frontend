import React, { useState } from 'react';
import { Upload, Radar, FolderPlus, FileCheck } from 'lucide-react';

export const DropzoneSection = ({ onFileSelected, selectedFile }) => {
  const [isDragging, setIsDragging] = useState(false);

  const supportedFormats = ['MP4', 'MKV', 'WAV 96kHz', 'FLAC 24-bit', 'AAC', 'WEBM'];

  const handleSimulatedUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelected({
        name: file.name,
        size: `${(file.size / (1024 * 1024 * 1024)).toFixed(2)} GB`,
        duration: '01:48:22',
        codec: 'H.265 / 4K',
      });
    }
  };

  return (
    <div className="my-6">
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          onFileSelected({
            name: 'MIT_Quantum_Lecture_08.mp4',
            size: '1.42 GB',
            duration: '01:48:22',
            codec: 'H.265 / 4K',
          });
        }}
        className={`relative border-2 border-dashed rounded-2xl p-8 lg:p-12 text-center transition-all duration-300 backdrop-blur-md ${
          isDragging 
            ? 'border-cyan-400 bg-cyan-950/40 shadow-xl shadow-cyan-500/20' 
            : 'border-cyan-500/30 bg-[#0b0e17]/80 hover:border-cyan-500/50 hover:bg-[#0d121f]'
        }`}
      >
        {/* Radar Icon graphic */}
        <div className="w-16 h-16 mx-auto rounded-full bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center relative mb-4 group shadow-lg shadow-cyan-500/20">
          <div className="absolute inset-0 rounded-full border border-cyan-400/40 animate-ping opacity-50" />
          <Radar className="w-8 h-8 text-cyan-400 group-hover:scale-110 transition-transform" />
        </div>

        <h2 className="text-xl sm:text-2xl font-bold font-mono text-white tracking-wide">
          DROP VIDEO/AUDIO PAYLOAD
        </h2>
        <p className="text-xs font-mono text-slate-400 uppercase tracking-widest mt-1">
          OR BROWSE HOST FILESYSTEM
        </p>

        {/* Action Button */}
        <div className="mt-5">
          <label className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-cyan-500/40 text-cyan-300 font-mono text-xs font-semibold cursor-pointer shadow-md hover:shadow-cyan-500/20 transition-all">
            <FolderPlus className="w-4 h-4 text-cyan-400" />
            <span>SELECT LOCAL MEDIA</span>
            <input type="file" accept="video/*,audio/*" onChange={handleSimulatedUpload} className="hidden" />
          </label>
        </div>

        {/* Supported Formats */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
          {supportedFormats.map((fmt) => (
            <span
              key={fmt}
              className="px-2.5 py-1 rounded bg-slate-900/90 border border-slate-800 text-[11px] font-mono text-cyan-400 font-semibold"
            >
              [{fmt}]
            </span>
          ))}
        </div>

        <p className="text-[11px] font-mono text-slate-500 mt-4 uppercase">
          [MAX_PAYLOAD: 4.0 GB // MAX_DURATION: 8.5 HRS]
        </p>
      </div>
    </div>
  );
};
