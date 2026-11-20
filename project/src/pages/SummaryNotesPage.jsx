import React from 'react';
import { AppLayout } from '../components/layout/AppLayout';
import { SummaryHeader } from '../components/pages/summaryNotes/SummaryHeader';
import { ExecutiveSummaryCard } from '../components/pages/summaryNotes/ExecutiveSummaryCard';
import { BreakthroughsList } from '../components/pages/summaryNotes/BreakthroughsList';
import { ChapterBreakdownAccordion } from '../components/pages/summaryNotes/ChapterBreakdownAccordion';

export const SummaryNotesPage = () => {
  return (
    <AppLayout>
      <div className="space-y-4">
        <SummaryHeader />
        <ExecutiveSummaryCard />
        <BreakthroughsList />
        <ChapterBreakdownAccordion />
      </div>
    </AppLayout>
  );
};

export default SummaryNotesPage;
