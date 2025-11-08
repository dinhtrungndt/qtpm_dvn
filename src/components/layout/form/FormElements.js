import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const FormElements = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    file: null,
    checkbox: false,
    firstName: '',
    lastName: '',
    username: '',
    city: '',
    state: '',
    zip: '',
    terms: false,
    usernameInput: '',
    recipientUsername: '',
    vanityUrl: '',
    amount: '',
    server: '',
    textarea: '',
    radio: 'first',
    horizontalEmail: '',
    horizontalPassword: '',
    horizontalRadio: 'first',
    horizontalCheckbox: false
  });

  const [errors, setErrors] = useState({});
  const [fileName, setFileName] = useState('Chưa chọn file');

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file') {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
      setFileName(files[0]?.name || 'Chưa chọn file');
    } else if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = 'Please choose a username.';
    if (!formData.city) newErrors.city = 'Please provide a valid city.';
    if (!formData.state) newErrors.state = 'Please select a valid state.';
    if (!formData.zip) newErrors.zip = 'Please provide a valid zip.';
    if (!formData.terms) newErrors.terms = 'You must agree before submitting.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
    }
  };

  const handleQuickSubmit = (e) => {
    e.preventDefault();
    console.log('Quick form submitted');
  };

  const handleInputGroupSubmit = (e) => {
    e.preventDefault();
    console.log('Input group submitted');
  };

  const handleHorizontalSubmit = (e) => {
    e.preventDefault();
    console.log('Horizontal form submitted');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 animate-fadeIn">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">General Form</h1>
          <div className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-blue-600 hover:text-blue-700 transition-colors hover:underline">
              Trang chủ
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">General Form</span>
          </div>
        </div>

        {/* Info Banner */}
        <div className="bg-cyan-50 border-l-4 border-cyan-400 p-4 mb-6 rounded-r-lg shadow-sm animate-slideDown">
          <p className="text-gray-700">
            Để xem tài liệu chi tiết về Form, hãy truy cập{' '}
            <a href="https://tailwindcss.com/plus/ui-blocks/application-ui/forms/form-layouts" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-semibold underline transition-colors">
              TailwindCSS Form
            </a>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Quick Example Form */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden animate-slideUp" style={{ animationDelay: '0.1s' }}>
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4 border-b border-blue-700">
              <h2 className="text-lg font-semibold text-white">Ví Dụ Nhanh</h2>
            </div>
            <form onSubmit={handleQuickSubmit} className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Địa chỉ email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                  placeholder="Nhập email"
                />
                <p className="text-xs text-gray-500">Chúng tôi sẽ không bao giờ chia sẻ email của bạn với bất kỳ ai.</p>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Mật khẩu</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                  placeholder="Mật khẩu"
                />
              </div>

              <div className="space-y-2">
                <div className="flex gap-2">
                  <label className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-l-lg border border-gray-300 cursor-pointer hover:bg-gray-200 transition-colors">
                    <span className="text-sm font-medium">Chọn File</span>
                    <input
                      type="file"
                      name="file"
                      onChange={handleInputChange}
                      className="hidden"
                    />
                  </label>
                  <div className="flex-1 flex items-center px-4 py-2 bg-white border border-gray-300 rounded-r-lg">
                    <span className="text-sm text-gray-500">{fileName}</span>
                  </div>
                  <button
                    type="button"
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg border border-gray-300 hover:bg-gray-300 transition-colors"
                  >
                    Tải lên
                  </button>
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="checkbox"
                  checked={formData.checkbox}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer"
                  id="checkbox1"
                />
                <label htmlFor="checkbox1" className="ml-2 text-sm text-gray-700 cursor-pointer">
                  Đánh dấu tôi
                </label>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
              >
                Gửi đi
              </button>
            </form>
          </div>

          {/* Different Height Form */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden animate-slideUp" style={{ animationDelay: '0.2s' }}>
              <div className="bg-gradient-to-r from-gray-600 to-gray-700 px-6 py-4 border-b border-gray-800">
                <h2 className="text-lg font-semibold text-white">Chiều Cao Khác Nhau</h2>
              </div>
              <div className="p-6 space-y-4">
                <input
                  type="text"
                  placeholder=".form-control-lg"
                  className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                />
                <input
                  type="text"
                  placeholder="Input mặc định"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                />
                <input
                  type="text"
                  placeholder=".form-control-sm"
                  className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                />
              </div>
            </div>

            {/* Different Width Form */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden animate-slideUp" style={{ animationDelay: '0.3s' }}>
              <div className="bg-gradient-to-r from-red-500 to-red-600 px-6 py-4 border-b border-red-700">
                <h2 className="text-lg font-semibold text-white">Chiều Rộng Khác Nhau</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                  <input
                    type="text"
                    placeholder=".col-3"
                    className="sm:col-span-3 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                  />
                  <input
                    type="text"
                    placeholder=".col-4"
                    className="sm:col-span-4 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                  />
                  <input
                    type="text"
                    placeholder=".col-5"
                    className="sm:col-span-5 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Input Group Form */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden animate-slideUp" style={{ animationDelay: '0.4s' }}>
            <div className="bg-gradient-to-r from-green-500 to-green-600 px-6 py-4 border-b border-green-700">
              <h2 className="text-lg font-semibold text-white">Nhóm Input</h2>
            </div>
            <form onSubmit={handleInputGroupSubmit} className="p-6 space-y-4">
              <div className="space-y-2">
                <div className="flex">
                  <span className="inline-flex items-center px-3 bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg text-gray-700">
                    @
                  </span>
                  <input
                    type="text"
                    name="usernameInput"
                    value={formData.usernameInput}
                    onChange={handleInputChange}
                    placeholder="Tên người dùng"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex">
                  <input
                    type="text"
                    name="recipientUsername"
                    value={formData.recipientUsername}
                    onChange={handleInputChange}
                    placeholder="Tên người nhận"
                    className="flex-1 px-4 py-2 border border-r-0 border-gray-300 rounded-l-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                  />
                  <span className="inline-flex items-center px-3 bg-gray-100 border border-gray-300 rounded-r-lg text-gray-700">
                    @example.com
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">URL tùy chỉnh của bạn</label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg text-gray-700 text-sm">
                    https://example.com/users/
                  </span>
                  <input
                    type="text"
                    name="vanityUrl"
                    value={formData.vanityUrl}
                    onChange={handleInputChange}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                  />
                </div>
                <p className="text-xs text-gray-500">Văn bản hướng dẫn ví dụ nằm ngoài nhóm input.</p>
              </div>

              <div className="space-y-2">
                <div className="flex">
                  <span className="inline-flex items-center px-3 bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg text-gray-700">
                    $
                  </span>
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    className="flex-1 px-4 py-2 border border-l-0 border-r-0 border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                    step="0.01"
                  />
                  <span className="inline-flex items-center px-3 bg-gray-100 border border-gray-300 rounded-r-lg text-gray-700">
                    .00
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex">
                  <input
                    type="text"
                    name="server"
                    value={formData.server}
                    onChange={handleInputChange}
                    placeholder="Tên người dùng"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                  />
                  <span className="inline-flex items-center px-3 bg-gray-100 border border-l-0 border-r-0 border-gray-300 text-gray-700">
                    @
                  </span>
                  <input
                    type="text"
                    placeholder="Máy chủ"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <textarea
                  name="textarea"
                  value={formData.textarea}
                  onChange={handleInputChange}
                  placeholder="Với textarea"
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:ring-4 focus:ring-green-300 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
              >
                Gửi đi
              </button>
            </form>
          </div>

          {/* Form Validation */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden animate-slideUp" style={{ animationDelay: '0.5s' }}>
            <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 px-6 py-4 border-b border-cyan-700">
              <h2 className="text-lg font-semibold text-white">Xác Thực Form</h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Tên</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Mark"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Họ</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Otto"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Tên người dùng</label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg text-gray-700">
                      @
                    </span>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      className={`flex-1 px-4 py-2 border rounded-r-lg focus:ring-2 transition-all duration-200 ${errors.username
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:ring-cyan-500 hover:border-gray-400'
                        }`}
                    />
                  </div>
                  {errors.username && (
                    <p className="text-xs text-red-600 animate-shake">Vui lòng chọn tên người dùng.</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Thành phố</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 transition-all duration-200 ${errors.city
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-cyan-500 hover:border-gray-400'
                      }`}
                  />
                  {errors.city && (
                    <p className="text-xs text-red-600 animate-shake">Vui lòng cung cấp thành phố hợp lệ.</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Tỉnh/Thành</label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 transition-all duration-200 ${errors.state
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-cyan-500 hover:border-gray-400'
                      }`}
                  >
                    <option value="">Chọn...</option>
                    <option value="HN">Hà Nội</option>
                    <option value="HCM">TP. Hồ Chí Minh</option>
                    <option value="DN">Đà Nẵng</option>
                  </select>
                  {errors.state && (
                    <p className="text-xs text-red-600 animate-shake">Vui lòng chọn tỉnh/thành hợp lệ.</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Mã bưu điện</label>
                  <input
                    type="text"
                    name="zip"
                    value={formData.zip}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 transition-all duration-200 ${errors.zip
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-cyan-500 hover:border-gray-400'
                      }`}
                  />
                  {errors.zip && (
                    <p className="text-xs text-red-600 animate-shake">Vui lòng cung cấp mã bưu điện hợp lệ.</p>
                  )}
                </div>
              </div>

              <div className="flex items-start">
                <input
                  type="checkbox"
                  name="terms"
                  checked={formData.terms}
                  onChange={handleInputChange}
                  className="w-4 h-4 mt-1 text-cyan-600 border-gray-300 rounded focus:ring-2 focus:ring-cyan-500 transition-all cursor-pointer"
                  id="terms"
                />
                <label htmlFor="terms" className="ml-2 text-sm text-gray-700 cursor-pointer">
                  Đồng ý với điều khoản và điều kiện
                </label>
              </div>
              {errors.terms && (
                <p className="text-xs text-red-600 animate-shake">Bạn phải đồng ý trước khi gửi.</p>
              )}

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-300 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
              >
                Gửi form
              </button>
            </form>
          </div>

          {/* Horizontal Form */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden animate-slideUp" style={{ animationDelay: '0.6s' }}>
            <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 px-6 py-4 border-b border-yellow-700">
              <h2 className="text-lg font-semibold text-white">Form Ngang</h2>
            </div>
            <form onSubmit={handleHorizontalSubmit} className="p-6 space-y-6">
              <div className="sm:flex sm:items-center sm:gap-4">
                <label className="block sm:w-24 text-sm font-medium text-gray-700 mb-2 sm:mb-0">Email</label>
                <input
                  type="email"
                  name="horizontalEmail"
                  value={formData.horizontalEmail}
                  onChange={handleInputChange}
                  className="flex-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                />
              </div>

              <div className="sm:flex sm:items-center sm:gap-4">
                <label className="block sm:w-24 text-sm font-medium text-gray-700 mb-2 sm:mb-0">Mật khẩu</label>
                <input
                  type="password"
                  name="horizontalPassword"
                  value={formData.horizontalPassword}
                  onChange={handleInputChange}
                  className="flex-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                />
              </div>

              <div className="sm:flex sm:gap-4">
                <label className="block sm:w-24 text-sm font-medium text-gray-700 mb-2 sm:mb-0 sm:pt-2">Radios</label>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="horizontalRadio"
                      value="first"
                      checked={formData.horizontalRadio === 'first'}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-yellow-600 border-gray-300 focus:ring-2 focus:ring-yellow-500 transition-all cursor-pointer"
                      id="radio1"
                    />
                    <label htmlFor="radio1" className="ml-2 text-sm text-gray-700 cursor-pointer">
                      Radio đầu tiên
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="horizontalRadio"
                      value="second"
                      checked={formData.horizontalRadio === 'second'}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-yellow-600 border-gray-300 focus:ring-2 focus:ring-yellow-500 transition-all cursor-pointer"
                      id="radio2"
                    />
                    <label htmlFor="radio2" className="ml-2 text-sm text-gray-700 cursor-pointer">
                      Radio thứ hai
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="horizontalRadio"
                      value="third"
                      checked={formData.horizontalRadio === 'third'}
                      onChange={handleInputChange}
                      disabled
                      className="w-4 h-4 text-yellow-600 border-gray-300 focus:ring-2 focus:ring-yellow-500 transition-all cursor-not-allowed opacity-50"
                      id="radio3"
                    />
                    <label htmlFor="radio3" className="ml-2 text-sm text-gray-400 cursor-not-allowed">
                      Radio thứ ba bị vô hiệu hóa
                    </label>
                  </div>
                </div>
              </div>

              <div className="sm:flex sm:gap-4">
                <div className="sm:w-24"></div>
                <div className="flex-1">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="horizontalCheckbox"
                      checked={formData.horizontalCheckbox}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-2 focus:ring-yellow-500 transition-all cursor-pointer"
                      id="checkbox2"
                    />
                    <label htmlFor="checkbox2" className="ml-2 text-sm text-gray-700 cursor-pointer">
                      Ví dụ checkbox
                    </label>
                  </div>
                </div>
              </div>

              <div className="sm:flex sm:gap-4">
                <div className="sm:w-24"></div>
                <div className="flex-1 flex gap-2">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 focus:ring-4 focus:ring-yellow-300 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
                  >
                    Đăng nhập
                  </button>
                  <button
                    type="button"
                    className="px-6 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-4 focus:ring-gray-200 transition-all duration-200"
                  >
                    Hủy
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shake {
          0%, 100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-5px);
          }
          75% {
            transform: translateX(5px);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }

        .animate-slideDown {
          animation: slideDown 0.6s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.6s ease-out;
          animation-fill-mode: both;
        }

        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }

        /* Smooth transitions for all inputs */
        input, select, textarea {
          transition: all 0.2s ease-in-out;
        }

        /* Focus visible for accessibility */
        input:focus-visible,
        select:focus-visible,
        textarea:focus-visible,
        button:focus-visible {
          outline: 2px solid currentColor;
          outline-offset: 2px;
        }

        /* Custom scrollbar for textarea */
        textarea::-webkit-scrollbar {
          width: 8px;
        }

        textarea::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 4px;
        }

        textarea::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 4px;
        }

        textarea::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </div>
  );
};

export default FormElements;
