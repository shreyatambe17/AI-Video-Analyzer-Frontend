import { useState, useRef, useEffect } from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';
import { AppLayout } from '../components/layout/AppLayout';
import { api } from '../services/api';
import { useSearchParams } from 'react-router-dom';

const youtubeVideoId = (sourceUrl = '') => {
  try {
    const url = new URL(sourceUrl);
    if (url.hostname.endsWith('youtu.be')) return url.pathname.split('/').filter(Boolean)[0] || '';
    if (url.searchParams.get('v')) return url.searchParams.get('v');
    return url.pathname.match(/\/(?:shorts|embed|live)\/([\w-]{11})/)?.[1] || '';
  } catch {
    return '';
  }
};

export const ChatVideoPage = () => {
  const [searchParams] = useSearchParams();
  const requestedMediaId = searchParams.get('mediaId');
  const [currentVideo, setCurrentVideo] = useState(null);
  const [videoError, setVideoError] = useState('');
  const [isLoadingVideo, setIsLoadingVideo] = useState(true);
  const chatBottomRef = useRef(null);

  const [videoTab, setVideoTab] = useState('summary'); // 'summary' | 'chapters' | 'notes'
  const [chatMode, setChatMode] = useState('chat'); // 'chat' | 'ask'
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
    if (!query) {
      setInputError('Please enter a question or prompt.');
      return;
    }

    setInputError('');
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query
    };

    const newHistory = [...chatMessages, userMsg];
    setChatMessages(newHistory);
    setInputText('');
    setIsTyping(true);

    try {
      const reply = await api.chatWithVideo(currentVideo.id, query, newHistory);
      
      let aiMessage;
      // If reply is multiline numbered list, convert to points for clean UI display
      if (typeof reply === 'string' && reply.includes('\n') && (reply.includes('1.') || reply.includes('- '))) {
        const points = reply.split('\n').map(p => p.trim()).filter(Boolean);
        aiMessage = {
          id: Date.now() + 1,
          sender: 'ai',
          points
        };
      } else {
        aiMessage = {
          id: Date.now() + 1,
          sender: 'ai',
          text: typeof reply === 'string' ? reply : 'Processed contextual analysis for this video.'
        };
      }
      setChatMessages(prev => [...prev, aiMessage]);
      api.addHistory({
        title: `Asked AI: "${query.slice(0, 32)}..."`,
        type: 'watch',
        color: 'purple'
      });
    } catch (err) {
      console.error('Chat error:', err);
      setChatMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'ai',
        text: err.message || 'Could not get an answer from the backend. Check that the backend is running and try again.'
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (isLoadingVideo) {
    return <AppLayout><div className="p-12 text-center text-slate-300">Loading video and transcript…</div></AppLayout>;
  }
  if (!currentVideo) {
    return <AppLayout><div className="m-8 rounded-xl border border-rose-500/30 bg-rose-950/30 p-5 text-sm text-rose-200">{videoError || 'Could not load the selected video.'}</div></AppLayout>;
  }

  const youtubeId = youtubeVideoId(currentVideo.sourceUrl);
  const mediaUrl = currentVideo.mediaUrl || (currentVideo.filePath ? `/uploads/${encodeURIComponent(currentVideo.filePath.split(/[\\/]/).pop())}` : '');

  return (
    <AppLayout>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Video Player & Sub-Tabs (Columns: 7 on lg) */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Video Player Card */}
          <div className="bg-[#121828] border border-slate-800/80 rounded-2xl overflow-hidden shadow-lg">
            
            {/* Video Screen */}
            <div className="relative aspect-video bg-black overflow-hidden">
              {youtubeId ? (
                <iframe
                  key={youtubeId}
                  className="absolute inset-0 h-full w-full"
                  src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=0&rel=0&playsinline=1`}
                  title={currentVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              ) : mediaUrl ? (
                <video className="absolute inset-0 h-full w-full" src={mediaUrl} poster={currentVideo.thumbnail} controls playsInline />
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-slate-400">No playable source is attached to this video.</div>
              )}
            </div>

            {/* Video Details & Meta */}
            <div className="p-4 sm:p-5">
              <h2 className="text-lg font-bold text-white tracking-tight">
                {currentVideo.title}
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                {currentVideo.date} • {currentVideo.size}
              </p>

              {/* Tabs under video: Summary | Chapters | Notes */}
              <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setVideoTab('summary')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    videoTab === 'summary'
                      ? 'bg-[#5850ec] text-white shadow-xs'
                      : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  Summary
                </button>
                <button
                  type="button"
                  onClick={() => setVideoTab('chapters')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    videoTab === 'chapters'
                      ? 'bg-[#5850ec] text-white shadow-xs'
                      : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  Chapters
                </button>
                <button
                  type="button"
                  onClick={() => setVideoTab('actions')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    videoTab === 'actions'
                      ? 'bg-[#5850ec] text-white shadow-xs'
                      : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  Action Items
                </button>
                <button
                  type="button"
                  onClick={() => setVideoTab('transcript')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    videoTab === 'transcript'
                      ? 'bg-[#5850ec] text-white shadow-xs'
                      : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  Transcript
                </button>
                <button
                  type="button"
                  onClick={() => setVideoTab('notes')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    videoTab === 'notes'
                      ? 'bg-[#5850ec] text-white shadow-xs'
                      : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  Notes
                </button>
              </div>

              {/* Tab Content Box */}
              <div className="mt-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                {videoTab === 'summary' && (
                  <div className="space-y-2">
                    <p>{currentVideo.summary}</p>
                    <div className="pt-2 border-t border-slate-800/70">
                      <p className="font-semibold text-white mb-1.5">Key Takeaways:</p>
                      <ul className="space-y-1 text-slate-400 list-disc pl-4">
                        {(currentVideo.keyTakeaways || []).map((point, idx) => (
                          <li key={idx}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {videoTab === 'chapters' && (
                  <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                    {(currentVideo.chapters || []).map((ch) => (
                      <div key={ch.id} className="flex items-start justify-between gap-2 p-1.5 hover:bg-slate-800/50 rounded-lg">
                        <div>
                          <span className="font-semibold text-white">{ch.id}. {ch.title}</span>
                          <p className="text-[11px] text-slate-400">{ch.summary}</p>
                        </div>
                        <span className="font-mono text-[10px] text-indigo-400 shrink-0">{ch.time}</span>
                      </div>
                    ))}
                  </div>
                )}

                {videoTab === 'actions' && (
                  <div className="space-y-3 max-h-52 overflow-y-auto pr-1">
                    {currentVideo.actionItems && (
                      <div className="p-2.5 rounded-lg bg-indigo-950/30 border border-indigo-500/20">
                        <span className="font-semibold text-indigo-300 block mb-1">Action Items:</span>
                        <p className="whitespace-pre-line text-slate-300 text-[11px] leading-relaxed">
                          {currentVideo.actionItems}
                        </p>
                      </div>
                    )}
                    {currentVideo.keyDecisions && (
                      <div className="p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-500/20">
                        <span className="font-semibold text-emerald-300 block mb-1">Key Decisions:</span>
                        <p className="whitespace-pre-line text-slate-300 text-[11px] leading-relaxed">
                          {currentVideo.keyDecisions}
                        </p>
                      </div>
                    )}
                    {currentVideo.openQuestions && (
                      <div className="p-2.5 rounded-lg bg-amber-950/30 border border-amber-500/20">
                        <span className="font-semibold text-amber-300 block mb-1">Open Questions:</span>
                        <p className="whitespace-pre-line text-slate-300 text-[11px] leading-relaxed">
                          {currentVideo.openQuestions}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {videoTab === 'transcript' && (
                  <div className="space-y-2 max-h-52 overflow-y-auto pr-1 font-mono text-[11px] bg-black/40 p-3 rounded-lg border border-slate-800">
                    <p className="text-slate-300 whitespace-pre-wrap leading-relaxed">
                      {currentVideo.transcript || "No transcript is available for this video yet."}
                    </p>
                  </div>
                )}

                {videoTab === 'notes' && (
                  <div className="space-y-2">
                    <p className="text-slate-300 whitespace-pre-line">
                      {currentVideo.notes || "Personal study notes for this video lecture. Click on Notes in navigation to edit."}
                    </p>
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>

        {/* Right Column: AI Chat Panel (Columns: 5 on lg) */}
        <div className="lg:col-span-5 bg-[#121828] border border-slate-800/80 rounded-2xl flex flex-col h-[580px] sm:h-[620px] shadow-lg">
          
          {/* Header Segmented Toggle (Matching Screen 4) */}
          <div className="p-3.5 border-b border-slate-800 flex items-center justify-center">
            <div className="flex items-center gap-1.5 p-1 bg-slate-900/90 border border-slate-800 rounded-xl w-full max-w-xs">
              <button
                type="button"
                onClick={() => setChatMode('chat')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-semibold text-center transition-all cursor-pointer ${
                  chatMode === 'chat'
                    ? 'bg-[#5850ec] text-white shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                AI Chat
              </button>
              <button
                type="button"
                onClick={() => setChatMode('ask')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-semibold text-center transition-all cursor-pointer ${
                  chatMode === 'ask'
                    ? 'bg-[#5850ec] text-white shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Ask about this video
              </button>
            </div>
          </div>

          {/* Chat Messages Feed */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {chatMessages.length === 0 && !isTyping && (
              <p className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-sm text-slate-400">
                Ask a question about <span className="text-slate-200">{currentVideo.title}</span>. Answers use this video's transcript.
              </p>
            )}
            {chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                {msg.sender === 'user' ? (
                  <div className="bg-[#5850ec] text-white text-xs sm:text-sm px-4 py-2.5 rounded-2xl rounded-br-xs max-w-[85%] shadow-sm">
                    {msg.text}
                  </div>
                ) : (
                  <div className="bg-[#151c30] border border-slate-800 text-slate-200 text-xs sm:text-sm p-3.5 rounded-2xl rounded-tl-xs max-w-[92%] shadow-xs space-y-2">
                    {msg.text && (
                      <p className="leading-relaxed text-slate-300">{msg.text}</p>
                    )}
                    {msg.points && (
                      <div className="space-y-1.5 text-slate-200">
                        {msg.points.map((pt, i) => (
                          <p key={i} className="leading-relaxed">{pt}</p>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 bg-[#151c30] border border-slate-800 text-slate-400 text-xs px-3.5 py-2.5 rounded-2xl rounded-tl-xs w-fit">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-400" />
                <span>AI is analyzing lecture context...</span>
              </div>
            )}

            <div ref={chatBottomRef} />
          </div>

          {/* Bottom Chat Input Bar (Matching Screen 4) */}
          <form 
            onSubmit={handleSendMessage}
            className="p-3.5 border-t border-slate-800 bg-[#121828] flex flex-col gap-1 rounded-b-2xl"
          >
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={inputText}
                disabled={isTyping || !currentVideo.transcript}
                onChange={(e) => {
                  setInputText(e.target.value);
                  if (inputError) setInputError('');
                }}
                onKeyDown={handleKeyDown}
                placeholder="Ask a question about this video... (Enter to send)"
                className="flex-1 bg-slate-900/80 border border-slate-700/80 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <button
                type="submit"
                disabled={!inputText.trim() || isTyping || !currentVideo.transcript}
                className="w-10 h-10 rounded-xl bg-[#5850ec] hover:bg-[#4f46e5] text-white flex items-center justify-center shadow-md shadow-indigo-600/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all shrink-0 cursor-pointer"
                aria-label="Send message"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            {inputError && (
              <p className="text-[11px] text-rose-400 pl-1">{inputError}</p>
            )}
          </form>

        </div>

      </div>
    </AppLayout>
  );
};

export default ChatVideoPage;
