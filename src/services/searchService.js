import { decryptToken } from '../utils/cryptoUtils';
import api from './api';

const getAuthHeader = () => {
  const encryptedToken = localStorage.getItem('access_token');
  if (!encryptedToken) return {};
  try {
    const token = decryptToken(encryptedToken);
    return token ? { Authorization: `Bearer ${token}` } : {};
  } catch (error) {
    // console.error('Invalid token, removing from localStorage:', error);
    localStorage.removeItem('access_token');
    return {};
  }
};

const searchService = {
  search: async (query, isAuthenticated) => {
    try {
      const endpoint = isAuthenticated ? '/search/all' : '/search/products';
      const response = await api.get(endpoint, {
        headers: getAuthHeader(),
        params: { q: query },
      });
      if (isAuthenticated) {
        return {
          users: response.data.users || null,
          products: response.data.products || [],
          orders: response.data.orders || [],
          carts: response.data.carts || [],
          payments: response.data.payments || [],
        };
      }
      return {
        users: null,
        products: response.data.products || [],
        orders: [],
        carts: [],
        payments: [],
      };
    } catch (error) {
      // console.error('Search error:', error);
      if (error.response?.status === 404) {
        // console.error(
        'Search endpoint not found. Please ensure the backend server is configured correctly.'
        );
throw new Error('Search endpoint not found. Please check backend configuration.');
      }
return {
  users: null,
  products: [],
  orders: [],
  carts: [],
  payments: [],
};
    }
  },
getSuggestions: async () => {
  try {
    const response = await api.get('/search/suggestions');
    return {
      users: null,
      products: response.data.products || [],
      orders: [],
      carts: [],
      payments: [],
    };
  } catch (error) {
    // console.error('Suggestions error:', error);
    return {
      users: null,
      products: [],
      orders: [],
      carts: [],
      payments: [],
    };
  }
},
};

export default searchService;
