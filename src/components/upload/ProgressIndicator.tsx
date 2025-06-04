/**
 * ADAMCHINS PrepWise
 * Classification: ADAMCHINS-CONFIDENTIAL ▲
 * Component: ProgressIndicator
 * Purpose: Shows the current step in the document upload process
 * Why Needed: Visual feedback for multi-step process
 */

import { useLanguage } from '../../contexts/LanguageContext';

interface ProgressIndicatorProps {
  currentStep: 1 | 2 | 3;
}

export function ProgressIndicator({ currentStep }: ProgressIndicatorProps) {
  const { t } = useLanguage();
  const steps = [
    { number: 1, label: t('upload.progress.upload') },
    { number: 2, label: t('upload.progress.review') },
    { number: 3, label: t('upload.progress.interview') },
  ];

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '3rem 0',
    gap: '2rem',
  };

  const stepContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '2rem',
  };

  const getStepStyle = (stepNumber: number) => {
    const isActive = stepNumber === currentStep;
    const isPast = stepNumber < currentStep;
    
    return {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
    };
  };

  const getCircleStyle = (stepNumber: number) => {
    const isActive = stepNumber === currentStep;
    const isPast = stepNumber < currentStep;
    
    return {
      width: '32px',
      height: '32px',
      borderRadius: '50%',
      backgroundColor: isActive || isPast ? '#17B0A7' : '#e5e7eb',
      color: isActive || isPast ? '#ffffff' : '#6b7b8f',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '14px',
      fontWeight: '600',
    };
  };

  const getLabelStyle = (stepNumber: number) => {
    const isActive = stepNumber === currentStep;
    
    return {
      fontSize: '16px',
      fontWeight: isActive ? '600' : '400',
      color: isActive ? '#1f2d3d' : '#6b7b8f',
    };
  };

  const lineStyle = {
    width: '120px',
    height: '1px',
    backgroundColor: '#e5e7eb',
  };

  return (
    <div style={containerStyle}>
      {steps.map((step, index) => (
        <div key={step.number} style={stepContainerStyle}>
          <div style={getStepStyle(step.number)}>
            <div style={getCircleStyle(step.number)}>
              {step.number}
            </div>
            <span style={getLabelStyle(step.number)}>
              {step.label}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div style={lineStyle}></div>
          )}
        </div>
      ))}
    </div>
  );
}