import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import * as authService from './AuthService';
import * as storage from './storage';
import { RegistrationData, User } from './types';





export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedUser = await storage.getUser();
        if (storedUser) {
          const isValid = await authService.validateToken(storedUser.token);
          if (isValid) {
            setUser(storedUser);
            setIsAuthenticated(true);
          } else {
            await logout();
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (credentials: { login: string; password: string }) => {
    setIsLoading(true);
    try {
      const { user, token } = await authService.login(credentials);
      await storage.saveUser({ ...user, token });
      setUser(user);
      setIsAuthenticated(true);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await authService.logout();
      await storage.removeUser();
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegistrationData) => {
    setIsLoading(true);
    try {
      const { user, token } = await authService.register(userData);
      await storage.saveUser({ ...user, token });
      setUser(user);
      setIsAuthenticated(true);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshUser = async () => {
    if (!user) return;
    try {
      const freshUser = await authService.getUser(user.id);
      setUser(freshUser);
      await storage.saveUser({ ...freshUser, token: storage.getToken() });
    } catch (error) {
      console.error('Failed to refresh user:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated,
        login,
        logout,
        register,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};