import React from 'react';
import { FileText, Sliders, CheckCircle } from 'lucide-react';

export const ExportTemplateSelector = ({ selectedTemplate, setSelectedTemplate }) => {
  const templates = [
    {
      id: 'full',
      title: 'Full Verbatim + Summary PDF',
      description: 'Full transcript, timestamps, graphs, all translations (14 pages)',
    },
    {
      id: 'digest',
      title: 'Executive Digest (2 Pages)',
      description: 'Key takeaways, chapter milestones & action matrix',
    },
    {
      id: 'qna',
      title: 'Timestamps & Q&A Log',
      description: 'Full audience queries, model answers and verified citations',
    },
  ];

  return (
    <div className="bg-[#0b0e17] border border-cyan-500/20 rounded-2xl p-6 my-6 backdrop-blur-md">
      <div className="flex items-center gap-2 pb-4 border-b border-slate-800 mb-4 font-mono text-xs text-white font-bold uppercase tracking-wider">
        <Sliders className="w-4 h-4 text-cyan-400" />
        <span>Select Template Preset</span>
      </div>

      <div className="space-y-3 font-mono">
        {templates.map((tpl) => {
          const isSelected = selectedTemplate === tpl.id;

          return (
            <div
              key={tpl.id}
              onClick={() => setSelectedTemplate(tpl.id)}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                isSelected
                  ? 'bg-cyan-950/60 border-cyan-500/50 shadow-lg shadow-cyan-500/10'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <FileText className={`w-5 h-5 ${isSelected ? 'text-cyan-400' : 'text-slate-500'}`} />
                <div>
                  <p className="text-sm font-bold text-white">{tpl.title}</p>
                  <p className="text-xs text-slate-400 mt-0.5 font-sans">{tpl.description}</p>
                </div>
              </div>

              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                isSelected ? 'border-cyan-400 bg-cyan-500' : 'border-slate-700'
              }`}>
                {isSelected && <div className="w-2 h-2 rounded-full bg-black" />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
