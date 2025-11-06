import CryptoJS from 'crypto-js';

const SECRET_KEY = process.env.REACT_APP_ENCRYPT_KEY;

// 🟢 Mã hóa token
export const encryptToken = (token) => {
  if (!token) return null;
  return CryptoJS.AES.encrypt(token, SECRET_KEY).toString();
};

// 🟢 Giải mã token
export const decryptToken = (encryptedToken) => {
  if (!encryptedToken) return null;
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedToken, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    // console.error('Lỗi giải mã token:', error);
    return null;
  }
};
