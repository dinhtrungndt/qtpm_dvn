import { Chart, registerables } from 'chart.js';
import { MoreVertical, RefreshCw, Search, ShoppingCart, TrendingUp, Users } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

Chart.register(...registerables);

const DashboardV3 = () => {
  const lineChartRef = useRef(null);
  const barChartRef = useRef(null);
  const lineChartInstance = useRef(null);
  const barChartInstance = useRef(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimate(true), 100);
  }, []);

  // Line Chart - Online Store Visitors
  useEffect(() => {
    if (!lineChartRef.current) return;

    const ctx = lineChartRef.current.getContext('2d');
    if (lineChartInstance.current) lineChartInstance.current.destroy();

    lineChartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['22', '23', '24', '25', '26', '27', '28'],
        datasets: [
          {
            label: 'Tuần này',
            data: [95, 120, 180, 175, 180, 175, 160],
            borderColor: 'rgb(59, 130, 246)',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            pointRadius: 5,
            pointHoverRadius: 7,
            pointBackgroundColor: 'rgb(59, 130, 246)',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
          },
          {
            label: 'Tuần trước',
            data: [60, 75, 85, 70, 65, 80, 95],
            borderColor: 'rgb(156, 163, 175)',
            backgroundColor: 'rgba(156, 163, 175, 0.1)',
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            pointRadius: 5,
            pointHoverRadius: 7,
            pointBackgroundColor: 'rgb(156, 163, 175)',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 1500, easing: 'easeInOutCubic' },
        interaction: { intersect: false, mode: 'index' },
        scales: {
          y: {
            beginAtZero: true,
            max: 210,
            ticks: {
              stepSize: 30,
              font: { size: 11 },
              color: '#6b7280',
            },
            grid: { color: 'rgba(0, 0, 0, 0.05)' },
            border: { display: false }
          },
          x: {
            ticks: { font: { size: 11 }, color: '#374151' },
            grid: { display: false },
            border: { display: false }
          },
        },
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              usePointStyle: true,
              padding: 15,
              font: { size: 12 }
            }
          },
          tooltip: {
            backgroundColor: 'rgba(17, 24, 39, 0.95)',
            padding: 12,
            cornerRadius: 8,
            titleFont: { size: 13, weight: '600' },
            bodyFont: { size: 12 },
          },
        },
      },
    });

    return () => {
      if (lineChartInstance.current) lineChartInstance.current.destroy();
    };
  }, []);

  // Bar Chart - Sales
  useEffect(() => {
    if (!barChartRef.current) return;

    const ctx = barChartRef.current.getContext('2d');
    if (barChartInstance.current) barChartInstance.current.destroy();

    barChartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Th2', 'Th3', 'Th4', 'Th5', 'Th6', 'Th7', 'Th8', 'Th9', 'Th10'],
        datasets: [
          {
            label: 'Năm nay',
            data: [45, 52, 55, 58, 62, 58, 62, 63, 65],
            backgroundColor: 'rgb(59, 130, 246)',
            borderRadius: 4,
          },
          {
            label: 'Năm ngoái',
            data: [85, 90, 95, 100, 95, 105, 95, 110, 100],
            backgroundColor: 'rgb(16, 185, 129)',
            borderRadius: 4,
          },
          {
            label: 'Mục tiêu',
            data: [35, 38, 32, 28, 42, 45, 48, 52, 38],
            backgroundColor: 'rgb(251, 191, 36)',
            borderRadius: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 1500, easing: 'easeInOutCubic' },
        interaction: { intersect: false, mode: 'index' },
        scales: {
          y: {
            beginAtZero: true,
            max: 120,
            ticks: {
              stepSize: 30,
              font: { size: 11 },
              color: '#6b7280',
            },
            grid: { color: 'rgba(0, 0, 0, 0.05)' },
            border: { display: false }
          },
          x: {
            ticks: { font: { size: 11 }, color: '#374151' },
            grid: { display: false },
            border: { display: false }
          },
        },
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              usePointStyle: true,
              padding: 15,
              font: { size: 12 }
            }
          },
          tooltip: {
            backgroundColor: 'rgba(17, 24, 39, 0.95)',
            padding: 12,
            cornerRadius: 8,
            titleFont: { size: 13, weight: '600' },
            bodyFont: { size: 12 },
          },
        },
      },
    });

    return () => {
      if (barChartInstance.current) barChartInstance.current.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* title */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold text-gray-900">Dashboard v3</h1>
        <div className="flex items-center gap-2 text-xs">
          <Link to="/" className="text-blue-600 hover:text-blue-700 transition-colors">Trang chủ</Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-600">Dashboard v3</span>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Online Store Visitors */}
        <div
          className={`bg-white rounded-xl border border-gray-200 overflow-hidden transition-all duration-700 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-100">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Khách Truy Cập Trực Tuyến</h3>
                <a href="#" className="text-sm text-blue-600 hover:text-blue-700 transition-colors">
                  Xem Báo Cáo
                </a>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <MoreVertical className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Stats */}
            <div className="flex items-end justify-between">
              <div>
                <div className="text-3xl font-bold text-gray-900 mb-1">820</div>
                <div className="text-sm text-gray-600">Khách hàng theo thời gian</div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 text-green-600 font-semibold mb-1">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-lg">12,5%</span>
                </div>
                <div className="text-xs text-gray-500">Kể từ tuần trước</div>
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="p-6">
            <div className="h-80">
              <canvas ref={lineChartRef}></canvas>
            </div>
          </div>
        </div>

        {/* Sales */}
        <div
          className={`bg-white rounded-xl border border-gray-200 overflow-hidden transition-all duration-700 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ transitionDelay: '200ms' }}
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-100">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Doanh Số</h3>
                <a href="#" className="text-sm text-blue-600 hover:text-blue-700 transition-colors">
                  Xem Báo Cáo
                </a>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <MoreVertical className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Stats */}
            <div className="flex items-end justify-between">
              <div>
                <div className="text-3xl font-bold text-gray-900 mb-1">18.230.000 VNĐ</div>
                <div className="text-sm text-gray-600">Doanh số theo thời gian</div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 text-green-600 font-semibold mb-1">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-lg">33,1%</span>
                </div>
                <div className="text-xs text-gray-500">Kể từ năm ngoái</div>
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="p-6">
            <div className="h-80">
              <canvas ref={barChartRef}></canvas>
            </div>
          </div>
        </div>

        {/* Products */}
        <div
          className={`bg-white rounded-xl border border-gray-200 overflow-hidden transition-all duration-700 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ transitionDelay: '400ms' }}
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Sản Phẩm</h3>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <MoreVertical className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="p-4">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th className="px-4 py-2">Sản Phẩm</th>
                  <th className="px-4 py-2">Giá</th>
                  <th className="px-4 py-2">Doanh Số</th>
                  <th className="px-4 py-2">Thêm</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-2 flex items-center">
                    <div className="w-10 h-10 bg-gray-300 rounded-full mr-2"></div>
                    Sản Phẩm 1
                  </td>
                  <td className="px-4 py-2">13.000 VNĐ</td>
                  <td className="px-4 py-2 text-green-600">↑ 12% 12.000 Đã Bán</td>
                  <td className="px-4 py-2"><Search className="w-5 h-5 text-gray-400" /></td>
                </tr>
                <tr className="bg-white border-b hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-2 flex items-center">
                    <div className="w-10 h-10 bg-gray-300 rounded-full mr-2"></div>
                    Sản Phẩm 2
                  </td>
                  <td className="px-4 py-2">29.000 VNĐ</td>
                  <td className="px-4 py-2 text-red-600">↓ 0,5% 123.234 Đã Bán</td>
                  <td className="px-4 py-2"><Search className="w-5 h-5 text-gray-400" /></td>
                </tr>
                <tr className="bg-white border-b hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-2 flex items-center">
                    <div className="w-10 h-10 bg-gray-300 rounded-full mr-2"></div>
                    Sản Phẩm Tuyệt Vời
                  </td>
                  <td className="px-4 py-2">1.230.000 VNĐ</td>
                  <td className="px-4 py-2 text-red-600">↓ 3% 198 Đã Bán</td>
                  <td className="px-4 py-2"><Search className="w-5 h-5 text-gray-400" /></td>
                </tr>
                <tr className="bg-white border-b hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-2 flex items-center">
                    <div className="w-10 h-10 bg-gray-300 rounded-full mr-2"></div>
                    Sản Phẩm Hoàn Hảo <span className="ml-2 px-2 bg-red-100 text-red-800 text-xs font-semibold rounded-full">MỚI</span>
                  </td>
                  <td className="px-4 py-2">199.000 VNĐ</td>
                  <td className="px-4 py-2 text-red-600">↓ 3% 87 Đã Bán</td>
                  <td className="px-4 py-2"><Search className="w-5 h-5 text-gray-400" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Online Store Overview */}
        <div
          className={`bg-white rounded-xl border border-gray-200 overflow-hidden transition-all duration-700 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ transitionDelay: '600ms' }}
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Tổng Quan Cửa Hàng Trực Tuyến</h3>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <MoreVertical className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <RefreshCw className="w-6 h-6 text-green-500" />
              <div>
                <div className="text-lg font-semibold text-gray-900">12%</div>
                <div className="text-sm text-gray-600">Tỷ Lệ Chuyển Đổi</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-6 h-6 text-blue-500" />
              <div>
                <div className="text-lg font-semibold text-gray-900">0,8%</div>
                <div className="text-sm text-gray-600">Tỷ Lệ Doanh Số</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-6 h-6 text-red-500" />
              <div>
                <div className="text-lg font-semibold text-gray-900">1%</div>
                <div className="text-sm text-gray-600">Tỷ Lệ Đăng Ký</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardV3;
