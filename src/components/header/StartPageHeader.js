import { Check, ChevronDown, Logs, Search, ShoppingBasket, SquareUser, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logoHeader } from '../../constants/images';
import useClickOutside from '../../hooks/useClickOutside';
import { fetchCart } from '../../stores/redux/actions/cartActions';
import { fetchSuggestions } from '../../stores/redux/actions/searchActions';
import { logout } from '../../stores/redux/actions/userActions';
import OpenUser from '../layout/OpenUser';
import SearchModal from '../search/SearchModal';

const HeaderPageStart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const [categorySearch, setCategorySearch] = useState('Tất cả');
  const [isOpenCategoryDropdown, setIsOpenCategoryDropdown] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isOpenUserMenu, setIsOpenUserMenu] = useState(false);
  const [isOpenCart, setIsOpenCart] = useState(false);

  const cart = useSelector(state => state.cart.items || []);
  const { user, isAuthenticated } = useSelector(state => state.user);

  const cartRef = useRef(null);
  const userMenuRefDesktop = useRef(null);
  const userMenuRefMobile = useRef(null);
  const categoryRef = useRef(null);

  const categorySearchs = ['Tất cả', 'Phần mềm', 'Website', 'Phần cứng', 'Phụ kiện'];
  const menus = ['Phần mềm', 'Phần cứng', 'Website', 'Liên hệ'];

  useClickOutside(cartRef, () => setIsOpenCart(false), isOpenCart);
  useClickOutside(categoryRef, () => setIsOpenCategoryDropdown(false), isOpenCategoryDropdown);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCart());
    }
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    if (!isOpenUserMenu) return;
    const handleClickOutside = event => {
      const target = event.target;
      const clickedInsideDesktop = userMenuRefDesktop.current?.contains(target);
      const clickedInsideMobile = userMenuRefMobile.current?.contains(target);
      if (!clickedInsideDesktop && !clickedInsideMobile) {
        setIsOpenUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpenUserMenu]);

  const handleSelectCategory = category => {
    setCategorySearch(category);
    setIsOpenCategoryDropdown(false);
  };

  const handleLogin = () => navigate('/login');
  const handleLogout = () => {
    dispatch(logout());
    setIsOpenUserMenu(false);
  };

  return (
    <div>
      {/* Main Header */}
      <div className="main p-2 pt-3 px-4 sm:px-6 flex items-center justify-between border-b border-gray-200 bg-white">
        {/* Left - Desktop Search */}
        <div className="hidden md:flex items-center justify-center border border-gray-300 rounded-full px-4 py-2 gap-2 relative hover:border-gray-400 transition-colors">
          <Search
            className="w-5 h-5 text-gray-400 cursor-pointer"
            onClick={() => {
              setIsOpenSearch(true);
              dispatch(fetchSuggestions());
            }}
          />
          <input
            type="text"
            placeholder={`Tìm kiếm ${categorySearch}...`}
            className="w-48 lg:w-72 focus:outline-none focus:ring-0 bg-white text-sm"
            onClick={() => {
              setIsOpenSearch(true);
              dispatch(fetchSuggestions());
            }}
            readOnly
          />

          <div className="border-l border-gray-300 mx-2 h-6" />

          {/* Category Dropdown */}
          <div className="relative" ref={categoryRef}>
            <button
              onClick={() => setIsOpenCategoryDropdown(!isOpenCategoryDropdown)}
              className="flex items-center gap-2 text-sm text-black font-semibold hover:text-blue-600 transition-colors"
            >
              {categorySearch}
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  isOpenCategoryDropdown ? 'rotate-180' : 'rotate-0'
                }`}
              />
            </button>

            {isOpenCategoryDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-xl z-50 py-2 animate-fade-in">
                {categorySearchs.map(item => (
                  <div
                    key={item}
                    onClick={() => handleSelectCategory(item)}
                    className={`px-4 py-2.5 text-sm flex items-center gap-3 cursor-pointer hover:bg-blue-50 transition-colors ${
                      item === categorySearch
                        ? 'bg-blue-50 text-blue-600 font-semibold'
                        : 'text-gray-700'
                    }`}
                  >
                    {item === categorySearch && <Check className="w-4 h-4 text-blue-600" />}
                    <span className={item !== categorySearch ? 'ml-7' : ''}>{item}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Left - Mobile */}
        <div className="md:hidden flex items-center gap-3">
          <button onClick={() => setIsOpenMenu(true)}>
            <Logs className="w-6 h-6 text-gray-600 hover:text-blue-600 transition-colors" />
          </button>
          <button
            onClick={() => {
              setIsOpenSearch(true);
              dispatch(fetchSuggestions());
            }}
          >
            <Search className="w-6 h-6 text-gray-600 hover:text-blue-600 transition-colors" />
          </button>
        </div>

        {/* Mobile Menu Sidebar */}
        <>
          <div
            className={`fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 z-40 ${
              isOpenMenu ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            onClick={() => setIsOpenMenu(false)}
          />

          <div
            className={`fixed top-0 left-0 w-72 h-full bg-white shadow-2xl z-50 flex flex-col p-6 transform transition-transform duration-300 ease-out ${
              isOpenMenu ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
              <img src={logoHeader} alt="logo" className="w-16 h-auto" />
              <button
                onClick={() => setIsOpenMenu(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="flex flex-col gap-2">
              {menus.map(item => (
                <Link
                  key={item}
                  to="#"
                  className="text-gray-900 font-semibold text-base py-3 px-4 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all"
                  onClick={() => setIsOpenMenu(false)}
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </>

        {/* Center - Logo */}
        <div className="flex-1 flex justify-center">
          <Link to="/">
            <img
              src={logoHeader}
              alt="DVN Technology"
              className="w-16 md:w-20 lg:w-24 h-auto cursor-pointer hover:opacity-80 transition-opacity"
            />
          </Link>
        </div>

        {/* Right - Desktop Navigation */}
        <div className="hidden lg:flex items-center text-sm text-gray-700 gap-4">
          <Link to="#" className="font-semibold hover:text-blue-600 transition-colors">
            Phần mềm
          </Link>
          <Link to="#" className="font-semibold hover:text-blue-600 transition-colors">
            Phần cứng
          </Link>
          <Link to="#" className="font-semibold hover:text-blue-600 transition-colors">
            Website
          </Link>

          <div className="w-px h-5 bg-gray-300" />

          <Link to="/contact-start" className="font-semibold hover:text-blue-600 transition-colors">
            Liên hệ
          </Link>

          <div className="w-px h-5 bg-gray-300" />

          {/* User Menu Desktop */}
          {user ? (
            <div className="relative">
              <div
                className="flex items-center gap-2 border border-gray-300 px-3 py-1.5 rounded-full hover:bg-gray-50 hover:border-gray-400 cursor-pointer transition-all"
                onClick={() => setIsOpenUserMenu(!isOpenUserMenu)}
              >
                <img
                  src={user.avatar || 'https://dvntechnology.com/icons/Logo.png'}
                  alt="Avatar"
                  className="h-6 w-6 rounded-full object-cover"
                />
                <span className="text-sm text-gray-900 font-medium">{user.username}</span>
                <ChevronDown className="w-4 h-4 text-gray-600" />
              </div>

              <div
                ref={userMenuRefDesktop}
                className={`absolute top-full right-0 mt-2 transform transition-all duration-200 ease-out origin-top-right z-50 ${
                  isOpenUserMenu
                    ? 'opacity-100 scale-100 translate-y-0'
                    : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                }`}
              >
                <OpenUser handleLogout={handleLogout} />
              </div>
            </div>
          ) : (
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md"
              onClick={handleLogin}
            >
              Đăng nhập
            </button>
          )}

          {/* Cart Desktop */}
          <div className="relative" ref={cartRef}>
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold shadow-md z-10">
                {cart.length}
              </span>
            )}
            <button
              onClick={() => setIsOpenCart(!isOpenCart)}
              className="p-2 bg-blue-600 rounded-full text-white hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md"
            >
              <ShoppingBasket className="w-5 h-5" />
            </button>

            {/* Cart Dropdown */}
            <div
              className={`absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-xl shadow-2xl transition-all duration-200 ease-out origin-top-right z-50 ${
                isOpenCart
                  ? 'opacity-100 scale-100 translate-y-0'
                  : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
              }`}
            >
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-bold text-gray-900">Giỏ hàng của bạn</h3>
              </div>

              <div className="max-h-80 overflow-y-auto p-4">
                {cart.length > 0 ? (
                  <div className="space-y-3">
                    {cart.map(item => (
                      <div
                        key={item.id}
                        className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <img
                          src={item.product?.image || 'https://via.placeholder.com/80'}
                          alt={item.product?.name}
                          className="w-14 h-14 object-cover rounded-lg flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate">
                            {item.product?.name || 'Không rõ sản phẩm'}
                          </p>
                          <p className="text-xs text-gray-500">Số lượng: {item.quantity}</p>
                        </div>
                        <p className="text-sm font-bold text-blue-600 flex-shrink-0">
                          {((item.product?.price || 0) * item.quantity).toLocaleString()}₫
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-gray-500 text-sm py-8">Giỏ hàng trống</p>
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-4 border-t border-gray-200 space-y-3">
                  <div className="flex justify-between text-sm font-bold">
                    <span className="text-gray-700">Tổng cộng:</span>
                    <span className="text-blue-600">
                      {cart
                        .reduce(
                          (total, item) => total + (item.product?.price || 0) * item.quantity,
                          0
                        )
                        .toLocaleString()}
                      ₫
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        navigate('/cart');
                        setIsOpenCart(false);
                      }}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-lg py-2.5 text-sm font-semibold transition-colors"
                    >
                      Xem giỏ hàng
                    </button>
                    <button
                      onClick={() => {
                        navigate('/checkout');
                        setIsOpenCart(false);
                      }}
                      className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2.5 text-sm font-semibold transition-colors"
                    >
                      Thanh toán
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right - Mobile */}
        <div className="lg:hidden flex items-center gap-3">
          {user ? (
            <div className="relative">
              <button onClick={() => setIsOpenUserMenu(!isOpenUserMenu)}>
                <SquareUser className="w-6 h-6 text-gray-600 hover:text-blue-600 transition-colors" />
              </button>

              <div
                ref={userMenuRefMobile}
                className={`absolute top-full right-0 mt-2 transform transition-all duration-200 ease-out origin-top-right z-50 ${
                  isOpenUserMenu
                    ? 'opacity-100 scale-100 translate-y-0'
                    : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                }`}
              >
                <OpenUser handleLogout={handleLogout} />
              </div>
            </div>
          ) : (
            <button
              onClick={handleLogin}
              className="bg-blue-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold hover:bg-blue-700 transition-colors"
            >
              Đăng nhập
            </button>
          )}

          {/* Cart Mobile */}
          <div className="relative">
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold shadow-md z-10">
                {cart.length}
              </span>
            )}
            <button
              onClick={() => setIsOpenCart(!isOpenCart)}
              className="p-2 bg-blue-600 rounded-full text-white hover:bg-blue-700 transition-colors"
            >
              <ShoppingBasket className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Search Modal - Global */}
      <SearchModal
        isOpen={isOpenSearch}
        onClose={() => setIsOpenSearch(false)}
        category={categorySearch}
      />

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default HeaderPageStart;
