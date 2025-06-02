# PrepWise Landing Page - Layout Adjustment Guide
**Classification: ADAMCHINS-CONFIDENTIAL ▲**

## Overview
This guide shows you exactly where to modify each element's size and position in the PrepWise landing page.

## File Structure
```
src/
├── pages/
│   └── LandingPage.tsx         # Main page container and overall layout
├── components/landing/
│   ├── Navigation.tsx          # Top navigation bar
│   ├── HeroSection.tsx         # Hero section with background image
│   ├── FeaturesSection.tsx     # Three feature cards section
│   └── Footer.tsx              # Footer with logo and social links
```

---

## 1. OVERALL PAGE CONTAINER
**File**: `/src/pages/LandingPage.tsx`

### Wrapper (Gray background container)
```typescript
const wrapperStyle = {
  minHeight: '100vh',              // Full viewport height
  backgroundColor: '#f5f5f5',      // Gray background color
  display: 'flex',
  justifyContent: 'center',
};
```

### Page Container (White content area)
```typescript
const pageStyle = {
  maxWidth: '1200px',              // ← CHANGE: Maximum width of content
  width: '100%',                   // Full width up to maxWidth
  height: '100vh',                 // ← CHANGE: Total page height (100vh = full viewport)
  backgroundColor: '#ffffff',      // White background
  margin: '0 auto',                // Center horizontally
  boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)', // Page shadow
  position: 'relative',
  overflow: 'hidden',              // Hide content that exceeds container
};
```

---

## 2. NAVIGATION BAR
**File**: `/src/components/landing/Navigation.tsx`

### Navigation Container
```typescript
const navStyle = {
  position: 'relative',            // ← CHANGE to 'fixed' for sticky nav
  backgroundColor: '#ffffff',      // ← CHANGE: Background color
  padding: '1.25rem 0',           // ← CHANGE: Vertical padding (height)
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)', // Bottom shadow
};
```

### Logo Size
```typescript
const logoImgStyle = {
  height: '32px',                  // ← CHANGE: Logo height
  width: 'auto',                   // Maintain aspect ratio
};
```

### Menu Spacing
```typescript
const menuStyle = {
  display: 'flex',
  gap: '2rem',                     // ← CHANGE: Space between menu items
  alignItems: 'center',
};
```

---

## 3. HERO SECTION
**File**: `/src/components/landing/HeroSection.tsx`

### Hero Container
```typescript
const sectionStyle = {
  position: 'relative',
  height: '65vh',                  // ← CHANGE: Hero height (65% of viewport)
  display: 'flex',
  alignItems: 'center',            // Vertical alignment
  justifyContent: 'center',        // Horizontal alignment
  overflow: 'visible',             // Allow cards to overlap
};
```

### Background Image
```typescript
const backgroundStyle = {
  backgroundImage: 'url("/hero-bg.jpg")', // ← CHANGE: Image path
  backgroundSize: 'cover',         // ← CHANGE: 'cover', 'contain', or specific size
  backgroundPosition: 'center',    // ← CHANGE: Position (e.g., 'top', '50% 20%')
};
```

### Dark Overlay
```typescript
const overlayStyle = {
  backgroundColor: 'rgba(30, 58, 138, 0.7)', // ← CHANGE: Color and opacity
};
```

### Content Width
```typescript
const contentStyle = {
  maxWidth: '800px',               // ← CHANGE: Max width of text content
  padding: '0 2rem',               // ← CHANGE: Horizontal padding
};
```

### Title Size
```typescript
const headingStyle = {
  fontSize: '48px',                // ← CHANGE: Title size
  marginBottom: '1.5rem',          // ← CHANGE: Space below title
};
```

### CTA Button
```typescript
const ctaButtonStyle = {
  backgroundColor: '#17B0A7',      // ← CHANGE: Button color
  padding: '12px 24px 12px 20px',  // ← CHANGE: Button padding (height/width)
  borderRadius: '40px',            // ← CHANGE: Corner radius
  fontSize: '15px',                // ← CHANGE: Text size
};
```

---

## 4. FEATURES SECTION (3 Cards)
**File**: `/src/components/landing/FeaturesSection.tsx`

