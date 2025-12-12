/**
 * EmptyState Component
 * 
 * Reusable empty state display component.
 * Used when there's no data to display (e.g., no todo lists, no items).
 */

import React from 'react';

/**
 * EmptyState component props
 */
export interface EmptyStateProps {
  /**
   * Title text
   */
  title: string;
  
  /**
   * Description/message text
   */
  message?: string;
  
  /**
   * Optional icon element
   */
  icon?: React.ReactNode;
  
  /**
   * Optional action button
   */
  action?: React.ReactNode;
  
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * EmptyState Component
 * 
 * Displays an empty state with title, message, optional icon, and action.
 * Uses minimalist design with gray tones.
 * 
 * @example
 * ```tsx
 * <EmptyState
 *   title="No todo lists"
 *   message="Get started by creating your first todo list"
 *   action={<Button onClick={handleCreate}>Create List</Button>}
 * />
 * ```
 */
export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  message,
  icon,
  action,
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center py-12 px-4 text-center ${className}`}>
      {icon && (
        <div className="mb-4 text-gray-400" aria-hidden="true">
          {icon}
        </div>
      )}
      
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        {title}
      </h3>
      
      {message && (
        <p className="text-sm text-gray-600 max-w-sm mb-6">
          {message}
        </p>
      )}
      
      {action && (
        <div className="mt-2">
          {action}
        </div>
      )}
    </div>
  );
};
