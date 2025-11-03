import { decryptToken } from '../../../utils/cryptoUtils';
import * as types from '../types/index';

const encryptedToken = localStorage.getItem('access_token');
const decryptedToken = decryptToken(encryptedToken);

const initialState = {
  user: null,
  token: decryptedToken,
  isAuthenticated: !!decryptedToken,
  isLoading: false,
  error: null,
  listUsers: [],
  favoriteProducts: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_REQUEST:
    case types.REGISTER_REQUEST:
    case types.UPDATE_PROFILE_REQUEST:
    case types.CHANGE_PASSWORD_REQUEST:
    case types.DELETE_ACCOUNT_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case types.REGISTER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };
    case types.LOGIN_FAILURE:
    case types.REGISTER_FAILURE:
    case types.UPDATE_PROFILE_FAILURE:
    case types.CHANGE_PASSWORD_FAILURE:
    case types.DELETE_ACCOUNT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case types.GET_CURRENT_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case types.GET_CURRENT_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case types.GET_LIST_USERS_SUCCESS:
      return {
        ...state,
        listUsers: action.payload,
        isLoading: false,
        error: null,
      };
    case types.GET_LIST_USERS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case types.GET_LIST_USERS_REQUEST:
    case types.CREATE_USER_REQUEST:
    case types.UPDATE_USER_REQUEST:
    case types.DELETE_USER_REQUEST:
      return { ...state, isLoading: true, error: null, message: null };

    case types.CREATE_USER_SUCCESS:
      return { ...state, isLoading: false, message: 'Tạo user thành công' };
    case types.UPDATE_USER_SUCCESS:
      return { ...state, isLoading: false, message: 'Cập nhật user thành công' };
    case types.DELETE_USER_SUCCESS:
      return { ...state, isLoading: false, message: 'Xóa user thành công' };

    case types.CREATE_USER_FAILURE:
    case types.UPDATE_USER_FAILURE:
    case types.DELETE_USER_FAILURE:
      return { ...state, isLoading: false, error: action.payload };

    case types.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isLoading: false,
        error: null,
        message: 'Cập nhật thông tin thành công',
      };
    case types.CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        message: 'Đổi mật khẩu thành công',
      };
    case types.DELETE_ACCOUNT_SUCCESS:
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
        message: 'Tài khoản đã bị xóa',
      };
    case types.GET_FAVORITE_PRODUCTS_SUCCESS:
      return {
        ...state,
        favoriteProducts: action.payload,
        isLoading: false,
        error: null,
      };
    case types.ADD_TO_FAVORITES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        message: 'Thêm sản phẩm vào yêu thích thành công',
        favoriteProducts: action.payload
      };
    case types.REMOVE_FROM_FAVORITES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        message: 'Xóa sản phẩm khỏi yêu thích thành công',
        favoriteProducts: action.payload
      };

    case types.GET_FAVORITE_PRODUCTS_FAILURE:
    case types.ADD_TO_FAVORITES_FAILURE:
    case types.REMOVE_FROM_FAVORITES_FAILURE:
      return { ...state, isLoading: false, error: action.payload };

    case types.GET_FAVORITE_PRODUCTS_REQUEST:
    case types.ADD_TO_FAVORITES_REQUEST:
    case types.REMOVE_FROM_FAVORITES_REQUEST:
      return { ...state, isLoading: true, error: null, message: null };
    case types.LOGOUT:
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
        listUsers: [],
      };
    default:
      return state;
  }
};

export default userReducer;
