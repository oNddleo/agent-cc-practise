'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import RegistrationForm from '@/components/auth/RegistrationForm';
import { RegisterFormData } from '@/types/auth';

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (data: RegisterFormData) => {
    setIsLoading(true);
    
    try {
      // Simulate API call - replace with actual registration logic
      console.log('Registration attempt:', data);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate successful registration
      // In a real app, you would:
      // 1. Make API call to your registration endpoint
      // 2. Handle user creation
      // 3. Send verification email
      // 4. Handle errors appropriately
      
      // For demo purposes, redirect to email verification
      router.push(`/auth/verify-email?email=${encodeURIComponent(data.email)}`);
      
    } catch (error) {
      console.error('Registration failed:', error);
      // Handle registration errors here
      // You might want to show a toast notification or set form errors
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <RegistrationForm
          onSubmit={handleRegister}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}