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
        if (data.flashcards && data.flashcards.length > 0) {
          setFlashcards(data.flashcards);
        }
        if (data.quiz && data.quiz.length > 0) {
          setQuizList(data.quiz);
        }
      }
    });
  }, []);

  const totalCards = flashcards.length;
  const currentCard = flashcards[currentIndex] || flashcards[0];

  const handleNextCard = () => {
    setIsFlipped(false);
    if (currentIndex < totalCards - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
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
    if (selectedOption === quizList[quizIndex].correctIndex) {
      setScore(prev => prev + 1);
    }
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
    setQuizIndex(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setScore(0);
    setAnswers([]);
    setQuizFinished(false);
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header (Matching Screen 6) */}
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Flashcards & Quiz
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Revise key concepts and test your understanding
          </p>
        </div>

        {/* Segmented Mode Switcher (Matching Screen 6) */}
        <div className="flex items-center justify-center">
          <div className="flex items-center gap-1.5 p-1 bg-[#121828] border border-slate-800 rounded-xl w-full max-w-xs">
            <button
              type="button"
              onClick={() => setMode('flashcards')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-semibold text-center transition-all ${
                mode === 'flashcards'
                  ? 'bg-[#5850ec] text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Flashcards
            </button>
            <button
              type="button"
              onClick={() => setMode('quiz')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-semibold text-center transition-all ${
                mode === 'quiz'
                  ? 'bg-[#5850ec] text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Quiz
            </button>
          </div>
        </div>

        {/* MODE 1: FLASHCARDS (Matching Screen 6) */}
        {mode === 'flashcards' && (
          <div className="space-y-6">
            
            {/* Top Counter */}
            <div className="flex justify-end">
              <span className="text-xs font-mono font-semibold text-slate-400">
                {currentIndex + 1} / {totalCards}
              </span>
            </div>

            {/* Flashcard Box with side Chevrons */}
            <div className="flex items-center gap-3 sm:gap-6">
              
              {/* Left Chevron Button */}
              <button
                type="button"
                onClick={handlePrevCard}
                disabled={currentIndex === 0}
                className="w-10 h-10 rounded-xl bg-[#121828] border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed transition-all shrink-0"
                aria-label="Previous card"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Main Interactive White Flashcard (Matching Screen 6) */}
              <div
                onClick={() => setIsFlipped(!isFlipped)}
                className="flex-1 min-h-[300px] sm:min-h-[340px] bg-white rounded-2xl sm:rounded-3xl p-8 sm:p-12 shadow-xl border border-purple-100 flex flex-col justify-between cursor-pointer transition-all hover:shadow-2xl relative select-none"
              >
                {/* Audio speaker button in top-right */}
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSpeak(isFlipped ? currentCard.answer : currentCard.question);
                    }}
                    className={`p-2 rounded-xl transition-colors ${
                      isSpeaking ? 'bg-indigo-100 text-[#5850ec]' : 'text-slate-400 hover:text-[#5850ec] hover:bg-slate-50'
                    }`}
                    aria-label="Read text aloud"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>

                {/* Center Content: Question or Answer */}
                <div className="my-auto text-center py-6">
                  {!isFlipped ? (
                    <div className="space-y-3">
                      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight leading-snug">
                        {currentCard.question}
                      </h2>
                      <p className="text-xs text-indigo-500 font-medium pt-2">
                        Click to reveal answer
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3 animate-fadeIn">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-50 text-[#5850ec]">
                        Answer
                      </span>
                      <p className="text-sm sm:text-base text-slate-700 leading-relaxed max-w-xl mx-auto">
                        {currentCard.answer}
                      </p>
                      <p className="text-xs text-slate-400 pt-2">
                        Click to flip back to question
                      </p>
                    </div>
                  )}
                </div>

                {/* Card footer indicator */}
                <div className="text-center">
                  <span className="text-[11px] font-medium text-slate-400">
                    Card {currentIndex + 1} of {totalCards}
                  </span>
                </div>
              </div>

              {/* Right Chevron Button */}
              <button
                type="button"
                onClick={handleNextCard}
                disabled={currentIndex === totalCards - 1}
                className="w-10 h-10 rounded-xl bg-[#121828] border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed transition-all shrink-0"
                aria-label="Next card"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

            </div>

            {/* Navigation buttons below card (Matching Screen 6) */}
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={handlePrevCard}
                disabled={currentIndex === 0}
                className="px-5 py-2.5 rounded-xl bg-[#121828] border border-slate-800 hover:bg-slate-800 text-xs sm:text-sm font-semibold text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                ← Previous
              </button>

              <button
                type="button"
                onClick={handleNextCard}
                disabled={currentIndex === totalCards - 1}
                className="px-6 py-2.5 rounded-xl bg-[#5850ec] hover:bg-[#4f46e5] text-white text-xs sm:text-sm font-semibold shadow-md shadow-indigo-600/30 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                Next →
              </button>
            </div>

            {/* Bottom Progress Bar (Matching Screen 6) */}
            <div className="space-y-2 pt-4">
              <div className="flex items-center justify-between text-xs font-medium text-slate-400">
                <span>Progress</span>
                <span className="font-mono">{currentIndex + 1} / {totalCards}</span>
              </div>
              <div className="w-full h-2 bg-[#121828] border border-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#5850ec] rounded-full transition-all duration-300"
                  style={{ width: `${((currentIndex + 1) / totalCards) * 100}%` }}
                />
              </div>
            </div>

          </div>
        )}

        {/* MODE 2: QUIZ */}
        {mode === 'quiz' && (
          <div className="bg-[#121828] border border-slate-800/80 rounded-2xl p-6 sm:p-8 space-y-6">
            {!quizFinished ? (
              <>
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div>
                    <span className="text-xs font-semibold text-indigo-400">Question {quizIndex + 1} of {quizList.length}</span>
                    <h2 className="text-base sm:text-lg font-bold text-white mt-1">
                      {quizList[quizIndex]?.question}
                    </h2>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-mono">
                    Score: {score}
                  </span>
                </div>

                {/* Options List */}
                <div className="space-y-3">
                  {quizList[quizIndex]?.options.map((option, idx) => {
                    const isSelected = selectedOption === idx;
                    const isCorrect = idx === quizList[quizIndex].correctIndex;
                    
                    let optionStyle = 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800 hover:border-slate-700';
                    if (isSubmitted) {
                      if (isCorrect) {
                        optionStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-200';
                      } else if (isSelected) {
                        optionStyle = 'bg-rose-950/60 border-rose-500 text-rose-200';
                      }
                    } else if (isSelected) {
                      optionStyle = 'bg-indigo-600/20 border-[#5850ec] text-white';
                    }

                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSelectQuizOption(idx)}
                        className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm font-medium flex items-center justify-between transition-all ${optionStyle}`}
                      >
                        <span>{option}</span>
                        {isSubmitted && isCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        )}
                        {isSubmitted && isSelected && !isCorrect && (
                          <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Feedback explanation */}
                {isSubmitted && (
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 space-y-1">
                    <p className="font-semibold text-white">Explanation:</p>
                    <p>{quizList[quizIndex]?.explanation}</p>
                  </div>
                )}

                {/* Footer submit / next */}
                <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                  {!isSubmitted ? (
                    <button
                      type="button"
                      disabled={selectedOption === null}
                      onClick={handleSubmitQuizAnswer}
                      className="px-5 py-2.5 rounded-xl bg-[#5850ec] hover:bg-[#4f46e5] text-white text-xs sm:text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                    >
                      Check Answer
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleNextQuizQuestion}
                      className="px-5 py-2.5 rounded-xl bg-[#5850ec] hover:bg-[#4f46e5] text-white text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all"
                    >
                      <span>{quizIndex < quizList.length - 1 ? 'Next Question' : 'Complete Quiz'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </>
            ) : (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white">Quiz Completed!</h3>
                <p className="text-sm text-slate-300">
                  You scored <span className="font-bold text-[#5850ec]">{score}</span> out of {quizList.length}
                </p>
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={handleRestartQuiz}
                    className="px-5 py-2.5 rounded-xl bg-[#5850ec] hover:bg-[#4f46e5] text-white text-xs sm:text-sm font-semibold inline-flex items-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Try Again
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </AppLayout>
  );
};

export default FlashcardsQuizPage;
