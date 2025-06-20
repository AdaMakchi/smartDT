// types.ts
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  accounts: any[]; // Replace 'any' with proper Account type if available
  adresses: any[]; // Note: Typo here - should be "addresses"? Fix if needed
}

export interface AuthUser extends User {
  token?: string; // For your stored user with token
}

export interface RegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateOfBirth: string;
}