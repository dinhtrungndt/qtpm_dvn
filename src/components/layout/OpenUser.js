import { FileText, Home, LayoutDashboard, LogOut, Settings, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const OpenUser = ({ userMenuRef, handleLogout }) => {
  return (
    <div
      ref={userMenuRef}
      className="bg-white rounded-lg shadow-lg border border-gray-200 w-56 overflow-hidden"
    >
      <div className="py-1">
        <Link
          to="/"
          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <Home className="w-4 h-4 text-gray-500" />
          <span>Trang chủ</span>
        </Link>

        <Link
          to="/dashboard/v1"
          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <LayoutDashboard className="w-4 h-4 text-gray-500" />
          <span>Dashboard</span>
        </Link>

        <Link
          to="/history/orders"
          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <FileText className="h-4 w-4" />
          <span>Đơn hàng</span>
        </Link>

        <Link
          to="/user"
          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <User className="w-4 h-4 text-gray-500" />
          <span>Hồ sơ</span>
        </Link>

        <Link
          to="/settings"
          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <Settings className="w-4 h-4 text-gray-500" />
          <span>Cài đặt</span>
        </Link>

        <div className="border-t border-gray-100 my-1"></div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Đăng xuất</span>
        </button>
      </div>
    </div>
  );
};

export default OpenUser;
