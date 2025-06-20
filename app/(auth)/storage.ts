import * as SecureStore from 'expo-secure-store';

const USER_KEY = 'auth_user';
const TOKEN_KEY = 'auth_token';

export const saveUser = async (userData: { user: any; token: string }) => {
  await SecureStore.setItemAsync(USER_KEY, JSON.stringify(userData.user));
  await SecureStore.setItemAsync(TOKEN_KEY, userData.token);
};

export const getUser = async () => {
  const userJson = await SecureStore.getItemAsync(USER_KEY);
  return userJson ? JSON.parse(userJson) : null;
};

export const getToken = async () => {
  return await SecureStore.getItemAsync(TOKEN_KEY);
};

export const removeUser = async () => {
  await SecureStore.deleteItemAsync(USER_KEY);
  await SecureStore.deleteItemAsync(TOKEN_KEY);
};