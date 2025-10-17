import { decryptToken } from '../utils/cryptoUtils';
import api from './api';

const getAuthConfig = () => {
  const encryptedToken = localStorage.getItem('access_token');
  const token = encryptedToken ? decryptToken(encryptedToken) : null;
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};

const paymentService = {
  buyAll: async () => {
    const res = await api.post(`/payments/buy-all-momo`, {}, getAuthConfig());
    return res.data;
  },

  buyNow: async (productId) => {
    const res = await api.post(`/payments/buy-now-momo/${productId}`, {}, getAuthConfig());
    return res.data; // { payUrl, order_id, payment_id }
  },

  getUserPayments: async () => {
    const res = await api.get('/payments', getAuthConfig());
    return res.data;
  },

  cancelOrder: async (orderId) => {
    const res = await api.post(`/payments/cancel-order/${orderId}`, {}, getAuthConfig());
    return res.data;
  },
};

export default paymentService;
