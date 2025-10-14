import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setApiShowMessage } from '../../services/api';
import { login, setGlobalShowMessage } from '../../stores/redux/actions/userActions';
import useNotification, { NotificationStyles } from '../../utils/notification';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { message, messageType, showMessage } = useNotification();

  useEffect(() => {
    setGlobalShowMessage(showMessage);
    setApiShowMessage(showMessage);
  }, [showMessage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      showMessage('Vui lòng nhập đầy đủ thông tin', 'error');
      return;
    }
    setIsLoading(true);
    try {
      await dispatch(login({ username, password }));
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans">
      <NotificationStyles />
      {message && (
        <div className={`fixed top-5 right-5 px-5 py-3 rounded-lg shadow-lg z-50 text-sm font-medium text-white slide-in ${messageType === 'error' ? 'bg-red-500' : 'bg-green-500'}`}>
          {message}
        </div>
      )}

      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 fade-in">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-900 rounded-xl flex items-center justify-center">
              <img
                src="https://dvntechnology.com/icons/Logo.png"
                alt="DVN Logo"
                className="w-10 h-10 object-contain"
              />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              Đăng nhập
            </h1>
            <p className="text-gray-500 text-sm">Chào mừng trở lại với DVN Technology</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block mb-2 text-gray-700 text-sm font-medium">
                Tên đăng nhập
              </label>
              <input
                type="text"
                placeholder="Nhập tên đăng nhập của bạn"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent bg-white text-gray-900 placeholder-gray-400 disabled:bg-gray-50 disabled:text-gray-500"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block mb-2 text-gray-700 text-sm font-medium">
                Mật khẩu
              </label>
              <input
                type="password"
                placeholder="Nhập mật khẩu của bạn"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent bg-white text-gray-900 placeholder-gray-400 disabled:bg-gray-50 disabled:text-gray-500"
                required
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 text-sm font-semibold text-white bg-gray-900 rounded-lg transition-all hover:bg-gray-800 active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-900 flex items-center justify-center gap-2 shadow-sm"
            >
              {isLoading ? (
                <>
                  <div
                    className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                    style={{ animation: 'spin 0.8s linear infinite' }}
                  />
                  Đang đăng nhập...
                </>
              ) : (
                'Đăng nhập'
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              Chưa có tài khoản?{' '}
              <Link
                to="/signup"
                className="text-gray-900 font-semibold hover:underline transition-all"
              >
                Đăng ký ngay
              </Link>
            </p>
          </div>
        </div>

        {/* Copyright */}
        <p className="text-center text-gray-500 text-xs mt-6">
          © 2024 DVN Technology. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
