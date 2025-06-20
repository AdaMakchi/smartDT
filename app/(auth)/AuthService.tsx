import axios from 'axios';

const API_BASE_URL = 'https://smartdt.azurewebsites.net';

export const login = async (credentials: { login: string; password: string }) => {
  const response = await axios.post(`${API_BASE_URL}/accounts/Login`, credentials);
  return {
    user: response.data.user,
    token: response.data.token
  };
};

export const register = async (userData: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) => {
  // First create User
  const userResponse = await axios.post(`${API_BASE_URL}/Users`, {
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email
  });

  // Then create Account
  const accountResponse = await axios.post(`${API_BASE_URL}/Accounts`, {
    login: userData.email,
    password: userData.password,
    userId: userResponse.data.id
  });

  return {
    user: { ...accountResponse.data, ...userResponse.data },
    token: accountResponse.data.token
  };
};

export const logout = async () => {
  await axios.post(`${API_BASE_URL}/accounts/Logout`);
};

export const validateToken = async (token: string) => {
  try {
    await axios.get(`${API_BASE_URL}/accounts/validate`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return true;
  } catch {
    return false;
  }
};

export const getUser = async (userId: number) => {
  const response = await axios.get(`${API_BASE_URL}/Users/${userId}`);
  return response.data;
};