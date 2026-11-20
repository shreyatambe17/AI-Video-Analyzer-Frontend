import React from 'react';
import { CheckCircle2, Loader2, Circle } from 'lucide-react';

export const ProcessingSteps = ({ currentStep }) => {
  const steps = [
    { id: 1, label: 'Media Chunking & Audio Extraction', status: 'completed', duration: '1.2s' },
    { id: 2, label: 'Multimodal Whisper ASR Speech-to-Text', status: 'completed', duration: '4.8s' },
    { id: 3, label: 'PyAnnote Speaker Diarization Engine', status: 'active', duration: 'processing...' },
    { id: 4, label: 'Slide OCR & LaTeX Equation Extraction', status: 'active', duration: 'processing...' },
    { id: 5, label: 'Quantum Vector Embedding & PDF Generation', status: 'queued', duration: 'waiting' },
  ];

  return (
    <div className="bg-[#0b0e17] border border-cyan-500/20 rounded-2xl p-6 my-6 backdrop-blur-md">
      <h3 className="text-sm font-bold font-mono text-white uppercase tracking-wider mb-4">
        Pipeline Execution Status
      </h3>

      <div className="space-y-4">
        {steps.map((step) => {
          const isDone = step.status === 'completed';
          const isActive = step.status === 'active';

          return (
            <div
              key={step.id}
              className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                isDone
                  ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300'
                  : isActive
                  ? 'bg-cyan-950/40 border-cyan-500/50 text-cyan-200 shadow-md shadow-cyan-500/10'
                  : 'bg-slate-900/40 border-slate-800 text-slate-500'
              }`}
            >
              <div className="flex items-center gap-3">
                {isDone ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                ) : isActive ? (
                  <Loader2 className="w-5 h-5 text-cyan-400 animate-spin flex-shrink-0" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-600 flex-shrink-0" />
                )}
                <span className="text-sm font-mono font-medium">{step.label}</span>
              </div>

              <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded bg-slate-900 border border-slate-800">
                {step.duration}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
