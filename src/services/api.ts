/**
 * API Client Service
 * 
 * Centralized axios instance for all API communication with the backend.
 * Handles JWT token injection, error handling, and request/response logging.
 * 
 * @see ../TodoListAPI/README.md for backend API documentation
 */

import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { getErrorMessage, isNetworkError, isAuthError } from '../utils/errorUtils';

/**
 * Storage key for JWT token in localStorage
 */
const TOKEN_STORAGE_KEY = 'todolist_auth_token';

/**
 * Get the API base URL from environment variables or use default.
 * Vite requires environment variables to be prefixed with VITE_ to be accessible in the client.
 * 
 * Default: http://localhost:5074 (backend HTTP port)
 */
const getApiBaseUrl = (): string => {
  return import.meta.env.VITE_API_BASE_URL || 'http://localhost:5074';
};

/**
 * Token management utilities
 */
export const tokenStorage = {
  /**
   * Get the stored JWT token from localStorage
   * @returns The JWT token string, or null if not found
   */
  getToken: (): string | null => {
    try {
      return localStorage.getItem(TOKEN_STORAGE_KEY);
    } catch (error) {
      console.error('Error reading token from localStorage:', error);
      return null;
    }
  },

  /**
   * Store the JWT token in localStorage
   * @param token - The JWT token to store
   */
  setToken: (token: string): void => {
    try {
      localStorage.setItem(TOKEN_STORAGE_KEY, token);
    } catch (error) {
      console.error('Error storing token in localStorage:', error);
    }
  },

  /**
   * Remove the JWT token from localStorage
   */
  removeToken: (): void => {
    try {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
    } catch (error) {
      console.error('Error removing token from localStorage:', error);
    }
  },

  /**
   * Check if a token exists and user is authenticated
   * @returns true if token exists, false otherwise
   */
  isAuthenticated: (): boolean => {
    return tokenStorage.getToken() !== null;
  },
};

/**
 * Create axios instance with base configuration
 */
const apiClient: AxiosInstance = axios.create({
  baseURL: getApiBaseUrl(),
  timeout: 10000, // 10 second timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Check if we're in development mode
 */
const isDevelopment = (): boolean => {
  return import.meta.env.DEV;
};

/**
 * Request interceptor: Inject JWT token into Authorization header
 */
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Get token from storage
    const token = tokenStorage.getToken();

    // Add Authorization header if token exists
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Log request in development mode
    if (isDevelopment()) {
      console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`, {
        baseURL: config.baseURL,
        headers: config.headers,
        data: config.data,
      });
    }

    return config;
  },
  (error: AxiosError) => {
    // Log request error in development mode
    if (isDevelopment()) {
      console.error('[API Request Error]', error);
    }
    return Promise.reject(error);
  }
);

/**
 * Response interceptor: Handle errors and log responses
 */
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Log successful response in development mode
    if (isDevelopment()) {
      console.log(`[API Response] ${response.config.method?.toUpperCase()} ${response.config.url}`, {
        status: response.status,
        data: response.data,
      });
    }

    return response;
  },
  (error: AxiosError) => {
    // Extract user-friendly error message
    const errorMessage = getErrorMessage(error);

    // Log error response in development mode
    if (isDevelopment()) {
      console.error(`[API Error] ${error.config?.method?.toUpperCase()} ${error.config?.url}`, {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message,
        userMessage: errorMessage,
      });
    }

    // Handle authentication errors (401 Unauthorized)
    if (isAuthError(error)) {
      // Clear invalid token
      tokenStorage.removeToken();
      
      // Log warning in development
      if (isDevelopment()) {
        console.warn('Unauthorized request - token cleared. User will be redirected to login.');
      }

      // Redirect to login page if not already there
      // Check if we're in a browser environment and not already on login/register pages
      if (typeof window !== 'undefined') {
        const currentPath = window.location.pathname;
        if (currentPath !== '/login' && currentPath !== '/register') {
          // Use setTimeout to avoid navigation during render
          setTimeout(() => {
            window.location.href = '/login';
          }, 0);
        }
      }
    }

    // Handle network errors (no response from server)
    if (isNetworkError(error)) {
      if (isDevelopment()) {
        console.error('Network error:', errorMessage);
      }
      // Network errors are already handled with user-friendly message
    }

    // Handle server errors (5xx)
    if (error.response && error.response.status >= 500) {
      if (isDevelopment()) {
        console.error('Server error:', errorMessage);
      }
    }

    // Create enhanced error object with user-friendly message
    const enhancedError = new Error(errorMessage);
    (enhancedError as any).originalError = error;
    (enhancedError as any).status = error.response?.status;
    (enhancedError as any).response = error.response;

    // Return enhanced error to be handled by the calling code
    return Promise.reject(enhancedError);
  }
);

/**
 * Export the configured axios instance
 */
export default apiClient;

/**
 * Export API base URL for reference
 */
export const API_BASE_URL = getApiBaseUrl();
