/**
 * ADAMCHINS PrepWise
 * Classification: ADAMCHINS-CONFIDENTIAL ▲
 * Component: App
 * Purpose: Main application component with routing
 * Why Needed: Entry point for the React application
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/common/ProtectedRoute';
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
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  if (!googleClientId) {
    console.warn('Google Client ID not found. Please check GOOGLE_OAUTH_SETUP.md for setup instructions.');
  }

  return (
    <GoogleOAuthProvider clientId={googleClientId || ''}>
      <AuthProvider>
        <LanguageProvider>
          <Router>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              
              {/* Protected routes - require authentication */}
              <Route path="/dashboard" element={<ProtectedRoute><LoggedInLandingPage /></ProtectedRoute>} />
              <Route path="/upload" element={<ProtectedRoute><DocumentUploadPage /></ProtectedRoute>} />
              <Route path="/sessions" element={<ProtectedRoute><InterviewSessionsPage /></ProtectedRoute>} />
              <Route path="/cv-review" element={<ProtectedRoute><CVReviewPage /></ProtectedRoute>} />
              <Route path="/job-role-selection" element={<ProtectedRoute><JobRoleSelectionPage /></ProtectedRoute>} />
              <Route path="/interview" element={<ProtectedRoute><InterviewSimulationPage /></ProtectedRoute>} />
              <Route path="/interview-complete" element={<ProtectedRoute><InterviewCompletePage /></ProtectedRoute>} />
              <Route path="/score-breakdown" element={<ProtectedRoute><ScoreBreakdownPage /></ProtectedRoute>} />
              <Route path="/detailed-suggestions" element={<ProtectedRoute><DetailedSuggestionsPage /></ProtectedRoute>} />
              <Route path="/admin" element={<ProtectedRoute><AdminDashboardPage /></ProtectedRoute>} />
              <Route path="/admin/students" element={<ProtectedRoute><StudentManagementPage /></ProtectedRoute>} />
            </Routes>
          </Router>
        </LanguageProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;