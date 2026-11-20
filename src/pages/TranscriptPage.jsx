import React, { useState } from 'react';
import { AppLayout } from '../components/layout/AppLayout';
import { TranscriptHeader } from '../components/pages/transcript/TranscriptHeader';
import { TranscriptControls } from '../components/pages/transcript/TranscriptControls';
import { TranscriptList } from '../components/pages/transcript/TranscriptList';

export const TranscriptPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpeaker, setSelectedSpeaker] = useState('all');
  const [selectedLang, setSelectedLang] = useState('en');

  return (
    <AppLayout>
      <div className="space-y-4">
        <TranscriptHeader />
        <TranscriptControls
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedSpeaker={selectedSpeaker}
          setSelectedSpeaker={setSelectedSpeaker}
          selectedLang={selectedLang}
          setSelectedLang={setSelectedLang}
        />
        <TranscriptList
          searchQuery={searchQuery}
          selectedSpeaker={selectedSpeaker}
          selectedLang={selectedLang}
        />
      </div>
    </AppLayout>
  );
};

export default TranscriptPage;
