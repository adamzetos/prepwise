/**
 * ADAMCHINS PrepWise
 * Classification: ADAMCHINS-CONFIDENTIAL ▲
 * Component: Register Form
 * Purpose: Registration form for new users
 * Why Needed: User account creation functionality
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';

export function RegisterForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('register');
  const [agreeToTerms, setAgreeToTerms] = useState(false);

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
    gap: '1.25rem', // Reduced from 1.5rem to match LoginForm spacing
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

  const registerButtonStyle = {
    padding: '14px',
    backgroundColor: '#9bb3d0',
    color: '#ffffff',
    fontSize: '16px',
    fontWeight: '600',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    marginTop: '0.5rem', // Reduced from 1.5rem
  };

  const dividerStyle = {
    display: 'flex',
    alignItems: 'center',
    margin: '1.5rem 0 1rem', // Reduced top/bottom margins
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

  const termsContainerStyle = {
    marginTop: '1rem', // Reduced from 1.5rem
    textAlign: 'center' as const,
  };

  const termsLabelStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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

  const termsLinkStyle = {
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
        >
          Login
        </Link>
        <Link 
          to="/register" 
          style={getTabStyle(activeTab === 'register')}
          onClick={(e) => {
            e.preventDefault();
            setActiveTab('register');
          }}
        >
          Register
        </Link>
      </div>

      {/* Form */}
      <form style={formStyle} onSubmit={(e) => e.preventDefault()}>
        <div style={inputGroupStyle}>
          <label style={labelStyle}>User name</label>
          <input
            type="text"
            placeholder="Please enter"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={inputStyle}
            onFocus={(e) => e.target.style.borderColor = '#1a4d8c'}
            onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
          />
        </div>

        <div style={inputGroupStyle}>
          <label style={labelStyle}>Email</label>
          <input
            type="email"
            placeholder="Please enter"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
            onFocus={(e) => e.target.style.borderColor = '#1a4d8c'}
            onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
          />
        </div>

        <div style={inputGroupStyle}>
          <label style={labelStyle}>Password</label>
          <div style={passwordContainerStyle}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Please enter"
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

        <div style={inputGroupStyle}>
          <label style={labelStyle}>Password again</label>
          <div style={passwordContainerStyle}>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Please enter"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{...inputStyle, paddingRight: '48px'}}
              onFocus={(e) => e.target.style.borderColor = '#1a4d8c'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            />
            <button
              type="button"
              style={eyeButtonStyle}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
            </button>
          </div>
        </div>

        <button
          type="submit"
          style={registerButtonStyle}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#7a9bc0'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#9bb3d0'}
        >
          Register now
        </button>
      </form>

      {/* Divider */}
      <div style={dividerStyle}>
        <div style={dividerLineStyle}></div>
        <span style={dividerTextStyle}>or</span>
        <div style={dividerLineStyle}></div>
      </div>

      {/* Social Registration */}
      <div style={{ display: 'flex', gap: '20px' }}>
        <button
          style={{...socialButtonStyle, flex: 1}}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#f9fafb';
            e.currentTarget.style.borderColor = '#d1d5db';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#ffffff';
            e.currentTarget.style.borderColor = '#e5e7eb';
          }}
        >
          <img src="/icons/google_icon.svg" alt="Google" style={socialIconStyle} />
          Google
        </button>

        <button
          style={{...socialButtonStyle, flex: 1}}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#f9fafb';
            e.currentTarget.style.borderColor = '#d1d5db';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#ffffff';
            e.currentTarget.style.borderColor = '#e5e7eb';
          }}
        >
          <img src="/icons/linkedin_icon.svg" alt="LinkedIn" style={socialIconStyle} />
          LinkedIn
        </button>
      </div>

      {/* Terms & Conditions */}
      <div style={termsContainerStyle}>
        <label style={termsLabelStyle}>
          <input
            type="checkbox"
            checked={agreeToTerms}
            onChange={(e) => setAgreeToTerms(e.target.checked)}
            style={checkboxStyle}
          />
          I agree to the{' '}
          <Link 
            to="/terms" 
            style={termsLinkStyle}
            onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
            onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
          >
            Terms & Conditions
          </Link>
        </label>
      </div>
    </div>
  );
}