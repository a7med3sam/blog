import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const register = async (user) => {
  const response = await axios.post(`${API_URL}/users`, user);
  return response.data;
};

export const login = async (email, password) => {
  try {
    const response = await axios.get(`${API_URL}/users?email=${email}`);
    const user = response.data[0];

    if (user && password === user.password) {
    
      const token = 'your_generated_jwt_token';
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('user', JSON.stringify(user));
      return user;
    } else {
      throw new Error('Invalid email or password');
    }
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const logout = () => {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('user');
};

export const isAuthenticated = () => {
  return !!sessionStorage.getItem('token');
};

export const getCurrentUser = () => {
  return JSON.parse(sessionStorage.getItem('user'));
};
