/**
 * TypeScript type definitions matching backend DTOs and request models.
 * 
 * These types ensure type safety when communicating with the backend API.
 * Field names and types match the backend exactly to prevent integration issues.
 * 
 * @see ../TodoListAPI/TodoListAPI.Core/DTOs/ for backend DTO definitions
 * @see ../TodoListAPI/TodoListAPI.Core/Models/Requests/ for backend request models
 */

/**
 * Data Transfer Object for TodoList.
 * Matches TodoListDto from the backend API.
 * 
 * @property {string} id - Unique identifier for the todo list (UUID)
 * @property {string} name - Name/title of the todo list
 * @property {string | null} description - Optional description of the todo list
 * @property {boolean} isCompleted - Indicates whether the entire list is marked as completed
 * @property {string} createdDate - Date and time when the todo list was created (ISO 8601 string)
 * @property {string} updatedDate - Date and time when the todo list was last updated (ISO 8601 string)
 * @property {string} userId - Foreign key to the User who owns this todo list (UUID)
 * @property {TodoItem[] | null} items - Collection of TodoItems in this list (optional, may be null if not loaded)
 */
export interface TodoList {
  id: string;
  name: string;
  description: string | null;
  isCompleted: boolean;
  createdDate: string;
  updatedDate: string;
  userId: string;
  items: TodoItem[] | null;
}

/**
 * Data Transfer Object for TodoItem.
 * Matches TodoItemDto from the backend API.
 * 
 * @property {string} id - Unique identifier for the todo item (UUID)
 * @property {string} listId - Foreign key to the TodoList that contains this item (UUID)
 * @property {string} title - Title/name of the todo item
 * @property {string | null} description - Optional description/details of the todo item
 * @property {boolean} isCompleted - Indicates whether the todo item is completed
 * @property {string} createdDate - Date and time when the todo item was created (ISO 8601 string)
 * @property {string} updatedDate - Date and time when the todo item was last updated (ISO 8601 string)
 * @property {string | null} dueDate - Optional due date for the todo item (ISO 8601 string, null if no due date is set)
 * @property {number} order - Order/position of the todo item within its list (lower values appear first)
 */
export interface TodoItem {
  id: string;
  listId: string;
  title: string;
  description: string | null;
  isCompleted: boolean;
  createdDate: string;
  updatedDate: string;
  dueDate: string | null;
  order: number;
}

/**
 * Request model for creating a new todo list.
 * Matches CreateListRequest from the backend API.
 * 
 * @property {string} name - Name/title of the todo list (required, max 200 characters)
 * @property {string | null} description - Optional description of the todo list (max 1000 characters)
 */
export interface CreateListRequest {
  name: string;
  description: string | null;
}

/**
 * Request model for updating an existing todo list.
 * Matches UpdateListRequest from the backend API.
 * 
 * @property {string} name - Updated name/title of the todo list (required, max 200 characters)
 * @property {string | null} description - Updated description of the todo list (optional, max 1000 characters)
 */
export interface UpdateListRequest {
  name: string;
  description: string | null;
}

/**
 * Request model for creating a new todo item within a list.
 * Matches CreateListItemRequest from the backend API.
 * 
 * @property {string} title - Title/name of the todo item (required, max 200 characters)
 * @property {string | null} description - Optional description/details of the todo item (max 1000 characters)
 * @property {string | null} dueDate - Optional due date for the todo item (ISO 8601 string)
 */
export interface CreateListItemRequest {
  title: string;
  description: string | null;
  dueDate: string | null;
}

/**
 * Request model for reordering todo items within a list.
 * Matches ReorderItemsRequest from the backend API.
 * 
 * @property {Record<string, number>} itemOrders - Dictionary mapping item IDs (UUID strings) to their new order positions.
 *   Lower order values appear first in the list.
 */
export interface ReorderItemsRequest {
  itemOrders: Record<string, number>;
}

/**
 * Response model for authentication operations (login/register).
 * Matches AuthResponse from the backend API.
 * 
 * @property {string} token - JWT token for authenticated requests (include in Authorization header as "Bearer {token}")
 * @property {string} userId - Unique identifier of the authenticated user (UUID)
 * @property {string} email - User's email address
 * @property {string} username - User's username
 */
export interface AuthResponse {
  token: string;
  userId: string;
  email: string;
  username: string;
}

/**
 * Request model for user login.
 * Matches LoginRequest from the backend API.
 * Supports login with either email or username.
 * 
 * @property {string} emailOrUsername - User's email address or username for login (required, max 256 characters)
 * @property {string} password - User's password (required, max 100 characters)
 */
export interface LoginRequest {
  emailOrUsername: string;
  password: string;
}

/**
 * Request model for user registration.
 * Matches RegisterRequest from the backend API.
 * 
 * @property {string} email - User's email address (required, must be unique and valid email format, max 256 characters)
 * @property {string} username - User's username (required, must be unique, min 3 characters, max 50 characters)
 * @property {string} password - User's password (required, min 6 characters, max 100 characters)
 */
export interface RegisterRequest {
  email: string;
  username: string;
  password: string;
}
