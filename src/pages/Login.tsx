/**
 * Login Page
 * 
 * Minimalist login page matching the mockup design.
 * Allows users to sign in with email/username and password.
 */

import React, { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { LoginRequest } from '../types/api';

/**
 * Login Page Component
 * 
 * @example
 * ```tsx
 * <Route path="/login" element={<Login />} />
 * ```
 */
const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, isLoggingIn, loginError } = useAuth();
  
  const [formData, setFormData] = useState<LoginRequest>({
    emailOrUsername: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Partial<LoginRequest>>({});

  /**
   * Validate form data
   */
  const validateForm = (): boolean => {
    const errors: Partial<LoginRequest> = {};

    if (!formData.emailOrUsername.trim()) {
      errors.emailOrUsername = 'Email or username is required';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      await login(formData);
      // Navigate to home/dashboard after successful login
      navigate('/lists', { replace: true });
    } catch (error) {
      // Error is handled by AuthContext and available via loginError
      console.error('Login failed:', error);
    }
  };

  /**
   * Handle input change
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear validation error for this field
    if (validationErrors[name as keyof LoginRequest]) {
      setValidationErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  /**
   * Get error message for display
   */
  const getErrorMessage = (): string | null => {
    if (loginError) {
      // Try to extract user-friendly error message
      const errorMessage = (loginError as any)?.response?.data?.title || 
                          (loginError as any)?.response?.data?.detail ||
                          loginError.message ||
                          'Login failed. Please check your credentials and try again.';
      return errorMessage;
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4 w-full max-w-full overflow-x-hidden">
      <div className="w-full max-w-md">
        {/* Login Modal */}
        <div className="bg-white rounded-2xl shadow-xl p-8 relative">


          {/* Sign in Title */}
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Sign in
          </h1>

          {/* Error Message */}
          {getErrorMessage() && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{getErrorMessage()}</p>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email or Username Input */}
            <div>
              <label
                htmlFor="emailOrUsername"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email or username
              </label>
              <input
                type="text"
                id="emailOrUsername"
                name="emailOrUsername"
                value={formData.emailOrUsername}
                onChange={handleChange}
                disabled={isLoggingIn}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 transition-colors ${
                  validationErrors.emailOrUsername
                    ? 'border-red-500'
                    : 'border-gray-300'
                } ${
                  isLoggingIn
                    ? 'bg-gray-100 cursor-not-allowed opacity-60'
                    : ''
                }`}
                placeholder="Enter your email or username"
                aria-invalid={!!validationErrors.emailOrUsername}
                aria-describedby={validationErrors.emailOrUsername ? 'email-error' : undefined}
              />
              {validationErrors.emailOrUsername && (
                <p
                  id="email-error"
                  className="mt-1 text-sm text-red-600"
                  role="alert"
                >
                  {validationErrors.emailOrUsername}
                </p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={isLoggingIn}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 transition-colors pr-12 ${
                    validationErrors.password
                      ? 'border-red-500'
                      : 'border-gray-300'
                  } ${
                    isLoggingIn
                      ? 'bg-gray-100 cursor-not-allowed opacity-60'
                      : ''
                  }`}
                  placeholder="Enter your password"
                  aria-invalid={!!validationErrors.password}
                  aria-describedby={validationErrors.password ? 'password-error' : undefined}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 text-sm font-medium"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              {validationErrors.password && (
                <p
                  id="password-error"
                  className="mt-1 text-sm text-red-600"
                  role="alert"
                >
                  {validationErrors.password}
                </p>
              )}
            </div>

            {/* Remember Me and Need Help */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={isLoggingIn}
                  className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-900 disabled:opacity-60 disabled:cursor-not-allowed"
                />
                <span className="ml-2 text-sm text-gray-700">Remember me</span>
              </label>
            </div>

            {/* Sign in Button */}
            <button
              type="submit"
              disabled={isLoggingIn}
              className={`w-full py-3 px-4 rounded-full font-medium text-gray-900 transition-colors ${
                isLoggingIn
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {isLoggingIn ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-900"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                'Sign in'
              )}
            </button>
          </form>

          {/* Sign up Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="text-gray-900 font-medium hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
