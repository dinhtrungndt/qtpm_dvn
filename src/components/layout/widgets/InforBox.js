import { Bookmark, Calendar, Cpu, MessageCircle, ShoppingCart, ThumbsUp, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const InforBox = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimate(true), 100);
  }, []);

  return (
    <div className="p-4">
      {/* Title */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-gray-900">Info Box</h1>
        <div className="flex items-center gap-2 text-xs">
          <Link to="/" className="text-blue-600 hover:text-blue-700 transition-colors">Trang chủ</Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-600">Info Box</span>
        </div>
      </div>

      {/* Info Box Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Default Info Boxes */}
        <div
          className={`bg-white p-4 rounded-lg shadow-md transition-all duration-700 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Cpu className="w-6 h-6 text-blue-500" />
              <h3 className="text-sm font-medium text-gray-900">CPU Traffic</h3>
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900">10%</div>
        </div>

        <div
          className={`bg-white p-4 rounded-lg shadow-md transition-all duration-700 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ transitionDelay: '100ms' }}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-6 h-6 text-green-500" />
              <h3 className="text-sm font-medium text-gray-900">Doanh Số</h3>
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900">760</div>
        </div>

        <div
          className={`bg-white p-4 rounded-lg shadow-md transition-all duration-700 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ transitionDelay: '200ms' }}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Users className="w-6 h-6 text-yellow-500" />
              <h3 className="text-sm font-medium text-gray-900">Thành Viên Mới</h3>
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900">2.000</div>
        </div>

        <div
          className={`bg-white p-4 rounded-lg shadow-md transition-all duration-700 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ transitionDelay: '300ms' }}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <ThumbsUp className="w-6 h-6 text-red-500" />
              <h3 className="text-sm font-medium text-gray-900">Thích</h3>
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900">41.410</div>
        </div>

        {/* Info Box With Custom Shadows */}
        <h2 className="col-span-full text-lg font-semibold text-gray-900 mt-6 mb-4">Info Box Với Bóng Tùy Chỉnh Sử Dụng Tiện Ích Bóng của Tailwindcss</h2>
        <div
          className={`bg-white p-4 rounded-lg shadow-lg transition-all duration-700 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ transitionDelay: '400ms' }}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Cpu className="w-6 h-6 text-blue-500" />
              <h3 className="text-sm font-medium text-gray-900">CPU Traffic</h3>
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900">10%</div>
        </div>

        <div
          className={`bg-white p-4 rounded-lg shadow-lg transition-all duration-700 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ transitionDelay: '500ms' }}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-6 h-6 text-green-500" />
              <h3 className="text-sm font-medium text-gray-900">Doanh Số</h3>
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900">760</div>
        </div>

        <div
          className={`bg-white p-4 rounded-lg shadow-lg transition-all duration-700 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ transitionDelay: '600ms' }}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Users className="w-6 h-6 text-yellow-500" />
              <h3 className="text-sm font-medium text-gray-900">Thành Viên Mới</h3>
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900">2.000</div>
        </div>

        <div
          className={`bg-white p-4 rounded-lg shadow-lg transition-all duration-700 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ transitionDelay: '700ms' }}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <ThumbsUp className="w-6 h-6 text-red-500" />
              <h3 className="text-sm font-medium text-gray-900">Thích</h3>
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900">41.410</div>
        </div>

        {/* Info Box With bg-* */}
        <h2 className="col-span-full text-lg font-semibold text-gray-900 mt-6 mb-4">Info Box với bg-*</h2>
        <div
          className={`bg-blue-500 text-white p-4 rounded-lg shadow-md transition-all duration-700 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ transitionDelay: '800ms' }}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Bookmark className="w-6 h-6" />
              <h3 className="text-sm font-medium">Bookmarks</h3>
            </div>
          </div>
          <div className="text-2xl font-bold">41.410</div>
          <div className="text-sm mt-1">70% Tăng trong 30 Ngày</div>
        </div>

        <div
          className={`bg-green-500 text-white p-4 rounded-lg shadow-md transition-all duration-700 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ transitionDelay: '900ms' }}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <ThumbsUp className="w-6 h-6" />
              <h3 className="text-sm font-medium">Thích</h3>
            </div>
          </div>
          <div className="text-2xl font-bold">41.410</div>
          <div className="text-sm mt-1">70% Tăng trong 30 Ngày</div>
        </div>

        <div
          className={`bg-yellow-500 text-white p-4 rounded-lg shadow-md transition-all duration-700 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ transitionDelay: '1000ms' }}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Calendar className="w-6 h-6" />
              <h3 className="text-sm font-medium">Sự Kiện</h3>
            </div>
          </div>
          <div className="text-2xl font-bold">41.410</div>
          <div className="text-sm mt-1">70% Tăng trong 30 Ngày</div>
        </div>

        <div
          className={`bg-red-500 text-white p-4 rounded-lg shadow-md transition-all duration-700 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ transitionDelay: '1100ms' }}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-6 h-6" />
              <h3 className="text-sm font-medium">Bình Luận</h3>
            </div>
          </div>
          <div className="text-2xl font-bold">41.410</div>
          <div className="text-sm mt-1">70% Tăng trong 30 Ngày</div>
        </div>

        {/* Info Box With bg-gradient */}
        <h2 className="col-span-full text-lg font-semibold text-gray-900 mt-6 mb-4">Info Box với bg-gradient</h2>
        <div
          className={`bg-gradient-to-r from-blue-500 to-blue-700 text-white p-4 rounded-lg shadow-md transition-all duration-700 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ transitionDelay: '1200ms' }}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Bookmark className="w-6 h-6" />
              <h3 className="text-sm font-medium">Bookmarks</h3>
            </div>
          </div>
          <div className="text-2xl font-bold">41.410</div>
          <div className="text-sm mt-1">70% Tăng trong 30 Ngày</div>
        </div>

        <div
          className={`bg-gradient-to-r from-green-500 to-green-700 text-white p-4 rounded-lg shadow-md transition-all duration-700 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ transitionDelay: '1300ms' }}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <ThumbsUp className="w-6 h-6" />
              <h3 className="text-sm font-medium">Thích</h3>
            </div>
          </div>
          <div className="text-2xl font-bold">41.410</div>
          <div className="text-sm mt-1">70% Tăng trong 30 Ngày</div>
        </div>

        <div
          className={`bg-gradient-to-r from-yellow-500 to-yellow-700 text-white p-4 rounded-lg shadow-md transition-all duration-700 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ transitionDelay: '1400ms' }}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Calendar className="w-6 h-6" />
              <h3 className="text-sm font-medium">Sự Kiện</h3>
            </div>
          </div>
          <div className="text-2xl font-bold">41.410</div>
          <div className="text-sm mt-1">70% Tăng trong 30 Ngày</div>
        </div>

        <div
          className={`bg-gradient-to-r from-red-500 to-red-700 text-white p-4 rounded-lg shadow-md transition-all duration-700 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ transitionDelay: '1500ms' }}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-6 h-6" />
              <h3 className="text-sm font-medium">Bình Luận</h3>
            </div>
          </div>
          <div className="text-2xl font-bold">41.410</div>
          <div className="text-sm mt-1">70% Tăng trong 30 Ngày</div>
        </div>
      </div>
    </div>
  );
};

export default InforBox;
