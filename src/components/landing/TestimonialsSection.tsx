/**
 * ADAMCHINS PrepWise
 * Classification: ADAMCHINS-CONFIDENTIAL ▲
 * Component: Testimonials Section
 * Purpose: Display user testimonials and social proof
 * Why Needed: Build trust and credibility with potential users
 */

import { useState } from 'react';

const testimonials = [
  {
    id: 1,
    quote: "PrepWise transformed how I prepare for interviews. The AI-powered mock interviews helped me identify and improve my weak areas. I landed my dream job at a Fortune 500 company!",
    author: "Sarah Chen",
    title: "Software Engineer",
    company: "Microsoft",
    rating: 5
  },
  {
    id: 2,
    quote: "The personalized study plans and real-time feedback made all the difference. I felt confident and well-prepared walking into every interview. Highly recommend PrepWise!",
    author: "Michael Rodriguez",
    title: "Product Manager",
    company: "Google",
    rating: 5
  },
  {
    id: 3,
    quote: "As a career changer, PrepWise gave me the confidence I needed. The comprehensive question bank and detailed analytics helped me understand exactly what interviewers were looking for.",
    author: "Emily Johnson",
    title: "Data Scientist",
    company: "Amazon",
    rating: 5
  }
];

export function TestimonialsSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const sectionStyle = {
    backgroundColor: '#f7f9fc',
    padding: '100px 0',
  };

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 2rem',
  };

  const headerStyle = {
    textAlign: 'center' as const,
    marginBottom: '4rem',
  };

  const titleStyle = {
    fontSize: '44px',
    fontWeight: '800',
    color: '#1f2d3d',
    marginBottom: '1rem',
    letterSpacing: '-0.5px',
  };

  const subtitleStyle = {
    fontSize: '20px',
    color: '#6b7b8f',
    maxWidth: '600px',
    margin: '0 auto',
    lineHeight: '1.6',
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
    gap: '2rem',
  };

  const getCardStyle = (index: number) => ({
    backgroundColor: '#ffffff',
    borderRadius: '20px',
    padding: '2.5rem',
    boxShadow: hoveredCard === index 
      ? '0 24px 48px rgba(0, 0, 0, 0.15)' 
      : '0 4px 16px rgba(0, 0, 0, 0.06)',
    transition: 'all 0.3s ease',
    transform: hoveredCard === index ? 'translateY(-8px)' : 'translateY(0)',
    cursor: 'pointer',
    position: 'relative' as const,
    border: '1px solid rgba(0, 0, 0, 0.04)',
  });

  const quoteStyle = {
    fontSize: '16px',
    color: '#4b5563',
    lineHeight: '1.8',
    marginBottom: '2rem',
    fontStyle: 'italic' as const,
    position: 'relative' as const,
    paddingLeft: '1.5rem',
  };

  const quoteMarkStyle = {
    position: 'absolute' as const,
    left: '0',
    top: '-10px',
    fontSize: '48px',
    color: '#1a4d8c',
    opacity: 0.2,
    fontFamily: 'Georgia, serif',
    lineHeight: '1',
  };

  const ratingStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '1.5rem',
    gap: '4px',
  };

  const starStyle = {
    color: '#fbbf24',
    fontSize: '20px',
  };

  const authorStyle = {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1f2d3d',
    marginBottom: '0.25rem',
  };

  const roleStyle = {
    fontSize: '14px',
    color: '#6b7b8f',
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: rating }, (_, index) => (
      <span key={index} style={starStyle}>★</span>
    ));
  };

  return (
    <section style={sectionStyle}>
      <div style={containerStyle}>
        <div style={headerStyle}>
          <h2 style={titleStyle}>
            What Our Users Say
          </h2>
          <p style={subtitleStyle}>
            Join thousands of successful candidates who landed their dream jobs with PrepWise
          </p>
        </div>

        <div style={gridStyle}>
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              style={getCardStyle(testimonial.id)}
              onMouseEnter={() => setHoveredCard(testimonial.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div style={ratingStyle}>
                {renderStars(testimonial.rating)}
              </div>
              
              <p style={quoteStyle}>
                <span style={quoteMarkStyle}>"</span>
                {testimonial.quote}
              </p>
              
              <div style={{ textAlign: 'center' }}>
                <h4 style={authorStyle}>{testimonial.author}</h4>
                <p style={roleStyle}>
                  {testimonial.title} at {testimonial.company}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}