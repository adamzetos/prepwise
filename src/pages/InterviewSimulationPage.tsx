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

// Add Web Speech API types
interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: any) => void) | null;
  onend: (() => void) | null;
  onstart: (() => void) | null;
}

interface SpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  isFinal: boolean;
  length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

export function InterviewSimulationPage() {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentResponse, setCurrentResponse] = useState('');
  const [time, setTime] = useState(252); // 4:12 in seconds
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isAIMode] = useState(isOpenAIConfigured());
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  
  // Camera and microphone states
  const [showPreview, setShowPreview] = useState(true);
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [micEnabled, setMicEnabled] = useState(false);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [voiceRecognition, setVoiceRecognition] = useState<SpeechRecognition | null>(null);
  const [isVoiceRecording, setIsVoiceRecording] = useState(false);
  const [voiceError, setVoiceError] = useState<string | null>(null);
  const [voiceLanguage, setVoiceLanguage] = useState<'en' | 'fr'>('en');
  const videoRef = useRef<HTMLVideoElement>(null);
  const previewVideoRef = useRef<HTMLVideoElement>(null);
  
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
    backgroundColor: '#1a1a1a',
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

  // Preview modal styles
  const previewModalStyle = {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  };

  const previewContainerStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    padding: '2rem',
    maxWidth: '600px',
    width: '90%',
  };

  const previewTitleStyle = {
    fontSize: '24px',
    fontWeight: '600',
    color: '#1f2d3d',
    marginBottom: '1rem',
    textAlign: 'center' as const,
  };

  const previewVideoStyle = {
    width: '100%',
    height: '300px',
    backgroundColor: '#000000',
    borderRadius: '8px',
    marginBottom: '1.5rem',
  };

  const previewButtonsStyle = {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
  };

  const toggleButtonStyle = (enabled: boolean) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 24px',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
    backgroundColor: enabled ? '#17B0A7' : '#ffffff',
    color: enabled ? '#ffffff' : '#6b7280',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  });

  const startButtonStyle = {
    backgroundColor: '#1a4d8c',
    color: '#ffffff',
    padding: '14px 36px',
    borderRadius: '40px',
    border: 'none',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '1.5rem',
    width: '100%',
  };

  const micIconStyle = {
    width: '20px',
    height: '20px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    marginRight: '8px',
  };

  const pulsingStyle = `
    @keyframes pulse {
      0% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.1); opacity: 0.8; }
      100% { transform: scale(1); opacity: 1; }
    }
  `;

  // Camera functions
  const requestCameraPermission = async () => {
    try {
      console.log('Requesting camera permission...');
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }, 
        audio: false 
      });
      console.log('Camera stream obtained:', stream);
      console.log('Stream tracks:', stream.getTracks());
      
      setCameraStream(stream);
      setCameraEnabled(true);
      
      // Set video stream to both preview and main video elements
      if (previewVideoRef.current) {
        console.log('Setting stream to preview video');
        previewVideoRef.current.srcObject = stream;
        // Force play
        previewVideoRef.current.play().catch(err => {
          console.error('Preview video play error:', err);
        });
      }
      if (videoRef.current) {
        console.log('Setting stream to main video');
        videoRef.current.srcObject = stream;
        // Force play
        videoRef.current.play().catch(err => {
          console.error('Main video play error:', err);
        });
      }
    } catch (error) {
      console.error('Camera permission denied:', error);
      setCameraEnabled(false);
    }
  };

  const toggleCamera = async () => {
    if (cameraEnabled && cameraStream) {
      cameraStream.getTracks().forEach(track => {
        console.log(`Stopping ${track.kind} track`);
        track.stop();
      });
      setCameraStream(null);
      setCameraEnabled(false);
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      if (previewVideoRef.current) {
        previewVideoRef.current.srcObject = null;
      }
    } else {
      await requestCameraPermission();
    }
  };

  const toggleMic = () => {
    setMicEnabled(!micEnabled);
  };


  // Toggle voice recording
  const toggleVoiceRecording = () => {
    if (isVoiceRecording) {
      if (voiceRecognition) {
        voiceRecognition.stop();
      }
      setIsVoiceRecording(false);
    } else {
      // Create new recognition instance
      const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
      
      if (!SpeechRecognitionAPI) {
        setVoiceError(t('interview.voiceError'));
        return;
      }

      const recognition = new SpeechRecognitionAPI();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = voiceLanguage === 'fr' ? 'fr-FR' : 'en-US';

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          }
        }

        if (finalTranscript) {
          setCurrentResponse(prev => {
            // Add space if there's existing text
            return prev ? prev + ' ' + finalTranscript : finalTranscript;
          });
        }
      };
      
      recognition.onstart = () => {
        console.log('Speech recognition started');
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsVoiceRecording(false);
        setVoiceError(t('interview.voiceError'));
      };

      recognition.onend = () => {
        setIsVoiceRecording(false);
      };

      setVoiceRecognition(recognition);
      setVoiceError(null);
      
      recognition.start();
      setIsVoiceRecording(true);
    }
  };

  // Start interview (close preview and apply settings)
  const startInterview = () => {
    setShowPreview(false);
    
    // Move camera stream to main video
    if (cameraEnabled && cameraStream && videoRef.current) {
      videoRef.current.srcObject = cameraStream;
      // Ensure video starts playing
      videoRef.current.play().catch(err => {
        console.error('Error playing video:', err);
      });
    }
  };

  // Handle camera stream changes
  useEffect(() => {
    if (cameraStream && cameraEnabled) {
      console.log('Camera stream changed, updating video elements');
      if (previewVideoRef.current && showPreview) {
        previewVideoRef.current.srcObject = cameraStream;
        previewVideoRef.current.play().catch(err => console.error('Preview play error in effect:', err));
      }
      if (videoRef.current && !showPreview) {
        videoRef.current.srcObject = cameraStream;
        videoRef.current.play().catch(err => console.error('Main video play error in effect:', err));
      }
    }
  }, [cameraStream, cameraEnabled, showPreview]);

  // Handle video resume after voice recording stops
  useEffect(() => {
    if (!isVoiceRecording && cameraEnabled && !showPreview && cameraStream && videoRef.current) {
      console.log('Voice recording stopped, resuming video stream in useEffect');
      // Small delay to ensure DOM is fully updated
      const timer = setTimeout(() => {
        if (videoRef.current && cameraStream) {
          console.log('Re-attaching video stream after voice recording');
          videoRef.current.srcObject = cameraStream;
          videoRef.current.play().catch(err => console.error('Video resume error in useEffect:', err));
        }
      }, 50);
      
      return () => clearTimeout(timer);
    }
  }, [isVoiceRecording, cameraEnabled, showPreview, cameraStream]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (cameraStream) {
        console.log('Cleaning up camera stream...');
        cameraStream.getTracks().forEach(track => {
          console.log(`Stopping ${track.kind} track on cleanup`);
          track.stop();
        });
      }
      if (voiceRecognition) {
        voiceRecognition.abort();
      }
    };
  }, [cameraStream, voiceRecognition]);

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
      <style>{pulsingStyle}</style>
      
      {/* Camera/Mic Preview Modal */}
      {showPreview && (
        <div style={previewModalStyle}>
          <div style={previewContainerStyle}>
            <h2 style={previewTitleStyle}>{t('interview.previewTitle')}</h2>
            
            <div style={previewVideoStyle}>
              {cameraEnabled ? (
                <video
                  ref={previewVideoRef}
                  autoPlay={true}
                  playsInline={true}
                  muted={true}
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover', 
                    borderRadius: '8px',
                    backgroundColor: '#000000',
                    display: 'block'
                  }}
                  onLoadedMetadata={(e) => {
                    console.log('Preview video metadata loaded');
                    const video = e.target as HTMLVideoElement;
                    console.log('Video dimensions:', video.videoWidth, 'x', video.videoHeight);
                    video.play().catch(err => console.error('Preview play error:', err));
                  }}
                  onError={(e) => {
                    console.error('Video error:', e);
                  }}
                />
              ) : (
                <div style={{ 
                  width: '100%', 
                  height: '100%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  color: '#6b7280',
                  fontSize: '16px'
                }}>
                  {t('interview.cameraDisabled')}
                </div>
              )}
            </div>
            
            <div style={previewButtonsStyle}>
              <button
                style={toggleButtonStyle(cameraEnabled)}
                onClick={toggleCamera}
                type="button"
              >
                <span style={{ fontSize: '18px' }}>{cameraEnabled ? '📹' : '📷'}</span>
                {t('interview.camera')}
              </button>
              
              <button
                style={toggleButtonStyle(micEnabled)}
                onClick={toggleMic}
                type="button"
              >
                <span style={{ fontSize: '18px' }}>{micEnabled ? '🎙️' : '🎤'}</span>
                {t('interview.microphone')}
              </button>
            </div>
            
            <button
              style={startButtonStyle}
              onClick={startInterview}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#163e70'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1a4d8c'}
            >
              {t('interview.startInterview')}
            </button>
          </div>
        </div>
      )}
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
            {cameraEnabled && !showPreview && !isVoiceRecording ? (
              <video
                ref={videoRef}
                autoPlay={true}
                playsInline={true}
                muted={true}
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                  backgroundColor: '#000000',
                  display: 'block'
                }}
                onLoadedMetadata={(e) => {
                  console.log('Main video metadata loaded');
                  const video = e.target as HTMLVideoElement;
                  console.log('Main video dimensions:', video.videoWidth, 'x', video.videoHeight);
                  video.play().catch(err => console.error('Main video play error:', err));
                }}
                onError={(e) => {
                  console.error('Main video error:', e);
                }}
              />
            ) : cameraEnabled && !showPreview && isVoiceRecording ? (
              <div style={{ 
                width: '100%', 
                height: '100%', 
                backgroundColor: '#6b7280',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '16px'
              }}>
                <svg 
                  width="48" 
                  height="48" 
                  viewBox="0 0 24 24" 
                  fill="none"
                >
                  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3zM8 12a4 4 0 0 0 8 0M12 19v4M8 23h8" 
                    stroke="#ffffff" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
                <div style={{
                  color: '#ffffff',
                  fontSize: '16px',
                  fontWeight: '600',
                  textAlign: 'center',
                  padding: '0 20px'
                }}>
                  Video streaming interrupted
                </div>
              </div>
            ) : (
              <img src="/You.jpg" alt="You" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            )}
            <div style={videoLabelStyle}>
              <img src="/icons/You_icon.svg" alt="You" style={{ width: '16px', height: '16px', filter: 'brightness(0) invert(1)' }} />
              {t('interview.you')}
            </div>
            
            {/* Camera/Mic Controls */}
            {!showPreview && (
              <div style={{ 
                position: 'absolute', 
                bottom: '40px', 
                left: '8px',
                display: 'flex',
                gap: '8px'
              }}>
                <button
                  style={{
                    backgroundColor: cameraEnabled ? '#17B0A7' : '#6b7280',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '50%',
                    width: '32px',
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    fontSize: '16px',
                  }}
                  onClick={toggleCamera}
                  title={cameraEnabled ? 'Turn off camera' : 'Turn on camera'}
                >
                  {cameraEnabled ? '📹' : '📷'}
                </button>
                
                <button
                  style={{
                    backgroundColor: micEnabled ? '#17B0A7' : '#6b7280',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '50%',
                    width: '32px',
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    fontSize: '16px',
                  }}
                  onClick={toggleMic}
                  title={micEnabled ? 'Turn off microphone' : 'Turn on microphone'}
                >
                  {micEnabled ? '🎙️' : '🎤'}
                </button>
              </div>
            )}
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {/* Voice Input Microphone */}
                <button
                  type="button"
                  onClick={toggleVoiceRecording}
                  style={{
                    ...micIconStyle,
                    backgroundColor: isVoiceRecording ? '#17B0A7' : 'transparent',
                    border: isVoiceRecording ? 'none' : '2px solid #17B0A7',
                    borderRadius: '50%',
                    padding: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    animation: isVoiceRecording ? 'pulse 1.5s infinite' : 'none',
                  }}
                  title={isVoiceRecording ? t('interview.stopRecording') : t('interview.startRecording')}
                >
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill={isVoiceRecording ? '#ffffff' : '#17B0A7'}
                  >
                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3zM8 12a4 4 0 0 0 8 0M12 19v4M8 23h8" stroke={isVoiceRecording ? '#ffffff' : '#17B0A7'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  </svg>
                </button>
                
                {/* Language Switcher for Voice Recognition */}
                <div style={{ 
                  display: 'flex', 
                  backgroundColor: '#f3f4f6', 
                  borderRadius: '20px',
                  padding: '2px',
                  gap: '2px'
                }}>
                  <button
                    type="button"
                    onClick={() => setVoiceLanguage('en')}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '18px',
                      border: 'none',
                      backgroundColor: voiceLanguage === 'en' ? '#17B0A7' : 'transparent',
                      color: voiceLanguage === 'en' ? '#ffffff' : '#6b7280',
                      fontSize: '12px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    EN
                  </button>
                  <button
                    type="button"
                    onClick={() => setVoiceLanguage('fr')}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '18px',
                      border: 'none',
                      backgroundColor: voiceLanguage === 'fr' ? '#17B0A7' : 'transparent',
                      color: voiceLanguage === 'fr' ? '#ffffff' : '#6b7280',
                      fontSize: '12px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    FR
                  </button>
                </div>
                
                {voiceError && (
                  <span style={{ color: '#ef4444', fontSize: '12px' }}>
                    {voiceError}
                  </span>
                )}
              </div>
              
              <button
                style={{
                  ...submitButtonStyle,
                  backgroundColor: currentResponse.trim() ? '#17B0A7' : '#a5b4c3',
                  cursor: currentResponse.trim() ? 'pointer' : 'not-allowed'
                }}
                onClick={handleSubmit}
                disabled={!currentResponse.trim() || isLoading}
                onMouseEnter={(e) => {
                  if (currentResponse.trim()) {
                    e.currentTarget.style.backgroundColor = '#15a097';
                  }
                }}
                onMouseLeave={(e) => {
                  if (currentResponse.trim()) {
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