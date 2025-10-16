import axios from 'axios';
import { MESSAGES } from '../constants/notifications/messages';
import { setGlobalShowMessage } from '../stores/redux/actions/userActions';
import { decryptToken } from '../utils/cryptoUtils';

// Biến cục bộ để lưu trữ hàm showMessage
let showMessageHandler = null;

export const setApiShowMessage = (showMessage) => {
  showMessageHandler = showMessage;
  setGlobalShowMessage(showMessage);
};

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
});

api.interceptors.request.use((config) => {
  const encryptedToken = localStorage.getItem('access_token');
  const token = decryptToken(encryptedToken);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Kiểm tra lỗi kết nối hoặc timeout (backend không khả dụng)
    if (!error.response) {
      showMessageHandler?.(MESSAGES.SERVER_UNAVAILABLE, 'error');
      // Dừng ứng dụng bằng cách ném lỗi hoặc redirect
      throw new Error('Backend không khả dụng. Ứng dụng sẽ dừng.');
    }

    if (error.response && error.response.status === 401) {
      if (error.response.data.detail === 'Đăng nhập tại nơi khác (session đã bị thay)') {
        showMessageHandler?.(MESSAGES.OTHER_LOGIN, 'error');
        // Không gọi store.dispatch trực tiếp, để authActions xử lý
      } else if (error.response.data.detail === 'Session hết hạn') {
        showMessageHandler?.(MESSAGES.SESSION_EXPIRED, 'error');
        // Không gọi store.dispatch trực tiếp
      }
    }
    return Promise.reject(error);
  }
);

export default api;
