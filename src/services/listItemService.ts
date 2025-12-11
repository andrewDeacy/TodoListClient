/**
 * TodoItem Service
 * 
 * Handles todo item operations: create, read, update, delete, mark complete, and reorder.
 * Integrates with the API client for backend communication.
 * 
 * @see ../TodoListAPI/README.md for backend API documentation
 */

import apiClient from './api';
import type { TodoItem, CreateListItemRequest, ReorderItemsRequest } from '../types/api';

/**
 * Get all todo items for a specific list.
 * Items are returned ordered by their Order property (lower values appear first).
 * 
 * @param listId - The unique identifier of the todo list (UUID string)
 * @returns Promise resolving to array of TodoItem objects
 * @throws Error if the request fails (e.g., authentication error, network error)
 * 
 * @example
 * ```typescript
 * try {
 *   const items = await listItemService.getItemsByListId('123e4567-e89b-12d3-a456-426614174000');
 *   console.log('List has', items.length, 'items');
 * } catch (error) {
 *   console.error('Failed to fetch items:', error);
 * }
 * ```
 */
export const getItemsByListId = async (listId: string): Promise<TodoItem[]> => {
  try {
    const response = await apiClient.get<TodoItem[]>(`/api/lists/${listId}/items`);
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

/**
 * Get a specific todo item by ID.
 * 
 * @param listId - The unique identifier of the todo list (UUID string)
 * @param itemId - The unique identifier of the todo item (UUID string)
 * @returns Promise resolving to TodoItem object, or null if not found
 * @throws Error if the request fails (e.g., authentication error, network error)
 * 
 * @example
 * ```typescript
 * try {
 *   const item = await listItemService.getItemById('list-id', 'item-id');
 *   if (item) {
 *     console.log('Item title:', item.title);
 *   }
 * } catch (error) {
 *   console.error('Failed to fetch item:', error);
 * }
 * ```
 */
export const getItemById = async (listId: string, itemId: string): Promise<TodoItem | null> => {
  try {
    const response = await apiClient.get<TodoItem>(`/api/lists/${listId}/items/${itemId}`);
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
 * Create a new todo item in a list.
 * The item is automatically assigned to the end of the list (max Order + 1).
 * 
 * @param listId - The unique identifier of the todo list (UUID string)
 * @param itemData - Todo item creation data (title, optional description, optional dueDate)
 * @returns Promise resolving to the created TodoItem object
 * @throws Error if creation fails (e.g., validation error, authentication error)
 * 
 * @example
 * ```typescript
 * try {
 *   const newItem = await listItemService.createItem('list-id', {
 *     title: 'Complete task',
 *     description: 'Task description',
 *     dueDate: '2024-12-31T23:59:59Z'
 *   });
 *   console.log('Created item:', newItem.id);
 * } catch (error) {
 *   console.error('Failed to create item:', error);
 * }
 * ```
 */
export const createItem = async (listId: string, itemData: CreateListItemRequest): Promise<TodoItem> => {
  try {
    const response = await apiClient.post<TodoItem>(`/api/lists/${listId}/items`, itemData);
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

/**
 * Update an existing todo item.
 * 
 * @param listId - The unique identifier of the todo list (UUID string)
 * @param itemId - The unique identifier of the todo item to update (UUID string)
 * @param itemData - Updated todo item data (title, optional description, optional dueDate)
 * @returns Promise resolving to the updated TodoItem object
 * @throws Error if update fails (e.g., validation error, authentication error, not found)
 * 
 * @example
 * ```typescript
 * try {
 *   const updated = await listItemService.updateItem('list-id', 'item-id', {
 *     title: 'Updated title',
 *     description: 'Updated description',
 *     dueDate: null
 *   });
 *   console.log('Item updated:', updated.id);
 * } catch (error) {
 *   console.error('Failed to update item:', error);
 * }
 * ```
 */
export const updateItem = async (
  listId: string,
  itemId: string,
  itemData: CreateListItemRequest
): Promise<TodoItem> => {
  try {
    const response = await apiClient.put<TodoItem>(`/api/lists/${listId}/items/${itemId}`, itemData);
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

/**
 * Delete a todo item by ID.
 * 
 * @param listId - The unique identifier of the todo list (UUID string)
 * @param itemId - The unique identifier of the todo item to delete (UUID string)
 * @returns Promise resolving to void (204 No Content on success)
 * @throws Error if deletion fails (e.g., authentication error, not found)
 * 
 * @example
 * ```typescript
 * try {
 *   await listItemService.deleteItem('list-id', 'item-id');
 *   console.log('Item deleted successfully');
 * } catch (error) {
 *   console.error('Failed to delete item:', error);
 * }
 * ```
 */
export const deleteItem = async (listId: string, itemId: string): Promise<void> => {
  try {
    await apiClient.delete(`/api/lists/${listId}/items/${itemId}`);
  } catch (error: any) {
    throw error;
  }
};

/**
 * Mark a todo item as completed or not completed.
 * 
 * @param listId - The unique identifier of the todo list (UUID string)
 * @param itemId - The unique identifier of the todo item (UUID string)
 * @param isCompleted - True to mark as completed, false to mark as not completed
 * @returns Promise resolving to the updated TodoItem object
 * @throws Error if the operation fails (e.g., authentication error, not found)
 * 
 * @example
 * ```typescript
 * try {
 *   const updated = await listItemService.markItemComplete('list-id', 'item-id', true);
 *   console.log('Item marked as completed:', updated.isCompleted);
 * } catch (error) {
 *   console.error('Failed to mark item complete:', error);
 * }
 * ```
 */
export const markItemComplete = async (
  listId: string,
  itemId: string,
  isCompleted: boolean
): Promise<TodoItem> => {
  try {
    const response = await apiClient.patch<TodoItem>(
      `/api/lists/${listId}/items/${itemId}/complete?isCompleted=${isCompleted}`
    );
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

/**
 * Reorder todo items within a list by updating their Order values.
 * 
 * @param listId - The unique identifier of the todo list (UUID string)
 * @param reorderData - Dictionary mapping item IDs to their new order positions
 * @returns Promise resolving to void (204 No Content on success)
 * @throws Error if reordering fails (e.g., validation error, authentication error)
 * 
 * @example
 * ```typescript
 * try {
 *   await listItemService.reorderItems('list-id', {
 *     itemOrders: {
 *       'item-id-1': 0,
 *       'item-id-2': 1,
 *       'item-id-3': 2
 *     }
 *   });
 *   console.log('Items reordered successfully');
 * } catch (error) {
 *   console.error('Failed to reorder items:', error);
 * }
 * ```
 */
export const reorderItems = async (listId: string, reorderData: ReorderItemsRequest): Promise<void> => {
  try {
    await apiClient.patch(`/api/lists/${listId}/items/reorder`, reorderData);
  } catch (error: any) {
    throw error;
  }
};
