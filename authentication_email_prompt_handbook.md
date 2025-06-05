# Authentication Email/Password Prompt Handbook

## 🎯 Purpose

This handbook provides precise, unambiguous prompts for implementing email/password authentication in React applications. Based on lessons learned from previous implementations, these prompts are designed to produce clean, minimal, and functional authentication systems without over-engineering.

---

## 📋 Table of Contents

1. [Core Principles](#core-principles)
2. [Phase 1: Basic Authentication](#phase-1-basic-authentication)
3. [Phase 2: Session Persistence](#phase-2-session-persistence)
4. [Phase 3: Protected Routes](#phase-3-protected-routes)
5. [Phase 4: Navigation & Routing](#phase-4-navigation--routing)
6. [Phase 5: Logout & Redirections](#phase-5-logout--redirections)
7. [Complete Implementation Prompt](#complete-implementation-prompt)
8. [Testing Checklist](#testing-checklist)

---

## 🏗️ Core Principles

Before using any prompt, understand these principles:

1. **Start Simple**: Implement the minimum viable feature first
2. **No Assumptions**: Don't add features not explicitly requested
3. **Clear Scope**: Each prompt has specific boundaries
4. **Test First**: Verify each phase works before proceeding

---

## 📝 Phase 1: Basic Authentication

### Prompt for Simple Login Form

```markdown
Create a simple email/password login form component in React.

Requirements:
1. Create `LoginForm.tsx` with email and password inputs
2. Add a submit button that logs credentials to console
3. Use basic HTML form validation (required, email type)
4. Style with inline styles using these exact values:
   - Input padding: 12px 16px
   - Border: 1px solid #e5e7eb
   - Border radius: 8px
   - Button background: #1a4d8c
   - Button text: white

Do NOT:
- Add authentication logic
- Create context or providers
- Add navigation
- Implement actual login
- Add session storage
- Create additional components

Success criteria:
- Form displays with email/password fields
- Submit button logs {email, password} to console
- Email field validates email format
- Both fields are required
```

### Prompt for Authentication Handler

```markdown
Add a login handler to the existing LoginForm component.

Requirements:
1. Create a handleLogin function that:
   - Accepts email and password
   - Returns { success: boolean, user?: { email, name, id } }
   - For now, return success if email includes "@" and password exists
   - Set user.name as the part before @ in email
   - Set user.id as current timestamp
2. On successful login, show alert "Login successful"
3. On failed login, show alert "Invalid credentials"

Do NOT:
- Store user data anywhere
- Navigate to other pages
- Create authentication context
- Add loading states
- Implement real API calls

Success criteria:
- test@example.com with any password shows success alert
- Invalid email shows failure alert
- User object is created but not stored
```

---

## 📝 Phase 2: Session Persistence

### Prompt for Session Storage

```markdown
Add session persistence to the login form.

Requirements:
1. On successful login:
   - Store user object in sessionStorage with key "user"
   - Use JSON.stringify for storage
2. On component mount:
   - Check sessionStorage for existing user
   - If user exists, show "Already logged in as: [email]"
   - Add a "Continue as [name]" button
3. Keep all existing functionality

Do NOT:
- Use localStorage
- Create context providers
- Add navigation
- Create new components
- Implement logout

Success criteria:
- User persists across page refresh within same tab
- New browser tab starts fresh
- Existing user shown on component mount
```

---

## 📝 Phase 3: Protected Routes

### Prompt for Protected Route Component

```markdown
Create a ProtectedRoute component for authentication.

Requirements:
1. Create `ProtectedRoute.tsx` that:
   - Checks sessionStorage for "user" key
   - Shows children if user exists
   - Shows "Please login" message if no user
2. Accept children prop of type React.ReactNode
3. No loading states or redirects

Do NOT:
- Create context
- Add navigation/redirects
- Implement complex logic
- Add loading spinners
- Check API endpoints

Code structure:
```typescript
export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const user = sessionStorage.getItem('user');
  if (!user) return <div>Please login</div>;
  return <>{children}</>;
}
```

Success criteria:
- Shows children when user in sessionStorage
- Shows message when no user
- No other functionality
```

### Prompt for Route Integration

```markdown
Integrate ProtectedRoute with existing routes.

Requirements:
1. Wrap these existing routes with ProtectedRoute:
   - /dashboard
   - /profile
   - /settings
2. Keep public routes unwrapped:
   - /
   - /login
   - /about

Example:
<Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

Do NOT:
- Create new routes
- Change route paths
- Add navigation logic
- Create route groups
- Modify components

Success criteria:
- Protected routes show "Please login" when not authenticated
- Public routes remain accessible
- No other changes
```

---

## 📝 Phase 4: Navigation & Routing

### Prompt for Login Navigation

```markdown
Add navigation after successful login.

Requirements:
1. Import useNavigate from react-router-dom
2. After successful login and sessionStorage save:
   - Navigate to '/dashboard'
   - Use navigate('/dashboard')
3. No other navigation changes

Do NOT:
- Add navigation to other pages
- Create navigation components
- Add back button handling
- Implement redirect logic
- Store intended destinations

Success criteria:
- Successful login goes to /dashboard
- Failed login stays on login page
- No other navigation occurs
```

### Prompt for Protected Route Redirect

```markdown
Update ProtectedRoute to redirect to login.

Requirements:
1. Import Navigate from react-router-dom
2. Replace "Please login" message with:
   <Navigate to="/login" replace />
3. No other changes

Do NOT:
- Add state passing
- Create loading states
- Add animation
- Store redirect locations
- Create additional logic

Success criteria:
- Unauthenticated users redirect to /login
- Authenticated users see protected content
- Navigation uses replace (no back button loop)
```

---

## 📝 Phase 5: Logout & Redirections

### Prompt for Logout Button

```markdown
Add a logout button to the Dashboard page.

Requirements:
1. Add button with text "Logout" at top of Dashboard
2. On click:
   - Remove "user" from sessionStorage
   - Navigate to '/' (home page)
3. Style: same as login button but red (#ef4444)

Do NOT:
- Create logout component
- Add confirmation dialog
- Clear other storage
- Make API calls
- Add loading states

Success criteria:
- Click logout → clears session → goes to home
- Can login again after logout
- No other side effects
```

### Prompt for Post-Login Redirect

```markdown
Add return URL handling to login flow.

Requirements:
1. In ProtectedRoute, pass current location to login:
   <Navigate to="/login" state={{ from: location }} replace />
2. In LoginForm, check for location state:
   const location = useLocation();
   const from = location.state?.from?.pathname || '/dashboard';
3. Navigate to 'from' instead of '/dashboard' after login

Do NOT:
- Store URLs in sessionStorage
- Create complex redirect logic
- Add URL validation
- Handle external URLs
- Create redirect chains

Success criteria:
- Going to /profile while logged out → login → arrive at /profile
- Direct login still goes to /dashboard
- No infinite loops
```

---

## 🚀 Complete Implementation Prompt

### All-in-One Prompt (Use Only If Needed)

```markdown
Implement email/password authentication with session persistence.

Requirements:
1. Create LoginForm with email/password fields
2. Store user in sessionStorage on successful login (any @ email + password)
3. Create ProtectedRoute that redirects to /login if no user
4. Protect these routes: /dashboard, /profile, /settings  
5. After login, redirect to intended page or /dashboard
6. Add logout button to dashboard that clears session and goes to home

Technical specifications:
- Use sessionStorage (not localStorage)
- User object: { email, name, id }
- Navigate with react-router-dom
- Inline styles only
- No external dependencies

Do NOT:
- Create AuthContext
- Add loading states
- Implement real API calls
- Create additional components beyond LoginForm and ProtectedRoute
- Add features not listed above
- Use setTimeout for navigation
- Add Google/social login
- Create user registration

File structure:
- src/components/LoginForm.tsx
- src/components/ProtectedRoute.tsx
- Update existing App.tsx routes
- Add logout to existing Dashboard.tsx

Success flow:
1. User visits /dashboard → redirected to /login
2. User logs in → redirected to /dashboard
3. User refreshes → stays logged in (same tab only)
4. User clicks logout → session cleared → redirected to home
```

---

## ✅ Testing Checklist

After implementation, verify:

### Basic Flow
- [ ] Can login with any email containing @ and any password
- [ ] Invalid email shows error
- [ ] Empty password shows error
- [ ] Successful login navigates to dashboard

### Session Persistence  
- [ ] Refresh page maintains login (same tab)
- [ ] New tab requires fresh login
- [ ] Closing and reopening tab requires login

### Protected Routes
- [ ] Cannot access /dashboard without login
- [ ] Cannot access /profile without login  
- [ ] Can access / and /login without authentication
- [ ] Protected routes redirect to /login

### Navigation Flow
- [ ] Login → Dashboard
- [ ] Logout → Home page
- [ ] Protected route → Login → Original route
- [ ] Direct login → Dashboard (default)

### Logout
- [ ] Logout clears sessionStorage
- [ ] Logout navigates to home
- [ ] Can login again after logout
- [ ] No session data remains after logout

---

## 🚫 Common Mistakes to Avoid

### 1. Over-Engineering
❌ Creating complex auth systems with refresh tokens
✅ Simple sessionStorage with user object

### 2. Premature Optimization
❌ Adding loading states, error boundaries, retry logic
✅ Basic success/failure handling only

### 3. Feature Creep
❌ Adding remember me, forgot password, social login
✅ Only email/password login and logout

### 4. Complex State Management
❌ Creating AuthContext, Redux, or global state
✅ Simple sessionStorage checks

### 5. Unclear Navigation
❌ Complex redirect chains and state passing
✅ Simple: login → dashboard, logout → home

---

## 📊 Implementation Phases Summary

| Phase | Components | Storage | Navigation | Features |
|-------|------------|---------|------------|----------|
| 1 | LoginForm | None | None | Form validation |
| 2 | LoginForm | sessionStorage | None | Persistence |
| 3 | +ProtectedRoute | sessionStorage | None | Route protection |
| 4 | Same | sessionStorage | Added | Login redirect |
| 5 | Same | sessionStorage | Enhanced | Logout, return URL |

---

## 🎯 Key Success Metrics

A successful implementation should:
1. Take less than 30 minutes to implement
2. Require no debugging for basic flow
3. Have less than 200 lines of code total
4. Work on first try for happy path
5. Handle only the specified edge cases

---

## 📌 Quick Reference Card

```typescript
// User object structure
interface User {
  email: string;
  name: string;
  id: string;
}

// Session key
const SESSION_KEY = 'user';

// Check auth
const isAuthenticated = () => sessionStorage.getItem(SESSION_KEY) !== null;

// Login
const login = (user: User) => {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(user));
  navigate('/dashboard');
};

// Logout
const logout = () => {
  sessionStorage.removeItem(SESSION_KEY);
  navigate('/');
};

// Protected Route
<Route path="/dashboard" element={
  <ProtectedRoute>
    <Dashboard />
  </ProtectedRoute>
} />
```

---

## 🏁 Final Notes

This handbook provides prompts that will create a minimal, working authentication system. The key is to resist the urge to add features not explicitly requested. Each prompt builds on the previous one, creating a complete system through incremental additions rather than complex initial implementations.

Remember: Simple, working code is better than complex, feature-rich code that takes hours to debug.