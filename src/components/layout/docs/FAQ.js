import { FileText, MessageCircle } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

const FAQ_Docs = () => {
  const faqs = [
    {
      question: "DVN Technology có hỗ trợ phát triển trên nền tảng .NET Core không?",
      answer:
        "Có. DVN Technology được xây dựng để tích hợp hoàn toàn với .NET Core và .NET Framework, giúp doanh nghiệp dễ dàng triển khai và mở rộng hệ thống hiện tại.",
    },
    {
      question: "DVN có hướng dẫn tích hợp giữa React và .NET không?",
      answer:
        "Chúng tôi cung cấp tài liệu chi tiết và ví dụ thực tế về cách kết nối ReactJS với API .NET thông qua RESTful và SignalR.",
    },
    {
      question: "DVN Technology sử dụng và hỗ trợ những công nghệ nào?",
      answer:
        "DVN Technology sử dụng và hỗ trợ nhiều công nghệ hiện đại như .NET, SQL Server, Python, ReactJS, JavaScript, và TailwindCSS.",
    },
    {
      question: "Làm sao để nhận thông báo về các bản cập nhật mới của DVN?",
      answer:
        "Bạn có thể đăng ký nhận bản tin qua email hoặc theo dõi chúng tôi trên Facebook, LinkedIn để nhận thông tin cập nhật mới nhất về sản phẩm và tính năng.",
    },
    {
      question: "DVN có hỗ trợ tích hợp Python cho AI hoặc tự động hóa không?",
      answer:
        "Có. Hệ thống của DVN hỗ trợ Python để xử lý dữ liệu, tích hợp mô hình AI/ML và tự động hóa các quy trình nghiệp vụ.",
    },
    {
      question: "Tại sao DVN Technology lại chọn TailwindCSS thay vì Bootstrap?",
      answer:
        "TailwindCSS giúp xây dựng giao diện linh hoạt, tối ưu kích thước file và tăng tốc độ phát triển UI, phù hợp với triết lý hiệu suất và tinh gọn của DVN.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Câu hỏi thường gặp (FAQ)
          </h1>
          <div className="flex items-center gap-2 text-xs">
            <Link
              to="/"
              className="text-blue-600 hover:text-blue-700 transition-colors"
            >
              Trang chủ
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">FAQ</span>
          </div>
        </div>

        {/* FAQ Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-6 border border-gray-100 hover:border-emerald-200"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {faq.question}
              </h3>
              <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl shadow-xl p-10 text-center text-white">
          <h2 className="text-3xl font-bold mb-3">
            Bạn vẫn còn thắc mắc?
          </h2>
          <p className="text-emerald-100 mb-6 text-lg">
            Nếu bạn không tìm thấy câu trả lời phù hợp, đừng lo — đội ngũ DVN Technology luôn sẵn sàng hỗ trợ bạn.
          </p>
          <p className="text-emerald-50 mb-8 max-w-2xl mx-auto">
            Liên hệ ngay với chúng tôi để được tư vấn chi tiết về giải pháp phần mềm,
            tích hợp hệ thống hoặc hỗ trợ kỹ thuật liên quan đến .NET, SQL Server, Python, ReactJS và TailwindCSS.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-emerald-600 rounded-lg font-semibold hover:bg-emerald-50 transition-colors shadow-lg"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Liên hệ hỗ trợ
            </Link>
            <button className="inline-flex items-center justify-center px-6 py-3 bg-emerald-700 text-white rounded-lg font-semibold hover:bg-emerald-800 transition-colors border-2 border-emerald-400">
              <FileText className="w-5 h-5 mr-2" />
              Xem tài liệu kỹ thuật
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ_Docs;
