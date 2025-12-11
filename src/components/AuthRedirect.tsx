/**
 * Auth Redirect Component
 * 
 * Wraps authentication pages (login/register) and redirects authenticated users away.
 * Prevents authenticated users from seeing login/register pages.
 */

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface AuthRedirectProps {
  children: React.ReactNode;
}

/**
 * Auth Redirect Component
 * 
 * If user is authenticated, redirects to /lists.
 * If not authenticated, renders children (login/register pages).
 * 
 * @param children - Authentication page components to render if not authenticated
 */
const AuthRedirect: React.FC<AuthRedirectProps> = ({ children }) => {
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

  // Redirect authenticated users to /lists
  if (isAuthenticated) {
    return <Navigate to="/lists" replace />;
  }

  // Render auth pages for unauthenticated users
  return <>{children}</>;
};

export default AuthRedirect;
