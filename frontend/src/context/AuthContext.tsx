import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types/user';
import { LoginCredentials, SignUpCredentials } from '../types/auth';
import {
  getStoredUser,
  saveStoredUser,
  clearStoredUser,
  validateLoginForm,
  validateSignUpForm
} from '../lib/auth';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  currentPath: string;
  navigate: (path: string) => void;
  login: (credentials: LoginCredentials) => Promise<{ success: boolean; error?: string }>;
  signup: (credentials: SignUpCredentials) => Promise<{ success: boolean; error?: string }>;
  loginWithGoogle: () => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      return path && path !== '' ? path : '/';
    }
    return '/';
  });

  // Initialize auth state from local storage
  useEffect(() => {
    try {
      const stored = getStoredUser();
      if (stored) {
        setUser(stored);
      }
    } catch (err) {
      console.error('Error restoring auth state', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Listen for browser popstate events (Back / Forward navigation)
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Custom client-side navigate function
  const navigate = (path: string) => {
    if (typeof window !== 'undefined') {
      if (window.location.pathname !== path) {
        window.history.pushState({}, '', path);
      }
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Mock Login
  const login = async (credentials: LoginCredentials): Promise<{ success: boolean; error?: string }> => {
    const errors = validateLoginForm(credentials);
    if (Object.keys(errors).length > 0) {
      const firstError = Object.values(errors)[0];
      return { success: false, error: firstError };
    }

    // Simulate mock login
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 600));

    // Extract name from email as fallback or standard mock name
    const emailName = credentials.email.split('@')[0];
    const formattedName =
      emailName.charAt(0).toUpperCase() + emailName.slice(1).replace(/[._-]/g, ' ');

    const mockUser: User = {
      id: `usr_${Date.now()}`,
      name: formattedName || 'Student',
      email: credentials.email.toLowerCase().trim(),
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(credentials.email)}`,
      createdAt: new Date().toISOString(),
    };

    setUser(mockUser);
    saveStoredUser(mockUser);
    setIsLoading(false);

    // Redirect to dashboard
    navigate('/dashboard');
    return { success: true };
  };

  // Mock Sign Up
  const signup = async (credentials: SignUpCredentials): Promise<{ success: boolean; error?: string }> => {
    const errors = validateSignUpForm(credentials);
    if (Object.keys(errors).length > 0) {
      const firstError = Object.values(errors)[0];
      return { success: false, error: firstError };
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 600));

    const mockUser: User = {
      id: `usr_${Date.now()}`,
      name: credentials.name.trim(),
      email: credentials.email.toLowerCase().trim(),
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(credentials.email)}`,
      createdAt: new Date().toISOString(),
    };

    setUser(mockUser);
    saveStoredUser(mockUser);
    setIsLoading(false);

    // Redirect to dashboard
    navigate('/dashboard');
    return { success: true };
  };

  // Mock Google Sign-In
  const loginWithGoogle = async (): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 700));

    const mockGoogleUser: User = {
      id: `usr_g_${Date.now()}`,
      name: 'Alex Johnson',
      email: 'alex.johnson@student.edu',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
      createdAt: new Date().toISOString(),
    };

    setUser(mockGoogleUser);
    saveStoredUser(mockGoogleUser);
    setIsLoading(false);

    navigate('/dashboard');
    return { success: true };
  };

  // Logout
  const logout = () => {
    setUser(null);
    clearStoredUser();
    navigate('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        currentPath,
        navigate,
        login,
        signup,
        loginWithGoogle,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
