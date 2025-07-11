/**
 * ADAMCHINS PrepWise
 * Classification: ADAMCHINS-CONFIDENTIAL ▲
 * Page: Register Page
 * Purpose: User registration page
 * Why Needed: Allow new users to create accounts
 */

import { LoginHero } from '@/components/login/LoginHero';
import { RegisterForm } from '@/components/login/RegisterForm';

export function RegisterPage() {
  const pageStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    WebkitFontSmoothing: 'antialiased' as const,
    MozOsxFontSmoothing: 'grayscale' as const,
  };

  const containerStyle = {
    display: 'flex',
    width: '860px',
    height: '800px',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 24px rgba(0, 0, 0, 0.08)',
    borderRadius: '12px',
    overflow: 'hidden',
  };

  const heroContainerStyle = {
    flex: '0 0 50%',
    position: 'relative' as const,
    height: '100%',
  };

  const formContainerStyle = {
    flex: '0 0 50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    height: '100%',
  };

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <div style={heroContainerStyle}>
          <LoginHero />
        </div>
        <div style={formContainerStyle}>
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}