/**
 * ADAMCHINS PrepWise
 * Classification: ADAMCHINS-CONFIDENTIAL ▲
 * Component: Navigation
 * Purpose: Sticky navigation bar for landing page
 * Why Needed: Primary navigation and branding
 */

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="/logo.png" 
              alt="PrepWise" 
              className="h-10 w-auto"
            />
          </Link>

          {/* Menu Items */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/features" className="text-text-primary hover:text-primary transition-colors">
              Features
            </Link>
            <Link to="/pricing" className="text-text-primary hover:text-primary transition-colors">
              Pricing
            </Link>
            <Link to="/about" className="text-text-primary hover:text-primary transition-colors">
              About
            </Link>
          </div>

          {/* CTA Button */}
          <div className="flex items-center space-x-4">
            <Link 
              to="/login"
              className="text-text-primary hover:text-primary transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}