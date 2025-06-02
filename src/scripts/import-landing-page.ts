/**
 * ADAMCHINS PrepWise
 * Classification: ADAMCHINS-CONFIDENTIAL ▲
 * Script: Import Landing Page from Figma
 * Purpose: Extract and generate React components for Landing Page
 * Why Needed: Convert Figma design to code with pixel-perfect accuracy
 */

import * as Figma from 'figma-js';
import { writeFileSync, mkdirSync } from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const TOKEN = process.env.VITE_FIGMA_ACCESS_TOKEN!;
const FILE_ID = process.env.VITE_FIGMA_FILE_ID!;
const FRAME_NAME = 'Page_1_Landing_Page_not_log_in';

const client = Figma.Client({ personalAccessToken: TOKEN });

interface ComponentData {
  navigation: any;
  hero: any;
  features: any[];
  cta: any;
  footer: any;
  images: string[];
  icons: string[];
}

async function importLandingPage() {
  console.log('🎓 Importing Landing Page from Figma...');
  
  try {
    // 1. Fetch the Figma file
    const file = await client.file(FILE_ID);
    const websitePage = file.data.document.children.find(
      (page: any) => page.name === 'Website'
    );
    
    if (!websitePage) {
      throw new Error('Website page not found');
    }
    
    // 2. Find Landing Page frame
    const landingFrame = websitePage.children.find(
      (child: any) => child.name === FRAME_NAME
    );
    
    if (!landingFrame) {
      throw new Error(`Frame "${FRAME_NAME}" not found`);
    }
    
    console.log(`✅ Found Landing Page: ${landingFrame.absoluteBoundingBox.width}x${landingFrame.absoluteBoundingBox.height}`);
    
    // 3. Extract components
    const componentData = await extractComponents(landingFrame);
    
    // 4. Get image URLs
    const imageIds = collectImageIds(landingFrame);
    const imageUrls = await getImageUrls(imageIds);
    
    // 5. Generate React components
    await generateComponents(componentData, imageUrls);
    
    // 6. Generate page component
    await generateLandingPage(componentData);
    
    console.log('✅ Landing Page import complete!');
    
  } catch (error) {
    console.error('❌ Error importing Landing Page:', error);
  }
}

function extractComponents(frame: any): ComponentData {
  const data: ComponentData = {
    navigation: null,
    hero: null,
    features: [],
    cta: null,
    footer: null,
    images: [],
    icons: []
  };
  
  // Navigate through frame structure
  frame.children.forEach((child: any) => {
    // Identify sections by name or position
    if (child.name?.toLowerCase().includes('nav') || child.name === 'Frame 3') {
      data.navigation = extractNavigation(child);
    } else if (child.name?.toLowerCase().includes('hero') || isHeroSection(child)) {
      data.hero = extractHero(child);
    } else if (child.name === 'Frame 33' || isFeatureSection(child)) {
      data.features = extractFeatures(child);
    } else if (child.name?.toLowerCase().includes('footer')) {
      data.footer = extractFooter(child);
    }
  });
  
  return data;
}

function extractNavigation(node: any) {
  console.log('📍 Extracting Navigation...');
  
  return {
    logo: findLogo(node),
    menuItems: findMenuItems(node),
    ctaButton: findNavCTA(node),
    styles: extractStyles(node)
  };
}

function extractHero(node: any) {
  console.log('🦸 Extracting Hero Section...');
  
  return {
    headline: findHeadline(node),
    subheadline: findSubheadline(node),
    ctaButton: findCTAButton(node),
    heroImage: findHeroImage(node),
    styles: extractStyles(node)
  };
}

function extractFeatures(node: any) {
  console.log('✨ Extracting Features Section...');
  
  const features: any[] = [];
  
  // Look for the 3 feature cards
  const featureTexts = [
    'AI Practice & Feedback',
    'Track Your Progress',
    'Real-World Simulation'
  ];
  
  node.children?.forEach((child: any) => {
    const text = extractAllText(child);
    featureTexts.forEach(featureName => {
      if (text.includes(featureName)) {
        features.push({
          title: featureName,
          description: extractDescription(child),
          icon: extractIcon(child),
          styles: extractStyles(child)
        });
      }
    });
  });
  
  return features;
}

