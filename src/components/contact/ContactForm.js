import emailjs from '@emailjs/browser';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ContactForm() {
  const [email, setEmail] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!email || !email.includes('@')) {
      alert('Vui lòng nhập email hợp lệ');
      return;
    }

    if (!agreed) {
      alert('Vui lòng đồng ý với chính sách bảo mật');
      return;
    }

    setIsSubmitting(true);

    // Chuẩn bị
    const serviceID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const templateID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

    const templateParams = {
      user_email: email,
    };

    try {
      await emailjs.send(serviceID, templateID, templateParams, publicKey);

      alert('Đăng ký thành công!');
      setEmail('');
      setAgreed(false);
    } catch (error) {
      // console.error('LỖI KHI GỬI EMAIL:', error);
      alert('Đã xảy ra lỗi, vui lòng thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const canSubmit = email.includes('@') && agreed;
  const isButtonDisabled = !canSubmit || isSubmitting;

  return (
    <div className="mt-6 bg-slate-800 p-6 md:p-8">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-lg md:text-xl font-semibold mb-2 text-white">
          Đăng ký nhận tin
        </h2>
        <p className="text-sm text-gray-300 mb-5">
          Nhận thông tin sản phẩm mới và ưu đãi độc quyền
        </p>

        <div className="flex flex-col md:flex-row justify-center items-center gap-2 mb-4">
          <input
            type="email"
            placeholder="Email của bạn"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isSubmitting}
            className="w-full md:w-72 px-4 py-2 rounded-md text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          <button
            onClick={handleSubmit}
            disabled={isButtonDisabled}
            className={`w-full md:w-auto px-5 py-2 font-medium rounded-md text-sm transition-all ${!isButtonDisabled
              ? 'bg-white text-gray-900 hover:bg-gray-100'
              : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }`}
          >
            {isSubmitting ? 'Đang gửi...' : 'Đăng ký'}
          </button>
        </div>

        <div className="flex items-start justify-center gap-2 text-xs text-gray-400 max-w-md mx-auto">
          <input
            type="checkbox"
            id="privacy"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            disabled={isSubmitting}
            className="w-3.5 h-3.5 mt-0.5 rounded cursor-pointer flex-shrink-0"
          />
          <label htmlFor="privacy" className="cursor-pointer text-left">
            Tôi đồng ý rằng dữ liệu của tôi sẽ được lưu trữ và xử lý theo{' '}
            <Link to="#" className="text-gray-300 hover:text-white underline">
              Chính sách Bảo mật
            </Link>
          </label>
        </div>
      </div>
    </div>
  );
}
