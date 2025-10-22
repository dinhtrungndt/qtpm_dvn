import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Notification from '../../constants/notifications/notifi';
import useNotification from '../../hooks/useNotification';
import { register } from '../../stores/redux/actions/userActions';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { message, messageType, showMessage } = useNotification();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      showMessage('Vui lòng nhập đầy đủ thông tin', 'error');
      return;
    }

    if (username.length < 4) {
      showMessage('Tên đăng nhập phải có ít nhất 4 ký tự', 'error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showMessage('Email không hợp lệ', 'error');
      return;
    }

    if (password.length < 8) {
      showMessage('Mật khẩu phải có ít nhất 8 ký tự', 'error');
      return;
    }

    setIsLoading(true);

    try {
      await dispatch(register({ username, email, password, full_name: fullName, role: 'user' }));
      showMessage('Đăng ký thành công! Vui lòng đăng nhập.', 'success');
      setTimeout(() => navigate('/login'), 1500);
    } catch (error) {
      const backendMsg = error?.response?.data?.detail || 'Đăng ký thất bại, vui lòng thử lại.';
      showMessage(backendMsg, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans">
      <Notification message={message} messageType={messageType} />

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
              Tạo tài khoản
            </h1>
            <p className="text-gray-500 text-sm">Đăng ký để bắt đầu với DVN Technology</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-2 text-gray-700 text-sm font-medium">
                Tên đăng nhập
              </label>
              <input
                type="text"
                placeholder="Chọn tên đăng nhập"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent bg-white text-gray-900 placeholder-gray-400 disabled:bg-gray-50 disabled:text-gray-500"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block mb-2 text-gray-700 text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                placeholder="Tạo mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent bg-white text-gray-900 placeholder-gray-400 disabled:bg-gray-50 disabled:text-gray-500"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block mb-2 text-gray-700 text-sm font-medium">
                Họ và tên <span className="text-gray-400 font-normal">(không bắt buộc)</span>
              </label>
              <input
                type="text"
                placeholder="Nguyễn Văn A"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent bg-white text-gray-900 placeholder-gray-400 disabled:bg-gray-50 disabled:text-gray-500"
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 text-sm font-semibold text-white bg-gray-900 rounded-lg transition-all hover:bg-gray-800 active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-900 flex items-center justify-center gap-2 shadow-sm mt-6"
            >
              {isLoading ? (
                <>
                  <div
                    className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                    style={{ animation: 'spin 0.8s linear infinite' }}
                  />
                  Đang đăng ký...
                </>
              ) : (
                'Tạo tài khoản'
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              Đã có tài khoản?{' '}
              <Link
                to="/login"
                className="text-gray-900 font-semibold hover:underline transition-all"
              >
                Đăng nhập
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

export default SignupPage;
