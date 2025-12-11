/**
 * Input Component
 * 
 * Reusable text input component with validation states.
 * Matches the minimalist design aesthetic from Login/Register pages.
 */

import React from 'react';

/**
 * Input component props
 */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Input label text
   */
  label?: string;
  
  /**
   * Error message to display
   */
  error?: string;
  
  /**
   * Whether the field is required
   * @default false
   */
  required?: boolean;
  
  /**
   * Helper text to display below input
   */
  helperText?: string;
}

/**
 * Input Component
 * 
 * Text input with label, error states, and validation.
 * Matches the design system: rounded-lg, border-gray-300, focus:ring-2 focus:ring-gray-900.
 * 
 * @example
 * ```tsx
 * <Input
 *   label="Email"
 *   type="email"
 *   value={email}
 *   onChange={(e) => setEmail(e.target.value)}
 *   error={errors.email}
 *   required
 * />
 * ```
 */
export const Input: React.FC<InputProps> = ({
  label,
  error,
  required = false,
  helperText,
  className = '',
  id,
  ...props
}) => {
  // Generate unique ID if not provided
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  const errorId = error ? `${inputId}-error` : undefined;
  const helperId = helperText ? `${inputId}-helper` : undefined;
  const describedBy = [errorId, helperId].filter(Boolean).join(' ') || undefined;
  
  // Base input classes
  const baseClasses = 'w-full px-4 py-3 border rounded-lg focus:outline-none transition-colors';
  
  // State classes
  const stateClasses = error
    ? 'border-red-500 focus:ring-2 focus:ring-red-500 focus:border-red-500'
    : 'border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-gray-900';
  
  // Disabled classes
  const disabledClasses = props.disabled
    ? 'bg-gray-100 cursor-not-allowed opacity-60'
    : '';
  
  // Combine all classes
  const inputClasses = `
    ${baseClasses}
    ${stateClasses}
    ${disabledClasses}
    ${className}
  `.trim().replace(/\s+/g, ' ');
  
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          {label}
          {required && (
            <span className="text-red-500 ml-1" aria-label="required">
              *
            </span>
          )}
        </label>
      )}
      
      <input
        id={inputId}
        className={inputClasses}
        aria-invalid={!!error}
        aria-describedby={describedBy}
        aria-required={required}
        {...props}
      />
      
      {error && (
        <p
          id={errorId}
          className="mt-1 text-sm text-red-600"
          role="alert"
          aria-live="polite"
        >
          {error}
        </p>
      )}
      
      {helperText && !error && (
        <p
          id={helperId}
          className="mt-1 text-sm text-gray-500"
        >
          {helperText}
        </p>
      )}
    </div>
  );
};
