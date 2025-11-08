import { ChevronDown, ChevronUp, Inbox, Loader, Menu, User, X } from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const UI_General = () => {
  const [activeAccordion, setActiveAccordion] = useState(0);
  const [checkboxes, setCheckboxes] = useState({
    checkbox1: true,
    checkbox2: false,
    checkbox3: false,
  });
  const [selectedRadio, setSelectedRadio] = useState('radio1');
  const [isCollapseOpen, setIsCollapseOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const handleCheckbox = (name) => {
    setCheckboxes(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const toggleDropdown = (dropdownName) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  const handleShowToast = (type) => {
    // Toast functionality can be implemented here
    console.log(`Showing ${type} toast`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Các Thành Phần UI Chung</h1>
        <div className="flex items-center gap-2 text-sm">
          <Link to="/" className="text-blue-600 hover:text-blue-700 hover:underline transition-colors font-medium">
            Trang chủ
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-700 font-medium">Các Thành Phần UI Chung</span>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-cyan-50 border border-cyan-200 rounded-xl p-4 mb-6 animate-fade-in">
        <p className="text-cyan-900 text-sm sm:text-base">
          Để xem tài liệu chi tiết về Components, hãy truy cập{' '}
          <a
            href="https://tailwindcss.com/docs/installation"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-700 font-semibold hover:underline"
          >
            TailwindCSS Components
          </a>
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Accordion Section */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden animate-fade-in">
          <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-white to-gray-50">
            <h2 className="text-xl font-bold text-gray-900">Accordion (Bảng Mở Rộng)</h2>
          </div>

          <div className="p-6">
            {/* Accordion Item 1 */}
            <div className="mb-3">
              <button
                onClick={() => toggleAccordion(0)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-300 ${activeAccordion === 0
                  ? 'bg-blue-100 text-blue-900'
                  : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                  }`}
              >
                <span className="font-semibold">Mục Accordion #1</span>
                {activeAccordion === 0 ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${activeAccordion === 0 ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0'
                  }`}
              >
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-gray-700 leading-relaxed mb-3">
                    <strong className="text-gray-900">Đây là nội dung của mục accordion đầu tiên.</strong> Nó được hiển thị mặc định, cho đến khi plugin collapse thêm các class thích hợp mà chúng ta sử dụng để tạo kiểu cho từng phần tử.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Các class này kiểm soát giao diện tổng thể, cũng như hiển thị và ẩn thông qua CSS transitions. Bạn có thể sửa đổi bất kỳ điều gì trong số này bằng CSS tùy chỉnh hoặc ghi đè các biến mặc định của chúng tôi. Cũng cần lưu ý rằng hầu như bất kỳ HTML nào cũng có thể nằm trong{' '}
                    <code className="px-2 py-0.5 bg-pink-100 text-pink-700 rounded text-sm">.accordion-body</code>, mặc dù quá trình chuyển đổi giới hạn tràn.
                  </p>
                </div>
              </div>
            </div>

            {/* Accordion Item 2 */}
            <div className="mb-3">
              <button
                onClick={() => toggleAccordion(1)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-300 ${activeAccordion === 1
                  ? 'bg-blue-100 text-blue-900'
                  : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                  }`}
              >
                <span className="font-semibold">Mục Accordion #2</span>
                {activeAccordion === 1 ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${activeAccordion === 1 ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0'
                  }`}
              >
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-gray-700 leading-relaxed">
                    Nội dung của mục accordion thứ hai. Bạn có thể thêm bất kỳ nội dung nào bạn muốn ở đây.
                  </p>
                </div>
              </div>
            </div>

            {/* Accordion Item 3 */}
            <div>
              <button
                onClick={() => toggleAccordion(2)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-300 ${activeAccordion === 2
                  ? 'bg-blue-100 text-blue-900'
                  : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                  }`}
              >
                <span className="font-semibold">Mục Accordion #3</span>
                {activeAccordion === 2 ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${activeAccordion === 2 ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0'
                  }`}
              >
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-gray-700 leading-relaxed">
                    Nội dung của mục accordion thứ ba. Component này có thể chứa nhiều loại nội dung khác nhau.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Button Group & Other Components */}
        <div className="space-y-6">
          {/* Button Group */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-white to-gray-50">
              <h2 className="text-xl font-bold text-gray-900">Nhóm Nút (Button Group)</h2>
            </div>

            <div className="p-6 space-y-6">
              {/* Basic Button Group */}
              <div>
                <h3 className="text-sm font-semibold text-gray-600 mb-3 uppercase tracking-wider">Nhóm nút cơ bản</h3>
                <div className="flex flex-wrap gap-2">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                    Trái
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                    Giữa
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                    Phải
                  </button>
                </div>
              </div>

              {/* Colored Button Group */}
              <div>
                <h3 className="text-sm font-semibold text-gray-600 mb-3 uppercase tracking-wider">Nút nhiều màu</h3>
                <div className="flex flex-wrap gap-2">
                  <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium">
                    Trái
                  </button>
                  <button className="px-4 py-2 bg-yellow-500 text-gray-900 rounded-lg hover:bg-yellow-600 transition-colors font-medium">
                    Giữa
                  </button>
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
                    Phải
                  </button>
                </div>
              </div>

              {/* Outlined Button Group */}
              <div>
                <h3 className="text-sm font-semibold text-gray-600 mb-3 uppercase tracking-wider">Nút viền</h3>
                <div className="flex flex-wrap gap-2">
                  <button className="px-4 py-2 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium">
                    Trái
                  </button>
                  <button className="px-4 py-2 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium">
                    Giữa
                  </button>
                  <button className="px-4 py-2 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium">
                    Phải
                  </button>
                </div>
              </div>

              {/* Checkboxes */}
              <div>
                <h3 className="text-sm font-semibold text-gray-600 mb-3 uppercase tracking-wider">Checkbox</h3>
                <div className="flex flex-wrap gap-3">
                  {Object.keys(checkboxes).map((key, index) => (
                    <label key={key} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={checkboxes[key]}
                        onChange={() => handleCheckbox(key)}
                        className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer transition-all"
                      />
                      <span className="text-gray-700 font-medium group-hover:text-blue-600 transition-colors">
                        Checkbox {index + 1}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Radio Buttons */}
              <div>
                <h3 className="text-sm font-semibold text-gray-600 mb-3 uppercase tracking-wider">Radio Button</h3>
                <div className="flex flex-wrap gap-3">
                  {['radio1', 'radio2', 'radio3'].map((radio, index) => (
                    <label key={radio} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="radio"
                        name="radio-group"
                        checked={selectedRadio === radio}
                        onChange={() => setSelectedRadio(radio)}
                        className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-2 focus:ring-blue-500 cursor-pointer transition-all"
                      />
                      <span className="text-gray-700 font-medium group-hover:text-blue-600 transition-colors">
                        Radio {index + 1}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Number Buttons */}
              <div>
                <h3 className="text-sm font-semibold text-gray-600 mb-3 uppercase tracking-wider">Nút số & Dropdown</h3>
                <div className="flex flex-wrap gap-2">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                    1
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                    2
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2">
                    Dropdown
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Collapse Section */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-white to-gray-50">
              <h2 className="text-xl font-bold text-gray-900">Collapse (Thu Gọn)</h2>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setIsCollapseOpen(!isCollapseOpen)}
                  className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Link với href
                </button>
                <button
                  onClick={() => setIsCollapseOpen(!isCollapseOpen)}
                  className="px-5 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  Button với data-bs-target
                </button>
              </div>

              <div
                className={`overflow-hidden transition-all duration-300 ${isCollapseOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
              >
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 mt-3">
                  <p className="text-gray-700 leading-relaxed">
                    Đây là nội dung được hiển thị khi bạn nhấp vào nút collapse.
                    Bạn có thể đặt bất kỳ nội dung HTML nào ở đây.
                    Component này rất hữu ích để ẩn/hiện nội dung một cách mượt mà.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Alert Section */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden animate-fade-in">
          <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-white to-gray-50">
            <h2 className="text-xl font-bold text-gray-900">Alert (Thông Báo)</h2>
          </div>

          <div className="p-6 space-y-3">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-900">
                Một thông báo primary đơn giản với{' '}
                <a href="#" className="font-semibold underline hover:text-blue-700">liên kết ví dụ</a>.
                Hãy nhấp vào nó nếu bạn thích.
              </p>
            </div>

            <div className="bg-gray-100 border border-gray-300 rounded-lg p-4">
              <p className="text-gray-800">
                Một thông báo secondary đơn giản với{' '}
                <a href="#" className="font-semibold underline hover:text-gray-600">liên kết ví dụ</a>.
                Hãy nhấp vào nó nếu bạn thích.
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-900">
                Một thông báo success đơn giản với{' '}
                <a href="#" className="font-semibold underline hover:text-green-700">liên kết ví dụ</a>.
                Hãy nhấp vào nó nếu bạn thích.
              </p>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-900">
                Một thông báo danger đơn giản với{' '}
                <a href="#" className="font-semibold underline hover:text-red-700">liên kết ví dụ</a>.
                Hãy nhấp vào nó nếu bạn thích.
              </p>
            </div>

            <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4">
              <p className="text-yellow-900">
                Một thông báo warning đơn giản với{' '}
                <a href="#" className="font-semibold underline hover:text-yellow-700">liên kết ví dụ</a>.
                Hãy nhấp vào nó nếu bạn thích.
              </p>
            </div>

            <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4">
              <p className="text-cyan-900">
                Một thông báo info đơn giản với{' '}
                <a href="#" className="font-semibold underline hover:text-cyan-700">liên kết ví dụ</a>.
                Hãy nhấp vào nó nếu bạn thích.
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <p className="text-gray-700">
                Một thông báo light đơn giản với{' '}
                <a href="#" className="font-semibold underline hover:text-gray-600">liên kết ví dụ</a>.
                Hãy nhấp vào nó nếu bạn thích.
              </p>
            </div>

            <div className="bg-gray-700 border border-gray-800 rounded-lg p-4">
              <p className="text-gray-100">
                Một thông báo dark đơn giản với{' '}
                <a href="#" className="font-semibold underline hover:text-white">liên kết ví dụ</a>.
                Hãy nhấp vào nó nếu bạn thích.
              </p>
            </div>
          </div>
        </div>

        {/* Badge & Button Section */}
        <div className="space-y-6">
          {/* Badge Section */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-white to-gray-50">
              <h2 className="text-xl font-bold text-gray-900">Badge (Huy Hiệu)</h2>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <h1 className="text-4xl font-bold text-gray-900">
                  Example heading <span className="inline-block px-3 py-1 text-base font-semibold bg-gray-500 text-white rounded">New</span>
                </h1>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">
                  Example heading <span className="inline-block px-2.5 py-1 text-sm font-semibold bg-gray-500 text-white rounded">New</span>
                </h2>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Example heading <span className="inline-block px-2 py-0.5 text-sm font-semibold bg-gray-500 text-white rounded">New</span>
                </h3>
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900">
                  Example heading <span className="inline-block px-2 py-0.5 text-xs font-semibold bg-gray-500 text-white rounded">New</span>
                </h4>
              </div>
              <div>
                <h5 className="text-lg font-bold text-gray-900">
                  Example heading <span className="inline-block px-1.5 py-0.5 text-xs font-semibold bg-gray-500 text-white rounded">New</span>
                </h5>
              </div>
              <div>
                <h6 className="text-base font-bold text-gray-900">
                  Example heading <span className="inline-block px-1.5 py-0.5 text-xs font-semibold bg-gray-500 text-white rounded">New</span>
                </h6>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <button className="relative px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  Notifications
                  <span className="absolute -top-2 -right-2 flex items-center justify-center w-6 h-6 text-xs font-bold bg-red-500 text-white rounded-full">
                    4
                  </span>
                </button>
              </div>

              <div className="flex items-center gap-2 pt-4">
                <button className="relative px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2">
                  <Inbox className="w-5 h-5" />
                  Inbox
                  <span className="flex items-center justify-center px-2 py-0.5 text-xs font-bold bg-red-500 text-white rounded-full">
                    99+
                  </span>
                </button>

                <button className="relative px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Profile
                  <span className="flex items-center justify-center w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
              </div>

              <div className="flex flex-wrap gap-2 pt-4">
                <span className="px-3 py-1 text-sm font-semibold bg-blue-600 text-white rounded-full">Primary</span>
                <span className="px-3 py-1 text-sm font-semibold bg-gray-500 text-white rounded-full">Secondary</span>
                <span className="px-3 py-1 text-sm font-semibold bg-green-600 text-white rounded-full">Success</span>
                <span className="px-3 py-1 text-sm font-semibold bg-red-600 text-white rounded-full">Danger</span>
                <span className="px-3 py-1 text-sm font-semibold bg-yellow-500 text-gray-900 rounded-full">Warning</span>
                <span className="px-3 py-1 text-sm font-semibold bg-cyan-500 text-white rounded-full">Info</span>
                <span className="px-3 py-1 text-sm font-semibold bg-gray-200 text-gray-800 rounded-full">Light</span>
                <span className="px-3 py-1 text-sm font-semibold bg-gray-800 text-white rounded-full">Dark</span>
              </div>

              <div className="flex flex-wrap gap-2 pt-4">
                <span className="px-2.5 py-1 text-sm font-semibold bg-blue-600 text-white rounded">Primary</span>
                <span className="px-2.5 py-1 text-sm font-semibold bg-gray-500 text-white rounded">Secondary</span>
                <span className="px-2.5 py-1 text-sm font-semibold bg-green-600 text-white rounded">Success</span>
                <span className="px-2.5 py-1 text-sm font-semibold bg-red-600 text-white rounded">Danger</span>
                <span className="px-2.5 py-1 text-sm font-semibold bg-yellow-500 text-gray-900 rounded">Warning</span>
                <span className="px-2.5 py-1 text-sm font-semibold bg-cyan-500 text-white rounded">Info</span>
                <span className="px-2.5 py-1 text-sm font-semibold bg-gray-200 text-gray-800 rounded">Light</span>
                <span className="px-2.5 py-1 text-sm font-semibold bg-gray-800 text-white rounded">Dark</span>
              </div>
            </div>
          </div>

          {/* Button Section */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-white to-gray-50">
              <h2 className="text-xl font-bold text-gray-900">Button (Nút Bấm)</h2>
            </div>

            <div className="p-6 space-y-6">
              <div className="flex flex-wrap gap-2">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">Primary</button>
                <button className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium">Secondary</button>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">Success</button>
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium">Danger</button>
                <button className="px-4 py-2 bg-yellow-500 text-gray-900 rounded-lg hover:bg-yellow-600 transition-colors font-medium">Warning</button>
                <button className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors font-medium">Info</button>
                <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium">Light</button>
                <button className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors font-medium">Dark</button>
                <a href="#" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium inline-block">Link</a>
              </div>

              <div className="flex flex-wrap gap-2">
                <button className="px-4 py-2 bg-blue-400 text-white rounded-lg cursor-not-allowed font-medium opacity-60">Primary (disabled)</button>
                <button className="px-4 py-2 bg-gray-400 text-white rounded-lg cursor-not-allowed font-medium opacity-60">Secondary (disabled)</button>
                <button className="px-4 py-2 bg-green-400 text-white rounded-lg cursor-not-allowed font-medium opacity-60">Success (disabled)</button>
                <button className="px-4 py-2 bg-red-400 text-white rounded-lg cursor-not-allowed font-medium opacity-60">Danger (disabled)</button>
                <button className="px-4 py-2 bg-yellow-400 text-gray-800 rounded-lg cursor-not-allowed font-medium opacity-60">Warning (disabled)</button>
                <button className="px-4 py-2 bg-cyan-400 text-white rounded-lg cursor-not-allowed font-medium opacity-60">Info (disabled)</button>
              </div>

              <div className="flex flex-wrap gap-2">
                <button className="px-4 py-2 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium">Primary</button>
                <button className="px-4 py-2 border-2 border-gray-500 text-gray-500 rounded-lg hover:bg-gray-50 transition-colors font-medium">Secondary</button>
                <button className="px-4 py-2 border-2 border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors font-medium">Success</button>
                <button className="px-4 py-2 border-2 border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition-colors font-medium">Danger</button>
                <button className="px-4 py-2 border-2 border-yellow-500 text-yellow-600 rounded-lg hover:bg-yellow-50 transition-colors font-medium">Warning</button>
                <button className="px-4 py-2 border-2 border-cyan-500 text-cyan-500 rounded-lg hover:bg-cyan-50 transition-colors font-medium">Info</button>
                <button className="px-4 py-2 border-2 border-gray-800 text-gray-800 rounded-lg hover:bg-gray-50 transition-colors font-medium">Dark</button>
              </div>

              <div className="flex flex-wrap gap-2 items-center">
                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg">Large button</button>
                <button className="px-3 py-1.5 bg-yellow-500 text-gray-900 rounded-lg hover:bg-yellow-600 transition-colors font-medium text-sm">Small button</button>
                <button className="px-2 py-1 bg-pink-600 text-white rounded hover:bg-pink-700 transition-colors font-medium text-xs">Custom button</button>
              </div>
            </div>
          </div>
        </div>

        {/* Collapse & Dropdown Section */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-white to-gray-50">
            <h2 className="text-xl font-bold text-gray-900">Collapse (Thu Gọn)</h2>
          </div>

          <div className="p-6 space-y-4">
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setIsCollapseOpen(!isCollapseOpen)}
                className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Link với href
              </button>
              <button
                onClick={() => setIsCollapseOpen(!isCollapseOpen)}
                className="px-5 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Button với data-bs-target
              </button>
            </div>

            <div
              className={`overflow-hidden transition-all duration-300 ${isCollapseOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
            >
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 mt-3">
                <p className="text-gray-700 leading-relaxed">
                  Đây là nội dung được hiển thị khi bạn nhấp vào nút collapse.
                  Bạn có thể đặt bất kỳ nội dung HTML nào ở đây.
                  Component này rất hữu ích để ẩn/hiện nội dung một cách mượt mà.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Dropdowns Section */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-white to-gray-50">
            <h2 className="text-xl font-bold text-gray-900">Dropdowns (Menu Xổ Xuống)</h2>
          </div>

          <div className="p-6 space-y-6">
            <div className="flex flex-wrap gap-3">
              <div className="relative">
                <button
                  onClick={() => toggleDropdown('primary')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
                >
                  Primary
                  <ChevronDown className="w-4 h-4" />
                </button>
                {openDropdown === 'primary' && (
                  <div className="absolute top-full mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10 animate-slide-down">
                    <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Action</a>
                    <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Another action</a>
                    <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Something else</a>
                  </div>
                )}
              </div>

              <div className="relative">
                <button
                  onClick={() => toggleDropdown('secondary')}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium flex items-center gap-2"
                >
                  Secondary
                  <ChevronDown className="w-4 h-4" />
                </button>
                {openDropdown === 'secondary' && (
                  <div className="absolute top-full mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10 animate-slide-down">
                    <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Action</a>
                    <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Another action</a>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="relative">
                <button
                  onClick={() => toggleDropdown('danger')}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center gap-2"
                >
                  Danger Split
                  <ChevronDown className="w-4 h-4" />
                </button>
                {openDropdown === 'danger' && (
                  <div className="absolute top-full mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10 animate-slide-down">
                    <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Action</a>
                    <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Another action</a>
                  </div>
                )}
              </div>

              <div className="relative">
                <button
                  onClick={() => toggleDropdown('warning')}
                  className="px-4 py-2 bg-yellow-500 text-gray-900 rounded-lg hover:bg-yellow-600 transition-colors font-medium flex items-center gap-2"
                >
                  Warning Split
                  <ChevronDown className="w-4 h-4" />
                </button>
                {openDropdown === 'warning' && (
                  <div className="absolute top-full mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10 animate-slide-down">
                    <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Action</a>
                    <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Another action</a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* List Group Section */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-white to-gray-50">
            <h2 className="text-xl font-bold text-gray-900">List Group (Nhóm Danh Sách)</h2>
          </div>

          <div className="p-6">
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <a href="#" className="block px-4 py-3 bg-blue-600 text-white hover:bg-blue-700 transition-colors font-medium">
                The current link item
              </a>
              <a href="#" className="block px-4 py-3 bg-white text-gray-700 hover:bg-gray-50 transition-colors border-t border-gray-200">
                A second link item
              </a>
              <a href="#" className="block px-4 py-3 bg-white text-gray-700 hover:bg-gray-50 transition-colors border-t border-gray-200">
                A third link item
              </a>
              <a href="#" className="block px-4 py-3 bg-white text-gray-700 hover:bg-gray-50 transition-colors border-t border-gray-200">
                A fourth link item
              </a>
              <a href="#" className="block px-4 py-3 bg-white text-gray-400 cursor-not-allowed border-t border-gray-200">
                A disabled link item
              </a>
            </div>
          </div>
        </div>

        {/* Navbar Section */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-white to-gray-50">
            <h2 className="text-xl font-bold text-gray-900">Navbar (Thanh Điều Hướng)</h2>
          </div>

          <div className="p-6">
            <nav className="bg-gray-100 rounded-lg border border-gray-200">
              <div className="px-4 py-3">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-900">Navbar</span>
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="lg:hidden p-2 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                  </button>
                  <div className="hidden lg:flex items-center gap-6">
                    <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Home</a>
                    <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Link</a>
                    <div className="relative">
                      <button className="flex items-center gap-1 text-gray-700 hover:text-blue-600 transition-colors font-medium">
                        Dropdown
                        <ChevronDown className="w-4 h-4" />
                      </button>
                    </div>
                    <span className="text-gray-400 cursor-not-allowed font-medium">Disabled</span>
                    <input
                      type="text"
                      placeholder="Search"
                      className="px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button className="px-4 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                      Search
                    </button>
                  </div>
                </div>

                {isMenuOpen && (
                  <div className="lg:hidden mt-4 space-y-2 border-t border-gray-300 pt-4">
                    <a href="#" className="block py-2 text-gray-700 hover:text-blue-600 transition-colors font-medium">Home</a>
                    <a href="#" className="block py-2 text-gray-700 hover:text-blue-600 transition-colors font-medium">Link</a>
                    <button className="block py-2 text-gray-700 hover:text-blue-600 transition-colors font-medium">Dropdown</button>
                    <span className="block py-2 text-gray-400 cursor-not-allowed font-medium">Disabled</span>
                    <div className="pt-2">
                      <input
                        type="text"
                        placeholder="Search"
                        className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                      />
                      <button className="w-full px-4 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                        Search
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </nav>
          </div>
        </div>

        {/* Pagination Section */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden animate-fade-in" style={{ animationDelay: '0.7s' }}>
          <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-white to-gray-50">
            <h2 className="text-xl font-bold text-gray-900">Pagination (Phân Trang)</h2>
          </div>

          <div className="p-6 space-y-6">
            <div className="flex flex-wrap gap-2">
              <button className="px-3 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium">Previous</button>
              <button className="px-3 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium">1</button>
              <button className="px-3 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium">2</button>
              <button className="px-3 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium">3</button>
              <button className="px-3 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium">Next</button>
            </div>

            <div className="flex flex-wrap gap-2">
              <button className="px-3 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium">«</button>
              <button className="px-3 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium">1</button>
              <button className="px-3 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium">2</button>
              <button className="px-3 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium">3</button>
              <button className="px-3 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium">»</button>
            </div>

            <div className="flex flex-wrap gap-2">
              <button className="px-3 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium">Previous</button>
              <button
                className={`px-3 py-2 border rounded-lg transition-colors font-medium ${currentPage === 1 ? 'bg-blue-600 text-white border-blue-600' : 'border-blue-600 text-blue-600 hover:bg-blue-50'
                  }`}
                onClick={() => setCurrentPage(1)}
              >
                1
              </button>
              <button
                className={`px-3 py-2 border rounded-lg transition-colors font-medium ${currentPage === 2 ? 'bg-blue-600 text-white border-blue-600' : 'border-blue-600 text-blue-600 hover:bg-blue-50'
                  }`}
                onClick={() => setCurrentPage(2)}
              >
                2
              </button>
              <button
                className={`px-3 py-2 border rounded-lg transition-colors font-medium ${currentPage === 3 ? 'bg-blue-600 text-white border-blue-600' : 'border-blue-600 text-blue-600 hover:bg-blue-50'
                  }`}
                onClick={() => setCurrentPage(3)}
              >
                3
              </button>
              <button className="px-3 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium">Next</button>
            </div>
          </div>
        </div>

        {/* Placeholder Section */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-white to-gray-50">
            <h2 className="text-xl font-bold text-gray-900">Placeholder (Trình Giữ Chỗ)</h2>
          </div>

          <div className="p-6 space-y-4">
            <div className="space-y-3">
              <div className="h-4 bg-gray-300 rounded animate-pulse w-full"></div>
              <div className="h-4 bg-gray-300 rounded animate-pulse w-3/4"></div>
            </div>
            <div className="flex gap-3">
              <div className="h-16 w-24 bg-gray-300 rounded animate-pulse"></div>
              <div className="h-16 w-48 bg-gray-300 rounded animate-pulse"></div>
            </div>
            <div className="h-32 bg-gray-300 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Progress Section */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden animate-fade-in" style={{ animationDelay: '0.9s' }}>
          <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-white to-gray-50">
            <h2 className="text-xl font-bold text-gray-900">Progress (Thanh Tiến Trình)</h2>
          </div>

          <div className="p-6 space-y-4">
            <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
              <div className="bg-green-600 h-full rounded-full transition-all duration-500" style={{ width: '25%' }}></div>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
              <div className="bg-blue-600 h-full rounded-full transition-all duration-500" style={{ width: '10%' }}></div>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
              <div className="bg-cyan-500 h-full rounded-full transition-all duration-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-shimmer" style={{ width: '75%' }}></div>
              </div>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
              <div className="bg-yellow-500 h-full rounded-full transition-all duration-500" style={{ width: '100%' }}></div>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
              <div className="bg-red-600 h-full rounded-full transition-all duration-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-shimmer"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Toast Section */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden animate-fade-in" style={{ animationDelay: '1s' }}>
          <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-white to-gray-50">
            <h2 className="text-xl font-bold text-gray-900">Toast (Thông Báo Nổi)</h2>
          </div>

          <div className="p-6">
            <div className="mb-4">
              <button
                onClick={() => handleShowToast('default')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Show default toast
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleShowToast('primary')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Show primary toast
              </button>
              <button
                onClick={() => handleShowToast('secondary')}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
              >
                Show secondary toast
              </button>
              <button
                onClick={() => handleShowToast('success')}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Show success toast
              </button>
              <button
                onClick={() => handleShowToast('danger')}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Show danger toast
              </button>
              <button
                onClick={() => handleShowToast('warning')}
                className="px-4 py-2 bg-yellow-500 text-gray-900 rounded-lg hover:bg-yellow-600 transition-colors font-medium"
              >
                Show warning toast
              </button>
              <button
                onClick={() => handleShowToast('info')}
                className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors font-medium"
              >
                Show info toast
              </button>
              <button
                onClick={() => handleShowToast('light')}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                Show light toast
              </button>
              <button
                onClick={() => handleShowToast('dark')}
                className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors font-medium"
              >
                Show dark toast
              </button>
            </div>
          </div>
        </div>

        {/* Tooltip Section */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden animate-fade-in" style={{ animationDelay: '1.1s' }}>
          <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-white to-gray-50">
            <h2 className="text-xl font-bold text-gray-900">Tooltip (Chú Thích)</h2>
          </div>

          <div className="p-6">
            <p className="text-gray-700 mb-4">
              Văn bản giữ chỗ để chứng minh một số{' '}
              <a href="#" className="text-blue-600 underline hover:text-blue-700 font-semibold group relative">
                liên kết nội tuyến
                <span className="invisible group-hover:visible absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap">
                  Tooltip text
                </span>
              </a>
              {' '}với tooltips. Đây bây giờ chỉ là chất độn, không gì giết người. Nội dung được đặt ở đây chỉ để bắt chước sự hiện diện của{' '}
              <a href="#" className="text-blue-600 underline hover:text-blue-700 font-semibold group relative">
                văn bản thực
                <span className="invisible group-hover:visible absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap">
                  More tooltip text
                </span>
              </a>
              . Và tất cả những điều đó chỉ để cho bạn một ý tưởng về cách tooltips sẽ trông như thế nào khi được sử dụng trong các tình huống thực tế. Vì vậy, hy vọng bây giờ bạn đã thấy{' '}
              <a href="#" className="text-blue-600 underline hover:text-blue-700 font-semibold group relative">
                những tooltips này trên các liên kết
                <span className="invisible group-hover:visible absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap">
                  Another tooltip
                </span>
              </a>
              {' '}có thể hoạt động trong thực tế, một khi bạn sử dụng chúng trên{' '}
              <a href="#" className="text-blue-600 underline hover:text-blue-700 font-semibold group relative">
                trang web hoặc dự án của riêng bạn
                <span className="invisible group-hover:visible absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap">
                  Final tooltip
                </span>
              </a>
              .
            </p>
          </div>
        </div>

        {/* Spinner Section */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden animate-fade-in" style={{ animationDelay: '1.2s' }}>
          <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-white to-gray-50">
            <h2 className="text-xl font-bold text-gray-900">Spinner (Vòng Tròn Tải)</h2>
          </div>

          <div className="p-6 space-y-6">
            <div className="flex flex-wrap gap-4 items-center">
              <Loader className="w-8 h-8 text-blue-600 animate-spin" />
              <Loader className="w-8 h-8 text-gray-500 animate-spin" />
              <Loader className="w-8 h-8 text-green-600 animate-spin" />
              <Loader className="w-8 h-8 text-red-600 animate-spin" />
              <Loader className="w-8 h-8 text-yellow-500 animate-spin" />
              <Loader className="w-8 h-8 text-cyan-500 animate-spin" />
            </div>

            <div className="flex flex-wrap gap-4 items-center">
              <div className="w-12 h-12 border-4 border-gray-200 border-t-gray-800 rounded-full animate-spin"></div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
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

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
      `}</style>

    </div>
  );
};

export default UI_General;
