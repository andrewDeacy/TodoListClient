/**
 * Authentication Service
 * 
 * Handles user authentication operations: login, register, and logout.
 * Integrates with the API client and token storage for JWT token management.
 * 
 * @see ../TodoListAPI/README.md for backend API documentation
 */

import apiClient, { tokenStorage } from './api';
import type { LoginRequest, RegisterRequest, AuthResponse } from '../types/api';

/**
 * Register a new user account.
 * 
 * @param registerData - User registration data (email, username, password)
 * @returns Promise resolving to AuthResponse containing JWT token and user info
 * @throws Error if registration fails (e.g., email/username already exists, validation errors)
 * 
 * @example
 * ```typescript
 * try {
 *   const response = await authService.register({
 *     email: 'user@example.com',
 *     username: 'testuser',
 *     password: 'Password123'
 *   });
 *   console.log('Registered:', response.email);
 * } catch (error) {
 *   console.error('Registration failed:', error);
 * }
 * ```
 */
export const register = async (registerData: RegisterRequest): Promise<AuthResponse> => {
  try {
    const response = await apiClient.post<AuthResponse>('/api/auth/register', registerData);
    
    // Store the JWT token automatically
    if (response.data.token) {
      tokenStorage.setToken(response.data.token);
    }
    
    return response.data;
  } catch (error: any) {
    // Re-throw with more context if needed
    throw error;
  }
};

/**
 * Login with email/username and password.
 * 
 * @param loginData - User login data (emailOrUsername, password)
 * @returns Promise resolving to AuthResponse containing JWT token and user info
 * @throws Error if login fails (e.g., invalid credentials, user not found)
 * 
 * @example
 * ```typescript
 * try {
 *   const response = await authService.login({
 *     emailOrUsername: 'user@example.com',
 *     password: 'Password123'
 *   });
 *   console.log('Logged in:', response.email);
 * } catch (error) {
 *   console.error('Login failed:', error);
 * }
 * ```
 */
export const login = async (loginData: LoginRequest): Promise<AuthResponse> => {
  try {
    const response = await apiClient.post<AuthResponse>('/api/auth/login', loginData);
    
    // Store the JWT token automatically
    if (response.data.token) {
      tokenStorage.setToken(response.data.token);
    }
    
    return response.data;
  } catch (error: any) {
    // Re-throw with more context if needed
    throw error;
  }
};

/**
 * Logout the current user.
 * Removes the JWT token from storage, effectively logging out the user.
 * 
 * @example
 * ```typescript
 * authService.logout();
 * // User is now logged out, token removed from storage
 * ```
 */
export const logout = (): void => {
  tokenStorage.removeToken();
};

/**
 * Get the current JWT token from storage.
 * 
 * @returns The JWT token string, or null if not found/not authenticated
 * 
 * @example
 * ```typescript
 * const token = authService.getToken();
 * if (token) {
 *   console.log('User is authenticated');
 * }
 * ```
 */
export const getToken = (): string | null => {
  return tokenStorage.getToken();
};

/**
 * Check if the user is currently authenticated.
 * 
 * @returns true if a token exists in storage, false otherwise
 * 
 * @example
 * ```typescript
 * if (authService.isAuthenticated()) {
 *   console.log('User is logged in');
 * } else {
 *   console.log('User is not logged in');
 * }
 * ```
 */
export const isAuthenticated = (): boolean => {
  return tokenStorage.isAuthenticated();
};

/**
 * Authentication service object with all auth-related functions.
 * Can be imported as a namespace or individual functions.
 */
const authService = {
  register,
  login,
  logout,
  getToken,
  isAuthenticated,
};

export default authService;
