import {
  ArrowLeft,
  Check,
  ChevronRight,
  Eye,
  Heart,
  Minus,
  Package,
  Plus,
  Share2,
  Shield,
  ShoppingBasket,
  ShoppingCart,
  Star,
  TrendingUp,
  Zap,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Notification from '../../constants/notifications/notifi';
import useClickOutside from '../../hooks/useClickOutside';
import useNotification from '../../hooks/useNotification';
import {
  addToCart,
  fetchCart,
  removeFromCart,
  updateCartItem,
} from '../../stores/redux/actions/cartActions';
import { getProductById } from '../../stores/redux/actions/productActions';
import Loading from '../../utils/loading';

const DetailProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products, productDetail, isLoading } = useSelector(state => state.product);
  const { items: cartItems } = useSelector(state => state.cart);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [isOpenCart, setIsOpenCart] = useState(false);
  const [activeQuantity, setActiveQuantity] = useState({});
  const { message, messageType, showMessage } = useNotification();
  const cartRef = useRef(null);

  useClickOutside(cartRef, () => setIsOpenCart(false), isOpenCart);

  useEffect(() => {
    if (id) dispatch(getProductById(id));
  }, [id, dispatch]);

  if (isLoading || !productDetail) {
    return <Loading />;
  }

  const getQuantity = () => {
    const item = cartItems.find(i => i.product_id === Number(id));
    return item ? item.quantity : 0;
  };

  const handleBuyNow = () => {
    dispatch(addToCart(Number(id), quantity));
    navigate(`/buynow/${id}`);
  };

  const handleAddToCart = () => {
    dispatch(addToCart(Number(id), quantity)).then(() => {
      dispatch(fetchCart());
      setActiveQuantity(prev => ({ ...prev, [id]: true }));
      setQuantity(1);
    });
    showMessage('Đã thêm vào giỏ hàng!', 'success');
  };

  const handleIncrease = () => {
    const item = cartItems.find(i => i.product_id === Number(id));
    if (item) {
      dispatch(updateCartItem(item.id, item.quantity + 1));
    } else {
      dispatch(addToCart(Number(id), 1));
    }
    showMessage('Đã thêm vào giỏ hàng!', 'success');
  };

  const handleDecrease = () => {
    const item = cartItems.find(i => i.product_id === Number(id));
    if (item && item.quantity > 1) {
      dispatch(updateCartItem(item.id, item.quantity - 1));
    } else if (item && item.quantity === 1) {
      dispatch(removeFromCart(item.id));
      setActiveQuantity(prev => ({ ...prev, [id]: false }));
    }
    showMessage('Đã giảm vào giỏ hàng!', 'success');
  };

  const currentQuantity = getQuantity();

  const relatedProducts = products
    ? products
        .filter(p => p.category === productDetail.category && p.id !== productDetail.id)
        .slice(0, 4)
    : [];

  const images = [productDetail.image, productDetail.image, productDetail.image];

  return (
    <div className="min-h-screen bg-white">
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in { animation: fadeIn 0.6s ease-out; }
        .animate-slide-in { animation: slideIn 0.5s ease-out; }
        .animate-scale-in { animation: scaleIn 0.4s ease-out; }
      `}</style>

      <Notification message={message} messageType={messageType} />

      {/* Header Bar */}
      <div className="sticky top-0 z-50 bg-white shadow-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Back Button */}
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="hidden sm:inline font-medium">Quay lại</span>
            </button>

            {/* Breadcrumb - Hidden on mobile */}
            <div className="hidden md:flex items-center gap-2 text-sm text-gray-600 flex-1 mx-4">
              <Link to="/" className="hover:text-blue-600 transition-colors">
                Trang chủ
              </Link>
              <ChevronRight className="w-4 h-4" />
              <Link
                to={`/?category=${productDetail.category}`}
                className="hover:text-blue-600 transition-colors"
              >
                {productDetail.category}
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-gray-900 font-medium truncate max-w-[200px]">
                {productDetail.name}
              </span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Share2 className="w-5 h-5 text-gray-600" />
              </button>

              {/* Cart */}
              <div className="relative" ref={cartRef}>
                <button
                  onClick={() => setIsOpenCart(!isOpenCart)}
                  className="relative p-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                >
                  {cartItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
                      {cartItems.length}
                    </span>
                  )}
                  <ShoppingBasket className="w-5 h-5 text-white" />
                </button>

                {/* Cart Dropdown */}
                <div
                  className={`absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-gray-200 rounded-xl shadow-2xl transition-all duration-200 origin-top-right ${
                    isOpenCart
                      ? 'opacity-100 scale-100 translate-y-0'
                      : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                  }`}
                >
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="font-bold text-gray-900">Giỏ hàng của bạn</h3>
                  </div>
                  <div className="max-h-80 overflow-y-auto p-4 space-y-3">
                    {cartItems.length > 0 ? (
                      cartItems.map(item => (
                        <div
                          key={item.id}
                          className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                          <img
                            src={item.product?.image || 'https://via.placeholder.com/80'}
                            alt={item.product?.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900 truncate">
                              {item.product?.name || 'Không rõ sản phẩm'}
                            </p>
                            <p className="text-xs text-gray-500">Số lượng: {item.quantity}</p>
                          </div>
                          <p className="text-sm font-bold text-blue-600">
                            {((item.product?.price || 0) * item.quantity).toLocaleString()}₫
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-gray-500 py-8">Giỏ hàng trống</p>
                    )}
                  </div>
                  {cartItems.length > 0 && (
                    <div className="p-4 border-t border-gray-200 space-y-3">
                      <div className="flex justify-between text-sm font-bold">
                        <span className="text-gray-700">Tổng cộng:</span>
                        <span className="text-blue-600">
                          {cartItems
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
                          onClick={() => navigate('/cart')}
                          className="bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-lg py-2.5 text-sm font-semibold transition-colors"
                        >
                          Xem giỏ hàng
                        </button>
                        <button
                          onClick={() => navigate('/checkout')}
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
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-12">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 mb-12">
            {/* Image Gallery */}
            <div className="space-y-4 animate-fade-in">
              {/* Main Image */}
              <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden group aspect-square">
                <img
                  src={images[selectedImage]}
                  alt={productDetail.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                  {productDetail.badge && (
                    <span
                      className={`${productDetail.badgeColor} text-white text-xs sm:text-sm font-bold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-lg backdrop-blur-sm`}
                    >
                      {productDetail.badge}
                    </span>
                  )}
                  {productDetail.discount && (
                    <span className="bg-red-500 text-white text-xs sm:text-sm font-bold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-lg backdrop-blur-sm">
                      -{productDetail.discount}%
                    </span>
                  )}
                </div>

                {/* View Count */}
                <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white px-3 sm:px-4 py-2 rounded-full flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  <span className="text-xs sm:text-sm font-medium">{productDetail.sold} views</span>
                </div>
              </div>

              {/* Thumbnail Gallery */}
              <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden border-3 transition-all ${
                      selectedImage === idx
                        ? 'border-blue-500 ring-2 ring-blue-200 scale-105'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6 animate-slide-in">
              {/* Category & Rating */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <span className="text-xs sm:text-sm font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-4 py-2 rounded-full w-fit">
                  {productDetail.category}
                </span>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 sm:w-5 sm:h-5 ${
                          i < Math.floor(productDetail.rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-gray-700">
                    {productDetail.rating} ({productDetail.reviews || productDetail.sold})
                  </span>
                </div>
              </div>

              {/* Product Name */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                {productDetail.name}
              </h1>

              {/* Framework */}
              {productDetail.framework && productDetail.framework !== 'N/A' && (
                <div className="flex items-center gap-2 bg-green-50 px-4 py-3 rounded-xl border border-green-200">
                  <Zap className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-semibold text-green-700">
                    Framework: {productDetail.framework}
                  </span>
                </div>
              )}

              {/* Price Section */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-4 sm:p-6 border border-blue-100">
                <div className="flex items-end gap-3 sm:gap-4 mb-2">
                  {productDetail.originalPrice && (
                    <span className="text-lg sm:text-2xl text-gray-400 line-through">
                      {(productDetail.originalPrice / 1000000).toFixed(1)}M ₫
                    </span>
                  )}
                  <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-600">
                    {productDetail.price >= 1000000
                      ? `${(productDetail.price / 1000000).toFixed(1)}M`
                      : `${(productDetail.price / 1000).toFixed(0)}K`}{' '}
                    ₫
                  </span>
                </div>
                {productDetail.originalPrice && (
                  <p className="text-xs sm:text-sm text-green-600 font-semibold">
                    Tiết kiệm:{' '}
                    {((productDetail.originalPrice - productDetail.price) / 1000000).toFixed(1)}M ₫
                  </p>
                )}
              </div>

              {/* Features */}
              <div className="space-y-3">
                <h3 className="font-bold text-base sm:text-lg text-gray-900">Tính năng nổi bật:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                  {productDetail.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 bg-white p-3 rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all"
                    >
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Check className="w-5 h-5 text-blue-600" />
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-gray-700">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                <div className="bg-white p-3 sm:p-4 rounded-xl shadow-sm text-center border border-gray-100 hover:shadow-md transition-shadow">
                  <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 mx-auto mb-2" />
                  <p className="text-xl sm:text-2xl font-bold text-gray-900">
                    {productDetail.sold}
                  </p>
                  <p className="text-xs text-gray-500">Đã bán</p>
                </div>
                <div className="bg-white p-3 sm:p-4 rounded-xl shadow-sm text-center border border-gray-100 hover:shadow-md transition-shadow">
                  <Package className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500 mx-auto mb-2" />
                  <p className="text-xl sm:text-2xl font-bold text-gray-900">48h</p>
                  <p className="text-xs text-gray-500">Giao hàng</p>
                </div>
                <div className="bg-white p-3 sm:p-4 rounded-xl shadow-sm text-center border border-gray-100 hover:shadow-md transition-shadow">
                  <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500 mx-auto mb-2" />
                  <p className="text-xl sm:text-2xl font-bold text-gray-900">1 năm</p>
                  <p className="text-xs text-gray-500">Bảo hành</p>
                </div>
              </div>

              {/* Quantity & Actions - CẬP NHẬT GIỐNG OUTSTANDING */}
              <div className="space-y-4 bg-white p-4 sm:p-6 rounded-2xl shadow-lg border border-gray-100 animate-scale-in">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-semibold text-gray-700">Số lượng:</span>

                  {/* Quantity Counter - Giống Outstanding */}
                  <div className="flex items-center bg-blue-500 text-white rounded-lg">
                    <button
                      onClick={handleDecrease}
                      className="p-2 hover:bg-blue-600 rounded-l-lg transition-colors"
                      disabled={currentQuantity === 0}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 py-2 text-sm font-bold min-w-[2.5rem] text-center">
                      {currentQuantity || quantity}
                    </span>
                    <button
                      onClick={handleIncrease}
                      className="p-2 hover:bg-blue-600 rounded-r-lg transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* In Cart Status */}
                  {currentQuantity > 0 && (
                    <span className="text-xs text-green-600 font-medium">
                      Đã có {currentQuantity} trong giỏ
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-1 gap-3">
                  {/* Add to Cart Button */}
                  <button
                    onClick={handleAddToCart}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-base transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <span className="hidden sm:inline">Thêm vào giỏ hàng</span>
                    <span className="sm:hidden">Giỏ hàng</span>
                  </button>

                  {/* Buy Now Button */}
                  <button
                    onClick={handleBuyNow}
                    className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-base transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <span>Mua ngay</span>
                  </button>

                  {/* Like Button */}
                  <button
                    onClick={() => setIsLiked(!isLiked)}
                    className={`w-full py-3 sm:py-4 rounded-xl border-2 transition-all flex items-center justify-center gap-2 ${
                      isLiked
                        ? 'bg-red-50 border-red-500 text-red-600'
                        : 'bg-white border-gray-300 hover:border-red-500 hover:text-red-600'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isLiked ? 'fill-red-500' : 'text-gray-600'}`} />
                    <span className="font-semibold">{isLiked ? 'Đã thích' : 'Yêu thích'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-12 animate-fade-in border border-gray-100">
            <div className="flex gap-2 sm:gap-4 border-b border-gray-200 mb-6 overflow-x-auto scrollbar-hide">
              {['description', 'specifications', 'reviews'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-3 sm:pb-4 px-3 sm:px-4 font-semibold transition-all relative whitespace-nowrap text-sm sm:text-base ${
                    activeTab === tab ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab === 'description' && 'Mô tả'}
                  {tab === 'specifications' && 'Thông số'}
                  {tab === 'reviews' && 'Đánh giá'}
                  {activeTab === tab && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 sm:h-1 bg-blue-600 rounded-t-lg"></div>
                  )}
                </button>
              ))}
            </div>

            <div className="prose max-w-none">
              {activeTab === 'description' && (
                <div className="space-y-4">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900">Chi tiết sản phẩm</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    {productDetail.name} là giải pháp hoàn hảo cho doanh nghiệp của bạn. Với các
                    tính năng tiên tiến và giao diện thân thiện, sản phẩm giúp tối ưu hóa quy trình
                    làm việc và nâng cao hiệu suất.
                  </p>
                </div>
              )}
              {activeTab === 'specifications' && (
                <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="font-semibold text-gray-900 text-sm sm:text-base">
                      Danh mục:
                    </span>
                    <span className="text-gray-600 text-sm sm:text-base">
                      {productDetail.category}
                    </span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="font-semibold text-gray-900 text-sm sm:text-base">
                      Framework:
                    </span>
                    <span className="text-gray-600 text-sm sm:text-base">
                      {productDetail.framework}
                    </span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="font-semibold text-gray-900 text-sm sm:text-base">
                      Bảo hành:
                    </span>
                    <span className="text-gray-600 text-sm sm:text-base">12 tháng</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="font-semibold text-gray-900 text-sm sm:text-base">
                      Hỗ trợ:
                    </span>
                    <span className="text-gray-600 text-sm sm:text-base">24/7</span>
                  </div>
                </div>
              )}
              {activeTab === 'reviews' && (
                <div className="space-y-4">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                    Đánh giá từ khách hàng ({productDetail.reviews || productDetail.sold})
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600">Chưa có đánh giá nào.</p>
                </div>
              )}
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="animate-fade-in">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
                Sản phẩm liên quan
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                {relatedProducts.map(p => (
                  <Link
                    key={p.id}
                    to={`/detail/product/${p.id}`}
                    className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100"
                  >
                    <div className="relative aspect-square overflow-hidden">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-3 sm:p-4">
                      <h3 className="font-semibold text-xs sm:text-sm text-gray-900 line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors min-h-[2.5rem]">
                        {p.name}
                      </h3>
                      <p className="text-sm sm:text-base font-bold text-blue-600">
                        {p.price >= 1000000
                          ? `${(p.price / 1000000).toFixed(1)}M`
                          : `${(p.price / 1000).toFixed(0)}K`}{' '}
                        ₫
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailProduct;