### Section Container
```typescript
const sectionStyle = {
  backgroundColor: '#ffffff',      // ← CHANGE: Background color
  height: '35vh',                  // ← CHANGE: Section height (35% of viewport)
  marginTop: '-100px',             // ← CHANGE: Overlap amount (negative = up)
  position: 'relative',
  zIndex: 20,                      // Layer above hero
};
```

### Cards Container
```typescript
const containerStyle = {
  maxWidth: '1200px',              // ← CHANGE: Max width of cards area
  padding: '0 2rem',               // ← CHANGE: Horizontal padding
};
```

### Cards Grid
```typescript
const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', // ← CHANGE: Min card width
  gap: '2rem',                     // ← CHANGE: Space between cards
};
```

### Individual Card
```typescript
const cardStyle = {
  backgroundColor: '#ffffff',      // ← CHANGE: Card background
  borderRadius: '12px',            // ← CHANGE: Card corner radius
  padding: '2.5rem',               // ← CHANGE: Card padding
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)', // ← CHANGE: Card shadow
};
```

### Icon Size
```typescript
const iconStyle = {
  width: '48px',                   // ← CHANGE: Icon width
  height: '48px',                  // ← CHANGE: Icon height
  margin: '0 auto 1.5rem',         // ← CHANGE: Space below icon
};
```

---

## 5. FOOTER
**File**: `/src/components/landing/Footer.tsx`

### Footer Container
```typescript
const footerStyle = {
  backgroundColor: '#ffffff',      // ← CHANGE: Background color
  borderTop: '1px solid #e5e7eb',  // ← CHANGE: Top border
  padding: '1rem 0',               // ← CHANGE: Vertical padding (height)
  position: 'absolute',
  bottom: 0,                       // Stick to bottom
};
```

### Footer Logo
```typescript
const logoImgStyle = {
  height: '24px',                  // ← CHANGE: Logo height in footer
  width: 'auto',
};
```

### Social Icons Size
```typescript
// In the SVG elements:
width="20"                         // ← CHANGE: Icon width
height="20"                        // ← CHANGE: Icon height
```

---

## COMMON ADJUSTMENTS

### To Change Element Spacing:
- **Padding**: Internal spacing (inside the element)
  - `padding: '20px'` - All sides
  - `padding: '20px 40px'` - Vertical | Horizontal
  - `paddingTop`, `paddingBottom`, `paddingLeft`, `paddingRight` - Individual sides

- **Margin**: External spacing (outside the element)
  - `margin: '20px'` - All sides
  - `marginTop: '-100px'` - Negative margin for overlap

### To Change Sizes:
- **Width**: `width: '100%'`, `maxWidth: '1200px'`, `minWidth: '300px'`
- **Height**: `height: '65vh'`, `minHeight: '500px'`, `maxHeight: '768px'`
- **Viewport Units**: 
  - `vh` = % of viewport height (e.g., `65vh` = 65% of screen height)
  - `vw` = % of viewport width

### To Change Positions:
- **Position Types**:
  - `relative` - Normal flow
  - `absolute` - Positioned relative to parent
  - `fixed` - Positioned relative to viewport
- **Position Values**: `top`, `bottom`, `left`, `right`
- **Z-Index**: Higher number = on top (e.g., `zIndex: 20`)

### To Change Colors:
- **Background**: `backgroundColor: '#ffffff'`
- **Text**: `color: '#1f2d3d'`
- **With Transparency**: `rgba(30, 58, 138, 0.7)` - Last value is opacity (0-1)

---

## QUICK REFERENCE

| Element | File | Key Style Property |
|---------|------|-------------------|
| Page max width | LandingPage.tsx | `pageStyle.maxWidth` |
| Page height | LandingPage.tsx | `pageStyle.height` |
| Navigation height | Navigation.tsx | `navStyle.padding` |
| Hero height | HeroSection.tsx | `sectionStyle.height` |
| Cards overlap | FeaturesSection.tsx | `sectionStyle.marginTop` |
| Cards section height | FeaturesSection.tsx | `sectionStyle.height` |
| Footer height | Footer.tsx | `footerStyle.padding` |

---

## TIPS
1. Use browser DevTools to test values live before changing code
2. For responsive design, use `minmax()` in grid layouts
3. Use `calc()` for dynamic calculations: `height: 'calc(100vh - 60px)'`
4. Always save and refresh to see changes
5. The development server auto-reloads on file save