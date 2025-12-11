/**
 * Todo Lists Page
 * 
 * Main application page showing user's todo lists.
 * This is a placeholder page for Phase 2 completion and QA testing.
 * Full implementation will be done in Phase 3.
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Todo Lists Page Component
 * 
 * Placeholder page for todo lists functionality.
 * Shows user info and logout button for QA testing.
 * 
 * @example
 * ```tsx
 * <Route path="/lists" element={<ProtectedRoute><TodoListsPage /></ProtectedRoute>} />
 * ```
 */
const TodoListsPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Todo Lists</h1>
            <div className="flex items-center gap-4">
              {user && (
                <div className="text-sm text-gray-600">
                  <span className="font-medium">{user.username}</span>
                  <span className="mx-2">•</span>
                  <span className="text-gray-500">{user.email}</span>
                </div>
              )}
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-full font-medium text-gray-900 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Welcome to Todo Lists!
            </h2>
            <p className="text-gray-600 mb-6">
              This is a placeholder page for Phase 2 completion.
            </p>
            <div className="bg-gray-50 rounded-lg p-6 max-w-md mx-auto">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                ✅ Phase 2 Complete!
              </h3>
              <ul className="text-left text-sm text-gray-600 space-y-2">
                <li>✅ Authentication service</li>
                <li>✅ Authentication context</li>
                <li>✅ Protected routes</li>
                <li>✅ Login/Register pages</li>
                <li>✅ Routing flow</li>
              </ul>
              <p className="mt-4 text-sm text-gray-500">
                Full todo list functionality will be implemented in Phase 3.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TodoListsPage;
