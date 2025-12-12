/**
 * Protected Route Component
 * 
 * Wraps routes that require authentication.
 * Redirects to login page if user is not authenticated.
 * Renders children if user is authenticated.
 * 
 * @example
 * ```tsx
 * <Routes>
 *   <Route path="/login" element={<LoginPage />} />
 *   <Route
 *     path="/lists"
 *     element={
 *       <ProtectedRoute>
 *         <TodoListsPage />
 *       </ProtectedRoute>
 *     }
 *   />
 * </Routes>
 * ```
 */

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  /**
   * Optional redirect path. Defaults to '/login'
   */
  redirectTo?: string;
}

/**
 * Protected Route Component
 * 
 * Checks if user is authenticated. If not, redirects to login page.
 * If authenticated, renders the children components.
 * 
 * @param children - Components to render if authenticated
 * @param redirectTo - Path to redirect to if not authenticated (default: '/login')
 * 
 * @example
 * ```tsx
 * <ProtectedRoute>
 *   <TodoListsPage />
 * </ProtectedRoute>
 * ```
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  redirectTo = '/login',
}) => {
  const { isAuthenticated, isLoading } = useAuth();

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  // Render children if authenticated
  return <>{children}</>;
};

export default ProtectedRoute;
