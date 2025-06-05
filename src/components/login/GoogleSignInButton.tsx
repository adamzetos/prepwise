/**
 * ADAMCHINS PrepWise
 * Classification: ADAMCHINS-CONFIDENTIAL ▲
 * Component: GoogleSignInButton
 * Purpose: Google SSO sign-in button
 * Why Needed: Enable users to authenticate with Google
 */

import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';

export function GoogleSignInButton() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { t } = useLanguage();

  // Always navigate to dashboard after successful login
  const from = '/dashboard';

  const handleSuccess = (credentialResponse: any) => {
    const success = login(credentialResponse);
    if (success) {
      // Use setTimeout to ensure state update completes before navigation
      setTimeout(() => {
        navigate(from, { replace: true });
      }, 100);
    }
  };

  const handleError = () => {
    console.error('Google Sign-In failed');
  };

  const buttonStyle = {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  };

  return (
    <div style={buttonStyle}>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
        useOneTap
        text="signin_with"
        shape="rectangular"
        theme="outline"
        size="large"
        width="100%"
        locale={t('auth.login.googleLocale')}
      />
    </div>
  );
}