import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, fetchCart, removeFromCart, updateCartItem } from '../../../stores/redux/actions/cartActions';
import Loading from '../../../utils/loading';

const CartPage = () => {
  const dispatch = useDispatch();
  const { items: cart, loading, error } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleIncrease = (item) => {
    dispatch(updateCartItem(item.id, item.quantity + 1));
  };

  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      dispatch(updateCartItem(item.id, item.quantity - 1));
    }
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const totalAmount = cart.reduce(
    (sum, item) => sum + (item.product?.price || 0) * item.quantity,
    0
  );

  if (loading) {
    <Loading />;
  }

  if (error)
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex justify-center items-center">
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-red-100">
          <div className="text-red-500 text-center">
            <X className="w-12 h-12 mx-auto mb-3" />
            <p className="font-semibold">Lỗi: {error}</p>
          </div>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="container mx-auto px-4 py-8 lg:py-12 max-w-7xl">
        {/* Header */}
        <div className="mb-8 lg:mb-12 animate-fade-in">
          <div className="flex items-center gap-3 mb-2">
            <ShoppingBag className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Giỏ hàng của bạn
            </h1>
          </div>
          <p className="text-gray-500 ml-11">
            {cart.length} sản phẩm trong giỏ hàng
          </p>
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-20 animate-fade-in">
            <div className="bg-white rounded-3xl shadow-lg p-12 max-w-md mx-auto border border-gray-100">
              <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Giỏ hàng trống
              </h3>
              <p className="text-gray-500">
                Hãy thêm sản phẩm để bắt đầu mua sắm!
              </p>
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Danh sách sản phẩm */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item, index) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-4 lg:p-6 border border-gray-100 animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    {/* Image */}
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-400 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                      <img
                        src={item.product?.image || "https://via.placeholder.com/100"}
                        alt={item.product?.name || "Sản phẩm"}
                        className="w-24 h-24 lg:w-28 lg:h-28 object-cover rounded-xl shadow-md transform group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-800 text-base lg:text-lg mb-1 line-clamp-2">
                        {item.product?.name}
                      </h3>
                      <p className="text-gray-500 text-sm lg:text-base mb-3">
                        {(item.product?.price || 0).toLocaleString()}₫
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3">
                        <div className="flex items-center bg-gray-50 rounded-lg border border-gray-200 shadow-sm">
                          <button
                            onClick={() => handleDecrease(item)}
                            className="p-2 hover:bg-gray-100 transition-colors rounded-l-lg active:scale-95"
                          >
                            <Minus className="w-4 h-4 text-gray-600" />
                          </button>
                          <span className="px-4 py-2 font-semibold text-gray-800 min-w-[3rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleIncrease(item)}
                            className="p-2 hover:bg-gray-100 transition-colors rounded-r-lg active:scale-95"
                          >
                            <Plus className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>

                        <button
                          onClick={() => handleRemove(item.id)}
                          className="flex items-center gap-1 text-red-500 hover:text-red-600 text-sm font-medium hover:bg-red-50 px-3 py-2 rounded-lg transition-all active:scale-95"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span className="hidden sm:inline">Xóa</span>
                        </button>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="text-right sm:self-start sm:ml-auto">
                      <p className="text-blue-600 font-bold text-lg lg:text-xl">
                        {((item.product?.price || 0) * item.quantity).toLocaleString()}₫
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Tổng cộng - Sticky on desktop */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl p-6 lg:p-8 border border-gray-100 lg:sticky lg:top-4 animate-fade-in">
                <h2 className="text-xl lg:text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
                  <div className="w-1 h-6 bg-blue-600 rounded-full"></div>
                  Tóm tắt đơn hàng
                </h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Tạm tính:</span>
                    <span className="font-medium">{totalAmount.toLocaleString()}₫</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Phí vận chuyển:</span>
                    <span className="font-medium text-green-600">Miễn phí</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3 mt-3">
                    <div className="flex justify-between text-lg lg:text-xl font-bold text-gray-800">
                      <span>Tổng cộng:</span>
                      <span className="text-blue-600">{totalAmount.toLocaleString()}₫</span>
                    </div>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 lg:py-4 rounded-xl mb-3 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0">
                  Thanh toán
                </button>

                <button
                  onClick={handleClearCart}
                  className="w-full bg-white hover:bg-red-50 text-red-500 font-semibold py-3 rounded-xl transition-all duration-300 border-2 border-red-200 hover:border-red-300 active:scale-98"
                >
                  Xóa giỏ hàng
                </button>

                {/* Trust Badges */}
                <div className="mt-6 pt-6 border-t border-gray-200 space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                    <span>Miễn phí vận chuyển</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    </div>
                    <span>Thanh toán an toàn</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-purple-100 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    </div>
                    <span>Đổi trả trong 7 ngày</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out backwards;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .active\\:scale-95:active {
          transform: scale(0.95);
        }

        .active\\:scale-98:active {
          transform: scale(0.98);
        }
      `}</style>
    </div>
  );
};

export default CartPage;
