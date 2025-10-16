import { Check, ChevronDown, Dot, Logs, Search, ShoppingBasket, SquareUser } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logoHeader } from '../../constants/images';
import { logout } from '../../stores/redux/actions/userActions';
import OpenUser from '../layout/OpenUser';

const HeaderPageStart = () => {
  const dispatch = useDispatch();
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const [categorySearch, setCategorySearch] = useState('Tất cả');
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isOpenUserMenu, setIsOpenUserMenu] = useState(false);
  const userMenuRef = useRef(null);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const categorySearchs = ['Tất cả', 'Phần mềm', 'Website', 'Phần cứng', 'Phụ kiện'];
  const memus = ['Phần mềm', 'Phần cứng', 'Website', 'Liên hệ'];

  const handleSelectCategory = (category) => {
    setCategorySearch(category);
    setIsOpenSearch(false);
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    dispatch(logout());
    setIsOpenUserMenu(false);
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
    <div>
      {/* main */}
      <div className="main p-2 pt-3 px-6 flex items-center justify-between border-b border-gray-200">
        {/* left */}
        <div className="hidden md:flex items-center justify-center border border-gray-300 rounded-full px-4 py-2 gap-2">
          <Search className="w-5 h-w-5 text-gray-400" />
          <input type="text" placeholder={`Tìm kiếm ${categorySearch}`} className="w-72 focus:outline-none focus:ring-0 pl-4 bg-white" />
          <div className="border-l border-gray-300 mx-4 self-stretch" />
          {/* drop menu search */}
          <div className="relative w-24">
            <button onClick={() => setIsOpenSearch(!isOpenSearch)} className="flex items-center gap-2 text-sm text-black font-semibold">
              {categorySearch}
              <ChevronDown className={`w-4 h-4 transition-transform ${isOpenSearch ? "rotate-180" : "rotate-0"}`} />
            </button>
            {
              isOpenSearch && (
                <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  {
                    categorySearchs.map((item) => (
                      <div
                        key={item}
                        onClick={() => handleSelectCategory(item)}
                        className={`px-8 py-2 text-sm items-center cursor-pointer hover:bg-blue-100 ${item === categorySearch ? "bg-blue-50 font-semibold" : ""}`}>
                        <Check className={`w-4 h-4 text-blue-500 absolute left-2 ${item === categorySearch ? "block" : "hidden"}`} /> {item}
                      </div>
                    ))
                  }
                </div>
              )
            }
          </div>
        </div>
        {/* mobile */}
        <button className="md:hidden flex items-center">
          <Logs className="w-6 h-6 text-gray-500" onClick={() => setIsOpenMenu(true)} />
          <Search className="w-6 h-6 ml-4 text-gray-500" />
        </button>
        <>
          {/* Overlay */}
          <div
            className={`fixed inset-0 bg-black transition-opacity duration-300 z-40 ${isOpenMenu ? 'bg-opacity-40 pointer-events-auto' : 'bg-opacity-0 pointer-events-none'
              }`}
            onClick={() => setIsOpenMenu(false)}
          />

          {/* Menu */}
          <div className={`fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-50 flex flex-col px-6 py-6 gap-4 transform transition-transform duration-300 ease-in-out ${isOpenMenu ? 'translate-x-0' : '-translate-x-full'
            }`}>
            {memus.map((item) => (
              <Link
                key={item}
                to="#"
                className="text-black font-semibold text-lg hover:text-blue-600 transition"
              >
                {item}
              </Link>
            ))}
          </div>
        </>
        {/* center */}
        <div className="flex-1 flex justify-center">
          <Link to="/">
            <img src={logoHeader} alt="logo" className="w-16 h-auto md:hidden cursor-pointer" />
            <img src={logoHeader} alt="logo" className="hidden md:block md:w-24 h-auto cursor-pointer" />
          </Link>
        </div>
        {/* right */}
        <div className="hidden lg:flex items-center text-sm text-gray-700 relative">
          <Link to="#" className="text-black font-semibold hover:border-b border-black hover:text-gray-600 mr-4">Phần mềm</Link>
          <Link to="#" className="text-black font-semibold hover:border-b border-black hover:text-gray-600 mr-4">Phần cứng</Link>
          <Link to="#" className="text-black font-semibold hover:border-b border-black hover:text-gray-600">Website</Link>
          <span className="mx-2 flex items-center text-black"><Dot /></span>
          <Link to="#" className="text-black font-semibold hover:border-b border-black hover:text-gray-600">Liên hệ</Link>
          <div className="border-l border-black mx-2 h-4" />
          {/* login */}
          {
            user ? (
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
              <button className="bg-blue-600 text-white px-3 py-1 mr-2 rounded-full text-sm font-semibold hover:bg-blue-700" onClick={handleLogin}>
                Đăng nhập
              </button>
            )
          }
          {/* Open User Menu with Animation */}
          <div
            className={`absolute z-10 top-5 right-8 mt-2 transform transition-all duration-200 ease-out origin-top-right ${isOpenUserMenu
              ? 'opacity-100 scale-100 translate-y-0'
              : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
              }`}
          >
            <div ref={userMenuRef}>
              <OpenUser handleLogout={handleLogout} />
            </div>
          </div>

          {/* cart */}
          <div className="relative cursor-pointer pl-2">
            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">3</span>
            <ShoppingBasket className="bg-blue-500 rounded-full p-1 text-white hover:bg-blue-400" />
          </div>
        </div>
        {/* mobile */}
        <div className="lg:hidden flex items-center gap-4">
          {user ? (
            <>
              <SquareUser
                className="w-6 h-6 cursor-pointer"
                onClick={() => setIsOpenUserMenu(!isOpenUserMenu)}
              />
              <div
                className={`absolute z-10 top-10 right-4 transform transition-all duration-200 ease-out origin-top-right ${isOpenUserMenu
                  ? "opacity-100 scale-100 translate-y-0"
                  : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                  }`}
              >
                <div ref={userMenuRef}>
                  <OpenUser handleLogout={handleLogout} />
                </div>
              </div>
            </>
          ) : (
            <button
              onClick={handleLogin}
              className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold hover:bg-blue-700"
            >
              Đăng nhập
            </button>
          )}

          <div className="relative cursor-pointer">
            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
              3
            </span>
            <ShoppingBasket className="bg-blue-500 rounded-full p-1 text-white hover:bg-blue-400" />
          </div>
        </div>

      </div>
    </div >
  );
};

export default HeaderPageStart;
