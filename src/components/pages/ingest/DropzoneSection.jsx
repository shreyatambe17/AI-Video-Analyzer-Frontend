import React, { useState } from 'react';
import { Upload, Radar, FolderPlus, FileCheck } from 'lucide-react';

export const DropzoneSection = ({ onFileSelected, selectedFile }) => {
  const [isDragging, setIsDragging] = useState(false);

  const supportedFormats = ['MP4', 'MKV', 'WAV', 'FLAC', 'AAC', 'WEBM'];

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
        className={`relative border-2 border-dashed rounded-2xl p-8 lg:p-12 text-center transition-all duration-300 ${
          isDragging 
            ? 'border-[var(--color-primary)] bg-[var(--color-primary-soft)]/50 shadow-xl shadow-[var(--color-primary)]/20 scale-[1.01]' 
            : 'border-[var(--color-secondary)]/40 bg-white/50 hover:border-[var(--color-secondary)] hover:bg-white/70'
        }`}
      >
        <div className="w-16 h-16 mx-auto rounded-full bg-white border border-[var(--color-secondary)]/40 flex items-center justify-center relative mb-4 group shadow-lg shadow-[var(--color-secondary)]/10">
          <div className="absolute inset-0 rounded-full border border-[var(--color-secondary)]/40 animate-ping opacity-50" />
          <Radar className="w-8 h-8 text-[var(--color-secondary)] group-hover:scale-110 transition-transform" />
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-text)] tracking-wide">
          DROP VIDEO / AUDIO PAYLOAD
        </h2>
        <p className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-widest mt-1">
          OR BROWSE HOST FILESYSTEM
        </p>

        <div className="mt-5">
          <label className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-[var(--color-primary-soft)] border border-[var(--color-primary)]/30 text-[var(--color-primary)] text-sm font-semibold cursor-pointer shadow-sm hover:shadow-md transition-all">
            <FolderPlus className="w-4 h-4" />
            <span>SELECT LOCAL MEDIA</span>
            <input type="file" accept="video/*,audio/*" onChange={handleSimulatedUpload} className="hidden" />
          </label>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
          {supportedFormats.map((fmt) => (
            <span
              key={fmt}
              className="px-2.5 py-1 rounded-md bg-white/80 border border-[var(--color-border)] text-[11px] font-bold text-[var(--color-text-body)] shadow-sm"
            >
              {fmt}
            </span>
          ))}
        </div>

        <p className="text-[11px] font-semibold text-[var(--color-text-muted)] mt-4 uppercase">
          [MAX_PAYLOAD: 4.0 GB // MAX_DURATION: 8.5 HRS]
        </p>
      </div>
    </div>
  );
};