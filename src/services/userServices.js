import { decryptToken } from '../utils/cryptoUtils';
import api from './api';

const getAuthHeader = () => {
  const encryptedToken = localStorage.getItem('access_token');
  const token = encryptedToken ? decryptToken(encryptedToken) : null;
  return {
    Authorization: `Bearer ${token}`,
  };
};

const userService = {
  getListUsers: async () => {
    const response = await api.get('/users', { headers: getAuthHeader() });
    return response.data;
  },

  createUser: async userData => {
    const response = await api.post('/users', userData, { headers: getAuthHeader() });
    return response.data;
  },

  updateUser: async (userId, userData) => {
    const response = await api.put(`/users/${userId}`, userData, { headers: getAuthHeader() });
    return response.data;
  },

  deleteUser: async userId => {
    const response = await api.delete(`/users/${userId}`, { headers: getAuthHeader() });
    return response.data;
  },

  updateProfile: async userData => {
    const response = await api.put('/users/me', userData, { headers: getAuthHeader() });
    return response.data;
  },

  changePassword: async passwordData => {
    const response = await api.post('/auth/change-password', passwordData, {
      headers: getAuthHeader(),
    });
    return response.data;
  },

  deleteAccount: async userId => {
    const response = await api.delete(`/users/${userId}`, { headers: getAuthHeader() });
    return response.data;
  },
};

export default userService;
