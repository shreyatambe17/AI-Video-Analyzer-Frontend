import React from 'react';
import { CheckSquare, Square } from 'lucide-react';

export const AppendicesChecklist = ({ sections, setSections }) => {
  const toggleSection = (key) => {
    setSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const list = [
    {
      id: 'transcript',
      title: 'Word-for-Word Transcript with Timestamps',
      description: 'Indexed at every 10-second speech boundary',
    },
    {
      id: 'translations',
      title: 'Multi-Language Translations',
      description: 'Spanish & Japanese side-by-side annexes',
    },
    {
      id: 'chatHistory',
      title: 'AI Q&A Chat History & Citations',
      description: 'Includes all verified timestamps queried in session',
    },
    {
      id: 'slideExtractions',
      title: 'Speaker Bios & Visual Slide Extractions',
      description: 'High-res slide OCR frames captured during talk',
    },
  ];

  return (
    <div className="bg-[#0b0e17] border border-cyan-500/20 rounded-2xl p-6 my-6 backdrop-blur-md">
      <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-4 pb-3 border-b border-slate-800">
        Included Appendices & Sections
      </h3>

      <div className="space-y-3 font-mono">
        {list.map((item) => {
          const isChecked = sections[item.id];

          return (
            <div
              key={item.id}
              onClick={() => toggleSection(item.id)}
              className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-cyan-500/30 transition-all cursor-pointer"
            >
              <div className="mt-0.5">
                {isChecked ? (
                  <CheckSquare className="w-5 h-5 text-cyan-400" />
                ) : (
                  <Square className="w-5 h-5 text-slate-600" />
                )}
              </div>

              <div>
                <p className="text-sm font-bold text-white">{item.title}</p>
                <p className="text-xs text-slate-400 mt-0.5 font-sans">{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
