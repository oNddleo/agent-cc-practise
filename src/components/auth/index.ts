// Authentication component exports
export { default as FormField } from './FormField';
export { default as SocialLoginButton } from './SocialLoginButton';
export { default as LoginForm } from './LoginForm';
export { default as RegistrationForm } from './RegistrationForm';
export { default as ForgotPasswordForm } from './ForgotPasswordForm';
export { default as PasswordResetForm } from './PasswordResetForm';
export { default as EmailVerificationCard } from './EmailVerificationCard';

// Re-export types for convenience
export type {
  LoginFormData,
  RegisterFormData,
  ForgotPasswordFormData,
  PasswordResetFormData,
  EmailVerificationData,
  FormFieldProps,
  ValidationError,
  AuthFormState,
  PasswordStrength,
  SocialProvider,
  AuthStep,
  AuthResponse,
} from '@/types/auth';