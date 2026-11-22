import { useState, useRef, useEffect } from 'react';
import { ArrowRight, Loader2, Sparkles, Play, FileText, CheckSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppLayout } from '../components/layout/AppLayout';
import { api } from '../services/api';
import { useSearchParams } from 'react-router-dom';

const youtubeVideoId = (sourceUrl = '') => {
  try {
    const url = new URL(sourceUrl);
    if (url.hostname.endsWith('youtu.be')) return url.pathname.split('/').filter(Boolean)[0] || '';
    if (url.searchParams.get('v')) return url.searchParams.get('v');
    return url.pathname.match(/\/(?:shorts|embed|live)\/([\w-]{11})/)?.[1] || '';
  } catch { return ''; }
};

export const ChatVideoPage = () => {
  const [searchParams] = useSearchParams();
  const requestedMediaId = searchParams.get('mediaId');
  const [currentVideo, setCurrentVideo] = useState(null);
  const [videoError, setVideoError] = useState('');
  const [isLoadingVideo, setIsLoadingVideo] = useState(true);
  const chatBottomRef = useRef(null);

  const [videoTab, setVideoTab] = useState('summary');
  const [chatMode, setChatMode] = useState('chat');
  const [inputText, setInputText] = useState('');
  const [inputError, setInputError] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    let active = true;
    const loadVideo = async () => {
      setIsLoadingVideo(true);
      setVideoError('');
      setChatMessages([]);
      try {
        let item;
        if (requestedMediaId) {
          item = await api.getMediaById(requestedMediaId);
          if (item?.sourceUrl && item.transcriptSourceUrl !== item.sourceUrl) {
            item = await api.refreshVideo(item.id);
          }
        } else {
          const items = await api.getMedia();
          item = items?.[0];
        }
        if (active && item) setCurrentVideo(item);
        else if (active) setVideoError('Add a video from Ingest to start a study session.');
      } catch (error) {
        if (active) setVideoError(error.message || 'Could not load this video.');
      } finally {
        if (active) setIsLoadingVideo(false);
      }
    };
    loadVideo();
    return () => { active = false; };
  }, [requestedMediaId]);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isTyping]);

  const handleSendMessage = async (e) => {
    e?.preventDefault();
    const query = inputText.trim();
    if (!query) { setInputError('Please enter a question or prompt.'); return; }

    setInputError('');
    const userMsg = { id: Date.now(), sender: 'user', text: query };
    const newHistory = [...chatMessages, userMsg];
    setChatMessages(newHistory);
    setInputText('');
    setIsTyping(true);

    try {
      const reply = await api.chatWithVideo(currentVideo.id, query, newHistory);
      let aiMessage;
      if (typeof reply === 'string' && reply.includes('\n') && (reply.includes('1.') || reply.includes('- '))) {
        const points = reply.split('\n').map(p => p.trim()).filter(Boolean);
        aiMessage = { id: Date.now() + 1, sender: 'ai', points };
      } else {
        aiMessage = { id: Date.now() + 1, sender: 'ai', text: typeof reply === 'string' ? reply : 'Processed contextual analysis.' };
      }
      setChatMessages(prev => [...prev, aiMessage]);
      api.addHistory({ title: `Asked AI: "${query.slice(0, 32)}..."`, type: 'watch', color: 'purple' });
    } catch (err) {
      setChatMessages(prev => [...prev, { id: Date.now() + 1, sender: 'ai', text: err.message || 'Could not get an answer.' }]);
    } finally { setIsTyping(false); }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendMessage(); }
  };

  if (isLoadingVideo) return <AppLayout><div className="flex h-[60vh] items-center justify-center text-[var(--color-primary)] font-bold animate-pulse">Loading video workspace…</div></AppLayout>;
  if (!currentVideo) return <AppLayout><div className="m-8 glass-card p-5 text-sm text-[var(--color-primary)]">{videoError || 'Could not load video.'}</div></AppLayout>;

  const youtubeId = youtubeVideoId(currentVideo.sourceUrl);
  const mediaUrl = currentVideo.mediaUrl || (currentVideo.filePath ? `/uploads/${encodeURIComponent(currentVideo.filePath.split(/[\\/]/).pop())}` : '');

  const tabs = [
    { id: 'summary', label: 'Summary', icon: Sparkles },
    { id: 'chapters', label: 'Chapters', icon: FileText },
    { id: 'actions', label: 'Action Items', icon: CheckSquare },
    { id: 'transcript', label: 'Transcript', icon: FileText },
    { id: 'notes', label: 'Notes', icon: FileText },
  ];

  return (
    <AppLayout>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start animate-fade-in">
        
        {/* LEFT: Video & Tabs */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-7 space-y-4">
          <div className="glass-card overflow-hidden">
            
            {/* Video Screen */}
            <div className="relative aspect-video bg-black overflow-hidden rounded-t-2xl">
              {youtubeId ? (
                <iframe key={youtubeId} className="absolute inset-0 h-full w-full" src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=0&rel=0&playsinline=1`} title={currentVideo.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
              ) : mediaUrl ? (
                <video className="absolute inset-0 h-full w-full" src={mediaUrl} poster={currentVideo.thumbnail} controls playsInline />
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-white/70">No playable source attached.</div>
              )}
            </div>

            {/* Details & Tabs */}
            <div className="p-5">
              <h2 className="text-xl font-bold text-[var(--color-text)] tracking-tight">{currentVideo.title}</h2>
              <p className="text-xs font-medium text-[var(--color-text-muted)] mt-1">{currentVideo.date} • {currentVideo.size}</p>

              <div className="flex flex-wrap items-center gap-2 mt-5 pt-4 border-t border-[var(--color-border)]">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = videoTab === tab.id;
                  return (
                    <button key={tab.id} type="button" onClick={() => setVideoTab(tab.id)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all duration-300 ${
                        isActive ? 'bg-[var(--color-primary)] text-white shadow-md shadow-[var(--color-primary)]/30' : 'bg-white/50 text-[var(--color-text-body)] hover:bg-white hover:text-[var(--color-primary)]'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" /> {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* Tab Content Box */}
              <div className="mt-4 p-4 rounded-xl bg-white/60 border border-[var(--color-border)] text-sm text-[var(--color-text-body)] leading-relaxed shadow-sm">
                {videoTab === 'summary' && (
                  <div className="space-y-3">
                    <p>{currentVideo.summary}</p>
                    <div className="pt-3 border-t border-[var(--color-border)]">
                      <p className="font-bold text-[var(--color-text)] mb-2 flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-[var(--color-primary)]"/> Key Takeaways:</p>
                      <ul className="space-y-1.5 text-[var(--color-text-body)] list-disc pl-4">
                        {(currentVideo.keyTakeaways || []).map((point, idx) => (<li key={idx}>{point}</li>))}
                      </ul>
                    </div>
                  </div>
                )}
                {videoTab === 'chapters' && (
                  <div className="space-y-2 max-h-56 overflow-y-auto pr-2">
                    {(currentVideo.chapters || []).map((ch) => (
                      <div key={ch.id} className="flex items-start justify-between gap-3 p-2.5 hover:bg-white rounded-xl transition-colors">
                        <div>
                          <span className="font-bold text-[var(--color-text)]">{ch.id}. {ch.title}</span>
                          <p className="text-xs text-[var(--color-text-muted)] mt-0.5">{ch.summary}</p>
                        </div>
                        <span className="font-mono text-[10px] font-bold text-[var(--color-secondary)] bg-[var(--color-secondary-soft)] px-2 py-1 rounded-md shrink-0">{ch.time}</span>
                      </div>
                    ))}
                  </div>
                )}
                {videoTab === 'actions' && (
                   <div className="space-y-3 max-h-56 overflow-y-auto pr-2">
                     {currentVideo.actionItems && <div className="p-3 rounded-xl bg-[var(--color-primary-soft)]/60 border border-[var(--color-primary)]/20"><span className="font-bold text-[var(--color-primary)] block mb-1">Action Items:</span><p className="whitespace-pre-line text-[var(--color-text-body)] text-xs leading-relaxed">{currentVideo.actionItems}</p></div>}
                     {currentVideo.keyDecisions && <div className="p-3 rounded-xl bg-[var(--color-secondary-soft)]/60 border border-[var(--color-secondary)]/20"><span className="font-bold text-[var(--color-secondary)] block mb-1">Key Decisions:</span><p className="whitespace-pre-line text-[var(--color-text-body)] text-xs leading-relaxed">{currentVideo.keyDecisions}</p></div>}
                     {currentVideo.openQuestions && <div className="p-3 rounded-xl bg-amber-50 border border-amber-200"><span className="font-bold text-amber-600 block mb-1">Open Questions:</span><p className="whitespace-pre-line text-[var(--color-text-body)] text-xs leading-relaxed">{currentVideo.openQuestions}</p></div>}
                   </div>
                )}
                {videoTab === 'transcript' && (
                  <div className="space-y-2 max-h-56 overflow-y-auto pr-2 text-xs bg-white p-4 rounded-xl border border-[var(--color-border)]">
                    <p className="text-[var(--color-text-body)] whitespace-pre-wrap leading-relaxed">{currentVideo.transcript || "No transcript available."}</p>
                  </div>
                )}
                {videoTab === 'notes' && (
                  <div className="space-y-2"><p className="text-[var(--color-text-body)] whitespace-pre-line">{currentVideo.notes || "Personal study notes. Click on Notes in navigation to edit."}</p></div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* RIGHT: AI Chat Panel */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-5 glass-card flex flex-col h-[580px] sm:h-[650px]">
          
          {/* Header Toggle */}
          <div className="p-4 border-b border-[var(--color-border)] flex items-center justify-center">
            <div className="flex items-center gap-1 p-1 bg-white/60 border border-[var(--color-border)] rounded-xl w-full max-w-sm">
              <button type="button" onClick={() => setChatMode('chat')} className={`flex-1 py-2 rounded-lg text-xs font-semibold text-center transition-all duration-300 ${chatMode === 'chat' ? 'bg-[var(--color-primary)] text-white shadow-sm' : 'text-[var(--color-text-body)] hover:bg-white'}`}>AI Chat</button>
              <button type="button" onClick={() => setChatMode('ask')} className={`flex-1 py-2 rounded-lg text-xs font-semibold text-center transition-all duration-300 ${chatMode === 'ask' ? 'bg-[var(--color-secondary)] text-white shadow-sm' : 'text-[var(--color-text-body)] hover:bg-white'}`}>Ask Video</button>
            </div>
          </div>

          {/* Chat Feed */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {chatMessages.length === 0 && !isTyping && (
              <div className="rounded-xl border border-[var(--color-border)] bg-white/50 p-5 text-sm text-[var(--color-text-body)] text-center space-y-2">
                <Sparkles className="w-6 h-6 text-[var(--color-primary)] mx-auto" />
                <p>Ask a question about <strong className="text-[var(--color-text)]">{currentVideo.title}</strong>.</p>
                <p className="text-xs text-[var(--color-text-muted)]">Answers use this video's transcript.</p>
              </div>
            )}
            <AnimatePresence>
              {chatMessages.map((msg) => (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                  {msg.sender === 'user' ? (
                    <div className="bg-[var(--color-primary)] text-white text-sm px-4 py-2.5 rounded-2xl rounded-br-sm max-w-[85%] shadow-md shadow-[var(--color-primary)]/20">{msg.text}</div>
                  ) : (
                    <div className="bg-white/90 border border-[var(--color-border)] text-[var(--color-text-body)] text-sm p-4 rounded-2xl rounded-tl-sm max-w-[92%] shadow-sm space-y-2">
                      {msg.text && <p className="leading-relaxed">{msg.text}</p>}
                      {msg.points && <div className="space-y-2">{msg.points.map((pt, i) => (<p key={i} className="leading-relaxed">{pt}</p>))}</div>}
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {isTyping && (
              <div className="flex items-center gap-2 bg-white/80 border border-[var(--color-border)] text-[var(--color-primary)] text-xs px-4 py-3 rounded-2xl rounded-tl-sm w-fit shadow-sm">
                <Loader2 className="w-4 h-4 animate-spin" /> <span className="font-semibold">Analyzing context...</span>
              </div>
            )}
            <div ref={chatBottomRef} />
          </div>

          {/* Input Bar */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-[var(--color-border)] bg-white/40 rounded-b-2xl flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <input type="text" value={inputText} disabled={isTyping || !currentVideo.transcript} onChange={(e) => { setInputText(e.target.value); if (inputError) setInputError(''); }} onKeyDown={handleKeyDown} placeholder="Ask a question about this video..." className="input-glass" />
              <button type="submit" disabled={!inputText.trim() || isTyping || !currentVideo.transcript} className="w-11 h-11 rounded-xl btn-primary flex items-center justify-center shrink-0 disabled:opacity-50 disabled:cursor-not-allowed" aria-label="Send"><ArrowRight className="w-5 h-5" /></button>
            </div>
            {inputError && <p className="text-xs font-semibold text-[var(--color-primary)] pl-1">{inputError}</p>}
          </form>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default ChatVideoPage;