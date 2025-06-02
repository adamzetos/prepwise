/**
 * ADAMCHINS PrepWise
 * Classification: ADAMCHINS-CONFIDENTIAL ▲
 * Component: DetailedSuggestionsPage
 * Purpose: Display detailed AI-powered feedback for each interview question
 * Why Needed: Provides comprehensive interview performance insights and improvement suggestions
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoggedInNavigation } from '../components/landing/LoggedInNavigation';
import { Footer } from '../components/landing/Footer';

interface Question {
  id: string;
  number: string;
  text: string;
  type: string;
  answer?: string;
  feedback?: string;
  suggestions?: string[];
}

export function DetailedSuggestionsPage() {
  const navigate = useNavigate();
  const [expandedQuestions, setExpandedQuestions] = useState<Set<string>>(new Set());

  const questions: Question[] = [
    {
      id: 'q1',
      number: 'Q1',
      text: 'Tell me about yourself',
      type: 'Fit Question',
      answer: "I'm a recent business graduate from Riverside University with experience in student government and twomarketing internships. I'm passionate about helping organizations grow and excited to apply my skills in a real-world environment.",
      feedback: 'Good structure and clear academic background. You highlighted relevant experiences and showed enthusiasm. Consider quantifying achievements for more impact.',
      suggestions: [
        'Include an achievement with results (e.g., "increased event attendance by 30%")',
        'Briefly connect your experience to the target role'
      ]
    },
    {
      id: 'q2',
      number: 'Q2',
      text: 'Describe a time you solved a problem in a team',
      type: 'Behavioral Question'
    },
    {
      id: 'q3',
      number: 'Q3',
      text: 'What interests you about this position?',
      type: 'Fit Question'
    }
  ];

  const toggleQuestion = (questionId: string) => {
    setExpandedQuestions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(questionId)) {
        newSet.delete(questionId);
      } else {
        newSet.add(questionId);
      }
      return newSet;
    });
  };

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
    padding: '3rem 2rem',
    maxWidth: '1000px',
    margin: '0 auto',
    width: '100%',
  };

  const feedbackHeaderStyle = {
    backgroundColor: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: '12px',
    padding: '2rem',
    marginBottom: '2rem',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '1.5rem',
  };

  const iconContainerStyle = {
    width: '48px',
    height: '48px',
    backgroundColor: '#5b6ee1',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  };

  const feedbackHeaderTextStyle = {
    flex: 1,
  };

  const feedbackTitleStyle = {
    fontSize: '24px',
    fontWeight: '600',
    color: '#1a4d8c',
    marginBottom: '0.5rem',
  };

  const feedbackDescriptionStyle = {
    fontSize: '16px',
    color: '#6b7b8f',
    lineHeight: '1.5',
  };

  const questionContainerStyle = {
    backgroundColor: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: '12px',
    marginBottom: '1rem',
    overflow: 'hidden',
  };

  const questionHeaderStyle = (isExpanded: boolean) => ({
    padding: '1.5rem 2rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    transition: 'background-color 0.2s ease',
    backgroundColor: isExpanded ? '#f9fafb' : '#ffffff',
  });

  const questionInfoStyle = {
    flex: 1,
  };

  const questionTitleStyle = {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1a4d8c',
    marginBottom: '0.25rem',
  };

  const questionTypeStyle = {
    fontSize: '14px',
    color: '#6b7b8f',
  };

  const chevronStyle = (isExpanded: boolean) => ({
    width: '24px',
    height: '24px',
    transition: 'transform 0.3s ease',
    transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
  });

  const expandedContentStyle = {
    borderTop: '1px solid #e5e7eb',
    padding: '2rem',
    backgroundColor: '#f9fafb',
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

  const answerTextStyle = {
    fontSize: '15px',
    color: '#1f2d3d',
    lineHeight: '1.6',
    marginBottom: '2rem',
    backgroundColor: '#ffffff',
    padding: '1rem',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
  };

  const feedbackContainerStyle = {
    backgroundColor: '#e6f7ff',
    borderRadius: '8px',
    padding: '1.5rem',
    marginBottom: '1.5rem',
  };

  const feedbackTextStyle = {
    fontSize: '15px',
    color: '#1f2d3d',
    lineHeight: '1.6',
  };

  const suggestionsContainerStyle = {
    backgroundColor: '#fff4e6',
    borderRadius: '8px',
    padding: '1.5rem',
    borderLeft: '4px solid #ff8c42',
  };

  const suggestionItemStyle = {
    fontSize: '15px',
    color: '#ff8c42',
    lineHeight: '1.6',
    marginBottom: '0.5rem',
    paddingLeft: '1.5rem',
    position: 'relative' as const,
  };

  const downloadButtonStyle = {
    backgroundColor: 'transparent',
    color: '#1a4d8c',
    padding: '12px 24px',
    borderRadius: '40px',
    border: '2px solid #1a4d8c',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    margin: '2rem auto 0',
  };

  return (
    <div style={pageStyle}>
      <LoggedInNavigation />
      
      <div style={contentStyle}>
        <div style={feedbackHeaderStyle}>
          <div style={iconContainerStyle}>
            <img 
              src="/icons/Feedback_Details.svg" 
              alt="Feedback Details" 
              style={{ width: '24px', height: '24px', filter: 'brightness(0) invert(1)' }}
            />
          </div>
          <div style={feedbackHeaderTextStyle}>
            <h1 style={feedbackTitleStyle}>Feedback Details</h1>
            <p style={feedbackDescriptionStyle}>
              Here's your detailed, AI-powered feedback for each interview question. Review improvement suggestions and see where you can grow!
            </p>
          </div>
        </div>

        {questions.map((question) => {
          const isExpanded = expandedQuestions.has(question.id);
          
          return (
            <div key={question.id} style={questionContainerStyle}>
              <div 
                style={questionHeaderStyle(isExpanded)}
                onClick={() => toggleQuestion(question.id)}
                onMouseEnter={(e) => {
                  if (!isExpanded) {
                    e.currentTarget.style.backgroundColor = '#f9fafb';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isExpanded) {
                    e.currentTarget.style.backgroundColor = '#ffffff';
                  }
                }}
              >
                <div style={questionInfoStyle}>
                  <h3 style={questionTitleStyle}>{question.number}. {question.text}</h3>
                  <p style={questionTypeStyle}>{question.type}</p>
                </div>
                <svg style={chevronStyle(isExpanded)} viewBox="0 0 24 24" fill="none">
                  <path d="M6 9l6 6 6-6" stroke="#6b7b8f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              {isExpanded && question.answer && (
                <div style={expandedContentStyle}>
                  <div style={sectionTitleStyle}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="#1f2d3d" strokeWidth="2"/>
                      <path d="M12 6v6l4 2" stroke="#1f2d3d" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    Your Answer
                  </div>
                  <div style={answerTextStyle}>
                    {question.answer}
                  </div>

                  <div style={sectionTitleStyle}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" stroke="#17B0A7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    AI Feedback
                  </div>
                  <div style={feedbackContainerStyle}>
                    <p style={feedbackTextStyle}>{question.feedback}</p>
                  </div>

                  {question.suggestions && (
                    <div style={suggestionsContainerStyle}>
                      {question.suggestions.map((suggestion, index) => (
                        <div key={index} style={suggestionItemStyle}>
                          <span style={{ position: 'absolute', left: 0 }}>•</span>
                          {suggestion}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}

        <button
          style={downloadButtonStyle}
          onClick={() => console.log('Download PDF clicked')}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#1a4d8c';
            e.currentTarget.style.color = '#ffffff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = '#1a4d8c';
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Download PDF
        </button>
      </div>

      <Footer />
    </div>
  );
}