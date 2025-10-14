import { ArrowUpRight } from 'lucide-react';
import DashboardHeader from '../../components/header/Dashboard';
import { statsData } from '../../stores/data/dashboard';

const HomePage = () => {

  return (
    <div className="min-h-screen bg-gray-50">
      {/* header */}
      <DashboardHeader />

      {/* body */}
      <div className="p-4">
        {/* title */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
          <div className="flex items-center gap-2 text-xs">
            <a href="/" className="text-blue-600 hover:text-blue-700 transition-colors">Trang chủ</a>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">Dashboard</span>
          </div>
        </div>

        {/* Stats Grid - 4 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {statsData.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.id}
                className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md hover:border-gray-300 transition-all duration-300 group"
              >
                {/* Gradient Header */}
                <div className={`bg-gradient-to-r ${stat.bgColor} p-3`}>
                  <div className="flex items-start justify-between">
                    <div className="bg-white/20 backdrop-blur-sm rounded-md p-2">
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex items-center gap-0.5 bg-white/20 backdrop-blur-sm rounded-full px-2 py-0.5">
                      <ArrowUpRight className="w-3 h-3 text-white" />
                      <span className="text-xs font-semibold text-white">{stat.trend}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-3">
                  <div className="text-2xl font-bold text-gray-900 mb-0.5">{stat.number}</div>
                  <div className="text-xs font-medium text-gray-900 mb-1">{stat.label}</div>
                  <div className="text-xs text-gray-500">{stat.subtitle}</div>
                </div>

                {/* Footer Link */}
                <div className="px-3 pb-3">
                  <a
                    href="#"
                    className="inline-flex items-center gap-1 text-xs font-medium text-gray-600 hover:text-gray-900 transition-colors group-hover:gap-1.5"
                  >
                    Xem chi tiết
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
