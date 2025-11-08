import { Bell, ChevronDown, Dot, Logs, MessageCircle, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import useClickOutside from '../../hooks/useClickOutside';
import { fetchSuggestions } from '../../stores/redux/actions/searchActions';
import { logout } from '../../stores/redux/actions/userActions';
import ChatNotification from '../layout/Chat/ChatNotification';
import NotificationPanel from '../layout/Notifications/NotificationPanel';
import OpenUser from '../layout/OpenUser';
import DashboardMenu from '../layout/Sidebar';
import SearchModal from '../search/SearchModal'; // Import SearchModal

const categorySearchs = ['Tất cả', 'Phần mềm', 'Website', 'Phần cứng', 'Phụ kiện'];

const DashboardHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { navbar } = useSelector((state) => state.theme);

  // Search states
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const [categorySearch, setCategorySearch] = useState('Tất cả');
  const [isOpenCategoryDropdown, setIsOpenCategoryDropdown] = useState(false);

  // Other states
  const [isOpenUserMenu, setIsOpenUserMenu] = useState(false);
  const [isOpenDashboardMenu, setIsOpenDashboardMenu] = useState(false);
  const [isOpenChat, setIsOpenChat] = useState(false);
  const [isOpenNotification, setIsOpenNotification] = useState(false);

  // Auto-open sidebar on desktop on initial load
  useEffect(() => {
    if (window.innerWidth >= 768) { // md breakpoint
      setIsOpenDashboardMenu(true);
    }
  }, []);

  // Refs
  const userMenuRef = useRef(null);
  const chatRef = useRef(null);
  const notificationRef = useRef(null);
  const categoryRef = useRef(null);

  // Click outside
  useClickOutside(userMenuRef, () => setIsOpenUserMenu(false), isOpenUserMenu);
  useClickOutside(chatRef, () => setIsOpenChat(false), isOpenChat);
  useClickOutside(notificationRef, () => setIsOpenNotification(false), isOpenNotification);
  useClickOutside(categoryRef, () => setIsOpenCategoryDropdown(false), isOpenCategoryDropdown);

  const handleLogout = () => {
    dispatch(logout());
    setIsOpenUserMenu(false);
  };

  const handleSelectCategory = (category) => {
    setCategorySearch(category);
    setIsOpenCategoryDropdown(false);
  };

  const openSearch = () => {
    setIsOpenSearch(true);
    dispatch(fetchSuggestions());
  };

  return (
    <>
      <div
        className={`flex items-center justify-between p-4 border-b ${navbar.color || 'bg-white'} relative z-30`}
        style={{ minHeight: '64px' }}
        data-bs-theme={navbar.theme?.toLowerCase() || 'light'}
      >
        {/* LEFT */}
        <div className="flex items-center gap-4 text-gray-600">
          <button
            onClick={() => setIsOpenDashboardMenu(!isOpenDashboardMenu)}
            className="p-2 hover:bg-gray-300 rounded-lg transition-colors"
          >
            <Logs className="h-4 w-4" />
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            <Link to="/" className="text-sm hover:text-gray-900 transition-colors mr-4">Trang chủ</Link>
            <Link to="/dashboard/v1" className="text-sm hover:text-gray-900 transition-colors mr-4">Dashboard</Link>
            <Link to="/contact" className="text-sm hover:text-gray-900 transition-colors mr-4">Liên hệ</Link>
            <Link to="/history/orders" className="text-sm hover:text-gray-900 transition-colors">Đơn hàng</Link>
            {user?.role === 'admin' && (
              <>
                <span className="flex items-center text-black"><Dot /></span>
                <Link to="/manage/users" className="text-sm hover:text-gray-900 transition-colors mr-4">Quản lý Users</Link>
                <Link to="/manage/products" className="text-sm hover:text-gray-900 transition-colors">Quản lý Products</Link>
              </>
            )}
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-2 text-gray-600">
          {/* SEARCH - Desktop */}
          <div className="hidden md:flex items-center border border-gray-300 rounded-full px-4 py-2 gap-2 hover:border-gray-400 transition-colors relative">
            <Search
              className="w-5 h-5 text-gray-400 cursor-pointer"
              onClick={openSearch}
            />
            <input
              type="text"
              placeholder={`Tìm kiếm ${categorySearch}...`}
              className="w-48 focus:outline-none bg-transparent text-sm"
              readOnly
              onClick={openSearch}
            />
            <div className="border-l border-gray-300 mx-2 h-6" />
            <div className="relative" ref={categoryRef}>
              <button
                onClick={() => setIsOpenCategoryDropdown(!isOpenCategoryDropdown)}
                className="flex items-center gap-1 text-sm font-semibold hover:text-blue-600 transition-colors"
              >
                {categorySearch}
                <ChevronDown className={`w-4 h-4 transition-transform ${isOpenCategoryDropdown ? 'rotate-180' : ''}`} />
              </button>
              {isOpenCategoryDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-xl z-50 py-2">
                  {categorySearchs.map(item => (
                    <div
                      key={item}
                      onClick={() => handleSelectCategory(item)}
                      className={`px-4 py-2.5 text-sm flex items-center gap-3 cursor-pointer hover:bg-blue-50 transition-colors ${item === categorySearch ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-gray-700'
                        }`}
                    >
                      {item === categorySearch && <div className="w-4 h-4 bg-blue-600 rounded-full" />}
                      <span className={item !== categorySearch ? 'ml-7' : ''}>{item}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* SEARCH - Mobile */}
          <button
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={openSearch}
          >
            <Search className="h-5 w-5" />
          </button>

          {/* Chat */}
          <button
            className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setIsOpenChat(!isOpenChat)}
          >
            <span className="absolute top-1 right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full animate-pulse">3</span>
            <MessageCircle className="h-4 w-4" />
          </button>

          {/* Notification */}
          <button
            className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setIsOpenNotification(!isOpenNotification)}
          >
            <span className="absolute top-1 right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full animate-pulse">15</span>
            <Bell className="h-4 w-4" />
          </button>

          {/* User */}
          {user ? (
            <div
              className="flex items-center gap-2 border border-gray-300 px-2 py-0 rounded-full hover:bg-gray-50 transition-all hover:border-gray-400 cursor-pointer"
              onClick={() => setIsOpenUserMenu(!isOpenUserMenu)}
            >
              <img
                src={user.avatar || "https://dvntechnology.com/icons/Logo.png"}
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

        {/* Dropdowns */}
        <div className={`absolute top-10 right-4 mt-2 transform transition-all duration-200 ease-out origin-top-right ${isOpenUserMenu ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'}`}>
          <div ref={userMenuRef}>
            <OpenUser handleLogout={handleLogout} />
          </div>
        </div>

        <div className={`absolute top-10 right-4 mt-2 transform transition-all shadow-lg duration-200 ease-out origin-top-right ${isOpenChat ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'} md:right-48`} ref={chatRef}>
          <ChatNotification />
        </div>

        <div className={`absolute top-10 right-4 mt-2 transform transition-all shadow-lg duration-200 ease-out origin-top-right ${isOpenNotification ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'} md:right-24`} ref={notificationRef}>
          <NotificationPanel />
        </div>
      </div>

      {/* Dashboard Menu */}
      <DashboardMenu isOpen={isOpenDashboardMenu} onClose={() => setIsOpenDashboardMenu(false)} />

      {/* Search Modal - Giống hệt HeaderPageStart */}
      <SearchModal
        isOpen={isOpenSearch}
        onClose={() => setIsOpenSearch(false)}
        category={categorySearch}
      />
    </>
  );
};

export default DashboardHeader;
