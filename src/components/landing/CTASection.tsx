/**
 * ADAMCHINS PrepWise
 * Classification: ADAMCHINS-CONFIDENTIAL ▲
 * Component: CTA Section
 * Purpose: Call-to-action section to drive conversions
 * Why Needed: Encourage users to start using the platform
 */

import { Link } from 'react-router-dom';

export function CTASection() {
  const sectionStyle = {
    padding: '100px 0',
    backgroundColor: '#1a4d8c',
    position: 'relative' as const,
    overflow: 'hidden',
  };

  const backgroundPatternStyle = {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.1,
    background: `
      repeating-linear-gradient(
        45deg,
        transparent,
        transparent 10px,
        rgba(255, 255, 255, 0.1) 10px,
        rgba(255, 255, 255, 0.1) 20px
      )
    `,
  };

  const containerStyle = {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '0 2rem',
    textAlign: 'center' as const,
    position: 'relative' as const,
    zIndex: 1,
  };

  const headingStyle = {
    fontSize: '48px',
    fontWeight: '800',
    color: 'white',
    marginBottom: '1.5rem',
    letterSpacing: '-0.5px',
  };

  const descriptionStyle = {
    fontSize: '20px',
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: '3rem',
    maxWidth: '600px',
    margin: '0 auto 3rem',
    lineHeight: '1.6',
  };

  const buttonsContainerStyle = {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    flexWrap: 'wrap' as const,
  };

  const primaryButtonStyle = {
    display: 'inline-block',
    backgroundColor: '#17b0a7',
    color: 'white',
    padding: '18px 40px',
    borderRadius: '8px',
    textDecoration: 'none',
    fontSize: '18px',
    fontWeight: '600',
    boxShadow: '0 4px 20px rgba(23, 176, 167, 0.4)',
    transition: 'all 0.3s ease',
  };

  const secondaryButtonStyle = {
    display: 'inline-block',
    backgroundColor: 'transparent',
    color: 'white',
    padding: '18px 40px',
    borderRadius: '8px',
    textDecoration: 'none',
    fontSize: '18px',
    fontWeight: '600',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    transition: 'all 0.3s ease',
  };

  return (
    <section style={sectionStyle}>
      <div style={backgroundPatternStyle}></div>
      <div style={containerStyle}>
        <h2 style={headingStyle}>
          Ready to Ace Your Next Interview?
        </h2>
        <p style={descriptionStyle}>
          Join thousands of professionals who have successfully landed their dream jobs with PrepWise's AI-powered interview preparation.
        </p>
        <div style={buttonsContainerStyle}>
          <Link
            to="/register"
            style={primaryButtonStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#15a097';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 30px rgba(23, 176, 167, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#17b0a7';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(23, 176, 167, 0.4)';
            }}
          >
            Start Free Trial
          </Link>
          <Link
            to="/demo"
            style={secondaryButtonStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.6)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
            }}
          >
            Watch Demo
          </Link>
        </div>
      </div>
    </section>
  );
}