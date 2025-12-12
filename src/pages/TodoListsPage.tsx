/**
 * Todo Lists Page
 * 
 * Main application page showing user's todo lists.
 * Displays all lists with loading, error, and empty states.
 * Each list is clickable to navigate to list detail.
 */

import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTodoLists } from '../hooks/useTodoLists';
import { Button, Card, LoadingSpinner, ErrorMessage, EmptyState, Input } from '../components/ui';
import CreateListForm from '../components/CreateListForm';
import Logo from '../components/Logo';
import type { TodoList } from '../types/api';

/**
 * Todo Lists Page Component
 * 
 * Displays all user's todo lists with proper loading, error, and empty states.
 * Each list is clickable to navigate to the list detail page.
 * 
 * @example
 * ```tsx
 * <Route path="/lists" element={<ProtectedRoute><TodoListsPage /></ProtectedRoute>} />
 * ```
 */
const TodoListsPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { data: lists, isLoading, error } = useTodoLists();
  const [showCreateForm, setShowCreateForm] = useState(false);
  
  // Search state
  const [searchTerm, setSearchTerm] = useState('');

  /**
   * Handle logout
   */
  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  /**
   * Handle list click - navigate to list detail
   */
  const handleListClick = (listId: string) => {
    navigate(`/lists/${listId}`);
  };

  /**
   * Handle create new list button click
   */
  const handleCreateList = () => {
    setShowCreateForm(true);
  };
  
  /**
   * Handle create form success
   */
  const handleCreateSuccess = (listId: string) => {
    setShowCreateForm(false);
    // Navigate to the newly created list
    navigate(`/lists/${listId}`);
  };
  
  /**
   * Handle create form cancel
   */
  const handleCreateCancel = () => {
    setShowCreateForm(false);
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
    });
  };

  /**
   * Get item count for a list
   */
  const getItemCount = (list: TodoList): number => {
    return list.items?.length || 0;
  };

  /**
   * Get completed item count for a list
   */
  const getCompletedCount = (list: TodoList): number => {
    return list.items?.filter((item) => item.isCompleted).length || 0;
  };

  /**
   * Filter lists based on search term (case-insensitive search on name and description)
   */
  const filteredLists = useMemo(() => {
    if (!lists || !searchTerm.trim()) {
      return lists || [];
    }
    const term = searchTerm.toLowerCase().trim();
    return lists.filter(list => {
      const nameMatch = list.name.toLowerCase().includes(term);
      const descMatch = list.description?.toLowerCase().includes(term) || false;
      return nameMatch || descMatch;
    });
  }, [lists, searchTerm]);

  /**
   * Handle search input change
   */
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  /**
   * Clear search term
   */
  const handleClearSearch = () => {
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 w-full max-w-full overflow-x-hidden">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            <Logo />
            <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
              {user && (
                <div className="hidden sm:flex items-center text-sm text-gray-600">
                  <span className="font-medium">{user.username}</span>
                  <span className="mx-2">•</span>
                  <span className="text-gray-500 truncate max-w-[120px] lg:max-w-none">{user.email}</span>
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Create Form Modal Overlay */}
        {showCreateForm && (
          <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
            <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto m-4">
              <CreateListForm
                onCancel={handleCreateCancel}
                onSuccess={handleCreateSuccess}
              />
            </div>
          </div>
        )}
        
        {/* Create New List Button - Only show when user has lists */}
        {!isLoading && !error && lists && lists.length > 0 && !showCreateForm && (
          <div className="mb-6 flex justify-end">
            <Button variant="primary" size="md" onClick={handleCreateList}>
              Create New List
            </Button>
          </div>
        )}

        {/* Search Bar - Only show when lists exist */}
        {!isLoading && !error && lists && lists.length > 0 && !showCreateForm && (
          <div className="mb-6">
            <div className="relative">
              <Input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search lists by name or description..."
                aria-label="Search lists"
                className="w-full"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Clear search"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
            {searchTerm && (
              <p className="mt-2 text-sm text-gray-600">
                {filteredLists.length === 0 ? (
                  <span>No lists match "{searchTerm}"</span>
                ) : (
                  <span>
                    {filteredLists.length} {filteredLists.length === 1 ? 'list' : 'lists'} found
                  </span>
                )}
              </p>
            )}
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <LoadingSpinner size="lg" text="Loading your todo lists..." />
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <ErrorMessage
            message={
              (error as any)?.response?.data?.title ||
              (error as any)?.response?.data?.detail ||
              (error as any)?.message ||
              'Failed to load todo lists. Please try again.'
            }
          />
        )}

        {/* Empty State - Only show when user has no lists */}
        {!isLoading && !error && (!lists || lists.length === 0) && !showCreateForm && (
          <EmptyState
            title="No todo lists yet"
            message="Get started by creating your first todo list to organize your tasks."
            icon={
              <svg
                className="w-16 h-16 text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            }
            action={
              <Button variant="primary" size="md" onClick={handleCreateList}>
                Create Your First List
              </Button>
            }
          />
        )}

        {/* Empty State - No Search Results */}
        {!isLoading && !error && lists && lists.length > 0 && searchTerm && filteredLists.length === 0 && !showCreateForm && (
          <EmptyState
            title="No lists match your search"
            message={`No lists found matching "${searchTerm}". Try a different search term.`}
            icon={
              <svg
                className="w-16 h-16 text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            }
            action={
              <Button variant="secondary" size="md" onClick={handleClearSearch}>
                Clear Search
              </Button>
            }
          />
        )}

        {/* Lists Grid */}
        {!isLoading && !error && lists && lists.length > 0 && filteredLists.length > 0 && !showCreateForm && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLists.map((list) => (
              <div
                key={list.id}
                className="cursor-pointer"
                onClick={() => handleListClick(list.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e: React.KeyboardEvent) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleListClick(list.id);
                  }
                }}
                aria-label={`View ${list.name} todo list`}
              >
                <Card
                  padding="md"
                  className="hover:shadow-2xl transition-shadow h-full"
                >
                <div className="flex flex-col h-full">
                  {/* List Header */}
                  <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900 flex-1 pr-2 break-words min-w-0">
                    {list.name}
                  </h3>
                    {list.isCompleted && (
                      <span
                        className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full"
                        aria-label="List completed"
                      >
                        Completed
                      </span>
                    )}
                  </div>

                  {/* List Description */}
                  {list.description && (
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2 break-words">
                      {list.description}
                    </p>
                  )}

                  {/* List Stats */}
                  <div className="mt-auto pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>
                        {getItemCount(list)} {getItemCount(list) === 1 ? 'item' : 'items'}
                      </span>
                      {getItemCount(list) > 0 && (
                        <span>
                          {getCompletedCount(list)} of {getItemCount(list)} completed
                        </span>
                      )}
                    </div>
                    <div className="mt-2 text-xs text-gray-400">
                      Updated {formatDate(list.updatedDate)}
                    </div>
                  </div>
                </div>
              </Card>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default TodoListsPage;
