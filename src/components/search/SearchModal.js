import { CreditCard, Package, Search, ShoppingBag, TrendingUp, User, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  clearSearch,
  fetchSuggestions,
  performSearch
} from '../../stores/redux/actions/searchActions';

const SearchModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { results, loading, suggestions } = useSelector(state => state.search);
  const { isAuthenticated } = useSelector(state => state.user);
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      if (!query) {
        dispatch(fetchSuggestions());
      }
    }
  }, [isOpen, dispatch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim()) {
        dispatch(performSearch(query, isAuthenticated));
      } else {
        dispatch(clearSearch());
        dispatch(fetchSuggestions());
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query, dispatch, isAuthenticated]);

  useEffect(() => {
    const handleClickOutside = e => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    const handleEscape = e => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const highlightText = (text, query) => {
    if (!query.trim() || !text) return text;

    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <mark key={i} className="bg-yellow-200 text-gray-900 font-semibold px-0.5 rounded">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  const handleItemClick = (type, id) => {
    onClose();
    setQuery('');

    switch (type) {
      case 'product':
        navigate(`/detail/product/${id}`);
        break;
      case 'order':
        navigate('/history/orders');
        break;
      case 'cart':
        navigate('/cart');
        break;
      case 'payment':
        navigate('/history/orders');
        break;
      case 'user':
        navigate('/manage/users');
        break;
      default:
        break;
    }
  };

  const safeResults = {
    users: results?.users || [],
    products: results?.products || [],
    orders: results?.orders || [],
    carts: results?.carts || [],
    payments: results?.payments || [],
  };

  const safeSuggestions = suggestions?.products || [];

  const showSuggestions = !query.trim() && safeSuggestions.length > 0;
  const showResults =
    query.trim() &&
    (safeResults.products.length > 0 ||
      safeResults.orders.length > 0 ||
      safeResults.carts.length > 0 ||
      safeResults.payments.length > 0 ||
      safeResults.users.length > 0);

  if (!isOpen) return null;

  return (
    <>
      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-slide-down { animation: slideDown 0.3s ease-out; }
        .animate-fade-in { animation: fadeIn 0.2s ease-out; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 animate-fade-in"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div
        ref={modalRef}
        className="fixed top-4 left-1/2 -translate-x-1/2 w-full max-w-xl z-50 px-4 animate-slide-down"
      >
        <div className="bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
          {/* Search Input */}
          <div className="p-3 border-b border-gray-200">
            <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500 focus-within:bg-white transition-all">
              <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Tìm kiếm sản phẩm, đơn hàng, thanh toán..."
                className="flex-1 bg-transparent outline-none text-gray-900 placeholder-gray-400 text-sm"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="p-0.5 hover:bg-gray-200 rounded transition-colors"
                >
                  <X className="w-3.5 h-3.5 text-gray-400" />
                </button>
              )}
              <button
                onClick={onClose}
                className="p-0.5 hover:bg-gray-200 rounded transition-colors"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Results Container */}
          <div className="max-h-[70vh] overflow-y-auto scrollbar-hide">
            {/* Loading */}
            {loading && (
              <div className="p-6 text-center">
                <div className="inline-block w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-2 text-sm text-gray-500">Đang tìm kiếm...</p>
              </div>
            )}

            {/* Suggestions */}
            {!loading && showSuggestions && (
              <div className="p-3">
                <div className="flex items-center gap-2 mb-2 text-gray-600">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span className="text-xs font-semibold uppercase tracking-wider">
                    Gợi ý cho bạn
                  </span>
                </div>
                <div className="space-y-1.5">
                  {safeSuggestions.map(product => (
                    <div
                      key={product.id}
                      onClick={() => handleItemClick('product', product.id)}
                      className="flex items-center gap-2.5 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-all group"
                    >
                      <img
                        src={product.image || 'https://via.placeholder.com/80'}
                        alt={product.name}
                        className="w-10 h-10 object-cover rounded-lg flex-shrink-0 group-hover:scale-105 transition-transform"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                          {product.name}
                        </p>
                        <p className="text-xs text-gray-500">{product.category}</p>
                      </div>
                      <p className="text-sm font-bold text-blue-600 flex-shrink-0">
                        {product.price.toLocaleString()}₫
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Search Results */}
            {!loading && showResults && (
              <div className="p-3 space-y-4">
                {/* Products */}
                {safeResults.products.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-2 text-gray-600">
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span className="text-xs font-semibold uppercase tracking-wider">
                        Sản phẩm ({safeResults.products.length})
                      </span>
                    </div>
                    <div className="space-y-1.5">
                      {safeResults.products.map(product => (
                        <div
                          key={product.id}
                          onClick={() => handleItemClick('product', product.id)}
                          className="flex items-center gap-2.5 p-2 hover:bg-blue-50 rounded-lg cursor-pointer transition-all group border border-transparent hover:border-blue-200"
                        >
                          <img
                            src={product.image || 'https://via.placeholder.com/80'}
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded-lg flex-shrink-0 group-hover:scale-105 transition-transform"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-1">
                              {highlightText(product.name, query)}
                            </p>
                            <p className="text-xs text-gray-500">
                              {highlightText(product.category, query)}
                            </p>
                          </div>
                          <p className="text-sm font-bold text-blue-600 flex-shrink-0">
                            {product.price.toLocaleString()}₫
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Users (Admin only) */}
                {safeResults.users.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-2 text-gray-600">
                      <User className="w-3.5 h-3.5" />
                      <span className="text-xs font-semibold uppercase tracking-wider">
                        Người dùng ({safeResults.users.length})
                      </span>
                    </div>
                    <div className="space-y-1.5">
                      {safeResults.users.map(user => (
                        <div
                          key={user.id}
                          onClick={() => handleItemClick('user', user.id)}
                          className="flex items-center gap-2.5 p-2 hover:bg-purple-50 rounded-lg cursor-pointer transition-all group border border-transparent hover:border-purple-200"
                        >
                          <img
                            src={user.avatar || 'https://dvntechnology.com/icons/Logo.png'}
                            alt={user.username}
                            className="w-9 h-9 rounded-full object-cover flex-shrink-0"
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                              {highlightText(user.username, query)}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                              {highlightText(user.email, query)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Orders */}
                {safeResults.orders.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-2 text-gray-600">
                      <Package className="w-3.5 h-3.5" />
                      <span className="text-xs font-semibold uppercase tracking-wider">
                        Đơn hàng ({safeResults.orders.length})
                      </span>
                    </div>
                    <div className="space-y-1.5">
                      {safeResults.orders.map(order => (
                        <div
                          key={order.id}
                          onClick={() => handleItemClick('order', order.id)}
                          className="flex items-center gap-2.5 p-2 hover:bg-green-50 rounded-lg cursor-pointer transition-all group border border-transparent hover:border-green-200"
                        >
                          <div className="w-9 h-9 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Package className="w-4 h-4 text-green-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
                              Đơn hàng #{order.id}
                            </p>
                            <p className="text-xs text-gray-500">
                              {highlightText(order.status, query)}
                            </p>
                          </div>
                          <p className="text-sm font-bold text-green-600 flex-shrink-0">
                            {order.total_price.toLocaleString()}₫
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Cart Items */}
                {safeResults.carts.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-2 text-gray-600">
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span className="text-xs font-semibold uppercase tracking-wider">
                        Giỏ hàng ({safeResults.carts.length})
                      </span>
                    </div>
                    <div className="space-y-1.5">
                      {safeResults.carts.map(cart => (
                        <div
                          key={cart.id}
                          onClick={() => handleItemClick('cart', cart.id)}
                          className="flex items-center gap-2.5 p-2 hover:bg-orange-50 rounded-lg cursor-pointer transition-all group border border-transparent hover:border-orange-200"
                        >
                          <img
                            src={cart.product?.image || 'https://via.placeholder.com/80'}
                            alt={cart.product?.name}
                            className="w-10 h-10 object-cover rounded-lg flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900 truncate group-hover:text-orange-600 transition-colors">
                              {cart.product?.name}
                            </p>
                            <p className="text-xs text-gray-500">Số lượng: {cart.quantity}</p>
                          </div>
                          <p className="text-sm font-bold text-orange-600 flex-shrink-0">
                            {cart.total_price.toLocaleString()}₫
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Payments */}
                {safeResults.payments.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-2 text-gray-600">
                      <CreditCard className="w-3.5 h-3.5" />
                      <span className="text-xs font-semibold uppercase tracking-wider">
                        Thanh toán ({safeResults.payments.length})
                      </span>
                    </div>
                    <div className="space-y-1.5">
                      {safeResults.payments.map(payment => (
                        <div
                          key={payment.payment_id}
                          onClick={() => handleItemClick('payment', payment.payment_id)}
                          className="flex items-center gap-2.5 p-2 hover:bg-indigo-50 rounded-lg cursor-pointer transition-all group border border-transparent hover:border-indigo-200"
                        >
                          <div className="w-9 h-9 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <CreditCard className="w-4 h-4 text-indigo-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                              Thanh toán #{payment.payment_id}
                            </p>
                            <p className="text-xs text-gray-500">
                              {highlightText(payment.status, query)}
                            </p>
                          </div>
                          <p className="text-sm font-bold text-indigo-600 flex-shrink-0">
                            {payment.amount.toLocaleString()}₫
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* No Results */}
            {!loading && query.trim() && !showResults && (
              <div className="p-8 text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Search className="w-6 h-6 text-gray-400" />
                </div>
                <p className="text-gray-900 font-semibold mb-1 text-sm">Không tìm thấy kết quả</p>
                <p className="text-xs text-gray-500">Thử tìm kiếm với từ khóa khác</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchModal;
