/**
 * ADAMCHINS PrepWise
 * Classification: ADAMCHINS-CONFIDENTIAL ▲
 * Utility: generatePDF
 * Purpose: Generate PDF reports with CV review and interview feedback
 * Why Needed: Allow users to download their feedback for offline review
 */

import jsPDF from 'jspdf';
import { DEFAULT_AVATAR_BASE64 } from './imageToBase64';

interface PDFContent {
  userAvatar?: string; // Base64 or URL of user avatar
  cvReview: {
    documentName: string;
    strengths: string;
    areasForImprovement: string;
    overall: string;
  };
  coverLetterReview: {
    content: string;
    insights: {
      clarityIssue: string;
      impactMissing: string;
      repetitiveLanguage: string;
      formatting: string;
    };
    suggestions: string[];
  };
  interviewConversation: {
    messages: Array<{
      type: 'interviewer' | 'user';
      content: string;
    }>;
  };
  feedback: {
    overallScore: number;
    categories: Array<{
      name: string;
      score: number;
    }>;
    questions: Array<{
      question: string;
      type: string;
      answer?: string;
      feedback?: string;
      suggestions?: string[];
    }>;
  };
}

export function generatePDF(content: PDFContent) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const lineHeight = 7;
  let yPosition = margin;

  // Helper function to clean text for PDF
  const cleanText = (text: string): string => {
    return text
      .replace(/"/g, '"')
      .replace(/"/g, '"')
      .replace(/'/g, "'")
      .replace(/'/g, "'")
      .replace(/→/g, '->')
      .replace(/–/g, '-')
      .replace(/—/g, '-');
  };

  // Helper function to add text with word wrap
  const addText = (text: string, fontSize: number = 10, fontStyle: 'normal' | 'bold' = 'normal') => {
    doc.setFontSize(fontSize);
    doc.setFont('helvetica', fontStyle);
    const cleanedText = cleanText(text);
    const lines = doc.splitTextToSize(cleanedText, pageWidth - 2 * margin);
    
    lines.forEach((line: string) => {
      if (yPosition + lineHeight > pageHeight - margin) {
        doc.addPage();
        yPosition = margin;
      }
      doc.text(line, margin, yPosition);
      yPosition += lineHeight;
    });
  };

  // Add header
  doc.setFillColor(26, 77, 140); // #1a4d8c
  doc.rect(0, 0, pageWidth, 30, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('PrepWise Feedback Report', pageWidth / 2, 20, { align: 'center' });
  doc.setTextColor(0, 0, 0);
  yPosition = 40;

  // Add user avatar (40x40 pixels)
  const avatarSize = 40;
  const avatarY = yPosition;
  const avatarX = (pageWidth - avatarSize) / 2;
  
  // Add the avatar image
  try {
    const avatarBase64 = content.userAvatar || DEFAULT_AVATAR_BASE64;
    doc.addImage(avatarBase64, 'PNG', avatarX, avatarY, avatarSize, avatarSize);
  } catch (error) {
    // Fallback to placeholder if image fails
    doc.setFillColor(230, 230, 230);
    doc.circle(pageWidth / 2, avatarY + avatarSize / 2, avatarSize / 2, 'F');
    
    // Add avatar icon in the center
    doc.setFillColor(180, 180, 180);
    const iconSize = 16;
    doc.circle(pageWidth / 2, avatarY + avatarSize / 2 - 3, iconSize / 3, 'F'); // Head
    doc.ellipse(pageWidth / 2, avatarY + avatarSize / 2 + 5, iconSize / 2, iconSize / 3, 'F'); // Body
  }
  
  yPosition = avatarY + avatarSize + 20;

  // Section 1: CV Review
  addText('CV Review', 16, 'bold');
  yPosition += 5;
  
  addText('Document: ' + content.cvReview.documentName, 10, 'bold');
  yPosition += 3;
  
  addText('Strengths:', 12, 'bold');
  addText(content.cvReview.strengths);
  yPosition += 5;
  
  addText('Areas for Improvement:', 12, 'bold');
  addText(content.cvReview.areasForImprovement);
  yPosition += 5;
  
  addText('Overall:', 12, 'bold');
  addText(content.cvReview.overall);
  yPosition += 10;

  // Section 2: Cover Letter Review
  doc.addPage();
  yPosition = margin;
  
  addText('Cover Letter Review', 16, 'bold');
  yPosition += 5;
  
  addText('Letter Content:', 12, 'bold');
  addText(content.coverLetterReview.content);
  yPosition += 5;
  
  addText('Review Insights:', 12, 'bold');
  addText('• Clarity Issue: ' + content.coverLetterReview.insights.clarityIssue);
  addText('• Impact Missing: ' + content.coverLetterReview.insights.impactMissing);
  addText('• Repetitive Language: ' + content.coverLetterReview.insights.repetitiveLanguage);
  addText('• Formatting: ' + content.coverLetterReview.insights.formatting);
  yPosition += 5;
  
  addText('Suggestions for Improvement:', 12, 'bold');
  content.coverLetterReview.suggestions.forEach((suggestion, index) => {
    addText(`${index + 1}. ${suggestion}`);
  });
  yPosition += 10;

  // Section 3: Interview Conversation
  doc.addPage();
  yPosition = margin;
  
  addText('Interview Simulation Transcript', 16, 'bold');
  yPosition += 5;
  
  content.interviewConversation.messages.forEach((message) => {
    const speaker = message.type === 'interviewer' ? 'Interviewer' : 'You';
    addText(`${speaker}:`, 10, 'bold');
    addText(message.content);
    yPosition += 3;
  });

  // Section 4: Performance Summary
  doc.addPage();
  yPosition = margin;
  
  addText('Performance Summary', 16, 'bold');
  yPosition += 5;
  
  addText(`Overall Score: ${content.feedback.overallScore}/100`, 14, 'bold');
  yPosition += 5;
  
  addText('Category Scores:', 12, 'bold');
  content.feedback.categories.forEach((category) => {
    addText(`• ${category.name}: ${category.score}/100`);
  });
  yPosition += 10;

  // Section 5: Detailed Feedback
  addText('Interview Question Feedback', 16, 'bold');
  yPosition += 5;
  
  content.feedback.questions.forEach((q, index) => {
    if (yPosition > pageHeight - 60) {
      doc.addPage();
      yPosition = margin;
    }
    
    addText(`Q${index + 1}. ${q.question} (${q.type})`, 12, 'bold');
    yPosition += 3;
    
    if (q.answer) {
      addText('Your Answer:', 10, 'bold');
      addText(q.answer);
      yPosition += 3;
    }
    
    if (q.feedback) {
      addText('AI Feedback:', 10, 'bold');
      addText(q.feedback);
      yPosition += 3;
    }
    
    if (q.suggestions && q.suggestions.length > 0) {
      addText('Suggestions:', 10, 'bold');
      q.suggestions.forEach((suggestion) => {
        addText(`• ${suggestion}`);
      });
    }
    
    yPosition += 7;
  });

  // Add footer
  const totalPages = doc.internal.pages.length - 1; // jsPDF counts from 1
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(10);
    doc.setTextColor(107, 123, 143); // #6b7b8f
    doc.text(
      `© 2025 PrepWise. All rights reserved. Page ${i} of ${totalPages}`,
      pageWidth / 2,
      pageHeight - 10,
      { align: 'center' }
    );
  }

  // Save the PDF
  doc.save('PrepWise_Feedback_Report.pdf');
}