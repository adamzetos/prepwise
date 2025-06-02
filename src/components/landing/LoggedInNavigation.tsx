/**
 * ADAMCHINS PrepWise
 * Classification: ADAMCHINS-CONFIDENTIAL ▲
 * Component: LoggedInNavigation
 * Purpose: Navigation bar for logged-in users
 * Why Needed: Display user-specific navigation with avatar
 */

import { Link } from 'react-router-dom';

export function LoggedInNavigation() {
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
    gap: '2.5rem',
    alignItems: 'center',
  };

  const linkStyle = {
    color: '#6b7b8f',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '400',
    transition: 'color 0.2s',
  };

  const avatarStyle = {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    cursor: 'pointer',
    transition: 'opacity 0.2s',
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
            to="/" 
            style={linkStyle}
            onMouseEnter={(e) => e.currentTarget.style.color = '#1f2d3d'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#6b7b8f'}
          >
            Home
          </Link>
          <Link 
            to="/features" 
            style={linkStyle}
            onMouseEnter={(e) => e.currentTarget.style.color = '#1f2d3d'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#6b7b8f'}
          >
            Features
          </Link>
          <Link 
            to="/pricing" 
            style={linkStyle}
            onMouseEnter={(e) => e.currentTarget.style.color = '#1f2d3d'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#6b7b8f'}
          >
            Pricing
          </Link>
          <Link 
            to="/admin" 
            style={linkStyle}
            onMouseEnter={(e) => e.currentTarget.style.color = '#1f2d3d'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#6b7b8f'}
          >
            For Admins
          </Link>
          <Link 
            to="/help" 
            style={linkStyle}
            onMouseEnter={(e) => e.currentTarget.style.color = '#1f2d3d'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#6b7b8f'}
          >
            Help
          </Link>
          
          {/* User Avatar */}
          <img 
            src="/icons/avatar.svg" 
            alt="User profile" 
            style={avatarStyle}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          />
        </div>
      </div>
    </nav>
  );
}