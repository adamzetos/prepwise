/**
 * ADAMCHINS PrepWise
 * Classification: ADAMCHINS-CONFIDENTIAL ▲
 * Component: DocumentUploadPage
 * Purpose: Document upload page for CV, cover letter, or job description
 * Why Needed: Collect user documents for personalized interview experience
 */

import { useState, useRef, DragEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoggedInNavigation } from '../components/landing/LoggedInNavigation';
import { ProgressIndicator } from '../components/upload/ProgressIndicator';
import { Footer } from '../components/landing/Footer';

export function DocumentUploadPage() {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const pageStyle = {
    minHeight: '100vh',
    backgroundColor: '#ffffff',
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
    padding: '0 2rem',
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
    textAlign: 'center' as const,
    maxWidth: '600px',
    marginBottom: '3rem',
    lineHeight: '1.5',
  };

  const uploadAreaStyle = {
    width: '100%',
    maxWidth: '600px',
    height: '280px',
    border: `2px dashed ${isDragging ? '#17B0A7' : '#d1d5db'}`,
    borderRadius: '12px',
    backgroundColor: isDragging ? '#f0fdfa' : '#ffffff',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    marginBottom: '1.5rem',
  };

  const iconStyle = {
    width: '48px',
    height: '48px',
    color: '#6b7b8f',
  };

  const uploadTextStyle = {
    fontSize: '16px',
    fontWeight: '500',
    color: '#1f2d3d',
  };

  const browseButtonStyle = {
    color: '#17B0A7',
    textDecoration: 'underline',
    cursor: 'pointer',
    fontSize: '16px',
  };

  const fileTypesStyle = {
    fontSize: '14px',
    color: '#6b7b8f',
  };

  const nextButtonStyle = {
    padding: '14px 48px',
    backgroundColor: uploadedFiles.length > 0 ? '#17B0A7' : '#a5b4c3',
    color: '#ffffff',
    fontSize: '16px',
    fontWeight: '600',
    border: 'none',
    borderRadius: '40px',
    cursor: uploadedFiles.length > 0 ? 'pointer' : 'not-allowed',
    transition: 'all 0.2s ease',
    marginBottom: '3rem',
  };

  const uploadedFileStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1rem',
    backgroundColor: '#f9fafb',
    borderRadius: '8px',
    marginBottom: '1rem',
  };

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const validFiles: File[] = [];
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.type === 'application/pdf' || 
            file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
            file.name.endsWith('.pdf') || 
            file.name.endsWith('.docx')) {
          validFiles.push(file);
        }
      }
      
      if (validFiles.length > 0) {
        setUploadedFiles(prev => [...prev, ...validFiles]);
      } else {
        alert('Please upload PDF or DOCX files only');
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const validFiles: File[] = [];
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.type === 'application/pdf' || 
            file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
            file.name.endsWith('.pdf') || 
            file.name.endsWith('.docx')) {
          validFiles.push(file);
        }
      }
      
      if (validFiles.length > 0) {
        setUploadedFiles(prev => [...prev, ...validFiles]);
      }
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleNext = () => {
    if (uploadedFiles.length > 0) {
      // Navigate to the CV review page
      navigate('/cv-review');
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div style={pageStyle}>
      <LoggedInNavigation />
      
      <div style={contentStyle}>
        <ProgressIndicator currentStep={1} />
        
        <h1 style={titleStyle}>Upload Your Documents</h1>
        <p style={subtitleStyle}>
          Add your CV, cover letter or job description to help Prepwise personalize your interview experience.
        </p>

        <div
          style={uploadAreaStyle}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleUploadClick}
        >
          <svg style={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M7 18a4.6 4.4 0 0 1 0-9 5 4.5 0 0 1 8.9 2.1h.1a3 3 0 0 1 0 6H7z" />
            <path d="M15 13l-3-3m0 0l-3 3m3-3v9" />
          </svg>
          
          <div style={uploadTextStyle}>
            Drag & drop to upload
          </div>
          
          <div>
            or <span style={browseButtonStyle}>browse files</span>
          </div>
          
          <div style={fileTypesStyle}>
            (PDF, DOCX)
          </div>
        </div>

        {uploadedFiles.length > 0 && (
          <div style={{ maxWidth: '600px', width: '100%', marginTop: '1.5rem' }}>
            {uploadedFiles.map((file, index) => (
              <div key={index} style={{ ...uploadedFileStyle, marginBottom: index < uploadedFiles.length - 1 ? '0.75rem' : 0 }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="#17B0A7" strokeWidth="2" fill="#e0f2fe" />
                  <path d="M14 2v6h6" stroke="#17B0A7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <line x1="16" y1="13" x2="8" y2="13" stroke="#17B0A7" strokeWidth="2" strokeLinecap="round" />
                  <line x1="16" y1="17" x2="8" y2="17" stroke="#17B0A7" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: '500', color: '#1f2d3d' }}>{file.name}</div>
                  <div style={{ fontSize: '14px', color: '#6b7b8f' }}>
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </div>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#ef4444',
                    cursor: 'pointer',
                    padding: '4px',
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />

        <button
          style={nextButtonStyle}
          onClick={handleNext}
          disabled={uploadedFiles.length === 0}
          onMouseEnter={(e) => {
            if (uploadedFiles.length > 0) {
              e.currentTarget.style.backgroundColor = '#15a097';
            }
          }}
          onMouseLeave={(e) => {
            if (uploadedFiles.length > 0) {
              e.currentTarget.style.backgroundColor = '#17B0A7';
            }
          }}
        >
          Next
        </button>
      </div>

      <Footer />
    </div>
  );
}