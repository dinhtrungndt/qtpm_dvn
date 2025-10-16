import { decryptToken } from '../utils/cryptoUtils';
import api from './api';

const getAuthConfig = () => {
  const encryptedToken = localStorage.getItem('access_token');
  const token = encryptedToken ? decryptToken(encryptedToken) : null;
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};

const orderService = {
  getList: async () => {
    const res = await api.get('/orders', getAuthConfig());
    return res.data;
  },

  create: async (orderData) => {
    const res = await api.post('/orders', orderData, getAuthConfig());
    return res.data;
  },

  update: async (id, orderData) => {
    const res = await api.put(`/orders/${id}`, orderData, getAuthConfig());
    return res.data;
  },

  remove: async (id) => {
    const res = await api.delete(`/orders/${id}`, getAuthConfig());
    return res.data;
  },

  search: async (params) => {
    const res = await api.get('/orders/search', {
      ...getAuthConfig(),
      params,
    });
    return res.data;
  },
};

export default orderService;
