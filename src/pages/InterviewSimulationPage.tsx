/**
 * ADAMCHINS PrepWise
 * Classification: ADAMCHINS-CONFIDENTIAL ▲
 * Component: InterviewSimulationPage
 * Purpose: Interactive interview simulation interface
 * Why Needed: Core feature for AI-powered mock interviews
 */

import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { getInterviewResponse, isOpenAIConfigured } from '../services/openai';

interface ChatMessage {
  id: number;
  type: 'interviewer' | 'user';
  content: string;
}

export function InterviewSimulationPage() {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentResponse, setCurrentResponse] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [time, setTime] = useState(252); // 4:12 in seconds
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isAIMode] = useState(isOpenAIConfigured());
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  
  // Get job role from navigation state (default to Software Engineer)
  const jobRole = location.state?.jobRole || 'Software Engineer';

  // Predefined interview flow
  const interviewFlow = [
    {
      interviewer: t('interview.messages.greeting'),
      userResponse: t('interview.messages.yes')
    },
    {
      interviewer: t('interview.messages.introduction'),
      userResponse: t('interview.messages.introResponse')
    },
    {
      interviewer: t('interview.messages.teamwork'),
      userResponse: t('interview.messages.teamworkResponse')
    },
    {
      interviewer: t('interview.messages.whyInterested'),
      userResponse: t('interview.messages.whyInterestedResponse')
    },
    {
      interviewer: t('interview.messages.priorities'),
      userResponse: ""
    }
  ];

  const pageStyle = {
    minHeight: '100vh',
    backgroundColor: '#f5f7fa',
    display: 'flex',
    flexDirection: 'column' as const,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  };

  const headerStyle = {
    backgroundColor: '#ffffff',
    padding: '1rem 2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: '1px solid #e5e7eb',
  };

  const logoContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '2rem',
  };

  const logoStyle = {
    height: '32px',
    width: 'auto',
  };

  const titleStyle = {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1a4d8c',
  };

  const timerContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '2rem',
  };

  const timerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '18px',
    fontWeight: '600',
    color: '#1f2d3d',
  };

  const endButtonStyle = {
    backgroundColor: '#1a4d8c',
    color: '#ffffff',
    padding: '10px 24px',
    borderRadius: '40px',
    border: 'none',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  };

  const mainContentStyle = {
    flex: 1,
    padding: '2rem',
    maxWidth: '1000px',
    margin: '0 auto',
    width: '100%',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '2rem',
  };

  const videoContainerStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '1.5rem',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    justifyContent: 'center',
    gap: '2rem',
  };

  const videoBoxStyle = {
    position: 'relative' as const,
    width: '280px',
    height: '210px',
    borderRadius: '8px',
    overflow: 'hidden',
  };

  const videoLabelStyle = {
    position: 'absolute' as const,
    bottom: '12px',
    left: '12px',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: '#ffffff',
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '13px',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  };

  const chatContainerStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '1.5rem',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as const,
  };

  const messagesContainerStyle = {
    flex: 1,
    overflowY: 'auto' as const,
    marginBottom: '1.5rem',
    maxHeight: '400px',
  };

  const messageStyle = (type: 'interviewer' | 'user') => ({
    display: 'flex',
    gap: '0.75rem',
    marginBottom: '1.5rem',
    flexDirection: type === 'user' ? 'row-reverse' as const : 'row' as const,
  });

  const avatarStyle = {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    flexShrink: 0,
    objectFit: 'cover' as const,
  };

  const messageBubbleStyle = (type: 'interviewer' | 'user') => ({
    maxWidth: '70%',
    padding: '12px 16px',
    borderRadius: '12px',
    backgroundColor: type === 'interviewer' ? '#17B0A7' : '#f3f4f6',
    color: type === 'interviewer' ? '#ffffff' : '#1f2d3d',
    fontSize: '14px',
    lineHeight: '1.5',
  });


  const inputContainerStyle = {
    borderTop: '1px solid #e5e7eb',
    paddingTop: '1.5rem',
  };

  const textAreaStyle = {
    width: '100%',
    minHeight: '100px',
    padding: '12px',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '14px',
    resize: 'vertical' as const,
    fontFamily: 'inherit',
    outline: 'none',
    transition: 'border-color 0.2s ease',
  };

  const actionButtonsStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '1rem',
  };

  const recordButtonStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: '#17B0A7',
    fontSize: '14px',
    fontWeight: '500',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '8px 12px',
    borderRadius: '8px',
    transition: 'background-color 0.2s ease',
  };

  const submitButtonStyle = {
    backgroundColor: '#a5b4c3',
    color: '#ffffff',
    padding: '12px 32px',
    borderRadius: '40px',
    border: 'none',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  };

  const footerStyle = {
    backgroundColor: '#ffffff',
    borderTop: '1px solid #e5e7eb',
    padding: '1rem 0',
    textAlign: 'center' as const,
  };

  const footerTextStyle = {
    fontSize: '13px',
    color: '#6b7b8f',
  };

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto-scroll chat
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Initialize first message
  useEffect(() => {
    const initializeInterview = async () => {
      if (isAIMode) {
        setIsLoading(true);
        try {
          // Get initial greeting from AI
          const aiGreeting = await getInterviewResponse([], {
            jobRole: jobRole,
            language: language,
            cvContent: location.state?.cvContent,
            coverLetterContent: location.state?.coverLetterContent
          });
          
          setMessages([{
            id: 1,
            type: 'interviewer',
            content: aiGreeting
          }]);
          
          // Focus textarea after greeting
          setTimeout(() => {
            textAreaRef.current?.focus();
          }, 100);
        } catch (error) {
          console.error('Failed to get initial AI greeting:', error);
          // Fallback to predefined greeting
          setMessages([{
            id: 1,
            type: 'interviewer',
            content: interviewFlow[0].interviewer
          }]);
          
          // Focus textarea after greeting
          setTimeout(() => {
            textAreaRef.current?.focus();
          }, 100);
        } finally {
          setIsLoading(false);
        }
      } else {
        // Use predefined greeting with delay
        const timer = setTimeout(() => {
          setMessages([{
            id: 1,
            type: 'interviewer',
            content: interviewFlow[0].interviewer
          }]);
          
          // Focus textarea after greeting
          setTimeout(() => {
            textAreaRef.current?.focus();
          }, 100);
        }, 1000);
        return () => clearTimeout(timer);
      }
    };
    
    initializeInterview();
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')} : ${secs.toString().padStart(2, '0')}`;
  };

  const handleSubmit = async () => {
    if (currentResponse.trim() || currentQuestionIndex < interviewFlow.length) {
      // Add user response
      const userMessage: ChatMessage = {
        id: messages.length + 1,
        type: 'user',
        content: currentResponse.trim() || interviewFlow[currentQuestionIndex].userResponse
      };
      
      setMessages(prev => [...prev, userMessage]);
      setCurrentResponse('');
      
      // If AI mode is enabled, get AI response
      if (isAIMode) {
        setIsLoading(true);
        try {
          // Convert messages to OpenAI format
          const openAIMessages = messages.map(msg => ({
            role: msg.type === 'interviewer' ? 'assistant' as const : 'user' as const,
            content: msg.content
          }));
          
          // Add the current user message
          openAIMessages.push({
            role: 'user' as const,
            content: userMessage.content
          });
          
          // Get AI response
          const aiResponse = await getInterviewResponse(openAIMessages, {
            jobRole: jobRole,
            language: language,
            cvContent: location.state?.cvContent,
            coverLetterContent: location.state?.coverLetterContent
          });
          
          // Add AI response to messages
          const interviewerMessage: ChatMessage = {
            id: messages.length + 2,
            type: 'interviewer',
            content: aiResponse
          };
          
          setMessages(prev => [...prev, interviewerMessage]);
          
          // Focus the textarea after AI response
          setTimeout(() => {
            textAreaRef.current?.focus();
          }, 100);
        } catch (error) {
          console.error('Failed to get AI response:', error);
          // Fallback to predefined flow
          usePreDefinedFlow();
        } finally {
          setIsLoading(false);
        }
      } else {
        // Use predefined flow
        usePreDefinedFlow();
      }
    }
  };
  
  const usePreDefinedFlow = () => {
    // Move to next question after delay
    if (currentQuestionIndex < interviewFlow.length - 1) {
      setTimeout(() => {
        const nextIndex = currentQuestionIndex + 1;
        setCurrentQuestionIndex(nextIndex);
        
        const interviewerMessage: ChatMessage = {
          id: messages.length + 2,
          type: 'interviewer',
          content: interviewFlow[nextIndex].interviewer
        };
        
        setMessages(prev => [...prev, interviewerMessage]);
        
        // Focus the textarea after response
        setTimeout(() => {
          textAreaRef.current?.focus();
        }, 100);
      }, 1500);
    }
  };


  return (
    <div style={pageStyle}>
      <header style={headerStyle}>
        <div style={logoContainerStyle}>
          <img src="/logo.svg" alt="PrepWise" style={logoStyle} />
          <h1 style={titleStyle}>{t('interview.title')}</h1>
        </div>
        
        <div style={timerContainerStyle}>
          <div style={timerStyle}>
            <img src="/icons/Clock.svg" alt="Time" style={{ width: '20px', height: '20px' }} />
            {formatTime(time)}
          </div>
          
          <button
            style={endButtonStyle}
            onClick={() => navigate('/interview-complete')}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#163e70'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1a4d8c'}
          >
            <img src="/icons/End_interview.svg" alt="End" style={{ width: '16px', height: '16px', filter: 'brightness(0) invert(1)' }} />
            {t('interview.endInterview')}
          </button>
        </div>
      </header>

      <main style={mainContentStyle}>
        <div style={videoContainerStyle}>
          <div style={videoBoxStyle}>
            <img src="/Interviewer.jpg" alt="Interviewer" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={videoLabelStyle}>
              <img src="/icons/Interview_icon.svg" alt="Interviewer" style={{ width: '16px', height: '16px', filter: 'brightness(0) invert(1)' }} />
              {t('interview.interviewer')}
            </div>
          </div>
          
          <div style={videoBoxStyle}>
            <img src="/You.jpg" alt="You" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={videoLabelStyle}>
              <img src="/icons/You_icon.svg" alt="You" style={{ width: '16px', height: '16px', filter: 'brightness(0) invert(1)' }} />
              {t('interview.you')}
            </div>
          </div>
        </div>

        <div style={chatContainerStyle}>
          <div style={messagesContainerStyle} ref={chatContainerRef}>
            {messages.map(message => (
              <div key={message.id} style={messageStyle(message.type)}>
                <img 
                  src={message.type === 'interviewer' ? '/icons/Interviewer_chat_avatar.svg' : '/icons/You_chat_avatar.svg'} 
                  alt={message.type === 'interviewer' ? 'Interviewer' : 'You'} 
                  style={avatarStyle}
                />
                <div style={messageBubbleStyle(message.type)}>
                  {message.content}
                </div>
              </div>
            ))}
          </div>

          <div style={inputContainerStyle}>
            <textarea
              ref={textAreaRef}
              style={textAreaStyle}
              placeholder={isLoading ? t('interview.messages.waitingForResponse') : t('interview.typeResponse')}
              value={currentResponse}
              onChange={(e) => setCurrentResponse(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey && !isLoading) {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
              disabled={isLoading}
              onFocus={(e) => e.target.style.borderColor = '#17B0A7'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            />
            
            <div style={actionButtonsStyle}>
              <button
                style={recordButtonStyle}
                onClick={() => setIsRecording(!isRecording)}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0fdfa'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3zM8 12a4 4 0 0 0 8 0M12 19v4M8 23h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                </svg>
                {t('interview.recordAnswer')}
              </button>
              
              <button
                style={{
                  ...submitButtonStyle,
                  backgroundColor: currentResponse.trim() || currentQuestionIndex < interviewFlow.length ? '#17B0A7' : '#a5b4c3',
                  cursor: currentResponse.trim() || currentQuestionIndex < interviewFlow.length ? 'pointer' : 'not-allowed'
                }}
                onClick={handleSubmit}
                disabled={(!currentResponse.trim() && currentQuestionIndex >= interviewFlow.length) || isLoading}
                onMouseEnter={(e) => {
                  if (currentResponse.trim() || currentQuestionIndex < interviewFlow.length) {
                    e.currentTarget.style.backgroundColor = '#15a097';
                  }
                }}
                onMouseLeave={(e) => {
                  if (currentResponse.trim() || currentQuestionIndex < interviewFlow.length) {
                    e.currentTarget.style.backgroundColor = '#17B0A7';
                  }
                }}
              >
                {t('interview.submitAnswer')}
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer style={footerStyle}>
        <p style={footerTextStyle}>
          © 2025 Prepwise. All rights reserved.
        </p>
      </footer>
    </div>
  );
}