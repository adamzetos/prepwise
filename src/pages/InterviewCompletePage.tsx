/**
 * ADAMCHINS PrepWise
 * Classification: ADAMCHINS-CONFIDENTIAL ▲
 * Component: InterviewCompletePage
 * Purpose: Interview completion confirmation screen
 * Why Needed: Provides feedback confirmation after interview simulation
 */

import { useNavigate } from 'react-router-dom';
import { LoggedInNavigation } from '../components/landing/LoggedInNavigation';
import { Footer } from '../components/landing/Footer';

export function InterviewCompletePage() {
  const navigate = useNavigate();

  const pageStyle = {
    minHeight: '100vh',
    backgroundColor: '#f9fafb',
    display: 'flex',
    flexDirection: 'column' as const,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    WebkitFontSmoothing: 'antialiased' as const,
    MozOsxFontSmoothing: 'grayscale' as const,
  };

  const contentStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4rem 2rem',
  };

  const iconContainerStyle = {
    width: '80px',
    height: '80px',
    backgroundColor: '#10b981',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '2rem',
  };

  const titleStyle = {
    fontSize: '32px',
    fontWeight: '600',
    color: '#1a4d8c',
    marginBottom: '1rem',
    textAlign: 'center' as const,
  };

  const messageStyle = {
    fontSize: '18px',
    color: '#6b7b8f',
    marginBottom: '3rem',
    textAlign: 'center' as const,
    maxWidth: '500px',
    lineHeight: '1.5',
  };

  const buttonStyle = {
    backgroundColor: '#1a4d8c',
    color: '#ffffff',
    padding: '14px 36px',
    borderRadius: '40px',
    border: 'none',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  };

  const handleGetFeedback = () => {
    navigate('/score-breakdown');
  };

  return (
    <div style={pageStyle}>
      <LoggedInNavigation />
      
      <div style={contentStyle}>
        <div style={iconContainerStyle}>
          <img 
            src="/icons/Interview_finish.svg" 
            alt="Interview Complete" 
            style={{ width: '48px', height: '48px', filter: 'brightness(0) invert(1)' }}
          />
        </div>

        <h1 style={titleStyle}>Interview Completed</h1>
        
        <p style={messageStyle}>
          Congratulations on finishing your mock interview! You're<br />
          one step closer to your dream job. 🎉
        </p>

        <button
          style={buttonStyle}
          onClick={handleGetFeedback}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#163e70'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1a4d8c'}
        >
          Get Your Feedback
        </button>
      </div>

      <Footer />
    </div>
  );
}