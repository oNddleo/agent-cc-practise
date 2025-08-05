export interface LoginFormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

export interface ForgotPasswordFormData {
  email: string;
}

export interface PasswordResetFormData {
  password: string;
  confirmPassword: string;
}

export interface EmailVerificationData {
  email: string;
  code: string;
}

export interface FormFieldProps {
  id: string;
  name: string;
  type: 'text' | 'email' | 'password' | 'checkbox';
  label: string | React.ReactNode;
  placeholder?: string;
  value: string | boolean;
  onChange: (value: string | boolean) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  autoComplete?: string;
  showPasswordToggle?: boolean;
  className?: string;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface AuthFormState {
  isLoading: boolean;
  errors: ValidationError[];
  isValid: boolean;
  touched: Record<string, boolean>;
}

export interface PasswordStrength {
  score: number; // 0-4
  feedback: string[];
  requirements: {
    length: boolean;
    uppercase: boolean;
    lowercase: boolean;
    number: boolean;
    special: boolean;
  };
}

export interface SocialProvider {
  id: 'google' | 'github';
  name: string;
  icon: string;
  color: string;
}

export type AuthStep = 'login' | 'register' | 'forgot-password' | 'reset-password' | 'verify-email' | 'success';

export interface AuthResponse {
  success: boolean;
  message?: string;
  token?: string;
  user?: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
}