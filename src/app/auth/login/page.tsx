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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Animation Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-float"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-float" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Main Content */}
      <div className="max-w-md w-full space-y-8 relative z-10">
        {/* Back to Home */}
        <div className="text-center animate-fade-in">
          <button
            onClick={() => router.push('/')}
            className="inline-flex items-center text-gray-300 hover:text-white transition-colors mb-8"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to CryptoFolio
          </button>
        </div>

        {/* Glass Card Container */}
        <div className="portfolio-card animate-scale-in">
          <LoginForm
            onSubmit={handleLogin}
            isLoading={isLoading}
            initialEmail={initialEmail}
          />
        </div>

        {/* Footer Links */}
        <div className="text-center space-y-4 animate-fade-in" style={{animationDelay: '0.8s'}}>
          <p className="text-gray-400">
            Don&apos;t have an account?{' '}
            <button
              onClick={() => router.push('/auth/register')}
              className="text-green-400 hover:text-green-300 font-medium transition-colors"
            >
              Sign up for free
            </button>
          </p>
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
            <a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
            <span>·</span>
            <a href="#" className="hover:text-gray-300 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </div>
  );
}