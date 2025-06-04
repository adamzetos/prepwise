/**
 * ADAMCHINS PrepWise
 * Classification: ADAMCHINS-CONFIDENTIAL ▲
 * Component: Hero Section
 * Purpose: Landing page hero with CTA
 * Why Needed: Primary value proposition and conversion
 */

import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';

export function HeroSection() {
  const { t } = useLanguage();
  const sectionStyle = {
    position: 'relative' as const,
    height: '80vh', // 80% of viewport height
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'visible',
  };

  // Background image with overlay
  const backgroundStyle = {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: 'url("/hero-bg.jpg")', // Will use local image from Figma
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };

  const overlayStyle = {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(30, 58, 138, 0.7)', // Dark blue overlay matching design
  };

  const contentStyle = {
    position: 'relative' as const,
    zIndex: 10,
    textAlign: 'center' as const,
    maxWidth: '800px',
    margin: '0 auto',
    padding: '0 2rem',
  };

  const headingStyle = {
    fontSize: '48px',
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: '1.5rem',
    lineHeight: '1.2',
    letterSpacing: '-0.5px',
  };

  const paragraphStyle = {
    fontSize: '18px',
    color: '#ffffff',
    marginBottom: '2.5rem',
    lineHeight: '1.6',
    maxWidth: '600px',
    margin: '0 auto 2.5rem',
    opacity: 0.95,
  };

  const ctaButtonStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
    backgroundColor: '#17B0A7', // brand2-1 color
    color: 'white',
    padding: '12px 24px 12px 20px',
    borderRadius: '40px', // 40px border radius
    textDecoration: 'none',
    fontSize: '15px',
    fontWeight: '500',
    transition: 'all 0.2s ease',
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  };

  const playIconContainerStyle = {
    width: '24px',
    height: '24px',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const playIconStyle = {
    width: '0',
    height: '0',
    borderLeft: '8px solid white',
    borderTop: '5px solid transparent',
    borderBottom: '5px solid transparent',
    marginLeft: '2px',
  };

  return (
    <section style={sectionStyle}>
      <div style={backgroundStyle}></div>
      <div style={overlayStyle}></div>
      
      <div style={contentStyle}>
        <h1 style={headingStyle}>
          {t('landing.hero.title')}
        </h1>
        <p style={paragraphStyle}>
          {t('landing.hero.subtitle')}
        </p>
        <Link
          to="/upload"
          style={ctaButtonStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#15a097';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#17B0A7';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <div style={playIconContainerStyle}>
            <div style={playIconStyle}></div>
          </div>
          {t('landing.hero.cta')}
        </Link>
      </div>
    </section>
  );
}