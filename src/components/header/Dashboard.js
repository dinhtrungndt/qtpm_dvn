import { Bell, Logs, MessageCircle, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../stores/redux/actions/userActions';

const DashboardHeader = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [isOpenUserMenu, setIsOpenUserMenu] = useState(false);
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
    <div className="flex items-center justify-between p-4 border-b">
      {/* left */}
      <div className="flex items-center gap-4 text-gray-600">
        <Logs className="h-4 w-4 cursor-pointer" />
        <a href="/">Trang chủ</a>
        <a href="/contact">Liên hệ</a>
      </div>
      { /* right */}
      <div className="flex items-center gap-4 text-gray-600">
        <Search className="h-4 w-4 cursor-pointer hover:text-gray-400" />
        <div className="relative cursor-pointer ">
          <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">3</span>
          <MessageCircle className="h-4 w-4 cursor-pointer hover:text-gray-400" />
        </div>
        <div className="relative cursor-pointer">
          <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">5</span>
          <Bell className="h-4 w-4 cursor-pointer hover:text-gray-400" />
        </div>
        {
          user ? (
            <div className="flex items-center gap-2 cursor-pointer hover:text-gray-400 border p-1 py-0 rounded shadow-sm border-blue-400" onClick={() => setIsOpenUserMenu(!isOpenUserMenu)}>
              <img
                src={user.avatar != null ? user.avatar : "https://dvntechnology.com/icons/Logo.png"}
                alt="Avatar"
                className="h-6 w-6 rounded-full object-cover"
              />
              <span className="text-base text-black">{user.username}</span>
            </div>
          ) : (
            <a href="/login" className="text-sm hover:text-gray-400">Đăng nhập</a>
          )
        }
      </div>

      {/* Open User */}
      {isOpenUserMenu && (
        <div
          ref={userMenuRef}
          className="absolute top-10 right-4 bg-white border rounded shadow-lg w-48 z-50 border-blue-300"
        >
          <a href="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Hồ sơ</a>
          <a href="/settings" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Cài đặt</a>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
          >
            Đăng xuất
          </button>
        </div>
      )}
    </div>
  );
};

export default DashboardHeader;
