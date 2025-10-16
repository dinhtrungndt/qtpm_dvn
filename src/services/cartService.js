import { decryptToken } from '../utils/cryptoUtils';
import api from './api';

const getAuthConfig = () => {
  const encryptedToken = localStorage.getItem('access_token');
  const token = encryptedToken ? decryptToken(encryptedToken) : null;
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};

const cartService = {
  getCart: async () => {
    const res = await api.get('/cart/', getAuthConfig());
    return res.data;
  },

  addToCart: async (productId, quantity) => {
    const cartData = {
      product_id: productId,
      quantity,
    };
    const res = await api.post('/cart/', cartData, getAuthConfig());
    return res.data;
  },

  updateItem: async (cartId, quantity) => {
    const cartData = {
      quantity,
    };
    const res = await api.put(`/cart/${cartId}`, cartData, getAuthConfig());
    return res.data;
  },

  removeItem: async (cartId) => {
    const res = await api.delete(`/cart/${cartId}`, getAuthConfig());
    return res.data;
  },

  clearCart: async () => {
    const res = await api.delete(`/cart/clear`, getAuthConfig());
    return res.data;
  },
};

export default cartService;
