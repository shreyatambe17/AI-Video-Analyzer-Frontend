import React from 'react';
import { Sliders, UserCheck, ScanLine, Languages, Cpu } from 'lucide-react';

export const PreAnalysisMatrix = ({ matrixState, setMatrixState }) => {
  const toggleFeature = (key) => {
    setMatrixState((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const features = [
    {
      id: 'diarization',
      icon: UserCheck,
      title: '[DIARIZATION_ENGINE]',
      badge: '99.8%',
      badgeVariant: 'bg-emerald-950/70 text-emerald-400 border-emerald-500/40',
      description: 'Multi-speaker voiceprint separation & speaker identity clustering',
    },
    {
      id: 'slideOcr',
      icon: ScanLine,
      title: '[SLIDE_OCR_INGEST]',
      badge: 'LATEX+',
      badgeVariant: 'bg-cyan-950/70 text-cyan-400 border-cyan-500/40',
      description: 'Extract presentation slides, whiteboard text & LaTeX mathematical equations',
    },
    {
      id: 'bilingual',
      icon: Languages,
      title: '[BILINGUAL_PARALLEL]',
      badge: 'EN//JP//DE',
      badgeVariant: 'bg-purple-950/70 text-purple-400 border-purple-500/40',
      description: 'Generate simultaneous verbatim translation matrices across target languages',
    },
    {
      id: 'quantumChunk',
      icon: Cpu,
      title: '[QUANTUM_CHUNK]',
      badge: '30s WINDOW',
      badgeVariant: 'bg-amber-950/70 text-amber-400 border-amber-500/40',
      description: '30s semantic embedding intervals with high resolution vector search indexing',
    },
  ];

  return (
    <div className="bg-[#0b0e17] border border-cyan-500/20 rounded-2xl p-6 my-6 backdrop-blur-md">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-cyan-400" />
          <h3 className="text-base font-bold font-mono text-white tracking-wide uppercase">
            Pre-Analysis Matrix
          </h3>
        </div>
        <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/40">
          [AI_MODELS: READY]
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {features.map((feat) => {
          const Icon = feat.icon;
          const isEnabled = matrixState[feat.id];

          return (
            <div
              key={feat.id}
              onClick={() => toggleFeature(feat.id)}
              className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer flex items-start justify-between gap-3 ${
                isEnabled
                  ? 'bg-slate-900/90 border-cyan-500/40 shadow-lg shadow-cyan-500/5'
                  : 'bg-slate-950/50 border-slate-800/80 opacity-60 hover:opacity-100'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2.5 rounded-lg ${isEnabled ? 'bg-cyan-950/80 text-cyan-400 border border-cyan-500/30' : 'bg-slate-900 text-slate-500'}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold font-mono text-slate-100">{feat.title}</span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${feat.badgeVariant}`}>
                      {feat.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 leading-snug">
                    {feat.description}
                  </p>
                </div>
              </div>

              {/* Custom Toggle Switch */}
              <button
                type="button"
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  isEnabled ? 'bg-cyan-500 shadow-md shadow-cyan-500/30' : 'bg-slate-700'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    isEnabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
