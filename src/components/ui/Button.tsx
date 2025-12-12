/**
 * Button Component
 * 
 * Reusable button component with variants, sizes, and states.
 * Matches the minimalist design aesthetic from Login/Register pages.
 */

import React from 'react';

/**
 * Button variant types
 */
export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';

/**
 * Button size types
 */
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * Button component props
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Button variant style
   * @default 'primary'
   */
  variant?: ButtonVariant;
  
  /**
   * Button size
   * @default 'md'
   */
  size?: ButtonSize;
  
  /**
   * Show loading spinner and disable button
   * @default false
   */
  loading?: boolean;
  
  /**
   * Button content
   */
  children: React.ReactNode;
}

/**
 * Button Component
 * 
 * Styled button with variants, sizes, and loading states.
 * Matches the design system: rounded-full (pill-shaped), gray-200 bg, gray-900 text.
 * 
 * @example
 * ```tsx
 * <Button variant="primary" size="md" onClick={handleClick}>
 *   Click me
 * </Button>
 * 
 * <Button variant="primary" loading={isLoading}>
 *   Submit
 * </Button>
 * ```
 */
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  children,
  className = '',
  ...props
}) => {
  // Base classes
  const baseClasses = 'font-medium text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2';
  
  // Variant classes
  const variantClasses = {
    primary: 'bg-gray-200 hover:bg-gray-300 active:bg-gray-400',
    secondary: 'bg-white border-2 border-gray-300 hover:bg-gray-50 active:bg-gray-100',
    danger: 'bg-red-100 hover:bg-red-200 active:bg-red-300 text-red-900',
    ghost: 'bg-transparent hover:bg-gray-100 active:bg-gray-200',
  };
  
  // Size classes
  // Note: sm size uses min-height for touch-friendly targets (44px minimum recommended)
  const sizeClasses = {
    sm: 'py-2 px-3 text-sm rounded-full min-h-[44px]',
    md: 'py-3 px-4 text-base rounded-full min-h-[44px]',
    lg: 'py-4 px-6 text-lg rounded-full min-h-[48px]',
  };
  
  // Disabled/loading classes
  const disabledClasses = (disabled || loading) 
    ? 'bg-gray-300 cursor-not-allowed opacity-60' 
    : '';
  
  // Combine all classes
  const combinedClasses = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${disabledClasses}
    ${className}
  `.trim().replace(/\s+/g, ' ');
  
  return (
    <button
      type="button"
      disabled={disabled || loading}
      className={combinedClasses}
      aria-busy={loading}
      aria-disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="flex items-center justify-center">
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-900"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
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
          {children}
        </span>
      ) : (
        children
      )}
    </button>
  );
};
