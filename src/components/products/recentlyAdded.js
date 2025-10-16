import { Eye, Heart, ShoppingCart, Star, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllProducts } from '../../stores/redux/actions/productActions';
import Loading from '../../utils/loading';

const RecentlyAdded = () => {
  const [likedItems, setLikedItems] = useState({});
  const [selectedFramework, setSelectedFramework] = useState(null);
  const dispatch = useDispatch();
  const { products, loading } = useSelector(state => state.product);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  if (loading) {
    <Loading />;
  }

  const toggleLike = (id) => {
    setLikedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Lấy danh sách framework duy nhất từ products
  const frameworks = [...new Set(products.map(product => product.framework).filter(f => f !== "N/A"))];

  // Lọc sản phẩm dựa trên framework được chọn
  const filteredProducts = selectedFramework
    ? products.filter(product => product.framework === selectedFramework).sort((a, b) => b.sold - a.sold).slice(0, 6)
    : products.sort((a, b) => b.sold - a.sold).slice(0, 6);

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="max-w-[1600px] mx-auto">
        {/* Navigation bar for frameworks */}
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            onClick={() => setSelectedFramework(null)}
            className={`px-3 py-2 rounded-lg text-sm font-medium ${!selectedFramework ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 border border-blue-500 hover:bg-blue-100'}`}
          >
            Tất cả
          </button>
          {frameworks.map((framework) => (
            <button
              key={framework}
              onClick={() => setSelectedFramework(framework)}
              className={`px-3 py-2 rounded-lg text-sm font-medium ${selectedFramework === framework ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 border border-blue-500 hover:bg-blue-100'}`}
            >
              {framework}
            </button>
          ))}
        </div>

        {/* Product Grid - 6 cột */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
            >
              {/* Badge & Heart - Compact */}
              <div className="absolute top-2 left-2 right-2 flex justify-between items-start z-10">
                {product.badge && (
                  <span className={`${product.badgeColor} text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md`}>
                    {product.badge}
                  </span>
                )}
                <button
                  onClick={() => toggleLike(product.id)}
                  className="bg-white/90 backdrop-blur-sm p-1.5 rounded-full shadow-md hover:scale-110 transition-transform"
                >
                  <Heart className={`w-3.5 h-3.5 ${likedItems[product.id] ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                </button>
              </div>

              {/* Discount Badge - Compact */}
              {product.discount && (
                <div className="absolute top-2 right-2 bg-red-500 text-white font-bold text-[10px] px-2 py-0.5 rounded-bl-xl rounded-tr-xl shadow-md z-10 mt-8">
                  -{product.discount}%
                </div>
              )}

              {/* Image Container - Smaller */}
              <div className="relative overflow-hidden bg-gray-100 h-40">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Overlay on hover - Compact buttons */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Link to={`/detail/product/${product.id}`} className="absolute bottom-2 left-2 right-2 flex gap-1.5">
                    <button className="flex-1 bg-white text-gray-800 py-1.5 px-2 rounded-lg text-xs font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center gap-1">
                      <Eye className="w-3 h-3" />
                      Xem
                    </button>
                    <button className="flex-1 bg-blue-500 text-white py-1.5 px-2 rounded-lg text-xs font-semibold hover:bg-blue-600 transition-colors flex items-center justify-center gap-1">
                      <ShoppingCart className="w-3 h-3" />
                      Mua
                    </button>
                  </Link>
                </div>
              </div>

              {/* Content - Compact */}
              <div className="p-3">
                {/* Category */}
                <span className="text-[10px] font-semibold text-blue-600 uppercase tracking-wide">
                  {product.category}
                </span>

                {/* Product Name - 2 lines max */}
                <h3 className="font-semibold text-sm text-gray-800 mt-1 mb-2 line-clamp-2 h-10 group-hover:text-blue-600 transition-colors leading-tight">
                  {product.name}
                </h3>

                {/* Framework - Thêm trường framework */}
                {product.framework && product.framework !== "N/A" && (
                  <span className="text-[10px] font-medium text-green-600 mb-1 inline-block">
                    Framework: {product.framework}
                  </span>
                )}

                {/* Rating & Sold - Compact */}
                <div className="flex items-center justify-between mb-2 text-xs">
                  <div className="flex items-center gap-0.5">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <span className="text-gray-600 ml-0.5 text-[10px]">
                      {product.rating}
                    </span>
                  </div>
                  <span className="text-gray-500 text-[10px]">
                    {product.sold > 1000 ? `${(product.sold / 1000).toFixed(1)}k` : product.sold}
                  </span>
                </div>

                {/* Features - Show only 2 */}
                <div className="flex flex-wrap gap-1 mb-2">
                  {product.features.slice(0, 2).map((feature, idx) => (
                    <span
                      key={idx}
                      className="text-[9px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded flex items-center gap-0.5"
                    >
                      <Zap className="w-2.5 h-2.5 text-blue-500" />
                      {feature}
                    </span>
                  ))}
                  {product.features.length > 2 && (
                    <span className="text-[9px] text-gray-400 px-1">
                      +{product.features.length - 2}
                    </span>
                  )}
                </div>

                {/* Price Section - Compact */}
                <div className="border-t border-gray-100 pt-2">
                  <div className="flex items-end justify-between">
                    <div>
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
                    <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                      <ShoppingCart className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Bottom accent line */}
              <div className="h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentlyAdded;
