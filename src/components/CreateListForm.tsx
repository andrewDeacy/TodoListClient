/**
 * Create List Form Component
 * 
 * Form for creating a new todo list.
 * Handles validation, submission, and error states.
 */

import React, { useState } from 'react';
import { useCreateList } from '../hooks/useTodoLists';
import { Button, Input, Card, ErrorMessage } from './ui';
import type { CreateListRequest } from '../types/api';

/**
 * Props for CreateListForm component
 */
export interface CreateListFormProps {
  /**
   * Callback when form is cancelled
   */
  onCancel: () => void;
  
  /**
   * Callback when list is successfully created
   * @param listId - The ID of the newly created list
   */
  onSuccess?: (listId: string) => void;
  
  /**
   * Optional className for additional styling
   */
  className?: string;
}

/**
 * Create List Form Component
 * 
 * Form for creating a new todo list with:
 * - Name input (required, max 200 characters)
 * - Description textarea (optional, max 1000 characters)
 * - Submit and cancel buttons
 * - Client-side validation
 * - Error handling
 * - Loading states
 * 
 * @example
 * ```tsx
 * <CreateListForm
 *   onCancel={() => setShowForm(false)}
 *   onSuccess={(listId) => navigate(`/lists/${listId}`)}
 * />
 * ```
 */
const CreateListForm: React.FC<CreateListFormProps> = ({
  onCancel,
  onSuccess,
  className = '',
}) => {
  // Form state
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  
  // Validation errors
  const [errors, setErrors] = useState<{
    name?: string;
    description?: string;
  }>({});
  
  // Create list mutation
  const createList = useCreateList();
  
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
    const requestData: CreateListRequest = {
      name: name.trim(),
      description: description.trim() || null,
    };
    
    // Submit form
    createList.mutate(requestData, {
      onSuccess: (newList) => {
        // Reset form
        setName('');
        setDescription('');
        setErrors({});
        
        // Call success callback
        onSuccess?.(newList.id);
      },
      onError: (error) => {
        // Error is handled by the mutation's error state
        console.error('Failed to create list:', error);
      },
    });
  };
  
  /**
   * Handle cancel button click
   */
  const handleCancel = () => {
    // Reset form
    setName('');
    setDescription('');
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
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New List</h2>
        
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
            disabled={createList.isPending}
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
            disabled={createList.isPending}
            maxLength={1000}
            rows={4}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none transition-colors ${
              errors.description
                ? 'border-red-500 focus:ring-2 focus:ring-red-500 focus:border-red-500'
                : 'border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-gray-900'
            } ${
              createList.isPending
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
        {createList.error && (
          <div className="mb-4">
            <ErrorMessage
              message={
                (createList.error as any)?.response?.data?.title ||
                (createList.error as any)?.response?.data?.detail ||
                (createList.error as any)?.message ||
                'Failed to create list. Please try again.'
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
            disabled={createList.isPending}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="md"
            disabled={createList.isPending}
            loading={createList.isPending}
          >
            {createList.isPending ? 'Creating...' : 'Create List'}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default CreateListForm;