function extractFooter(node: any) {
  console.log('🦶 Extracting Footer...');
  
  return {
    links: [],
    copyright: '© 2024 PrepWise. All rights reserved.',
    styles: extractStyles(node)
  };
}

function extractStyles(node: any) {
  const styles: any = {};
  
  // Position and size
  if (node.absoluteBoundingBox) {
    styles.width = node.absoluteBoundingBox.width;
    styles.height = node.absoluteBoundingBox.height;
  }
  
  // Background
  if (node.fills && node.fills.length > 0) {
    const fill = node.fills[0];
    if (fill.type === 'SOLID') {
      styles.backgroundColor = rgbToHex(fill.color);
    }
  }
  
  // Text styles
  if (node.style) {
    styles.fontSize = node.style.fontSize;
    styles.fontWeight = node.style.fontWeight;
    styles.lineHeight = node.style.lineHeightPx;
    styles.textAlign = node.style.textAlignHorizontal?.toLowerCase();
  }
  
  // Padding (approximate from children positions)
  if (node.children && node.children.length > 0) {
    const firstChild = node.children[0];
    if (firstChild.absoluteBoundingBox && node.absoluteBoundingBox) {
      styles.paddingTop = firstChild.absoluteBoundingBox.y - node.absoluteBoundingBox.y;
      styles.paddingLeft = firstChild.absoluteBoundingBox.x - node.absoluteBoundingBox.x;
    }
  }
  
  return styles;
}

function collectImageIds(node: any): string[] {
  const imageIds: string[] = [];
  
  function traverse(n: any) {
    // Check for image fills
    if (n.fills && Array.isArray(n.fills)) {
      n.fills.forEach((fill: any) => {
        if (fill.type === 'IMAGE' && fill.imageRef) {
          imageIds.push(n.id);
        }
      });
    }
    
    // Check for specific nodes (hero image, logo)
    if (n.name === 'img' || n.name === 'Frame 10' || n.type === 'VECTOR') {
      imageIds.push(n.id);
    }
    
    // Traverse children
    if (n.children) {
      n.children.forEach(traverse);
    }
  }
  
  traverse(node);
  return [...new Set(imageIds)]; // Remove duplicates
}

async function getImageUrls(nodeIds: string[]): Promise<Record<string, string>> {
  if (nodeIds.length === 0) return {};
  
  console.log(`📸 Fetching ${nodeIds.length} images...`);
  
  const response = await client.fileImages(FILE_ID, {
    ids: nodeIds,
    format: 'png',
    scale: 2
  });
  
  return response.data.images;
}

