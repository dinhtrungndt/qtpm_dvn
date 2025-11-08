import { ChevronRight, Home } from 'lucide-react';
import React from 'react';

const UI_Icons = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      {/* Breadcrumb & Title */}
      <div className="flex items-center justify-between mb-6 animate-slideDown">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">Biểu tượng</h1>
        <div className="flex items-center gap-2 text-sm">
          <a
            href="#"
            className="text-blue-600 hover:text-blue-700 transition-colors duration-200 hover:underline flex items-center gap-1"
          >
            <Home size={14} />
            Trang chủ
          </a>
          <ChevronRight size={14} className="text-gray-400" />
          <span className="text-gray-600">Biểu tượng</span>
        </div>
      </div>

      {/* Content Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden animate-fadeIn">
        {/* Card Header */}
        <div className="px-4 md:px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white">
          <h2 className="text-lg font-medium text-gray-800">Biểu tượng</h2>
        </div>

        {/* Card Body */}
        <div className="px-4 md:px-6 py-6">
          <p className="text-gray-700 mb-6 leading-relaxed text-sm md:text-base">
            Bạn có thể sử dụng bất kỳ thư viện font icon nào bạn thích với DNV Technology.
          </p>

          <div className="space-y-4">
            <h3 className="text-base font-semibold text-gray-800">Đề xuất</h3>

            <ul className="space-y-3 pl-5">
              <li className="relative group animate-listItem" style={{ animationDelay: '0.1s' }}>
                <span className="absolute -left-5 top-2 w-1.5 h-1.5 bg-gray-600 rounded-full group-hover:bg-blue-600 group-hover:scale-150 transition-all duration-200"></span>
                <a
                  href="https://fontawesome.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 hover:underline transition-all duration-200 inline-block hover:translate-x-1 text-sm md:text-base"
                >
                  Font Awesome
                </a>
              </li>

              <li className="relative group animate-listItem" style={{ animationDelay: '0.2s' }}>
                <span className="absolute -left-5 top-2 w-1.5 h-1.5 bg-gray-600 rounded-full group-hover:bg-blue-600 group-hover:scale-150 transition-all duration-200"></span>
                <a
                  href="https://iconic.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 hover:underline transition-all duration-200 inline-block hover:translate-x-1 text-sm md:text-base"
                >
                  Iconic Icons
                </a>
              </li>

              <li className="relative group animate-listItem" style={{ animationDelay: '0.3s' }}>
                <span className="absolute -left-5 top-2 w-1.5 h-1.5 bg-gray-600 rounded-full group-hover:bg-blue-600 group-hover:scale-150 transition-all duration-200"></span>
                <a
                  href="https://ionic.io/ionicons"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 hover:underline transition-all duration-200 inline-block hover:translate-x-1 text-sm md:text-base"
                >
                  Ion Icons
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes listItem {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }

        .animate-slideDown {
          animation: slideDown 0.4s ease-out;
        }

        .animate-listItem {
          animation: listItem 0.4s ease-out backwards;
        }
      `}</style>
    </div>
  );
};

export default UI_Icons;
