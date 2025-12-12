/**
 * React Query Hooks for TodoItems
 * 
 * Custom hooks for managing todo item data using React Query (TanStack Query).
 * Provides queries for fetching items and mutations for creating, updating, deleting,
 * marking complete, and reordering items.
 * Handles caching, invalidation, and loading/error states automatically.
 * 
 * @see ../TodoListAPI/README.md for backend API documentation
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as listItemService from '../services/listItemService';
import type { CreateListItemRequest, ReorderItemsRequest } from '../types/api';
import { todoListKeys } from './useTodoLists';

/**
 * Query key factory for todo item queries.
 * Centralizes query key management for consistency and easier invalidation.
 */
export const todoItemKeys = {
  /**
   * Query key for all items in a list
   * @param listId - The todo list ID
   */
  list: (listId: string) => ['todoItems', 'list', listId] as const,
  
  /**
   * Query key for a specific todo item by ID
   * @param listId - The todo list ID
   * @param itemId - The todo item ID
   */
  detail: (listId: string, itemId: string) => ['todoItems', 'detail', listId, itemId] as const,
};

/**
 * Hook to fetch all todo items for a specific list.
 * Items are returned ordered by their Order property (lower values appear first).
 * 
 * @param listId - The unique identifier of the todo list (UUID string)
 * @param options - Optional query options (enabled, etc.)
 * @returns React Query query object with data, loading, error states
 * 
 * @example
 * ```typescript
 * const { data: items, isLoading, error } = useTodoItems(listId);
 * // Use items, isLoading, and error in your component
 * ```
 */
export const useTodoItems = (
  listId: string,
  options?: { enabled?: boolean }
) => {
  return useQuery({
    queryKey: todoItemKeys.list(listId),
    queryFn: () => listItemService.getItemsByListId(listId),
    enabled: options?.enabled !== false && !!listId, // Only fetch if listId is provided
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * Hook to fetch a specific todo item by ID.
 * 
 * @param listId - The unique identifier of the todo list (UUID string)
 * @param itemId - The unique identifier of the todo item (UUID string)
 * @param options - Optional query options (enabled, etc.)
 * @returns React Query query object with data, loading, error states
 * 
 * @example
 * ```typescript
 * const { data: item, isLoading, error } = useTodoItem(listId, itemId);
 * // Use item, isLoading, and error in your component
 * ```
 */
export const useTodoItem = (
  listId: string,
  itemId: string,
  options?: { enabled?: boolean }
) => {
  return useQuery({
    queryKey: todoItemKeys.detail(listId, itemId),
    queryFn: () => listItemService.getItemById(listId, itemId),
    enabled: options?.enabled !== false && !!listId && !!itemId, // Only fetch if both IDs are provided
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * Hook to create a new todo item in a list.
 * The item is automatically assigned to the end of the list (max Order + 1).
 * 
 * @returns React Query mutation object with mutate function and loading/error states
 * 
 * @example
 * ```typescript
 * const createItem = useCreateItem();
 * createItem.mutate(
 *   { listId: 'list-id', data: { title: 'New Item', description: null, dueDate: null } },
 *   {
 *     onSuccess: (newItem) => console.log('Created:', newItem.id),
 *     onError: (error) => console.error('Failed:', error)
 *   }
 * );
 * ```
 */
export const useCreateItem = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ listId, data }: { listId: string; data: CreateListItemRequest }) =>
      listItemService.createItem(listId, data),
    onSuccess: (newItem, variables) => {
      // Invalidate the list's items to refetch and include the new item
      queryClient.invalidateQueries({ queryKey: todoItemKeys.list(variables.listId) });
      
      // Optionally, set the new item in cache for immediate access
      queryClient.setQueryData(
        todoItemKeys.detail(variables.listId, newItem.id),
        newItem
      );
      
      // Invalidate the parent list to update item count
      queryClient.invalidateQueries({ queryKey: todoListKeys.detail(variables.listId) });
      
      // Invalidate all lists to update item counts on lists page
      queryClient.invalidateQueries({ queryKey: todoListKeys.all });
    },
    // Retry only on server errors (5xx) or network errors, not on client errors (4xx)
    retry: (failureCount, error: any) => {
      if (error?.response?.status >= 400 && error?.response?.status < 500) {
        return false; // Don't retry on client errors
      }
      return failureCount < 1; // Retry once for server errors
    },
  });
};

/**
 * Hook to update an existing todo item.
 * 
 * @returns React Query mutation object with mutate function and loading/error states
 * 
 * @example
 * ```typescript
 * const updateItem = useUpdateItem();
 * updateItem.mutate(
 *   {
 *     listId: 'list-id',
 *     itemId: 'item-id',
 *     data: { title: 'Updated Title', description: null, dueDate: null }
 *   },
 *   {
 *     onSuccess: (updated) => console.log('Updated:', updated.id),
 *     onError: (error) => console.error('Failed:', error)
 *   }
 * );
 * ```
 */
export const useUpdateItem = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({
      listId,
      itemId,
      data,
    }: {
      listId: string;
      itemId: string;
      data: CreateListItemRequest;
    }) => listItemService.updateItem(listId, itemId, data),
    onSuccess: (updated, variables) => {
      // Invalidate the list's items to refetch updated data
      queryClient.invalidateQueries({ queryKey: todoItemKeys.list(variables.listId) });
      
      // Invalidate the specific item to refetch updated data
      queryClient.invalidateQueries({
        queryKey: todoItemKeys.detail(variables.listId, variables.itemId),
      });
      
      // Update the item in cache immediately for optimistic UI
      queryClient.setQueryData(
        todoItemKeys.detail(variables.listId, variables.itemId),
        updated
      );
    },
    // Retry only on server errors (5xx) or network errors, not on client errors (4xx)
    retry: (failureCount, error: any) => {
      if (error?.response?.status >= 400 && error?.response?.status < 500) {
        return false; // Don't retry on client errors
      }
      return failureCount < 1; // Retry once for server errors
    },
  });
};

