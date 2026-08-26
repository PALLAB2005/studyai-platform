import React, { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { SignUpForm } from '../components/auth/SignUpForm';
import { useAuth } from '../context/AuthContext';

export function SignUpPage() {
  const { isAuthenticated, navigate } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-950/40">
      <div className="mb-4 max-w-md mx-auto w-full px-4">
        <button
          id="signup-back-home-btn"
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </button>
      </div>

      <SignUpForm />
    </div>
  );
}
