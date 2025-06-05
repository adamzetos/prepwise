# CLAUDE.md - PrepWise Project Guidelines
**Classification: ADAMCHINS-CONFIDENTIAL ▲**
**Last Updated: January 2025 - Full Production Deployment with OpenAI Integration**

## 🎉 PROJECT COMPLETION SUMMARY

### What We Achieved Today
We successfully imported and built the ENTIRE PrepWise website from Figma designs:

#### Pages Completed (15 Total) ✅
1. **Landing Page** - Hero, features, navigation, footer
2. **Login Page** - Split layout with form validation
3. **Register Page** - Reused components from login
4. **Logged-in Landing Page** - User dashboard entry
5. **Document Upload Page** - Multi-file drag & drop support
6. **Interview Sessions Page** - History table with scores
7. **CV Review Page** - Tabbed interface with AI feedback
8. **Job Role Selection Page** - Icon-based selection with tooltips
9. **Interview Simulation Page** - Video chat interface with timer
10. **Interview Complete Page** - Success confirmation
11. **Score Breakdown Page** - Animated circular progress charts
12. **Detailed Suggestions Page** - Expandable feedback sections
13. **Admin Dashboard** - Stats cards with animated line charts
14. **Student Management Page** - Paginated table with actions

#### Key Components Created
- `Navigation` - Public navigation bar
- `LoggedInNavigation` - User navigation with avatar
- `AdminNavigation` - Admin-specific menu
- `Footer` - Reusable footer component
- `LoginHero` - Shared between login/register
- `LoginForm` & `RegisterForm` - Authentication forms

### What We Did Well 💪
1. **Component Reusability** - Maximized code reuse across pages
2. **Consistent Styling** - Inline styles with exact Figma values
3. **Animation Excellence** - Smooth transitions on scores, charts
4. **Navigation Flow** - Logical page connections
5. **Asset Management** - Organized icon/image structure
6. **Error Recovery** - Quick fixes for issues encountered
7. **Responsive Design** - Proper viewport units usage

### Areas for Improvement 📈
1. **Asset Verification** - Should check all assets exist before coding
2. **File Naming** - Avoid spaces in filenames (e.g., "Product Manager.svg")
3. **Component Planning** - Could plan shared components upfront
4. **State Management** - Consider global state for user data
5. **Error Handling** - Add more user-friendly error messages
6. **Performance** - Optimize large images and animations

## 🚨 UPDATED CRITICAL RULES FOR FIGMA TO CODE IMPORTS

### 1. PRE-DEVELOPMENT REQUIREMENTS
**ALWAYS DO THESE BEFORE WRITING ANY CODE:**
- ✅ Analyze the Figma design/PNG thoroughly
- ✅ List ALL visible components and sections
- ✅ Export ALL assets (images, icons, logos) FIRST
- ✅ Verify asset filenames have NO SPACES
- ✅ Note exact text content, colors, and spacing
- ✅ Plan component reusability across pages
- ❌ NEVER start coding before assets are ready
- ❌ NEVER guess at design elements

### 2. ASSET MANAGEMENT
```
/public/
├── logo.svg              # Main PrepWise logo
├── hero-bg.jpg          # Hero background images
├── Interviewer.jpg      # Interview simulation assets
├── You.jpg
└── icons/
    ├── favicon.svg      # Browser tab icon
    ├── avatar.svg       # User avatar
    ├── [feature].svg    # Feature icons
    └── [student].svg/png # Student avatars
```
**CRITICAL**: Replace spaces with underscores in filenames

### 3. CODING STANDARDS

#### Use Inline Styles ONLY
```typescript
// ✅ CORRECT
const style = {
  backgroundColor: '#ffffff',
  padding: '20px',
};

// ❌ WRONG - Don't use Tailwind classes
<div className="bg-white p-5">
```

#### Component Structure
```typescript
/**
 * ADAMCHINS PrepWise
 * Classification: ADAMCHINS-CONFIDENTIAL ▲
 * Component: [Name]
 * Purpose: [What it does]
 * Why Needed: [Business reason]
 */

export function ComponentName() {
  // All styles as const objects
  const sectionStyle = {
    // Use exact Figma values
  };
  
  return (
    <section style={sectionStyle}>
      {/* Content */}
    </section>
  );
}
```

### 4. NAVIGATION PATTERNS

