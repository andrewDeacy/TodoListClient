/**
 * Authentication Context
 * 
 * Provides authentication state and functions throughout the application.
 * Manages user state, login, register, and logout operations.
 * Persists authentication state across page refreshes.
 */

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import authService from '../services/authService';
import type { LoginRequest, RegisterRequest, AuthResponse } from '../types/api';

/**
 * User information extracted from AuthResponse
 */
interface User {
  userId: string;
  email: string;
  username: string;
}

/**
 * Authentication context value
 */
interface AuthContextType {
  // User state
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // Auth operations
  login: (loginData: LoginRequest) => Promise<AuthResponse>;
  register: (registerData: RegisterRequest) => Promise<AuthResponse>;
  logout: () => void;

  // Mutation states
  isLoggingIn: boolean;
  isRegistering: boolean;
  loginError: Error | null;
  registerError: Error | null;
}

/**
 * Create the authentication context
 */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Storage key for user data in localStorage
 */
const USER_STORAGE_KEY = 'todolist_user';

/**
 * Authentication Provider Component
 * 
 * Wraps the application and provides authentication context to all children.
 * Manages user state, login, register, and logout operations.
 * 
 * @example
 * ```tsx
 * function App() {
 *   return (
 *     <AuthProvider>
 *       <YourApp />
 *     </AuthProvider>
 *   );
 * }
 * ```
 */
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const queryClient = useQueryClient();

  /**
   * Load user from localStorage on mount
   */
  useEffect(() => {
    const loadUserFromStorage = () => {
      try {
        const storedUser = localStorage.getItem(USER_STORAGE_KEY);
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser) as User;
          // Verify token still exists
          if (authService.isAuthenticated()) {
            setUser(parsedUser);
          } else {
            // Token was cleared, remove user data
            localStorage.removeItem(USER_STORAGE_KEY);
          }
        }
      } catch (error) {
        console.error('Error loading user from storage:', error);
        localStorage.removeItem(USER_STORAGE_KEY);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserFromStorage();
  }, []);

  /**
   * Save user to localStorage
   */
  const saveUserToStorage = useCallback((userData: User) => {
    try {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
    } catch (error) {
      console.error('Error saving user to storage:', error);
    }
  }, []);

  /**
   * Clear user from localStorage
   */
  const clearUserFromStorage = useCallback(() => {
    try {
      localStorage.removeItem(USER_STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing user from storage:', error);
    }
  }, []);

  /**
   * Update user state from AuthResponse
   */
  const updateUserFromAuthResponse = useCallback((authResponse: AuthResponse) => {
    const userData: User = {
      userId: authResponse.userId,
      email: authResponse.email,
      username: authResponse.username,
    };
    setUser(userData);
    saveUserToStorage(userData);
  }, [saveUserToStorage]);

  /**
   * Login mutation
   */
  const loginMutation = useMutation({
    mutationFn: (loginData: LoginRequest) => authService.login(loginData),
    onSuccess: (data: AuthResponse) => {
      updateUserFromAuthResponse(data);
      // Invalidate all queries to refetch with new auth state
      queryClient.invalidateQueries();
    },
    onError: (error: Error) => {
      console.error('Login error:', error);
    },
  });

  /**
   * Register mutation
   */
  const registerMutation = useMutation({
    mutationFn: (registerData: RegisterRequest) => authService.register(registerData),
    onSuccess: (data: AuthResponse) => {
      updateUserFromAuthResponse(data);
      // Invalidate all queries to refetch with new auth state
      queryClient.invalidateQueries();
    },
    onError: (error: Error) => {
      console.error('Register error:', error);
    },
  });

  /**
   * Login function
   */
  const login = useCallback(async (loginData: LoginRequest): Promise<AuthResponse> => {
    return loginMutation.mutateAsync(loginData);
  }, [loginMutation]);

  /**
   * Register function
   */
  const register = useCallback(async (registerData: RegisterRequest): Promise<AuthResponse> => {
    return registerMutation.mutateAsync(registerData);
  }, [registerMutation]);

  /**
   * Logout function
   */
  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
    clearUserFromStorage();
    // Clear all queries from cache
    queryClient.clear();
  }, [clearUserFromStorage, queryClient]);

  const value: AuthContextType = {
    user,
    isAuthenticated: user !== null && authService.isAuthenticated(),
    isLoading,
    login,
    register,
    logout,
    isLoggingIn: loginMutation.isPending,
    isRegistering: registerMutation.isPending,
    loginError: loginMutation.error as Error | null,
    registerError: registerMutation.error as Error | null,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Hook to use the authentication context
 * 
 * @returns AuthContextType - Authentication context value
 * @throws Error if used outside AuthProvider
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { user, login, logout, isAuthenticated } = useAuth();
 *   
 *   if (!isAuthenticated) {
 *     return <LoginForm onLogin={login} />;
 *   }
 *   
 *   return (
 *     <div>
 *       <p>Welcome, {user?.username}!</p>
 *       <button onClick={logout}>Logout</button>
 *     </div>
 *   );
 * }
 * ```
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
