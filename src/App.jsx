import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import IngestPage from './pages/IngestPage';
import SummariesPage from './pages/SummariesPage';
import ChatVideoPage from './pages/ChatVideoPage';
import SummaryNotesPage from './pages/SummaryNotesPage';
import FlashcardsQuizPage from './pages/FlashcardsQuizPage';
import HistorySavedPage from './pages/HistorySavedPage';
import SettingsPage from './pages/SettingsPage';
import ExportReportPage from './pages/ExportReportPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 1. Login & Registration */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* 2. My Media (Workspace Dashboard) */}
        <Route path="/" element={<DashboardPage />} />
        <Route path="/media" element={<DashboardPage />} />

        {/* 3. Summaries Page */}
        <Route path="/summaries" element={<SummariesPage />} />

        {/* 4. Chat & Video Page */}
        <Route path="/chat" element={<ChatVideoPage />} />

        {/* 5. Notes & Chapters Page */}
        <Route path="/notes" element={<SummaryNotesPage />} />
        <Route path="/summary" element={<SummaryNotesPage />} />

        {/* 6. Flashcards & Quiz Page */}
        <Route path="/quiz" element={<FlashcardsQuizPage />} />
        <Route path="/flashcards" element={<FlashcardsQuizPage />} />

        {/* 7. History and Saved Page */}
        <Route path="/history" element={<HistorySavedPage />} />
        <Route path="/saved" element={<HistorySavedPage />} />

        {/* 8. Settings Page */}
        <Route path="/settings" element={<SettingsPage />} />

        {/* 9. Export PDF Page */}
        <Route path="/export" element={<ExportReportPage />} />

        {/* Ingest / Upload */}
        <Route path="/ingest" element={<IngestPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
