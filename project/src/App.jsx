import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import IngestPage from './pages/IngestPage';
import LiveProcessingPage from './pages/LiveProcessingPage';
import ChatVideoPage from './pages/ChatVideoPage';
import TranscriptPage from './pages/TranscriptPage';
import SummaryNotesPage from './pages/SummaryNotesPage';
import ExportReportPage from './pages/ExportReportPage';
import FlashcardsQuizPage from './pages/FlashcardsQuizPage';
import TelemetryPage from './pages/TelemetryPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/ingest" element={<IngestPage />} />
        <Route path="/processing" element={<LiveProcessingPage />} />
        <Route path="/chat" element={<ChatVideoPage />} />
        <Route path="/transcript" element={<TranscriptPage />} />
        <Route path="/summary" element={<SummaryNotesPage />} />
        <Route path="/export" element={<ExportReportPage />} />
        <Route path="/quiz" element={<FlashcardsQuizPage />} />
        <Route path="/telemetry" element={<TelemetryPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
