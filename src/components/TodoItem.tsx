/**
 * TodoItem Component
 * 
 * Displays a single todo item with completion toggle, edit, and delete actions.
 * Handles item completion state using React Query mutations.
 */

import React, { useState } from 'react';
import { useMarkItemComplete, useDeleteItem } from '../hooks/useTodoItems';
import { Button, Card, DeleteConfirmationModal } from './ui';
import type { TodoItem as TodoItemType } from '../types/api';

/**
 * Props for TodoItem component
 */
export interface TodoItemProps {
  /**
   * The todo item data to display
   */
  item: TodoItemType;
  
  /**
   * The ID of the list containing this item
   */
  listId: string;
  
  /**
   * Optional callback when item is deleted
   */
  onDeleted?: () => void;
  
  /**
   * Optional callback when item is edited
   */
  onEdit?: (item: TodoItemType) => void;
  
  /**
   * Optional className for additional styling
   */
  className?: string;
  
  /**
   * Whether to show order indicator (for debugging)
   * @default false
   */
  showOrder?: boolean;
  
  /**
   * Whether this item is the first item in the list
   * @default false
   */
  isFirst?: boolean;
  
  /**
   * Whether this item is the last item in the list
   * @default false
   */
  isLast?: boolean;
  
  /**
   * Callback when item should be moved up
   */
  onMoveUp?: () => void;
  
  /**
   * Callback when item should be moved down
   */
  onMoveDown?: () => void;
  
  /**
   * Whether reordering is in progress
   * @default false
   */
  isReordering?: boolean;
  
  /**
   * The position of this item in the list (1-based index for display)
   * @default undefined
   */
  position?: number;
}

/**
 * TodoItem Component
 * 
 * Displays a single todo item with:
 * - Title and description
 * - Completion checkbox
 * - Due date (if present)
 * - Edit and delete buttons
 * - Order indicator (optional, for debugging)
 * 
 * Handles completion toggle and delete operations using React Query mutations.
 * 
 * @example
 * ```tsx
 * <TodoItem
 *   item={item}
 *   listId={listId}
 *   onEdit={(item) => console.log('Edit:', item)}
 *   onDeleted={() => console.log('Deleted')}
 * />
 * ```
 */
