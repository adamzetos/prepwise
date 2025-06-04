/**
 * ADAMCHINS PrepWise
 * Classification: ADAMCHINS-CONFIDENTIAL ▲
 * Component: Footer
 * Purpose: Site footer with copyright and social links
 * Why Needed: Legal information and social media presence
 */

import { useLanguage } from '../../contexts/LanguageContext';

export function Footer() {
  const { t } = useLanguage();
  const footerStyle = {
    backgroundColor: '#ffffff',
    borderTop: '1px solid #e5e7eb',
    padding: '2rem 0',
    marginTop: 'auto', // Push footer to bottom
  };

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap' as const,
    gap: '1rem',
  };

  const logoImgStyle = {
    height: '24px',
    width: 'auto',
  };

  const copyrightStyle = {
    fontSize: '14px',
    color: '#6b7b8f',
  };

  const socialLinksStyle = {
    display: 'flex',
    gap: '1.5rem',
    alignItems: 'center',
  };

  const socialLinkStyle = {
    color: '#6b7b8f',
    transition: 'color 0.2s',
    cursor: 'pointer',
  };

  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img src="/logo.svg" alt="Prepwise" style={logoImgStyle} />
            <span style={{ fontSize: '8px', color: '#6b7b8f', marginTop: '2px' }}>Beta.02</span>
          </div>
          <span style={copyrightStyle}>
            {t('footer.copyright')}
          </span>
        </div>

        <div style={socialLinksStyle}>
          {/* LinkedIn */}
          <a 
            href="https://linkedin.com" 
            target="_blank" 
            rel="noopener noreferrer"
            style={socialLinkStyle}
            onMouseEnter={(e) => e.currentTarget.style.color = '#0077b5'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#6b7b8f'}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </a>

          {/* Twitter */}
          <a 
            href="https://twitter.com" 
            target="_blank" 
            rel="noopener noreferrer"
            style={socialLinkStyle}
            onMouseEnter={(e) => e.currentTarget.style.color = '#1da1f2'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#6b7b8f'}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
            </svg>
          </a>

          {/* Instagram */}
          <a 
            href="https://instagram.com" 
            target="_blank" 
            rel="noopener noreferrer"
            style={socialLinkStyle}
            onMouseEnter={(e) => e.currentTarget.style.color = '#e4405f'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#6b7b8f'}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" fill="white"/>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="white" strokeWidth="2"/>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}