/**
 * Delete Confirmation Modal Component
 * 
 * A reusable modal for confirming delete actions.
 * Matches the style of other modals in the application.
 */

import React from 'react';
import { Button } from './Button';
import { Card } from './Card';

export interface DeleteConfirmationModalProps {
  /**
   * Whether the modal is visible
   */
  isOpen: boolean;
  
  /**
   * Title of the item being deleted
   */
  title: string;
  
  /**
   * Type of item being deleted (e.g., "item", "list")
   * @default "item"
   */
  itemType?: string;
  
  /**
   * Callback when delete is confirmed
   */
  onConfirm: () => void;
  
  /**
   * Callback when delete is cancelled
   */
  onCancel: () => void;
  
  /**
   * Whether the delete operation is in progress
   * @default false
   */
  isDeleting?: boolean;
  
  /**
   * Optional className for additional styling
   */
  className?: string;
}

/**
 * Delete Confirmation Modal
 * 
 * Displays a confirmation dialog for delete actions with a consistent design.
 * 
 * @example
 * ```tsx
 * <DeleteConfirmationModal
 *   isOpen={showDeleteModal}
 *   title="My Todo Item"
 *   itemType="item"
 *   onConfirm={handleDelete}
 *   onCancel={() => setShowDeleteModal(false)}
 *   isDeleting={deleteMutation.isPending}
 * />
 * ```
 */
const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  title,
  itemType = 'item',
  onConfirm,
  onCancel,
  isDeleting = false,
  className = '',
}) => {
  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto ${className}`}>
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full m-4">
        <Card padding="lg">
          <div className="text-center">
            {/* Warning Icon */}
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
              <svg
                className="h-6 w-6 text-red-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            
            {/* Title */}
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Delete {itemType === 'list' ? 'List' : 'Item'}?
            </h3>
            
            {/* Message */}
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to delete <span className="font-medium text-gray-900">"{title}"</span>? 
              This action cannot be undone.
            </p>
            
            {/* Buttons */}
            <div className="flex items-center justify-center gap-3">
              <Button
                variant="secondary"
                size="md"
                onClick={onCancel}
                disabled={isDeleting}
                className="min-w-[100px]"
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                size="md"
                onClick={onConfirm}
                disabled={isDeleting}
                loading={isDeleting}
                className="min-w-[100px]"
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
