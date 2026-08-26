import React, { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Sparkles } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, navigate, currentPath } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      // Store redirect target if desired or simply route to /login
      navigate('/login');
    }
  }, [isAuthenticated, isLoading, navigate, currentPath]);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-blue-600/10 text-brand-600 flex items-center justify-center animate-pulse">
          <Sparkles className="w-6 h-6 animate-spin" />
        </div>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
          Verifying session...
        </p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
