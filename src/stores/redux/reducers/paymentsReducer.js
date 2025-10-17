import * as types from '../types/index';

const initialState = {
  isLoading: false,
  order: null,
  payments: [],
  error: null,
  message: null,
};

const paymentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CREATE_PAYMENT_REQUEST:
    case types.GET_PAYMENTS_REQUEST:
    case types.CREATE_ALL_PAYMENTS_REQUEST:
    case types.CANCEL_ORDER_REQUEST:
      return { ...state, isLoading: true, error: null, message: null };

    case types.CREATE_PAYMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        order: action.payload,
        message: 'Thanh toán khởi tạo thành công, chuyển sang MoMo',
      };

    case types.CREATE_ALL_PAYMENTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        order: action.payload,
        message: 'Thanh toán tất cả giỏ hàng thành công, chuyển sang MoMo',
      };

    case types.GET_PAYMENTS_SUCCESS:
      return { ...state, isLoading: false, payments: action.payload };

    case types.CANCEL_ORDER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        message: action.payload.message,
        order: action.payload.order,
      };

    case types.CREATE_PAYMENT_FAILURE:
    case types.GET_PAYMENTS_FAILURE:
    case types.CREATE_ALL_PAYMENTS_FAILURE:
    case types.CANCEL_ORDER_FAILURE:
      return { ...state, isLoading: false, error: action.payload };

    default:
      return state;
  }
};

export default paymentsReducer;