/**
 * Hook to delete a todo item.
 * 
 * @returns React Query mutation object with mutate function and loading/error states
 * 
 * @example
 * ```typescript
 * const deleteItem = useDeleteItem();
 * deleteItem.mutate(
 *   { listId: 'list-id', itemId: 'item-id' },
 *   {
 *     onSuccess: () => console.log('Deleted successfully'),
 *     onError: (error) => console.error('Failed:', error)
 *   }
 * );
 * ```
 */
export const useDeleteItem = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ listId, itemId }: { listId: string; itemId: string }) =>
      listItemService.deleteItem(listId, itemId),
    onSuccess: (_, variables) => {
      // Remove the deleted item from cache
      queryClient.removeQueries({
        queryKey: todoItemKeys.detail(variables.listId, variables.itemId),
      });
      
      // Invalidate the list's items to refetch and remove the deleted item
      queryClient.invalidateQueries({ queryKey: todoItemKeys.list(variables.listId) });
      
      // Invalidate the parent list to update item count
      queryClient.invalidateQueries({ queryKey: todoListKeys.detail(variables.listId) });
      
      // Invalidate all lists to update item counts on lists page
      queryClient.invalidateQueries({ queryKey: todoListKeys.all });
    },
    // Retry only on server errors (5xx) or network errors, not on client errors (4xx)
    retry: (failureCount, error: any) => {
      if (error?.response?.status >= 400 && error?.response?.status < 500) {
        return false; // Don't retry on client errors
      }
      return failureCount < 1; // Retry once for server errors
    },
  });
};

/**
 * Hook to mark a todo item as completed or not completed.
 * 
 * @returns React Query mutation object with mutate function and loading/error states
 * 
 * @example
 * ```typescript
 * const markComplete = useMarkItemComplete();
 * markComplete.mutate(
 *   { listId: 'list-id', itemId: 'item-id', isCompleted: true },
 *   {
 *     onSuccess: (updated) => console.log('Marked complete:', updated.isCompleted),
 *     onError: (error) => console.error('Failed:', error)
 *   }
 * );
 * ```
 */
export const useMarkItemComplete = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({
      listId,
      itemId,
      isCompleted,
    }: {
      listId: string;
      itemId: string;
      isCompleted: boolean;
    }) => listItemService.markItemComplete(listId, itemId, isCompleted),
    onSuccess: (updated, variables) => {
      // Invalidate the list's items to refetch updated completion status
      queryClient.invalidateQueries({ queryKey: todoItemKeys.list(variables.listId) });
      
      // Update the item in cache immediately for optimistic UI
      queryClient.setQueryData(
        todoItemKeys.detail(variables.listId, variables.itemId),
        updated
      );
      
      // Invalidate the parent list to update completion status
      queryClient.invalidateQueries({ queryKey: todoListKeys.detail(variables.listId) });
      
      // Invalidate all lists to update completed counts on lists page
      queryClient.invalidateQueries({ queryKey: todoListKeys.all });
    },
    // Retry only on server errors (5xx) or network errors, not on client errors (4xx)
    retry: (failureCount, error: any) => {
      if (error?.response?.status >= 400 && error?.response?.status < 500) {
        return false; // Don't retry on client errors
      }
      return failureCount < 1; // Retry once for server errors
    },
  });
};

/**
 * Hook to reorder todo items within a list.
 * 
 * @returns React Query mutation object with mutate function and loading/error states
 * 
 * @example
 * ```typescript
 * const reorderItems = useReorderItems();
 * reorderItems.mutate(
 *   {
 *     listId: 'list-id',
 *     data: {
 *       itemOrders: {
 *         'item-id-1': 0,
 *         'item-id-2': 1,
 *         'item-id-3': 2
 *       }
 *     }
 *   },
 *   {
 *     onSuccess: () => console.log('Reordered successfully'),
 *     onError: (error) => console.error('Failed:', error)
 *   }
 * );
 * ```
 */
export const useReorderItems = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ listId, data }: { listId: string; data: ReorderItemsRequest }) =>
      listItemService.reorderItems(listId, data),
    onSuccess: (_, variables) => {
      // Invalidate the list's items to refetch with new order
      queryClient.invalidateQueries({ queryKey: todoItemKeys.list(variables.listId) });
    },
    // Retry only on server errors (5xx) or network errors, not on client errors (4xx)
    retry: (failureCount, error: any) => {
      if (error?.response?.status >= 400 && error?.response?.status < 500) {
        return false; // Don't retry on client errors
      }
      return failureCount < 1; // Retry once for server errors
    },
  });
};
