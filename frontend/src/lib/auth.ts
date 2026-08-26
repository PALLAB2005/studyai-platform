import { User } from '../types/user';
import { LoginCredentials, SignUpCredentials, ValidationErrors } from '../types/auth';

export const AUTH_STORAGE_KEY = 'studyai_auth_user';
export const THEME_STORAGE_KEY = 'studyai_theme';

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

export function validateLoginForm(credentials: LoginCredentials): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!credentials.email.trim()) {
    errors.email = 'Email address is required';
  } else if (!isValidEmail(credentials.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!credentials.password) {
    errors.password = 'Password is required';
  } else if (credentials.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }

  return errors;
}

export function validateSignUpForm(credentials: SignUpCredentials): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!credentials.name.trim()) {
    errors.name = 'Full name is required';
  } else if (credentials.name.trim().length < 2) {
    errors.name = 'Full name must be at least 2 characters';
  }

  if (!credentials.email.trim()) {
    errors.email = 'Email address is required';
  } else if (!isValidEmail(credentials.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!credentials.password) {
    errors.password = 'Password is required';
  } else if (credentials.password.length < 8) {
    errors.password = 'Password should contain at least 8 characters';
  }

  if (!credentials.confirmPassword) {
    errors.confirmPassword = 'Confirm password is required';
  } else if (credentials.confirmPassword !== credentials.password) {
    errors.confirmPassword = 'Passwords do not match';
  }

  if (!credentials.agreeToTerms) {
    errors.agreeToTerms = 'You must accept the terms and conditions';
  }

  return errors;
}

export function getStoredUser(): User | null {
  try {
    const item = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!item) return null;
    return JSON.parse(item) as User;
  } catch {
    return null;
  }
}

export function saveStoredUser(user: User): void {
  try {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
  } catch (err) {
    console.error('Failed to store user in localStorage', err);
  }
}

export function clearStoredUser(): void {
  try {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  } catch (err) {
    console.error('Failed to clear stored user', err);
  }
}
