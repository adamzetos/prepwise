/**
 * ADAMCHINS PrepWise
 * Classification: ADAMCHINS-CONFIDENTIAL ▲
 * Component: JobRoleSelectionPage
 * Purpose: Select job role for interview simulation
 * Why Needed: Tailors interview questions to specific job positions
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoggedInNavigation } from '../components/landing/LoggedInNavigation';
import { Footer } from '../components/landing/Footer';

interface JobRole {
  id: string;
  name: string;
  icon: string;
}

export function JobRoleSelectionPage() {
  const navigate = useNavigate();
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [showTooltip, setShowTooltip] = useState(false);

  const jobRoles: JobRole[] = [
    { id: 'audit-intern', name: 'Audit Intern', icon: '/icons/Audit_Intern.svg' },
    { id: 'financial-analyst', name: 'Financial Analyst', icon: '/icons/Financial_Analyst.svg' },
    { id: 'product-manager', name: 'Product Manager', icon: '/icons/Product_Manager.svg' },
    { id: 'software-engineer', name: 'Software Engineer', icon: '/icons/Software_Engineer.svg' },
    { id: 'marketing-associate', name: 'Marketing Associate', icon: '/icons/Marketing_Associate.svg' },
  ];

  const pageStyle = {
    minHeight: '100vh',
    backgroundColor: '#f9fafb',
    display: 'flex',
    flexDirection: 'column' as const,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    WebkitFontSmoothing: 'antialiased' as const,
    MozOsxFontSmoothing: 'grayscale' as const,
  };

  const contentStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    padding: '3rem 2rem',
    maxWidth: '800px',
    margin: '0 auto',
    width: '100%',
  };

  const iconContainerStyle = {
    width: '60px',
    height: '60px',
    backgroundColor: '#17B0A7',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '2rem',
  };

  const titleStyle = {
    fontSize: '32px',
    fontWeight: '600',
    color: '#1a4d8c',
    marginBottom: '1rem',
    textAlign: 'center' as const,
  };

  const subtitleStyle = {
    fontSize: '16px',
    color: '#6b7b8f',
    marginBottom: '3rem',
    textAlign: 'center' as const,
  };

  const inputContainerStyle = {
    position: 'relative' as const,
    width: '100%',
    maxWidth: '500px',
    marginBottom: '3rem',
  };

  const inputStyle = {
    width: '100%',
    padding: '14px 48px 14px 20px',
    fontSize: '16px',
    border: '1px solid #e5e7eb',
    borderRadius: '40px',
    backgroundColor: '#ffffff',
    outline: 'none',
    transition: 'border-color 0.2s ease',
  };

  const questionMarkStyle = {
    position: 'absolute' as const,
    right: '20px',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    border: '1px solid #d1d5db',
    backgroundColor: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontSize: '12px',
    color: '#6b7b8f',
    fontWeight: '500',
  };

  const tooltipStyle = {
    position: 'absolute' as const,
    bottom: '35px',
    right: '0',
    backgroundColor: '#1f2d3d',
    color: '#ffffff',
    padding: '8px 12px',
    borderRadius: '6px',
    fontSize: '13px',
    whiteSpace: 'nowrap' as const,
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
    zIndex: 10,
    maxWidth: '280px',
    lineHeight: '1.4',
  };

  const rolesContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '1rem',
    justifyContent: 'center',
    marginBottom: '4rem',
  };

  const getRoleButtonStyle = (roleId: string) => {
    const isSelected = selectedRoles.includes(roleId);
    return {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      padding: '12px 24px',
      borderRadius: '40px',
      border: '2px solid #17B0A7',
      backgroundColor: isSelected ? '#17B0A7' : '#ffffff',
      color: isSelected ? '#ffffff' : '#17B0A7',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
    };
  };

  const roleIconStyle = {
    width: '20px',
    height: '20px',
  };

  const nextButtonStyle = {
    padding: '14px 48px',
    backgroundColor: selectedRoles.length > 0 ? '#1a4d8c' : '#a5b4c3',
    color: '#ffffff',
    fontSize: '16px',
    fontWeight: '600',
    border: 'none',
    borderRadius: '40px',
    cursor: selectedRoles.length > 0 ? 'pointer' : 'not-allowed',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  };

  const handleRoleToggle = (roleId: string) => {
    setSelectedRoles(prev => {
      if (prev.includes(roleId)) {
        return prev.filter(id => id !== roleId);
      } else {
        return [...prev, roleId];
      }
    });
  };

  const handleNext = () => {
    if (selectedRoles.length > 0) {
      navigate('/interview');
    }
  };

  return (
    <div style={pageStyle}>
      <LoggedInNavigation />
      
      <div style={contentStyle}>
        <div style={iconContainerStyle}>
          <img 
            src="/icons/Position_icon.svg" 
            alt="Position" 
            style={{ width: '32px', height: '32px', filter: 'brightness(0) invert(1)' }} 
          />
        </div>

        <h1 style={titleStyle}>What position are you applying for?</h1>
        <p style={subtitleStyle}>
          Select your job role to tailor your interview simulation. Start typing or pick a popular one below.
        </p>

        <div style={inputContainerStyle}>
          <input
            type="text"
            placeholder="e.g. Product Manager"
            style={inputStyle}
            onFocus={(e) => e.target.style.borderColor = '#17B0A7'}
            onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
          />
          <div 
            style={questionMarkStyle}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            ?
          </div>
          {showTooltip && (
            <div style={tooltipStyle}>
              You had not upload a job description along with his CV and cover letter
            </div>
          )}
        </div>

        <div style={rolesContainerStyle}>
          {jobRoles.map(role => (
            <button
              key={role.id}
              style={getRoleButtonStyle(role.id)}
              onClick={() => handleRoleToggle(role.id)}
              onMouseEnter={(e) => {
                if (!selectedRoles.includes(role.id)) {
                  e.currentTarget.style.backgroundColor = '#f0fdfa';
                }
              }}
              onMouseLeave={(e) => {
                if (!selectedRoles.includes(role.id)) {
                  e.currentTarget.style.backgroundColor = '#ffffff';
                }
              }}
            >
              <img 
                src={role.icon} 
                alt={role.name} 
                style={{
                  ...roleIconStyle,
                  filter: selectedRoles.includes(role.id) ? 'brightness(0) invert(1)' : 'none'
                }}
              />
              {role.name}
            </button>
          ))}
        </div>

        <button
          style={nextButtonStyle}
          onClick={handleNext}
          disabled={selectedRoles.length === 0}
          onMouseEnter={(e) => {
            if (selectedRoles.length > 0) {
              e.currentTarget.style.backgroundColor = '#163e70';
            }
          }}
          onMouseLeave={(e) => {
            if (selectedRoles.length > 0) {
              e.currentTarget.style.backgroundColor = '#1a4d8c';
            }
          }}
        >
          Next
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          </svg>
        </button>
      </div>

      <Footer />
    </div>
  );
}