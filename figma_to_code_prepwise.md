# PrepWise: Figma to Code Import Guide
**Classification: ADAMCHINS-CONFIDENTIAL ▲**
**Version: 1.0 - Based on Landing Page Import Experience**

## 🎯 Overview
This guide documents the optimal process for importing Figma designs into React code, based on lessons learned from the landing page implementation.

## 📋 Key Learnings from Landing Page Import

### What Went Wrong:
1. **Started coding before analyzing design** → Created components that didn't exist (Testimonials, extra CTA)
2. **Used placeholder assets** → Had to redo with actual Figma exports
3. **Wrong initial styling** → Transparent nav instead of white, wrong colors
4. **CSS framework issues** → Tailwind wasn't applying styles properly
5. **Multiple iterations** → Had to adjust layout constraints several times

### What We Should Have Done:
1. **Analyze design first** → Study the PNG/Figma thoroughly
2. **Export all assets upfront** → Get all images, icons, logos before coding
3. **Use inline styles** → Avoid CSS framework dependencies
4. **Match design exactly** → Colors, spacing, text content
5. **Test frequently** → Check each component as built

---

## 🚀 OPTIMIZED IMPORT PROCESS

### PHASE 1: Pre-Development (30 min)
**DO THIS BEFORE WRITING ANY CODE!**

#### 1.1 Design Analysis Checklist
```markdown
□ Open Figma design AND exported PNG side-by-side
□ List ALL sections/components visible
□ Note exact text content (headlines, buttons, etc.)
□ Identify background images/patterns
□ Count and name all icons needed
□ Check for overlapping elements
□ Note any animations/interactions
```

#### 1.2 Asset Export Checklist
```markdown
□ Logo files:
  - /public/logo.svg (main logo)
  - /public/icons/favicon.svg (browser tab icon)

□ Images:
  - Hero backgrounds
  - Feature images
  - Any other photos

□ Icons:
  - Export as SVG
  - Name clearly (e.g., ai-practice-icon.svg)
  - Save to /public/icons/

□ Design specs:
  - Colors (get exact hex codes)
  - Fonts (family, sizes, weights)
  - Spacing (margins, paddings)
  - Border radius values
```

#### 1.3 Create Import Plan
```markdown
## Page: [Page Name]
## Figma Frame: [Frame Name]

### Components Needed:
1. Navigation - [white/transparent], [fixed/relative]
2. Hero Section - [height], [background type]
3. [Other sections...]
4. Footer - [simple/complex]

### Special Requirements:
- [ ] Cards overlap sections
- [ ] Full width layout
- [ ] Specific viewport constraints
```

---

### PHASE 2: Project Setup (10 min)

#### 2.1 File Structure
```typescript
// Create files in this order:
src/
├── pages/
│   └── [PageName].tsx          // Main page container
├── components/[pagename]/
│   ├── Navigation.tsx          // If different from global nav
│   ├── HeroSection.tsx         
│   ├── [OtherSections].tsx     
│   └── Footer.tsx              // If different from global footer
```

#### 2.2 Base Page Template
```typescript
export function [PageName]() {
  const wrapperStyle = {
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    display: 'flex',
    justifyContent: 'center',
  };

  const pageStyle = {
    maxWidth: '1200px', // or '100%' for full width
    width: '100%',
    minHeight: '100vh',
    backgroundColor: '#ffffff',
    margin: '0 auto',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    WebkitFontSmoothing: 'antialiased' as const,
    MozOsxFontSmoothing: 'grayscale' as const,
  };

  return (
    <div style={wrapperStyle}>
      <div style={pageStyle}>
        {/* Components will go here */}
      </div>
    </div>
  );
}
```

---

### PHASE 3: Component Development (2-3 hours)

#### 3.1 Development Order
**ALWAYS BUILD IN THIS ORDER:**
1. Navigation (if unique to page)
2. Hero/Header Section
3. Main Content Sections (top to bottom)
4. Footer (if unique to page)

#### 3.2 Component Template
```typescript
/**
 * ADAMCHINS PrepWise
 * Classification: ADAMCHINS-CONFIDENTIAL ▲
 * Component: [Component Name]
 * Purpose: [What it does]
 * Why Needed: [Business reason]
 */

export function [ComponentName]() {
  // All styles as objects
  const sectionStyle = {
    // Use exact values from Figma
  };

  return (
    <section style={sectionStyle}>
      {/* Content */}
    </section>
  );
}
```

