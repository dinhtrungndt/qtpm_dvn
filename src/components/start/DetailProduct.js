import {
  ArrowLeft, Check, ChevronRight, Eye, Heart, Package, Share2, Shield, ShoppingCart, Star, TrendingUp, Zap
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getProductById } from '../../stores/redux/actions/productActions';

const DetailProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { products, productDetail, isLoading } = useSelector((state) => state.product);

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [showAddedToCart, setShowAddedToCart] = useState(false);

  useEffect(() => {
    if (id) dispatch(getProductById(id));
  }, [id, dispatch]);

  if (isLoading || !productDetail) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải sản phẩm...</p>
        </div>
      </div>
    );
  }

  const product = productDetail;

  const handleAddToCart = () => {
    setShowAddedToCart(true);
    setTimeout(() => setShowAddedToCart(false), 3000);
  };

  const relatedProducts = products
    ? products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)
    : [];

  const images = [product.image, product.image, product.image];

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Success Toast */}
      {showAddedToCart && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in-right">
          <div className="bg-green-500 text-white px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3">
            <Check className="w-6 h-6" />
            <span className="font-semibold">Đã thêm vào giỏ hàng!</span>
          </div>
        </div>
      )}

      {/* Breadcrumb & Back Button */}
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Quay lại</span>
            </button>

            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Link to="/" className="hover:text-blue-600 transition-colors">Trang chủ</Link>
              <ChevronRight className="w-4 h-4" />
              <Link to={`/?category=${product.category}`} className="hover:text-blue-600 transition-colors">
                {product.category}
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-gray-900 font-medium truncate max-w-[200px]">{product.name}</span>
            </div>

            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Share2 className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Image Gallery */}
          <div className="space-y-4 animate-fade-in">
            {/* Main Image */}
            <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden group">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-[500px] object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.badge && (
                  <span className={`${product.badgeColor} text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg`}>
                    {product.badge}
                  </span>
                )}
                {product.discount && (
                  <span className="bg-red-500 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg">
                    -{product.discount}%
                  </span>
                )}
              </div>

              {/* View Count */}
              <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-full flex items-center gap-2">
                <Eye className="w-4 h-4" />
                <span className="text-sm font-medium">{product.sold} lượt xem</span>
              </div>
            </div>

            {/* Thumbnail Gallery */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden border-4 transition-all ${selectedImage === idx
                    ? 'border-blue-500 scale-105 shadow-lg'
                    : 'border-transparent hover:border-gray-300'
                    }`}
                >
                  <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6 animate-fade-in-delayed">
            {/* Category & Rating */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-4 py-2 rounded-full">
                {product.category}
              </span>
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(product.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                        }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-semibold text-gray-700">
                  {product.rating} ({product.reviews || product.sold} đánh giá)
                </span>
              </div>
            </div>

            {/* Product Name */}
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
              {product.name}
            </h1>

            {/* Framework */}
            {product.framework && product.framework !== "N/A" && (
              <div className="flex items-center gap-2 bg-green-50 px-4 py-3 rounded-xl border border-green-200">
                <Zap className="w-5 h-5 text-green-600" />
                <span className="text-sm font-semibold text-green-700">
                  Framework: {product.framework}
                </span>
              </div>
            )}

            {/* Price Section */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border-2 border-blue-100">
              <div className="flex items-end gap-4 mb-2">
                {product.originalPrice && (
                  <span className="text-2xl text-gray-400 line-through">
                    {(product.originalPrice / 1000000).toFixed(1)}M ₫
                  </span>
                )}
                <span className="text-5xl font-bold text-red-500">
                  {product.price >= 1000000
                    ? `${(product.price / 1000000).toFixed(1)}M`
                    : `${(product.price / 1000).toFixed(0)}K`} ₫
                </span>
              </div>
              {product.originalPrice && (
                <p className="text-sm text-green-600 font-semibold">
                  Tiết kiệm: {((product.originalPrice - product.price) / 1000000).toFixed(1)}M ₫
                </p>
              )}
            </div>

            {/* Features */}
            <div className="space-y-3">
              <h3 className="font-bold text-lg text-gray-900">Tính năng nổi bật:</h3>
              <div className="grid grid-cols-2 gap-3">
                {product.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 bg-white p-3 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                  >
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Check className="w-5 h-5 text-blue-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-xl shadow-sm text-center border border-gray-100">
                <TrendingUp className="w-6 h-6 text-green-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{product.sold}</p>
                <p className="text-xs text-gray-500">Đã bán</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm text-center border border-gray-100">
                <Package className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">48h</p>
                <p className="text-xs text-gray-500">Giao hàng</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm text-center border border-gray-100">
                <Shield className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">1 năm</p>
                <p className="text-xs text-gray-500">Bảo hành</p>
              </div>
            </div>

            {/* Quantity & Actions */}
            <div className="space-y-4 bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <div className="flex items-center gap-4">
                <span className="text-sm font-semibold text-gray-700">Số lượng:</span>
                <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 bg-white rounded-lg hover:bg-gray-200 transition-colors font-bold"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 bg-white rounded-lg hover:bg-gray-200 transition-colors font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-6 h-6" />
                  Thêm vào giỏ
                </button>
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`p-4 rounded-xl border-2 transition-all ${isLiked
                    ? 'bg-red-50 border-red-500'
                    : 'bg-white border-gray-300 hover:border-red-500'
                    }`}
                >
                  <Heart
                    className={`w-6 h-6 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'
                      }`}
                  />
                </button>
              </div>

              <button className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-xl font-bold text-lg hover:from-green-600 hover:to-green-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                Mua ngay
              </button>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-12 animate-fade-in">
          <div className="flex gap-4 border-b border-gray-200 mb-6">
            {['description', 'specifications', 'reviews'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 px-4 font-semibold transition-all relative ${activeTab === tab
                  ? 'text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                {tab === 'description' && 'Mô tả'}
                {tab === 'specifications' && 'Thông số'}
                {tab === 'reviews' && 'Đánh giá'}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-t-lg"></div>
                )}
              </button>
            ))}
          </div>

          <div className="prose max-w-none">
            {activeTab === 'description' && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900">Chi tiết sản phẩm</h3>
                <p className="text-gray-600 leading-relaxed">
                  {product.name} là giải pháp hoàn hảo cho doanh nghiệp của bạn.
                  Với các tính năng tiên tiến và giao diện thân thiện, sản phẩm giúp
                  tối ưu hóa quy trình làm việc và nâng cao hiệu suất.
                </p>
              </div>
            )}
            {activeTab === 'specifications' && (
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex justify-between py-3 border-b">
                  <span className="font-semibold">Danh mục:</span>
                  <span className="text-gray-600">{product.category}</span>
                </div>
                <div className="flex justify-between py-3 border-b">
                  <span className="font-semibold">Framework:</span>
                  <span className="text-gray-600">{product.framework}</span>
                </div>
                <div className="flex justify-between py-3 border-b">
                  <span className="font-semibold">Bảo hành:</span>
                  <span className="text-gray-600">12 tháng</span>
                </div>
                <div className="flex justify-between py-3 border-b">
                  <span className="font-semibold">Hỗ trợ:</span>
                  <span className="text-gray-600">24/7</span>
                </div>
              </div>
            )}
            {activeTab === 'reviews' && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900">
                  Đánh giá từ khách hàng ({product.reviews || product.sold})
                </h3>
                <p className="text-gray-600">Chưa có đánh giá nào.</p>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Sản phẩm liên quan</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map((p) => (
                <Link
                  key={p.id}
                  to={`/detail/product/${p.id}`}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-sm text-gray-900 line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors">
                      {p.name}
                    </h3>
                    <p className="text-lg font-bold text-red-500">
                      {p.price >= 1000000
                        ? `${(p.price / 1000000).toFixed(1)}M`
                        : `${(p.price / 1000).toFixed(0)}K`} ₫
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Add custom animations */}
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-in-right {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-fade-in-delayed {
          animation: fade-in 0.6s ease-out 0.2s both;
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.4s ease-out;
        }
      `}</style>
    </div>
  );
};

export default DetailProduct;
