/**
 * ADAMCHINS PrepWise
 * Classification: ADAMCHINS-CONFIDENTIAL ▲
 * Component: AdminDashboardPage
 * Purpose: Admin dashboard showing platform statistics and usage
 * Why Needed: Provides administrators with insights into platform usage and performance
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminNavigation } from '../components/admin/AdminNavigation';
import { Footer } from '../components/landing/Footer';

interface StatCard {
  title: string;
  value: string;
  change: string;
  icon: string;
  chartData: number[];
}

interface ChartDataPoint {
  day: string;
  students: number;
  interviews: number;
}

export function AdminDashboardPage() {
  const [chartProgress, setChartProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Animate the line chart
    const animationDuration = 1500; // 1.5 seconds
    const startTime = Date.now();
    
    const animateChart = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / animationDuration, 1);
      
      setChartProgress(progress);
      
      if (progress < 1) {
        requestAnimationFrame(animateChart);
      }
    };
    
    requestAnimationFrame(animateChart);
  }, []);

  const statCards: StatCard[] = [
    {
      title: 'Total Students',
      value: '1,245',
      change: '31%',
      icon: '/icons/Total_Students.svg',
      chartData: [65, 75, 80, 95, 85, 88, 92]
    },
    {
      title: 'Total Interviews',
      value: '3,920',
      change: '31%',
      icon: '/icons/Total_Interviews.svg',
      chartData: [70, 80, 85, 95, 90, 88, 95]
    },
    {
      title: 'Avg Score',
      value: '82',
      change: '/100',
      icon: '/icons/Avg_Score.svg',
      chartData: [78, 80, 79, 82, 83, 81, 82]
    }
  ];

  const chartData: ChartDataPoint[] = [
    { day: 'Thu', students: 80, interviews: 42 },
    { day: 'Fri', students: 102, interviews: 65 },
    { day: 'Sat', students: 98, interviews: 52 },
    { day: 'Sun', students: 110, interviews: 80 },
    { day: 'Mon', students: 150, interviews: 120 },
    { day: 'Tue', students: 130, interviews: 100 },
    { day: 'Wed', students: 142, interviews: 110 }
  ];

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
    maxWidth: '1400px',
    margin: '0 auto',
    width: '100%',
  };

  const headerSectionStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '2rem',
  };

  const inviteButtonStyle = {
    backgroundColor: '#17B0A7',
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

  const statsGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '2rem',
    marginBottom: '3rem',
  };

  const statCardStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '2rem',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  };

  const statHeaderStyle = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '1rem',
    marginBottom: '1rem',
  };

  const iconContainerStyle = {
    width: '40px',
    height: '40px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f3f4f6',
  };

  const statTitleStyle = {
    fontSize: '14px',
    color: '#6b7b8f',
    fontWeight: '500',
  };

  const statContentStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
    marginTop: '0.5rem',
  };

  const statValueContainerStyle = {
    display: 'flex',
    alignItems: 'baseline',
    gap: '0.5rem',
    flex: '0 0 auto',
  };

  const statValueStyle = {
    fontSize: '32px',
    fontWeight: '700',
    color: '#1a4d8c',
  };

  const statChangeStyle = {
    fontSize: '14px',
    color: '#17B0A7',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  };

  const miniChartContainerStyle = {
    height: '40px',
    flex: 1,
    display: 'flex',
    alignItems: 'center',
  };

  const chartContainerStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '2rem',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  };

  const chartHeaderStyle = {
    marginBottom: '2rem',
  };

  const chartTitleStyle = {
    fontSize: '20px',
    fontWeight: '600',
    color: '#1a4d8c',
    marginBottom: '0.5rem',
  };

  const chartSubtitleStyle = {
    fontSize: '14px',
    color: '#6b7b8f',
  };

  const legendStyle = {
    display: 'flex',
    gap: '2rem',
    justifyContent: 'center',
    marginBottom: '1.5rem',
  };

  const legendItemStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '14px',
    color: '#6b7b8f',
  };

  const legendDotStyle = (color: string) => ({
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: color,
  });

  // Create mini sparkline chart
  const createSparkline = (data: number[]) => {
    const width = 100;
    const height = 40;
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min;
    
    const points = data.map((value, index) => {
      const x = (index / (data.length - 1)) * width;
      const y = height - ((value - min) / range) * height;
      return `${x},${y}`;
    }).join(' ');

    return (
      <svg width={width} height={height} style={{ width: '100%', height: '100%' }}>
        <polyline
          points={points}
          fill="none"
          stroke="#17B0A7"
          strokeWidth="2"
        />
      </svg>
    );
  };

  // Create main line chart with animation
  const createLineChart = () => {
    const width = 800;
    const height = 300;
    const padding = { top: 20, right: 40, bottom: 40, left: 60 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    const maxValue = 160;
    const yScale = (value: number) => chartHeight - (value / maxValue) * chartHeight;
    const xScale = (index: number) => (index / (chartData.length - 1)) * chartWidth;

    // Calculate the visible portion of the path based on animation progress
    const visibleDataPoints = Math.floor(chartData.length * chartProgress);
    const visibleData = chartData.slice(0, visibleDataPoints + 1);

    const studentsPath = visibleData
      .map((point, index) => `${xScale(index)},${yScale(point.students)}`)
      .join(' ');

    const interviewsPath = visibleData
      .map((point, index) => `${xScale(index)},${yScale(point.interviews)}`)
      .join(' ');

    return (
      <svg width={width} height={height} style={{ width: '100%', height: 'auto' }}>
        <g transform={`translate(${padding.left}, ${padding.top})`}>
          {/* Y-axis lines and labels */}
          {[0, 20, 40, 60, 80, 100, 120, 140, 160].map(value => (
            <g key={value}>
              <line
                x1={0}
                y1={yScale(value)}
                x2={chartWidth}
                y2={yScale(value)}
                stroke="#f3f4f6"
                strokeWidth="1"
              />
              <text
                x={-10}
                y={yScale(value) + 5}
                textAnchor="end"
                fontSize="12"
                fill="#6b7b8f"
              >
                {value}
              </text>
            </g>
          ))}

          {/* X-axis labels */}
          {chartData.map((point, index) => (
            <text
              key={point.day}
              x={xScale(index)}
              y={chartHeight + 25}
              textAnchor="middle"
              fontSize="12"
              fill="#6b7b8f"
            >
              {point.day}
            </text>
          ))}

          {/* Lines */}
          <polyline
            points={studentsPath}
            fill="none"
            stroke="#1a4d8c"
            strokeWidth="3"
          />
          <polyline
            points={interviewsPath}
            fill="none"
            stroke="#17B0A7"
            strokeWidth="3"
          />

          {/* Data points with animation */}
          {visibleData.map((point, index) => (
            <g key={`points-${index}`}>
              <circle
                cx={xScale(index)}
                cy={yScale(point.students)}
                r="5"
                fill="#1a4d8c"
                style={{
                  opacity: chartProgress,
                  transition: 'opacity 0.3s ease'
                }}
              />
              <circle
                cx={xScale(index)}
                cy={yScale(point.interviews)}
                r="5"
                fill="#17B0A7"
                style={{
                  opacity: chartProgress,
                  transition: 'opacity 0.3s ease'
                }}
              />
            </g>
          ))}
        </g>
      </svg>
    );
  };

  return (
    <div style={pageStyle}>
      <AdminNavigation />
      
      <div style={contentStyle}>
        <div style={headerSectionStyle}>
          <button
            style={inviteButtonStyle}
            onClick={() => navigate('/admin/students')}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#15a097'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#17B0A7'}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="8.5" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="20" y1="8" x2="20" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="23" y1="11" x2="17" y2="11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Invite Students
          </button>
        </div>
        
        <div style={statsGridStyle}>
          {statCards.map((card) => (
            <div key={card.title} style={statCardStyle}>
              <div style={statHeaderStyle}>
                <div style={iconContainerStyle}>
                  <img 
                    src={card.icon} 
                    alt={card.title}
                    style={{ width: '24px', height: '24px' }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={statTitleStyle}>{card.title}</p>
                </div>
              </div>
              
              <div style={statContentStyle}>
                <div style={statValueContainerStyle}>
                  <span style={statValueStyle}>{card.value}</span>
                  <span style={statChangeStyle}>
                    {card.title !== 'Avg Score' && (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M7 17L17 7M17 7H7M17 7V17" stroke="#17B0A7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                    {card.change}
                  </span>
                </div>
                
                <div style={miniChartContainerStyle}>
                  {createSparkline(card.chartData)}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={chartContainerStyle}>
          <div style={chartHeaderStyle}>
            <h2 style={chartTitleStyle}>Platform Usage (Last 7 Days)</h2>
            <p style={chartSubtitleStyle}>Daily active students & interviews</p>
          </div>
          
          <div style={legendStyle}>
            <div style={legendItemStyle}>
              <div style={legendDotStyle('#1a4d8c')} />
              <span>Active Students</span>
            </div>
            <div style={legendItemStyle}>
              <div style={legendDotStyle('#17B0A7')} />
              <span>Interviews</span>
            </div>
          </div>
          
          <div style={{ overflowX: 'auto' }}>
            {createLineChart()}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}