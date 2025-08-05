import { ValidationError, PasswordStrength } from '@/types/auth';

// Email validation
export const validateEmail = (email: string): string | null => {
  if (!email) return 'Email is required';
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'Please enter a valid email address';
  }
  
  return null;
};

// Password validation
export const validatePassword = (password: string): string | null => {
  if (!password) return 'Password is required';
  
  if (password.length < 8) {
    return 'Password must be at least 8 characters long';
  }
  
  return null;
};

// Password strength checker
export const checkPasswordStrength = (password: string): PasswordStrength => {
  const requirements = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  const metRequirements = Object.values(requirements).filter(Boolean).length;
  let score = 0;
  const feedback: string[] = [];

  if (requirements.length) score++;
  else feedback.push('Use at least 8 characters');

  if (requirements.uppercase) score++;
  else feedback.push('Add uppercase letters');

  if (requirements.lowercase) score++;
  else feedback.push('Add lowercase letters');

  if (requirements.number) score++;
  else feedback.push('Add numbers');

  if (requirements.special) score++;
  else feedback.push('Add special characters');

  // Additional feedback based on score
  if (score === 5) {
    feedback.length = 0; // Clear feedback for perfect score
    feedback.push('Strong password!');
  } else if (score >= 3) {
    feedback.unshift('Good password strength');
  } else if (score >= 2) {
    feedback.unshift('Fair password strength');
  } else {
    feedback.unshift('Weak password');
  }

  return {
    score: Math.min(score, 4), // Cap at 4 for UI purposes
    feedback,
    requirements,
  };
};

// Confirm password validation
export const validateConfirmPassword = (password: string, confirmPassword: string): string | null => {
  if (!confirmPassword) return 'Please confirm your password';
  
  if (password !== confirmPassword) {
    return 'Passwords do not match';
  }
  
  return null;
};

// Name validation
export const validateName = (name: string, fieldName: string): string | null => {
  if (!name) return `${fieldName} is required`;
  
  if (name.length < 2) {
    return `${fieldName} must be at least 2 characters long`;
  }
  
  if (name.length > 50) {
    return `${fieldName} must be less than 50 characters`;
  }
  
  if (!/^[a-zA-Z\s'-]+$/.test(name)) {
    return `${fieldName} can only contain letters, spaces, hyphens, and apostrophes`;
  }
  
  return null;
};

// Terms agreement validation
export const validateTermsAgreement = (agreed: boolean): string | null => {
  if (!agreed) return 'You must agree to the terms and conditions';
  return null;
};

// Generic form validation
export const validateForm = (data: Record<string, any>, rules: Record<string, (value: any) => string | null>): ValidationError[] => {
  const errors: ValidationError[] = [];
  
  Object.entries(rules).forEach(([field, validator]) => {
    const error = validator(data[field]);
    if (error) {
      errors.push({ field, message: error });
    }
  });
  
  return errors;
};

// Debounced validation for real-time feedback
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};