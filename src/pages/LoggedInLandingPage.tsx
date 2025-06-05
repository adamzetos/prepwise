/**
 * ADAMCHINS PrepWise
 * Classification: ADAMCHINS-CONFIDENTIAL ▲
 * Component: LoggedInLandingPage
 * Purpose: Landing page for authenticated users
 * Why Needed: Initialize interview process for logged-in users
 */

import { LoggedInNavigation } from '../components/landing/LoggedInNavigation';
import { HeroSection } from '../components/landing/HeroSection';
import { FeaturesSection } from '../components/landing/FeaturesSection';
import { Footer } from '../components/landing/Footer';

export function LoggedInLandingPage() {
  const pageStyle = {
    minHeight: '100vh',
    backgroundColor: '#ffffff',
    display: 'flex',
    flexDirection: 'column' as const,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    WebkitFontSmoothing: 'antialiased' as const,
    MozOsxFontSmoothing: 'grayscale' as const,
  };

  return (
    <div style={pageStyle}>
      <LoggedInNavigation />
      <HeroSection ctaDestination="/upload" />
      <FeaturesSection />
      <Footer />
    </div>
  );
}