import paymentService from '../../../services/paymentService';
import * as types from '../types/index';

// Mua ngay
export const buyNow = (productId) => async (dispatch) => {
  dispatch({ type: types.CREATE_PAYMENT_REQUEST });
  try {
    const data = await paymentService.buyNow(productId);
    dispatch({ type: types.CREATE_PAYMENT_SUCCESS, payload: data });

    // Redirect sang MoMo nếu backend trả payUrl
    if (data.payUrl) {
      window.location.href = data.payUrl;
    }
  } catch (error) {
    dispatch({
      type: types.CREATE_PAYMENT_FAILURE,
      payload: error.response?.data?.detail || error.message,
    });
  }
};

export const buyAll = () => async (dispatch) => {
  dispatch({ type: types.CREATE_ALL_PAYMENTS_REQUEST });
  try {
    const data = await paymentService.buyAll();
    dispatch({ type: types.CREATE_ALL_PAYMENTS_SUCCESS, payload: data });
    if (data.payUrl) window.location.href = data.payUrl;
  } catch (error) {
    dispatch({
      type: types.CREATE_ALL_PAYMENTS_FAILURE,
      payload: error.response?.data?.detail || error.message,
    });
  }
};

// Lấy lịch sử thanh toán
export const fetchUserPayments = () => async (dispatch) => {
  dispatch({ type: types.GET_PAYMENTS_REQUEST });
  try {
    const data = await paymentService.getUserPayments();
    dispatch({ type: types.GET_PAYMENTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: types.GET_PAYMENTS_FAILURE,
      payload: error.response?.data?.detail || error.message,
    });
  }
};

export const cancelOrder = (orderId) => async (dispatch) => {
  dispatch({ type: types.CANCEL_ORDER_REQUEST });
  try {
    const data = await paymentService.cancelOrder(orderId);
    dispatch({ type: types.CANCEL_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: types.CANCEL_ORDER_FAILURE,
      payload: error.response?.data?.detail || error.message,
    });
  }
};
