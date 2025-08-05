'use client';

import React, { useState } from 'react';
import { FormFieldProps } from '@/types/auth';

const FormField: React.FC<FormFieldProps> = ({
  id,
  name,
  type,
  label,
  placeholder,
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  autoComplete,
  showPasswordToggle = false,
  className = '',
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (type === 'checkbox') {
      onChange(e.target.checked);
    } else {
      onChange(e.target.value);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const inputType = type === 'password' && showPassword ? 'text' : type;
  const hasError = Boolean(error);
  const isCheckbox = type === 'checkbox';

  const baseInputClasses = `
    w-full px-4 py-3 text-base
    border-2 rounded-lg
    transition-all duration-200 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-blue-500/20
    disabled:opacity-50 disabled:cursor-not-allowed
    bg-white dark:bg-gray-800
    text-gray-900 dark:text-gray-100
    placeholder-gray-500 dark:placeholder-gray-400
  `;

  const checkboxClasses = `
    w-5 h-5 text-blue-600 
    border-2 border-gray-300 dark:border-gray-600
    rounded focus:ring-blue-500 focus:ring-2
    bg-white dark:bg-gray-800
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const inputStateClasses = hasError
    ? 'border-red-500 focus:border-red-500'
    : isFocused
    ? 'border-blue-500'
    : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500';

  if (isCheckbox) {
    return (
      <div className={`flex items-start space-x-3 ${className}`}>
        <div className="flex items-center h-6">
          <input
            id={id}
            name={name}
            type="checkbox"
            checked={value as boolean}
            onChange={handleChange}
            disabled={disabled}
            required={required}
            className={checkboxClasses}
            aria-describedby={hasError ? `${id}-error` : undefined}
          />
        </div>
        <div className="flex-1">
          <label
            htmlFor={id}
            className="text-sm text-gray-700 dark:text-gray-300 leading-6 cursor-pointer"
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
          {hasError && (
            <p
              id={`${id}-error`}
              role="alert"
              className="mt-1 text-sm text-red-600 dark:text-red-400"
            >
              {error}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-2 ${className}`}>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <div className="relative">
        <input
          id={id}
          name={name}
          type={inputType}
          value={value as string}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          autoComplete={autoComplete}
          className={`${baseInputClasses} ${inputStateClasses} ${
            showPasswordToggle ? 'pr-12' : ''
          }`}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${id}-error` : undefined}
        />
        
        {showPasswordToggle && type === 'password' && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none focus:text-gray-700 dark:focus:text-gray-200"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            )}
          </button>
        )}
      </div>
      
      {hasError && (
        <p
          id={`${id}-error`}
          role="alert"
          className="text-sm text-red-600 dark:text-red-400 flex items-center"
        >
          <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
};

export default FormField;