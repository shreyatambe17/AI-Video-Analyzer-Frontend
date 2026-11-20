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
import { AppLayout } from '../components/layout/AppLayout';
import { MOCK_MEDIA_ITEMS, MOCK_CHAPTERS } from '../data/mockData';
import { api } from '../services/api';

export const ExportReportPage = () => {
  const [currentVideo, setCurrentVideo] = useState(MOCK_MEDIA_ITEMS[0]);
  
  useEffect(() => {
    api.getMedia().then(items => {
      if (items && items.length > 0) {
        setCurrentVideo(items[0]);
      }
    });
  }, []);
  
  // Column 1: Content Checklist
  const [contentOptions, setContentOptions] = useState({
    overview: true,
    keyPoints: true,
    chapters: true,
    notes: true,
    flashcards: false,
    quiz: false,
  });

  // Column 3: Format & Layout
  const [fileFormat, setFileFormat] = useState('pdf'); // 'pdf' | 'docx' | 'txt'
  const [layoutStyle, setLayoutStyle] = useState('Clean and Modern');
  const [isDownloading, setIsDownloading] = useState(false);

  const toggleOption = (key) => {
    setContentOptions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleDownload = () => {
    setIsDownloading(true);

    if (fileFormat === 'pdf') {
      window.print();
      setIsDownloading(false);
    } else {
      // Export as text/docx
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

      if (currentVideo.actionItems) {
        textContent += `\n\nACTION ITEMS:\n${currentVideo.actionItems}`;
      }
      if (currentVideo.keyDecisions) {
        textContent += `\n\nKEY DECISIONS:\n${currentVideo.keyDecisions}`;
      }
      if (currentVideo.transcript) {
        textContent += `\n\nFULL TRANSCRIPT:\n${currentVideo.transcript}`;
      }

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
      <div className="space-y-6">
        
        {/* Header (Matching Screen 9) */}
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Export to PDF
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Download a clean and well-formatted summary
          </p>
        </div>

        {/* 3-Column Studio Layout (Matching Screen 9) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Column 1: Summary Content Checklist (3 Cols on lg) */}
          <div className="lg:col-span-3 bg-[#121828] border border-slate-800/80 rounded-2xl p-5 space-y-4">
            <h2 className="text-sm font-bold text-white border-b border-slate-800 pb-2.5">
              Summary Content
            </h2>

            <div className="space-y-3 text-xs">
              <label className="flex items-center gap-2.5 cursor-pointer text-slate-300 hover:text-white">
                <input
                  type="checkbox"
                  checked={contentOptions.overview}
                  onChange={() => toggleOption('overview')}
                  className="w-4 h-4 rounded text-[#5850ec] border-slate-700 bg-slate-900"
                />
                <span className="font-medium">Summary Overview</span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer text-slate-300 hover:text-white">
                <input
                  type="checkbox"
                  checked={contentOptions.keyPoints}
                  onChange={() => toggleOption('keyPoints')}
                  className="w-4 h-4 rounded text-[#5850ec] border-slate-700 bg-slate-900"
                />
                <span className="font-medium">Key Points</span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer text-slate-300 hover:text-white">
                <input
                  type="checkbox"
                  checked={contentOptions.chapters}
                  onChange={() => toggleOption('chapters')}
                  className="w-4 h-4 rounded text-[#5850ec] border-slate-700 bg-slate-900"
                />
                <span className="font-medium">Chapters with Timestamps</span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer text-slate-300 hover:text-white">
                <input
                  type="checkbox"
                  checked={contentOptions.notes}
                  onChange={() => toggleOption('notes')}
                  className="w-4 h-4 rounded text-[#5850ec] border-slate-700 bg-slate-900"
                />
                <span className="font-medium">Notes</span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer text-slate-300 hover:text-white">
                <input
                  type="checkbox"
                  checked={contentOptions.flashcards}
                  onChange={() => toggleOption('flashcards')}
                  className="w-4 h-4 rounded text-[#5850ec] border-slate-700 bg-slate-900"
                />
                <span className="font-medium">Flashcards</span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer text-slate-300 hover:text-white">
                <input
                  type="checkbox"
                  checked={contentOptions.quiz}
                  onChange={() => toggleOption('quiz')}
                  className="w-4 h-4 rounded text-[#5850ec] border-slate-700 bg-slate-900"
                />
                <span className="font-medium">Quiz Questions</span>
              </label>
            </div>
          </div>

          {/* Column 2: Live Document Sheet Preview (6 Cols on lg) */}
          <div className="lg:col-span-6 bg-[#121828] border border-slate-800/80 rounded-2xl p-4 sm:p-6 flex flex-col items-center">
            <span className="text-xs font-semibold text-slate-400 self-start mb-3">
              Preview
            </span>

            {/* Document Sheet */}
            <div className="w-full bg-white text-slate-900 rounded-xl shadow-2xl p-6 sm:p-8 space-y-4 text-xs font-sans border border-slate-200">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-[#5850ec] flex items-center justify-center text-white">
                    <Play className="w-3 h-3 fill-white ml-0.5" />
                  </div>
                  <span className="font-bold text-slate-900 text-xs">AI Video Summarizer</span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">STUDENT STUDY DIGEST</span>
              </div>

              {/* Title & Date */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {currentVideo.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {currentVideo.date}
                  </p>
                </div>
                <div className="w-24 aspect-video rounded-lg overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                  <img
                    src={currentVideo.thumbnail}
                    alt={currentVideo.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Summary Overview */}
              {contentOptions.overview && (
                <div className="space-y-1.5 pt-2">
                  <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-[11px]">
                    Summary Overview
                  </h4>
                  <div className="space-y-1 text-slate-700 leading-relaxed">
                    <p>1. Multimodal models combine multiple data types (text, image, audio, video).</p>
                    <p>2. They improve performance on complex tasks with cross-attention layers.</p>
                    <p>3. Real-world applications include healthcare, education and automation.</p>
                  </div>
                </div>
              )}

              {/* Key Points */}
              {contentOptions.keyPoints && (
                <div className="space-y-1 pt-2 border-t border-slate-100">
                  <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-[11px]">
                    Key Takeaways
                  </h4>
                  <ul className="list-disc pl-4 text-slate-600 space-y-0.5 text-[11px]">
                    {currentVideo.keyTakeaways.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Chapters */}
              {contentOptions.chapters && (
                <div className="space-y-1 pt-2 border-t border-slate-100">
                  <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-[11px]">
                    Chapters & Timestamps
                  </h4>
                  <div className="space-y-1 text-[11px] text-slate-600">
                    {MOCK_CHAPTERS.slice(0, 3).map((ch) => (
                      <div key={ch.id} className="flex justify-between">
                        <span>{ch.id}. {ch.title}</span>
                        <span className="font-mono text-slate-400">{ch.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Column 3: Export Options & Download Button (3 Cols on lg) */}
          <div className="lg:col-span-3 bg-[#121828] border border-slate-800/80 rounded-2xl p-5 space-y-5">
            <h2 className="text-sm font-bold text-white border-b border-slate-800 pb-2.5">
              Export Options
            </h2>

            {/* File Format */}
            <div className="space-y-2.5">
              <label className="block text-xs font-semibold text-slate-400">
                File Format
              </label>
              <div className="space-y-2 text-xs">
                <label className="flex items-center gap-2 cursor-pointer text-slate-200">
                  <input
                    type="radio"
                    name="fileFormat"
                    value="pdf"
                    checked={fileFormat === 'pdf'}
                    onChange={() => setFileFormat('pdf')}
                    className="text-[#5850ec]"
                  />
                  <span>PDF (Recommended)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-slate-400 hover:text-slate-200">
                  <input
                    type="radio"
                    name="fileFormat"
                    value="docx"
                    checked={fileFormat === 'docx'}
                    onChange={() => setFileFormat('docx')}
                    className="text-[#5850ec]"
                  />
                  <span>DOCX</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-slate-400 hover:text-slate-200">
                  <input
                    type="radio"
                    name="fileFormat"
                    value="txt"
                    checked={fileFormat === 'txt'}
                    onChange={() => setFileFormat('txt')}
                    className="text-[#5850ec]"
                  />
                  <span>TXT</span>
                </label>
              </div>
            </div>

            {/* Page Layout */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-400">
                Page Layout
              </label>
              <div className="relative">
                <select
                  value={layoutStyle}
                  onChange={(e) => setLayoutStyle(e.target.value)}
                  className="w-full appearance-none bg-slate-900/80 border border-slate-700/80 text-slate-200 text-xs font-medium rounded-xl px-3.5 py-2.5 pr-8 focus:outline-none focus:border-indigo-500 cursor-pointer"
                >
                  <option value="Clean and Modern">Clean and Modern</option>
                  <option value="Academic Report">Academic Report</option>
                  <option value="Compact Outline">Compact Outline</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Download Button */}
            <div className="pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={handleDownload}
                disabled={isDownloading}
                className="w-full py-3 px-4 rounded-xl bg-[#5850ec] hover:bg-[#4f46e5] text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-md shadow-indigo-600/30 transition-all active:scale-[0.98]"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </AppLayout>
  );
};

export default ExportReportPage;
