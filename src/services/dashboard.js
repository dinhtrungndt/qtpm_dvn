import api from './api';

export const fetchDashboardStats = async (token) => {
  try {
    const response = await api.get('/dashboard/stats', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    throw error;
  }
};

export const fetchDashboardSales = async (token) => {
  try {
    const response = await api.get('/dashboard/charts/sales', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching dashboard sales:', error);
    throw error;
  }
};
