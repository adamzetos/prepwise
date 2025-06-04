/**
 * ADAMCHINS PrepWise
 * Classification: ADAMCHINS-CONFIDENTIAL ▲
 * Component: LanguageSelector
 * Purpose: Language switcher component for bilingual support
 * Why Needed: Allow users to switch between English and French
 */

import { useLanguage } from '../../contexts/LanguageContext';

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  const selectorStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
    position: 'relative' as const,
  };

  const flagStyle = {
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    objectFit: 'cover' as const,
  };

  const textStyle = {
    fontSize: '14px',
    fontWeight: '500',
    color: '#6b7b8f',
    transition: 'color 0.2s ease',
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'fr' : 'en');
  };

  return (
    <div 
      style={selectorStyle}
      onClick={toggleLanguage}
      onMouseEnter={(e) => {
        const text = e.currentTarget.querySelector('span');
        if (text) (text as HTMLElement).style.color = '#1f2d3d';
      }}
      onMouseLeave={(e) => {
        const text = e.currentTarget.querySelector('span');
        if (text) (text as HTMLElement).style.color = '#6b7b8f';
      }}
    >
      {language === 'en' ? (
        <>
          <svg style={flagStyle} viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" fill="#012169"/>
            <path d="M3.5,12 L20.5,12 M12,3.5 L12,20.5" stroke="white" strokeWidth="3"/>
            <path d="M3.5,12 L20.5,12 M12,3.5 L12,20.5" stroke="#C8102E" strokeWidth="2"/>
            <path d="M3.5,4.5 L20.5,19.5 M20.5,4.5 L3.5,19.5" stroke="white" strokeWidth="2"/>
            <path d="M3.5,4.5 L20.5,19.5 M20.5,4.5 L3.5,19.5" stroke="#C8102E" strokeWidth="1"/>
          </svg>
          <span style={textStyle}>EN</span>
        </>
      ) : (
        <>
          <svg style={flagStyle} viewBox="0 0 24 24">
            <rect x="2" y="2" width="6.67" height="20" fill="#002395"/>
            <rect x="8.67" y="2" width="6.67" height="20" fill="white"/>
            <rect x="15.33" y="2" width="6.67" height="20" fill="#ED2939"/>
          </svg>
          <span style={textStyle}>FR</span>
        </>
      )}
    </div>
  );
}