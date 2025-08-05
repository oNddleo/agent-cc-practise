'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { EmailVerificationData } from '@/types/auth';
import FormField from './FormField';

interface EmailVerificationCardProps {
  email: string;
  onVerify: (data: EmailVerificationData) => Promise<void>;
  onResendCode: (email: string) => Promise<void>;
  isLoading?: boolean;
  isResending?: boolean;
  isSuccess?: boolean;
}

const EmailVerificationCard: React.FC<EmailVerificationCardProps> = ({
  email,
  onVerify,
  onResendCode,
  isLoading = false,
  isResending = false,
  isSuccess = false,
}) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);

  // Countdown timer for resend button
  useEffect(() => {
    if (timeLeft > 0 && !canResend) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setCanResend(true);
    }
  }, [timeLeft, canResend]);

  const handleCodeChange = useCallback((value: string | boolean) => {
    const newCode = (value as string).replace(/\D/g, '').slice(0, 6);
    setCode(newCode);
    setError('');
  }, []);

  const validateCode = (): boolean => {
    if (!code) {
      setError('Verification code is required');
      return false;
    }
    
    if (code.length !== 6) {
      setError('Please enter a 6-digit verification code');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateCode()) {
      return;
    }

    try {
      await onVerify({ email, code });
    } catch (error) {
      setError('Invalid or expired verification code');
      console.error('Verification error:', error);
    }
  };

  const handleResendCode = async () => {
    if (!canResend || isResending) return;

    try {
      await onResendCode(email);
      setTimeLeft(60);
      setCanResend(false);
      setError('');
    } catch (error) {
      setError('Failed to resend verification code');
      console.error('Resend error:', error);
    }
  };

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
            Email verified successfully!
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Your email has been verified. You can now access all features of your account.
          </p>
        </div>

        <Link
          href="/dashboard"
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
        >
          Continue to dashboard
        </Link>
      </div>
    );
  }

  // Verification form
  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        {/* Email Icon */}
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900/20 mb-4">
          <svg
            className="h-8 w-8 text-blue-600 dark:text-blue-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Verify your email
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          We&apos;ve sent a 6-digit verification code to
        </p>
        <p className="font-medium text-gray-900 dark:text-white">
          {email}
        </p>
      </div>

      {/* Verification Form */}
      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        <div>
          <FormField
            id="code"
            name="code"
            type="text"
            label="Verification code"
            placeholder="Enter 6-digit code"
            value={code}
            onChange={handleCodeChange}
            error={error}
            required
            className="text-center"
          />
          
          {/* Code input styling */}
          <style jsx>{`
            input[name="code"] {
              text-align: center !important;
              font-size: 1.5rem !important;
              letter-spacing: 0.5rem !important;
              font-weight: 600 !important;
            }
          `}</style>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!code || code.length !== 6 || isLoading}
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
              Verifying...
            </div>
          ) : (
            'Verify email'
          )}
        </button>
      </form>

      {/* Resend Code */}
      <div className="text-center space-y-3">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Didn&apos;t receive the code?
        </p>
        
        <button
          onClick={handleResendCode}
          disabled={!canResend || isResending}
          className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 focus:outline-none focus:underline disabled:opacity-50 disabled:cursor-not-allowed disabled:no-underline"
        >
          {isResending ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4"
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
              Sending...
            </span>
          ) : canResend ? (
            'Resend code'
          ) : (
            `Resend code in ${timeLeft}s`
          )}
        </button>
      </div>

      {/* Help Text */}
      <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
        <div className="flex items-start">
          <svg
            className="h-5 w-5 text-gray-600 dark:text-gray-400 mt-0.5 mr-3 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <p className="font-medium mb-1">Having trouble?</p>
            <ul className="space-y-1">
              <li>• Check your spam or junk folder</li>
              <li>• Make sure the email address is correct</li>
              <li>• The code expires in 10 minutes</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Change Email */}
      <div className="text-center">
        <Link
          href="/auth/register"
          className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 focus:outline-none focus:underline"
        >
          Use a different email address
        </Link>
      </div>
    </div>
  );
};

export default EmailVerificationCard;