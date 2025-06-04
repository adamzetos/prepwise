/**
 * ADAMCHINS PrepWise
 * Classification: ADAMCHINS-CONFIDENTIAL ▲
 * Component: AdminNavigation
 * Purpose: Navigation header for admin dashboard
 * Why Needed: Provides admin-specific navigation menu
 */

import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { LanguageSelector } from '../common/LanguageSelector';

export function AdminNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();

  const navStyle = {
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #e5e7eb',
    position: 'sticky' as const,
    top: 0,
    zIndex: 100,
  };

  const containerStyle = {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '1rem 2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  };

  const leftSectionStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '3rem',
  };

  const logoStyle = {
    height: '32px',
    cursor: 'pointer',
  };

  const menuStyle = {
    display: 'flex',
    gap: '2rem',
    listStyle: 'none',
    margin: 0,
    padding: 0,
  };

  const menuItemStyle = (isActive: boolean) => ({
    color: isActive ? '#1a4d8c' : '#6b7b8f',
    fontSize: '16px',
    fontWeight: isActive ? '600' : '400',
    cursor: 'pointer',
    transition: 'color 0.2s ease',
    textDecoration: 'none',
    borderBottom: isActive ? '2px solid #1a4d8c' : 'none',
    paddingBottom: '2px',
  });

  const avatarStyle = {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    cursor: 'pointer',
    objectFit: 'cover' as const,
  };

  const menuItems = [
    { name: t('navigation.dashboard'), path: '/admin' },
    { name: t('navigation.students'), path: '/admin/students' },
    { name: t('navigation.reports'), path: '/admin/reports' },
    { name: t('navigation.settings'), path: '/admin/settings' },
  ];

  return (
    <nav style={navStyle}>
      <div style={containerStyle}>
        <div style={leftSectionStyle}>
          <img
            src="/logo.svg"
            alt="PrepWise"
            style={logoStyle}
            onClick={() => navigate('/')}
          />
          
          <ul style={menuStyle}>
            {menuItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.path}
                  style={menuItemStyle(location.pathname === item.path)}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(item.path);
                  }}
                  onMouseEnter={(e) => {
                    if (location.pathname !== item.path) {
                      e.currentTarget.style.color = '#1a4d8c';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (location.pathname !== item.path) {
                      e.currentTarget.style.color = '#6b7b8f';
                    }
                  }}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <LanguageSelector />
          <img 
            src="/icons/avatar.svg" 
            alt="User profile" 
            style={avatarStyle}
            onClick={() => navigate('/profile')}
          />
        </div>
      </div>
    </nav>
  );
}