const TodoItem: React.FC<TodoItemProps> = ({
  item,
  listId,
  onDeleted,
  onEdit,
  className = '',
  showOrder = false,
  isFirst = false,
  isLast = false,
  onMoveUp,
  onMoveDown,
  isReordering = false,
  position,
}) => {
  // Completion toggle mutation
  const markComplete = useMarkItemComplete();
  
  // Delete item mutation
  const deleteItem = useDeleteItem();
  
  // Delete confirmation modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  /**
   * Handle completion checkbox toggle
   */
  const handleToggleComplete = () => {
    markComplete.mutate(
      {
        listId,
        itemId: item.id,
        isCompleted: !item.isCompleted,
      },
      {
        onError: (error) => {
          console.error('Failed to toggle item completion:', error);
        },
      }
    );
  };
  
  /**
   * Handle delete button click - show confirmation modal
   */
  const handleDelete = () => {
    setShowDeleteModal(true);
  };
  
  /**
   * Handle delete confirmation
   */
  const handleDeleteConfirm = () => {
    deleteItem.mutate(
      { listId, itemId: item.id },
      {
        onSuccess: () => {
          setShowDeleteModal(false);
          onDeleted?.();
        },
        onError: (error) => {
          console.error('Failed to delete item:', error);
          // Keep modal open on error so user can retry
        },
      }
    );
  };
  
  /**
   * Handle delete cancellation
   */
  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
  };
  
  /**
   * Handle edit button click
   */
  const handleEdit = () => {
    onEdit?.(item);
  };
  
  /**
   * Format due date for display
   */
  const formatDueDate = (dateString: string | null): string | null => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
  
  /**
   * Check if due date is overdue
   */
  const isOverdue = (): boolean => {
    if (!item.dueDate || item.isCompleted) return false;
    const dueDate = new Date(item.dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return dueDate < today;
  };
  
  const dueDateFormatted = formatDueDate(item.dueDate);
  const overdue = isOverdue();
  
  return (
    <Card
      padding="md"
      className={`hover:shadow-lg transition-all duration-300 ease-in-out ${className} ${
        item.isCompleted ? 'opacity-75' : ''
      }`}
    >
      <div className="flex items-start gap-4">
        {/* Left Column: Checkbox and Move Controls */}
        <div className="flex-shrink-0 flex flex-col items-center gap-2 pt-1">
          {/* Completion Checkbox */}
          <input
            type="checkbox"
            checked={item.isCompleted}
            onChange={handleToggleComplete}
            disabled={markComplete.isPending}
            className="w-5 h-5 rounded border-gray-300 text-gray-900 focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label={`Mark "${item.title}" as ${item.isCompleted ? 'incomplete' : 'complete'}`}
          />
          
          {/* Counter-Style Move Controls */}
          {(onMoveUp || onMoveDown) && position !== undefined && (
            <div className="flex flex-col items-center gap-0.5">
              {/* Up Chevron */}
              <button
                onClick={onMoveUp}
                disabled={isFirst || isReordering || markComplete.isPending || deleteItem.isPending}
                className={`p-1 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-1 ${
                  isFirst || isReordering || markComplete.isPending || deleteItem.isPending
                    ? 'text-gray-300 cursor-not-allowed opacity-50'
                    : 'text-gray-400 hover:text-green-600 hover:bg-green-50 active:bg-green-100 cursor-pointer'
                }`}
                aria-label={`Move "${item.title}" up`}
                title="Move up"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 15l-6-6-6 6" />
                </svg>
              </button>
              
              {/* Position Number */}
              <span
                className="text-sm font-semibold text-gray-700 min-w-[1.5rem] text-center"
                aria-label={`Position ${position}`}
              >
                {position}
              </span>
              
              {/* Down Chevron */}
              <button
                onClick={onMoveDown}
                disabled={isLast || isReordering || markComplete.isPending || deleteItem.isPending}
                className={`p-1 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-1 ${
                  isLast || isReordering || markComplete.isPending || deleteItem.isPending
                    ? 'text-gray-300 cursor-not-allowed opacity-50'
                    : 'text-gray-400 hover:text-red-600 hover:bg-red-50 active:bg-red-100 cursor-pointer'
                }`}
                aria-label={`Move "${item.title}" down`}
                title="Move down"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
            </div>
          )}
        </div>
        
        {/* Item Content */}
        <div className="flex-1 min-w-0 overflow-hidden">
          {/* Title and Status Badge */}
          <div className="flex items-center gap-3 mb-2">
            <h3
              className={`text-lg font-medium flex-1 min-w-0 break-words ${
                item.isCompleted
                  ? 'text-gray-500 line-through'
                  : 'text-gray-900'
              }`}
            >
              {item.title}
            </h3>
            {item.isCompleted && (
              <span
                className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full flex-shrink-0"
                aria-label="Item completed"
              >
                Done
              </span>
            )}
            {overdue && !item.isCompleted && (
              <span
                className="text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded-full flex-shrink-0"
                aria-label="Item overdue"
              >
                Overdue
              </span>
            )}
          </div>
          
          {/* Description */}
          {item.description && (
            <p
              className={`text-sm mb-2 break-words ${
                item.isCompleted ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              {item.description}
            </p>
          )}
          
          {/* Metadata Row */}
          <div className="flex items-center gap-4 text-xs text-gray-500 flex-wrap">
            {dueDateFormatted && (
              <span className={overdue && !item.isCompleted ? 'text-red-600 font-medium' : ''}>
                Due: {dueDateFormatted}
              </span>
            )}
            {showOrder && (
              <span className="text-gray-400">Order: {item.order}</span>
            )}
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3 mt-3 pt-3 border-t border-gray-200 flex-wrap">
            <Button
              variant="secondary"
              size="sm"
              onClick={handleEdit}
              disabled={isReordering}
              aria-label={`Edit item "${item.title}"`}
            >
              Edit
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={handleDelete}
              disabled={deleteItem.isPending || isReordering}
              loading={deleteItem.isPending}
              aria-label={`Delete item "${item.title}"`}
            >
              {deleteItem.isPending ? 'Deleting...' : 'Delete'}
            </Button>
          </div>
          
          {/* Error Messages */}
          {markComplete.error && (
            <div className="mt-2 text-xs text-red-600">
              Failed to update completion status. Please try again.
            </div>
          )}
          {deleteItem.error && (
            <div className="mt-2 text-xs text-red-600">
              {(deleteItem.error as any)?.response?.data?.title ||
                (deleteItem.error as any)?.response?.data?.detail ||
                (deleteItem.error as any)?.message ||
                'Failed to delete item. Please try again.'}
            </div>
          )}
        </div>
      </div>
      
      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        title={item.title}
        itemType="item"
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        isDeleting={deleteItem.isPending}
      />
    </Card>
  );
};

export default TodoItem;
