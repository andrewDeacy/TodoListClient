/**
 * Error Utilities
 * 
 * Utility functions for handling and formatting errors throughout the application.
 * Provides consistent error message extraction and user-friendly error handling.
 */

import { AxiosError } from 'axios';

/**
 * Extract a user-friendly error message from an error object
 * 
 * @param error - The error object (can be AxiosError, Error, or unknown)
 * @param defaultMessage - Default message if error message cannot be extracted
 * @returns User-friendly error message string
 * 
 * @example
 * ```typescript
 * const message = getErrorMessage(error, 'Something went wrong');
 * ```
 */
export const getErrorMessage = (
  error: unknown,
  defaultMessage: string = 'An unexpected error occurred. Please try again.'
): string => {
  // Handle AxiosError (API errors)
  if (error instanceof AxiosError) {
    // Try to extract error message from response data
    const responseData = error.response?.data;
    
    if (responseData) {
      // Check for common error response formats
      if (typeof responseData === 'string') {
        return responseData;
      }
      
      if (typeof responseData === 'object') {
        // Try different common error message fields
        if (responseData.message) {
          return responseData.message;
        }
        if (responseData.error) {
          return responseData.error;
        }
        if (responseData.title) {
          return responseData.title;
        }
        if (responseData.detail) {
          return responseData.detail;
        }
      }
    }

    // Handle specific HTTP status codes
    const status = error.response?.status;
    if (status === 401) {
      return 'Your session has expired. Please log in again.';
    }
    if (status === 403) {
      return 'You do not have permission to perform this action.';
    }
    if (status === 404) {
      return 'The requested resource was not found.';
    }
    if (status === 409) {
      return 'This resource already exists.';
    }
    if (status === 422) {
      return 'The provided data is invalid. Please check your input.';
    }
    if (status === 429) {
      return 'Too many requests. Please try again later.';
    }
    if (status && status >= 500) {
      return 'Server error. Please try again later.';
    }

    // Handle network errors (no response received)
    if (error.request && !error.response) {
      return 'Unable to connect to the server. Please check your internet connection.';
    }

    // Use Axios error message if available
    if (error.message) {
      return error.message;
    }
  }

  // Handle standard Error objects
  if (error instanceof Error) {
    return error.message || defaultMessage;
  }

  // Handle string errors
  if (typeof error === 'string') {
    return error;
  }

  // Fallback to default message
  return defaultMessage;
};

/**
 * Check if an error is a network error (no response from server)
 * 
 * @param error - The error object
 * @returns true if error is a network error, false otherwise
 */
export const isNetworkError = (error: unknown): boolean => {
  if (error instanceof AxiosError) {
    // Network error: request was made but no response received
    return !!error.request && !error.response;
  }
  return false;
};

/**
 * Check if an error is an authentication error (401 Unauthorized)
 * 
 * @param error - The error object
 * @returns true if error is a 401 error, false otherwise
 */
export const isAuthError = (error: unknown): boolean => {
  if (error instanceof AxiosError) {
    return error.response?.status === 401;
  }
  return false;
};

/**
 * Check if an error is a server error (5xx status codes)
 * 
 * @param error - The error object
 * @returns true if error is a server error, false otherwise
 */
export const isServerError = (error: unknown): boolean => {
  if (error instanceof AxiosError) {
    const status = error.response?.status;
    return status !== undefined && status >= 500 && status < 600;
  }
  return false;
};

/**
 * Check if an error is a client error (4xx status codes, excluding 401)
 * 
 * @param error - The error object
 * @returns true if error is a client error, false otherwise
 */
export const isClientError = (error: unknown): boolean => {
  if (error instanceof AxiosError) {
    const status = error.response?.status;
    return status !== undefined && status >= 400 && status < 500 && status !== 401;
  }
  return false;
};
