/**
 * ADAMCHINS PrepWise
 * Classification: ADAMCHINS-CONFIDENTIAL ▲
 * Component: GoogleSignInCustomButton
 * Purpose: Custom Google SSO sign-in button to match LinkedIn button style
 * Why Needed: Ensure consistent button sizes and styling
 */

import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';

export function GoogleSignInCustomButton() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { t } = useLanguage();

  // Always navigate to dashboard after successful login
  const from = '/dashboard';

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        // Fetch user info using the access token
        const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        });
        const userInfo = await userInfoResponse.json();
        
        // Pass user info directly
        const success = login({
          email: userInfo.email,
          name: userInfo.name,
          picture: userInfo.picture,
          id: userInfo.sub,
        });
        if (success) {
          // Use setTimeout to ensure state update completes before navigation
          setTimeout(() => {
            navigate(from, { replace: true });
          }, 100);
        }
      } catch (error) {
        console.error('Failed to fetch user info:', error);
      }
    },
    onError: () => {
      console.error('Google Sign-In failed');
    },
  });

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
    width: '100%',
  };

  const socialIconStyle = {
    width: '20px',
    height: '20px',
  };

  return (
    <button
      style={socialButtonStyle}
      onClick={() => googleLogin()}
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
      {t('auth.login.google')}
    </button>
  );
}