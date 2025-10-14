import { fetchDashboardSales, fetchDashboardStats } from '../../../services/dashboard';
import {
  FETCH_DASHBOARD_SALES_FAILURE, FETCH_DASHBOARD_SALES_REQUEST,
  FETCH_DASHBOARD_SALES_SUCCESS, FETCH_DASHBOARD_STATS_FAILURE, FETCH_DASHBOARD_STATS_REQUEST,
  FETCH_DASHBOARD_STATS_SUCCESS
} from '../types/index';

// 🟢 Lấy thống kê chung
export const getDashboardStats = () => async (dispatch, getState) => {
  dispatch({ type: FETCH_DASHBOARD_STATS_REQUEST });
  try {
    const token = getState().user?.userInfo?.access_token;
    const data = await fetchDashboardStats(token);
    dispatch({
      type: FETCH_DASHBOARD_STATS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_DASHBOARD_STATS_FAILURE,
      payload: error.response?.data?.detail || error.message,
    });
  }
};

// 🟢 Lấy biểu đồ doanh thu
export const getDashboardSales = () => async (dispatch, getState) => {
  dispatch({ type: FETCH_DASHBOARD_SALES_REQUEST });
  try {
    const token = getState().user?.userInfo?.access_token;
    const data = await fetchDashboardSales(token);
    dispatch({
      type: FETCH_DASHBOARD_SALES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_DASHBOARD_SALES_FAILURE,
      payload: error.response?.data?.detail || error.message,
    });
  }
};
