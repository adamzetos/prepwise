/**
 * ADAMCHINS PrepWise
 * Classification: ADAMCHINS-CONFIDENTIAL ▲
 * Component: Login Hero
 * Purpose: Hero section for login page with background image
 * Why Needed: Visual branding and value proposition
 */

export function LoginHero() {
  const sectionStyle = {
    position: 'relative' as const,
    height: '100%',
    overflow: 'hidden',
  };

  const backgroundStyle = {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: 'url("/login_hero.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };

  const overlayStyle = {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(26, 77, 140, 0.8)', // Navy blue overlay
  };

  const contentStyle = {
    position: 'relative' as const,
    zIndex: 10,
    height: '100%',
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center',
    alignItems: 'center',
    padding: '3rem',
    color: '#ffffff',
    textAlign: 'center' as const,
  };

  const headingStyle = {
    fontSize: '48px',
    fontWeight: '700',
    marginBottom: '2rem',
    lineHeight: '1.2',
    letterSpacing: '-0.5px',
  };

  const subheadingStyle = {
    fontSize: '20px',
    fontWeight: '400',
    opacity: 0.95,
    maxWidth: '400px',
    lineHeight: '1.6',
  };

  return (
    <section style={sectionStyle}>
      <div style={backgroundStyle}></div>
      <div style={overlayStyle}></div>
      <div style={contentStyle}>
        <h1 style={headingStyle}>
          Join 50,000+<br />
          students<br />
          preparing<br />
          smarter
        </h1>
        <p style={subheadingStyle}>
          Empower your next interview with PrepWise's AI-driven tools.
        </p>
      </div>
    </section>
  );
}