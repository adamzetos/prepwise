/**
 * ADAMCHINS PrepWise
 * Classification: ADAMCHINS-CONFIDENTIAL ▲
 * Component: AuthContext
 * Purpose: Manage authentication state for Google SSO
 * Why Needed: Provide session-based authentication across the application
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface User {
  email: string;
  name: string;
  picture: string;
  id: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (googleResponse: any) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already logged in (from session)
  useEffect(() => {
    // Session-based auth - check sessionStorage (browser session only)
    const savedUser = sessionStorage.getItem('prepwise-user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Failed to parse saved user:', error);
        sessionStorage.removeItem('prepwise-user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = useCallback((googleResponse: any) => {
    try {
      let newUser: User;
      
      // Handle different response formats
      if (googleResponse.credential) {
        // JWT credential format (Google Sign-In)
        try {
          const decoded = JSON.parse(atob(googleResponse.credential.split('.')[1]));
          newUser = {
            email: decoded.email,
            name: decoded.name,
            picture: decoded.picture,
            id: decoded.sub,
          };
        } catch (decodeError) {
          // If it's not a JWT, try parsing as JSON
          const decoded = JSON.parse(googleResponse.credential);
          newUser = {
            email: decoded.email,
            name: decoded.name,
            picture: decoded.picture,
            id: decoded.sub,
          };
        }
      } else if (googleResponse.email) {
        // Direct user info format
        newUser = {
          email: googleResponse.email,
          name: googleResponse.name,
          picture: googleResponse.picture,
          id: googleResponse.id || googleResponse.sub,
        };
      } else {
        throw new Error('Invalid response format');
      }
      
      setUser(newUser);
      // Save to sessionStorage for session persistence
      sessionStorage.setItem('prepwise-user', JSON.stringify(newUser));
      // Return true to indicate successful login
      return true;
    } catch (error) {
      console.error('Failed to process Google authentication:', error);
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    // Clear session storage
    sessionStorage.removeItem('prepwise-user');
    // Optionally revoke Google token
    if (window.google) {
      window.google.accounts.id.disableAutoSelect();
    }
  }, []);

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Type declaration for Google Sign-In
declare global {
  interface Window {
    google: any;
  }
}