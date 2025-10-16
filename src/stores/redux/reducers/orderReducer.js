import * as types from '../types/index';

const initialState = {
  listOrders: [],
  isLoading: false,
  error: null,
  message: null,
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ORDERS_REQUEST:
    case types.CREATE_ORDER_REQUEST:
    case types.UPDATE_ORDER_REQUEST:
    case types.DELETE_ORDER_REQUEST:
      return { ...state, isLoading: true, error: null, message: null };

    case types.GET_ORDERS_SUCCESS:
      return { ...state, listOrders: action.payload, isLoading: false };

    case types.CREATE_ORDER_SUCCESS:
      return { ...state, isLoading: false, message: 'Tạo đơn hàng thành công' };
    case types.UPDATE_ORDER_SUCCESS:
      return { ...state, isLoading: false, message: 'Cập nhật đơn hàng thành công' };
    case types.DELETE_ORDER_SUCCESS:
      return { ...state, isLoading: false, message: 'Xóa đơn hàng thành công' };

    case types.GET_ORDERS_FAILURE:
    case types.CREATE_ORDER_FAILURE:
    case types.UPDATE_ORDER_FAILURE:
    case types.DELETE_ORDER_FAILURE:
      return { ...state, isLoading: false, error: action.payload };

    default:
      return state;
  }
};

export default orderReducer;
