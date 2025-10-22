import emailjs from '@emailjs/browser';
import { Loader, Mail, MapPin, Phone, Send } from 'lucide-react';
import { useState } from 'react';
import Notification from '../../constants/notifications/notifi';
import useNotification from '../../hooks/useNotification';
import FooterStart from '../footer/FooterStart';
import HeaderPageStart from '../header/StartPageHeader';

const ContactPageStart = () => {
  const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
  const PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

  emailjs.init(PUBLIC_KEY);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const { message, messageType, showMessage } = useNotification();

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      showMessage('Vui lòng điền vào tất cả các trường bắt buộc!', 'error');
      return;
    }

    setIsLoading(true);

    try {
      const templateParams = {
        to_email: 'congnghedvn@gmail.com',
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
      };

      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams);

      showMessage('Tin nhắn của bạn đã được gửi thành công!', 'success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      console.error('EmailJS Error:', error);
      showMessage('Đã xảy ra lỗi khi gửi tin nhắn. Vui lòng thử lại sau.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* header */}
      <HeaderPageStart />

      <div className="min-h-screen bg-white p-4 md:p-8">
        <Notification message={message} messageType={messageType} />

        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 tracking-tight">
              Liên Hệ Với Chúng Tôi
            </h1>
            <p className="text-lg text-gray-600">
              Hãy gửi cho chúng tôi tin nhắn, chúng tôi sẽ phản hồi trong 24 giờ
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Contact Info Cards */}
            <div className="animate-fade-in" style={{ animationDelay: '100ms' }}>
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 h-full hover:shadow-lg hover:shadow-blue-500/20 transition-all transform hover:scale-105">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-white/20 rounded-lg">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Email</h3>
                </div>
                <p className="text-blue-100 mb-2">Gửi email cho chúng tôi</p>
                <a
                  href="mailto:congnghedvn@gmail.com"
                  className="text-white font-semibold hover:underline text-lg"
                >
                  congnghedvn@gmail.com
                </a>
              </div>
            </div>

            <div className="animate-fade-in" style={{ animationDelay: '150ms' }}>
              <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-6 h-full hover:shadow-lg hover:shadow-green-500/20 transition-all transform hover:scale-105">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-white/20 rounded-lg">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Điện thoại</h3>
                </div>
                <p className="text-green-100 mb-2">Gọi cho chúng tôi</p>
                <a
                  href="tel:+84399690987"
                  className="text-white font-semibold hover:underline text-lg"
                >
                  0399.690.987
                </a>
              </div>
            </div>

            <div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
              <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl p-6 h-full hover:shadow-lg hover:shadow-purple-500/20 transition-all transform hover:scale-105">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-white/20 rounded-lg">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Địa chỉ</h3>
                </div>
                <p className="text-purple-100 mb-2">Viếng thăm văn phòng</p>
                <p className="text-white font-semibold text-lg">
                  26/37/5 Đường B3, Phường Tây Thạnh, TP HCM
                </p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form */}
            <div className="animate-fade-in" style={{ animationDelay: '250ms' }}>
              <div className="bg-gray-100 rounded-xl border border-gray-200 p-8 shadow-xl">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Gửi Tin Nhắn</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Họ tên <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Nhập họ tên của bạn"
                      className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Điện thoại
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+84 (123) 456-789"
                        className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Tiêu đề <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Tiêu đề tin nhắn"
                      className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Nội dung <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Nhập nội dung tin nhắn của bạn..."
                      rows="5"
                      className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-bold transition-all hover:shadow-lg hover:shadow-blue-500/20 disabled:opacity-50 transform hover:scale-105 flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <Loader className="w-5 h-5 animate-spin" />
                        Đang gửi...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Gửi Tin Nhắn
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Info & Map */}
            <div className="space-y-8 animate-fade-in" style={{ animationDelay: '300ms' }}>
              {/* Business Hours */}
              <div className="bg-gray-100 rounded-xl border border-gray-200 p-8 shadow-xl">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Giờ Làm Việc</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                    <span className="text-gray-600 font-medium">Thứ Hai - Thứ Sáu</span>
                    <span className="text-gray-900 font-bold">8:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                    <span className="text-gray-600 font-medium">Thứ Bảy</span>
                    <span className="text-gray-900 font-bold">9:00 - 17:00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">Chủ Nhật</span>
                    <span className="text-red-400 font-bold">Đóng cửa</span>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-gray-100 rounded-xl border border-gray-200 p-8 shadow-xl">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Kết Nối Với Chúng Tôi</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <a
                    href="#"
                    className="p-4 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg hover:shadow-lg hover:shadow-blue-500/20 transition-all transform hover:scale-110 text-white font-semibold text-center"
                  >
                    Facebook
                  </a>
                  <a
                    href="#"
                    className="p-4 bg-gradient-to-br from-sky-400 to-sky-500 rounded-lg hover:shadow-lg hover:shadow-sky-500/20 transition-all transform hover:scale-110 text-white font-semibold text-center"
                  >
                    Twitter
                  </a>
                  <a
                    href="#"
                    className="p-4 bg-gradient-to-br from-pink-600 to-pink-700 rounded-lg hover:shadow-lg hover:shadow-pink-500/20 transition-all transform hover:scale-110 text-white font-semibold text-center"
                  >
                    Instagram
                  </a>
                  <a
                    href="#"
                    className="p-4 bg-gradient-to-br from-red-600 to-red-700 rounded-lg hover:shadow-lg hover:shadow-red-500/20 transition-all transform hover:scale-110 text-white font-semibold text-center"
                  >
                    YouTube
                  </a>
                </div>
              </div>

              {/* Map Embed */}
              <div className="bg-gray-100 rounded-xl border border-gray-200 overflow-hidden shadow-xl h-64 md:h-80">
                <iframe
                  title="Google Map - Văn phòng"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.1417380923176!2d106.61821927624513!3d10.806221992296746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752934424f2c0b%3A0x3b2d7e1bba9a022b!2s26%2F37%2F5%20B3%2C%20Tay%20Thanh%2C%20Tan%20Phu%2C%20Ho%20Chi%20Minh%2C%20Vietnam!5e0!3m2!1sen!2s!4v1697439472345!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
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
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
          opacity: 0;
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
      </div>

      {/* footer */}
      <FooterStart />
    </>
  );
};

export default ContactPageStart;
