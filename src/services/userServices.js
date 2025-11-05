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
    const res = await api.get('/users', { headers: getAuthHeader() });
    return res.data;
  },

  // ✅ Sửa createUser để hỗ trợ upload file (avatar)
  createUser: async (userData) => {
    const formData = new FormData();
    for (const key in userData) {
      if (key === 'file' && userData.file) {
        formData.append('file', userData.file);
      } else if (userData[key] !== undefined) {
        formData.append(key, userData[key]);
      }
    }
    const res = await api.post('/users', formData, {
      headers: { ...getAuthHeader(), 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  },

  // ✅ updateUser tương tự
  updateUser: async (userId, userData) => {
    const formData = new FormData();
    for (const key in userData) {
      if (key === 'file' && userData.file) {
        formData.append('file', userData.file);
      } else if (userData[key] !== undefined) {
        formData.append(key, userData[key]);
      }
    }
    const res = await api.put(`/users/${userId}`, formData, {
      headers: { ...getAuthHeader(), 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  },

  // ✅ updateProfile gửi về /settings/profile (không phải /users/me)
  updateProfile: async (userData) => {
    const formData = new FormData();
    for (const key in userData) {
      if (key === 'file' && userData.file) {
        formData.append('file', userData.file, userData.file.name);
      } else if (userData[key] !== undefined) {
        formData.append(key, userData[key]);
      }
    }
    const res = await api.put('/settings/profile', formData, {
      headers: { ...getAuthHeader(), 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  },

  deleteUser: async (userId) => {
    const res = await api.delete(`/users/${userId}`, { headers: getAuthHeader() });
    return res.data;
  },

  getFavoriteProducts: async () => {
    const res = await api.get('users/me/favorites', { headers: getAuthHeader() });
    return res.data;
  },

  addToFavorites: async (productId) => {
    const res = await api.post(`users/me/favorites/${productId}`, {}, { headers: getAuthHeader() });
    return res.data;
  },

  removeFromFavorites: async (productId) => {
    const res = await api.delete(`users/me/favorites/${productId}`, { headers: getAuthHeader() });
    return res.data;
  },
};

export default userService;
