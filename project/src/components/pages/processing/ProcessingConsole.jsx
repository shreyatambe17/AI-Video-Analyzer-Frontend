import React from 'react';
import { Terminal } from 'lucide-react';

export const ProcessingConsole = () => {
  const logs = [
    '[00:00:01] [SYS] Initializing Multimodal Neural Engine v2.4_PRO...',
    '[00:00:03] [ASR] Loaded Whisper-Large-v3 model with 12 language decoders.',
    '[00:00:05] [DIAR] PyAnnote voiceprint clustering: identified 4 unique speakers.',
    '[00:00:07] [OCR] Extracted 18 slides with 42 LaTeX equation blocks.',
    '[00:00:10] [EMBED] Generating 30s semantic vector embeddings (1536 dim)...',
    '[00:00:12] [PDF] Formatting executive summary & key takeaways document...',
  ];

  return (
    <div className="bg-[#0b0e17] border border-slate-800 rounded-2xl p-5 my-6">
      <div className="flex items-center gap-2 mb-3 text-xs font-mono text-slate-400">
        <Terminal className="w-4 h-4 text-cyan-400" />
        <span>SYSTEM CONSOLE TELEMETRY LOGS</span>
      </div>

      <div className="bg-slate-950 p-4 rounded-xl border border-slate-900 font-mono text-xs text-emerald-400/90 space-y-1.5 max-h-48 overflow-y-auto">
        {logs.map((log, idx) => (
          <div key={idx} className="flex items-start gap-2">
            <span className="text-slate-600 select-none font-bold">&gt;</span>
            <span>{log}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
