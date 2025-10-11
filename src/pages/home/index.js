import { SquareChevronLeft, SquareChevronRight } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import HeaderPage from '../../components/header';
import Outstanding from '../../components/products/outstanding';
import RecentlyAdded from '../../components/products/recentlyAdded';
import { slide1, slide2, slide3 } from '../../constants/images';
import '../styles/slide.css';

const HomePage = () => {
  return (
    <div>
      {/* header */}
      <HeaderPage />

      {/* body */}
      <div className="mt-4">
        {/* Sản phẩm nổi bật */}
        <div className="flex md:text-sm text-[10px] justify-center gap-6 py-2 mb-4 bg-gradient-to-r from-blue-50 via-white to-blue-50 border-y border-blue-200 shadow-sm">
          <a href="#" className="relative text-gray-700 font-semibold hover:text-blue-600 transition-colors duration-300 group">
            Petro ITM
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
          </a>
          <a href="#" className="relative text-gray-700 font-semibold hover:text-blue-600 transition-colors duration-300 group">
            Lấy phiếu
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
          </a>
          <a href="#" className="relative text-gray-700 font-semibold hover:text-blue-600 transition-colors duration-300 group">
            Kiểm kê & Tài sản
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
          </a>
          <a href="#" className="relative text-gray-700 font-semibold hover:text-blue-600 transition-colors duration-300 group">
            QL Hàng chờ
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
          </a>
          <a href="#" className="relative text-gray-700 font-semibold hover:text-blue-600 transition-colors duration-300 group">
            Thông tin
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
          </a>
        </div>
        {/* slide */}
        <div className="relative">
          {/* Custom Navigation Buttons */}
          <div className="custom-swiper-prev hidden md:flex">
            <SquareChevronLeft className="w-6 h-6 text-gray-700" />
          </div>
          <div className="custom-swiper-next hidden md:flex">
            <SquareChevronRight className="w-6 h-6 text-gray-700" />
          </div>
          <Swiper
            modules={[Navigation, Pagination]}
            navigation={{
              nextEl: '.custom-swiper-next',
              prevEl: '.custom-swiper-prev',
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true
            }}
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            speed={600}
            className="h-auto mx-auto shadow-lg overflow-hidden"
          >
            <SwiperSlide>
              <img
                src={slide1}
                alt="slide1"
                className="w-full h-36 md:h-96 object-cover transition-transform duration-300 hover:scale-105"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={slide2}
                alt="slide2"
                className="w-full h-36 md:h-96 object-cover transition-transform duration-300 hover:scale-105"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={slide3}
                alt="slide3"
                className="w-full h-36 md:h-96 object-cover transition-transform duration-300 hover:scale-105"
              />
            </SwiperSlide>
          </Swiper>
        </div>
        {/* Danh mục sản phẩm */}
        <div>
          {/* title */}
          <div className="grid grid-cols-3 items-center px-4 mt-6 mb-2">
            <div></div>
            <p className="font-medium md:text-lg text-sm text-center">Nổi bật ✮</p>
            <a href="#" className="relative text-sm font-medium text-blue-500 hover:text-blue-700 cursor-pointer transition-all duration-300 group inline-block justify-self-end">
              Xem thêm {'>'}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
            </a>
          </div>
          {/* content */}
          <p className="px-4 md:text-sm text-[10px] text-gray-500 mb-2 text-center">Khám phá những sản phẩm công nghệ hàng đầu.</p>
          {/* Danh sách Sản phẩm */}
          <Outstanding />
        </div>
        {/* Sản phẩm thêm gần đây */}
        <div>
          {/* title */}
          <div className="grid grid-cols-3 items-center px-4 mt-6 mb-2">
            <div></div>
            <p className="font-medium md:text-lg text-sm text-center">Mới thêm gần đây 📥</p>
            <a href="#" className="relative text-sm font-medium text-blue-500 hover:text-blue-700 cursor-pointer transition-all duration-300 group inline-block justify-self-end">
              Xem thêm {'>'}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
            </a>
          </div>
          {/* content */}
          <p className="px-4 md:text-sm text-[10px] text-gray-500 mb-2 text-center">Gặp gỡ những người mới của chúng tôi! Các mẫu trang web mới nhất đã được tải lên thị trường.</p>
          {/* Danh sách Sản phẩm */}
          <RecentlyAdded />
        </div>
      </div>

      {/* footer */}
    </div>
  );
};

export default HomePage;
