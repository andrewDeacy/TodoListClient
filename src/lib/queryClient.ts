/**
 * React Query Client Configuration
 * 
 * Centralized configuration for TanStack Query (React Query).
 * Provides default options for queries and mutations.
 */

import { QueryClient } from '@tanstack/react-query';

/**
 * Create and configure the QueryClient instance.
 * 
 * Default options:
 * - staleTime: 5 minutes - Data is considered fresh for 5 minutes before refetching
 * - gcTime: 10 minutes - Inactive cached data is kept in memory for 10 minutes
 * - retry: 1 - Retry failed requests once before giving up
 * - refetchOnWindowFocus: false - Don't refetch when window regains focus (better UX)
 * - refetchOnReconnect: true - Refetch when network reconnects
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Data is considered fresh for 5 minutes
      // This reduces unnecessary refetches while keeping data reasonably up-to-date
      staleTime: 5 * 60 * 1000, // 5 minutes

      // Inactive cached data is kept in memory for 10 minutes
      // This allows instant display of previously fetched data when navigating back
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)

      // Retry failed requests once before giving up
      // Provides resilience for transient network errors
      retry: 1,

      // Don't refetch when window regains focus
      // Prevents annoying refetches when user switches tabs
      refetchOnWindowFocus: false,

      // Refetch when network reconnects
      // Ensures data is fresh after network issues
      refetchOnReconnect: true,

      // Don't refetch on mount if data is fresh
      // Reduces unnecessary network requests
      refetchOnMount: true,
    },
    mutations: {
      // Don't retry on 4xx errors (client errors)
      // Only retry on 5xx errors (server errors) or network errors
      retry: (failureCount, error: any) => {
        // Don't retry if it's a client error (4xx)
        if (error?.response?.status >= 400 && error?.response?.status < 500) {
          return false;
        }
        // Retry once for server errors (5xx) or network errors
        return failureCount < 1;
      },
    },
  },
});
