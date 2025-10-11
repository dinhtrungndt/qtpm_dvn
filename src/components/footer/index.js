export default function Footer() {
  const logoHeader = require('../../assets/image/logo.png');

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <div className="mb-4">
              <img src={logoHeader} alt="Logo" className="h-10 w-auto" />
            </div>
            <p className="text-sm text-gray-600 mb-6">
              Tăng tốc dự án của bạn với hàng triệu sản phẩm sẵn sàng sử dụng.
            </p>
            {/* Social Icons */}
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
                <svg className="w-4 h-4 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 19.5c-4.136 0-7.5-3.364-7.5-7.5S7.864 4.5 12 4.5s7.5 3.364 7.5 7.5-3.364 7.5-7.5 7.5z" />
                </svg>
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
                <svg className="w-4 h-4 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.627-5.373-12-12-12" />
                </svg>
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
                <svg className="w-4 h-4 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
                <svg className="w-4 h-4 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Earn Column */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Kiếm tiền</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Lợi ích Đối tác</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Lợi ích Cửa hàng</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Trở thành Đại sứ</a></li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Tài nguyên</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Blog</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Bộ sưu tập</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Trung tâm Hỗ trợ</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Giấy phép</a></li>
            </ul>
          </div>

          {/* The Goods Column */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Sản phẩm</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Miễn phí</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Doanh nghiệp</a></li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Công ty</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Về chúng tôi</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Thương hiệu</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Nghề nghiệp</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-600 text-center md:text-left">
              Copyright © 2025 công ty DVN Technology Solution. Đã đăng ký Bản quyền.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-xs">
              <a href="#" className="text-gray-600 hover:text-gray-900">Chính sách Bảo mật</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Điều khoản Dịch vụ</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Tuyên bố Chatbot</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Chính sách Cookie</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Tùy chọn Cookie</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
