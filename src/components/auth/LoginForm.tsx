'use client';

import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import { LoginFormData, ValidationError, SocialProvider } from '@/types/auth';
import { validateEmail, validatePassword, debounce } from '@/utils/validation';
import FormField from './FormField';
import SocialLoginButton from './SocialLoginButton';

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => Promise<void>;
  isLoading?: boolean;
  initialEmail?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  isLoading = false,
  initialEmail = '',
}) => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: initialEmail,
    password: '',
    rememberMe: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Social providers configuration
  const socialProviders: SocialProvider[] = [
    {
      id: 'google',
      name: 'Google',
      icon: 'google',
      color: '#4285f4',
    },
    {
      id: 'github',
      name: 'GitHub',
      icon: 'github',
      color: '#333',
    },
  ];

  // Debounced validation
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedValidation = useCallback(
    debounce((field: string, value: string) => {
      let error = '';
      
      switch (field) {
        case 'email':
          error = validateEmail(value) || '';
          break;
        case 'password':
          error = validatePassword(value) || '';
          break;
      }

      setErrors(prev => ({
        ...prev,
        [field]: error,
      }));
    }, 300),
    []
  );

  const handleFieldChange = (field: keyof LoginFormData) => (value: string | boolean) => {
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
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    const emailError = validateEmail(formData.email);
    if (emailError) newErrors.email = emailError;

    const passwordError = validatePassword(formData.password);
    if (passwordError) newErrors.password = passwordError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched
    setTouched({
      email: true,
      password: true,
    });

    if (!validateForm()) {
      return;
    }

    try {
      await onSubmit(formData);
    } catch (error) {
      // Handle submission errors
      console.error('Login error:', error);
    }
  };

  const handleSocialLogin = (provider: SocialProvider) => {
    // Placeholder for social login implementation
    console.log(`Logging in with ${provider.name}`);
    // This would typically redirect to OAuth provider or open popup
  };

  const isFormValid = formData.email && formData.password && Object.keys(errors).length === 0;

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      {/* Header */}
      <div className="text-center animate-fade-in">
        <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-scale-in">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white text-financial">
          Welcome back
        </h1>
        <p className="mt-2 text-gray-300">
          Please sign in to your account
        </p>
      </div>

      {/* Social Login Buttons */}
      <div className="space-y-3 animate-slide-up" style={{animationDelay: '0.2s'}}>
        {socialProviders.map((provider, index) => (
          <div key={provider.id} className="animate-slide-in-left" style={{animationDelay: `${0.3 + index * 0.1}s`}}>
            <SocialLoginButton
              provider={provider}
              onLogin={handleSocialLogin}
              disabled={isLoading}
            />
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="relative animate-fade-in" style={{animationDelay: '0.5s'}}>
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300 dark:border-gray-600" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400">
            Or continue with email
          </span>
        </div>
      </div>

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-6 animate-slide-up" style={{animationDelay: '0.6s'}} noValidate>
        <FormField
          id="email"
          name="email"
          type="email"
          label="Email address"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleFieldChange('email')}
          error={touched.email ? errors.email : undefined}
          required
          autoComplete="email"
        />

        <FormField
          id="password"
          name="password"
          type="password"
          label="Password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleFieldChange('password')}
          error={touched.password ? errors.password : undefined}
          required
          autoComplete="current-password"
          showPasswordToggle
        />

        {/* Remember Me and Forgot Password */}
        <div className="flex items-center justify-between">
          <FormField
            id="rememberMe"
            name="rememberMe"
            type="checkbox"
            label="Remember me"
            value={formData.rememberMe || false}
            onChange={handleFieldChange('rememberMe')}
            className="flex-shrink-0"
          />

          <Link
            href="/auth/forgot-password"
            className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 focus:outline-none focus:underline"
          >
            Forgot your password?
          </Link>
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
              Signing in...
            </div>
          ) : (
            'Sign in'
          )}
        </button>
      </form>

      {/* Sign Up Link */}
      <div className="text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Don&apos;t have an account?{' '}
          <Link
            href="/auth/register"
            className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 focus:outline-none focus:underline"
          >
            Sign up for free
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;