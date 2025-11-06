import { MESSAGES } from '../../../constants/notifications/messages';
import authService from '../../../services/authService';
import userService from '../../../services/userServices';
import { encryptToken } from '../../../utils/cryptoUtils';
import * as types from '../types/index';

// Lưu trữ hàm showMessage toàn cục
let globalShowMessage = null;
export const setGlobalShowMessage = showMessage => {
  globalShowMessage = showMessage;
};

// Lưu trữ store toàn cục (sẽ được gán từ index.js)
let store = null;
export const setStore = s => {
  store = s;
};

export const login = credentials => async dispatch => {
  dispatch({ type: types.LOGIN_REQUEST });
  try {
    const data = await authService.login(credentials);
    const encryptedToken = encryptToken(data.access_token);
    localStorage.setItem('access_token', encryptedToken);
    const user = await authService.getCurrentUser();
    dispatch({ type: types.LOGIN_SUCCESS, payload: { user, token: data.access_token } });
    connectWebSocket(user.id);
    globalShowMessage?.(MESSAGES.LOGIN_SUCCESS, 'success');
  } catch (error) {
    // console.error('Login error:', error.response ? error.response.data : error.message);
    dispatch({ type: types.LOGIN_FAILURE, payload: error });
    globalShowMessage?.(
      MESSAGES.LOGIN_FAILURE +
      ': ' +
      (error.response?.data?.detail || error.message || 'Lỗi không xác định'),
      'error'
    );
    throw error;
  }
};

export const register = userData => async dispatch => {
  dispatch({ type: types.REGISTER_REQUEST });
  try {
    const user = await authService.register(userData);
    dispatch({ type: types.REGISTER_SUCCESS, payload: user });
    globalShowMessage?.(MESSAGES.REGISTER_SUCCESS, 'success');
  } catch (error) {
    dispatch({ type: types.REGISTER_FAILURE, payload: error });
    globalShowMessage?.(
      MESSAGES.REGISTER_FAILURE + ': ' + (error.message || 'Lỗi không xác định'),
      'error'
    );
    throw error;
  }
};

export const logout = () => dispatch => {
  localStorage.removeItem('access_token');
  if (window.ws) {
    window.ws.close();
  }
  dispatch({ type: types.LOGOUT });
  globalShowMessage?.(MESSAGES.LOGOUT, 'success');
};

export const getCurrentUser = () => async dispatch => {
  try {
    const user = await authService.getCurrentUser();
    dispatch({ type: types.GET_CURRENT_USER, payload: user });
    connectWebSocket(user.id);
  } catch (error) {
    if (error.response && error.response.status === 401) {
      dispatch(logout());
      globalShowMessage?.(MESSAGES.SESSION_EXPIRED, 'error');
    } else {
      // console.error(
      'Get current user error:',
        error.response ? error.response.data : error.message
      );
dispatch({ type: types.GET_CURRENT_USER_FAILURE, payload: error });
globalShowMessage?.(
  'Lỗi xác thực: ' + (error.response?.data?.detail || error.message || 'Lỗi không xác định'),
  'error'
);
    }
  }
};

export const getListUsers = () => async dispatch => {
  dispatch({ type: types.GET_LIST_USERS_REQUEST });
  try {
    const users = await userService.getListUsers();
    dispatch({ type: types.GET_LIST_USERS_SUCCESS, payload: users });
  } catch (error) {
    // console.error('Get list users error:', error.response ? error.response.data : error.message);
    dispatch({ type: types.GET_LIST_USERS_FAILURE, payload: error });
  }
};

export const createUser = userData => async dispatch => {
  dispatch({ type: types.CREATE_USER_REQUEST });
  try {
    const newUser = await userService.createUser(userData);
    dispatch({ type: types.CREATE_USER_SUCCESS, payload: newUser });
    globalShowMessage?.('Tạo người dùng thành công!', 'success');
    dispatch(getListUsers()); // refresh list
  } catch (error) {
    // console.error('Create user error:', error.response ? error.response.data : error.message);
    dispatch({ type: types.CREATE_USER_FAILURE, payload: error });
    globalShowMessage?.(
      'Tạo người dùng thất bại: ' + (error.response?.data?.detail || error.message),
      'error'
    );
  }
};

export const updateUser = (userId, userData) => async dispatch => {
  dispatch({ type: types.UPDATE_USER_REQUEST });
  try {
    const updatedUser = await userService.updateUser(userId, userData);
    dispatch({ type: types.UPDATE_USER_SUCCESS, payload: updatedUser });
    globalShowMessage?.('Cập nhật người dùng thành công!', 'success');
    dispatch(getListUsers());
  } catch (error) {
    // console.error('Update user error:', error.response ? error.response.data : error.message);
    dispatch({ type: types.UPDATE_USER_FAILURE, payload: error });
    globalShowMessage?.(
      'Cập nhật thất bại: ' + (error.response?.data?.detail || error.message),
      'error'
    );
  }
};

