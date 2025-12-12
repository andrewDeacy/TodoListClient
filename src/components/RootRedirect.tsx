/**
 * Root Redirect Component
 * 
 * Handles the root route (/) by redirecting users based on authentication status.
 * - Unauthenticated users → /login
 * - Authenticated users → /lists
 * Shows loading state during initial authentication check.
 */

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Root Redirect Component
 * 
 * Redirects to /login if not authenticated, /lists if authenticated.
 * Shows loading state during initial auth check.
 */
const RootRedirect: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect based on authentication status
  if (isAuthenticated) {
    return <Navigate to="/lists" replace />;
  }

  return <Navigate to="/login" replace />;
};

export default RootRedirect;
