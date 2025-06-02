/**
 * ADAMCHINS PrepWise
 * Classification: ADAMCHINS-CONFIDENTIAL ▲
 * Page: Landing Page
 * Purpose: Main landing page for non-authenticated users
 * Why Needed: Primary conversion and information page
 */

import { Navigation } from '@/components/landing/Navigation';
import { HeroSection } from '@/components/landing/HeroSection';
import { FeaturesSection } from '@/components/landing/FeaturesSection';
import { Footer } from '@/components/landing/Footer';

export function LandingPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <Footer />
    </div>
  );
}