import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
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

// ✅ Protected Route Wrapper
const ProtectedRoute = () => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

// ✅ Public Route (agar already login hai, toh direct dashboard bhejo)
const PublicRoute = () => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
};

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 🌐 PUBLIC ROUTES (Sirf login page ke liye) */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        {/* 🔒 PROTECTED ROUTES (Login ke baad hi accessible) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/media" element={<DashboardPage />} />
          <Route path="/summaries" element={<SummariesPage />} />
          <Route path="/chat" element={<ChatVideoPage />} />
          <Route path="/notes" element={<SummaryNotesPage />} />
          <Route path="/summary" element={<SummaryNotesPage />} />
          <Route path="/quiz" element={<FlashcardsQuizPage />} />
          <Route path="/flashcards" element={<FlashcardsQuizPage />} />
          <Route path="/history" element={<HistorySavedPage />} />
          <Route path="/saved" element={<HistorySavedPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/export" element={<ExportReportPage />} />
          <Route path="/ingest" element={<IngestPage />} />
        </Route>

        {/* 🚫 Fallback (galat URL par redirect) */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;