/**
 * ADAMCHINS PrepWise
 * Classification: ADAMCHINS-CONFIDENTIAL ▲
 * Component: Navigation
 * Purpose: Main navigation bar for landing page
 * Why Needed: Primary navigation and branding
 */

import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { LanguageSelector } from '../common/LanguageSelector';

export function Navigation() {
  const { t } = useLanguage();
  const navStyle = {
    position: 'relative' as const,
    backgroundColor: '#ffffff',
    padding: '1.25rem 0',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  };

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const logoStyle = {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
  };

  const logoImgStyle = {
    height: '32px',
    width: 'auto',
  };

  const menuStyle = {
    display: 'flex',
    gap: '2rem',
    alignItems: 'center',
  };

  const linkStyle = {
    color: '#6b7b8f',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '400',
    transition: 'color 0.2s',
  };

  const loginLinkStyle = {
    ...linkStyle,
    fontWeight: '500',
  };

  return (
    <nav style={navStyle}>
      <div style={containerStyle}>
        {/* Logo */}
        <Link to="/" style={logoStyle}>
          <img src="/logo.svg" alt="Prepwise" style={logoImgStyle} />
        </Link>

        {/* Menu Items */}
        <div style={menuStyle}>
          <Link 
            to="/how-it-works" 
            style={linkStyle}
            onMouseEnter={(e) => e.currentTarget.style.color = '#1f2d3d'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#6b7b8f'}
          >
            {t('navigation.howItWorks')}
          </Link>
          <Link 
            to="/benefits" 
            style={linkStyle}
            onMouseEnter={(e) => e.currentTarget.style.color = '#1f2d3d'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#6b7b8f'}
          >
            {t('navigation.benefits')}
          </Link>
          <Link 
            to="/pricing" 
            style={linkStyle}
            onMouseEnter={(e) => e.currentTarget.style.color = '#1f2d3d'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#6b7b8f'}
          >
            {t('navigation.pricing')}
          </Link>
          <LanguageSelector />
          <Link 
            to="/login" 
            style={loginLinkStyle}
            onMouseEnter={(e) => e.currentTarget.style.color = '#1f2d3d'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#6b7b8f'}
          >
            {t('navigation.login')}
          </Link>
        </div>
      </div>
    </nav>
  );
}