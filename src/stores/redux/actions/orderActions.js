import orderService from '../../../services/orderService';
import * as types from '../types/index';

// GET ALL
export const getOrders = () => async (dispatch) => {
  dispatch({ type: types.GET_ORDERS_REQUEST });
  try {
    const data = await orderService.getList();
    dispatch({ type: types.GET_ORDERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: types.GET_ORDERS_FAILURE,
      payload: error.response?.data || error.message,
    });
  }
};

// CREATE
export const createOrder = (orderData) => async (dispatch) => {
  dispatch({ type: types.CREATE_ORDER_REQUEST });
  try {
    await orderService.create(orderData);
    dispatch({ type: types.CREATE_ORDER_SUCCESS });
    dispatch(getOrders());
  } catch (error) {
    dispatch({
      type: types.CREATE_ORDER_FAILURE,
      payload: error.response?.data || error.message,
    });
  }
};

// UPDATE
export const updateOrder = (id, orderData) => async (dispatch) => {
  dispatch({ type: types.UPDATE_ORDER_REQUEST });
  try {
    await orderService.update(id, orderData);
    dispatch({ type: types.UPDATE_ORDER_SUCCESS });
    dispatch(getOrders());
  } catch (error) {
    dispatch({
      type: types.UPDATE_ORDER_FAILURE,
      payload: error.response?.data || error.message,
    });
  }
};

// DELETE
export const deleteOrder = (id) => async (dispatch) => {
  dispatch({ type: types.DELETE_ORDER_REQUEST });
  try {
    await orderService.remove(id);
    dispatch({ type: types.DELETE_ORDER_SUCCESS });
    dispatch(getOrders());
  } catch (error) {
    dispatch({
      type: types.DELETE_ORDER_FAILURE,
      payload: error.response?.data || error.message,
    });
  }
};
