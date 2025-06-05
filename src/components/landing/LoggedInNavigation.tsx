/**
 * ADAMCHINS PrepWise
 * Classification: ADAMCHINS-CONFIDENTIAL ▲
 * Component: LoggedInNavigation
 * Purpose: Navigation bar for logged-in users
 * Why Needed: Display user-specific navigation with avatar
 */

import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { LanguageSelector } from '../common/LanguageSelector';

export function LoggedInNavigation() {
  const { t } = useLanguage();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    // Navigate first to ensure we go to home page before logout clears auth
    navigate('/', { replace: true });
    // Then logout after navigation is initiated
    setTimeout(() => {
      logout();
    }, 0);
  };

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
    objectFit: 'cover' as const,
  };

  const dropdownContainerStyle = {
    position: 'relative' as const,
  };

  const dropdownStyle = {
    position: 'absolute' as const,
    top: '100%',
    right: '0',
    marginTop: '8px',
    backgroundColor: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    minWidth: '200px',
    zIndex: 10,
    overflow: 'hidden',
  };

  const dropdownHeaderStyle = {
    padding: '16px',
    borderBottom: '1px solid #e5e7eb',
  };

  const dropdownNameStyle = {
    fontWeight: '600',
    fontSize: '14px',
    color: '#1f2d3d',
    marginBottom: '4px',
  };

  const dropdownEmailStyle = {
    fontSize: '12px',
    color: '#6b7280',
  };

  const dropdownButtonStyle = {
    width: '100%',
    padding: '12px 16px',
    backgroundColor: 'transparent',
    border: 'none',
    textAlign: 'left' as const,
    fontSize: '14px',
    color: '#374151',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
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
            {t('navigation.home')}
          </Link>
          <Link 
            to="/features" 
            style={linkStyle}
            onMouseEnter={(e) => e.currentTarget.style.color = '#1f2d3d'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#6b7b8f'}
          >
            {t('navigation.features')}
          </Link>
          <Link 
            to="/pricing" 
            style={linkStyle}
            onMouseEnter={(e) => e.currentTarget.style.color = '#1f2d3d'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#6b7b8f'}
          >
            {t('navigation.pricing')}
          </Link>
          <Link 
            to="/admin" 
            style={linkStyle}
            onMouseEnter={(e) => e.currentTarget.style.color = '#1f2d3d'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#6b7b8f'}
          >
            {t('navigation.forAdmins')}
          </Link>
          <Link 
            to="/help" 
            style={linkStyle}
            onMouseEnter={(e) => e.currentTarget.style.color = '#1f2d3d'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#6b7b8f'}
          >
            {t('navigation.help')}
          </Link>
          
          <LanguageSelector />
          
          {/* User Avatar with Dropdown */}
          <div style={dropdownContainerStyle} ref={dropdownRef}>
            <img 
              src={user?.picture || "/icons/avatar.svg"} 
              alt="User profile" 
              style={avatarStyle}
              onClick={() => setShowDropdown(!showDropdown)}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
              onError={(e) => {
                // Fallback to default avatar if Google image fails to load
                e.currentTarget.src = '/icons/avatar.svg';
              }}
            />
            
            {showDropdown && (
              <div style={dropdownStyle}>
                <div style={dropdownHeaderStyle}>
                  <div style={dropdownNameStyle}>{user?.name || 'User'}</div>
                  <div style={dropdownEmailStyle}>{user?.email || ''}</div>
                </div>
                <button
                  style={dropdownButtonStyle}
                  onClick={handleLogout}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}