/**
 * React Query Hooks for TodoLists
 * 
 * Custom hooks for managing todo list data using React Query (TanStack Query).
 * Provides queries for fetching lists and mutations for creating, updating, and deleting lists.
 * Handles caching, invalidation, and loading/error states automatically.
 * 
 * @see ../TodoListAPI/README.md for backend API documentation
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as listService from '../services/listService';
import type { UpdateListRequest } from '../types/api';

/**
 * Query key factory for todo list queries.
 * Centralizes query key management for consistency and easier invalidation.
 */
export const todoListKeys = {
  /**
   * Query key for all todo lists
   */
  all: ['todoLists'] as const,
  
  /**
   * Query key for a specific todo list by ID
   * @param id - The todo list ID
   */
  detail: (id: string) => ['todoLists', id] as const,
};

/**
 * Hook to fetch all todo lists for the current authenticated user.
 * 
 * @returns React Query query object with data, loading, error states
 * 
 * @example
 * ```typescript
 * const { data: lists, isLoading, error } = useTodoLists();
 * // Use lists, isLoading, and error in your component
 * ```
 */
export const useTodoLists = () => {
  return useQuery({
    queryKey: todoListKeys.all,
    queryFn: listService.getAllLists,
    staleTime: 5 * 60 * 1000, // 5 minutes - data is fresh for 5 minutes
  });
};

/**
 * Hook to fetch a specific todo list by ID.
 * 
 * @param id - The unique identifier of the todo list (UUID string)
 * @param options - Optional query options (enabled, etc.)
 * @returns React Query query object with data, loading, error states
 * 
 * @example
 * ```typescript
 * const { data: list, isLoading, error } = useTodoList(listId);
 * // Use list, isLoading, and error in your component
 * ```
 */
export const useTodoList = (
  id: string,
  options?: { enabled?: boolean }
) => {
  return useQuery({
    queryKey: todoListKeys.detail(id),
    queryFn: () => listService.getListById(id),
    enabled: options?.enabled !== false && !!id, // Only fetch if ID is provided
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * Hook to create a new todo list.
 * 
 * @returns React Query mutation object with mutate function and loading/error states
 * 
 * @example
 * ```typescript
 * const createList = useCreateList();
 * createList.mutate({ name: 'My List', description: 'Description' }, {
 *   onSuccess: (newList) => console.log('Created:', newList.id),
 *   onError: (error) => console.error('Failed:', error)
 * });
 * ```
 */
export const useCreateList = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: listService.createList,
    onSuccess: (newList) => {
      // Invalidate and refetch all lists to include the new one
      queryClient.invalidateQueries({ queryKey: todoListKeys.all });
      
      // Optionally, set the new list in cache for immediate access
      queryClient.setQueryData(todoListKeys.detail(newList.id), newList);
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
 * Hook to update an existing todo list.
 * 
 * @returns React Query mutation object with mutate function and loading/error states
 * 
 * @example
 * ```typescript
 * const updateList = useUpdateList();
 * updateList.mutate(
 *   { id: listId, data: { name: 'Updated Name', description: 'Updated' } },
 *   {
 *     onSuccess: () => console.log('Updated successfully'),
 *     onError: (error) => console.error('Failed:', error)
 *   }
 * );
 * ```
 */
export const useUpdateList = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateListRequest }) =>
      listService.updateList(id, data),
    onSuccess: (_, variables) => {
      // Invalidate all lists to refetch updated data
      queryClient.invalidateQueries({ queryKey: todoListKeys.all });
      
      // Invalidate the specific list to refetch updated data
      queryClient.invalidateQueries({ queryKey: todoListKeys.detail(variables.id) });
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
 * Hook to delete a todo list.
 * 
 * @returns React Query mutation object with mutate function and loading/error states
 * 
 * @example
 * ```typescript
 * const deleteList = useDeleteList();
 * deleteList.mutate(listId, {
 *   onSuccess: () => console.log('Deleted successfully'),
 *   onError: (error) => console.error('Failed:', error)
 * });
 * ```
 */
export const useDeleteList = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: listService.deleteList,
    onSuccess: (_, deletedId) => {
      // Remove the deleted list from cache
      queryClient.removeQueries({ queryKey: todoListKeys.detail(deletedId) });
      
      // Invalidate all lists to refetch and remove the deleted list
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
