import api from './api';

const authService = {
  login: async (credentials) => {
    const formData = new URLSearchParams();
    formData.append('username', credentials.username);
    formData.append('password', credentials.password);

    const response = await api.post('/auth/token', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return response.data;
  },

  register: async (userData) => {
    const response = await api.post('/users/register', userData);
    return response.data;
  },

  getCurrentUser: async () => {
    ////  console.log('Fetching current user from: /users/me');
    const response = await api.get('/users/me');
    return response.data;
  },
};

export default authService;
