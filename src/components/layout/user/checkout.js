import { ArrowLeft, Minus, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchCart, removeFromCart, updateCartItem } from '../../../stores/redux/actions/cartActions';
import { buyAll } from '../../../stores/redux/actions/paymentActions';

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items: cart, loading, error } = useSelector((state) => state.cart);
  const [processing, setProcessing] = useState(false);
  const [showPaymentMethods, setShowPaymentMethods] = useState(false);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleIncrease = (item) => {
    dispatch(updateCartItem(item.id, item.quantity + 1));
  };

  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      dispatch(updateCartItem(item.id, item.quantity - 1));
    } else {
      dispatch(removeFromCart(item.id));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeFromCart(item.id));
  };

  const total = cart?.reduce((sum, i) => sum + i.product.price * i.quantity, 0) || 0;

  const handlePlaceOrder = () => {
    if (cart.length === 0) return;
    setShowPaymentMethods(true);
  };

  const handlePayment = (method) => {
    setProcessing(true);

    // Dispatch Redux buyAll với payment method
    dispatch(buyAll(method))
      .finally(() => {
        setProcessing(false);
        setShowPaymentMethods(false);
      });
  };

  if (loading) return (
    <div className="flex justify-center items-center h-80 text-gray-600 text-sm">
      Đang tải giỏ hàng...
    </div>
  );

  if (error) return (
    <div className="text-center text-red-500 py-10">
      Lỗi tải giỏ hàng: {error}
    </div>
  );

  if (!cart || cart.length === 0) return (
    <div className="flex flex-col justify-center items-center h-96 text-gray-600">
      <p>🛒 Giỏ hàng của bạn đang trống.</p>
      <button
        onClick={() => navigate("/")}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        Tiếp tục mua sắm
      </button>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-xl p-6 relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Thanh toán</h2>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 text-sm text-blue-500 hover:text-blue-700"
          >
            <ArrowLeft className="w-4 h-4" /> Quay lại
          </button>
        </div>

        {/* Cart Items */}
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border rounded-lg p-4 hover:shadow-sm transition-all"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-16 h-16 rounded-md object-cover"
                />
                <div>
                  <h3 className="text-sm font-semibold text-gray-800">
                    {item.product.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {(item.product.price / 1000).toFixed(0)}K / sản phẩm
                  </p>
                </div>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDecrease(item)}
                  className="p-1.5 bg-gray-100 rounded hover:bg-gray-200"
                >
                  <Minus className="w-3.5 h-3.5 text-gray-600" />
                </button>
                <span className="w-8 text-center text-sm">{item.quantity}</span>
                <button
                  onClick={() => handleIncrease(item)}
                  className="p-1.5 bg-gray-100 rounded hover:bg-gray-200"
                >
                  <Plus className="w-3.5 h-3.5 text-gray-600" />
                </button>
              </div>

              {/* Price + Remove */}
              <div className="flex items-center gap-3">
                <span className="font-semibold text-gray-800 text-sm">
                  {(item.product.price * item.quantity / 1000).toFixed(0)}K
                </span>
                <button
                  onClick={() => handleRemove(item)}
                  className="text-red-500 hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="border-t mt-6 pt-4 flex flex-col sm:flex-row justify-between items-center">
          <div className="text-gray-600 text-sm">
            Tổng cộng:{" "}
            <span className="text-xl font-bold text-red-500">
              {total >= 1000000
                ? `${(total / 1000000).toFixed(1)}M`
                : `${(total / 1000).toFixed(0)}K`}
            </span>
          </div>

          <button
            onClick={handlePlaceOrder}
            disabled={processing}
            className={`mt-4 sm:mt-0 bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600 transition-all ${processing && "opacity-70 cursor-not-allowed"}`}
          >
            {processing ? "Đang xử lý..." : "Đặt hàng ngay"}
          </button>
        </div>

        {/* Payment Method Modal */}
        {showPaymentMethods && (
          <div className="absolute inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl p-6 w-80 shadow-lg">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Chọn phương thức thanh toán</h3>
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => handlePayment("momo")}
                  className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-lg font-semibold transition-all"
                >
                  MoMo
                </button>
                <button
                  onClick={() => handlePayment("zalopay")}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition-all"
                >
                  ZaloPay
                </button>
                <button
                  onClick={() => handlePayment("bank")}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold transition-all"
                >
                  Ngân hàng
                </button>
                <button
                  onClick={() => setShowPaymentMethods(false)}
                  className="mt-2 text-gray-600 hover:text-gray-800"
                >
                  Hủy
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