export const deleteUser = userId => async dispatch => {
  dispatch({ type: types.DELETE_USER_REQUEST });
  try {
    await userService.deleteUser(userId);
    dispatch({ type: types.DELETE_USER_SUCCESS, payload: userId });
    globalShowMessage?.('Xoá người dùng thành công!', 'success');
    dispatch(getListUsers());
  } catch (error) {
    // console.error('Delete user error:', error.response ? error.response.data : error.message);
    dispatch({ type: types.DELETE_USER_FAILURE, payload: error });
    globalShowMessage?.(
      'Xoá người dùng thất bại: ' + (error.response?.data?.detail || error.message),
      'error'
    );
  }
};

export const getFavoriteProducts = () => async dispatch => {
  dispatch({ type: types.GET_FAVORITE_PRODUCTS_REQUEST });
  try {
    const favoriteProducts = await userService.getFavoriteProducts();
    dispatch({ type: types.GET_FAVORITE_PRODUCTS_SUCCESS, payload: favoriteProducts });
  } catch (error) {
    // console.error('Get favorite products error:', error.response ? error.response.data : error.message);
    dispatch({ type: types.GET_FAVORITE_PRODUCTS_FAILURE, payload: error });
  }
};

export const addToFavorites = productId => async dispatch => {
  dispatch({ type: types.ADD_TO_FAVORITES_REQUEST });
  try {
    const updatedUser = await userService.addToFavorites(productId);
    dispatch({
      type: types.ADD_TO_FAVORITES_SUCCESS,
      payload: updatedUser.favorite_products
    });
  } catch (error) {
    // console.error('Add to favorites error:', error.response ? error.response.data : error.message);
    dispatch({ type: types.ADD_TO_FAVORITES_FAILURE, payload: error });
  }
};

export const removeFromFavorites = productId => async dispatch => {
  dispatch({ type: types.REMOVE_FROM_FAVORITES_REQUEST });
  try {
    const updatedUser = await userService.removeFromFavorites(productId);
    dispatch({
      type: types.REMOVE_FROM_FAVORITES_SUCCESS,
      payload: updatedUser.favorite_products
    });
  } catch (error) {
    // console.error('Remove from favorites error:', error.response ? error.response.data : error.message);
    dispatch({ type: types.REMOVE_FROM_FAVORITES_FAILURE, payload: error });
  }
};

export const updateProfile = userData => async dispatch => {
  dispatch({ type: types.UPDATE_PROFILE_REQUEST });
  try {
    const updatedUser = await userService.updateProfile(userData);
    dispatch({ type: types.UPDATE_PROFILE_SUCCESS, payload: updatedUser });
    globalShowMessage?.('Cập nhật thông tin thành công!', 'success');
    dispatch(getCurrentUser()); // Refresh current user data
  } catch (error) {
    // console.error('Update profile error:', error.response ? error.response.data : error.message);
    dispatch({ type: types.UPDATE_PROFILE_FAILURE, payload: error });
    globalShowMessage?.(
      'Cập nhật thất bại: ' + (error.response?.data?.detail || error.message),
      'error'
    );
  }
};

export const changePassword = (passwordData) => async (dispatch) => {
  dispatch({ type: types.CHANGE_PASSWORD_REQUEST });
  try {
    await userService.changePassword({
      current_password: passwordData.currentPassword,
      new_password: passwordData.newPassword,
    });
    dispatch({ type: types.CHANGE_PASSWORD_SUCCESS });
    return true;
  } catch (error) {
    const msg = error.response?.data?.detail || 'Mật khẩu hiện tại không đúng';
    dispatch({
      type: types.CHANGE_PASSWORD_FAILURE,
      payload: { response: { data: { detail: msg } } }
    });
    throw error;
  }
};

export const deleteAccount = userId => async dispatch => {
  dispatch({ type: types.DELETE_ACCOUNT_REQUEST });
  try {
    await userService.deleteAccount(userId);
    dispatch({ type: types.DELETE_ACCOUNT_SUCCESS });
    dispatch(logout());
    globalShowMessage?.('Tài khoản đã bị xóa', 'success');
  } catch (error) {
    // console.error('Delete account error:', error.response ? error.response.data : error.message);
    dispatch({ type: types.DELETE_ACCOUNT_FAILURE, payload: error });
    globalShowMessage?.(
      'Xóa tài khoản thất bại: ' + (error.response?.data?.detail || error.message),
      'error'
    );
  }
};

let ws = null;
const connectWebSocket = userId => {
  // if (ws) ws.close();
  if (ws) return;
  const port = process.env.REACT_APP_API_WEB_SOCKET;
  const isHttps = window.location.protocol === 'https:';
  const wsProtocol = isHttps ? 'wss' : 'ws';
  ws = new WebSocket(`${wsProtocol}://${port}/auth/ws/${userId}`);
  window.ws = ws;
  ws.onopen = () =>
  // console.log('WebSocket đã kết nối');
  (ws.onmessage = event => {
    if (event.data === 'logout') {
      globalShowMessage?.(MESSAGES.OTHER_LOGIN, 'error');
      if (store) store.dispatch(logout());
    }
  });
  ws.onclose = () =>
    // console.log('WebSocket đã ngắt kết nối');
    (ws.onerror = error =>; // console.error('Lỗi WebSocket:', error));
};

export const getStore = () => store;
