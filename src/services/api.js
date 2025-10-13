import axios from 'axios';
import { MESSAGES } from '../constants/notifications/messages';
import { logout, setGlobalShowMessage } from '../stores/redux/actions/userActions';
import store from '../stores/redux/store';

// Biến cục bộ để lưu trữ hàm showMessage
let showMessageHandler = null;

export const setApiShowMessage = (showMessage) => {
  showMessageHandler = showMessage;
  setGlobalShowMessage(showMessage);
};

const api = axios.create({
  baseURL: 'http://127.0.0.1:1111', // Cập nhật port
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      if (error.response.data.detail === 'Đăng nhập tại nơi khác (session đã bị thay)') {
        showMessageHandler?.(MESSAGES.OTHER_LOGIN, 'error');
        store.dispatch(logout());
      } else if (error.response.data.detail === 'Session hết hạn') {
        showMessageHandler?.(MESSAGES.SESSION_EXPIRED, 'error');
        store.dispatch(logout());
      }
    }
    return Promise.reject(error);
  }
);

export default api;
