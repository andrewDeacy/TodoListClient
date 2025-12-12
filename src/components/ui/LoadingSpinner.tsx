/**
 * LoadingSpinner Component
 * 
 * Reusable loading indicator component.
 * Matches the spinner design from Login/Register pages.
 */

import React from 'react';

/**
 * LoadingSpinner size types
 */
export type SpinnerSize = 'sm' | 'md' | 'lg';

/**
 * LoadingSpinner component props
 */
export interface LoadingSpinnerProps {
  /**
   * Spinner size
   * @default 'md'
   */
  size?: SpinnerSize;
  
  /**
   * Optional text to display below spinner
   */
  text?: string;
  
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Whether to show full screen overlay
   * @default false
   */
  fullScreen?: boolean;
}

/**
 * LoadingSpinner Component
 * 
 * Animated loading spinner with optional text.
 * Matches the design system: animate-spin, gray-900 color.
 * 
 * @example
 * ```tsx
 * <LoadingSpinner size="md" text="Loading..." />
 * 
 * <LoadingSpinner fullScreen text="Please wait..." />
 * ```
 */
export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  text,
  className = '',
  fullScreen = false,
}) => {
  // Size classes for SVG
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-8 w-8',
  };
  
  // Spinner SVG
  const spinner = (
    <svg
      className={`animate-spin text-gray-900 ${sizeClasses[size]}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
      role="img"
      aria-label="Loading"
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
  );
  
  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50" role="status" aria-live="polite">
        <div className={`flex flex-col items-center ${className}`}>
          {spinner}
          {text && (
            <p className="mt-4 text-sm text-gray-600">{text}</p>
          )}
        </div>
      </div>
    );
  }
  
  return (
    <div className={`flex flex-col items-center ${className}`} role="status" aria-live="polite">
      {spinner}
      {text && (
        <p className="mt-2 text-sm text-gray-600">{text}</p>
      )}
    </div>
  );
};
