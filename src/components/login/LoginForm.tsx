/**
 * ADAMCHINS PrepWise
 * Classification: ADAMCHINS-CONFIDENTIAL ▲
 * Component: Login Form
 * Purpose: Authentication form with email/password and social login
 * Why Needed: User authentication functionality
 */

import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { GoogleSignInCustomButton } from './GoogleSignInCustomButton';

export function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();
  const { login, isAuthenticated } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  // Email validation regex
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Check if email is valid format and password exists
    if (isValidEmail(email) && password) {
      // Create a mock user for email/password login
      const mockUser = {
        email: email,
        name: email.split('@')[0], // Use email prefix as name
        picture: '/icons/avatar.svg', // Default avatar
        id: Date.now().toString(), // Mock user ID
      };
      const success = login(mockUser);
      if (success) {
        // Use setTimeout to ensure state update completes before navigation
        setTimeout(() => {
          navigate('/dashboard');
        }, 100);
      }
    }
  };

  const containerStyle = {
    width: '100%',
    maxWidth: '450px',
    padding: '2rem',
  };

  const logoContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '3rem',
  };

  const logoImgStyle = {
    height: '40px',
    width: 'auto',
  };

  const tabContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '3rem',
    gap: '2rem',
  };

  const getTabStyle = (isActive: boolean) => ({
    fontSize: '18px',
    fontWeight: '600',
    color: isActive ? '#1a4d8c' : '#6b7b8f',
    textDecoration: 'none',
    paddingBottom: '0.5rem',
    borderBottom: isActive ? '2px solid #1a4d8c' : '2px solid transparent',
    transition: 'all 0.2s ease',
    cursor: 'pointer',
  });

  const formStyle = {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1.5rem',
  };

  const inputGroupStyle = {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.5rem',
  };

  const labelStyle = {
    fontSize: '14px',
    fontWeight: '500',
    color: '#1f2d3d',
  };

  const inputStyle = {
    padding: '12px 16px',
    fontSize: '16px',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    backgroundColor: '#ffffff',
    transition: 'border-color 0.2s ease',
    outline: 'none',
  };

  const passwordContainerStyle = {
    position: 'relative' as const,
  };

  const eyeButtonStyle = {
    position: 'absolute' as const,
    right: '16px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
    color: '#6b7b8f',
  };

  const checkboxContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  };

  const checkboxLabelStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '14px',
    color: '#6b7b8f',
    cursor: 'pointer',
  };

  const checkboxStyle = {
    width: '16px',
    height: '16px',
    cursor: 'pointer',
  };

  const forgotLinkStyle = {
    fontSize: '14px',
    color: '#1a4d8c',
    textDecoration: 'none',
    fontWeight: '500',
  };

  const loginButtonStyle = {
    padding: '14px',
    backgroundColor: '#9bb3d0',
    color: '#ffffff',
    fontSize: '16px',
    fontWeight: '600',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    marginTop: '0.5rem',
  };

  const dividerStyle = {
    display: 'flex',
    alignItems: 'center',
    margin: '2rem 0',
    gap: '1rem',
  };

  const dividerLineStyle = {
    flex: 1,
    height: '1px',
    backgroundColor: '#e5e7eb',
  };

  const dividerTextStyle = {
    fontSize: '14px',
    color: '#6b7b8f',
  };

  const socialButtonStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    padding: '12px',
    backgroundColor: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '500',
    color: '#1f2d3d',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    textDecoration: 'none',
  };

  const socialIconStyle = {
    width: '20px',
    height: '20px',
  };

  const footerStyle = {
    textAlign: 'center' as const,
    marginTop: '2rem',
    fontSize: '14px',
    color: '#6b7b8f',
  };

  const registerLinkStyle = {
    color: '#1a4d8c',
    textDecoration: 'none',
    fontWeight: '500',
  };

  return (
    <div style={containerStyle}>
      {/* Logo */}
      <div style={logoContainerStyle}>
        <img src="/logo.svg" alt="PrepWise" style={logoImgStyle} />
      </div>

      {/* Tabs */}
      <div style={tabContainerStyle}>
        <Link 
          to="/login" 
          style={getTabStyle(activeTab === 'login')}
          onClick={(e) => {
            e.preventDefault();
            setActiveTab('login');
          }}
        >
          {t('navigation.login')}
        </Link>
        <Link 
          to="/register" 
          style={getTabStyle(activeTab === 'register')}
        >
          {t('auth.register.title')}
        </Link>
      </div>

      {/* Form */}
      <form style={formStyle} onSubmit={handleSubmit}>
        <div style={inputGroupStyle}>
          <label style={labelStyle}>{t('auth.login.email')}</label>
          <input
            type="email"
            placeholder={t('auth.login.emailPlaceholder')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
            onFocus={(e) => e.target.style.borderColor = '#1a4d8c'}
            onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
          />
        </div>

        <div style={inputGroupStyle}>
          <label style={labelStyle}>{t('auth.login.password')}</label>
          <div style={passwordContainerStyle}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder={t('auth.login.passwordPlaceholder')}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{...inputStyle, paddingRight: '48px'}}
              onFocus={(e) => e.target.style.borderColor = '#1a4d8c'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            />
            <button
              type="button"
              style={eyeButtonStyle}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? '👁️' : '👁️‍🗨️'}
            </button>
          </div>
        </div>

        <div style={checkboxContainerStyle}>
          <label style={checkboxLabelStyle}>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              style={checkboxStyle}
            />
            {t('auth.login.rememberMe')}
          </label>
          <Link 
            to="/forgot-password" 
            style={forgotLinkStyle}
            onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
            onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
          >
            {t('auth.login.forgotPassword')}
          </Link>
        </div>

        <button
          type="submit"
          style={{
            ...loginButtonStyle,
            backgroundColor: isValidEmail(email) && password ? '#9bb3d0' : '#e5e7eb',
            cursor: isValidEmail(email) && password ? 'pointer' : 'not-allowed',
          }}
          disabled={!isValidEmail(email) || !password}
          onMouseEnter={(e) => {
            if (isValidEmail(email) && password) {
              e.currentTarget.style.backgroundColor = '#7a9bc0';
            }
          }}
          onMouseLeave={(e) => {
            if (isValidEmail(email) && password) {
              e.currentTarget.style.backgroundColor = '#9bb3d0';
            }
          }}
        >
          {t('navigation.login')}
        </button>
      </form>

      {/* Divider */}
      <div style={dividerStyle}>
        <div style={dividerLineStyle}></div>
        <span style={dividerTextStyle}>{t('auth.login.or')}</span>
        <div style={dividerLineStyle}></div>
      </div>

      {/* Social Login Buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {/* Google Sign In */}
        <GoogleSignInCustomButton />

        {/* LinkedIn Button (placeholder for future implementation) */}
        <button
          style={socialButtonStyle}
          onClick={() => {/* Future LinkedIn implementation */}}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#f9fafb';
            e.currentTarget.style.borderColor = '#d1d5db';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#ffffff';
            e.currentTarget.style.borderColor = '#e5e7eb';
          }}
          disabled
          title="LinkedIn sign-in coming soon"
        >
          <img src="/icons/linkedin_icon.svg" alt="LinkedIn" style={socialIconStyle} />
          {t('auth.login.linkedin')}
        </button>
      </div>

      {/* Footer */}
      <div style={footerStyle}>
        {t('auth.login.noAccount')}{' '}
        <Link 
          to="/register" 
          style={registerLinkStyle}
          onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
          onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
        >
          {t('auth.login.signUp')}
        </Link>
      </div>
    </div>
  );
}