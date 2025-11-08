import { Minus, Plus, X } from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Fixed_Sidebar = () => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  if (isClosed) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="text-center animate-fade-in">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <X className="w-10 h-10 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Layout đã được đóng</h2>
          <p className="text-gray-600 mb-6">Nhấn nút bên dưới để mở lại layout</p>
          <button
            onClick={() => setIsClosed(false)}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-semibold"
          >
            Mở lại Layout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4 sm:p-6 lg:p-6">
      <style>{`
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

        @keyframes slide-down {
          from {
            opacity: 0;
            max-height: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            max-height: 1000px;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 1;
            max-height: 1000px;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            max-height: 0;
            transform: translateY(-10px);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }

        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>

      {/* Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 px-2 animate-fade-in">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Fixed Layout</h1>
        <div className="flex items-center gap-2 text-sm">
          <Link
            to="/"
            className="text-blue-600 hover:text-blue-700 hover:underline transition-all duration-200 font-medium"
          >
            Trang chủ
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-700 font-medium">Fixed Layout</span>
        </div>
      </div>

      {/* Card Container */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden transition-all duration-500 hover:shadow-2xl animate-fade-in">
          {/* Header with Title and Controls */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-white to-gray-50">
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">Title</h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="group p-2 hover:bg-blue-50 rounded-lg transition-all duration-300 relative"
                title={isMinimized ? "Expand" : "Minimize"}
              >
                <div className="relative">
                  {isMinimized ? (
                    <Plus className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors duration-300 animate-fade-in" />
                  ) : (
                    <Minus className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors duration-300 animate-fade-in" />
                  )}
                </div>
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                  {isMinimized ? 'Mở rộng' : 'Thu gọn'}
                </span>
              </button>

              <button
                onClick={() => setIsClosed(true)}
                className="group p-2 hover:bg-red-50 rounded-lg transition-all duration-300 relative"
                title="Close"
              >
                <X className="w-5 h-5 text-gray-600 group-hover:text-red-600 group-hover:rotate-90 transition-all duration-300" />
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                  Đóng
                </span>
              </button>
            </div>
          </div>

          {/* Content - Animated collapse/expand */}
          <div
            className={`transition-all duration-500 ease-in-out overflow-hidden ${isMinimized ? 'max-h-0 opacity-0' : 'max-h-[2000px] opacity-100'
              }`}
          >
            {/* Body */}
            <div className="px-4 sm:px-6 py-8 sm:py-12">
              <div className="max-w-4xl">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    <span className="text-2xl">🚀</span>
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                      Start creating your amazing application!
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                      This is a demo layout with collapsible content. Click the minimize button to collapse or expand the content area.
                    </p>
                  </div>
                </div>

                {/* Demo Content Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
                  {[1, 2, 3].map((item) => (
                    <div
                      key={item}
                      className="p-4 bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                        <span className="text-blue-600 font-bold">{item}</span>
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-1">Feature {item}</h4>
                      <p className="text-sm text-gray-600">Description for feature {item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-4 sm:px-6 py-4 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <p className="text-sm font-medium text-gray-700">Footer</p>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span>© 2024 DVN Technology</span>
                  <span className="hidden sm:inline">•</span>
                  <span className="hidden sm:inline">All rights reserved</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Info Card - Below main card */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xl">💡</span>
            </div>
            <div>
              <h4 className="font-semibold text-blue-900 mb-1">Tip</h4>
              <p className="text-sm text-blue-700">
                Use the <strong>minimize button</strong> to collapse the content, or the <strong>close button</strong> to hide the entire layout.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fixed_Sidebar;
