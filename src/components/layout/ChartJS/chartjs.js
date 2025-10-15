import { Chart, registerables } from 'chart.js';
import { CheckCircle, Clock, FileText, Package, ShoppingCart, User, Users, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getDashboardSales, getDashboardStats } from '../../../stores/redux/actions/dashboardActions';

Chart.register(...registerables);

const Chartjs = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const dispatch = useDispatch();
  const { stats, sales, loading, error } = useSelector((state) => state.dashboard);
  const [animateCards, setAnimateCards] = useState(false);

  useEffect(() => {
    dispatch(getDashboardStats());
    dispatch(getDashboardSales());
    setTimeout(() => setAnimateCards(true), 100);
  }, [dispatch]);

  useEffect(() => {
    if (!sales || typeof sales !== 'object' || !sales.labels || !sales.datasets) return;

    const ctx = chartRef.current.getContext('2d');
    if (chartInstance.current) chartInstance.current.destroy();

    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, 'rgba(59, 130, 246, 0.5)');
    gradient.addColorStop(1, 'rgba(59, 130, 246, 0.01)');

    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: sales.labels,
        datasets: [
          {
            label: sales.datasets[0]?.label || 'Sales',
            data: sales.datasets[0]?.data || [],
            backgroundColor: gradient,
            borderColor: 'rgb(59, 130, 246)',
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            pointRadius: 5,
            pointHoverRadius: 7,
            pointBackgroundColor: 'rgb(59, 130, 246)',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointHoverBackgroundColor: 'rgb(37, 99, 235)',
            pointHoverBorderColor: '#fff',
            pointHoverBorderWidth: 3,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 2000,
          easing: 'easeInOutCubic',
        },
        interaction: {
          intersect: false,
          mode: 'index',
        },
        scales: {
          y: {
            beginAtZero: true,
            max: Math.max(...(sales.datasets[0]?.data || [0])) * 1.2 || 100,
            ticks: {
              font: { size: 11, family: 'system-ui' },
              color: '#6b7280',
              padding: 8,
              callback: (value) => '$' + value
            },
            grid: {
              color: 'rgba(0, 0, 0, 0.04)',
              drawBorder: false
            },
            border: { display: false }
          },
          x: {
            ticks: {
              font: { size: 11, family: 'system-ui' },
              color: '#374151',
              padding: 8
            },
            grid: { display: false },
            border: { display: false }
          },
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: 'rgba(17, 24, 39, 0.96)',
            titleColor: '#fff',
            bodyColor: '#e5e7eb',
            padding: 12,
            cornerRadius: 8,
            displayColors: false,
            titleFont: { size: 13, weight: '600' },
            bodyFont: { size: 12 },
            callbacks: {
              label: (context) => `Doanh thu: $${context.parsed.y.toFixed(2)}`
            }
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) chartInstance.current.destroy();
    };
  }, [sales]);

  const statsCards = [
    {
      title: 'Tổng người dùng',
      value: stats?.total_users ?? '--',
      icon: Users,
      iconBg: 'bg-blue-500',
      percentage: '+12.5%',
      isIncrease: true
    },
    {
      title: 'Tổng đơn hàng',
      value: stats?.total_orders ?? '--',
      icon: ShoppingCart,
      iconBg: 'bg-emerald-500',
      percentage: '+8.2%',
      isIncrease: true
    },
    {
      title: 'Tổng sản phẩm',
      value: stats?.total_products ?? '--',
      icon: Package,
      iconBg: 'bg-purple-500',
      percentage: '+5.4%',
      isIncrease: true
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
      {/* Sales Chart */}
      <div className={`lg:col-span-2 bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-500 ${animateCards ? 'animate-slide-in' : 'opacity-0'}`}>
        {/* Header */}
        <div className="px-5 py-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-gray-900">Biểu đồ doanh thu</h2>
              <p className="text-xs text-gray-500 mt-0.5">Theo dõi hiệu suất hàng tuần</p>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-full">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-xs font-medium text-blue-700">Trực tuyến</span>
            </div>
          </div>
        </div>

        {/* Chart Content */}
        <div className="p-5">
          {loading && (
            <div className="flex items-center justify-center h-64">
              <div className="flex flex-col items-center gap-3">
                <div className="w-10 h-10 border-3 border-gray-200 border-t-blue-500 rounded-full animate-spin" />
                <p className="text-sm text-gray-500 font-medium">Đang tải dữ liệu...</p>
              </div>
            </div>
          )}
          {error && (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="w-14 h-14 mx-auto mb-3 bg-red-50 rounded-full flex items-center justify-center border border-red-200">
                  <span className="text-xl">⚠️</span>
                </div>
                <p className="text-sm text-red-600 font-medium">{error}</p>
              </div>
            </div>
          )}
          {!loading && !error && (
            <div className="h-64">
              <canvas ref={chartRef}></canvas>
            </div>
          )}
        </div>

        {/* Stats Summary */}
        <div className="px-5 py-3 border-t border-gray-100 bg-gray-50">
          <div className="grid grid-cols-3 gap-4">
            {statsCards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <div key={idx} className="text-center">
                  <div className={`inline-flex p-2 rounded-lg ${card.iconBg} mb-1.5`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-lg font-bold text-gray-900">{card.value}</p>
                  <p className="text-xs text-gray-500">{card.title}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>


      {/* Recent Activities - Right Side */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            <h3 className="font-semibold">Hoạt Động Gần Đây</h3>
          </div>
          <button className="p-1 hover:bg-white/20 rounded transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Activities List */}
        <div className="p-4 space-y-3 h-96 overflow-y-auto bg-gray-50">
          <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Người dùng mới đăng ký</p>
              <p className="text-xs text-gray-500 mt-0.5">Trần Thị B vừa tạo tài khoản</p>
              <p className="text-xs text-gray-400 mt-1">2 phút trước</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-emerald-300 transition-colors">
            <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
              <ShoppingCart className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Đơn hàng mới</p>
              <p className="text-xs text-gray-500 mt-0.5">Đơn hàng #12345 đã được tạo</p>
              <p className="text-xs text-gray-400 mt-1">15 phút trước</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-amber-300 transition-colors">
            <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
              <FileText className="w-5 h-5 text-amber-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Báo cáo được tạo</p>
              <p className="text-xs text-gray-500 mt-0.5">Báo cáo doanh thu tháng 1</p>
              <p className="text-xs text-gray-400 mt-1">1 giờ trước</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-green-300 transition-colors">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Nhiệm vụ hoàn thành</p>
              <p className="text-xs text-gray-500 mt-0.5">Cập nhật giao diện dashboard</p>
              <p className="text-xs text-gray-400 mt-1">2 giờ trước</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-purple-300 transition-colors">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="w-5 h-5 text-purple-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Cập nhật hồ sơ</p>
              <p className="text-xs text-gray-500 mt-0.5">Nguyễn Văn A đã cập nhật ảnh đại diện</p>
              <p className="text-xs text-gray-400 mt-1">3 giờ trước</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-red-300 transition-colors">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
              <ShoppingCart className="w-5 h-5 text-red-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Đơn hàng bị hủy</p>
              <p className="text-xs text-gray-500 mt-0.5">Đơn hàng #12340 đã bị hủy bởi khách</p>
              <p className="text-xs text-gray-400 mt-1">4 giờ trước</p>
            </div>
          </div>
        </div>

        {/* View All Button */}
        <div className="p-4 bg-white border-t border-gray-200">
          <Link
            to="#"
            className="block text-center py-2.5 text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
          >
            Xem tất cả hoạt động →
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-slide-in {
          animation: slide-in 0.6s ease-out forwards;
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }

        .scrollbar-thin::-webkit-scrollbar {
          width: 5px;
        }

        .scrollbar-thin::-webkit-scrollbar-track {
          background: #f3f4f6;
          border-radius: 10px;
        }

        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 10px;
        }

        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }
      `}</style>
    </div>
  );
};

export default Chartjs;
