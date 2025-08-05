'use client';

import React, { useState, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { PasswordResetFormData, PasswordStrength } from '@/types/auth';
import { validatePassword, validateConfirmPassword, checkPasswordStrength, debounce } from '@/utils/validation';
import FormField from './FormField';

interface PasswordResetFormProps {
  onSubmit: (data: PasswordResetFormData) => Promise<void>;
  isLoading?: boolean;
  isSuccess?: boolean;
  token?: string;
}

const PasswordStrengthIndicator: React.FC<{ strength: PasswordStrength }> = ({ strength }) => {
  const getStrengthColor = (score: number) => {
    switch (score) {
      case 0:
      case 1:
        return 'bg-red-500';
      case 2:
        return 'bg-yellow-500';
      case 3:
        return 'bg-blue-500';
      case 4:
        return 'bg-green-500';
      default:
        return 'bg-gray-300';
    }
  };

  const getStrengthText = (score: number) => {
    switch (score) {
      case 0:
      case 1:
        return 'Weak';
      case 2:
        return 'Fair';
      case 3:
        return 'Good';
      case 4:
        return 'Strong';
      default:
        return '';
    }
  };

  return (
    <div className="mt-2 space-y-2">
      {/* Strength bar */}
      <div className="flex space-x-1">
        {[0, 1, 2, 3].map((index) => (
          <div
            key={index}
            className={`h-2 flex-1 rounded-full ${
              index < strength.score ? getStrengthColor(strength.score) : 'bg-gray-200 dark:bg-gray-700'
            }`}
          />
        ))}
      </div>

      {/* Strength text and feedback */}
      <div className="space-y-1">
        <p className={`text-sm font-medium ${
          strength.score >= 3 ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-400'
        }`}>
          Password strength: {getStrengthText(strength.score)}
        </p>
        
        {strength.feedback.length > 0 && (
          <ul className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
            {strength.feedback.slice(1).map((feedback, index) => (
              <li key={index} className="flex items-center">
                <span className="w-1 h-1 bg-gray-400 rounded-full mr-2" />
                {feedback}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

const PasswordResetForm: React.FC<PasswordResetFormProps> = ({
  onSubmit,
  isLoading = false,
  isSuccess = false,
  token,
}) => {
  const [formData, setFormData] = useState<PasswordResetFormData>({
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Calculate password strength
  const passwordStrength = useMemo(() => {
    if (!formData.password) {
      return { score: 0, feedback: [], requirements: {
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        special: false,
      }};
    }
    return checkPasswordStrength(formData.password);
  }, [formData.password]);

  // Debounced validation
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedValidation = useCallback(
    debounce((field: string, value: string) => {
      let error = '';
      
      switch (field) {
        case 'password':
          error = validatePassword(value) || '';
          break;
        case 'confirmPassword':
          error = validateConfirmPassword(formData.password, value) || '';
          break;
      }

      setErrors(prev => ({
        ...prev,
        [field]: error,
      }));
    }, 300),
    [formData.password]
  );

  const handleFieldChange = (field: keyof PasswordResetFormData) => (value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));

    // Mark field as touched
    setTouched(prev => ({
      ...prev,
      [field]: true,
    }));

    // Validate field if it's been touched
    if (typeof value === 'string' && touched[field]) {
      debouncedValidation(field, value);
    }

    // Also validate confirm password when password changes
    if (field === 'password' && touched.confirmPassword) {
      debouncedValidation('confirmPassword', formData.confirmPassword);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    const passwordError = validatePassword(formData.password);
    if (passwordError) newErrors.password = passwordError;

    const confirmPasswordError = validateConfirmPassword(formData.password, formData.confirmPassword);
    if (confirmPasswordError) newErrors.confirmPassword = confirmPasswordError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched
    setTouched({
      password: true,
      confirmPassword: true,
    });

    if (!validateForm()) {
      return;
    }

    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Password reset error:', error);
    }
  };

  // Check if token is invalid or expired
  if (!token) {
    return (
      <div className="w-full max-w-md mx-auto space-y-6">
        <div className="text-center">
          {/* Error Icon */}
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 dark:bg-red-900/20 mb-4">
            <svg
              className="h-8 w-8 text-red-600 dark:text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Invalid or expired link
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            This password reset link is invalid or has expired. Please request a new one.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/auth/forgot-password"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
          >
            Request new reset link
          </Link>

          <div className="text-center">
            <Link
              href="/auth/login"
              className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 focus:outline-none focus:underline"
            >
              Back to sign in
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Success state
  if (isSuccess) {
    return (
      <div className="w-full max-w-md mx-auto space-y-6">
        <div className="text-center">
          {/* Success Icon */}
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/20 mb-4">
            <svg
              className="h-8 w-8 text-green-600 dark:text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Password reset successful
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Your password has been successfully updated. You can now sign in with your new password.
          </p>
        </div>

        <Link
          href="/auth/login"
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
        >
          Continue to sign in
        </Link>
      </div>
    );
  }

  const isFormValid = 
    formData.password &&
    formData.confirmPassword &&
    Object.keys(errors).length === 0;

  // Form state
  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Reset your password
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Enter your new password below
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        <div>
          <FormField
            id="password"
            name="password"
            type="password"
            label="New password"
            placeholder="Enter your new password"
            value={formData.password}
            onChange={handleFieldChange('password')}
            error={touched.password ? errors.password : undefined}
            required
            autoComplete="new-password"
            showPasswordToggle
          />
          
          {/* Password Strength Indicator */}
          {formData.password && (
            <PasswordStrengthIndicator strength={passwordStrength} />
          )}
        </div>

        <FormField
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          label="Confirm new password"
          placeholder="Confirm your new password"
          value={formData.confirmPassword}
          onChange={handleFieldChange('confirmPassword')}
          error={touched.confirmPassword ? errors.confirmPassword : undefined}
          required
          autoComplete="new-password"
          showPasswordToggle
        />

        {/* Security Note */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <div className="flex items-start">
            <svg
              className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-3 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div className="text-sm text-blue-700 dark:text-blue-300">
              <p className="font-medium mb-1">Choose a strong password</p>
              <p>Make sure your password is at least 8 characters long and includes a mix of letters, numbers, and symbols.</p>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!isFormValid || isLoading}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
        >
          {isLoading ? (
            <div className="flex items-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Updating password...
            </div>
          ) : (
            'Update password'
          )}
        </button>
      </form>

      {/* Back to Login */}
      <div className="text-center">
        <Link
          href="/auth/login"
          className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 focus:outline-none focus:underline"
        >
          <svg
            className="mr-2 h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to sign in
        </Link>
      </div>
    </div>
  );
};

export default PasswordResetForm;