/**
 * ADAMCHINS PrepWise
 * Classification: ADAMCHINS-CONFIDENTIAL ▲
 * Service: OpenAI Integration
 * Purpose: Handle AI-powered interview conversations
 * Why Needed: Provide realistic interview simulation with ChatGPT
 */

import axios from 'axios';

// Get API key from environment variable
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

// Check if API key is available
if (!OPENAI_API_KEY && import.meta.env.MODE === 'production') {
  console.warn('OpenAI API key not found. Interview simulation will use mock responses.');
}

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface InterviewContext {
  jobRole: string;
  language: 'en' | 'fr';
  cvContent?: string;
  coverLetterContent?: string;
}

// System prompt for interview simulation
const getSystemPrompt = (context: InterviewContext): string => {
  const languageInstruction = context.language === 'fr' 
    ? 'IMPORTANT: You MUST conduct this entire interview in French. All your responses, questions, and feedback must be in French.'
    : 'Conduct this interview in English.';
    
  return `You are an experienced professional interviewer conducting a job interview for a ${context.jobRole} position. 

${languageInstruction}

Your role is to:
1. Ask relevant, professional interview questions appropriate for the ${context.jobRole} role
2. Be conversational but professional in tone
3. Ask follow-up questions based on the candidate's responses
4. Provide a realistic interview experience
5. Focus on behavioral questions, technical skills (if applicable), and cultural fit
6. Keep your responses concise (2-3 sentences max per question)
7. Only ask one question at a time
8. Be encouraging but maintain professional boundaries

${context.cvContent ? `The candidate's CV includes: ${context.cvContent}` : ''}
${context.coverLetterContent ? `The candidate's cover letter mentions: ${context.coverLetterContent}` : ''}

Start with a brief, friendly greeting and then ask your first interview question.`;
};

export async function getInterviewResponse(
  messages: Message[],
  context: InterviewContext
): Promise<string> {
  // If no API key, return a mock response
  if (!OPENAI_API_KEY) {
    return getMockResponse(messages.length, context.language);
  }

  try {
    // Prepare messages with system prompt
    const apiMessages: Message[] = [
      {
        role: 'system',
        content: getSystemPrompt(context)
      },
      ...messages
    ];

    // Call OpenAI API
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: apiMessages,
        temperature: 0.7,
        max_tokens: 150,
        presence_penalty: 0.6,
        frequency_penalty: 0.3
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error('OpenAI API error:', error);
    // Fallback to mock response on error
    return getMockResponse(messages.length, context.language);
  }
}

// Mock responses for development/fallback
function getMockResponse(messageCount: number, language: 'en' | 'fr'): string {
  const mockResponsesEn = [
    "Hello! Thank you for joining us today. I'm excited to learn more about your background. To start, could you tell me about yourself and what attracted you to this position?",
    "That's interesting! Can you share a specific example of a challenging project you've worked on and how you handled it?",
    "Great example! How do you typically approach working in a team environment? Can you describe your collaboration style?",
    "I appreciate your insights. Where do you see yourself professionally in the next 3-5 years?",
    "Thank you for sharing that. Do you have any questions for me about the role or our company?",
    "Those are excellent questions. Thank you for your time today. We'll be in touch soon with next steps."
  ];
  
  const mockResponsesFr = [
    "Bonjour ! Merci de vous joindre à nous aujourd'hui. Je suis ravi d'en apprendre davantage sur votre parcours. Pour commencer, pourriez-vous vous présenter et nous dire ce qui vous a attiré vers ce poste ?",
    "C'est intéressant ! Pouvez-vous partager un exemple spécifique d'un projet difficile sur lequel vous avez travaillé et comment vous l'avez géré ?",
    "Excellent exemple ! Comment abordez-vous généralement le travail en équipe ? Pouvez-vous décrire votre style de collaboration ?",
    "J'apprécie vos perspectives. Où vous voyez-vous professionnellement dans les 3 à 5 prochaines années ?",
    "Merci de partager cela. Avez-vous des questions pour moi concernant le rôle ou notre entreprise ?",
    "Ce sont d'excellentes questions. Merci pour votre temps aujourd'hui. Nous vous contacterons bientôt pour les prochaines étapes."
  ];

  const mockResponses = language === 'fr' ? mockResponsesFr : mockResponsesEn;
  const index = Math.floor(messageCount / 2) % mockResponses.length;
  return mockResponses[index];
}

// Helper to check if API is configured
export function isOpenAIConfigured(): boolean {
  return !!OPENAI_API_KEY;
}