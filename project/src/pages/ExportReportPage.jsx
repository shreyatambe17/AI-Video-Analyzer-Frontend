import React, { useState } from 'react';
import { AppLayout } from '../components/layout/AppLayout';
import { ExportHeader } from '../components/pages/exportReport/ExportHeader';
import { DocumentPreviewCard } from '../components/pages/exportReport/DocumentPreviewCard';
import { ExportTemplateSelector } from '../components/pages/exportReport/ExportTemplateSelector';
import { AppendicesChecklist } from '../components/pages/exportReport/AppendicesChecklist';
import { ExportActionButtons } from '../components/pages/exportReport/ExportActionButtons';

export const ExportReportPage = () => {
  const [selectedTemplate, setSelectedTemplate] = useState('full');
  const [sections, setSections] = useState({
    transcript: true,
    translations: true,
    chatHistory: true,
    slideExtractions: true,
  });

  return (
    <AppLayout>
      <div className="space-y-4">
        <ExportHeader />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DocumentPreviewCard />
          <div>
            <ExportTemplateSelector
              selectedTemplate={selectedTemplate}
              setSelectedTemplate={setSelectedTemplate}
            />
            <AppendicesChecklist
              sections={sections}
              setSections={setSections}
            />
            <ExportActionButtons />
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default ExportReportPage;
