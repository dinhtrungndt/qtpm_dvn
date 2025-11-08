import React, { useState } from 'react';

const SimpleTables = () => {
  const [currentPage1, setCurrentPage1] = useState(1);
  const [currentPage2, setCurrentPage2] = useState(1);

  const tableData = [
    { id: 1, task: 'Cập nhật phần mềm', progress: 55, color: 'bg-blue-500', label: 'bg-red-500' },
    { id: 2, task: 'Dọn dẹp cơ sở dữ liệu', progress: 70, color: 'bg-yellow-500', label: 'bg-yellow-500' },
    { id: 3, task: 'Cron job đang chạy', progress: 30, color: 'bg-blue-500', label: 'bg-blue-500' },
    { id: 4, task: 'Sửa và loại bỏ lỗi', progress: 90, color: 'bg-green-600', label: 'bg-green-600' }
  ];

  const getLabelText = (progress) => {
    if (progress >= 90) return '90%';
    if (progress >= 70) return '70%';
    if (progress >= 55) return '55%';
    return '30%';
  };

  const Pagination = ({ currentPage, setCurrentPage }) => {
    return (
      <div className="flex items-center justify-end gap-1 mt-4 px-4 pb-4">
        <button
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 text-sm text-blue-600 hover:text-blue-700 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          «
        </button>
        {[1, 2, 3].map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-1 text-sm rounded transition-colors ${currentPage === page
              ? 'bg-blue-500 text-white'
              : 'text-blue-600 hover:bg-blue-50'
              }`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage(Math.min(3, currentPage + 1))}
          disabled={currentPage === 3}
          className="px-3 py-1 text-sm text-blue-600 hover:text-blue-700 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          »
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 animate-fadeIn">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Bảng Đơn Giản</h1>
          <div className="flex items-center gap-2 text-sm">
            <a href="/" className="text-blue-600 hover:text-blue-700 transition-colors hover:underline">
              Trang chủ
            </a>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">Bảng Đơn Giản</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Bordered Table */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden animate-slideUp" style={{ animationDelay: '0.1s' }}>
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Bảng Có Viền</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 w-12">#</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Nhiệm vụ</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Tiến độ</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 w-20">Nhãn</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row) => (
                    <tr key={row.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-sm text-gray-900">{row.id}.</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{row.task}</td>
                      <td className="px-4 py-3">
                        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                          <div
                            className={`h-full ${row.color} transition-all duration-500 ease-out`}
                            style={{ width: `${row.progress}%` }}
                          ></div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-block px-2 py-1 text-xs font-semibold text-white rounded ${row.label}`}>
                          {getLabelText(row.progress)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination currentPage={currentPage1} setCurrentPage={setCurrentPage1} />
          </div>

          {/* Simple Full Width Table */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden animate-slideUp" style={{ animationDelay: '0.2s' }}>
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Bảng Toàn Chiều Rộng Đơn Giản</h2>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setCurrentPage2(Math.max(1, currentPage2 - 1))}
                  disabled={currentPage2 === 1}
                  className="px-3 py-1 text-sm text-blue-600 hover:text-blue-700 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  «
                </button>
                {[1, 2, 3].map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage2(page)}
                    className={`px-3 py-1 text-sm rounded transition-colors ${currentPage2 === page
                      ? 'bg-blue-500 text-white'
                      : 'text-blue-600 hover:bg-blue-50'
                      }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage2(Math.min(3, currentPage2 + 1))}
                  disabled={currentPage2 === 3}
                  className="px-3 py-1 text-sm text-blue-600 hover:text-blue-700 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  »
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-white">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 w-12">#</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Nhiệm vụ</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Tiến độ</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 w-20">Nhãn</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row) => (
                    <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-sm text-gray-900">{row.id}.</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{row.task}</td>
                      <td className="px-4 py-3">
                        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                          <div
                            className={`h-full ${row.color} transition-all duration-500 ease-out`}
                            style={{ width: `${row.progress}%` }}
                          ></div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-block px-2 py-1 text-xs font-semibold text-white rounded ${row.label}`}>
                          {getLabelText(row.progress)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Condensed Full Width Table */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden animate-slideUp" style={{ animationDelay: '0.3s' }}>
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Bảng Toàn Chiều Rộng Thu Gọn</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-white">
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900 w-12">#</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900">Nhiệm vụ</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900">Tiến độ</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900 w-20">Nhãn</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row) => (
                    <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-2 text-sm text-gray-900">{row.id}.</td>
                      <td className="px-4 py-2 text-sm text-gray-900">{row.task}</td>
                      <td className="px-4 py-2">
                        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                          <div
                            className={`h-full ${row.color} transition-all duration-500 ease-out`}
                            style={{ width: `${row.progress}%` }}
                          ></div>
                        </div>
                      </td>
                      <td className="px-4 py-2">
                        <span className={`inline-block px-2 py-1 text-xs font-semibold text-white rounded ${row.label}`}>
                          {getLabelText(row.progress)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Striped Full Width Table */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden animate-slideUp" style={{ animationDelay: '0.4s' }}>
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Bảng Toàn Chiều Rộng Kẻ Sọc</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-white">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 w-12">#</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Nhiệm vụ</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Tiến độ</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 w-20">Nhãn</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row, index) => (
                    <tr
                      key={row.id}
                      className={`hover:bg-gray-100 transition-colors ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                        }`}
                    >
                      <td className="px-4 py-3 text-sm text-gray-900">{row.id}.</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{row.task}</td>
                      <td className="px-4 py-3">
                        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                          <div
                            className={`h-full ${row.color} transition-all duration-500 ease-out`}
                            style={{ width: `${row.progress}%` }}
                          ></div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-block px-2 py-1 text-xs font-semibold text-white rounded ${row.label}`}>
                          {getLabelText(row.progress)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.6s ease-out;
          animation-fill-mode: both;
        }

        /* Smooth transitions */
        table tbody tr {
          transition: all 0.2s ease-in-out;
        }

        /* Progress bar animation */
        @keyframes progressLoad {
          from {
            width: 0;
          }
        }

        table tbody tr td > div > div {
          animation: progressLoad 1s ease-out;
        }

        /* Custom scrollbar */
        .overflow-x-auto::-webkit-scrollbar {
          height: 8px;
        }

        .overflow-x-auto::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 4px;
        }

        .overflow-x-auto::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 4px;
        }

        .overflow-x-auto::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </div>
  );
};

export default SimpleTables;
