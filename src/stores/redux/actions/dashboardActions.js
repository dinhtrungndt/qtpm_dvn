import dashboardService from '../../../services/dashboard';
import * as types from '../types/index';

// 🟢 Lấy thống kê chung
export const getDashboardStats = () => async (dispatch, getState) => {
  dispatch({ type: types.FETCH_DASHBOARD_STATS_REQUEST });
  try {
    const token = getState().user?.userInfo?.access_token;
    const data = await dashboardService.getStats(token);
    dispatch({
      type: types.FETCH_DASHBOARD_STATS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: types.FETCH_DASHBOARD_STATS_FAILURE,
      payload: error.response?.data?.detail || error.message,
    });
  }
};

// 🟢 Lấy biểu đồ doanh thu
export const getDashboardSales = () => async (dispatch, getState) => {
  dispatch({ type: types.FETCH_DASHBOARD_SALES_REQUEST });
  try {
    const token = getState().user?.userInfo?.access_token;
    const data = await dashboardService.getSales(token);
    dispatch({
      type: types.FETCH_DASHBOARD_SALES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: types.FETCH_DASHBOARD_SALES_FAILURE,
      payload: error.response?.data?.detail || error.message,
    });
  }
};
