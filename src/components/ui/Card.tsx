/**
 * Card Component
 * 
 * Reusable container card component.
 * Matches the minimalist design aesthetic from Login/Register pages.
 */

import React from 'react';

/**
 * Card padding size types
 */
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

/**
 * Card component props
 */
export interface CardProps {
  /**
   * Card content
   */
  children: React.ReactNode;
  
  /**
   * Padding size
   * @default 'md'
   */
  padding?: CardPadding;
  
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Card Component
 * 
 * Container card with rounded corners and shadow.
 * Matches the design system: rounded-2xl, shadow-xl, bg-white.
 * 
 * @example
 * ```tsx
 * <Card padding="lg">
 *   <h2>Card Title</h2>
 *   <p>Card content</p>
 * </Card>
 * ```
 */
export const Card: React.FC<CardProps> = ({
  children,
  padding = 'md',
  className = '',
}) => {
  // Base classes
  const baseClasses = 'bg-white rounded-2xl shadow-xl';
  
  // Padding classes
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };
  
  // Combine all classes
  const combinedClasses = `
    ${baseClasses}
    ${paddingClasses[padding]}
    ${className}
  `.trim().replace(/\s+/g, ' ');
  
  return (
    <div className={combinedClasses}>
      {children}
    </div>
  );
};
