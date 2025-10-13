import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setApiShowMessage } from '../../services/api';
import { logout, setGlobalShowMessage } from '../../stores/redux/actions/userActions';
import useNotification, { NotificationStyles } from '../../utils/notification';

const HomePage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { message, messageType, showMessage } = useNotification();

  useEffect(() => {
    setGlobalShowMessage(showMessage);
    setApiShowMessage(showMessage);
  }, [showMessage]);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-5 font-sans">
      <NotificationStyles />
      {message && (
        <div className={`fixed top-5 right-5 px-6 py-4 rounded-xl shadow-2xl z-50 font-medium text-white slide-in ${messageType === 'error' ? 'bg-red-500' : 'bg-green-500'}`}>
          {message}
        </div>
      )}
      <div className="bg-white rounded-3xl shadow-2xl p-12 w-full max-w-lg text-center fade-in">
        <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-5xl shadow-lg">
          👤
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Xin chào, {user?.username}! 👋</h2>
        <p className="text-gray-500 text-sm mb-8">📧 {user?.email}</p>
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="p-5 bg-blue-50 rounded-2xl border-2 border-blue-200">
            <div className="text-2xl mb-2">🔗</div>
            <div className="text-xs text-blue-700 font-semibold">Đã kết nối</div>
          </div>
          <div className="p-5 bg-green-50 rounded-2xl border-2 border-green-200">
            <div className="text-2xl mb-2">✅</div>
            <div className="text-xs text-green-700 font-semibold">Đang hoạt động</div>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full py-4 text-base font-semibold text-white bg-gradient-to-r from-red-500 to-red-600 border-none rounded-xl cursor-pointer transition-all shadow-lg btn-hover"
        >
          🚪 Đăng Xuất
        </button>
        <div className="mt-6 p-4 bg-gray-50 rounded-xl text-xs text-gray-600">
          <div className="font-semibold mb-1 text-green-600">✓ WebSocket Connected</div>
          Bạn sẽ tự động đăng xuất nếu đăng nhập từ thiết bị khác
        </div>
      </div>
    </div>
  );
};

export default HomePage;
