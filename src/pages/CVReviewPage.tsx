/**
 * ADAMCHINS PrepWise
 * Classification: ADAMCHINS-CONFIDENTIAL ▲
 * Component: CVReviewPage
 * Purpose: Document quality review for CV and cover letters
 * Why Needed: Provides AI-powered feedback on uploaded documents
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoggedInNavigation } from '../components/landing/LoggedInNavigation';
import { Footer } from '../components/landing/Footer';
import { useLanguage } from '../contexts/LanguageContext';

export function CVReviewPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'cv' | 'cover'>('cv');
  const [showTooltip, setShowTooltip] = useState(false);

  const pageStyle = {
    minHeight: '100vh',
    backgroundColor: '#f9fafb',
    display: 'flex',
    flexDirection: 'column' as const,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    WebkitFontSmoothing: 'antialiased' as const,
    MozOsxFontSmoothing: 'grayscale' as const,
  };

  const headerStyle = {
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #e5e7eb',
    padding: '1rem 0',
  };

  const headerContentStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 2rem',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  };

  const titleStyle = {
    fontSize: '20px',
    fontWeight: '600',
    color: '#1a4d8c',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  };

  const contentContainerStyle = {
    flex: 1,
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem',
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '1fr 320px',
    gap: '2rem',
  };

  const mainContentStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '2rem',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  };

  const tabContainerStyle = {
    display: 'flex',
    gap: '2rem',
    borderBottom: '1px solid #e5e7eb',
    marginBottom: '2rem',
  };

  const getTabStyle = (isActive: boolean) => ({
    padding: '0.75rem 0',
    fontSize: '14px',
    fontWeight: isActive ? '600' : '400',
    color: isActive ? '#1a4d8c' : '#6b7b8f',
    borderBottom: isActive ? '2px solid #1a4d8c' : '2px solid transparent',
    marginBottom: '-1px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  });

  const documentNameStyle = {
    fontSize: '16px',
    fontWeight: '500',
    color: '#1f2d3d',
    marginBottom: '2rem',
  };

  const sectionStyle = {
    marginBottom: '2rem',
  };

  const sectionTitleStyle = {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1f2d3d',
    marginBottom: '1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  };

  const sectionContentStyle = {
    fontSize: '14px',
    color: '#6b7b8f',
    lineHeight: '1.6',
  };

  const sidebarStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '1.5rem',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    height: 'fit-content',
  };

  const sidebarTitleStyle = {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1a4d8c',
    marginBottom: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  };

  const insightItemStyle = {
    marginBottom: '1.5rem',
    paddingBottom: '1.5rem',
    borderBottom: '1px solid #f3f4f6',
  };

  const insightTitleStyle = {
    fontSize: '14px',
    fontWeight: '600',
    color: '#1f2d3d',
    marginBottom: '0.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  };

  const insightTextStyle = {
    fontSize: '13px',
    color: '#6b7b8f',
    lineHeight: '1.5',
  };

  const linkStyle = {
    color: '#17B0A7',
    textDecoration: 'none',
    fontWeight: '500',
  };

  const buttonContainerStyle = {
    display: 'flex',
    gap: '1rem',
    marginTop: '2rem',
  };

  const primaryButtonStyle = {
    backgroundColor: '#17B0A7',
    color: '#ffffff',
    padding: '12px 32px',
    borderRadius: '8px',
    border: 'none',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  };

  const secondaryButtonStyle = {
    backgroundColor: '#ffffff',
    color: '#1a4d8c',
    padding: '12px 24px',
    borderRadius: '8px',
    border: '2px solid #e5e7eb',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  };

  const tertiaryButtonStyle = {
    backgroundColor: 'transparent',
    color: '#6b7b8f',
    padding: '12px 24px',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  };

  const handleNext = () => {
    navigate('/job-role-selection');
  };

  const handleUploadNew = () => {
    navigate('/upload');
  };

  const handleRegenerate = () => {
    console.log('Regenerating review...');
  };

  return (
    <div style={pageStyle}>
      <LoggedInNavigation />
      
      <div style={headerStyle}>
        <div style={headerContentStyle}>
          <h1 style={titleStyle}>
            <img src="/icons/CV&CoverLetterReview.svg" alt="CV & Cover Letter Review" style={{ width: '24px', height: '24px' }} />
            {t('cvReview.title')}
          </h1>
        </div>
      </div>

      <div style={contentContainerStyle}>
        <div style={mainContentStyle}>
          <div style={tabContainerStyle}>
            <div 
              style={getTabStyle(activeTab === 'cv')}
              onClick={() => setActiveTab('cv')}
            >
              {t('cvReview.tabs.cv')}
            </div>
            <div 
              style={getTabStyle(activeTab === 'cover')}
              onClick={() => setActiveTab('cover')}
            >
              {t('cvReview.tabs.coverLetter')}
            </div>
          </div>

          {activeTab === 'cv' ? (
            <>
              <div style={documentNameStyle}>
                {t('cvReview.cvTab.documentName')}
              </div>

              <section style={sectionStyle}>
                <h2 style={sectionTitleStyle}>
                  <img src="/icons/Strengths.svg" alt="Strengths" style={{ width: '20px', height: '20px' }} />
                  {t('cvReview.cvTab.strengths')}
                </h2>
                <div style={sectionContentStyle}>
                  {t('cvReview.cvTab.strengthsContent').split('\n').map((line, i, arr) => (
                    <span key={i}>{line}{i < arr.length - 1 && <><br /><br /></>}</span>
                  ))}
                </div>
              </section>

              <section style={sectionStyle}>
                <h2 style={sectionTitleStyle}>
                  <img src="/icons/Areas_for_Improvement.svg" alt="Areas for Improvement" style={{ width: '20px', height: '20px' }} />
                  {t('cvReview.cvTab.areasForImprovement')}
                </h2>
                <div style={sectionContentStyle}>
                  {t('cvReview.cvTab.areasContent').split('\n').map((line, i, arr) => (
                    <span key={i}>{line}{i < arr.length - 1 && <><br /><br /></>}</span>
                  ))}
                </div>
              </section>

              <section style={sectionStyle}>
                <h2 style={sectionTitleStyle}>
                  <img src="/icons/Overall.svg" alt="Overall" style={{ width: '20px', height: '20px' }} />
                  {t('cvReview.cvTab.overall')}
                </h2>
                <div style={sectionContentStyle}>
                  {t('cvReview.cvTab.overallContent')}
                </div>
              </section>
            </>
          ) : (
            <>
              <div style={{ fontSize: '14px', lineHeight: '1.8', color: '#1f2d3d' }}>
                <p style={{ marginBottom: '1.5rem' }}>{t('cvReview.coverLetterTab.greeting')}</p>
                
                <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
                  <p>
                    {t('cvReview.coverLetterTab.content.line1')}{' '}
                    <span 
                      style={{ 
                        backgroundColor: '#fef3c7', 
                        padding: '2px 4px',
                        borderRadius: '4px',
                        position: 'relative',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={() => setShowTooltip(true)}
                      onMouseLeave={() => setShowTooltip(false)}
                    >
                      👋 {t('cvReview.coverLetterTab.content.interest')}
                      {showTooltip && (
                        <span style={{
                          position: 'absolute',
                          top: '-30px',
                          left: '0',
                          backgroundColor: '#1f2d3d',
                          color: '#ffffff',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontSize: '12px',
                          whiteSpace: 'nowrap',
                          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                          zIndex: 10,
                        }}>
                          {t('cvReview.coverLetterTab.tooltip')}
                        </span>
                      )}
                    </span>
                    {' '}{t('cvReview.coverLetterTab.content.line1End')}
                  </p>
                </div>

                <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
                  <p>
                    {t('cvReview.coverLetterTab.content.line2')}{' '}
                    <span style={{ 
                      backgroundColor: '#fef3c7', 
                      padding: '2px 4px',
                      borderRadius: '4px'
                    }}>
                      ⚡
                    </span>
                    {' '}{t('cvReview.coverLetterTab.content.line2Mid')}{' '}
                    <span style={{ 
                      backgroundColor: '#fee2e2', 
                      padding: '2px 4px',
                      borderRadius: '4px'
                    }}>
                      ❗
                    </span>
                  </p>
                </div>

                <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
                  <p>
                    {t('cvReview.coverLetterTab.content.line3')}{' '}
                    <span style={{ 
                      backgroundColor: '#fee2e2', 
                      padding: '2px 4px',
                      borderRadius: '4px'
                    }}>
                      ❗
                    </span>
                  </p>
                </div>

                <p style={{ marginBottom: '0.5rem' }}>{t('cvReview.coverLetterTab.content.closing')}</p>
                <p style={{ marginBottom: '0.5rem' }}>{t('cvReview.coverLetterTab.content.signoff')}</p>
                <p>{t('cvReview.coverLetterTab.content.name')}</p>
              </div>
            </>
          )}

          <div style={buttonContainerStyle}>
            <button
              style={secondaryButtonStyle}
              onClick={handleUploadNew}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#d1d5db';
                e.currentTarget.style.backgroundColor = '#f9fafb';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#e5e7eb';
                e.currentTarget.style.backgroundColor = '#ffffff';
              }}
            >
              {t('cvReview.buttons.uploadNew')}
            </button>
            <button
              style={tertiaryButtonStyle}
              onClick={handleRegenerate}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#d1d5db';
                e.currentTarget.style.backgroundColor = '#f9fafb';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#e5e7eb';
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              {t('cvReview.buttons.regenerate')}
            </button>
          </div>
        </div>

        <aside style={sidebarStyle}>
          <h2 style={sidebarTitleStyle}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#17B0A7" strokeWidth="2">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {t('cvReview.sidebar.title')}
          </h2>

          <div style={insightItemStyle}>
            <h3 style={insightTitleStyle}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                <line x1="12" y1="9" x2="12" y2="13"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
              {t('cvReview.sidebar.clarityIssue')}
            </h3>
            <p style={insightTextStyle}>
              {t('cvReview.sidebar.clarityContent')}
            </p>
          </div>

          <div style={insightItemStyle}>
            <h3 style={insightTitleStyle}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              {t('cvReview.sidebar.impactMissing')}
            </h3>
            <p style={insightTextStyle}>
              {t('cvReview.sidebar.impactContent')}
            </p>
          </div>

          <div style={insightItemStyle}>
            <h3 style={insightTitleStyle}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                <line x1="12" y1="9" x2="12" y2="13"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
              {t('cvReview.sidebar.repetitiveLanguage')}
            </h3>
            <p style={insightTextStyle}>
              {t('cvReview.sidebar.repetitiveContent')}
            </p>
          </div>

          <div style={insightItemStyle}>
            <h3 style={insightTitleStyle}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              {t('cvReview.sidebar.formatting')}
            </h3>
            <p style={insightTextStyle}>
              {t('cvReview.sidebar.formattingContent')}
            </p>
          </div>

          <div>
            <h3 style={{...insightTitleStyle, marginBottom: '1rem'}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
              {t('cvReview.sidebar.suggestions')}
            </h3>
            <p style={insightTextStyle}>
              {t('cvReview.sidebar.suggestion1')} <a href="#" style={linkStyle}>{t('cvReview.sidebar.suggestion1Link')}</a>.
            </p>
            <p style={{...insightTextStyle, marginTop: '0.75rem'}}>
              {t('cvReview.sidebar.suggestion2')} <a href="#" style={linkStyle}>{t('cvReview.sidebar.suggestion2Link')}</a> {t('cvReview.sidebar.suggestion2End')}
            </p>
            <p style={{...insightTextStyle, marginTop: '0.75rem'}}>
              {t('cvReview.sidebar.suggestion3')} <a href="#" style={linkStyle}>{t('cvReview.sidebar.suggestion3Link')}</a> {t('cvReview.sidebar.suggestion3End')}
            </p>
            <p style={{...insightTextStyle, marginTop: '0.75rem'}}>
              {t('cvReview.sidebar.suggestion4')} <a href="#" style={linkStyle}>{t('cvReview.sidebar.suggestion4Link')}</a> {t('cvReview.sidebar.suggestion4End')}
            </p>
          </div>

          <button
            style={{...primaryButtonStyle, width: '100%', marginTop: '2rem'}}
            onClick={handleNext}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#15a097';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#17B0A7';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            {t('cvReview.buttons.next')}
          </button>
        </aside>
      </div>

      <Footer />
    </div>
  );
}