/**
 * ADAMCHINS PrepWise
 * Classification: ADAMCHINS-CONFIDENTIAL ▲
 * Component: ScoreBreakdownPage
 * Purpose: Display interview performance scores with animated circular gauges
 * Why Needed: Provides detailed feedback breakdown after interview completion
 */

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoggedInNavigation } from '../components/landing/LoggedInNavigation';
import { Footer } from '../components/landing/Footer';
import { useLanguage } from '../contexts/LanguageContext';

interface ScoreCategory {
  name: string;
  score: number;
  color: string;
  icon: React.ReactElement;
}

export function ScoreBreakdownPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [animatedOverallScore, setAnimatedOverallScore] = useState(0);
  const [animatedCategoryScores, setAnimatedCategoryScores] = useState<number[]>([0, 0, 0, 0]);

  const overallScore = 84;
  const categories: ScoreCategory[] = [
    {
      name: t('score.categories.experienceClarity'),
      score: 91,
      color: '#1a4d8c',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L9.19 8.62L2 9.49L7.46 14.22L5.82 21.39L12 17.77L18.18 21.38L16.54 14.21L22 9.48L14.81 8.61L12 2Z" stroke="#1a4d8c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="12" cy="12" r="4" fill="#1a4d8c"/>
        </svg>
      )
    },
    {
      name: t('score.categories.fitMotivation'),
      score: 78,
      color: '#17B0A7',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" fill="#17B0A7"/>
        </svg>
      )
    },
    {
      name: t('score.categories.technicalStrength'),
      score: 82,
      color: '#5b6ee1',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M16 18L22 12L16 6M8 6L2 12L8 18" stroke="#5b6ee1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      name: t('score.categories.communication'),
      score: 67,
      color: '#ff8c42',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="#ff8c42" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    }
  ];

  // Animate scores on mount
  useEffect(() => {
    // Animate overall score
    const overallInterval = setInterval(() => {
      setAnimatedOverallScore(prev => {
        if (prev < overallScore) {
          return Math.min(prev + 2, overallScore);
        }
        clearInterval(overallInterval);
        return prev;
      });
    }, 20);

    // Animate category scores
    categories.forEach((category, index) => {
      const categoryInterval = setInterval(() => {
        setAnimatedCategoryScores(prev => {
          const newScores = [...prev];
          if (newScores[index] < category.score) {
            newScores[index] = Math.min(newScores[index] + 2, category.score);
            return newScores;
          }
          clearInterval(categoryInterval);
          return newScores;
        });
      }, 20);
    });

    return () => {
      clearInterval(overallInterval);
    };
  }, []);

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
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%',
  };

  const titleStyle = {
    fontSize: '32px',
    fontWeight: '600',
    color: '#1a4d8c',
    marginBottom: '0.5rem',
  };

  const subtitleStyle = {
    fontSize: '16px',
    color: '#6b7b8f',
    marginBottom: '3rem',
  };

  const scoresContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '4rem',
    marginBottom: '4rem',
  };

  const overallScoreContainerStyle = {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    flex: '0 0 auto',
  };

  const overallScoreTitleStyle = {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1f2d3d',
    marginBottom: '2rem',
  };

  const overallScoreSubtitleStyle = {
    fontSize: '14px',
    color: '#6b7b8f',
    marginTop: '1rem',
  };

  const categoriesContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '3rem',
    flex: 1,
  };

  const categoryContainerStyle = {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
  };

  const categoryNameStyle = {
    fontSize: '14px',
    fontWeight: '600',
    color: '#1f2d3d',
    marginTop: '1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  };

  const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '1.5rem',
  };

  const viewDetailsButtonStyle = {
    backgroundColor: '#17B0A7',
    color: '#ffffff',
    padding: '14px 36px',
    borderRadius: '40px',
    border: 'none',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  };

  const newInterviewButtonStyle = {
    backgroundColor: 'transparent',
    color: '#1a4d8c',
    padding: '14px 36px',
    borderRadius: '40px',
    border: '2px solid #1a4d8c',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  };

  // Create circular progress SVG
  const createCircularProgress = (score: number, total: number, radius: number, strokeWidth: number, color: string) => {
    const normalizedRadius = radius - strokeWidth * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (score / total) * circumference;

    return (
      <svg height={radius * 2} width={radius * 2}>
        <circle
          stroke="#e5e7eb"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke={color}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference + ' ' + circumference}
          style={{
            strokeDashoffset,
            transition: 'stroke-dashoffset 0.5s ease',
            transform: 'rotate(-90deg)',
            transformOrigin: '50% 50%',
          }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <text
          x="50%"
          y="45%"
          textAnchor="middle"
          dominantBaseline="middle"
          style={{
            fontSize: '48px',
            fontWeight: '700',
            fill: color,
          }}
        >
          {score}
        </text>
        <text
          x="50%"
          y="60%"
          textAnchor="middle"
          dominantBaseline="middle"
          style={{
            fontSize: '16px',
            fill: '#6b7b8f',
          }}
        >
          / {total}
        </text>
      </svg>
    );
  };

  // Create semi-circular gauge SVG
  const createSemiCircularGauge = (score: number, total: number, radius: number, strokeWidth: number, color: string) => {
    const normalizedRadius = radius - strokeWidth * 2;
    const circumference = normalizedRadius * Math.PI; // Half circle
    const strokeDashoffset = circumference - (score / total) * circumference;

    return (
      <svg height={radius + 10} width={radius * 2}>
        <path
          d={`M ${strokeWidth} ${radius} A ${normalizedRadius} ${normalizedRadius} 0 0 1 ${radius * 2 - strokeWidth} ${radius}`}
          fill="transparent"
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
        />
        <path
          d={`M ${strokeWidth} ${radius} A ${normalizedRadius} ${normalizedRadius} 0 0 1 ${radius * 2 - strokeWidth} ${radius}`}
          fill="transparent"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference + ' ' + circumference}
          style={{
            strokeDashoffset,
            transition: 'stroke-dashoffset 0.5s ease',
          }}
        />
        <text
          x="50%"
          y="75%"
          textAnchor="middle"
          dominantBaseline="middle"
          style={{
            fontSize: '32px',
            fontWeight: '700',
            fill: color,
          }}
        >
          {score}
        </text>
      </svg>
    );
  };

  return (
    <div style={pageStyle}>
      <LoggedInNavigation />
      
      <div style={contentStyle}>
        <h1 style={titleStyle}>{t('score.title')}</h1>
        <p style={subtitleStyle}>{t('score.subtitle')}</p>
        
        <div style={scoresContainerStyle}>
          <div style={overallScoreContainerStyle}>
            <h2 style={overallScoreTitleStyle}>{t('score.overallScore')}</h2>
            {createCircularProgress(animatedOverallScore, 100, 120, 12, '#1a4d8c')}
            <p style={overallScoreSubtitleStyle}>{t('score.greatJob')}</p>
          </div>
          
          <div style={categoriesContainerStyle}>
            {categories.map((category, index) => (
              <div key={category.name} style={categoryContainerStyle}>
                <div style={{ marginBottom: '0.5rem' }}>{category.icon}</div>
                {createSemiCircularGauge(animatedCategoryScores[index], 100, 80, 10, category.color)}
                <p style={categoryNameStyle}>
                  {category.name}
                </p>
              </div>
            ))}
          </div>
        </div>
        
        <div style={buttonContainerStyle}>
          <button
            style={viewDetailsButtonStyle}
            onClick={() => navigate('/detailed-suggestions')}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#15a097'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#17B0A7'}
          >
            {t('score.viewDetails')}
          </button>
          
          <button
            style={newInterviewButtonStyle}
            onClick={() => navigate('/dashboard')}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#1a4d8c';
              e.currentTarget.style.color = '#ffffff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#1a4d8c';
            }}
          >
            {t('score.newInterview')}
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}