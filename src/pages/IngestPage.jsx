import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  UploadCloud, 
  Link as LinkIcon, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  Loader2, 
} from 'lucide-react';
import { AppLayout } from '../components/layout/AppLayout';
import { api } from '../services/api';

export const IngestPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('file'); // 'file' | 'url'
  const [url, setUrl] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileError, setFileError] = useState('');
  const [urlError, setUrlError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const [options, setOptions] = useState({
    diarization: true,
    summary: true,
    chapters: true,
    flashcards: true,
  });

  const toggleOption = (key) => {
    setOptions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleFileChange = (e) => {
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

  const handleStartIngest = async () => {
    if (activeTab === 'url') {
      const err = validateUrl(url);
      if (err) {
        setUrlError(err);
        return;
      }
      setUrlError('');
    } else {
      if (!selectedFile) {
        setFileError('Please select a video file before starting ingestion.');
        return;
      }
    }

    setIsProcessing(true);
    setProgress(15);

    const progressTimer = setInterval(() => {
      setProgress((prev) => (prev < 85 ? prev + 15 : prev));
    }, 350);

    try {
      let result;
      if (activeTab === 'file') {
        result = await api.uploadFile(selectedFile);
      } else {
        result = await api.ingestUrl(url, options);
      }

      clearInterval(progressTimer);
      setProgress(100);

      setTimeout(() => {
        setIsProcessing(false);
        navigate(`/chat?mediaId=${encodeURIComponent(result.id)}`);
      }, 500);
    } catch (err) {
      clearInterval(progressTimer);
      setIsProcessing(false);
      if (activeTab === 'file') {
        setFileError(err.message || 'Ingestion failed');
      } else {
        setUrlError(err.message || 'Ingestion failed');
      }
    }
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Ingest Media
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Upload or import video lectures for AI processing and summarization
          </p>
        </div>

        {/* Ingest Card */}
        <div className="bg-[#121828] border border-slate-800/80 rounded-2xl p-5 sm:p-8 space-y-6 shadow-lg">
          
          {/* Method Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-900/90 border border-slate-800 rounded-xl max-w-sm">
            <button
              type="button"
              onClick={() => {
                setActiveTab('file');
                setUrlError('');
              }}
              className={`flex-1 py-2 rounded-lg text-xs font-semibold text-center flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeTab === 'file'
                  ? 'bg-[#5850ec] text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <UploadCloud className="w-4 h-4" />
              File Upload
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('url');
                setFileError('');
              }}
              className={`flex-1 py-2 rounded-lg text-xs font-semibold text-center flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeTab === 'url'
                  ? 'bg-[#5850ec] text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <LinkIcon className="w-4 h-4" />
              Video URL
            </button>
          </div>

          {/* Tab 1: File Dropzone */}
          {activeTab === 'file' && (
            <div>
              <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-700 hover:border-indigo-500/80 rounded-2xl p-8 sm:p-12 cursor-pointer bg-slate-900/40 hover:bg-slate-900/70 transition-all text-center">
                <input
                  type="file"
                  accept="video/*,audio/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <div className="w-14 h-14 rounded-2xl bg-[#5850ec]/15 text-[#5850ec] flex items-center justify-center mb-3">
                  <UploadCloud className="w-7 h-7" />
                </div>
                <p className="text-sm font-semibold text-white">
                  {selectedFile ? selectedFile.name : "Click to browse or drag and drop video file"}
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  MP4, MOV, MKV, MP3, WAV (up to 2 GB)
                </p>
                {selectedFile && (
                  <span className="mt-3 text-xs font-medium text-emerald-400 bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Ready to process: {(selectedFile.size / (1024 * 1024)).toFixed(1)} MB
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
          )}

          {/* Tab 2: URL Fetch */}
          {activeTab === 'url' && (
            <div className="space-y-2">
              <label htmlFor="ingest-url-input" className="block text-xs font-semibold text-slate-300">
                Paste YouTube, Zoom, or Lecture Link
              </label>
              <input
                id="ingest-url-input"
                type="url"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  if (urlError) setUrlError('');
                }}
                placeholder="https://www.youtube.com/watch?v=..."
                className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700/80 text-slate-100 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              />
              {urlError && (
                <p className="text-rose-400 text-xs mt-1 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{urlError}</span>
                </p>
              )}
            </div>
          )}

          {/* Pipeline Options */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Processing Pipeline
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <label className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/50 border border-slate-800 cursor-pointer hover:border-slate-700">
                <input
                  type="checkbox"
                  checked={options.diarization}
                  onChange={() => toggleOption('diarization')}
                  className="w-4 h-4 rounded text-[#5850ec] cursor-pointer"
                />
                <span className="text-slate-200">Speaker Diarization & Verbatim Transcript</span>
              </label>

              <label className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/50 border border-slate-800 cursor-pointer hover:border-slate-700">
                <input
                  type="checkbox"
                  checked={options.summary}
                  onChange={() => toggleOption('summary')}
                  className="w-4 h-4 rounded text-[#5850ec] cursor-pointer"
                />
                <span className="text-slate-200">Executive Summary & Key Takeaways</span>
              </label>

              <label className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/50 border border-slate-800 cursor-pointer hover:border-slate-700">
                <input
                  type="checkbox"
                  checked={options.chapters}
                  onChange={() => toggleOption('chapters')}
                  className="w-4 h-4 rounded text-[#5850ec] cursor-pointer"
                />
                <span className="text-slate-200">Timestamped Chapter Decomposition</span>
              </label>

              <label className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/50 border border-slate-800 cursor-pointer hover:border-slate-700">
                <input
                  type="checkbox"
                  checked={options.flashcards}
                  onChange={() => toggleOption('flashcards')}
                  className="w-4 h-4 rounded text-[#5850ec] cursor-pointer"
                />
                <span className="text-slate-200">Flashcards & Multiple-Choice Quiz</span>
              </label>
            </div>
          </div>

          {/* Progress bar during upload */}
          {isProcessing && (
            <div className="space-y-2 pt-2">
              <div className="flex justify-between text-xs font-mono text-indigo-400">
                <span>Ingesting & Analyzing with AI...</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end pt-4 border-t border-slate-800">
            <button
              type="button"
              disabled={(!selectedFile && !url) || isProcessing}
              onClick={handleStartIngest}
              className="px-6 py-2.5 rounded-xl bg-[#5850ec] hover:bg-[#4f46e5] text-white text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-md shadow-indigo-600/30 disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-[0.98] cursor-pointer"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Processing Media with AI...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Start Ingestion</span>
                </>
              )}
            </button>
          </div>

        </div>

      </div>
    </AppLayout>
  );
};

export default IngestPage;