#### Three Navigation Types
1. **Public Navigation** - For non-logged users
2. **LoggedInNavigation** - For authenticated users
3. **AdminNavigation** - For admin users

#### Route Structure
```
/                    # Landing page
/login              # Login page
/register           # Register page
/dashboard          # User dashboard
/admin              # Admin dashboard
/admin/students     # Student management
```

### 5. ANIMATION PATTERNS

#### Progress Animations
```typescript
useEffect(() => {
  const interval = setInterval(() => {
    setProgress(prev => {
      if (prev < target) {
        return Math.min(prev + 2, target);
      }
      clearInterval(interval);
      return prev;
    });
  }, 20);
}, []);
```

#### SVG Circle Progress
```typescript
const circumference = radius * 2 * Math.PI;
const strokeDashoffset = circumference - (progress / 100) * circumference;
```

### 6. COMMON COMPONENTS

#### Reusable Patterns
- **Headers**: Always include logo + navigation + avatar
- **Footers**: Copyright text with links
- **Buttons**: Primary (#1a4d8c), Secondary (#17B0A7)
- **Forms**: Consistent input styling with focus states
- **Tables**: Header row with #f9fafb background
- **Cards**: White background with subtle shadow

### 7. BEST PRACTICES DISCOVERED

#### State Management
- Use `useState` for local component state
- Use `useNavigate` for programmatic navigation
- Pass data through route state when needed

#### Event Handlers
```typescript
// Hover effects
onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#hover-color'}
onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#original-color'}

// Click with navigation
onClick={() => navigate('/path')}
```

#### Responsive Design
- Use `vh` units for hero sections
- Use `maxWidth` with centered margin for content
- Flexible grid layouts for cards

### 8. COMMON ISSUES & SOLUTIONS

| Issue | Solution |
|-------|----------|
| Layout broken | Use inline styles, check overflow settings |
| Assets not showing | Ensure paths start with `/` |
| Wrong colors | Use exact hex from Figma |
| Spacing off | Use exact px values, not approximations |
| White SVGs invisible | Add background or filter |
| File not found | Check filename spaces, use underscores |
| Navigation not working | Import useNavigate from react-router-dom |

### 9. TESTING CHECKLIST
Before marking any page complete:
- [ ] Matches Figma design exactly
- [ ] All text content correct
- [ ] All colors match hex values
- [ ] All spacing/margins correct
- [ ] All assets loading properly
- [ ] Hover states working
- [ ] Links functional
- [ ] Animations smooth
- [ ] Form validations working
- [ ] Responsive behavior correct

### 10. PROJECT-SPECIFIC PATTERNS

#### Color Palette
- Primary Blue: `#1a4d8c`
- Secondary Teal: `#17B0A7`
- Text Dark: `#1f2d3d`
- Text Light: `#6b7b8f`
- Background: `#f9fafb`
- Border: `#e5e7eb`

#### Typography
- Font Stack: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`
- Title: 32px, weight 600
- Subtitle: 16-18px, weight 400
- Body: 14-15px, weight 400

#### Spacing System
- Section padding: 3rem 2rem
- Card padding: 2rem
- Button padding: 12px 24px (small), 14px 36px (large)
- Input padding: 12px 16px

#### Border Radius
- Buttons: 40px (primary CTA), 8px (secondary)
- Cards: 12px
- Inputs: 8px
- Avatars: 50%

## 🎯 LESSONS LEARNED

### Do's ✅
1. **Plan First** - Analyze all pages to identify shared components
2. **Check Assets** - Verify all files exist with correct names
3. **Test Often** - Check each component works before moving on
4. **Reuse Code** - Extract common patterns into components
5. **Match Exactly** - Use exact values from Figma, never approximate
6. **Handle States** - Consider all states (hover, active, disabled)
7. **Think Flow** - Ensure logical navigation between pages

### Don'ts ❌
1. **Don't Rush** - Quality over speed
2. **Don't Guess** - Ask for clarification when unsure
3. **Don't Hardcode** - Use props and state for dynamic content
4. **Don't Skip Testing** - Verify each feature works
5. **Don't Ignore Warnings** - Fix console errors immediately

## 🚀 NEXT STEPS (If Continuing)

1. **Authentication** - Implement real login/logout
2. **API Integration** - Connect to backend services
3. **State Management** - Add Redux/Context for global state
4. **Form Validation** - Enhanced validation with error messages
5. **Accessibility** - Add ARIA labels and keyboard navigation
6. **Testing** - Unit and integration tests
7. **Performance** - Lazy loading and code splitting
8. **SEO** - Meta tags and structured data

## 🚀 RECENT ACCOMPLISHMENTS (June 2025)

### Google SSO Integration ✅
- Integrated Google OAuth 2.0 authentication
- Session-based auth with React Context (no localStorage)
- User profile picture replaces avatar throughout app
- Protected routes with automatic login redirects
- Logout functionality via avatar dropdown menu

### Enhanced Interview Simulation ✅
- **Camera/Microphone Integration**:
  - Pre-interview setup modal with permissions
  - Live video feed replaces static image
  - Real-time camera/mic toggle controls
  - Graceful fallback when permissions denied
  
- **Voice-to-Text Input**:
  - Web Speech API integration
  - Bilingual support (English/French)
  - Visual feedback with pulsing animation
  - Error handling with user-friendly messages
  - Seamless text replacement while speaking

### UI/UX Refinements ✅
- Fixed SSO button layout (Google and LinkedIn aligned)
- Removed redundant dividers in login flow
- Added camera/mic status indicators
- Improved interview page interactions

## 🚀 PREVIOUS ACCOMPLISHMENTS (January 2025)

### Production Deployment ✅
- Successfully deployed to AWS EC2 at **prepwise.adamchins.com**
- Configured Nginx with SSL certificates (Let's Encrypt)
- Set up GitHub Actions CI/CD pipeline (deploys from master branch)
- Implemented proper git workflow: develop → preprod → master

### Internationalization (i18n) ✅
- Full French/English language support
- Language selector in navigation
- Browser language auto-detection
- All 15 pages fully translated
- Dynamic placeholders in forms

### OpenAI Integration ✅
- Integrated GPT-3.5-turbo for interview simulation
- Bilingual AI responses (French/English)
- Secure API key management with .env
- Fallback to mock responses when API unavailable
- Auto-focus textarea after AI responses
- Real-time conversation flow

### UI/UX Improvements ✅
- Fixed French line breaks in hero section
- Added Beta.02 version in footer
- Removed redundant behavioral section from interview
- Fixed all TypeScript build errors
- Improved form placeholders

### Technical Infrastructure ✅
- Vite configuration with @public alias
- Environment variables for API keys
- Proper .gitignore for sensitive files
- Clean project structure (removed duplicate directories)
- Responsive design implementation

## 🔧 CURRENT TECH STACK

### Frontend
- **React 18** with TypeScript
- **Vite** build tool
- **React Router** for navigation
- **Inline styles** (no Tailwind/CSS frameworks)
- Custom **LanguageContext** for i18n

### Backend/Services
- **OpenAI API** (GPT-3.5-turbo)
- **Axios** for API calls
- Mock data fallbacks

### Deployment
- **AWS EC2** (Amazon Linux)
- **Nginx** web server
- **Let's Encrypt** SSL
- **GitHub Actions** CI/CD
- **Route 53** DNS

### Version Control
- **Git** with branch protection
- Workflow: develop → preprod → master
- Automated deployments from master

## 📁 PROJECT STRUCTURE
```
prepwise/
├── src/
│   ├── components/
│   │   ├── admin/         # Admin-specific components
│   │   ├── common/        # Shared components (LanguageSelector)
│   │   ├── landing/       # Landing page components
│   │   ├── login/         # Auth components
│   │   └── upload/        # File upload components
│   ├── contexts/          # React contexts (LanguageContext)
│   ├── pages/             # All 15 page components
│   ├── services/          # API services (openai.ts)
│   └── translations/      # i18n files (en.json, fr.json)
├── public/                # Static assets
│   ├── icons/            # SVG icons
│   └── images/           # JPG/PNG images
├── .env                  # Environment variables (not in git)
├── .env.example          # Example env file
└── vite.config.ts        # Build configuration
```

## 🔑 ENVIRONMENT VARIABLES

### Local Development
Create `.env` file:
```
VITE_OPENAI_API_KEY=sk-...your-key-here...
```

### Production Server
On EC2, create `/var/www/prepwise/.env`:
```bash
sudo nano /var/www/prepwise/.env
# Add: VITE_OPENAI_API_KEY=your-key
sudo chmod 644 .env
sudo chown ec2-user:ec2-user .env
```

## 🚦 DEPLOYMENT PROCESS

### Automatic (via CI/CD)
1. Make changes in develop branch
2. Push to GitHub
3. Merge: develop → preprod → master
4. GitHub Actions automatically deploys from master

### Manual (if needed)
```bash
# On EC2 server
cd /var/www/prepwise
git pull origin master
npm install
npm run build
sudo systemctl restart nginx
```

## 🎯 COMPLETED FEATURES

### User Journey
1. ✅ Landing page with language selection
2. ✅ Login/Register with validation
3. ✅ Job role selection
4. ✅ Document upload (CV/Cover Letter)
5. ✅ CV quality review
6. ✅ AI-powered interview simulation
7. ✅ Interview completion screen
8. ✅ Score breakdown with animations
9. ✅ Detailed feedback suggestions

### Admin Features
1. ✅ Admin dashboard with statistics
2. ✅ Student management interface
3. ✅ Animated charts and metrics

### Technical Features
1. ✅ Bilingual support (FR/EN)
2. ✅ OpenAI integration
3. ✅ Responsive design
4. ✅ Smooth animations
5. ✅ Form validations
6. ✅ Error handling

## 🐛 KNOWN ISSUES & SOLUTIONS

| Issue | Solution |
|-------|----------|
| TypeScript build errors | Remove unused variables |
| Assets not loading | Check filenames (no spaces) |
| OpenAI not working | Verify .env file on server |
| French placeholders | Use nested translation keys |
| CI/CD not triggering | Push to master branch |

## 📋 NEXT STEPS (Future Development)

1. **Backend API** - Build REST/GraphQL API
2. **Database** - PostgreSQL/MongoDB integration
3. **Authentication** - JWT/OAuth implementation
4. **File Storage** - S3 for document uploads
5. **Email Service** - SendGrid/SES integration
6. **Analytics** - Google Analytics/Mixpanel
7. **Testing** - Jest/Cypress test suites
8. **Mobile App** - React Native version

## 🎉 CELEBRATION
We successfully:
- Built and deployed a complete 15-page application
- Implemented full internationalization
- Integrated OpenAI for intelligent interviews
- Set up production infrastructure
- Created a scalable, maintainable codebase

**PrepWise Beta 0.2 is LIVE at prepwise.adamchins.com!** 🚀

## 🚀 LATEST UPDATES (June 2025 - Day 2)

### Multi-Site Deployment Strategy ✅
- Set up staging environment at **prep.adamchins.com**
- Production (Beta 0.2) remains at **prepwise.adamchins.com**
- Staging (Beta 0.3.2) deployed to **prep.adamchins.com**
- Both sites running on same EC2 instance with Nginx

### CI/CD Enhancement ✅
- **New Preprod Pipeline**:
  - Created `.github/workflows/deploy-preprod.yml`
  - Auto-deploys to prep.adamchins.com on push to preprod branch
  - Supports tag-based deployments (Beta-*, v*)
  - Manual trigger available via workflow_dispatch

### Version Management ✅
- Implemented proper version numbering: Beta 0.3.2
- Created git tags for version tracking
- Established rollback strategy with tagged releases

### Google OAuth Multi-Domain Fix ✅
- Documented solution for redirect_uri_mismatch error
- Need to add prep.adamchins.com to Google OAuth settings:
  - https://prep.adamchins.com
  - https://prep.adamchins.com/login
  - https://prep.adamchins.com/dashboard

### Deployment Documentation ✅
- Created `PREP_SITE_DEPLOYMENT.md` - Manual deployment guide
- Created `PREPROD_CICD_GUIDE.md` - CI/CD documentation
- Created `GOOGLE_OAUTH_MULTI_DOMAIN_FIX.md` - OAuth setup guide
- Created `deploy-prep-site.sh` - Automated deployment script

### Technical Achievements ✅
- Fixed video streaming black screen issue
- Resolved voice-to-text video pause problem
- Implemented efficient debugging approach
- Created comprehensive prompt handbooks for auth

### Best Practices Established ✅
1. **Efficient Debugging**: Focus on specific issues, avoid over-engineering
2. **Clear Communication**: Ask for clarification before assuming
3. **Version Control**: Use semantic versioning with proper tags
4. **Documentation**: Create guides for complex processes
5. **CI/CD**: Automate deployments for consistency