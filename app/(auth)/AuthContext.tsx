// app/(auth)/AuthContext.tsx
import { createContext } from 'react';

// Define the interface first
export interface AuthContextType {
  user: {
    id: string;
    email: string;
    // Add other user properties you need
  } | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: { login: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  register: (userData: {
    email: string;
    password: string;
    // Add other registration fields
  }) => Promise<void>;
}

// Then create the context with the type
export const AuthContext = createContext<AuthContextType | undefined>(undefined);