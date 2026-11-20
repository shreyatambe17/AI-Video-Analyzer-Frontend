import React from 'react';
import { AppLayout } from '../components/layout/AppLayout';
import { TelemetryHeader } from '../components/pages/telemetry/TelemetryHeader';
import { GpuMetricsGrid } from '../components/pages/telemetry/GpuMetricsGrid';
import { ConsensusLog } from '../components/pages/telemetry/ConsensusLog';

export const TelemetryPage = () => {
  return (
    <AppLayout>
      <div className="space-y-4">
        <TelemetryHeader />
        <GpuMetricsGrid />
        <ConsensusLog />
      </div>
    </AppLayout>
  );
};

export default TelemetryPage;
