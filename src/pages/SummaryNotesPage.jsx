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
  Loader2
} from 'lucide-react';
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
        if (items[0].notes) {
          setNoteText(items[0].notes);
        }
      }
    });
  }, []);

  const chapters = currentVideo.chapters && currentVideo.chapters.length > 0 ? currentVideo.chapters : MOCK_CHAPTERS;
  const selectedChapter = chapters.find(c => c.id === selectedChapterId) || chapters[0];

  const handleSaveNote = async () => {
    if (!noteText.trim()) {
      setSaveError('Note content cannot be empty.');
      return;
    }
    setSaveError('');
    setIsSaving(true);
    try {
      await api.updateNotes(currentVideo.id, noteText);
      setIsSaved(true);
      api.addHistory({
        title: `Updated study notes for ${currentVideo.title}`,
        type: 'notes',
        color: 'amber'
      });
      setTimeout(() => setIsSaved(false), 2000);
    } catch (err) {
      console.error('Save notes error:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const applyFormatting = (prefix, suffix = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = noteText.substring(start, end);

    let replacement;
    if (prefix === '• ' || prefix === '1. ') {
      // Line prefix
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
    if (!newNoteTitle.trim()) {
      setNewNoteError('Please provide a title for this note.');
      return;
    }
    if (!newNoteContent.trim()) {
      setNewNoteError('Please enter some note content.');
      return;
    }

    setNewNoteError('');
    setSelectedChapterId(newNoteChapterId);
    const updatedContent = `### ${newNoteTitle.trim()}\n\n${newNoteContent.trim()}`;
    setNoteText(updatedContent);
    setIsAddModalOpen(false);
    setNewNoteTitle('');
    setNewNoteContent('');
    setIsSaving(true);
    try {
      await api.updateNotes(currentVideo.id, updatedContent);
      setIsSaved(true);
      api.addHistory({
        title: `Added note: "${newNoteTitle.trim()}"`,
        type: 'notes',
        color: 'amber'
      });
      setTimeout(() => setIsSaved(false), 2500);
    } catch (err) {
      console.error('Error saving note:', err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        
        {/* Header (Matching Screen 5) */}
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Notes & Chapters
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Key topics, timestamps and your personal notes
          </p>
        </div>

        {/* Media Banner Card (Matching Screen 5) */}
        <div className="bg-[#121828] border border-slate-800/80 rounded-2xl p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="relative w-full sm:w-36 aspect-video rounded-xl overflow-hidden bg-slate-900 shrink-0">
            <img
              src={currentVideo.thumbnail}
              alt={currentVideo.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-1.5 right-1.5">
              <span className="bg-black/80 backdrop-blur-xs text-[10px] font-mono text-white px-1.5 py-0.5 rounded font-medium">
                {currentVideo.duration}
              </span>
            </div>
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white">
              {currentVideo.title}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {currentVideo.date} • {currentVideo.size}
            </p>
          </div>
        </div>

        {/* Main 2-Column Split Layout (Matching Screen 5) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Chapters / Notes Toggle & Chapters List (5 Cols on lg) */}
          <div className="lg:col-span-5 bg-[#121828] border border-slate-800/80 rounded-2xl p-4 sm:p-5 space-y-4">
            
            {/* Toggle: Chapters | Notes */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-900/90 border border-slate-800 rounded-xl">
              <button
                type="button"
                onClick={() => setActiveTab('chapters')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-semibold text-center transition-all cursor-pointer ${
                  activeTab === 'chapters'
                    ? 'bg-[#5850ec] text-white shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Chapters
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('notes')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-semibold text-center transition-all cursor-pointer ${
                  activeTab === 'notes'
                    ? 'bg-[#5850ec] text-white shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Notes
              </button>
            </div>

            {/* Chapters list with purple numbered badges */}
            <div className="space-y-2">
              {MOCK_CHAPTERS.map((chapter) => {
                const isSelected = chapter.id === selectedChapterId;
                return (
                  <div
                    key={chapter.id}
                    onClick={() => {
                      setSelectedChapterId(chapter.id);
                      setNoteText(chapter.summary);
                      setSaveError('');
                    }}
                    className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                      isSelected
                        ? 'bg-indigo-600/10 border-indigo-500/50 shadow-xs'
                        : 'bg-slate-900/40 border-slate-800 hover:bg-slate-800/50 hover:border-slate-700'
                    }`}
                  >
                    {/* Purple circular badge with chapter number */}
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 font-semibold text-xs transition-colors ${
                      isSelected
                        ? 'bg-[#5850ec] text-white'
                        : 'bg-slate-800 text-slate-300'
                    }`}>
                      {chapter.id}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className={`text-xs sm:text-sm font-semibold truncate ${
                          isSelected ? 'text-indigo-300' : 'text-slate-200'
                        }`}>
                          {chapter.title}
                        </h4>
                      </div>
                      <span className="inline-block font-mono text-[11px] text-slate-400 mt-0.5">
                        {chapter.time}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

          {/* Right Column: Selected Chapter Details & Personal Notes (7 Cols on lg) */}
          <div className="lg:col-span-7 space-y-5">
            
            {/* Top row with "+ Add Note" button */}
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">Chapter Details & Editable Notes</span>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(true)}
                className="px-3.5 py-1.5 rounded-xl bg-[#5850ec] hover:bg-[#4f46e5] text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm shadow-indigo-600/25 transition-all cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Note</span>
              </button>
            </div>

            {/* Selected Chapter Card (Matching Screen 5) */}
            <div className="bg-[#121828] border border-slate-800/80 rounded-2xl p-5 space-y-2 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white">
                  {selectedChapter.title}
                </h3>
                <span className="font-mono text-xs text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-0.5 rounded-md">
                  {selectedChapter.time}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1">
                {selectedChapter.summary}
              </p>
            </div>

            {/* Your Notes Card (Matching Screen 5) */}
            <div className="bg-[#121828] border border-slate-800/80 rounded-2xl p-5 space-y-3 shadow-sm">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white">
                  Your Notes
                </h4>
                {saveError && (
                  <span className="text-[11px] text-rose-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {saveError}
                  </span>
                )}
              </div>

              {/* Formatting Toolbar */}
              <div className="flex items-center gap-1 pb-2 border-b border-slate-800 text-slate-400">
                <button 
                  type="button" 
                  onClick={() => applyFormatting('**', '**')}
                  aria-label="Bold text"
                  className="p-1.5 rounded hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                  title="Bold"
                >
                  <Bold className="w-4 h-4" />
                </button>
                <button 
                  type="button" 
                  onClick={() => applyFormatting('*', '*')}
                  aria-label="Italic text"
                  className="p-1.5 rounded hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                  title="Italic"
                >
                  <Italic className="w-4 h-4" />
                </button>
                <div className="w-[1px] h-4 bg-slate-800 mx-1" />
                <button 
                  type="button" 
                  onClick={() => applyFormatting('• ')}
                  aria-label="Bullet list"
                  className="p-1.5 rounded hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                  title="Bullet List"
                >
                  <List className="w-4 h-4" />
                </button>
                <button 
                  type="button" 
                  onClick={() => applyFormatting('1. ')}
                  aria-label="Numbered list"
                  className="p-1.5 rounded hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                  title="Numbered List"
                >
                  <ListOrdered className="w-4 h-4" />
                </button>
              </div>

              {/* Text Area */}
              <textarea
                ref={textareaRef}
                rows={5}
                value={noteText}
                onChange={(e) => {
                  setNoteText(e.target.value);
                  if (saveError) setSaveError('');
                }}
                placeholder="Write your notes here..."
                className="w-full bg-slate-900/60 border border-slate-800 rounded-xl p-3 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all leading-relaxed resize-none font-sans"
              />

              {/* Bottom Right: Save Note Button */}
              <div className="flex items-center justify-end pt-1">
                <button
                  type="button"
                  onClick={handleSaveNote}
                  className="px-5 py-2 rounded-xl bg-[#5850ec] hover:bg-[#4f46e5] text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-indigo-600/30 transition-all active:scale-[0.98] cursor-pointer"
                >
                  {isSaved ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-300" />
                      <span>Saved!</span>
                    </>
                  ) : (
                    <span>Save Note</span>
                  )}
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Add New Note Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-xs" 
            onClick={() => setIsAddModalOpen(false)} 
          />
          <div className="relative w-full max-w-md bg-[#141b2d] border border-slate-700/80 rounded-2xl p-6 shadow-2xl text-slate-100 z-10 space-y-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h2 className="text-base font-bold text-white">Create New Study Note</h2>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {newNoteError && (
              <div className="p-2.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{newNoteError}</span>
              </div>
            )}

            <form onSubmit={handleCreateNewNote} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Note Title
                </label>
                <input
                  type="text"
                  value={newNoteTitle}
                  onChange={(e) => setNewNoteTitle(e.target.value)}
                  placeholder="e.g., Sparse Temporal Attention Mechanism"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-xs sm:text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Assign to Chapter
                </label>
                <select
                  value={newNoteChapterId}
                  onChange={(e) => setNewNoteChapterId(Number(e.target.value))}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-xs sm:text-sm focus:outline-none focus:border-indigo-500 cursor-pointer"
                >
                  {MOCK_CHAPTERS.map(ch => (
                    <option key={ch.id} value={ch.id}>
                      {ch.id}. {ch.title} ({ch.time})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Content
                </label>
                <textarea
                  rows={4}
                  value={newNoteContent}
                  onChange={(e) => setNewNoteContent(e.target.value)}
                  placeholder="Write your observation, theorem, or question..."
                  className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-xs sm:text-sm focus:outline-none focus:border-indigo-500 resize-none"
                />
              </div>

              <div className="flex justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#5850ec] hover:bg-[#4f46e5] text-white text-xs font-semibold shadow-md cursor-pointer"
                >
                  Create Note
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </AppLayout>
  );
};

export default SummaryNotesPage;
