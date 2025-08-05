'use client';

import React, { useState, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { RegisterFormData, SocialProvider, PasswordStrength } from '@/types/auth';
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  validateName,
  validateTermsAgreement,
  checkPasswordStrength,
  debounce,
} from '@/utils/validation';
import FormField from './FormField';
import SocialLoginButton from './SocialLoginButton';

interface RegistrationFormProps {
  onSubmit: (data: RegisterFormData) => Promise<void>;
  isLoading?: boolean;
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

const RegistrationForm: React.FC<RegistrationFormProps> = ({
  onSubmit,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState<RegisterFormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
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
    debounce((field: string, value: string | boolean) => {
      let error = '';
      
      switch (field) {
        case 'firstName':
          error = validateName(value as string, 'First name') || '';
          break;
        case 'lastName':
          error = validateName(value as string, 'Last name') || '';
          break;
        case 'email':
          error = validateEmail(value as string) || '';
          break;
        case 'password':
          error = validatePassword(value as string) || '';
          break;
        case 'confirmPassword':
          error = validateConfirmPassword(formData.password, value as string) || '';
          break;
        case 'agreeToTerms':
          error = validateTermsAgreement(value as boolean) || '';
          break;
      }

      setErrors(prev => ({
        ...prev,
        [field]: error,
      }));
    }, 300),
    [formData.password]
  );

  const handleFieldChange = (field: keyof RegisterFormData) => (value: string | boolean) => {
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
    if (touched[field]) {
      debouncedValidation(field, value);
    }

    // Also validate confirm password when password changes
    if (field === 'password' && touched.confirmPassword) {
      debouncedValidation('confirmPassword', formData.confirmPassword);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    const firstNameError = validateName(formData.firstName, 'First name');
    if (firstNameError) newErrors.firstName = firstNameError;

    const lastNameError = validateName(formData.lastName, 'Last name');
    if (lastNameError) newErrors.lastName = lastNameError;

    const emailError = validateEmail(formData.email);
    if (emailError) newErrors.email = emailError;

    const passwordError = validatePassword(formData.password);
    if (passwordError) newErrors.password = passwordError;

    const confirmPasswordError = validateConfirmPassword(formData.password, formData.confirmPassword);
    if (confirmPasswordError) newErrors.confirmPassword = confirmPasswordError;

    const termsError = validateTermsAgreement(formData.agreeToTerms);
    if (termsError) newErrors.agreeToTerms = termsError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched
    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      password: true,
      confirmPassword: true,
      agreeToTerms: true,
    });

    if (!validateForm()) {
      return;
    }

    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  const handleSocialLogin = (provider: SocialProvider) => {
    console.log(`Registering with ${provider.name}`);
  };

  const isFormValid = 
    formData.firstName &&
    formData.lastName &&
    formData.email &&
    formData.password &&
    formData.confirmPassword &&
    formData.agreeToTerms &&
    Object.keys(errors).length === 0;

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Create your account
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Join us today and get started
        </p>
      </div>

      {/* Social Registration Buttons */}
      <div className="space-y-3">
        {socialProviders.map((provider) => (
          <SocialLoginButton
            key={provider.id}
            provider={provider}
            onLogin={handleSocialLogin}
            disabled={isLoading}
          />
        ))}
      </div>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300 dark:border-gray-600" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400">
            Or create account with email
          </span>
        </div>
      </div>

      {/* Registration Form */}
      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        {/* Name Fields */}
        <div className="grid grid-cols-2 gap-4">
          <FormField
            id="firstName"
            name="firstName"
            type="text"
            label="First name"
            placeholder="John"
            value={formData.firstName}
            onChange={handleFieldChange('firstName')}
            error={touched.firstName ? errors.firstName : undefined}
            required
            autoComplete="given-name"
          />

          <FormField
            id="lastName"
            name="lastName"
            type="text"
            label="Last name"
            placeholder="Doe"
            value={formData.lastName}
            onChange={handleFieldChange('lastName')}
            error={touched.lastName ? errors.lastName : undefined}
            required
            autoComplete="family-name"
          />
        </div>

        <FormField
          id="email"
          name="email"
          type="email"
          label="Email address"
          placeholder="john@example.com"
          value={formData.email}
          onChange={handleFieldChange('email')}
          error={touched.email ? errors.email : undefined}
          required
          autoComplete="email"
        />

        <div>
          <FormField
            id="password"
            name="password"
            type="password"
            label="Password"
            placeholder="Create a strong password"
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
          label="Confirm password"
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={handleFieldChange('confirmPassword')}
          error={touched.confirmPassword ? errors.confirmPassword : undefined}
          required
          autoComplete="new-password"
          showPasswordToggle
        />

        {/* Terms Agreement */}
        <FormField
          id="agreeToTerms"
          name="agreeToTerms"
          type="checkbox"
          label={
            <>
              I agree to the{' '}
              <Link
                href="/terms"
                className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 underline"
                target="_blank"
              >
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link
                href="/privacy"
                className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 underline"
                target="_blank"
              >
                Privacy Policy
              </Link>
            </>
          }
          value={formData.agreeToTerms}
          onChange={handleFieldChange('agreeToTerms')}
          error={touched.agreeToTerms ? errors.agreeToTerms : undefined}
          required
        />

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
              Creating account...
            </div>
          ) : (
            'Create account'
          )}
        </button>
      </form>

      {/* Sign In Link */}
      <div className="text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{' '}
          <Link
            href="/auth/login"
            className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 focus:outline-none focus:underline"
          >
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegistrationForm;