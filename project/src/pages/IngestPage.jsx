import React, { useState } from 'react';
import { AppLayout } from '../components/layout/AppLayout';
import { IngestHeader } from '../components/pages/ingest/IngestHeader';
import { PipelineStatusTicker } from '../components/pages/ingest/PipelineStatusTicker';
import { DropzoneSection } from '../components/pages/ingest/DropzoneSection';
import { UrlFetchSection } from '../components/pages/ingest/UrlFetchSection';
import { PreAnalysisMatrix } from '../components/pages/ingest/PreAnalysisMatrix';
import { ActivePayloadCard } from '../components/pages/ingest/ActivePayloadCard';

export const IngestPage = () => {
  const [selectedPayload, setSelectedPayload] = useState({
    name: 'MIT_Quantum_Lecture_08.mp4',
    size: '1.42 GB',
    duration: '01:48:22',
    codec: 'H.265 / 4K',
  });

  const [matrixState, setMatrixState] = useState({
    diarization: true,
    slideOcr: true,
    bilingual: false,
    quantumChunk: true,
  });

  return (
    <AppLayout>
      <div className="space-y-4">
        <IngestHeader />
        <PipelineStatusTicker />
        <DropzoneSection
          selectedFile={selectedPayload}
          onFileSelected={(file) => setSelectedPayload(file)}
        />
        <UrlFetchSection
          onFetchUrl={(fetchedData) => setSelectedPayload(fetchedData)}
        />
        <PreAnalysisMatrix
          matrixState={matrixState}
          setMatrixState={setMatrixState}
        />
        <ActivePayloadCard payload={selectedPayload} />
      </div>
    </AppLayout>
  );
};

export default IngestPage;
