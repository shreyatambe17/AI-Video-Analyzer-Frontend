import React, { useState } from 'react';
import { RotateCw, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import { MOCK_FLASHCARDS } from '../../../data/mockData';

export const FlashcardDeck = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const card = MOCK_FLASHCARDS[currentIndex];

  const handleNext = () => {
    setFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % MOCK_FLASHCARDS.length);
  };

  const handlePrev = () => {
    setFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + MOCK_FLASHCARDS.length) % MOCK_FLASHCARDS.length);
  };

  return (
    <div className="bg-[#0b0e17] border border-purple-500/30 rounded-2xl p-6 my-6 backdrop-blur-md shadow-xl shadow-purple-500/5">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
        <h3 className="text-sm font-bold font-mono text-white uppercase tracking-wider">
          AI Study Flashcard Deck
        </h3>
        <span className="text-xs font-mono text-purple-400 font-bold">
          Card {currentIndex + 1} of {MOCK_FLASHCARDS.length}
        </span>
      </div>

      {/* Interactive Card */}
      <div
        onClick={() => setFlipped(!flipped)}
        className="min-h-56 p-8 rounded-2xl bg-gradient-to-br from-slate-950 via-[#0f1422] to-slate-950 border border-purple-500/30 flex flex-col justify-between cursor-pointer group hover:border-purple-400/60 transition-all shadow-2xl relative overflow-hidden"
      >
        <div className="flex items-center justify-between text-xs font-mono text-slate-500">
          <span className="text-purple-400 font-bold">
            {flipped ? '[ ANSWER CARD ]' : '[ QUESTION CARD ]'}
          </span>
          <span className="flex items-center gap-1 group-hover:text-purple-300">
            <RotateCw className="w-3.5 h-3.5" />
            Click to Flip
          </span>
        </div>

        <div className="my-6 text-center">
          {flipped ? (
            <p className="text-base sm:text-lg font-sans font-medium text-emerald-300 leading-relaxed">
              {card.answer}
            </p>
          ) : (
            <p className="text-lg sm:text-xl font-bold font-sans text-white leading-relaxed">
              {card.question}
            </p>
          )}
        </div>

        <div className="text-center text-[11px] font-mono text-slate-500">
          Topic: Stanford AI Multimodal Lecture
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between mt-4">
        <button
          onClick={handlePrev}
          className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-mono text-slate-200 flex items-center gap-1 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </button>

        <button
          onClick={() => setFlipped(!flipped)}
          className="px-4 py-2 rounded-xl bg-purple-950/80 hover:bg-purple-900 border border-purple-500/40 text-xs font-mono text-purple-300 font-bold transition-colors"
        >
          Flip Card
        </button>

        <button
          onClick={handleNext}
          className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-mono text-slate-200 flex items-center gap-1 transition-colors"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
