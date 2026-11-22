import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  Plus, 
  Bold, 
  Italic, 
  List, 
  ListOrdered, 
  Check, 
  FileText, 
  Clock, 
  X, 
  AlertCircle, 
  CheckCircle2,
  Loader2,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppLayout } from '../components/layout/AppLayout';
import { MOCK_MEDIA_ITEMS, MOCK_CHAPTERS } from '../data/mockData';
import { api } from '../services/api';

export const SummaryNotesPage = () => {
  const [currentVideo, setCurrentVideo] = useState(MOCK_MEDIA_ITEMS[0]);
  const textareaRef = useRef(null);

  const [activeTab, setActiveTab] = useState('chapters'); // 'chapters' | 'notes'
  const [selectedChapterId, setSelectedChapterId] = useState(1);
  const [noteText, setNoteText] = useState('The speaker introduces the concept of multimodal AI and explains why it is important in today\'s world.');
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState('');

  // Add Note Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteChapterId, setNewNoteChapterId] = useState(1);
  const [newNoteContent, setNewNoteContent] = useState('');
  const [newNoteError, setNewNoteError] = useState('');

  useEffect(() => {
    api.getMedia().then(items => {
      if (items && items.length > 0) {
        setCurrentVideo(items[0]);
        if (items[0].notes) setNoteText(items[0].notes);
      }
    });
  }, []);

  const chapters = currentVideo.chapters && currentVideo.chapters.length > 0 ? currentVideo.chapters : MOCK_CHAPTERS;
  const selectedChapter = chapters.find(c => c.id === selectedChapterId) || chapters[0];

  const handleSaveNote = async () => {
    if (!noteText.trim()) { setSaveError('Note content cannot be empty.'); return; }
    setSaveError('');
    setIsSaving(true);
    try {
      await api.updateNotes(currentVideo.id, noteText);
      setIsSaved(true);
      api.addHistory({ title: `Updated study notes for ${currentVideo.title}`, type: 'notes', color: 'amber' });
      setTimeout(() => setIsSaved(false), 2000);
    } catch (err) { console.error('Save notes error:', err); } 
    finally { setIsSaving(false); }
  };

  const applyFormatting = (prefix, suffix = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = noteText.substring(start, end);
    let replacement;
    if (prefix === '• ' || prefix === '1. ') {
      replacement = `${prefix}${selectedText || 'List item'}`;
    } else {
      replacement = `${prefix}${selectedText || 'formatted text'}${suffix}`;
    }
    const updated = noteText.substring(0, start) + replacement + noteText.substring(end);
    setNoteText(updated);
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + replacement.length - suffix.length);
    }, 50);
  };

  const handleCreateNewNote = async (e) => {
    e.preventDefault();
    if (!newNoteTitle.trim()) { setNewNoteError('Please provide a title for this note.'); return; }
    if (!newNoteContent.trim()) { setNewNoteError('Please enter some note content.'); return; }
    setNewNoteError('');
    setSelectedChapterId(newNoteChapterId);
    const updatedContent = `### ${newNoteTitle.trim()}\n\n${newNoteContent.trim()}`;
    setNoteText(updatedContent);
    setIsAddModalOpen(false);
    setNewNoteTitle(''); setNewNoteContent('');
    setIsSaving(true);
    try {
      await api.updateNotes(currentVideo.id, updatedContent);
      setIsSaved(true);
      api.addHistory({ title: `Added note: "${newNoteTitle.trim()}"`, type: 'notes', color: 'amber' });
      setTimeout(() => setIsSaved(false), 2500);
    } catch (err) { console.error('Error saving note:', err); } 
    finally { setIsSaving(false); }
  };

  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        
        {/* Header */}
        <div>
          <h1 className="text-3xl font-extrabold text-[var(--color-text)] tracking-tight">Notes & Chapters</h1>
          <p className="text-sm text-[var(--color-text-body)] mt-1">Key topics, timestamps and your personal notes.</p>
        </div>

        {/* Media Banner Card */}
        <div className="glass-card p-4 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="relative w-full sm:w-40 aspect-video rounded-xl overflow-hidden bg-slate-200 shrink-0 shadow-sm">
            <img src={currentVideo.thumbnail} alt={currentVideo.title} className="w-full h-full object-cover" />
            <div className="absolute bottom-2 right-2">
              <span className="bg-white/90 backdrop-blur-md text-[10px] font-bold text-[var(--color-text)] px-2 py-1 rounded-md shadow-sm">
                {currentVideo.duration}
              </span>
            </div>
          </div>
          <div>
            <h2 className="text-lg font-bold text-[var(--color-text)]">{currentVideo.title}</h2>
            <p className="text-xs font-medium text-[var(--color-text-muted)] mt-1">{currentVideo.date} • {currentVideo.size}</p>
          </div>
        </div>

        {/* Main 2-Column Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Chapters List */}
          <div className="lg:col-span-5 glass-card p-4 sm:p-5 space-y-4">
            
            <div className="flex items-center gap-1.5 p-1 bg-white/60 border border-[var(--color-border)] rounded-xl">
              <button
                type="button"
                onClick={() => setActiveTab('chapters')}
                className={`flex-1 py-2 rounded-lg text-xs font-semibold text-center transition-all duration-300 ${
                  activeTab === 'chapters' ? 'bg-[var(--color-primary)] text-white shadow-sm' : 'text-[var(--color-text-body)] hover:bg-white'
                }`}
              >
                Chapters
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('notes')}
                className={`flex-1 py-2 rounded-lg text-xs font-semibold text-center transition-all duration-300 ${
                  activeTab === 'notes' ? 'bg-[var(--color-primary)] text-white shadow-sm' : 'text-[var(--color-text-body)] hover:bg-white'
                }`}
              >
                Notes
              </button>
            </div>

            {/* Chapters list */}
            <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
              {chapters.map((chapter) => {
                const isSelected = chapter.id === selectedChapterId;
                return (
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    key={chapter.id}
                    onClick={() => { setSelectedChapterId(chapter.id); setNoteText(chapter.summary); setSaveError(''); }}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                      isSelected
                        ? 'bg-[var(--color-primary-soft)] border-[var(--color-primary)]/40 shadow-sm'
                        : 'bg-white/50 border-[var(--color-border)] hover:bg-white hover:border-[var(--color-secondary)]/30'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-xs transition-colors ${
                      isSelected ? 'bg-[var(--color-primary)] text-white' : 'bg-[var(--color-secondary-soft)] text-[var(--color-secondary)]'
                    }`}>
                      {chapter.id}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className={`text-sm font-bold truncate ${isSelected ? 'text-[var(--color-primary)]' : 'text-[var(--color-text)]'}`}>{chapter.title}</h4>
                      <span className="inline-block font-mono text-[11px] font-semibold text-[var(--color-text-muted)] mt-1 bg-white/80 px-2 py-0.5 rounded">{chapter.time}</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

          </div>

          {/* Right Column: Details & Notes Editor */}
          <div className="lg:col-span-7 space-y-5">
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-[var(--color-text)]">Chapter Details & Editable Notes</span>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(true)}
                className="btn-primary flex items-center gap-1.5 py-1.5 px-3 text-xs"
              >
                <Plus className="w-3.5 h-3.5" /> Add Note
              </button>
            </div>

            {/* Selected Chapter Card */}
            <div className="glass-card p-5 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-[var(--color-text)]">{selectedChapter.title}</h3>
                <span className="font-mono text-xs font-bold text-[var(--color-secondary)] bg-[var(--color-secondary-soft)] px-2.5 py-1 rounded-md border border-[var(--color-secondary)]/20">
                  {selectedChapter.time}
                </span>
              </div>
              <p className="text-sm text-[var(--color-text-body)] leading-relaxed pt-2">{selectedChapter.summary}</p>
            </div>

            {/* Your Notes Card */}
            <div className="glass-card p-5 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-[var(--color-text)]">Your Notes</h4>
                {saveError && <span className="text-xs font-semibold text-[var(--color-primary)] flex items-center gap-1"><AlertCircle className="w-3 h-3" />{saveError}</span>}
              </div>

              {/* Toolbar */}
              <div className="flex items-center gap-1 pb-2 border-b border-[var(--color-border)] text-[var(--color-text-muted)]">
                <button type="button" onClick={() => applyFormatting('**', '**')} className="p-1.5 rounded hover:text-[var(--color-primary)] hover:bg-white transition-colors" title="Bold"><Bold className="w-4 h-4" /></button>
                <button type="button" onClick={() => applyFormatting('*', '*')} className="p-1.5 rounded hover:text-[var(--color-primary)] hover:bg-white transition-colors" title="Italic"><Italic className="w-4 h-4" /></button>
                <div className="w-[1px] h-4 bg-[var(--color-border)] mx-1" />
                <button type="button" onClick={() => applyFormatting('• ')} className="p-1.5 rounded hover:text-[var(--color-primary)] hover:bg-white transition-colors" title="Bullet List"><List className="w-4 h-4" /></button>
                <button type="button" onClick={() => applyFormatting('1. ')} className="p-1.5 rounded hover:text-[var(--color-primary)] hover:bg-white transition-colors" title="Numbered List"><ListOrdered className="w-4 h-4" /></button>
              </div>

              <textarea
                ref={textareaRef}
                rows={5}
                value={noteText}
                onChange={(e) => { setNoteText(e.target.value); if (saveError) setSaveError(''); }}
                placeholder="Write your notes here..."
                className="input-glass resize-none font-sans leading-relaxed"
              />

              <div className="flex items-center justify-end pt-1">
                <button
                  type="button"
                  onClick={handleSaveNote}
                  disabled={isSaving}
                  className="btn-primary flex items-center gap-1.5 py-2 px-5 text-xs disabled:opacity-50"
                >
                  {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : isSaved ? <Check className="w-3.5 h-3.5" /> : null}
                  {isSaving ? 'Saving...' : isSaved ? 'Saved!' : 'Save Note'}
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Add Note Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsAddModalOpen(false)} />
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} className="relative w-full max-w-md glass-strong rounded-2xl p-6 shadow-2xl z-10 space-y-4">
              
              <div className="flex items-center justify-between pb-3 border-b border-[var(--color-border)]">
                <h2 className="text-lg font-bold text-[var(--color-text)]">Create New Study Note</h2>
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="p-1 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-primary)] hover:bg-white transition-colors"><X className="w-4 h-4" /></button>
              </div>

              {newNoteError && <div className="p-3 rounded-xl bg-[var(--color-primary-soft)] border border-[var(--color-primary)]/30 text-[var(--color-primary)] text-xs flex items-center gap-2 font-medium"><AlertCircle className="w-4 h-4" />{newNoteError}</div>}

              <form onSubmit={handleCreateNewNote} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-[var(--color-text)] mb-1">Note Title</label>
                  <input type="text" value={newNoteTitle} onChange={(e) => setNewNoteTitle(e.target.value)} placeholder="e.g., Sparse Temporal Attention" className="input-glass" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[var(--color-text)] mb-1">Assign to Chapter</label>
                  <select value={newNoteChapterId} onChange={(e) => setNewNoteChapterId(Number(e.target.value))} className="input-glass cursor-pointer appearance-none">
                    {chapters.map(ch => (<option key={ch.id} value={ch.id}>{ch.id}. {ch.title} ({ch.time})</option>))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[var(--color-text)] mb-1">Content</label>
                  <textarea rows={4} value={newNoteContent} onChange={(e) => setNewNoteContent(e.target.value)} placeholder="Write your observation..." className="input-glass resize-none" />
                </div>
                <div className="flex justify-end gap-2.5 pt-2">
                  <button type="button" onClick={() => setIsAddModalOpen(false)} className="btn-ghost py-2 px-4 text-xs">Cancel</button>
                  <button type="submit" className="btn-primary py-2 px-5 text-xs">Create Note</button>
                </div>
              </form>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </AppLayout>
  );
};

export default SummaryNotesPage;