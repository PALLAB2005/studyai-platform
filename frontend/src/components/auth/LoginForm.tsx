import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, Sparkles, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card';
import { validateLoginForm } from '../../lib/auth';
import { ValidationErrors } from '../../types/auth';

export function LoginForm() {
  const { login, loginWithGoogle, navigate, isLoading } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    const validationErrors = validateLoginForm({ email, password, rememberMe });
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    const res = await login({ email, password, rememberMe });
    if (!res.success && res.error) {
      setSubmitError(res.error);
    }
  };

  const handleGoogleLogin = async () => {
    setSubmitError(null);
    const res = await loginWithGoogle();
    if (!res.success && res.error) {
      setSubmitError(res.error);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 py-8">
      <Card className="shadow-lg shadow-slate-200/50 dark:shadow-none border-slate-200 dark:border-slate-800">
        <CardHeader className="text-center pb-6">
          <div className="mx-auto w-12 h-12 rounded-2xl bg-brand dark:bg-brand text-white flex items-center justify-center shadow-md shadow-brand/25 mb-3">
            <Sparkles className="w-6 h-6" />
          </div>
          <CardTitle className="text-2xl font-bold font-display text-slate-900 dark:text-white">
            Welcome Back 👋
          </CardTitle>
          <CardDescription className="text-sm text-slate-600 dark:text-slate-300">
            Continue your learning journey.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-5">
          {submitError && (
            <div
              id="login-error-alert"
              className="flex items-center gap-2.5 p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800/80 text-rose-700 dark:text-rose-300 text-xs"
            >
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 dark:text-rose-400" />
              <span>{submitError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Email Address */}
            <div className="space-y-1.5 text-left">
              <label
                htmlFor="login-email-input"
                className="block text-xs font-semibold text-slate-700 dark:text-slate-300"
              >
                Email address
              </label>
              <Input
                id="login-email-input"
                type="email"
                placeholder="name@student.edu"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                }}
                icon={<Mail className="w-4 h-4" />}
                error={errors.email}
                autoComplete="email"
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5 text-left">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="login-password-input"
                  className="block text-xs font-semibold text-slate-700 dark:text-slate-300"
                >
                  Password
                </label>
                <button
                  type="button"
                  id="forgot-password-link"
                  onClick={() => alert('Password reset link sent to demo registered email.')}
                  className="text-xs text-brand-600 dark:text-brand-400 hover:underline font-medium"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Input
                  id="login-password-input"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
                  }}
                  icon={<Lock className="w-4 h-4" />}
                  error={errors.password}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  id="toggle-login-password-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 cursor-pointer"
                  title={showPassword ? 'Hide password' : 'Show password'}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <label
                htmlFor="remember-me-checkbox"
                className="flex items-center gap-2 cursor-pointer select-none"
              >
                <input
                  id="remember-me-checkbox"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 dark:border-slate-700 text-brand-600 focus:ring-brand cursor-pointer"
                />
                <span className="text-xs text-slate-600 dark:text-slate-400">
                  Remember me
                </span>
              </label>
            </div>

            {/* Login Button */}
            <Button
              id="login-submit-btn"
              type="submit"
              variant="primary"
              size="lg"
              className="w-full bg-brand hover:bg-brand-dark dark:bg-brand dark:hover:bg-brand font-semibold shadow-md shadow-brand/20"
              isLoading={isLoading}
            >
              Login
            </Button>
          </form>

          {/* Divider */}
          <div className="relative flex items-center justify-center my-4">
            <div className="border-t border-slate-200 dark:border-slate-800 w-full" />
            <span className="bg-white dark:bg-slate-900 px-3 text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider absolute">
              or continue with
            </span>
          </div>

          {/* Google Sign-in Button */}
          <Button
            id="google-login-btn"
            type="button"
            variant="outline"
            size="lg"
            className="w-full justify-center gap-2.5 font-medium border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
            onClick={handleGoogleLogin}
            disabled={isLoading}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            Continue with Google
          </Button>

          {/* Switch to Sign Up */}
          <div className="text-center pt-2">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Don't have an account?{' '}
              <button
                type="button"
                id="switch-to-signup-btn"
                onClick={() => navigate('/signup')}
                className="text-brand-600 dark:text-brand-400 font-semibold hover:underline cursor-pointer"
              >
                Sign Up
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
