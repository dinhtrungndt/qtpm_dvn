import { decryptToken } from '../utils/cryptoUtils';
import api from './api';

const getAuthConfig = () => {
  const encryptedToken = localStorage.getItem('access_token');
  const token = encryptedToken ? decryptToken(encryptedToken) : null;
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  };
};

const productService = {
  getList: async () => {
    const res = await api.get('/products/', getAuthConfig());
    return res.data;
  },

  getListAll: async () => {
    const res = await api.get('/products/all');
    return res.data;
  },

  getDetail: async (id) => {
    const res = await api.get(`/products/${id}`);
    return res.data;
  },

  search: async (query) => {
    const res = await api.get(`/products/search?q=${query}`, getAuthConfig());
    return res.data;
  },

  // ✅ Sửa lại: gửi FormData để upload file và các field khác
  create: async (productData) => {
    const formData = new FormData();
    for (const key in productData) {
      if (key === 'file' && productData.file) {
        formData.append('file', productData.file);
      } else if (productData[key] !== undefined) {
        formData.append(key, productData[key]);
      }
    }
    const res = await api.post('/products/', formData, getAuthConfig());
    return res.data;
  },

  // ✅ Sửa lại tương tự cho update
  update: async (id, productData) => {
    const formData = new FormData();
    for (const key in productData) {
      if (key === 'file' && productData.file) {
        formData.append('file', productData.file);
      } else if (productData[key] !== undefined) {
        formData.append(key, productData[key]);
      }
    }
    const res = await api.put(`/products/${id}`, formData, getAuthConfig());
    return res.data;
  },

  remove: async (id) => {
    const res = await api.delete(`/products/${id}`, getAuthConfig());
    return res.data;
  },
};

export default productService;
