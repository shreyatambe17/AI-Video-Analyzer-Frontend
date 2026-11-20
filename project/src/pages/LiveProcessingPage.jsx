import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';
import { ProcessingHeader } from '../components/pages/processing/ProcessingHeader';
import { ProcessingSteps } from '../components/pages/processing/ProcessingSteps';
import { WaveformLivePreview } from '../components/pages/processing/WaveformLivePreview';
import { LiveOcrStream } from '../components/pages/processing/LiveOcrStream';
import { ProcessingConsole } from '../components/pages/processing/ProcessingConsole';

export const LiveProcessingPage = () => {
  const [progress, setProgress] = useState(65);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 5;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <AppLayout>
      <div className="space-y-4">
        <ProcessingHeader progress={progress} />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ProcessingSteps currentStep={3} />
          <div>
            <WaveformLivePreview />
            <LiveOcrStream />
          </div>
        </div>

        <ProcessingConsole />

        {progress === 100 && (
          <div className="p-4 bg-emerald-950/80 border border-emerald-500/50 rounded-2xl flex items-center justify-between">
            <p className="text-sm font-mono text-emerald-300 font-bold">
              [COMPLETE] Neural Ingestion & Summary Synthesis Complete!
            </p>
            <button
              onClick={() => navigate('/chat')}
              className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-mono text-xs font-bold transition-all shadow-lg shadow-emerald-500/20"
            >
              OPEN CHAT & VIDEO NODE &rarr;
            </button>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default LiveProcessingPage;
