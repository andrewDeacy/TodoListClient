/**
 * TodoList Service
 * 
 * Handles todo list operations: create, read, update, and delete.
 * Integrates with the API client for backend communication.
 * 
 * @see ../TodoListAPI/README.md for backend API documentation
 */

import apiClient from './api';
import type { TodoList, CreateListRequest, UpdateListRequest } from '../types/api';

/**
 * Get all todo lists for the current authenticated user.
 * 
 * @returns Promise resolving to array of TodoList objects
 * @throws Error if the request fails (e.g., authentication error, network error)
 * 
 * @example
 * ```typescript
 * try {
 *   const lists = await listService.getAllLists();
 *   console.log('User has', lists.length, 'lists');
 * } catch (error) {
 *   console.error('Failed to fetch lists:', error);
 * }
 * ```
 */
export const getAllLists = async (): Promise<TodoList[]> => {
  try {
    const response = await apiClient.get<TodoList[]>('/api/List');
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

/**
 * Get a specific todo list by ID.
 * 
 * @param id - The unique identifier of the todo list (UUID string)
 * @returns Promise resolving to TodoList object, or null if not found
 * @throws Error if the request fails (e.g., authentication error, network error)
 * 
 * @example
 * ```typescript
 * try {
 *   const list = await listService.getListById('123e4567-e89b-12d3-a456-426614174000');
 *   if (list) {
 *     console.log('List name:', list.name);
 *   }
 * } catch (error) {
 *   console.error('Failed to fetch list:', error);
 * }
 * ```
 */
export const getListById = async (id: string): Promise<TodoList | null> => {
  try {
    const response = await apiClient.get<TodoList>(`/api/List/${id}`);
    return response.data;
  } catch (error: any) {
    // Handle 404 Not Found
    if (error.response?.status === 404) {
      return null;
    }
    throw error;
  }
};

/**
 * Create a new todo list for the current authenticated user.
 * 
 * @param listData - Todo list creation data (name, optional description)
 * @returns Promise resolving to the created TodoList object
 * @throws Error if creation fails (e.g., validation error, authentication error)
 * 
 * @example
 * ```typescript
 * try {
 *   const newList = await listService.createList({
 *     name: 'My Todo List',
 *     description: 'A list of tasks'
 *   });
 *   console.log('Created list:', newList.id);
 * } catch (error) {
 *   console.error('Failed to create list:', error);
 * }
 * ```
 */
export const createList = async (listData: CreateListRequest): Promise<TodoList> => {
  try {
    const response = await apiClient.post<TodoList>('/api/List', listData);
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

/**
 * Update an existing todo list.
 * 
 * @param id - The unique identifier of the todo list to update (UUID string)
 * @param listData - Updated todo list data (name, optional description)
 * @returns Promise resolving to void (204 No Content on success)
 * @throws Error if update fails (e.g., validation error, authentication error, not found)
 * 
 * @example
 * ```typescript
 * try {
 *   await listService.updateList('123e4567-e89b-12d3-a456-426614174000', {
 *     name: 'Updated List Name',
 *     description: 'Updated description'
 *   });
 *   console.log('List updated successfully');
 * } catch (error) {
 *   console.error('Failed to update list:', error);
 * }
 * ```
 */
export const updateList = async (id: string, listData: UpdateListRequest): Promise<void> => {
  try {
    await apiClient.put(`/api/List/${id}`, listData);
  } catch (error: any) {
    throw error;
  }
};

/**
 * Delete a todo list by ID.
 * 
 * @param id - The unique identifier of the todo list to delete (UUID string)
 * @returns Promise resolving to void (204 No Content on success)
 * @throws Error if deletion fails (e.g., authentication error, not found)
 * 
 * @example
 * ```typescript
 * try {
 *   await listService.deleteList('123e4567-e89b-12d3-a456-426614174000');
 *   console.log('List deleted successfully');
 * } catch (error) {
 *   console.error('Failed to delete list:', error);
 * }
 * ```
 */
export const deleteList = async (id: string): Promise<void> => {
  try {
    await apiClient.delete(`/api/List/${id}`);
  } catch (error: any) {
    throw error;
  }
};
