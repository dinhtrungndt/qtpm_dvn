import { Chart, registerables } from 'chart.js';
import { ChevronRight, Clock, Package, ShoppingCart, Users } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDashboardSales, getDashboardStats } from '../../stores/redux/actions/dashboardActions';

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

      {/* Recent Activities */}
      <div className={`bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-500 ${animateCards ? 'animate-slide-in' : 'opacity-0'}`} style={{ animationDelay: '100ms' }}>
        {/* Header */}
        <div className="px-5 py-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
          <h2 className="text-base font-semibold text-gray-900">Hoạt động gần đây</h2>
          <p className="text-xs text-gray-500 mt-0.5">Theo dõi sự kiện hệ thống</p>
        </div>

        {/* Activities List */}
        <div className="p-4 max-h-96 overflow-y-auto scrollbar-thin">
          {stats?.recent_activities?.length > 0 ? (
            <div className="space-y-2">
              {stats.recent_activities.map((activity, index) => (
                <div
                  key={index}
                  className="group p-3 rounded-lg bg-gray-50 hover:bg-blue-50 border border-transparent hover:border-blue-200 transition-all duration-300 cursor-pointer animate-fade-in"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-white border border-gray-200 group-hover:border-blue-300 flex items-center justify-center transition-colors">
                      <Clock className="w-4 h-4 text-gray-600 group-hover:text-blue-600 transition-colors" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 group-hover:text-blue-900 transition-colors">
                        {activity.action}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">{activity.time}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-14 h-14 mb-3 bg-gray-100 rounded-full flex items-center justify-center border border-gray-200">
                <Clock className="w-7 h-7 text-gray-400" />
              </div>
              <p className="text-sm text-gray-600 font-medium">Không có hoạt động gần đây</p>
              <p className="text-xs text-gray-400 mt-1">Hãy quay lại sau để xem cập nhật</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-gray-100 bg-gray-50">
          <button className="w-full flex items-center justify-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors group">
            Xem tất cả hoạt động
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
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
