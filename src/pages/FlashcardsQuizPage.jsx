import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Volume2, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  HelpCircle, 
  ArrowRight,
  BookOpen,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppLayout } from '../components/layout/AppLayout';
import { MOCK_FLASHCARDS, MOCK_QUIZ } from '../data/mockData';
import { api } from '../services/api';

export const FlashcardsQuizPage = () => {
  const [mode, setMode] = useState('flashcards'); // 'flashcards' | 'quiz'
  const [flashcards, setFlashcards] = useState(MOCK_FLASHCARDS);
  const [quizList, setQuizList] = useState(MOCK_QUIZ);
  const [answers, setAnswers] = useState([]);
  
  // Flashcards state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Quiz state
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  useEffect(() => {
    api.getQuiz('vid-1').then(data => {
      if (data) {
        if (data.flashcards && data.flashcards.length > 0) setFlashcards(data.flashcards);
        if (data.quiz && data.quiz.length > 0) setQuizList(data.quiz);
      }
    });
  }, []);

  const totalCards = flashcards.length;
  const currentCard = flashcards[currentIndex] || flashcards[0];

  const handleNextCard = () => {
    setIsFlipped(false);
    if (currentIndex < totalCards - 1) setCurrentIndex(prev => prev + 1);
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
  };

  const handleSpeak = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  // Quiz handlers
  const handleSelectQuizOption = (index) => {
    if (isSubmitted) return;
    setSelectedOption(index);
  };

  const handleSubmitQuizAnswer = () => {
    if (selectedOption === null || isSubmitted) return;
    setIsSubmitted(true);
    const updatedAnswers = [...answers, selectedOption];
    setAnswers(updatedAnswers);
    if (selectedOption === quizList[quizIndex].correctIndex) setScore(prev => prev + 1);
  };

  const handleNextQuizQuestion = () => {
    if (quizIndex < quizList.length - 1) {
      setQuizIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      setQuizFinished(true);
      api.submitQuiz('vid-1', [...answers, selectedOption]);
      api.addHistory({
        title: `Completed Quiz (${score + (selectedOption === quizList[quizIndex].correctIndex ? 1 : 0)}/${quizList.length})`,
        type: 'quiz',
        color: 'purple'
      });
    }
  };

  const handleRestartQuiz = () => {
    setQuizIndex(0); setSelectedOption(null); setIsSubmitted(false);
    setScore(0); setAnswers([]); setQuizFinished(false);
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
        
        {/* Header */}
        <div>
          <h1 className="text-3xl font-extrabold text-[var(--color-text)] tracking-tight">Flashcards & Quiz</h1>
          <p className="text-sm text-[var(--color-text-body)] mt-1">Revise key concepts and test your understanding.</p>
        </div>

        {/* Mode Switcher */}
        <div className="flex items-center justify-center">
          <div className="flex items-center gap-1.5 p-1 bg-white/60 border border-[var(--color-border)] rounded-xl w-full max-w-xs shadow-sm">
            <button
              type="button"
              onClick={() => setMode('flashcards')}
              className={`flex-1 py-2 rounded-lg text-xs font-semibold text-center transition-all duration-300 ${
                mode === 'flashcards' ? 'bg-[var(--color-primary)] text-white shadow-md shadow-[var(--color-primary)]/30' : 'text-[var(--color-text-body)] hover:bg-white'
              }`}
            >
              Flashcards
            </button>
            <button
              type="button"
              onClick={() => setMode('quiz')}
              className={`flex-1 py-2 rounded-lg text-xs font-semibold text-center transition-all duration-300 ${
                mode === 'quiz' ? 'bg-[var(--color-secondary)] text-white shadow-md shadow-[var(--color-secondary)]/30' : 'text-[var(--color-text-body)] hover:bg-white'
              }`}
            >
              Quiz
            </button>
          </div>
        </div>

        {/* MODE 1: FLASHCARDS */}
        {mode === 'flashcards' && (
          <div className="space-y-6">
            
            <div className="flex justify-end">
              <span className="text-xs font-mono font-bold text-[var(--color-text-muted)] bg-white/60 px-3 py-1 rounded-md border border-[var(--color-border)]">
                {currentIndex + 1} / {totalCards}
              </span>
            </div>

            <div className="flex items-center gap-3 sm:gap-6">
              
              {/* Left Chevron */}
              <button
                type="button"
                onClick={handlePrevCard}
                disabled={currentIndex === 0}
                className="w-10 h-10 rounded-xl bg-white/60 border border-[var(--color-border)] hover:bg-white text-[var(--color-text-body)] hover:text-[var(--color-primary)] flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed transition-all shrink-0 shadow-sm"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Main Interactive Flashcard (3D Flip) */}
              <div 
                className="flex-1 min-h-[300px] sm:min-h-[340px] perspective-1000 cursor-pointer"
                onClick={() => setIsFlipped(!isFlipped)}
              >
                <motion.div
                  initial={false}
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                  className="relative w-full h-full min-h-[300px] sm:min-h-[340px] preserve-3d"
                >
                  {/* FRONT SIDE (Question) */}
                  <div className="absolute inset-0 backface-hidden glass-strong rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col justify-between border-t-8 border-t-[var(--color-secondary)]">
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); handleSpeak(currentCard.question); }}
                        className={`p-2 rounded-xl transition-colors ${isSpeaking ? 'bg-[var(--color-primary-soft)] text-[var(--color-primary)]' : 'text-[var(--color-text-muted)] hover:text-[var(--color-secondary)] hover:bg-white'}`}
                      >
                        <Volume2 className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="text-center space-y-4">
                      <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[var(--color-secondary-soft)] text-[var(--color-secondary)] mb-2">Question</span>
                      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[var(--color-text)] tracking-tight leading-snug">{currentCard.question}</h2>
                      <p className="text-xs text-[var(--color-primary)] font-semibold pt-4 animate-pulse">Click to reveal answer</p>
                    </div>
                    <div className="text-center"><span className="text-[11px] font-bold text-[var(--color-text-muted)]">Card {currentIndex + 1} of {totalCards}</span></div>
                  </div>

                  {/* BACK SIDE (Answer) */}
                  <div className="absolute inset-0 backface-hidden glass-strong rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col justify-between border-t-8 border-t-[var(--color-primary)]" style={{ transform: "rotateY(180deg)" }}>
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); handleSpeak(currentCard.answer); }}
                        className={`p-2 rounded-xl transition-colors ${isSpeaking ? 'bg-[var(--color-primary-soft)] text-[var(--color-primary)]' : 'text-[var(--color-text-muted)] hover:text-[var(--color-secondary)] hover:bg-white'}`}
                      >
                        <Volume2 className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="text-center space-y-4">
                      <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[var(--color-primary-soft)] text-[var(--color-primary)] mb-2">Answer</span>
                      <p className="text-base sm:text-lg text-[var(--color-text)] leading-relaxed max-w-xl mx-auto font-medium">{currentCard.answer}</p>
                      <p className="text-xs text-[var(--color-text-muted)] pt-4">Click to flip back to question</p>
                    </div>
                    <div className="text-center"><span className="text-[11px] font-bold text-[var(--color-text-muted)]">Card {currentIndex + 1} of {totalCards}</span></div>
                  </div>
                </motion.div>
              </div>

              {/* Right Chevron */}
              <button
                type="button"
                onClick={handleNextCard}
                disabled={currentIndex === totalCards - 1}
                className="w-10 h-10 rounded-xl bg-white/60 border border-[var(--color-border)] hover:bg-white text-[var(--color-text-body)] hover:text-[var(--color-primary)] flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed transition-all shrink-0 shadow-sm"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Nav Buttons */}
            <div className="flex items-center justify-center gap-3 pt-2">
              <button type="button" onClick={handlePrevCard} disabled={currentIndex === 0} className="btn-ghost px-5 py-2.5 text-sm">← Previous</button>
              <button type="button" onClick={handleNextCard} disabled={currentIndex === totalCards - 1} className="btn-primary px-6 py-2.5 text-sm">Next →</button>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2 pt-4">
              <div className="flex items-center justify-between text-xs font-bold text-[var(--color-text-body)]">
                <span>Progress</span>
                <span className="font-mono text-[var(--color-primary)]">{currentIndex + 1} / {totalCards}</span>
              </div>
              <div className="w-full h-2.5 bg-white/60 border border-[var(--color-border)] rounded-full overflow-hidden shadow-inner">
                <div className="h-full bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-primary)] rounded-full transition-all duration-300" style={{ width: `${((currentIndex + 1) / totalCards) * 100}%` }} />
              </div>
            </div>
          </div>
        )}

        {/* MODE 2: QUIZ */}
        {mode === 'quiz' && (
          <div className="glass-card p-6 sm:p-8 space-y-6">
            {!quizFinished ? (
              <AnimatePresence mode="wait">
                <motion.div key={quizIndex} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[var(--color-border)] pb-4 gap-3">
                    <div>
                      <span className="text-xs font-bold text-[var(--color-secondary)] bg-[var(--color-secondary-soft)] px-2.5 py-1 rounded-md mb-2 inline-block">Question {quizIndex + 1} of {quizList.length}</span>
                      <h2 className="text-lg font-bold text-[var(--color-text)] leading-snug">{quizList[quizIndex]?.question}</h2>
                    </div>
                    <span className="px-3 py-1.5 rounded-lg bg-white border border-[var(--color-border)] text-[var(--color-primary)] text-sm font-bold shadow-sm shrink-0">Score: {score}</span>
                  </div>

                  <div className="space-y-3">
                    {quizList[quizIndex]?.options.map((option, idx) => {
                      const isSelected = selectedOption === idx;
                      const isCorrect = idx === quizList[quizIndex].correctIndex;
                      
                      let optionStyle = 'bg-white/60 border-[var(--color-border)] text-[var(--color-text-body)] hover:bg-white hover:border-[var(--color-secondary)]/50';
                      if (isSubmitted) {
                        if (isCorrect) optionStyle = 'bg-[var(--color-secondary-soft)] border-[var(--color-secondary)] text-[var(--color-secondary)] shadow-sm';
                        else if (isSelected) optionStyle = 'bg-[var(--color-primary-soft)] border-[var(--color-primary)] text-[var(--color-primary)]';
                        else optionStyle = 'bg-white/40 border-transparent opacity-60';
                      } else if (isSelected) {
                        optionStyle = 'bg-[var(--color-secondary-soft)] border-[var(--color-secondary)] text-[var(--color-text)] shadow-md ring-1 ring-[var(--color-secondary)]/30';
                      }

                      return (
                        <button
                          key={idx} type="button" onClick={() => handleSelectQuizOption(idx)}
                          className={`w-full p-4 rounded-xl border text-left text-sm font-semibold flex items-center justify-between transition-all duration-300 ${optionStyle}`}
                        >
                          <span>{option}</span>
                          {isSubmitted && isCorrect && <CheckCircle2 className="w-5 h-5 text-[var(--color-secondary)] shrink-0" />}
                          {isSubmitted && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-[var(--color-primary)] shrink-0" />}
                        </button>
                      );
                    })}
                  </div>

                  {isSubmitted && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded-xl bg-[var(--color-secondary-soft)]/50 border border-[var(--color-secondary)]/30 text-sm">
                      <p className="font-bold text-[var(--color-secondary)] mb-1 flex items-center gap-1.5"><Sparkles className="w-4 h-4" /> Explanation:</p>
                      <p className="text-[var(--color-text-body)] leading-relaxed">{quizList[quizIndex]?.explanation}</p>
                    </motion.div>
                  )}

                  <div className="flex justify-end gap-3 pt-4 border-t border-[var(--color-border)]">
                    {!isSubmitted ? (
                      <button type="button" disabled={selectedOption === null} onClick={handleSubmitQuizAnswer} className="btn-secondary px-5 py-2.5 text-sm disabled:opacity-40 disabled:cursor-not-allowed">Check Answer</button>
                    ) : (
                      <button type="button" onClick={handleNextQuizQuestion} className="btn-primary px-5 py-2.5 text-sm flex items-center gap-2">
                        <span>{quizIndex < quizList.length - 1 ? 'Next Question' : 'Complete Quiz'}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            ) : (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12 space-y-5">
                <div className="w-20 h-20 rounded-full bg-[var(--color-secondary-soft)] text-[var(--color-secondary)] flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="text-2xl font-extrabold text-[var(--color-text)]">Quiz Completed!</h3>
                  <p className="text-sm text-[var(--color-text-body)] mt-1">You scored <span className="font-bold text-[var(--color-primary)] text-lg">{score}</span> out of {quizList.length}</p>
                </div>
                <div className="pt-4">
                  <button type="button" onClick={handleRestartQuiz} className="btn-primary px-6 py-2.5 text-sm inline-flex items-center gap-2 mx-auto"><RotateCcw className="w-4 h-4" /> Try Again</button>
                </div>
              </motion.div>
            )}
          </div>
        )}

      </div>
    </AppLayout>
  );
};

export default FlashcardsQuizPage;