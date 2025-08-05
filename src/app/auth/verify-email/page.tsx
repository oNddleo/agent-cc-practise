'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import EmailVerificationCard from '@/components/auth/EmailVerificationCard';
import { EmailVerificationData } from '@/types/auth';

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Get email from URL parameters
  const email = searchParams.get('email') || '';

  // Redirect if no email provided
  React.useEffect(() => {
    if (!email) {
      router.push('/auth/register');
    }
  }, [email, router]);

  const handleVerifyEmail = async (data: EmailVerificationData) => {
    setIsLoading(true);
    
    try {
      // Simulate API call - replace with actual email verification logic
      console.log('Email verification attempt:', data);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate successful verification
      // In a real app, you would:
      // 1. Make API call to your email verification endpoint
      // 2. Validate the verification code
      // 3. Mark the user's email as verified
      // 4. Handle errors appropriately
      
      setIsSuccess(true);
      
      // Automatically redirect after success
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
      
    } catch (error) {
      console.error('Email verification failed:', error);
      // Handle verification errors here
      // You might want to show a toast notification or set form errors
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async (email: string) => {
    setIsResending(true);
    
    try {
      // Simulate API call - replace with actual resend code logic
      console.log('Resending verification code to:', email);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate successful resend
      // In a real app, you would:
      // 1. Make API call to resend verification code
      // 2. Handle errors appropriately
      
    } catch (error) {
      console.error('Resend code failed:', error);
      // Handle resend errors here
    } finally {
      setIsResending(false);
    }
  };

  if (!email) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <EmailVerificationCard
          email={email}
          onVerify={handleVerifyEmail}
          onResendCode={handleResendCode}
          isLoading={isLoading}
          isResending={isResending}
          isSuccess={isSuccess}
        />
      </div>
    </div>
  );
}