import { MESSAGES } from '../../../constants/notifications/messages';
import authService from '../../../services/authService';
import * as types from '../types/userTypes';

let globalShowMessage = null;
export const setGlobalShowMessage = (showMessage) => {
  globalShowMessage = showMessage;
};

export const login = (credentials) => async (dispatch) => {
  dispatch({ type: types.LOGIN_REQUEST });
  try {
    // console.log('Sending login request with:', credentials);
    const data = await authService.login(credentials);
    // console.log('Login response:', data);
    localStorage.setItem('access_token', data.access_token);
    const user = await authService.getCurrentUser();
    // console.log('Get current user response:', user);
    dispatch({ type: types.LOGIN_SUCCESS, payload: { user, token: data.access_token } });
    connectWebSocket(user.id);
    globalShowMessage?.(MESSAGES.LOGIN_SUCCESS, 'success');
  } catch (error) {
    console.error('Login error:', error.response ? error.response.data : error.message);
    dispatch({ type: types.LOGIN_FAILURE, payload: error });
    globalShowMessage?.(MESSAGES.LOGIN_FAILURE + ': ' + (error.response?.data?.detail || error.message || 'Lỗi không xác định'), 'error');
    throw error;
  }
};

export const register = (userData) => async (dispatch) => {
  dispatch({ type: types.REGISTER_REQUEST });
  try {
    const user = await authService.register(userData);
    dispatch({ type: types.REGISTER_SUCCESS, payload: user });
    globalShowMessage?.(MESSAGES.REGISTER_SUCCESS, 'success');
  } catch (error) {
    dispatch({ type: types.REGISTER_FAILURE, payload: error });
    globalShowMessage?.(MESSAGES.REGISTER_FAILURE + ': ' + (error.message || 'Lỗi không xác định'), 'error');
    throw error;
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('access_token');
  if (window.ws) {
    window.ws.close();
  }
  dispatch({ type: types.LOGOUT });
  globalShowMessage?.(MESSAGES.LOGOUT, 'success');
};

export const getCurrentUser = () => async (dispatch) => {
  try {
    const user = await authService.getCurrentUser();
    dispatch({ type: types.GET_CURRENT_USER, payload: user });
    connectWebSocket(user.id);
  } catch (error) {
    if (error.response && error.response.status === 401) {
      dispatch(logout());
      globalShowMessage?.(MESSAGES.SESSION_EXPIRED, 'error');
    } else {
      console.error('Get current user error:', error.response ? error.response.data : error.message);
      dispatch({ type: types.GET_CURRENT_USER_FAILURE, payload: error });
      globalShowMessage?.('Lỗi xác thực: ' + (error.response?.data?.detail || error.message || 'Lỗi không xác định'), 'error');
    }
  }
};

let ws = null;
const connectWebSocket = (userId) => {
  if (ws) ws.close();
  ws = new WebSocket(`ws://127.0.0.1:1111/auth/ws/${userId}`);
  window.ws = ws;
  ws.onopen = () => // console.log('WebSocket đã kết nối');
    ws.onmessage = (event) => {
      if (event.data === 'logout') {
        globalShowMessage?.(MESSAGES.OTHER_LOGIN, 'error');
        getStore().dispatch(logout());
      }
    };
  ws.onclose = () => // console.log('WebSocket đã ngắt kết nối');
    ws.onerror = (error) => console.error('Lỗi WebSocket:', error);
};

let store = null;
export const setStore = (s) => { store = s; };
export const getStore = () => store;
