/**
 * ADAMCHINS PrepWise
 * Classification: ADAMCHINS-CONFIDENTIAL ▲
 * Component: InterviewSessionsPage
 * Purpose: Display interview session history and start new session
 * Why Needed: Shows user's interview history and allows starting new interview
 */

import { useNavigate } from 'react-router-dom';
import { LoggedInNavigation } from '../components/landing/LoggedInNavigation';
import { Footer } from '../components/landing/Footer';

interface Session {
  date: string;
  role: string;
  score: number;
  id: string;
}

export function InterviewSessionsPage() {
  const navigate = useNavigate();

  // Mock data for recent sessions
  const recentSessions: Session[] = [
    { date: '2024-05-21', role: 'Marketing Analyst', score: 83, id: '1' },
    { date: '2024-05-21', role: 'Software Intern', score: 65, id: '2' },
    { date: '2024-05-21', role: 'Finance Trainee', score: 83, id: '3' },
    { date: '2024-05-21', role: 'Sales Assistant', score: 65, id: '4' },
    { date: '2024-05-21', role: 'Data Researcher', score: 83, id: '5' },
    { date: '2024-05-21', role: 'Comms Intern', score: 65, id: '6' },
    { date: '2024-05-21', role: 'Project Support', score: 83, id: '7' },
    { date: '2024-05-21', role: 'Comms Intern', score: 65, id: '8' },
  ];

  const pageStyle = {
    minHeight: '100vh',
    backgroundColor: '#ffffff',
    display: 'flex',
    flexDirection: 'column' as const,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    WebkitFontSmoothing: 'antialiased' as const,
    MozOsxFontSmoothing: 'grayscale' as const,
  };

  const contentStyle = {
    flex: 1,
    padding: '3rem 2rem',
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%',
  };

  const welcomeStyle = {
    fontSize: '32px',
    fontWeight: '600',
    color: '#1a4d8c',
    marginBottom: '3rem',
  };

  const readyBoxStyle = {
    backgroundColor: '#f9fafb',
    borderRadius: '12px',
    padding: '2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '3rem',
  };

  const readyContentStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
  };

  const iconContainerStyle = {
    width: '48px',
    height: '48px',
    backgroundColor: '#e0f2fe',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const readyTextStyle = {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.25rem',
  };

  const readyTitleStyle = {
    fontSize: '20px',
    fontWeight: '600',
    color: '#1a4d8c',
  };

  const readySubtitleStyle = {
    fontSize: '14px',
    color: '#6b7b8f',
  };

  const startButtonStyle = {
    backgroundColor: '#17B0A7',
    color: '#ffffff',
    padding: '12px 32px',
    borderRadius: '40px',
    border: 'none',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  };

  const sectionTitleStyle = {
    fontSize: '24px',
    fontWeight: '600',
    color: '#1a4d8c',
    marginBottom: '2rem',
  };

  const tableStyle = {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  };

  const tableHeaderStyle = {
    backgroundColor: '#f9fafb',
    borderBottom: '1px solid #e5e7eb',
  };

  const thStyle = {
    padding: '1rem 1.5rem',
    textAlign: 'left' as const,
    fontSize: '14px',
    fontWeight: '600',
    color: '#6b7b8f',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
  };

  const tdStyle = {
    padding: '1rem 1.5rem',
    borderBottom: '1px solid #f3f4f6',
    fontSize: '14px',
    color: '#1f2d3d',
  };

  const getScoreStyle = (score: number) => ({
    ...tdStyle,
    color: score >= 80 ? '#10b981' : '#f59e0b',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  });

  const viewLinkStyle = {
    color: '#17B0A7',
    textDecoration: 'none',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'color 0.2s ease',
  };

  const handleStartInterview = () => {
    navigate('/interview');
  };

  const handleViewSession = (sessionId: string) => {
    // Navigate to session details
    console.log('Viewing session:', sessionId);
    // navigate(`/session/${sessionId}`);
  };

  return (
    <div style={pageStyle}>
      <LoggedInNavigation />
      
      <div style={contentStyle}>
        <h1 style={welcomeStyle}>
          Welcome back, <span style={{ color: '#17B0A7' }}>Alex!</span>
        </h1>

        <div style={readyBoxStyle}>
          <div style={readyContentStyle}>
            <div style={iconContainerStyle}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path 
                  d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" 
                  stroke="#17B0A7" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div style={readyTextStyle}>
              <h2 style={readyTitleStyle}>Ready to practise?</h2>
              <p style={readySubtitleStyle}>Start a new AI-powered interview simulation now.</p>
            </div>
          </div>
          
          <button
            style={startButtonStyle}
            onClick={handleStartInterview}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#15a097';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#17B0A7';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
            Start Interview
          </button>
        </div>

        <section>
          <h2 style={sectionTitleStyle}>Recent Sessions</h2>
          
          <table style={tableStyle}>
            <thead style={tableHeaderStyle}>
              <tr>
                <th style={thStyle}>Date</th>
                <th style={thStyle}>Role</th>
                <th style={thStyle}>Score</th>
                <th style={thStyle}>Action</th>
              </tr>
            </thead>
            <tbody>
              {recentSessions.map((session) => (
                <tr key={session.id}>
                  <td style={tdStyle}>{session.date}</td>
                  <td style={tdStyle}>{session.role}</td>
                  <td style={getScoreStyle(session.score)}>
                    <span style={{ 
                      width: '8px', 
                      height: '8px', 
                      borderRadius: '50%',
                      backgroundColor: session.score >= 80 ? '#10b981' : '#f59e0b',
                      display: 'inline-block'
                    }}></span>
                    {session.score}
                  </td>
                  <td style={tdStyle}>
                    <a
                      style={viewLinkStyle}
                      onClick={() => handleViewSession(session.id)}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#15a097'}
                      onMouseLeave={(e) => e.currentTarget.style.color = '#17B0A7'}
                    >
                      View
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>

      <Footer />
    </div>
  );
}