# Authentication Google SSO Prompt Handbook

## 🎯 Purpose

This handbook provides precise, unambiguous prompts for implementing Google Single Sign-On (SSO) authentication in React applications. Based on lessons learned from previous implementations, these prompts are designed to produce clean, minimal, and functional Google OAuth integration without over-engineering.

---

## 📋 Table of Contents

1. [Core Principles](#core-principles)
2. [Prerequisites](#prerequisites)
3. [Phase 1: Google OAuth Setup](#phase-1-google-oauth-setup)
4. [Phase 2: Basic Google Sign-In](#phase-2-basic-google-sign-in)
5. [Phase 3: Session Persistence](#phase-3-session-persistence)
6. [Phase 4: Protected Routes](#phase-4-protected-routes)
7. [Phase 5: Navigation & Logout](#phase-5-navigation--logout)
8. [Complete Implementation Prompt](#complete-implementation-prompt)
9. [Testing Checklist](#testing-checklist)

---

## 🏗️ Core Principles

Before using any prompt, understand these principles:

1. **Use Official Libraries**: Only @react-oauth/google
2. **Start with Default Button**: Don't customize initially
3. **Simple Token Handling**: Just extract user info
4. **No Complex Architecture**: No AuthContext unless requested
5. **Clear Data Flow**: Token → User info → Session → Navigation

---

## 📋 Prerequisites

### Required Information from User

Before starting, always ask for:
```markdown
Before implementing Google SSO, I need:
1. Your Google Client ID (from Google Cloud Console)
2. Authorized redirect URIs you've configured
3. Authorized JavaScript origins
4. Do you want session persistence? (sessionStorage/localStorage/none)
5. Where should users go after login? (e.g., /dashboard)
```

### Environment Setup Prompt

```markdown
Create a .env file for Google OAuth configuration.

Requirements:
1. Create .env in project root:
   VITE_GOOGLE_CLIENT_ID=your_client_id_here
2. Add .env to .gitignore
3. Create .env.example with:
   VITE_GOOGLE_CLIENT_ID=your_google_client_id_here

Do NOT:
- Commit actual client ID
- Use secret keys in frontend
- Create additional config files

Success criteria:
- .env file exists with client ID
- .env is gitignored
- .env.example shows structure
```

---

## 📝 Phase 1: Google OAuth Setup

### Prompt for Package Installation

```markdown
Install Google OAuth package for React.

Requirements:
1. Install: npm install @react-oauth/google
2. Verify package.json includes @react-oauth/google
3. No other OAuth packages

Do NOT:
- Install additional auth libraries
- Install JWT decode libraries
- Install Google API client libraries
- Configure webpack/vite

Success criteria:
- Package installed successfully
- No version conflicts
- No additional dependencies
```

### Prompt for Provider Setup

```markdown
Add Google OAuth provider to the React app.

Requirements:
1. In App.tsx (or main.tsx), import GoogleOAuthProvider
2. Wrap the app with:
   <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
     {/* existing app content */}
   </GoogleOAuthProvider>
3. Show console warning if client ID missing

Do NOT:
- Create AuthContext
- Add error boundaries
- Configure additional providers
- Add loading states

Code structure:
```typescript
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  
  if (!clientId) {
    console.warn('Google Client ID not found');
  }
  
  return (
    <GoogleOAuthProvider clientId={clientId || ''}>
      {/* existing routes */}
    </GoogleOAuthProvider>
  );
}
```

Success criteria:
- App wrapped with provider
- No errors if client ID exists
- Console warning if missing
```

---

## 📝 Phase 2: Basic Google Sign-In

### Prompt for Simple Google Button

```markdown
Add Google Sign-In button to login page.

Requirements:
1. Import GoogleLogin from @react-oauth/google
2. Add button to existing login form:
   <GoogleLogin
     onSuccess={handleGoogleSuccess}
     onError={() => console.log('Login Failed')}
   />
3. Create handleGoogleSuccess that logs the response

Do NOT:
- Decode JWT tokens
- Navigate after login
- Store user data
- Customize button appearance
- Handle loading states

Code structure:
```typescript
import { GoogleLogin } from '@react-oauth/google';

function LoginPage() {
  const handleGoogleSuccess = (response: any) => {
    console.log('Google login success:', response);
  };

  return (
    <div>
      <h1>Login</h1>
      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={() => console.log('Login Failed')}
      />
    </div>
  );
}
```

Success criteria:
- Google button appears
- Click opens Google auth popup
- Success logs response object
- Error logs failure message
```

### Prompt for User Info Extraction

```markdown
Extract user information from Google login response.

Requirements:
1. In handleGoogleSuccess, decode the JWT credential:
   ```typescript
   const decoded = JSON.parse(atob(response.credential.split('.')[1]));
   const user = {
     email: decoded.email,
     name: decoded.name,
     picture: decoded.picture,
     id: decoded.sub
   };
   console.log('User info:', user);
   ```
2. Show alert with user's email

Do NOT:
- Store user data yet
- Navigate to other pages
- Create user context
- Make API calls
- Validate tokens

Success criteria:
- User info extracted correctly
- Alert shows user's email
- All user fields populated
- No navigation occurs
```

---

## 📝 Phase 3: Session Persistence

### Prompt for Session Storage

```markdown
Add session persistence for Google login.

Requirements:
1. After extracting user info, store in sessionStorage:
   sessionStorage.setItem('user', JSON.stringify(user));
2. On page load, check for existing user:
   const existingUser = sessionStorage.getItem('user');
   if (existingUser) {
     console.log('User already logged in');
   }
3. Keep all existing functionality

Do NOT:
- Use localStorage unless specified
- Create auth context
- Add auto-login
- Implement token refresh
- Store sensitive tokens

Success criteria:
- User persists across page refresh (same tab)
- New tab requires fresh login
- User object contains email, name, picture, id
```

---

## 📝 Phase 4: Protected Routes

### Prompt for Route Protection

```markdown
Reuse the existing ProtectedRoute component for Google SSO.

Requirements:
1. ProtectedRoute should already check sessionStorage for 'user'
2. Verify it works with Google login data structure
3. No modifications needed if user object has same key

Do NOT:
- Create new protection logic
- Add Google-specific checks
- Modify existing ProtectedRoute
- Add token validation

Success criteria:
- Google login allows access to protected routes
- Logout still works correctly
- Same behavior as email/password auth
```

---

## 📝 Phase 5: Navigation & Logout

### Prompt for Post-Login Navigation

```markdown
Add navigation after successful Google login.

Requirements:
1. Import useNavigate in login component
2. After storing user in sessionStorage:
   navigate('/dashboard');
3. Use the same navigation as email/password login

Do NOT:
- Create different flows for Google vs email
- Add loading transitions
- Store redirect URLs
- Navigate before storage

Code addition:
```typescript
const navigate = useNavigate();

const handleGoogleSuccess = (response: any) => {
  const decoded = JSON.parse(atob(response.credential.split('.')[1]));
  const user = {
    email: decoded.email,
    name: decoded.name,
    picture: decoded.picture,
    id: decoded.sub
  };
  sessionStorage.setItem('user', JSON.stringify(user));
  navigate('/dashboard');
};
```

Success criteria:
- Google login → Dashboard
- Same flow as email login
- No navigation on failure
```

### Prompt for Profile Display

```markdown
Display Google user profile information.

Requirements:
1. In dashboard/header component, get user from sessionStorage
2. Display:
   - User name
   - User email  
   - Profile picture (if exists)
3. Use img tag with fallback:
   <img src={user.picture || '/default-avatar.png'} alt="Profile" />

Do NOT:
- Fetch additional user data
- Create profile dropdown
- Add edit functionality
- Store image locally

Success criteria:
- Name and email visible
- Google profile picture shows
- Fallback for missing image
- No broken images
```

### Prompt for Logout Integration

```markdown
Ensure logout works for both Google and email users.

Requirements:
1. Existing logout should clear sessionStorage 'user' key
2. Optionally add Google sign-out:
   ```typescript
   if (window.google?.accounts?.id) {
     window.google.accounts.id.disableAutoSelect();
   }
   ```
3. Navigate to home after logout

Do NOT:
- Create separate Google logout
- Call Google API endpoints
- Clear other storage
- Show confirmation dialogs

Success criteria:
- Same logout button for all users
- Session cleared completely
- Returns to home page
- Can login again immediately
```

---

## 🚀 Complete Implementation Prompt

### All-in-One Prompt (Use Only If Needed)

```markdown
Implement Google SSO authentication with session persistence.

Prerequisites provided:
- Google Client ID: [USER PROVIDES]
- Redirect after login: /dashboard
- Session storage: sessionStorage

Requirements:
1. Install @react-oauth/google package
2. Wrap App with GoogleOAuthProvider using client ID from .env
3. Add GoogleLogin button to login page
4. Extract user info from JWT credential: email, name, picture, id
5. Store user in sessionStorage with key 'user'
6. Navigate to /dashboard after successful login
7. Reuse existing ProtectedRoute (checks sessionStorage)
8. Display user name and picture in dashboard
9. Ensure logout clears session and goes to home

Technical specifications:
- Use default Google button (no customization)
- Simple JWT decode: atob(credential.split('.')[1])
- Same user object structure as email login
- Same session key: 'user'
- No additional error handling

Do NOT:
- Create AuthContext
- Add loading states
- Customize button appearance
- Implement token refresh
- Create separate Google components
- Add social login for other providers
- Store tokens (only user info)
- Make backend API calls

File changes:
- .env (add VITE_GOOGLE_CLIENT_ID)
- App.tsx (wrap with GoogleOAuthProvider)
- LoginPage.tsx (add GoogleLogin button)
- No new components needed

Success flow:
1. User clicks Google button → Google popup
2. User authorizes → Extract user info
3. Store in session → Navigate to dashboard
4. Protected routes work → Profile shows
5. Logout clears all → Back to home
```

---

## ✅ Testing Checklist

### Google OAuth Setup
- [ ] Client ID in .env file
- [ ] .env is gitignored
- [ ] App wrapped with GoogleOAuthProvider
- [ ] No console errors on load

### Sign-In Flow
- [ ] Google button appears on login page
- [ ] Click opens Google account chooser
- [ ] Can select Google account
- [ ] Authorization completes successfully
- [ ] User info extracted correctly

### Session & Navigation
- [ ] User stored in sessionStorage
- [ ] Navigates to dashboard after login
- [ ] Refresh maintains login (same tab)
- [ ] New tab requires fresh login
- [ ] Protected routes accessible

### Profile Display
- [ ] User name shows correctly
- [ ] User email shows correctly
- [ ] Google profile picture displays
- [ ] Fallback image for errors

### Logout Flow
- [ ] Logout clears sessionStorage
- [ ] Navigates to home page
- [ ] Google auto-select disabled
- [ ] Can login again immediately

---

## 🚫 Common Mistakes to Avoid

### 1. Complex Token Handling
❌ Installing jwt-decode library
❌ Validating token signatures
❌ Checking token expiration
✅ Simple atob() decode for user info only

### 2. Over-Customization
❌ Creating custom styled Google button
❌ Matching button to other designs
❌ Adding loading states to button
✅ Use default GoogleLogin component

### 3. Backend Integration
❌ Sending tokens to backend
❌ Implementing token refresh
❌ Creating user accounts
✅ Frontend-only implementation

### 4. Multiple Auth Flows
❌ Different handling for Google vs email
❌ Separate session keys
❌ Different user objects
✅ Unified approach for all auth types

### 5. Error Over-Handling
❌ Complex error messages
❌ Retry mechanisms
❌ Token validation errors
✅ Simple console.log for errors

---

## 📊 Implementation Phases Summary

| Phase | Components | Features | Storage | Complexity |
|-------|------------|----------|---------|------------|
| 1 | Provider setup | Environment config | None | Minimal |
| 2 | Google button | Basic login | None | Simple |
| 3 | Same | User extraction | sessionStorage | Simple |
| 4 | Reuse existing | Protected routes | sessionStorage | None |
| 5 | Same | Navigation, logout | sessionStorage | Minimal |

---

## 🎯 Key Success Metrics

A successful Google SSO implementation should:
1. Take less than 20 minutes to implement
2. Reuse existing auth infrastructure
3. Require less than 50 new lines of code
4. Work on first try with valid client ID
5. Feel identical to email/password flow

---

## 📌 Quick Reference Card

```typescript
// 1. Environment Setup
VITE_GOOGLE_CLIENT_ID=your-client-id-here

// 2. Provider Wrapper
import { GoogleOAuthProvider } from '@react-oauth/google';

<GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
  <App />
</GoogleOAuthProvider>

// 3. Google Button
import { GoogleLogin } from '@react-oauth/google';

<GoogleLogin
  onSuccess={handleGoogleSuccess}
  onError={() => console.log('Login Failed')}
/>

// 4. Handle Success
const handleGoogleSuccess = (response: any) => {
  // Decode user info
  const decoded = JSON.parse(atob(response.credential.split('.')[1]));
  const user = {
    email: decoded.email,
    name: decoded.name,
    picture: decoded.picture,
    id: decoded.sub
  };
  
  // Store and navigate
  sessionStorage.setItem('user', JSON.stringify(user));
  navigate('/dashboard');
};

// 5. Same Logout
sessionStorage.removeItem('user');
navigate('/');
```

---

## 🆚 Google SSO vs Email/Password

| Aspect | Email/Password | Google SSO |
|--------|---------------|------------|
| User Input | Form fields | Click button |
| Validation | Email format, password required | Google handles |
| User Object | Same structure | Same structure |
| Session | sessionStorage | sessionStorage |
| Protected Routes | Same component | Same component |
| Logout | Clear session | Clear session + disable auto |

---

## 🏁 Final Notes

Google SSO should be treated as just another login method, not a complex authentication system. The key is to:
1. Use the official library's default components
2. Extract only necessary user information
3. Reuse existing authentication infrastructure
4. Maintain consistency with other login methods

The simpler the implementation, the more maintainable and debuggable it will be. Resist the urge to add Google-specific features or handling unless explicitly requested.