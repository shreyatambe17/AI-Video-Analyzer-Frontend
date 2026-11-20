import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, XCircle } from 'lucide-react';
import { MOCK_QUIZ } from '../../../data/mockData';

export const QuizSection = () => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(0);

  const handleSelectOption = (qId, optionIdx, correctIdx) => {
    if (selectedAnswers[qId] !== undefined) return; // locked

    setSelectedAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
    if (optionIdx === correctIdx) {
      setScore((prev) => prev + 1);
    }
  };

  return (
    <div className="bg-[#0b0e17] border border-cyan-500/20 rounded-2xl p-6 my-6 backdrop-blur-md">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-cyan-400" />
          <h2 className="text-lg font-bold text-white tracking-wide">Exam Active Recall Quiz</h2>
        </div>
        <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-500/40">
          Score: {score} / {MOCK_QUIZ.length}
        </span>
      </div>

      <div className="space-y-6">
        {MOCK_QUIZ.map((q, qIdx) => {
          const userChoice = selectedAnswers[q.id];

          return (
            <div key={q.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <p className="text-sm font-bold font-mono text-slate-100">
                Q{qIdx + 1}: {q.question}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-xs">
                {q.options.map((opt, optIdx) => {
                  const isChosen = userChoice === optIdx;
                  const isCorrect = optIdx === q.correctIndex;
                  const isLocked = userChoice !== undefined;

                  let style = "bg-slate-900 border-slate-800 text-slate-300 hover:border-cyan-500/40";
                  if (isLocked) {
                    if (isCorrect) style = "bg-emerald-950 border-emerald-500 text-emerald-300";
                    else if (isChosen && !isCorrect) style = "bg-rose-950 border-rose-500 text-rose-300";
                    else style = "bg-slate-900 border-slate-800 text-slate-500 opacity-50";
                  }

                  return (
                    <button
                      key={optIdx}
                      disabled={isLocked}
                      onClick={() => handleSelectOption(q.id, optIdx, q.correctIndex)}
                      className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all ${style}`}
                    >
                      <span>{opt}</span>
                      {isLocked && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                      {isLocked && isChosen && !isCorrect && <XCircle className="w-4 h-4 text-rose-400" />}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
