'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import PasswordResetForm from '@/components/auth/PasswordResetForm';
import { PasswordResetFormData } from '@/types/auth';

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Get reset token from URL parameters
  const token = searchParams.get('token');

  const handlePasswordReset = async (data: PasswordResetFormData) => {
    setIsLoading(true);
    
    try {
      // Simulate API call - replace with actual password reset logic
      console.log('Password reset attempt:', { token, ...data });
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate successful password reset
      // In a real app, you would:
      // 1. Make API call to your password reset endpoint
      // 2. Validate the reset token
      // 3. Update the user's password
      // 4. Handle errors appropriately
      
      setIsSuccess(true);
      
    } catch (error) {
      console.error('Password reset failed:', error);
      // Handle password reset errors here
      // You might want to show a toast notification or set form errors
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <PasswordResetForm
          onSubmit={handlePasswordReset}
          isLoading={isLoading}
          isSuccess={isSuccess}
          token={token || undefined}
        />
      </div>
    </div>
  );
}