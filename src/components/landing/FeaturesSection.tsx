/**
 * ADAMCHINS PrepWise
 * Classification: ADAMCHINS-CONFIDENTIAL ▲
 * Component: Features Section
 * Purpose: Showcase key features
 * Why Needed: Communicate product value propositions
 */

import { useLanguage } from '../../contexts/LanguageContext';

export function FeaturesSection() {
  const { t } = useLanguage();

  const features = [
    {
      title: t('landing.features.aiPractice.title'),
      description: t('landing.features.aiPractice.description'),
      iconPath: '/icons/ai-practice-icon.svg',
    },
    {
      title: t('landing.features.trackProgress.title'),
      description: t('landing.features.trackProgress.description'),
      iconPath: '/icons/track-progress-icon.svg',
    },
    {
      title: t('landing.features.realWorld.title'),
      description: t('landing.features.realWorld.description'),
      iconPath: '/icons/real-world-icon.svg',
    }
  ];
  const sectionStyle = {
    backgroundColor: '#ffffff', // White background
    marginTop: '-100px', // Overlap with hero section
    position: 'relative' as const,
    zIndex: 20,
    paddingTop: '100px',
    paddingBottom: '80px', // Add padding at bottom for content
  };

  const containerStyle = {
    maxWidth: 'none', // Full width to fit browser
    width: '100%',
    margin: '0 auto',
    padding: '0 2rem',
    textAlign: 'center' as const,
  };

  const sectionTitleStyle = {
    fontSize: '36px',
    fontWeight: '700',
    color: '#1f2d3d',
    marginBottom: '3rem',
    textAlign: 'center' as const,
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 300px)', // Fixed 300px width for each card
    gap: '20px', // 20px margin between cards
    justifyContent: 'center', // Center the grid itself
  };

  const cardStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '2.5rem',
    textAlign: 'center' as const,
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
    border: '1px solid rgba(0, 0, 0, 0.08)',
    width: '300px', // Fixed width
    maxWidth: '300px', // Maximum width constraint
  };

  const iconStyle = {
    width: '48px',
    height: '48px',
    margin: '0 auto 1.5rem',
    display: 'block',
  };

  const titleStyle = {
    fontSize: '20px',
    fontWeight: '600',
    color: '#1f2d3d',
    marginBottom: '1rem',
  };

  const descriptionStyle = {
    fontSize: '14px',
    color: '#6b7b8f',
    lineHeight: '1.6',
  };

  return (
    <section style={sectionStyle}>
      <div style={containerStyle}>
        <h2 style={sectionTitleStyle}>
          {t('landing.features.title')}
        </h2>
        <div style={gridStyle}>
          {features.map((feature, index) => (
            <div key={index} style={cardStyle}>
              <img 
                src={feature.iconPath} 
                alt={feature.title}
                style={iconStyle}
              />
              <h3 style={titleStyle}>
                {feature.title}
              </h3>
              <p style={descriptionStyle}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}