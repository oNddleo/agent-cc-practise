'use client';

import React, { useState } from 'react';
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';
import { ForgotPasswordFormData } from '@/types/auth';

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleForgotPassword = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    
    try {
      // Simulate API call - replace with actual forgot password logic
      console.log('Forgot password request:', data);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate successful password reset request
      // In a real app, you would:
      // 1. Make API call to your forgot password endpoint
      // 2. Send password reset email
      // 3. Handle errors appropriately
      
      setIsSuccess(true);
      
    } catch (error) {
      console.error('Forgot password failed:', error);
      // Handle forgot password errors here
      // You might want to show a toast notification or set form errors
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <ForgotPasswordForm
          onSubmit={handleForgotPassword}
          isLoading={isLoading}
          isSuccess={isSuccess}
        />
      </div>
    </div>
  );
}