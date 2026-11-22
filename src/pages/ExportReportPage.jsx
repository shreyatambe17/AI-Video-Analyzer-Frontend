import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Download, 
  Check, 
  ChevronDown, 
  FileText, 
  Sparkles, 
  Printer 
} from 'lucide-react';
import { motion } from 'framer-motion';
import { AppLayout } from '../components/layout/AppLayout';
import { MOCK_MEDIA_ITEMS, MOCK_CHAPTERS } from '../data/mockData';
import { api } from '../services/api';

export const ExportReportPage = () => {
  const [currentVideo, setCurrentVideo] = useState(MOCK_MEDIA_ITEMS[0]);
  
  useEffect(() => {
    api.getMedia().then(items => {
      if (items && items.length > 0) setCurrentVideo(items[0]);
    });
  }, []);
  
  const [contentOptions, setContentOptions] = useState({
    overview: true,
    keyPoints: true,
    chapters: true,
    notes: true,
    flashcards: false,
    quiz: false,
  });

  const [fileFormat, setFileFormat] = useState('pdf'); 
  const [layoutStyle, setLayoutStyle] = useState('Clean and Modern');
  const [isDownloading, setIsDownloading] = useState(false);

  const toggleOption = (key) => setContentOptions(prev => ({ ...prev, [key]: !prev[key] }));

  const handleDownload = () => {
    setIsDownloading(true);
    if (fileFormat === 'pdf') {
      window.print();
      setIsDownloading(false);
    } else {
      let textContent = `
AI Video Summarizer - Study Digest
Title: ${currentVideo.title}
Date: ${currentVideo.date}

SUMMARY OVERVIEW:
${currentVideo.summary}

KEY TAKEAWAYS:
${(currentVideo.keyTakeaways || []).map((t, i) => `${i + 1}. ${t}`).join('\n')}

CHAPTERS:
${(currentVideo.chapters || MOCK_CHAPTERS).map(ch => `[${ch.time}] ${ch.title}: ${ch.summary}`).join('\n')}
      `.trim();

      if (currentVideo.actionItems) textContent += `\n\nACTION ITEMS:\n${currentVideo.actionItems}`;
      if (currentVideo.keyDecisions) textContent += `\n\nKEY DECISIONS:\n${currentVideo.keyDecisions}`;
      if (currentVideo.transcript) textContent += `\n\nFULL TRANSCRIPT:\n${currentVideo.transcript}`;

      const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${currentVideo.title.replace(/[^a-z0-9]/gi, '_')}_summary.${fileFormat === 'docx' ? 'doc' : 'txt'}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      setIsDownloading(false);
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        
        {/* Header */}
        <div>
          <h1 className="text-3xl font-extrabold text-[var(--color-text)] tracking-tight">Export Report</h1>
          <p className="text-sm text-[var(--color-text-body)] mt-1">Download a clean, well-formatted summary of your lecture.</p>
        </div>

        {/* 3-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Column 1: Checklist */}
          <div className="lg:col-span-3 glass-card p-5 space-y-4">
            <h2 className="text-sm font-bold text-[var(--color-text)] border-b border-[var(--color-border)] pb-3 flex items-center gap-2">
              <FileText className="w-4 h-4 text-[var(--color-secondary)]" /> Summary Content
            </h2>

            <div className="space-y-3 text-sm">
              {[
                { key: 'overview', label: 'Summary Overview' },
                { key: 'keyPoints', label: 'Key Points' },
                { key: 'chapters', label: 'Chapters & Timestamps' },
                { key: 'notes', label: 'Notes' },
                { key: 'flashcards', label: 'Flashcards' },
                { key: 'quiz', label: 'Quiz Questions' },
              ].map((item) => (
                <label key={item.key} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={contentOptions[item.key]}
                    onChange={() => toggleOption(item.key)}
                    className="w-4 h-4 rounded accent-[var(--color-primary)] cursor-pointer"
                  />
                  <span className="font-medium text-[var(--color-text-body)] group-hover:text-[var(--color-primary)] transition-colors">{item.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Column 2: Live Document Preview */}
          <div className="lg:col-span-6 glass-card p-4 sm:p-6 flex flex-col items-center">
            <span className="text-xs font-bold text-[var(--color-text-muted)] self-start mb-3 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[var(--color-primary)]" /> Live Preview
            </span>

            {/* Document Sheet (Remains White for realistic preview) */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="w-full bg-white text-slate-900 rounded-xl shadow-xl p-6 sm:p-8 space-y-4 text-xs font-sans border border-slate-200"
            >
              {/* Doc Header */}
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#FF6B6B] to-[#4FACFE] flex items-center justify-center text-white shadow-sm">
                    <Play className="w-3 h-3 fill-white ml-0.5" />
                  </div>
                  <span className="font-extrabold text-slate-900 text-sm">AI Video Summarizer</span>
                </div>
                <span className="text-[10px] text-slate-400 font-bold tracking-wider">STUDENT STUDY DIGEST</span>
              </div>

              {/* Title & Thumbnail */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 leading-tight">{currentVideo.title}</h3>
                  <p className="text-[11px] font-medium text-slate-500 mt-1">{currentVideo.date}</p>
                </div>
                <div className="w-28 aspect-video rounded-lg overflow-hidden bg-slate-100 shrink-0 border border-slate-200 shadow-sm">
                  <img src={currentVideo.thumbnail} alt={currentVideo.title} className="w-full h-full object-cover" />
                </div>
              </div>

              {/* Summary */}
              {contentOptions.overview && (
                <div className="space-y-1.5 pt-3">
                  <h4 className="font-bold text-slate-900 text-[11px] uppercase tracking-wider border-b border-slate-100 pb-1">Summary Overview</h4>
                  <div className="space-y-1 text-slate-600 leading-relaxed text-[11px]">
                    <p>1. Multimodal models combine multiple data types (text, image, audio, video).</p>
                    <p>2. They improve performance on complex tasks with cross-attention layers.</p>
                    <p>3. Real-world applications include healthcare, education and automation.</p>
                  </div>
                </div>
              )}

              {/* Key Takeaways */}
              {contentOptions.keyPoints && (
                <div className="space-y-1 pt-3">
                  <h4 className="font-bold text-slate-900 text-[11px] uppercase tracking-wider border-b border-slate-100 pb-1">Key Takeaways</h4>
                  <ul className="list-disc pl-4 text-slate-600 space-y-1 text-[11px]">
                    {(currentVideo.keyTakeaways || []).map((point, i) => (<li key={i}>{point}</li>))}
                  </ul>
                </div>
              )}

              {/* Chapters */}
              {contentOptions.chapters && (
                <div className="space-y-1 pt-3">
                  <h4 className="font-bold text-slate-900 text-[11px] uppercase tracking-wider border-b border-slate-100 pb-1">Chapters & Timestamps</h4>
                  <div className="space-y-1.5 text-[11px] text-slate-600">
                    {MOCK_CHAPTERS.slice(0, 3).map((ch) => (
                      <div key={ch.id} className="flex justify-between items-center">
                        <span className="font-medium">{ch.id}. {ch.title}</span>
                        <span className="font-mono text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-500">{ch.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Column 3: Export Options */}
          <div className="lg:col-span-3 glass-card p-5 space-y-5">
            <h2 className="text-sm font-bold text-[var(--color-text)] border-b border-[var(--color-border)] pb-3 flex items-center gap-2">
              <Download className="w-4 h-4 text-[var(--color-primary)]" /> Export Options
            </h2>

            {/* File Format */}
            <div className="space-y-2.5">
              <label className="block text-xs font-bold text-[var(--color-text)]">File Format</label>
              <div className="space-y-2 text-sm bg-white/50 p-3 rounded-xl border border-[var(--color-border)]">
                {['pdf', 'docx', 'txt'].map((fmt) => (
                  <label key={fmt} className="flex items-center gap-2.5 cursor-pointer text-[var(--color-text-body)] hover:text-[var(--color-primary)] transition-colors">
                    <input
                      type="radio" name="fileFormat" value={fmt}
                      checked={fileFormat === fmt}
                      onChange={() => setFileFormat(fmt)}
                      className="w-4 h-4 accent-[var(--color-secondary)] cursor-pointer"
                    />
                    <span className="font-medium uppercase">{fmt} {fmt === 'pdf' && '(Recommended)'}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Layout Style */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-[var(--color-text)]">Page Layout</label>
              <div className="relative">
                <select
                  value={layoutStyle}
                  onChange={(e) => setLayoutStyle(e.target.value)}
                  className="input-glass cursor-pointer appearance-none pr-8"
                >
                  <option value="Clean and Modern">Clean and Modern</option>
                  <option value="Academic Report">Academic Report</option>
                  <option value="Compact Outline">Compact Outline</option>
                </select>
                <ChevronDown className="w-4 h-4 text-[var(--color-text-muted)] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Download Button */}
            <div className="pt-4 border-t border-[var(--color-border)]">
              <button
                type="button"
                onClick={handleDownload}
                disabled={isDownloading}
                className="btn-primary w-full py-3 px-4 flex items-center justify-center gap-2 text-sm disabled:opacity-50"
              >
                <Download className="w-4 h-4" />
                <span>Download {fileFormat.toUpperCase()}</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </AppLayout>
  );
};

export default ExportReportPage;