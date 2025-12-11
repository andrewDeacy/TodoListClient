/**
 * Todo List Detail Page
 * 
 * Displays a single todo list with all its items.
 * Shows loading, error, and empty states.
 * Provides actions to add items, edit list, and delete list.
 */

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTodoList, useDeleteList } from '../hooks/useTodoLists';
import { useTodoItems } from '../hooks/useTodoItems';
import { Button, Card, LoadingSpinner, ErrorMessage, EmptyState } from '../components/ui';
import TodoItem from '../components/TodoItem';
import EditListForm from '../components/EditListForm';
import type { TodoItem as TodoItemType } from '../types/api';

/**
 * Todo List Detail Page Component
 * 
 * Displays a single todo list with its items, ordered by the Order property.
 * Provides actions to add items, edit list, and delete list.
 * 
 * @example
 * ```tsx
 * <Route path="/lists/:id" element={<ProtectedRoute><TodoListDetailPage /></ProtectedRoute>} />
 * ```
 */
const TodoListDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  
  // Fetch list data
  const { data: list, isLoading: isLoadingList, error: listError } = useTodoList(id || '');
  
  // Fetch items for the list
  const { data: items, isLoading: isLoadingItems, error: itemsError } = useTodoItems(
    id || '',
    { enabled: !!id && !!list } // Only fetch items if list exists
  );
  
  // Delete list mutation
  const deleteList = useDeleteList();
  
  // Edit form state
  const [showEditForm, setShowEditForm] = useState(false);
  
  /**
   * Handle logout
   */
  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };
  
  /**
   * Handle back navigation
   */
  const handleBack = () => {
    navigate('/lists');
  };
  
  /**
   * Handle delete list
   */
  const handleDeleteList = () => {
    if (!id || !list) return;
    
    if (window.confirm(`Are you sure you want to delete "${list.name}"? This action cannot be undone.`)) {
      deleteList.mutate(id, {
        onSuccess: () => {
          // Navigate back to lists page after successful deletion
          navigate('/lists', { replace: true });
        },
        onError: (error) => {
          // Error is handled by the mutation's error state
          console.error('Failed to delete list:', error);
        },
      });
    }
  };
  
  /**
   * Handle add item button click
   * TODO: Open create item form/modal (will be implemented in TASK-20)
   */
  const handleAddItem = () => {
    alert('Create item form will be implemented in TASK-20');
  };
  
  /**
   * Handle edit list button click
   */
  const handleEditList = () => {
    setShowEditForm(true);
  };
  
  /**
   * Handle edit form success
   */
  const handleEditSuccess = () => {
    setShowEditForm(false);
    // List will be automatically refetched via React Query
  };
  
  /**
   * Handle edit form cancel
   */
  const handleEditCancel = () => {
    setShowEditForm(false);
  };
  
  /**
   * Format date for display
   */
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  
  
  // Determine loading state (either list or items loading)
  const isLoading = isLoadingList || isLoadingItems;
  
  // Determine error state (either list or items error)
  const error = listError || itemsError || deleteList.error;
  
  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <Button variant="ghost" size="sm" onClick={handleBack}>
                ← Back
              </Button>
              <div className="flex items-center gap-4">
                {user && (
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">{user.username}</span>
                    <span className="mx-2">•</span>
                    <span className="text-gray-500">{user.email}</span>
                  </div>
                )}
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </header>
        
        {/* Loading State */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-center items-center py-12">
            <LoadingSpinner size="lg" text="Loading todo list..." />
          </div>
        </main>
      </div>
    );
  }
  
  // Show error state
  if (error && !list) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <Button variant="ghost" size="sm" onClick={handleBack}>
                ← Back
              </Button>
              <div className="flex items-center gap-4">
                {user && (
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">{user.username}</span>
                    <span className="mx-2">•</span>
                    <span className="text-gray-500">{user.email}</span>
                  </div>
                )}
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </header>
        
        {/* Error State */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ErrorMessage
            message={
              (error as any)?.response?.data?.title ||
              (error as any)?.response?.data?.detail ||
              (error as any)?.message ||
              'Failed to load todo list. Please try again.'
            }
          />
        </main>
      </div>
    );
  }
  
  // If list doesn't exist, show error
  if (!list) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <Button variant="ghost" size="sm" onClick={handleBack}>
                ← Back
              </Button>
              <div className="flex items-center gap-4">
                {user && (
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">{user.username}</span>
                    <span className="mx-2">•</span>
                    <span className="text-gray-500">{user.email}</span>
                  </div>
                )}
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </header>
        
        {/* Error State */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ErrorMessage message="Todo list not found." />
        </main>
      </div>
    );
  }
  
  // Get items (use items from hook if available, otherwise use items from list)
  const displayItems: TodoItemType[] = items || list.items || [];
  
  // Sort items by order (lower values first)
  const sortedItems = [...displayItems].sort((a, b) => a.order - b.order);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" onClick={handleBack}>
              ← Back
            </Button>
            <div className="flex items-center gap-4">
              {user && (
                <div className="text-sm text-gray-600">
                  <span className="font-medium">{user.username}</span>
                  <span className="mx-2">•</span>
                  <span className="text-gray-500">{user.email}</span>
                </div>
              )}
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Edit Form Modal Overlay */}
        {showEditForm && list && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <EditListForm
                list={list}
                onCancel={handleEditCancel}
                onSuccess={handleEditSuccess}
              />
            </div>
          </div>
        )}
        
        {/* List Header Card */}
        <Card padding="lg" className="mb-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{list.name}</h1>
                {list.isCompleted && (
                  <span
                    className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full"
                    aria-label="List completed"
                  >
                    Completed
                  </span>
                )}
              </div>
              {list.description && (
                <p className="text-gray-600 mb-4">{list.description}</p>
              )}
              <div className="text-sm text-gray-500">
                <span>Created {formatDate(list.createdDate)}</span>
                {list.updatedDate !== list.createdDate && (
                  <span className="ml-4">Updated {formatDate(list.updatedDate)}</span>
                )}
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
            <Button
              variant="primary"
              size="md"
              onClick={handleAddItem}
              aria-label="Add new item to list"
            >
              Add Item
            </Button>
            <Button
              variant="secondary"
              size="md"
              onClick={handleEditList}
              aria-label="Edit list details"
            >
              Edit List
            </Button>
            <Button
              variant="danger"
              size="md"
              onClick={handleDeleteList}
              disabled={deleteList.isPending}
              loading={deleteList.isPending}
              aria-label="Delete list"
            >
              {deleteList.isPending ? 'Deleting...' : 'Delete List'}
            </Button>
          </div>
          
          {/* Delete Error Message */}
          {deleteList.error && (
            <div className="mt-4">
              <ErrorMessage
                message={
                  (deleteList.error as any)?.response?.data?.title ||
                  (deleteList.error as any)?.response?.data?.detail ||
                  (deleteList.error as any)?.message ||
                  'Failed to delete list. Please try again.'
                }
              />
            </div>
          )}
        </Card>
        
        {/* Items Error State */}
        {itemsError && !isLoadingItems && (
          <ErrorMessage
            message={
              (itemsError as any)?.response?.data?.title ||
              (itemsError as any)?.response?.data?.detail ||
              (itemsError as any)?.message ||
              'Failed to load items. Please try again.'
            }
          />
        )}
        
        {/* Empty State - No Items */}
        {!isLoadingItems && !itemsError && sortedItems.length === 0 && (
          <EmptyState
            title="No items yet"
            message="This list is empty. Add your first item to get started."
            action={
              <Button variant="primary" size="md" onClick={handleAddItem}>
                Add Your First Item
              </Button>
            }
          />
        )}
        
        {/* Items List */}
        {!isLoadingItems && !itemsError && sortedItems.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Items ({sortedItems.length})
            </h2>
            {sortedItems.map((item) => (
              <TodoItem
                key={item.id}
                item={item}
                listId={list.id}
                onEdit={(item) => {
                  // TODO: Open edit item form/modal (will be implemented in TASK-20)
                  alert(`Edit item form will be implemented in TASK-20 for: ${item.title}`);
                }}
                showOrder={false} // Set to true for debugging if needed
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default TodoListDetailPage;
