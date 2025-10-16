import * as types from '../types/index';

const initialState = {
  products: [],
  isLoading: false,
  productDetail: null,
  error: null,
  message: null,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_PRODUCTS_REQUEST:
    case types.GET_PRODUCTS_ALL_REQUEST:
    case types.CREATE_PRODUCT_REQUEST:
    case types.UPDATE_PRODUCT_REQUEST:
    case types.DELETE_PRODUCT_REQUEST:
    case types.SEARCH_PRODUCT_REQUEST:
      return { ...state, isLoading: true, error: null, message: null };

    case types.GET_PRODUCTS_SUCCESS:
    case types.GET_PRODUCTS_ALL_SUCCESS:
    case types.SEARCH_PRODUCT_SUCCESS:
      return { ...state, products: action.payload, isLoading: false };

    case types.CREATE_PRODUCT_SUCCESS:
      return { ...state, isLoading: false, message: 'Thêm sản phẩm thành công' };
    case types.UPDATE_PRODUCT_SUCCESS:
      return { ...state, isLoading: false, message: 'Cập nhật sản phẩm thành công' };
    case types.DELETE_PRODUCT_SUCCESS:
      return { ...state, isLoading: false, message: 'Xóa sản phẩm thành công' };

    case types.GET_PRODUCTS_FAILURE:
    case types.GET_PRODUCTS_ALL_FAILURE:
    case types.CREATE_PRODUCT_FAILURE:
    case types.UPDATE_PRODUCT_FAILURE:
    case types.DELETE_PRODUCT_FAILURE:
    case types.SEARCH_PRODUCT_FAILURE:
      return { ...state, isLoading: false, error: action.payload };

    case types.GET_PRODUCT_DETAIL_REQUEST:
      return { ...state, isLoading: true, error: null };

    case types.GET_PRODUCT_DETAIL_SUCCESS:
      return { ...state, isLoading: false, productDetail: action.payload };

    case types.GET_PRODUCT_DETAIL_FAILURE:
      return { ...state, isLoading: false, error: action.payload };

    default:
      return state;
  }
};

export default productReducer;
