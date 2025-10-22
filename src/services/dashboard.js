import { decryptToken } from '../utils/cryptoUtils';
import api from './api';

const getAuthConfig = () => {
  const encryptedToken = localStorage.getItem('access_token');
  const token = encryptedToken ? decryptToken(encryptedToken) : null;
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};


const dashboardService = {
  getStats: async () => {
    const response = await api.get('/dashboard/stats', getAuthConfig());
    return response.data;
  },
  getSales: async () => {
    const response = await api.get('/dashboard/charts/sales', getAuthConfig());
    return response.data;
  },
};

export default dashboardService;
