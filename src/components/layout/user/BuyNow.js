import {
  ArrowLeft,
  Building2,
  CheckCircle2,
  CreditCard,
  Info,
  Loader2,
  Package,
  Shield,
  Smartphone,
  Sparkles,
  Star,
  TrendingUp,
} from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import paymentService from '../../../services/paymentService';
import { getProductById } from '../../../stores/redux/actions/productActions';

const BuyNow = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [paymentMethod, setPaymentMethod] = useState('momo');
  const [payUrl, setPayUrl] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const { isLoading, order, error, message } = useSelector(state => state.payments);
  const { user } = useSelector(state => state.user);
  const { productDetail } = useSelector(state => state.product);

  useEffect(() => {
    if (id) dispatch(getProductById(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (!user?.id) return;
    const isHttps = window.location.protocol === 'https:';
    const wsProtocol = isHttps ? 'wss' : 'ws';
    const port = process.env.REACT_APP_API_WEB_SOCKET;

    const ws = new WebSocket(`${wsProtocol}://${port}/notifications/ws/${user.id}`);

    ws.onmessage = event => {
      const data = JSON.parse(event.data);
      if (data.type?.startsWith('payment') && data.message.includes(`#${id}`)) {
        setShowSuccess(true);
        setTimeout(() => {
          window.location.href = '/orders';
        }, 3000);
      }
    };

    return () => ws.close();
  }, [user?.id, id]);

  const handleBuyNow = async productId => {
    try {
      const res = await paymentService.buyNow(productId, paymentMethod);
      console.log('Payment result:', res);

      if (res.payUrl) {
        setPayUrl(res.payUrl);
        window.open(res.payUrl, '_blank');
      }
    } catch (err) {
      console.error('Payment error:', err);
    }
  };

  const paymentMethods = [
    {
      id: 'momo',
      name: 'MoMo',
      icon: Smartphone,
      color: 'from-pink-500 to-pink-600',
      hoverColor: 'hover:from-pink-600 hover:to-pink-700',
      description: 'Ví điện tử MoMo',
    },
    {
      id: 'zalo',
      name: 'ZaloPay',
      icon: CreditCard,
      color: 'from-blue-500 to-blue-600',
      hoverColor: 'hover:from-blue-600 hover:to-blue-700',
      description: 'Ví điện tử ZaloPay',
    },
    {
      id: 'bank',
      name: 'Ngân hàng',
      icon: Building2,
      color: 'from-green-500 to-green-600',
      hoverColor: 'hover:from-green-600 hover:to-green-700',
      description: 'Chuyển khoản ngân hàng',
    },
  ];

  // Format price
  const formatPrice = price => {
    if (!price) return '0đ';
    if (price >= 1000000) {
      return `${(price / 1000000).toFixed(1)}M đ`;
    }
    return `${(price / 1000).toFixed(0)}K đ`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Quay lại</span>
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Thanh toán
              </h1>
              <p className="text-sm md:text-base text-gray-500 mt-1">
                Chọn phương thức thanh toán của bạn
              </p>
            </div>
          </div>
        </div>

        {/* Product Detail Section - NEW */}
        {productDetail && (
          <div className="mb-6 bg-white rounded-3xl shadow-xl p-4 md:p-6 border border-gray-100 animate-slide-up">
            <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <div className="w-1 h-6 bg-purple-600 rounded-full"></div>
              Thông tin sản phẩm
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {/* Product Image */}
              <div className="relative group overflow-hidden rounded-2xl shadow-lg bg-gradient-to-br from-gray-50 to-gray-100">
                <img
                  src={productDetail.image}
                  alt={productDetail.name}
                  className="w-full h-48 md:h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {productDetail.badge && (
                  <div
                    className={`absolute top-3 left-3 ${
                      productDetail.badgeColor || 'bg-red-500'
                    } text-white text-xs md:text-sm font-bold px-3 py-1 rounded-full shadow-lg`}
                  >
                    {productDetail.badge}
                  </div>
                )}
                {productDetail.discount && (
                  <div className="absolute top-3 right-3 bg-red-500 text-white text-xs md:text-sm font-bold px-3 py-1 rounded-full shadow-lg">
                    -{productDetail.discount}%
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="space-y-3 md:space-y-4">
                {/* Category Badge */}
                <span className="inline-block text-xs md:text-sm font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-3 py-1.5 rounded-full">
                  {productDetail.category}
                </span>

                {/* Product Name */}
                <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 leading-tight line-clamp-2">
                  {productDetail.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 md:w-5 md:h-5 ${
                          i < Math.floor(productDetail.rating || 0)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm md:text-base font-semibold text-gray-700">
                    {productDetail.rating || 0}
                  </span>
                  <span className="text-xs md:text-sm text-gray-500">
                    ({productDetail.reviews || productDetail.sold || 0} đánh giá)
                  </span>
                </div>

                {/* Framework */}
                {productDetail.framework && productDetail.framework !== 'N/A' && (
                  <div className="flex items-center gap-2 bg-green-50 px-3 py-2 rounded-lg border border-green-200">
                    <Package className="w-4 h-4 text-green-600" />
                    <span className="text-xs md:text-sm font-semibold text-green-700">
                      Framework: {productDetail.framework}
                    </span>
                  </div>
                )}

                {/* Features - Show top 3 */}
                {productDetail.features && productDetail.features.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs md:text-sm font-semibold text-gray-700">
                      Tính năng nổi bật:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {productDetail.features.slice(0, 3).map((feature, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-gray-100 text-gray-700 px-2.5 py-1 rounded-lg flex items-center gap-1"
                        >
                          <CheckCircle2 className="w-3 h-3 text-blue-500" />
                          {feature}
                        </span>
                      ))}
                      {productDetail.features.length > 3 && (
                        <span className="text-xs text-gray-400 px-2.5 py-1">
                          +{productDetail.features.length - 3} khác
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Price & Stats */}
              <div className="space-y-4">
                {/* Price Card */}
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-4 md:p-6 border-2 border-blue-100">
                  <p className="text-xs md:text-sm text-gray-600 mb-2">Giá sản phẩm:</p>
                  {productDetail.originalPrice && (
                    <span className="text-base md:text-lg text-gray-400 line-through block mb-1">
                      {formatPrice(productDetail.originalPrice)}
                    </span>
                  )}
                  <div className="flex items-end gap-2">
                    <span className="text-2xl md:text-3xl lg:text-4xl font-bold text-red-500">
                      {formatPrice(productDetail.price)}
                    </span>
                  </div>
                  {productDetail.originalPrice && (
                    <p className="text-xs md:text-sm text-green-600 font-semibold mt-2">
                      Tiết kiệm: {formatPrice(productDetail.originalPrice - productDetail.price)}
                    </p>
                  )}
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-2 md:gap-3">
                  <div className="bg-white p-3 rounded-xl shadow-sm text-center border border-gray-100">
                    <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-green-500 mx-auto mb-1" />
                    <p className="text-base md:text-xl font-bold text-gray-900">
                      {productDetail.sold || 0}
                    </p>
                    <p className="text-[10px] md:text-xs text-gray-500">Đã bán</p>
                  </div>
                  <div className="bg-white p-3 rounded-xl shadow-sm text-center border border-gray-100">
                    <Package className="w-5 h-5 md:w-6 md:h-6 text-blue-500 mx-auto mb-1" />
                    <p className="text-base md:text-xl font-bold text-gray-900">48h</p>
                    <p className="text-[10px] md:text-xs text-gray-500">Giao hàng</p>
                  </div>
                  <div className="bg-white p-3 rounded-xl shadow-sm text-center border border-gray-100">
                    <Shield className="w-5 h-5 md:w-6 md:h-6 text-purple-500 mx-auto mb-1" />
                    <p className="text-base md:text-xl font-bold text-gray-900">1 năm</p>
                    <p className="text-[10px] md:text-xs text-gray-500">Bảo hành</p>
                  </div>
                </div>

                {/* Info Alert */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 flex items-start gap-2">
                  <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <p className="text-xs md:text-sm text-blue-700">
                    Bạn đang mua <span className="font-semibold">{productDetail.name}</span>. Vui
                    lòng kiểm tra thông tin trước khi thanh toán.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Payment Section */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Payment Methods Section */}
          <div className="bg-white rounded-3xl shadow-xl p-4 md:p-6 lg:p-8 border border-gray-100 animate-slide-left">
            <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4 md:mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-blue-600 rounded-full"></div>
              Phương thức thanh toán
            </h2>

            <div className="space-y-3 md:space-y-4">
              {paymentMethods.map((method, index) => {
                const Icon = method.icon;
                const isSelected = paymentMethod === method.id;

                return (
                  <button
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={`w-full p-3 md:p-4 rounded-2xl border-2 transition-all duration-300 text-left animate-slide-right ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50 shadow-lg scale-105'
                        : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center gap-3 md:gap-4">
                      <div
                        className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${method.color} shadow-md flex-shrink-0`}
                      >
                        <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-800 text-base md:text-lg truncate">
                          {method.name}
                        </h3>
                        <p className="text-xs md:text-sm text-gray-500 truncate">
                          {method.description}
                        </p>
                      </div>
                      <div
                        className={`w-5 h-5 md:w-6 md:h-6 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0 ${
                          isSelected ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
                        }`}
                      >
                        {isSelected && (
                          <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4 text-white" />
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Payment Button */}
            <button
              onClick={() => handleBuyNow(id)}
              disabled={isLoading || !!payUrl}
              className={`w-full mt-4 md:mt-6 py-3 md:py-4 rounded-2xl font-bold text-white shadow-xl transition-all duration-300 flex items-center justify-center gap-2 text-sm md:text-base ${
                isLoading || payUrl
                  ? 'bg-gray-400 cursor-not-allowed'
                  : `bg-gradient-to-r ${paymentMethods.find(m => m.id === paymentMethod)?.color} ${
                      paymentMethods.find(m => m.id === paymentMethod)?.hoverColor
                    } hover:shadow-2xl hover:-translate-y-1 active:translate-y-0`
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 md:w-5 md:h-5 animate-spin" />
                  <span>Đang xử lý...</span>
                </>
              ) : payUrl ? (
                <>
                  <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5" />
                  <span>Đã tạo thanh toán</span>
                </>
              ) : (
                <span>Mua ngay - {formatPrice(productDetail?.price || 0)}</span>
              )}
            </button>

            {/* Messages */}
            {message && (
              <div className="mt-4 p-3 md:p-4 bg-green-50 border border-green-200 rounded-xl animate-fade-in">
                <p className="text-green-700 text-xs md:text-sm font-medium flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                  <span>{message}</span>
                </p>
              </div>
            )}

            {error && (
              <div className="mt-4 p-3 md:p-4 bg-red-50 border border-red-200 rounded-xl animate-fade-in">
                <p className="text-red-700 text-xs md:text-sm font-medium">{error}</p>
              </div>
            )}
          </div>

          {/* QR Code Section */}
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-xl p-4 md:p-6 lg:p-8 border border-gray-100 animate-slide-right">
            {payUrl ? (
              <div className="text-center animate-scale-in">
                <div className="mb-4 md:mb-6">
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <CheckCircle2 className="w-7 h-7 md:w-8 md:h-8 text-white" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">Quét mã QR</h3>
                  <p className="text-sm md:text-base text-gray-600">
                    Sử dụng ứng dụng để thanh toán
                  </p>
                </div>

                {/* QR Code */}
                <div className="bg-white p-4 md:p-6 rounded-3xl shadow-2xl inline-block mx-auto mb-4 md:mb-6 border-4 border-gray-100">
                  <QRCodeCanvas
                    value={payUrl}
                    size={window.innerWidth < 768 ? 200 : 240}
                    level="H"
                    includeMargin={true}
                  />
                </div>

                {/* Instructions */}
                <div className="space-y-3 text-left bg-blue-50 p-3 md:p-4 rounded-2xl">
                  <h4 className="font-semibold text-gray-800 mb-2 text-sm md:text-base">
                    Hướng dẫn thanh toán:
                  </h4>
                  <div className="space-y-2 text-xs md:text-sm text-gray-600">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                        1
                      </div>
                      <p>Mở ứng dụng {paymentMethods.find(m => m.id === paymentMethod)?.name}</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                        2
                      </div>
                      <p>Quét mã QR hoặc click vào link đã mở</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                        3
                      </div>
                      <p>Xác nhận thanh toán</p>
                    </div>
                  </div>
                </div>

                {/* Scanning Animation */}
                <div className="mt-4 md:mt-6 flex items-center justify-center gap-2 text-blue-600">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-xs md:text-sm font-medium">Đang chờ thanh toán...</span>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center py-8 md:py-12 animate-fade-in">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mb-4 md:mb-6">
                  <Smartphone className="w-10 h-10 md:w-12 md:h-12 text-blue-500" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">
                  Sẵn sàng thanh toán
                </h3>
                <p className="text-sm md:text-base text-gray-500 max-w-xs px-4">
                  Chọn phương thức thanh toán và nhấn "Mua ngay" để tạo mã QR
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Trust Badges */}
        <div
          className="mt-6 md:mt-8 bg-white rounded-3xl shadow-lg p-4 md:p-6 border border-gray-100 animate-fade-in"
          style={{ animationDelay: '0.3s' }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-800 text-sm md:text-base">Bảo mật cao</h4>
              <p className="text-xs md:text-sm text-gray-500">Mã hóa SSL 256-bit</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-800 text-sm md:text-base">Nhanh chóng</h4>
              <p className="text-xs md:text-sm text-gray-500">Xử lý tức thì</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <CreditCard className="w-5 h-5 md:w-6 md:h-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-800 text-sm md:text-base">Đa dạng</h4>
              <p className="text-xs md:text-sm text-gray-500">Nhiều phương thức</p>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 md:p-8 text-center animate-scale-in">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-xl animate-bounce-in">
              <CheckCircle2 className="w-8 h-8 md:w-10 md:h-10 text-white" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
              Thanh toán thành công!
            </h3>
            <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">
              Đơn hàng của bạn đã được xác nhận
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full animate-progress"></div>
            </div>
            <p className="text-xs md:text-sm text-gray-500">Đang chuyển hướng...</p>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-left {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-right {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes bounce-in {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out;
        }

        .animate-slide-left {
          animation: slide-left 0.6s ease-out;
        }

        .animate-slide-right {
          animation: slide-right 0.6s ease-out backwards;
        }

        .animate-scale-in {
          animation: scale-in 0.4s ease-out;
        }

        .animate-bounce-in {
          animation: bounce-in 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        .animate-progress {
          animation: progress 3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default BuyNow;
