import axios from 'axios';
import { MESSAGES } from '../constants/notifications/messages';
import { setGlobalShowMessage } from '../stores/redux/actions/userActions';
import { decryptToken } from '../utils/cryptoUtils';

let showMessageHandler = null;

export const setApiShowMessage = showMessage => {
  showMessageHandler = showMessage;
  setGlobalShowMessage(showMessage);
};

// ✅ API chính
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'any-value', // bỏ cảnh báo ngrok
  },
  timeout: 15000,
});

// ✅ Bổ sung token + header ngrok cho mọi request
api.interceptors.request.use(config => {
  const encryptedToken = localStorage.getItem('access_token');
  const token = decryptToken(encryptedToken);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (!config.headers['ngrok-skip-browser-warning']) {
    config.headers['ngrok-skip-browser-warning'] = 'any-value';
  }

  return config;
});

api.interceptors.response.use(
  response => response,
  error => {
    if (!error.response) {
      showMessageHandler?.(MESSAGES.SERVER_UNAVAILABLE, 'error');
      return Promise.reject(error);
    }

    if (error.response.status === 401) {
      const detail = error.response.data?.detail;
      if (detail === 'Đăng nhập tại nơi khác (session đã bị thay)') {
        showMessageHandler?.(MESSAGES.OTHER_LOGIN, 'error');
      } else if (detail === 'Session hết hạn') {
        showMessageHandler?.(MESSAGES.SESSION_EXPIRED, 'error');
      }
    }

    if (error.response.status < 500) {
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

// ✅ API riêng cho upload ảnh (multipart/form-data)
export const apiUpload = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'ngrok-skip-browser-warning': 'any-value',
  },
  timeout: 20000,
});

apiUpload.interceptors.request.use(config => {
  const encryptedToken = localStorage.getItem('access_token');
  const token = decryptToken(encryptedToken);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (!config.headers['ngrok-skip-browser-warning']) {
    config.headers['ngrok-skip-browser-warning'] = 'any-value';
  }

  return config;
});

export default api;
