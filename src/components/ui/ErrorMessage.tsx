/**
 * ErrorMessage Component
 * 
 * Reusable error message display component.
 * Matches the error display style from Login/Register pages.
 */

import React, { useState } from 'react';

/**
 * ErrorMessage component props
 */
export interface ErrorMessageProps {
  /**
   * Error message text to display
   */
  message: string;
  
  /**
   * Whether the error message can be dismissed
   * @default false
   */
  dismissible?: boolean;
  
  /**
   * Callback when error is dismissed (only used if dismissible is true)
   */
  onDismiss?: () => void;
  
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * ErrorMessage Component
 * 
 * Displays error messages with consistent styling.
 * Matches the design system: bg-red-50, border-red-200, text-red-600.
 * 
 * @example
 * ```tsx
 * <ErrorMessage message="Something went wrong" />
 * 
 * <ErrorMessage 
 *   message="Error occurred" 
 *   dismissible 
 *   onDismiss={() => setError(null)} 
 * />
 * ```
 */
export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  dismissible = false,
  onDismiss,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(true);
  
  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };
  
  if (!isVisible) {
    return null;
  }
  
  return (
    <div
      className={`p-3 bg-red-50 border border-red-200 rounded-lg ${className}`}
      role="alert"
      aria-live="polite"
    >
      <div className="flex items-start justify-between">
        <p className="text-sm text-red-600 flex-1">{message}</p>
        {dismissible && (
          <button
            type="button"
            onClick={handleDismiss}
            className="ml-3 text-red-600 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
            aria-label="Dismiss error message"
          >
            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};
