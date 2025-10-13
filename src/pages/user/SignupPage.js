import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setApiShowMessage } from '../../services/api';
import { register, setGlobalShowMessage } from '../../stores/redux/actions/userActions';
import useNotification, { NotificationStyles } from '../../utils/notification';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
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
    if (!username || !email || !password) {
      showMessage('Vui lòng nhập đầy đủ thông tin', 'error');
      return;
    }
    setIsLoading(true);
    try {
      await dispatch(register({ username, email, password, full_name: fullName, role: 'user' }));
      navigate('/login');
    } catch (error) {
      // Thông báo đã được xử lý trong action
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-5 font-sans">
      <NotificationStyles />
      {message && (
        <div className={`fixed top-5 right-5 px-6 py-4 rounded-xl shadow-2xl z-50 font-medium text-white slide-in ${messageType === 'error' ? 'bg-red-500' : 'bg-green-500'}`}>
          {message}
        </div>
      )}
      <div className="bg-white rounded-3xl shadow-2xl p-12 w-full max-w-md fade-in">
        <div className="text-center mb-10">
          <div className="w-24 h-24 mx-auto mb-5 bg-white rounded-2xl flex items-center justify-center shadow-lg p-3">
            <img
              src="https://dvntechnology.com/icons/Logo.png"
              alt="DVN Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent mb-2">
            DVN Technology
          </h1>
          <p className="text-gray-500 text-sm">Đăng ký để bắt đầu</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <label className="block mb-2 text-gray-700 text-sm font-semibold">Tên đăng nhập</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-xl text-gray-400">👤</span>
                <input
                  type="text"
                  placeholder="Nhập tên đăng nhập"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full py-3.5 pl-12 pr-4 text-sm border-2 border-gray-200 rounded-xl transition-all input-focus bg-white text-gray-800 disabled:bg-gray-50"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>
            <div>
              <label className="block mb-2 text-gray-700 text-sm font-semibold">Email</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-xl text-gray-400">📧</span>
                <input
                  type="email"
                  placeholder="Nhập email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full py-3.5 pl-12 pr-4 text-sm border-2 border-gray-200 rounded-xl transition-all input-focus bg-white text-gray-800 disabled:bg-gray-50"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>
            <div>
              <label className="block mb-2 text-gray-700 text-sm font-semibold">Mật khẩu</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-xl text-gray-400">🔒</span>
                <input
                  type="password"
                  placeholder="Nhập mật khẩu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full py-3.5 pl-12 pr-4 text-sm border-2 border-gray-200 rounded-xl transition-all input-focus bg-white text-gray-800 disabled:bg-gray-50"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>
            <div>
              <label className="block mb-2 text-gray-700 text-sm font-semibold">Họ và tên</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-xl text-gray-400">📝</span>
                <input
                  type="text"
                  placeholder="Nhập họ và tên"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full py-3.5 pl-12 pr-4 text-sm border-2 border-gray-200 rounded-xl transition-all input-focus bg-white text-gray-800 disabled:bg-gray-50"
                  disabled={isLoading}
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 text-base font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-600 border-none rounded-xl cursor-pointer transition-all shadow-lg btn-hover disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full" style={{ animation: 'spin 0.8s linear infinite' }} />
                  Đang đăng ký...
                </>
              ) : (
                'Đăng Ký'
              )}
            </button>
          </div>
        </form>
        <div className="mt-8 pt-6 border-t border-gray-200 text-center text-gray-500 text-xs">
          Bảo mật bởi WebSocket Authentication
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
