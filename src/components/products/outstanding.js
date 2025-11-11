import { Eye, Heart, Minus, Plus, ShoppingCart, Star, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Notification from '../../constants/notifications/notifi';
import useNotification from '../../hooks/useNotification';
import {
  addToCart,
  fetchCart,
  removeFromCart,
  updateCartItem
} from '../../stores/redux/actions/cartActions';
import { getAllProducts } from '../../stores/redux/actions/productActions';
import {
  addToFavorites,
  getFavoriteProducts,
  removeFromFavorites
} from '../../stores/redux/actions/userActions';
import Loading from '../../utils/loading';

const Outstanding = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeQuantity, setActiveQuantity] = useState({});
  const { products, loading } = useSelector(state => state.product);
  const { items: cartItems } = useSelector(state => state.cart);
  const { message, messageType, showMessage } = useNotification();
  const { isAuthenticated, favoriteProducts } = useSelector(state => state.user);
  const [loadingState, setLoadingState] = useState(false);

  useEffect(() => {
    setLoadingState(true);
    dispatch(getAllProducts()).finally(() => setLoadingState(false));
    if (isAuthenticated) {
      dispatch(getFavoriteProducts());
    }
  }, [dispatch, isAuthenticated]);

  const bestSeller = products
    ?.slice()
    ?.sort((a, b) => b.sold - a.sold)
    ?.slice(0, 5) || [];

  const isFavorite = productId =>
    Array.isArray(favoriteProducts) &&
    favoriteProducts.some(p => p.id === productId);

  if (loading) return <Loading />;

  const handleBuyNow = productId => {
    dispatch(addToCart(productId, 1));
    navigate('/buynow/' + productId);
  };

  const getQuantity = productId => {
    const item = cartItems.find(i => i.product_id === Number(productId));
    return item ? item.quantity : 0;
  };

  const handleAddToCart = productId => {
    dispatch(addToCart(Number(productId), 1)).then(() => {
      dispatch(fetchCart());
      setActiveQuantity(prev => ({ ...prev, [productId]: true }));
      if (!isAuthenticated) {
        showMessage('Vui lòng đăng nhập để sử dụng giỏ hàng.', 'error');
      } else {
        showMessage('Đã thêm vào giỏ hàng!', 'success');
      }
    });
  };

  const handleIncrease = productId => {
    const item = cartItems.find(i => i.product_id === productId);
    if (item) {
      dispatch(updateCartItem(item.id, item.quantity + 1));
    } else {
      dispatch(addToCart(productId, 1));
    }
  };

  const handleDecrease = productId => {
    const item = cartItems.find(i => i.product_id === productId);
    if (item && item.quantity > 1) {
      dispatch(updateCartItem(item.id, item.quantity - 1));
    } else if (item && item.quantity === 1) {
      dispatch(removeFromCart(item.id));
      setActiveQuantity(prev => ({ ...prev, [productId]: false }));
    }
  };

  const handleFavorite = productId => {
    if (!isAuthenticated) {
      showMessage('Vui lòng đăng nhập để yêu thích sản phẩm.', 'error');
      return;
    }

    if (isFavorite(productId)) {
      dispatch(removeFromFavorites(productId))
        .then(() => {
          showMessage('Đã xóa khỏi danh sách yêu thích.', 'success');
        })
        .catch(() => {
          showMessage('Có lỗi xảy ra, vui lòng thử lại.', 'error');
        });
    } else {
      dispatch(addToFavorites(productId))
        .then(() => {
          showMessage('Đã thêm vào danh sách yêu thích!', 'success');
        })
        .catch(() => {
          showMessage('Có lỗi xảy ra, vui lòng thử lại.', 'error');
        });
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 py-6 px-4 sm:px-6">
      <Notification message={message} messageType={messageType} />
      {loadingState ? (
        <Loading />
      ) : (
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
            {bestSeller.map(product => (
              <div
                key={product.id}
                className="group relative bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200 flex flex-col h-full"
              >
                {/* Badge & Heart */}
                <div className="absolute top-2 left-2 right-2 flex justify-between items-start z-10">
                  {product.badge && (
                    <span
                      className={`${product.badgeColor} text-white text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-sm`}
                    >
                      {product.badge}
                    </span>
                  )}
                  <button
                    onClick={() => handleFavorite(product.id)}
                    className="bg-white/90 backdrop-blur-sm p-1 rounded-full shadow-sm hover:scale-110 transition-all duration-200 flex items-center justify-center"
                  >
                    <Heart
                      className={`w-3.5 h-3.5 ${isFavorite(product.id)
                        ? 'fill-red-500 text-red-500'
                        : 'text-gray-500'
                        }`}
                    />
                  </button>
                </div>

                {/* Discount */}
                {product.discount && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white font-semibold text-[10px] px-1.5 py-0.5 rounded-bl-lg rounded-tr-lg shadow-sm z-10 mt-7">
                    -{product.discount}%
                  </div>
                )}

                {/* Image */}
                <div className="relative overflow-hidden bg-gray-100 aspect-square">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-2 left-2 right-2 flex gap-1.5">
                      <Link
                        to={`/detail/product/${product.id}`}
                        className="flex-1 bg-white text-gray-800 py-1.5 px-2 rounded-md text-xs font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5 flex-shrink-0" />
                        <span>Xem</span>
                      </Link>
                      <button
                        onClick={() => handleBuyNow(product.id)}
                        className="flex-1 bg-blue-500 text-white py-1.5 px-2 rounded-md text-xs font-semibold hover:bg-blue-600 transition-colors flex items-center justify-center gap-1"
                      >
                        <ShoppingCart className="w-3.5 h-3.5 flex-shrink-0" />
                        <span>Mua</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-3 flex flex-col flex-1">
                  <div className="space-y-1.5 flex-1">
                    <span className="text-[10px] font-semibold text-blue-600 uppercase tracking-wide block">
                      {product.category}
                    </span>

                    <h3 className="font-semibold text-sm text-gray-900 line-clamp-2 h-10 group-hover:text-blue-600 transition-colors leading-tight">
                      {product.name}
                    </h3>

                    {product.framework && product.framework !== 'N/A' && (
                      <span className="text-[10px] font-medium text-green-600 block">
                        Framework: {product.framework}
                      </span>
                    )}

                    <div className="flex items-center justify-between py-1">
                      <div className="flex items-center gap-1">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${i < Math.floor(product.rating)
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                                }`}
                            />
                          ))}
                        </div>
                        <span className="text-gray-600 text-[10px]">
                          {product.rating}
                        </span>
                      </div>
                      <span className="text-gray-500 text-[10px]">
                        {product.sold > 1000
                          ? `${(product.sold / 1000).toFixed(1)}k`
                          : product.sold}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1 min-h-[1.5rem]">
                      {product.features.slice(0, 2).map((feature, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-md flex items-center gap-0.5"
                        >
                          <Zap className="w-2.5 h-2.5 text-blue-500 flex-shrink-0" />
                          <span className="truncate">{feature}</span>
                        </span>
                      ))}
                      {product.features.length > 2 && (
                        <span className="text-[10px] text-gray-400 px-1 flex items-center">
                          +{product.features.length - 2}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-2 mt-auto">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        {product.originalPrice && (
                          <span className="text-[10px] text-gray-400 line-through block">
                            {(product.originalPrice / 1000000).toFixed(1)}M
                          </span>
                        )}
                        <span className="text-base font-bold text-red-500">
                          {product.price >= 1000000
                            ? `${(product.price / 1000000).toFixed(1)}M`
                            : `${(product.price / 1000).toFixed(0)}K`}
                        </span>
                      </div>
                      <div className="flex-shrink-0">
                        {!activeQuantity[product.id] ? (
                          <button
                            onClick={() => handleAddToCart(product.id)}
                            className="bg-blue-500 text-white p-1.5 rounded-lg hover:bg-blue-600 transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center"
                          >
                            <ShoppingCart className="w-4 h-4" />
                          </button>
                        ) : (
                          <div className="flex items-center bg-blue-500 text-white rounded-lg overflow-hidden">
                            <button
                              onClick={() => handleDecrease(product.id)}
                              className="p-1.5 hover:bg-blue-600 transition-colors flex items-center justify-center"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-1.5 text-xs font-semibold min-w-[1.25rem] text-center">
                              {getQuantity(product.id)}
                            </span>
                            <button
                              onClick={() => handleIncrease(product.id)}
                              className="p-1.5 hover:bg-blue-600 transition-colors flex items-center justify-center"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Outstanding;
