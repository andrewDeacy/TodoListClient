/**
 * Create Item Form Component
 * 
 * Form for creating a new todo item.
 * Handles validation, submission, and error states.
 */

import React, { useState } from 'react';
import { useCreateItem } from '../hooks/useTodoItems';
import { Button, Input, Card, ErrorMessage } from './ui';
import type { CreateListItemRequest } from '../types/api';

/**
 * Props for CreateItemForm component
 */
export interface CreateItemFormProps {
  /**
   * The ID of the list to add the item to
   */
  listId: string;
  
  /**
   * Callback when form is cancelled
   */
  onCancel: () => void;
  
  /**
   * Callback when item is successfully created
   */
  onSuccess?: () => void;
  
  /**
   * Optional className for additional styling
   */
  className?: string;
}

/**
 * Create Item Form Component
 * 
 * Form for creating a new todo item with:
 * - Title input (required, max 200 characters)
 * - Description textarea (optional, max 1000 characters)
 * - Due date input (optional, date picker)
 * - Submit and cancel buttons
 * - Client-side validation
 * - Error handling
 * - Loading states
 * 
 * @example
 * ```tsx
 * <CreateItemForm
 *   listId={listId}
 *   onCancel={() => setShowForm(false)}
 *   onSuccess={() => setShowForm(false)}
 * />
 * ```
 */
const CreateItemForm: React.FC<CreateItemFormProps> = ({
  listId,
  onCancel,
  onSuccess,
  className = '',
}) => {
  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  
  // Validation errors
  const [errors, setErrors] = useState<{
    title?: string;
    description?: string;
    dueDate?: string;
  }>({});
  
  // Create item mutation
  const createItem = useCreateItem();
  
  /**
   * Convert date string (YYYY-MM-DD) to ISO 8601 string
   */
  const formatDateForAPI = (dateString: string): string | null => {
    if (!dateString) return null;
    // Date input returns YYYY-MM-DD, convert to ISO 8601
    const date = new Date(dateString + 'T00:00:00');
    return date.toISOString();
  };
  
  /**
   * Validate form fields
   */
  const validate = (): boolean => {
    const newErrors: { title?: string; description?: string; dueDate?: string } = {};
    
    // Validate title
    if (!title.trim()) {
      newErrors.title = 'Item title is required';
    } else if (title.length > 200) {
      newErrors.title = 'Item title must be 200 characters or less';
    }
    
    // Validate description
    if (description.length > 1000) {
      newErrors.description = 'Description must be 1000 characters or less';
    }
    
    // Validate due date (if provided)
    if (dueDate) {
      const date = new Date(dueDate + 'T00:00:00');
      if (isNaN(date.getTime())) {
        newErrors.dueDate = 'Invalid date format';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  /**
   * Handle form submission
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear previous errors
    setErrors({});
    
    // Validate form
    if (!validate()) {
      return;
    }
    
    // Prepare request data
    const requestData: CreateListItemRequest = {
      title: title.trim(),
      description: description.trim() || null,
      dueDate: formatDateForAPI(dueDate),
    };
    
    // Submit form
    createItem.mutate(
      { listId, data: requestData },
      {
        onSuccess: () => {
          // Reset form
          setTitle('');
          setDescription('');
          setDueDate('');
          setErrors({});
          
          // Call success callback
          onSuccess?.();
        },
        onError: (error) => {
          // Error is handled by the mutation's error state
          console.error('Failed to create item:', error);
        },
      }
    );
  };
  
  /**
   * Handle cancel button click
   */
  const handleCancel = () => {
    // Reset form
    setTitle('');
    setDescription('');
    setDueDate('');
    setErrors({});
    
    // Call cancel callback
    onCancel();
  };
  
  /**
   * Handle title input change
   */
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTitle(value);
    
    // Clear error when user starts typing
    if (errors.title) {
      setErrors((prev) => ({ ...prev, title: undefined }));
    }
  };
  
  /**
   * Handle description textarea change
   */
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setDescription(value);
    
    // Clear error when user starts typing
    if (errors.description) {
      setErrors((prev) => ({ ...prev, description: undefined }));
    }
  };
  
  /**
   * Handle due date input change
   */
  const handleDueDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDueDate(value);
    
    // Clear error when user changes date
    if (errors.dueDate) {
      setErrors((prev) => ({ ...prev, dueDate: undefined }));
    }
  };
  
  return (
    <Card padding="lg" className={className}>
      <form onSubmit={handleSubmit} noValidate>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Item</h2>
        
        {/* Title Input */}
        <div className="mb-4">
          <Input
            label="Item Title"
            type="text"
            value={title}
            onChange={handleTitleChange}
            error={errors.title}
            required
            placeholder="Enter item title"
            disabled={createItem.isPending}
            maxLength={200}
            autoFocus
          />
        </div>
        
        {/* Description Textarea */}
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Description
            <span className="text-gray-400 text-xs ml-2">
              (Optional, {description.length}/1000 characters)
            </span>
          </label>
          <textarea
            id="description"
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Enter item description (optional)"
            disabled={createItem.isPending}
            maxLength={1000}
            rows={4}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none transition-colors ${
              errors.description
                ? 'border-red-500 focus:ring-2 focus:ring-red-500 focus:border-red-500'
                : 'border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-gray-900'
            } ${
              createItem.isPending
                ? 'bg-gray-100 cursor-not-allowed opacity-60'
                : ''
            } resize-none`}
            aria-invalid={!!errors.description}
            aria-describedby={errors.description ? 'description-error' : undefined}
          />
          {errors.description && (
            <p
              id="description-error"
              className="mt-1 text-sm text-red-600"
              role="alert"
              aria-live="polite"
            >
              {errors.description}
            </p>
          )}
        </div>
        
        {/* Due Date Input */}
        <div className="mb-6">
          <label
            htmlFor="dueDate"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Due Date
            <span className="text-gray-400 text-xs ml-2">(Optional)</span>
          </label>
          <input
            id="dueDate"
            type="date"
            value={dueDate}
            onChange={handleDueDateChange}
            disabled={createItem.isPending}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none transition-colors ${
              errors.dueDate
                ? 'border-red-500 focus:ring-2 focus:ring-red-500 focus:border-red-500'
                : 'border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-gray-900'
            } ${
              createItem.isPending
                ? 'bg-gray-100 cursor-not-allowed opacity-60'
                : ''
            }`}
            aria-invalid={!!errors.dueDate}
            aria-describedby={errors.dueDate ? 'dueDate-error' : undefined}
          />
          {errors.dueDate && (
            <p
              id="dueDate-error"
              className="mt-1 text-sm text-red-600"
              role="alert"
              aria-live="polite"
            >
              {errors.dueDate}
            </p>
          )}
        </div>
        
        {/* API Error Message */}
        {createItem.error && (
          <div className="mb-4">
            <ErrorMessage
              message={
                (createItem.error as any)?.response?.data?.title ||
                (createItem.error as any)?.response?.data?.detail ||
                (createItem.error as any)?.message ||
                'Failed to create item. Please try again.'
              }
            />
          </div>
        )}
        
        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
          <Button
            type="button"
            variant="secondary"
            size="md"
            onClick={handleCancel}
            disabled={createItem.isPending}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="md"
            disabled={createItem.isPending}
            loading={createItem.isPending}
          >
            {createItem.isPending ? 'Creating...' : 'Create Item'}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default CreateItemForm;
