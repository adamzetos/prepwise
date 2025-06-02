/**
 * ADAMCHINS PrepWise
 * Classification: ADAMCHINS-CONFIDENTIAL ▲
 * Component: Features Section
 * Purpose: Showcase key features
 * Why Needed: Communicate product value propositions
 */

const features = [
  {
    title: 'AI Practice & Feedback',
    description: 'Experience realistic interviews with instant, actionable feedback to help you grow confidently.',
    iconPath: '/icons/ai-practice-icon.svg',
  },
  {
    title: 'Track Your Progress',
    description: 'Visual dashboards show your strengths and areas to improve, so you always know where you stand.',
    iconPath: '/icons/track-progress-icon.svg',
  },
  {
    title: 'Real-World Simulation',
    description: 'Practice in a lifelike interview environment to build your confidence before the real thing.',
    iconPath: '/icons/real-world-icon.svg',
  }
];

export function FeaturesSection() {
  const sectionStyle = {
    backgroundColor: '#ffffff', // White background
    marginTop: '-100px', // Overlap with hero section
    position: 'relative' as const,
    zIndex: 20,
    paddingTop: '0',
    paddingBottom: '80px', // Add padding at bottom for content
  };

  const containerStyle = {
    maxWidth: 'none', // Full width to fit browser
    width: '100%',
    margin: '0 auto',
    padding: '0 2rem',
    display: 'flex',
    justifyContent: 'center', // Center the grid
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