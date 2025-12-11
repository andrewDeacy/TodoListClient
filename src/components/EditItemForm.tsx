/**
 * Edit Item Form Component
 * 
 * Form for editing an existing todo item.
 * Handles validation, submission, and error states.
 */

import React, { useState, useEffect } from 'react';
import { useUpdateItem } from '../hooks/useTodoItems';
import { Button, Input, Card, ErrorMessage } from './ui';
import type { CreateListItemRequest, TodoItem } from '../types/api';

/**
 * Props for EditItemForm component
 */
export interface EditItemFormProps {
  /**
   * The todo item to edit
   */
  item: TodoItem;
  
  /**
   * The ID of the list containing this item
   */
  listId: string;
  
  /**
   * Callback when form is cancelled
   */
  onCancel: () => void;
  
  /**
   * Callback when item is successfully updated
   */
  onSuccess?: () => void;
  
  /**
   * Optional className for additional styling
   */
  className?: string;
}

/**
 * Edit Item Form Component
 * 
 * Form for editing an existing todo item with:
 * - Title input (required, max 200 characters)
 * - Description textarea (optional, max 1000 characters)
 * - Due date input (optional, date picker)
 * - Submit and cancel buttons
 * - Client-side validation
 * - Error handling
 * - Loading states
 * - Pre-populated with existing item data
 * 
 * @example
 * ```tsx
 * <EditItemForm
 *   item={item}
 *   listId={listId}
 *   onCancel={() => setShowForm(false)}
 *   onSuccess={() => setShowForm(false)}
 * />
 * ```
 */
const EditItemForm: React.FC<EditItemFormProps> = ({
  item,
  listId,
  onCancel,
  onSuccess,
  className = '',
}) => {
  /**
   * Convert ISO 8601 date string to YYYY-MM-DD format for date input
   */
  const formatDateForInput = (dateString: string | null): string => {
    if (!dateString) return '';
    const date = new Date(dateString);
    // Get local date in YYYY-MM-DD format
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  
  /**
   * Convert date string (YYYY-MM-DD) to ISO 8601 string
   */
  const formatDateForAPI = (dateString: string): string | null => {
    if (!dateString) return null;
    // Date input returns YYYY-MM-DD, convert to ISO 8601
    const date = new Date(dateString + 'T00:00:00');
    return date.toISOString();
  };
  
  // Form state
  const [title, setTitle] = useState(item.title);
  const [description, setDescription] = useState(item.description || '');
  const [dueDate, setDueDate] = useState(formatDateForInput(item.dueDate));
  
  // Validation errors
  const [errors, setErrors] = useState<{
    title?: string;
    description?: string;
    dueDate?: string;
  }>({});
  
  // Update item mutation
  const updateItem = useUpdateItem();
  
  /**
   * Update form when item prop changes
   */
  useEffect(() => {
    setTitle(item.title);
    setDescription(item.description || '');
    setDueDate(formatDateForInput(item.dueDate));
    setErrors({});
  }, [item]);
  
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
   * Check if form has changes
   */
  const hasChanges = (): boolean => {
    return (
      title.trim() !== item.title ||
      (description.trim() || null) !== item.description ||
      formatDateForAPI(dueDate) !== item.dueDate
    );
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
    
    // Check if there are changes
    if (!hasChanges()) {
      // No changes, just close the form
      onCancel();
      return;
    }
    
    // Prepare request data
    const requestData: CreateListItemRequest = {
      title: title.trim(),
      description: description.trim() || null,
      dueDate: formatDateForAPI(dueDate),
    };
    
    // Submit form
    updateItem.mutate(
      { listId, itemId: item.id, data: requestData },
      {
        onSuccess: () => {
          // Reset errors
          setErrors({});
          
          // Call success callback
          onSuccess?.();
        },
        onError: (error) => {
          // Error is handled by the mutation's error state
          console.error('Failed to update item:', error);
        },
      }
    );
  };
  
  /**
   * Handle cancel button click
   */
  const handleCancel = () => {
    // Reset form to original values
    setTitle(item.title);
    setDescription(item.description || '');
    setDueDate(formatDateForInput(item.dueDate));
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
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Edit Item</h2>
        
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
            disabled={updateItem.isPending}
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
            disabled={updateItem.isPending}
            maxLength={1000}
            rows={4}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none transition-colors ${
              errors.description
                ? 'border-red-500 focus:ring-2 focus:ring-red-500 focus:border-red-500'
                : 'border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-gray-900'
            } ${
              updateItem.isPending
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
            disabled={updateItem.isPending}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none transition-colors ${
              errors.dueDate
                ? 'border-red-500 focus:ring-2 focus:ring-red-500 focus:border-red-500'
                : 'border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-gray-900'
            } ${
              updateItem.isPending
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
        {updateItem.error && (
          <div className="mb-4">
            <ErrorMessage
              message={
                (updateItem.error as any)?.response?.data?.title ||
                (updateItem.error as any)?.response?.data?.detail ||
                (updateItem.error as any)?.message ||
                'Failed to update item. Please try again.'
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
            disabled={updateItem.isPending}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="md"
            disabled={updateItem.isPending || !hasChanges()}
            loading={updateItem.isPending}
          >
            {updateItem.isPending ? 'Updating...' : 'Update Item'}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default EditItemForm;
