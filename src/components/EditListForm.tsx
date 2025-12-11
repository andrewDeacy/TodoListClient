/**
 * Edit List Form Component
 * 
 * Form for editing an existing todo list.
 * Handles validation, submission, and error states.
 */

import React, { useState, useEffect } from 'react';
import { useUpdateList } from '../hooks/useTodoLists';
import { Button, Input, Card, ErrorMessage } from './ui';
import type { UpdateListRequest, TodoList } from '../types/api';

/**
 * Props for EditListForm component
 */
export interface EditListFormProps {
  /**
   * The todo list to edit
   */
  list: TodoList;
  
  /**
   * Callback when form is cancelled
   */
  onCancel: () => void;
  
  /**
   * Callback when list is successfully updated
   */
  onSuccess?: () => void;
  
  /**
   * Optional className for additional styling
   */
  className?: string;
}

/**
 * Edit List Form Component
 * 
 * Form for editing an existing todo list with:
 * - Name input (required, max 200 characters)
 * - Description textarea (optional, max 1000 characters)
 * - Submit and cancel buttons
 * - Client-side validation
 * - Error handling
 * - Loading states
 * - Pre-populated with existing list data
 * 
 * @example
 * ```tsx
 * <EditListForm
 *   list={list}
 *   onCancel={() => setShowForm(false)}
 *   onSuccess={() => setShowForm(false)}
 * />
 * ```
 */
const EditListForm: React.FC<EditListFormProps> = ({
  list,
  onCancel,
  onSuccess,
  className = '',
}) => {
  // Form state
  const [name, setName] = useState(list.name);
  const [description, setDescription] = useState(list.description || '');
  
  // Validation errors
  const [errors, setErrors] = useState<{
    name?: string;
    description?: string;
  }>({});
  
  // Update list mutation
  const updateList = useUpdateList();
  
  /**
   * Update form when list prop changes
   */
  useEffect(() => {
    setName(list.name);
    setDescription(list.description || '');
    setErrors({});
  }, [list]);
  
  /**
   * Validate form fields
   */
  const validate = (): boolean => {
    const newErrors: { name?: string; description?: string } = {};
    
    // Validate name
    if (!name.trim()) {
      newErrors.name = 'List name is required';
    } else if (name.length > 200) {
      newErrors.name = 'List name must be 200 characters or less';
    }
    
    // Validate description
    if (description.length > 1000) {
      newErrors.description = 'Description must be 1000 characters or less';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  /**
   * Check if form has changes
   */
  const hasChanges = (): boolean => {
    return (
      name.trim() !== list.name ||
      (description.trim() || null) !== list.description
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
    const requestData: UpdateListRequest = {
      name: name.trim(),
      description: description.trim() || null,
    };
    
    // Submit form
    updateList.mutate(
      { id: list.id, data: requestData },
      {
        onSuccess: () => {
          // Reset errors
          setErrors({});
          
          // Call success callback
          onSuccess?.();
        },
        onError: (error) => {
          // Error is handled by the mutation's error state
          console.error('Failed to update list:', error);
        },
      }
    );
  };
  
  /**
   * Handle cancel button click
   */
  const handleCancel = () => {
    // Reset form to original values
    setName(list.name);
    setDescription(list.description || '');
    setErrors({});
    
    // Call cancel callback
    onCancel();
  };
  
  /**
   * Handle name input change
   */
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    
    // Clear error when user starts typing
    if (errors.name) {
      setErrors((prev) => ({ ...prev, name: undefined }));
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
  
  return (
    <Card padding="lg" className={className}>
      <form onSubmit={handleSubmit} noValidate>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Edit List</h2>
        
        {/* Name Input */}
        <div className="mb-4">
          <Input
            label="List Name"
            type="text"
            value={name}
            onChange={handleNameChange}
            error={errors.name}
            required
            placeholder="Enter list name"
            disabled={updateList.isPending}
            maxLength={200}
            autoFocus
          />
        </div>
        
        {/* Description Textarea */}
        <div className="mb-6">
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
            placeholder="Enter list description (optional)"
            disabled={updateList.isPending}
            maxLength={1000}
            rows={4}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none transition-colors ${
              errors.description
                ? 'border-red-500 focus:ring-2 focus:ring-red-500 focus:border-red-500'
                : 'border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-gray-900'
            } ${
              updateList.isPending
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
        
        {/* API Error Message */}
        {updateList.error && (
          <div className="mb-4">
            <ErrorMessage
              message={
                (updateList.error as any)?.response?.data?.title ||
                (updateList.error as any)?.response?.data?.detail ||
                (updateList.error as any)?.message ||
                'Failed to update list. Please try again.'
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
            disabled={updateList.isPending}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="md"
            disabled={updateList.isPending || !hasChanges()}
            loading={updateList.isPending}
          >
            {updateList.isPending ? 'Updating...' : 'Update List'}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default EditListForm;