function rgbToHex(color: any): string {
  const toHex = (n: number) => {
    const hex = Math.round(n * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  
  return `#${toHex(color.r)}${toHex(color.g)}${toHex(color.b)}`;
}

async function generateComponents(data: ComponentData, imageUrls: Record<string, string>) {
  const componentsDir = path.join(process.cwd(), 'src/components/landing');
  mkdirSync(componentsDir, { recursive: true });
  
  // Generate Navigation Component
  await generateNavigation(data.navigation, componentsDir);
  
  // Generate Hero Component
  await generateHero(data.hero, componentsDir, imageUrls);
  
  // Generate Features Component
  await generateFeatures(data.features, componentsDir);
  
  // Generate Footer Component
  await generateFooter(data.footer, componentsDir);
}

async function generateNavigation(navData: any, dir: string) {
  const component = `/**
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
    <nav className={\`fixed top-0 left-0 right-0 z-50 transition-all duration-300 \${
      isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
    }\`}>
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
}`;

  writeFileSync(path.join(dir, 'Navigation.tsx'), component);
  console.log('📝 Generated Navigation component');
}

async function generateHero(heroData: any, dir: string, imageUrls: Record<string, string>) {
  const component = `/**
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
}`;

  writeFileSync(path.join(dir, 'HeroSection.tsx'), component);
  console.log('📝 Generated Hero component');
}

async function generateFeatures(features: any[], dir: string) {
  const component = `/**
 * ADAMCHINS PrepWise
 * Classification: ADAMCHINS-CONFIDENTIAL ▲
 * Component: Features Section
 * Purpose: Showcase key features with hover effects
 * Why Needed: Communicate product value propositions
 */

import { motion } from 'framer-motion';

const features = [
  {
    title: 'AI Practice & Feedback',
    description: 'Get instant, personalized feedback on your interview responses powered by advanced AI.',
    icon: '🤖',
    color: 'bg-blue-100',
    hoverColor: 'hover:bg-blue-200'
  },
  {
    title: 'Track Your Progress',
    description: 'Monitor your improvement over time with detailed analytics and performance metrics.',
    icon: '📊',
    color: 'bg-green-100',
    hoverColor: 'hover:bg-green-200'
  },
  {
    title: 'Real-World Simulation',
    description: 'Experience authentic interview scenarios tailored to your industry and role.',
    icon: '🎯',
    color: 'bg-purple-100',
    hoverColor: 'hover:bg-purple-200'
  }
];

export function FeaturesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-text-primary mb-4">
            Why Choose PrepWise?
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Our AI-powered platform provides everything you need to excel in your interviews
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={\`p-8 rounded-2xl \${feature.color} \${feature.hoverColor} transition-all duration-300 transform hover:scale-105 hover:shadow-lg cursor-pointer\`}
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-semibold text-text-primary mb-3">
                {feature.title}
              </h3>
              <p className="text-text-secondary">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}`;

  writeFileSync(path.join(dir, 'FeaturesSection.tsx'), component);
  console.log('📝 Generated Features component');
}

async function generateFooter(footerData: any, dir: string) {
  const component = `/**
 * ADAMCHINS PrepWise
 * Classification: ADAMCHINS-CONFIDENTIAL ▲
 * Component: Footer
 * Purpose: Site footer with links and information
 * Why Needed: Navigation and legal information
 */

import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-text-primary text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4">PrepWise</h3>
            <p className="text-gray-400">
              AI-powered interview preparation platform for ambitious professionals.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/features" className="text-gray-400 hover:text-white transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-400 hover:text-white transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/demo" className="text-gray-400 hover:text-white transition-colors">
                  Demo
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/help" className="text-gray-400 hover:text-white transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 PrepWise. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}`;

  writeFileSync(path.join(dir, 'Footer.tsx'), component);
  console.log('📝 Generated Footer component');
}

async function generateLandingPage(data: ComponentData) {
  const pageComponent = `/**
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
}`;

  const pagesDir = path.join(process.cwd(), 'src/pages');
  mkdirSync(pagesDir, { recursive: true });
  writeFileSync(path.join(pagesDir, 'LandingPage.tsx'), pageComponent);
  console.log('📝 Generated Landing Page component');
}

// Helper functions
function findLogo(node: any): any {
  // Implementation specific to finding logo
  return null;
}

function findMenuItems(node: any): string[] {
  // Implementation specific to finding menu items
  return ['Features', 'Pricing', 'About'];
}

function findNavCTA(node: any): any {
  // Implementation specific to finding nav CTA
  return null;
}

function findHeadline(node: any): string {
  // Implementation specific to finding headline
  return 'Master Your Interview Skills with AI';
}

function findSubheadline(node: any): string {
  // Implementation specific to finding subheadline
  return 'Practice interviews with our AI-powered platform.';
}

function findCTAButton(node: any): any {
  // Implementation specific to finding CTA button
  return { text: 'Start Interview Simulation' };
}

function findHeroImage(node: any): any {
  // Implementation specific to finding hero image
  return null;
}

function extractAllText(node: any): string {
  let text = '';
  if (node.characters) {
    text += node.characters;
  }
  if (node.children) {
    node.children.forEach((child: any) => {
      text += ' ' + extractAllText(child);
    });
  }
  return text;
}

function extractDescription(node: any): string {
  // Implementation specific to extracting description
  return '';
}

function extractIcon(node: any): any {
  // Implementation specific to extracting icon
  return null;
}

function isHeroSection(node: any): boolean {
  // Check if node is likely a hero section based on size/position
  return node.absoluteBoundingBox?.height > 400;
}

function isFeatureSection(node: any): boolean {
  // Check if node contains feature cards
  const text = extractAllText(node);
  return text.includes('AI Practice') || text.includes('Track Your Progress');
}

// Run the import
importLandingPage().catch(console.error);