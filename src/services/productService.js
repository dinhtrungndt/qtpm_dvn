import { decryptToken } from '../utils/cryptoUtils';
import api from './api';

const getAuthConfig = () => {
  const encryptedToken = localStorage.getItem('access_token');
  const token = encryptedToken ? decryptToken(encryptedToken) : null;
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};

const productService = {
  getList: async () => {
    const res = await api.get('/products/', getAuthConfig());
    return res.data;
  },

  getById: async (id) => {
    const res = await api.get(`/products/${id}`, getAuthConfig());
    return res.data;
  },

  search: async (query) => {
    const res = await api.get(`/products/search?q=${query}`, getAuthConfig());
    return res.data;
  },

  create: async (productData) => {
    const res = await api.post('/products/', productData, getAuthConfig());
    return res.data;
  },

  update: async (id, productData) => {
    const res = await api.put(`/products/${id}`, productData, getAuthConfig());
    return res.data;
  },

  remove: async (id) => {
    const res = await api.delete(`/products/${id}`, getAuthConfig());
    return res.data;
  },
};

export default productService;
