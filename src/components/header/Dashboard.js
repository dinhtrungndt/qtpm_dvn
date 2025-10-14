import { Bell, ChevronDown, Logs, MessageCircle, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../stores/redux/actions/userActions';
import DashboardMenu from '../layout/dashboard';
import OpenUser from '../layout/OpenUser';

const DashboardHeader = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [isOpenUserMenu, setIsOpenUserMenu] = useState(false);
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const [isOpenDashboardMenu, setIsOpenDashboardMenu] = useState(false);
  const userMenuRef = useRef(null);

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (!isOpenUserMenu) return;
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsOpenUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpenUserMenu]);

  return (
    <>
      <div className="flex items-center justify-between p-4 border-b bg-white relative z-30">
        {/* left */}
        <div className="flex items-center gap-4 text-gray-600">
          <button
            onClick={() => setIsOpenDashboardMenu(!isOpenDashboardMenu)}
            className="p-2 hover:bg-gray-300 rounded-lg transition-colors"
          >
            <Logs className="h-4 w-4" />
          </button>
          <div className="hidden md:flex items-center gap-4">
            <a href="/" className="text-sm hover:text-gray-900 transition-colors">Trang chủ</a>
            <a href="/contact" className="text-sm hover:text-gray-900 transition-colors">Liên hệ</a>
          </div>
        </div>

        {/* right */}
        <div className="flex items-center gap-4 text-gray-600">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" onClick={() => setIsOpenSearch(!isOpenSearch)}>
            <Search className="h-4 w-4" />
          </button>

          <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <span className="absolute top-1 right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full animate-pulse">3</span>
            <MessageCircle className="h-4 w-4" />
          </button>

          <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <span className="absolute top-1 right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full animate-pulse">5</span>
            <Bell className="h-4 w-4" />
          </button>

          {user ? (
            <div className="flex items-center gap-2 border border-gray-300 px-2 py-0 rounded-full hover:bg-gray-50 transition-all hover:border-gray-400 cursor-pointer"
              onClick={() => setIsOpenUserMenu(!isOpenUserMenu)}>
              <img
                src={user.avatar != null ? user.avatar : "https://dvntechnology.com/icons/Logo.png"}
                alt="Avatar"
                className="h-6 w-6 rounded-full object-cover"
              />
              <span className="text-sm text-gray-900">{user.username}</span>
              <ChevronDown className="w-4 h-4" />
            </div>
          ) : (
            <a href="/login" className="text-sm hover:text-gray-900 transition-colors">Đăng nhập</a>
          )}
        </div>

        {/* Open User Menu with Animation */}
        <div
          className={`absolute top-0 right-4 mt-2 transform transition-all duration-200 ease-out origin-top-right ${isOpenUserMenu
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
            }`}
        >
          <div ref={userMenuRef}>
            <OpenUser handleLogout={handleLogout} />
          </div>
        </div>

        {/* Search Box */}
        <div
          className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-11/12 max-w-md bg-white border border-gray-300 rounded-lg shadow-lg transition-all duration-200 ease-out origin-top ${isOpenSearch
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
            }`}
        >
          <div className="p-2">
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Tìm kiếm..."
              autoFocus
            />
          </div>
        </div>
      </div>

      {/* Dashboard Menu */}
      <DashboardMenu
        isOpen={isOpenDashboardMenu}
        onClose={() => setIsOpenDashboardMenu(false)}
      />
    </>
  );
};

export default DashboardHeader;
