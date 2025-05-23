# PrepWise UX/UI Design Summary

## 🎯 Project Overview

PrepWise is an AI-driven interview preparation platform designed for university students. The platform provides personalized interview practice through AI simulation, helping students build confidence and improve their interview skills for job opportunities.

## 📌 Design Philosophy

### Core Principles
- **Ultra-Minimalist**: Maximum whitespace, minimal text, single focus per screen
- **Professional yet Approachable**: Institutional credibility with student-friendly interface
- **Clean & Simple**: No decorative elements, only essential information
- **Accessibility First**: WCAG 2.1 AA compliant, clear visual hierarchy

### Design Inspiration
- Combined institutional trustworthiness (British Hospital/Charitable Fund websites)
- Modern EdTech aesthetics with extreme minimalism
- Focus on content and user action over decoration

## 🎨 Visual Identity

### Color Palette
- **Primary Colors**
  - Deep Blue (#1A4D8C) - Headers, primary text
  - Teal Accent (#17B0A7) - CTAs, progress indicators
  - Professional Gray (#F5F7FA) - Backgrounds
  
- **Secondary Colors**
  - Supportive Green (#3CB371) - Success states
  - Alert Orange (#FF9D5C) - Warnings, end actions
  - Neutral Slate (#546E7A) - Secondary text

### Typography
- **Font Family**: Inter or system-ui
- **Sizes**: 
  - Large headers: 24px
  - Question text: 20px
  - Body: 16px
  - Labels: 14px
  - Small text: 12px

### Components
- **Cards**: White background, subtle shadow (0 2px 8px rgba(0,0,0,0.06)), 12px radius
- **Buttons**: Flat design, 4px radius, 44px height
- **Inputs**: Light border (#E8ECF0), minimal styling
- **Progress bars**: 4px height, teal fill

## 📱 Key Pages Designed

### 1. Landing Page
Minimal hero section with single CTA, three feature cards, essential navigation only

### 2. Authentication (Login/Register)
Centered white card design, minimal form fields, single action focus

### 3. Student Dashboard
Welcome message, prominent "Start Interview" button, recent interviews list

### 4. Document Upload
Simple drag-drop interface, no unnecessary tips or descriptions

### 5. Job Setup
Three essential inputs, interview type selection, single start button

### 6. Interview Simulation
- Clean white card on gray background
- Progress indicator with timer
- Large, readable question text
- Text/Voice toggle
- Single response area
- One submit button

### 7. Feedback Views
- Summary: Score with performance bars
- Detailed: Question-by-question analysis with improvements

### 8. Admin Interfaces
- Organization Admin: Simple table view with search
- Settings: Left menu navigation, form-based content

## 🔧 Technical Specifications

### Layout
- Desktop-first responsive design
- Max content width: 880px for main cards
- Consistent spacing: 16px between elements
- Padding: 48px desktop, 24px mobile

### Interactions
- Subtle hover states (opacity changes)
- Quick transitions (200ms)
- No bouncy animations
- Clear focus states for accessibility

## 📁 Deliverables

### UXPilot Files
1. **prepwise_context.md** - Design system and principles
2. **prepwise_page_descriptions.md** - All 12 page descriptions
3. **prepwise_interview_simulation_page.md** - Detailed interview page specs

### Documentation
- Visual Identity Handbook
- UX/UI Design Principles
- Git workflow rules
- Prompt rules for development

## 🚀 Implementation Notes

### For Bubble.io Development
- Use custom CSS for consistent styling
- Create reusable components for cards and buttons
- Implement responsive workflows
- Maintain design token consistency

### Design Tokens
```css
/* Colors */
--primary-blue: #1A4D8C;
--teal-accent: #17B0A7;
--bg-gray: #F5F7FA;
--text-secondary: #546E7A;

/* Spacing */
--space-sm: 16px;
--space-md: 24px;
--space-lg: 48px;

/* Shadows */
--shadow-card: 0 2px 8px rgba(0,0,0,0.06);
```

## ✅ Design Status

The UX/UI design phase is complete with:
- Comprehensive design system established
- All core user journeys mapped
- 12 key pages fully specified
- Minimalist aesthetic achieved
- Ready for Bubble.io implementation

The design successfully balances professional credibility with approachability, creating an environment where students feel supported while practicing for their career opportunities.

---

**Last Updated**: November 23, 2024
**Design Lead**: UXPilot AI-Assisted Design
**Platform**: PrepWise - AI-Powered Interview Preparation