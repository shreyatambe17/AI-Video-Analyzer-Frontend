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
import { motion } from 'framer-motion';
import { AppLayout } from '../components/layout/AppLayout';
import { api } from '../services/api';

export const IngestPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('file');
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
      if (err) { setUrlError(err); return; }
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
      <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[var(--color-secondary)] tracking-wider uppercase font-semibold mb-1">
              <Sparkles className="w-4 h-4 text-[var(--color-secondary)]" />
              <span>OmniVideo Ingestion</span>
            </div>
            <h1 className="text-3xl font-extrabold text-[var(--color-text)] tracking-tight">
              Ingest Media
            </h1>
            <p className="text-sm text-[var(--color-text-body)] mt-1">
              Upload or import video lectures for AI processing and summarization.
            </p>
          </div>
        </div>

        {/* Ingest Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="glass-card p-5 sm:p-8 space-y-6"
        >
          
          {/* Method Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-white/60 border border-[var(--color-border)] rounded-xl max-w-sm">
            <button
              type="button"
              onClick={() => { setActiveTab('file'); setUrlError(''); }}
              className={`flex-1 py-2 rounded-lg text-xs font-semibold text-center flex items-center justify-center gap-2 transition-all duration-300 ${
                activeTab === 'file'
                  ? 'bg-[var(--color-primary)] text-white shadow-md shadow-[var(--color-primary)]/30'
                  : 'text-[var(--color-text-body)] hover:text-[var(--color-primary)] hover:bg-white'
              }`}
            >
              <UploadCloud className="w-4 h-4" />
              File Upload
            </button>
            <button
              type="button"
              onClick={() => { setActiveTab('url'); setFileError(''); }}
              className={`flex-1 py-2 rounded-lg text-xs font-semibold text-center flex items-center justify-center gap-2 transition-all duration-300 ${
                activeTab === 'url'
                  ? 'bg-[var(--color-secondary)] text-white shadow-md shadow-[var(--color-secondary)]/30'
                  : 'text-[var(--color-text-body)] hover:text-[var(--color-secondary)] hover:bg-white'
              }`}
            >
              <LinkIcon className="w-4 h-4" />
              Video URL
            </button>
          </div>

          {/* Tab 1: File Dropzone */}
          {activeTab === 'file' && (
            <div>
              <label className="flex flex-col items-center justify-center border-2 border-dashed border-[var(--color-secondary)]/40 hover:border-[var(--color-primary)] hover:bg-white/40 rounded-2xl p-8 sm:p-12 cursor-pointer transition-all duration-300 text-center group">
                <input
                  type="file"
                  accept="video/*,audio/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <div className="w-16 h-16 rounded-2xl bg-[var(--color-secondary-soft)] text-[var(--color-secondary)] flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-[var(--color-primary-soft)] group-hover:text-[var(--color-primary)] transition-all duration-300">
                  <UploadCloud className="w-8 h-8" />
                </div>
                <p className="text-base font-bold text-[var(--color-text)]">
                  {selectedFile ? selectedFile.name : "Click to browse or drag and drop video file"}
                </p>
                <p className="text-sm text-[var(--color-text-muted)] mt-1 font-medium">
                  MP4, MOV, MKV, MP3, WAV (up to 2 GB)
                </p>
                {selectedFile && (
                  <span className="mt-4 text-xs font-semibold text-[var(--color-text)] bg-white/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-[var(--color-secondary)]/30 flex items-center gap-2 shadow-sm">
                    <CheckCircle2 className="w-4 h-4 text-[var(--color-secondary)]" />
                    Ready: {(selectedFile.size / (1024 * 1024)).toFixed(1)} MB
                  </span>
                )}
              </label>
              {fileError && (
                <p className="text-[var(--color-primary)] text-sm mt-2 flex items-center gap-1.5 font-medium">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{fileError}</span>
                </p>
              )}
            </div>
          )}

          {/* Tab 2: URL Fetch */}
          {activeTab === 'url' && (
            <div className="space-y-2">
              <label htmlFor="ingest-url-input" className="block text-sm font-semibold text-[var(--color-text)]">
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
                className="input-glass"
              />
              {urlError && (
                <p className="text-[var(--color-primary)] text-sm mt-1 flex items-center gap-1.5 font-medium">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{urlError}</span>
                </p>
              )}
            </div>
          )}

          {/* Pipeline Options */}
          <div className="space-y-4 pt-2">
            <h3 className="text-sm font-bold text-[var(--color-text)] uppercase tracking-wider">
              Processing Pipeline
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              {[
                { key: 'diarization', label: 'Speaker Diarization & Verbatim Transcript' },
                { key: 'summary', label: 'Executive Summary & Key Takeaways' },
                { key: 'chapters', label: 'Timestamped Chapter Decomposition' },
                { key: 'flashcards', label: 'Flashcards & Multiple-Choice Quiz' },
              ].map((opt) => (
                <label 
                  key={opt.key} 
                  className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all duration-300 ${
                    options[opt.key] 
                      ? 'bg-white/80 border-[var(--color-secondary)]/50 shadow-sm' 
                      : 'bg-white/40 border-[var(--color-border)] hover:border-[var(--color-primary)]/40'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={options[opt.key]}
                    onChange={() => toggleOption(opt.key)}
                    className="w-4 h-4 rounded text-[var(--color-primary)] focus:ring-[var(--color-primary)] cursor-pointer accent-[var(--color-primary)]"
                  />
                  <span className="text-[var(--color-text-body)] font-medium">{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Progress bar during upload */}
          {isProcessing && (
            <div className="space-y-2 pt-2 animate-fade-in">
              <div className="flex justify-between text-xs font-bold text-[var(--color-primary)]">
                <span>Ingesting & Analyzing with AI...</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full h-3 bg-white/50 rounded-full overflow-hidden border border-[var(--color-border)]">
                <div
                  className="h-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] transition-all duration-300 shadow-md"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end pt-4 border-t border-[var(--color-border)]">
            <button
              type="button"
              disabled={(!selectedFile && !url) || isProcessing}
              onClick={handleStartIngest}
              className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Processing Media...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Start Ingestion</span>
                </>
              )}
            </button>
          </div>

        </motion.div>

      </div>
    </AppLayout>
  );
};

export default IngestPage;