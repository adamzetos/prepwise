/**
 * ADAMCHINS PrepWise
 * Classification: ADAMCHINS-CONFIDENTIAL ▲
 * Component: App
 * Purpose: Main application component with routing
 * Why Needed: Entry point for the React application
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<div>Login Page (Coming Soon)</div>} />
        <Route path="/register" element={<div>Register Page (Coming Soon)</div>} />
      </Routes>
    </Router>
  );
}

export default App;