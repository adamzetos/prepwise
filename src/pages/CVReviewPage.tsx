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

export function CVReviewPage() {
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
            CV & Cover Letter Review
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
              CV review
            </div>
            <div 
              style={getTabStyle(activeTab === 'cover')}
              onClick={() => setActiveTab('cover')}
            >
              Cover letter review
            </div>
          </div>

          {activeTab === 'cv' ? (
            <>
              <div style={documentNameStyle}>
                CV Review - Alex Taylor (with bullet points)
              </div>

              <section style={sectionStyle}>
                <h2 style={sectionTitleStyle}>
                  <img src="/icons/Strengths.svg" alt="Strengths" style={{ width: '20px', height: '20px' }} />
                  Strengths
                </h2>
                <div style={sectionContentStyle}>
                  Strong opening design with a professional headshot and modern layout. 
                  Clear, concise summary outlining career goals, relevant skills, and enthusiasm. 
                  Relevant experience section showcasing marketing internships and leadership in 
                  student government.<br /><br />
                  Strong education section with GPA and honors included.<br />
                  Well-chosen skills such as digital marketing tools and communication.
                </div>
              </section>

              <section style={sectionStyle}>
                <h2 style={sectionTitleStyle}>
                  <img src="/icons/Areas_for_Improvement.svg" alt="Areas for Improvement" style={{ width: '20px', height: '20px' }} />
                  Areas for Improvement
                </h2>
                <div style={sectionContentStyle}>
                  Multiple typos and spelling errors (e.g., "solying," "oriemted," "initiaves"). 
                  Inaccurate or incomplete details, such as "Graduated: May 204" instead of 2024. 
                  Inconsistent formatting and punctuation in bullets and section alignment.<br /><br />
                  Minor software name errors (e.g., "Canva" should be "Canva," "Google" → 
                  "Google").
                </div>
              </section>

              <section style={sectionStyle}>
                <h2 style={sectionTitleStyle}>
                  <img src="/icons/Overall.svg" alt="Overall" style={{ width: '20px', height: '20px' }} />
                  Overall
                </h2>
                <div style={sectionContentStyle}>
                  A strong, entry-level CV with solid content and a professional look, but it needs 
                  proofreading and polishing to reflect the candidate's attention to detail.
                </div>
              </section>
            </>
          ) : (
            <>
              <div style={{ fontSize: '14px', lineHeight: '1.8', color: '#1f2d3d' }}>
                <p style={{ marginBottom: '1.5rem' }}>Dear Recruiter,</p>
                
                <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
                  <p>
                    I am writing to express my{' '}
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
                      👋 interest
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
                          Overused phrase: try to differentiate your introduction
                        </span>
                      )}
                    </span>
                    {' '}in the Marketing Analyst position at Acme Corp.
                  </p>
                </div>

                <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
                  <p>
                    My previous role{' '}
                    <span style={{ 
                      backgroundColor: '#fef3c7', 
                      padding: '2px 4px',
                      borderRadius: '4px'
                    }}>
                      ⚡
                    </span>
                    {' '}involved various tasks , such as coordinating campaigns and 
                    conducting market research. I believe my skills would be a great fit for your team{' '}
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
                    In my CV, I have listed achievements, but did not include quantifiable impact .{' '}
                    <span style={{ 
                      backgroundColor: '#fee2e2', 
                      padding: '2px 4px',
                      borderRadius: '4px'
                    }}>
                      ❗
                    </span>
                  </p>
                </div>

                <p style={{ marginBottom: '0.5rem' }}>Thank you for considering my application.</p>
                <p style={{ marginBottom: '0.5rem' }}>Sincerely</p>
                <p>Jamie Lee</p>
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
              Upload New Document
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
              Regenerate Review
            </button>
          </div>
        </div>

        <aside style={sidebarStyle}>
          <h2 style={sidebarTitleStyle}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#17B0A7" strokeWidth="2">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Automated Review Insights
          </h2>

          <div style={insightItemStyle}>
            <h3 style={insightTitleStyle}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                <line x1="12" y1="9" x2="12" y2="13"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
              Clarity Issue:
            </h3>
            <p style={insightTextStyle}>
              Phrases are too vague; include specific examples and details.
            </p>
          </div>

          <div style={insightItemStyle}>
            <h3 style={insightTitleStyle}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              Impact Missing:
            </h3>
            <p style={insightTextStyle}>
              Your CV lacks quantifiable achievements; add numbers/results.
            </p>
          </div>

          <div style={insightItemStyle}>
            <h3 style={insightTitleStyle}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                <line x1="12" y1="9" x2="12" y2="13"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
              Repetitive Language:
            </h3>
            <p style={insightTextStyle}>
              Avoid overused intro phrases; make your opening unique.
            </p>
          </div>

          <div style={insightItemStyle}>
            <h3 style={insightTitleStyle}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              Formatting:
            </h3>
            <p style={insightTextStyle}>
              Structure and layout are clear and easy to read.
            </p>
          </div>

          <div>
            <h3 style={{...insightTitleStyle, marginBottom: '1rem'}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
              Suggestions for Improvement
            </h3>
            <p style={insightTextStyle}>
              Replace generic phrases with <a href="#" style={linkStyle}>unique, role-specific language</a>.
            </p>
            <p style={{...insightTextStyle, marginTop: '0.75rem'}}>
              Add <a href="#" style={linkStyle}>specific measurable results</a> for each experience.
            </p>
            <p style={{...insightTextStyle, marginTop: '0.75rem'}}>
              Use <a href="#" style={linkStyle}>active verbs</a> to clearly convey your contributions.
            </p>
            <p style={{...insightTextStyle, marginTop: '0.75rem'}}>
              Briefly mention <a href="#" style={linkStyle}>how your skills align</a> with the company's goals.
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
            Next
          </button>
        </aside>
      </div>

      <Footer />
    </div>
  );
}