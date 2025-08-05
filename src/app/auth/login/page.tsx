'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import LoginForm from '@/components/auth/LoginForm';
import { LoginFormData } from '@/types/auth';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  // Get redirect URL or default to dashboard
  const redirectTo = searchParams.get('redirect') || '/dashboard';
  const initialEmail = searchParams.get('email') || '';

  const handleLogin = async (data: LoginFormData) => {
    setIsLoading(true);
    
    try {
      // Simulate API call - replace with actual authentication logic
      console.log('Login attempt:', data);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate successful login
      // In a real app, you would:
      // 1. Make API call to your authentication endpoint
      // 2. Handle authentication tokens
      // 3. Update global auth state
      // 4. Handle errors appropriately
      
      // For demo purposes, we'll just redirect
      router.push(redirectTo);
      
    } catch (error) {
      console.error('Login failed:', error);
      // Handle authentication errors here
      // You might want to show a toast notification or set form errors
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <LoginForm
          onSubmit={handleLogin}
          isLoading={isLoading}
          initialEmail={initialEmail}
        />
      </div>
    </div>
  );
}