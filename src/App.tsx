/**
 * ADAMCHINS PrepWise
 * Classification: ADAMCHINS-CONFIDENTIAL ▲
 * Component: App
 * Purpose: Main application component with routing
 * Why Needed: Entry point for the React application
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { LoggedInLandingPage } from './pages/LoggedInLandingPage';
import { DocumentUploadPage } from './pages/DocumentUploadPage';
import { InterviewSessionsPage } from './pages/InterviewSessionsPage';
import { CVReviewPage } from './pages/CVReviewPage';
import { JobRoleSelectionPage } from './pages/JobRoleSelectionPage';
import { InterviewSimulationPage } from './pages/InterviewSimulationPage';
import { InterviewCompletePage } from './pages/InterviewCompletePage';
import { ScoreBreakdownPage } from './pages/ScoreBreakdownPage';
import { DetailedSuggestionsPage } from './pages/DetailedSuggestionsPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { StudentManagementPage } from './pages/StudentManagementPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<LoggedInLandingPage />} />
        <Route path="/upload" element={<DocumentUploadPage />} />
        <Route path="/sessions" element={<InterviewSessionsPage />} />
        <Route path="/cv-review" element={<CVReviewPage />} />
        <Route path="/job-role-selection" element={<JobRoleSelectionPage />} />
        <Route path="/interview" element={<InterviewSimulationPage />} />
        <Route path="/interview-complete" element={<InterviewCompletePage />} />
        <Route path="/score-breakdown" element={<ScoreBreakdownPage />} />
        <Route path="/detailed-suggestions" element={<DetailedSuggestionsPage />} />
        <Route path="/admin" element={<AdminDashboardPage />} />
        <Route path="/admin/students" element={<StudentManagementPage />} />
      </Routes>
    </Router>
  );
}

export default App;