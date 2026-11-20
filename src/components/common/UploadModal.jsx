import React, { useState } from 'react';
import { 
  X, 
  UploadCloud, 
  Link as LinkIcon, 
  Film, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Sparkles,
  FileText
} from 'lucide-react';
import { api } from '../../services/api';

export const UploadModal = ({ isOpen, onClose, onUploadComplete }) => {
  const [activeTab, setActiveTab] = useState('upload'); // 'upload' | 'url'
  const [url, setUrl] = useState('');
  const [language, setLanguage] = useState('english'); // 'english' | 'hinglish'
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileError, setFileError] = useState('');
  const [urlError, setUrlError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  if (!isOpen) return null;

  const handleFileSelect = (e) => {
    setFileError('');
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 2 * 1024 * 1024 * 1024) {
        setFileError('File size exceeds the 2 GB limit.');
        return;
      }
      setSelectedFile(file);
    }
  };

  const validateUrl = (testUrl) => {
    if (!testUrl.trim()) return 'Video URL cannot be empty.';
    try {
      const parsed = new URL(testUrl.trim());
      if (!['http:', 'https:'].includes(parsed.protocol)) {
        return 'Please enter a valid HTTP or HTTPS URL.';
      }
      return '';
    } catch {
      return 'Please enter a valid URL (e.g. https://www.youtube.com/watch?v=...)';
    }
  };

  const handleStartProcess = async () => {
    if (activeTab === 'url') {
      const err = validateUrl(url);
      if (err) {
        setUrlError(err);
        return;
      }
      setUrlError('');
    } else {
      if (!selectedFile) {
        setFileError('Please select a video or audio file first.');
        return;
      }
    }

    setIsProcessing(true);
    setProgress(20);

    const progressTimer = setInterval(() => {
      setProgress((prev) => (prev < 85 ? prev + 15 : prev));
    }, 300);

    try {
      let result;
      if (activeTab === 'upload') {
        result = await api.uploadFile(selectedFile, '', language);
      } else {
        result = await api.ingestUrl(url, {}, language);
      }

      clearInterval(progressTimer);
      setProgress(100);

      setTimeout(() => {
        setIsProcessing(false);
        if (onUploadComplete && result) {
          onUploadComplete(result);
        }
        onClose();
      }, 500);
    } catch (err) {
      clearInterval(progressTimer);
      setIsProcessing(false);
      if (activeTab === 'upload') {
        setFileError(err.message || 'Processing failed');
      } else {
        setUrlError(err.message || 'Processing failed');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/75 backdrop-blur-xs transition-opacity" 
        onClick={onClose} 
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg bg-[#141b2d] border border-slate-700/80 rounded-2xl p-6 shadow-2xl text-slate-100 z-10">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-white">Upload Media</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Upload videos or lecture recordings to generate summaries, chapters, and quizzes
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex gap-2 mt-4 p-1 bg-slate-900/80 rounded-xl border border-slate-800">
          <button
            type="button"
            onClick={() => {
              setActiveTab('upload');
              setUrlError('');
            }}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'upload'
                ? 'bg-[#5850ec] text-white shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <UploadCloud className="w-3.5 h-3.5" />
            File Upload
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('url');
              setFileError('');
            }}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'url'
                ? 'bg-[#5850ec] text-white shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <LinkIcon className="w-3.5 h-3.5" />
            YouTube / Video URL
          </button>
        </div>

        {/* Content based on tab */}
        <div className="mt-5">
          {activeTab === 'upload' ? (
            <div>
              <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-700 hover:border-indigo-500/80 rounded-2xl p-7 cursor-pointer bg-slate-900/40 hover:bg-slate-900/70 transition-all text-center">
                <input
                  type="file"
                  accept="video/*,audio/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-3">
                  <UploadCloud className="w-6 h-6" />
                </div>
                <p className="text-sm font-semibold text-white">
                  {selectedFile ? selectedFile.name : "Click to select or drag and drop video"}
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  MP4, MOV, MKV, MP3, WAV (up to 2 GB)
                </p>
                {selectedFile && (
                  <span className="mt-2 text-xs font-medium text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Ready ({(selectedFile.size / (1024 * 1024)).toFixed(1)} MB)
                  </span>
                )}
              </label>
              {fileError && (
                <p className="text-rose-400 text-xs mt-2 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{fileError}</span>
                </p>
              )}
            </div>
          ) : (
            <div className="space-y-2">
              <label htmlFor="upload-url" className="block text-xs font-semibold text-slate-300">
                Paste YouTube, Zoom, or Lecture Link
              </label>
              <input
                id="upload-url"
                type="url"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  if (urlError) setUrlError('');
                }}
                placeholder="https://www.youtube.com/watch?v=..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900/60 text-slate-100 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              />
              {urlError && (
                <p className="text-rose-400 text-xs mt-1 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{urlError}</span>
                </p>
              )}
            </div>
          )}

          {/* Language / Engine Choice from AI-Video-Assistant */}
          <div className="mt-4 flex items-center justify-between p-3 rounded-xl bg-slate-900/40 border border-slate-800 text-xs">
            <span className="text-slate-300 font-medium">Transcription Engine:</span>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-indigo-500 cursor-pointer"
            >
              <option value="english">English (Whisper Local STT)</option>
              <option value="hinglish">Hinglish / Hindi (Sarvam AI)</option>
            </select>
          </div>

          {/* AI Processing checklist preview */}
          <div className="mt-4 p-3 bg-slate-900/60 rounded-xl border border-slate-800 text-xs space-y-1.5 text-slate-400">
            <div className="flex items-center gap-2 text-indigo-300 font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              Automatic AI Analysis Pipeline:
            </div>
            <div className="flex items-center gap-2 pl-5 text-[11px]">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Speech-to-Text & Diarization
            </div>
            <div className="flex items-center gap-2 pl-5 text-[11px]">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Executive Summary & Chapters
            </div>
            <div className="flex items-center gap-2 pl-5 text-[11px]">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Study Flashcards & Quiz Generation
            </div>
          </div>

          {/* Progress Bar when uploading */}
          {isProcessing && (
            <div className="mt-4 space-y-1.5">
              <div className="flex justify-between text-xs font-mono text-indigo-300">
                <span>Ingesting & Processing with AI...</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={(!selectedFile && !url) || isProcessing}
            onClick={handleStartProcess}
            className="px-5 py-2 rounded-xl text-xs font-semibold bg-[#5850ec] hover:bg-[#4f46e5] text-white shadow-md shadow-indigo-600/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all cursor-pointer"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Start Ingestion
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};

export default UploadModal;
