import React from 'react';
import { HelpCircle, Brain, Sparkles } from 'lucide-react';

export const StudyHeader = () => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-purple-400 tracking-wider uppercase font-semibold">
          <Brain className="w-3.5 h-3.5 text-purple-400" />
          <span>STUDY COMPANION // AI PREP MATRIX</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-mono text-white tracking-tight mt-1">
          Flashcards & Exam Prep Quiz
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Automatically generated study cards and active recall quizzes from lecture video transcripts.
        </p>
      </div>

      <div className="flex items-center gap-2">
        <span className="px-3 py-1.5 rounded-xl bg-purple-950/80 border border-purple-500/40 text-xs font-mono text-purple-300 font-bold flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span>AI Active Recall Active</span>
        </span>
      </div>
    </div>
  );
};
