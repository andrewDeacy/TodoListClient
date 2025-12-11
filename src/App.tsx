/**
 * App Component
 * 
 * Main application component with React Router configuration.
 * Handles routing for authentication and protected routes.
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import RootRedirect from './components/RootRedirect';
import AuthRedirect from './components/AuthRedirect';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import TodoListsPage from './pages/TodoListsPage';

/**
 * App Component
 * 
 * Sets up React Router with all application routes:
 * - `/` - Root redirect (based on auth status)
 * - `/login` - Login page (redirects if authenticated)
 * - `/register` - Register page (redirects if authenticated)
 * - `/lists` - Todo lists page (protected route)
 * - `*` - 404 handler
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Root route - redirects based on auth status */}
        <Route path="/" element={<RootRedirect />} />

        {/* Authentication routes - redirect if already authenticated */}
        <Route
          path="/login"
          element={
            <AuthRedirect>
              <Login />
            </AuthRedirect>
          }
        />
        <Route
          path="/register"
          element={
            <AuthRedirect>
              <Register />
            </AuthRedirect>
          }
        />

        {/* Protected routes - require authentication */}
        <Route
          path="/lists"
          element={
            <ProtectedRoute>
              <TodoListsPage />
            </ProtectedRoute>
          }
        />

        {/* 404 handler - redirect to root */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
