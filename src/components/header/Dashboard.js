import { Bell, ChevronDown, Dot, Logs, MessageCircle, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../stores/redux/actions/userActions';
import ChatNotification from '../layout/Chat/ChatNotification';
import NotificationPanel from '../layout/Notifications/NotificationPanel';
import OpenUser from '../layout/OpenUser';
import DashboardMenu from '../layout/Sidebar';

const DashboardHeader = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [isOpenUserMenu, setIsOpenUserMenu] = useState(false);
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const [isOpenDashboardMenu, setIsOpenDashboardMenu] = useState(false);
  const [isOpenChat, setIsOpenChat] = useState(false);
  const [isOpenNotification, setIsOpenNotification] = useState(false);
  const userMenuRef = useRef(null);
  const chatRef = useRef(null);
  const notificationRef = useRef(null);

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

  useEffect(() => {
    if (!isOpenChat) return;
    const handleClickOutside = (event) => {
      if (chatRef.current && !chatRef.current.contains(event.target)) {
        setIsOpenChat(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpenChat]);

  useEffect(() => {
    if (!isOpenNotification) return;
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsOpenNotification(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpenNotification]);

  return (
    <>
      <div className="flex items-center justify-between p-4 border-b bg-white relative z-30" style={{ minHeight: '64px' }}>
        {/* left */}
        <div className="flex items-center gap-4 text-gray-600">
          <button
            onClick={() => setIsOpenDashboardMenu(!isOpenDashboardMenu)}
            className="p-2 hover:bg-gray-300 rounded-lg transition-colors"
          >
            <Logs className="h-4 w-4" />
          </button>
          <div className="hidden md:flex items-center">
            <Link to="/" className="text-sm hover:text-gray-900 transition-colors mr-4">Trang chủ</Link>
            <Link to="/dashboard/v1" className="text-sm hover:text-gray-900 transition-colors mr-4">Dashboard</Link>
            <Link to="/contact" className="text-sm hover:text-gray-900 transition-colors mr-4">Liên hệ</Link>
            <Link to="/history/orders" className="text-sm hover:text-gray-900 transition-colors">Đơn hàng</Link>
            {/* admin */}
            {user?.role === 'admin' && (
              <>
                <span className="flex items-center text-black"><Dot /></span>
                <Link to="/manage/users" className="text-sm hover:text-gray-900 transition-colors mr-4">Quản lý Users</Link>
                <Link to="/manage/products" className="text-sm hover:text-gray-900 transition-colors">Quản lý Products</Link>
              </>
            )}
          </div>
        </div>

        {/* right */}
        <div className="flex items-center gap-2 text-gray-600">
          <div className="flex items-center gap-2">
            {isOpenSearch && (
              <input
                type="text"
                className="w-full max-w-xs border border-gray-300 rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 md:w-56"
                placeholder="Tìm kiếm..."
                autoFocus
              />
            )}
            <button
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setIsOpenSearch(!isOpenSearch)}
            >
              <Search className="h-4 w-4" />
            </button>
          </div>

          <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors" onClick={() => setIsOpenChat(!isOpenChat)}>
            <span className="absolute top-1 right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full animate-pulse">3</span>
            <MessageCircle className="h-4 w-4" />
          </button>

          <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors" onClick={() => setIsOpenNotification(!isOpenNotification)}>
            <span className="absolute top-1 right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full animate-pulse">15</span>
            <Bell className="h-4 w-4" />
          </button>

          {user ? (
            <div className="flex items-center gap-2 border border-gray-300 px-2 py-0 rounded-full hover:bg-gray-50 transition-all hover:border-gray-400 cursor-pointer"
              onClick={() => setIsOpenUserMenu(!isOpenUserMenu)}
            >
              <img
                src={user.avatar != null ? user.avatar : "https://dvntechnology.com/icons/Logo.png"}
                alt="Avatar"
                className="h-6 w-6 rounded-full object-cover"
              />
              <span className="text-sm text-gray-900 hidden md:inline">{user.username}</span>
              <ChevronDown className="w-4 h-4" />
            </div>
          ) : (
            <Link to="/login" className="text-sm hover:text-gray-900 transition-colors">Đăng nhập</Link>
          )}
        </div>

        {/* Open User Menu with Animation */}
        <div
          className={`absolute top-10 right-4 mt-2 transform transition-all duration-200 ease-out origin-top-right ${isOpenUserMenu
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
            }`}
        >
          <div ref={userMenuRef}>
            <OpenUser handleLogout={handleLogout} />
          </div>
        </div>

        {/* Chat Notification Panel */}
        <div
          className={`absolute top-10 right-4 mt-2 transform transition-all shadow-lg duration-200 ease-out origin-top-right ${isOpenChat
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
            } md:right-48`}
          ref={chatRef}
        >
          <ChatNotification />
        </div>

        {/* Notification Panel */}
        <div
          className={`absolute top-10 right-4 mt-2 transform transition-all shadow-lg duration-200 ease-out origin-top-right ${isOpenNotification
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
            } md:right-24`}
          ref={notificationRef}
        >
          <NotificationPanel />
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