#### 3.3 Style Guidelines
```typescript
// ✅ DO: Use inline styles
const style = {
  backgroundColor: '#ffffff',
  padding: '20px',
};

// ❌ DON'T: Use className
<div className="bg-white p-5">

// ✅ DO: Use exact Figma values
height: '65vh',
marginTop: '-100px',

// ❌ DON'T: Guess values
height: '500px', // If Figma shows 65vh
```

---

### PHASE 4: Asset Integration (30 min)

#### 4.1 Images
```typescript
// Background images
backgroundImage: 'url("/hero-bg.jpg")',

// Inline images
<img src="/logo.svg" alt="PrepWise" style={logoStyle} />

// Icons from Figma
<img src="/icons/ai-practice-icon.svg" alt="AI Practice" />
```

#### 4.2 Common Issues & Solutions
| Issue | Solution |
|-------|----------|
| Image not showing | Check file path, ensure starts with `/` |
| Icon wrong size | Set explicit width/height in style |
| Background not covering | Use `backgroundSize: 'cover'` |

---

### PHASE 5: Layout Refinement (1 hour)

#### 5.1 Responsive Considerations
```typescript
// Desktop-first approach
const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '2rem',
};

// With responsive option
gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
```

#### 5.2 Common Layout Patterns

**Overlapping Sections:**
```typescript
// Card section overlapping hero
const sectionStyle = {
  marginTop: '-100px',  // Negative margin
  position: 'relative',
  zIndex: 20,          // Higher than hero
};
```

**Fixed Proportions:**
```typescript
// Hero 65%, Features 35%
heroStyle: { height: '65vh' }
featuresStyle: { height: '35vh' }
```

**Full Browser Width:**
```typescript
const pageStyle = {
  maxWidth: '100%',  // Instead of 1200px
  width: '100%',
};
```

---

## 📝 Import Checklist Template

```markdown
# Page Import: [Page Name]
Date: [Date]
Figma Link: [Link]

## Pre-Import
- [ ] Analyzed Figma design thoroughly
- [ ] Exported all required assets
- [ ] Created component list
- [ ] Noted special layout requirements

## Assets
- [ ] Logo: /public/logo.svg
- [ ] Favicon: /public/icons/favicon.svg
- [ ] Hero image: ________________
- [ ] Icons: 
  - [ ] ________________
  - [ ] ________________
  - [ ] ________________

## Components Built
- [ ] Navigation
- [ ] Hero Section
- [ ] [Component 3]
- [ ] [Component 4]
- [ ] Footer

## Testing
- [ ] Matches Figma design exactly
- [ ] All assets loading correctly
- [ ] Layout constraints working
- [ ] Hover states functional
- [ ] Links working

## Final Adjustments
- [ ] _______________________
- [ ] _______________________
```

---

## 🚨 Critical Success Factors

### 1. **ALWAYS EXPORT ASSETS FIRST**
Never start coding until all images/icons are exported and saved.

### 2. **MATCH FIGMA EXACTLY**
- Same text content
- Same colors (use exact hex)
- Same spacing
- Same layout

### 3. **USE INLINE STYLES**
Avoids CSS framework issues and ensures predictable rendering.

### 4. **TEST FREQUENTLY**
Check after each component - don't wait until the end.

### 5. **COMMUNICATE NEEDS**
If you need manual asset exports, stop and ask immediately.

---

## 🛠 Troubleshooting Guide

| Problem | Solution |
|---------|----------|
| Layout broken | Check parent container styles, ensure no overflow:hidden |
| Styles not applying | Use inline styles, not className |
| Wrong colors | Get exact hex from Figma, not approximate |
| Spacing issues | Use exact px/rem values from Figma |
| Assets not loading | Check file paths start with `/` |

---

## 📚 For Next Pages

When importing remaining PrepWise pages:
1. **One page at a time** - Don't rush
2. **Follow this guide** - Every step
3. **Export assets first** - Before any coding
4. **Ask when stuck** - Don't guess

### Page Import Order:
1. ✅ Landing Page (Complete)
2. ⏳ Login/Registration Pages
3. ⏳ Job Role Selection
4. ⏳ Document Upload & Interview
5. ⏳ CV & Cover Letter Review
6. ⏳ Interview Simulation
7. ⏳ Interview Summary & Suggestions
8. ⏳ Admin Dashboard
9. ⏳ Student Management

---

**Remember**: Following this process will save hours of rework and ensure pixel-perfect implementation on the first try!