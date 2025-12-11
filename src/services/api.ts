/**
 * API Client Service
 * 
 * Centralized axios instance for all API communication with the backend.
 * Handles JWT token injection, error handling, and request/response logging.
 * 
 * @see ../TodoListAPI/README.md for backend API documentation
 */

import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';

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
    // Log error response in development mode
    if (isDevelopment()) {
      console.error(`[API Error] ${error.config?.method?.toUpperCase()} ${error.config?.url}`, {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message,
      });
    }

    // Handle specific error cases
    if (error.response) {
      const status = error.response.status;

      // Handle 401 Unauthorized - token may be invalid or expired
      if (status === 401) {
        // Clear invalid token
        tokenStorage.removeToken();
        
        // Redirect to login page if not already there
        // Note: This will be handled by the auth context/routing in a later task
        // For now, we just clear the token
        console.warn('Unauthorized request - token cleared. Please login again.');
      }

      // Handle 403 Forbidden
      if (status === 403) {
        console.error('Forbidden: You do not have permission to access this resource.');
      }

      // Handle 404 Not Found
      if (status === 404) {
        console.error('Resource not found.');
      }

      // Handle 500 Internal Server Error
      if (status >= 500) {
        console.error('Server error. Please try again later.');
      }
    } else if (error.request) {
      // Request was made but no response received (network error)
      console.error('Network error: Unable to reach the server. Please check your connection.');
    } else {
      // Something else happened
      console.error('Request error:', error.message);
    }

    // Return error to be handled by the calling code
    return Promise.reject(error);
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
