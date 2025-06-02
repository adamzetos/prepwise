/**
 * ADAMCHINS PrepWise
 * Classification: ADAMCHINS-CONFIDENTIAL ▲
 * Component: Hero Section
 * Purpose: Landing page hero with CTA
 * Why Needed: Primary value proposition and conversion
 */

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-bg-secondary">
      <div className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl lg:text-6xl font-bold text-text-primary mb-6">
              Master Your Interview Skills with AI
            </h1>
            <p className="text-xl text-text-secondary mb-8">
              Practice interviews with our AI-powered platform. Get real-time feedback, 
              track your progress, and land your dream job.
            </p>
            <Link
              to="/register"
              className="inline-block bg-primary text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary/90 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Start Interview Simulation
            </Link>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <img
              src="/hero-image.png"
              alt="AI Interview Practice"
              className="w-full h-auto rounded-2xl shadow-2xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}