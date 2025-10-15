import { Chart, registerables } from 'chart.js';
import { Download, Heart, MessageCircle, MessageSquare, Minus, Settings, ShoppingCart, Tag, ThumbsUp, TrendingDown, TrendingUp, Users, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

Chart.register(...registerables);

const BottomWidgets = ({ animate }) => {
  const [message, setMessage] = useState('');

  const members = [
    { id: 1, name: 'Alexander', avatar: 'https://i.pravatar.cc/150?img=12', date: 'Today' },
    { id: 2, name: 'Norman', avatar: 'https://i.pravatar.cc/150?img=13', date: 'Yesterday' },
    { id: 3, name: 'Jane', avatar: 'https://i.pravatar.cc/150?img=45', date: '12 Jan' },
    { id: 4, name: 'John', avatar: 'https://i.pravatar.cc/150?img=33', date: '12 Jan' },
    { id: 5, name: 'Alexander', avatar: 'https://i.pravatar.cc/150?img=68', date: '13 Jan' },
    { id: 6, name: 'Sarah', avatar: 'https://i.pravatar.cc/150?img=47', date: '14 Jan' },
    { id: 7, name: 'Nora', avatar: 'https://i.pravatar.cc/150?img=44', date: '15 Jan' },
    { id: 8, name: 'Nadia', avatar: 'https://i.pravatar.cc/150?img=48', date: '15 Jan' },
  ];

  const infoCards = [
    { id: 1, title: 'Inventory', value: '5,200', icon: Tag, bgColor: 'bg-yellow-500' },
    { id: 2, title: 'Mentions', value: '92,050', icon: Heart, bgColor: 'bg-green-600' },
    { id: 3, title: 'Downloads', value: '114,381', icon: Download, bgColor: 'bg-red-500' },
    { id: 4, title: 'Direct Messages', value: '163,921', icon: MessageSquare, bgColor: 'bg-cyan-500' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
      {/* Direct Chat */}
      <div
        className={`lg:col-span-4 bg-white rounded-lg border border-gray-200 overflow-hidden transition-all duration-700 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        style={{ transitionDelay: '800ms' }}
      >
        <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-semibold text-gray-900">Direct Chat</h3>
            <span className="bg-yellow-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">3</span>
          </div>
          <div className="flex items-center gap-1">
            <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
              <Minus className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
              <MessageCircle className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
              <X className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="h-80 overflow-y-auto p-4 space-y-3 bg-gray-50">
          <div className="flex items-start gap-3">
            <img src="https://i.pravatar.cc/150?img=12" alt="Alexander" className="w-10 h-10 rounded-full" />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold text-gray-900">Alexander Pierce</span>
                <span className="text-xs text-gray-500">23 Jan 2:00 pm</span>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg rounded-tl-none px-4 py-2 text-sm text-gray-900">
                Template này thật sự miễn phí à? Thật không thể tin được!
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 flex-row-reverse">
            <img src="https://i.pravatar.cc/150?img=8" alt="Sarah" className="w-10 h-10 rounded-full" />
            <div className="flex-1 flex flex-col items-end">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs text-gray-500">23 Jan 2:05 pm</span>
                <span className="text-xs font-semibold text-gray-900">Sarah Bullock</span>
              </div>
              <div className="bg-yellow-500 rounded-lg rounded-tr-none px-4 py-2 text-sm text-white">
                Bạn nên tin tưởng điều đó!
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <img src="https://i.pravatar.cc/150?img=12" alt="Alexander" className="w-10 h-10 rounded-full" />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold text-gray-900">Alexander Pierce</span>
                <span className="text-xs text-gray-500">23 Jan 5:37 pm</span>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg rounded-tl-none px-4 py-2 text-sm text-gray-900">
                Làm việc với AdminLTE trên ứng dụng mới thật tuyệt! Muốn tham gia không?
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-gray-100 bg-white">
          <div className="flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type Message ..."
              className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
            <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors text-sm font-medium">
              Send
            </button>
          </div>
        </div>
      </div>

      {/* Latest Members */}
      <div
        className={`lg:col-span-4 bg-white rounded-lg border border-gray-200 overflow-hidden transition-all duration-700 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        style={{ transitionDelay: '900ms' }}
      >
        <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-semibold text-gray-900">Latest Members</h3>
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded">8 New Members</span>
          </div>
          <div className="flex items-center gap-1">
            <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
              <Minus className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
              <X className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="p-4">
          <div className="grid grid-cols-4 gap-4">
            {members.map((member, index) => (
              <div
                key={member.id}
                className={`text-center transition-all duration-500 ${animate ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                  }`}
                style={{ transitionDelay: `${1000 + index * 50}ms` }}
              >
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-16 h-16 rounded-full mx-auto mb-2 border-2 border-gray-200 hover:border-blue-500 transition-colors"
                />
                <p className="text-xs font-medium text-gray-900">{member.name}</p>
                <p className="text-xs text-gray-500">{member.date}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="px-4 pb-4">
          <a href="#" className="block text-center text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
            View All Users
          </a>
        </div>
      </div>

      {/* Info Cards */}
      <div
        className={`lg:col-span-4 grid grid-cols-1 gap-4 transition-all duration-700 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        style={{ transitionDelay: '1000ms' }}
      >
        {infoCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              className={`${card.bgColor} rounded-lg p-4 flex items-center justify-between hover:shadow-lg transition-all duration-300`}
            >
              <div className="bg-black/10 p-3 rounded-lg">
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-white/90">{card.title}</div>
                <div className="text-2xl font-bold text-white mt-1">{card.value}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const BottomWidgets2 = ({ animate }) => {
  const orders = [
    { id: 'OR9842', item: 'Call of Duty IV', status: 'Shipped', statusColor: 'bg-green-600', chart: [30, 40, 45, 50, 49, 60, 70, 91] },
    { id: 'OR1848', item: 'Samsung Smart TV', status: 'Pending', statusColor: 'bg-yellow-500', chart: [30, 40, 35, 45, 35, 40, 45, 50] },
    { id: 'OR7429', item: 'iPhone 6 Plus', status: 'Delivered', statusColor: 'bg-red-500', chart: [20, 30, 40, 50, 40, 50, 60, 70] },
    { id: 'OR7429', item: 'Samsung Smart TV', status: 'Processing', statusColor: 'bg-cyan-500', chart: [35, 30, 40, 35, 45, 40, 50, 45] },
    { id: 'OR1848', item: 'Samsung Smart TV', status: 'Pending', statusColor: 'bg-yellow-500', chart: [25, 35, 30, 40, 35, 45, 40, 50] },
    { id: 'OR7429', item: 'iPhone 6 Plus', status: 'Delivered', statusColor: 'bg-red-500', chart: [40, 50, 45, 55, 50, 60, 55, 65] },
    { id: 'OR9842', item: 'Call of Duty IV', status: 'Shipped', statusColor: 'bg-green-600', chart: [30, 35, 40, 45, 50, 55, 60, 65] },
  ];

  const browsers = [
    { name: 'Chrome', color: 'bg-blue-500', percentage: 40 },
    { name: 'Edge', color: 'bg-gray-400', percentage: 10 },
    { name: 'FireFox', color: 'bg-orange-500', percentage: 15 },
    { name: 'Safari', color: 'bg-pink-500', percentage: 15 },
    { name: 'Opera', color: 'bg-purple-500', percentage: 10 },
    { name: 'IE', color: 'bg-gray-300', percentage: 10 },
  ];

  const countries = [
    { name: 'United States of America', flag: '🇺🇸', change: '-12%', isIncrease: false, color: 'text-red-600' },
    { name: 'India', flag: '🇮🇳', change: '+4%', isIncrease: true, color: 'text-green-600' },
    { name: 'China', flag: '🇨🇳', change: '0%', isIncrease: null, color: 'text-blue-600' },
  ];

  const products = [
    { id: 1, name: 'Samsung TV', desc: 'Samsung 32" 1080p 60Hz LED Smart HDTV.', price: '$1800', priceColor: 'bg-yellow-500', image: 'https://via.placeholder.com/60x60/4a5568/ffffff?text=TV' },
    { id: 2, name: 'Bicycle', desc: '26" Mongoose Dolomite Men\'s 7-speed, Navy Blue.', price: '$700', priceColor: 'bg-cyan-500', image: 'https://via.placeholder.com/60x60/4a5568/ffffff?text=BIKE' },
    { id: 3, name: 'Xbox One', desc: 'Xbox One Console Bundle with Halo Master Chief Collection.', price: '$350', priceColor: 'bg-red-500', image: 'https://via.placeholder.com/60x60/4a5568/ffffff?text=XBOX' },
    { id: 4, name: 'PlayStation 4', desc: 'PlayStation 4 500GB Console (PS4)', price: '$399', priceColor: 'bg-green-600', image: 'https://via.placeholder.com/60x60/4a5568/ffffff?text=PS4' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
      {/* Latest Orders - 2 columns */}
      <div
        className={`lg:col-span-2 bg-white rounded-lg border border-gray-200 overflow-hidden transition-all duration-700 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        style={{ transitionDelay: '1100ms' }}
      >
        <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-base font-semibold text-gray-900">Latest Orders</h3>
          <div className="flex items-center gap-1">
            <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
              <Minus className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
              <X className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Order ID</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Item</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Popularity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.map((order, index) => (
                <tr
                  key={index}
                  className={`hover:bg-gray-50 transition-all duration-500 ${animate ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                    }`}
                  style={{ transitionDelay: `${1200 + index * 50}ms` }}
                >
                  <td className="px-4 py-3">
                    <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-700">{order.id}</a>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">{order.item}</td>
                  <td className="px-4 py-3">
                    <span className={`${order.statusColor} text-white text-xs font-medium px-2.5 py-1 rounded`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <svg className="w-24 h-8" viewBox="0 0 100 40">
                      <polyline
                        points={order.chart.map((val, i) => `${i * 14},${40 - val / 2}`).join(' ')}
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="2"
                      />
                    </svg>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-4 py-3 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
          <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors">
            Place New Order
          </button>
          <button className="px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded hover:bg-gray-700 transition-colors">
            View All Orders
          </button>
        </div>
      </div>

      {/* Right Column - Browser Usage & Products */}
      <div className="space-y-6">
        {/* Browser Usage */}
        <div
          className={`bg-white rounded-lg border border-gray-200 overflow-hidden transition-all duration-700 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          style={{ transitionDelay: '1200ms' }}
        >
          <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-base font-semibold text-gray-900">Browser Usage</h3>
            <div className="flex items-center gap-1">
              <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
                <Minus className="w-4 h-4 text-gray-600" />
              </button>
              <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
                <X className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>

          <div className="p-4">
            <div className="relative w-48 h-48 mx-auto mb-4">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
                {browsers.map((browser, index) => {
                  const total = browsers.reduce((sum, b) => sum + b.percentage, 0);
                  const prevPercentage = browsers.slice(0, index).reduce((sum, b) => sum + b.percentage, 0);
                  const offset = (prevPercentage / total) * 628;
                  const dashArray = (browser.percentage / total) * 628;

                  return (
                    <circle
                      key={browser.name}
                      cx="100"
                      cy="100"
                      r="100"
                      fill="none"
                      className={browser.color.replace('bg-', 'stroke-')}
                      strokeWidth="40"
                      strokeDasharray={`${dashArray} 628`}
                      strokeDashoffset={-offset}
                      style={{
                        transition: 'stroke-dasharray 1.5s ease-out, stroke-dashoffset 1.5s ease-out',
                        transitionDelay: `${1300 + index * 100}ms`
                      }}
                    />
                  );
                })}
              </svg>
            </div>

            <div className="space-y-2">
              {browsers.map((browser) => (
                <div key={browser.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${browser.color}`}></div>
                    <span className="text-gray-900">{browser.name}</span>
                  </div>
                  <span className="font-medium text-gray-700">{browser.percentage}%</span>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
              {countries.map((country, index) => (
                <div
                  key={country.name}
                  className={`flex items-center justify-between text-sm transition-all duration-500 ${animate ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                    }`}
                  style={{ transitionDelay: `${1500 + index * 100}ms` }}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{country.flag}</span>
                    <a href="#" className="text-blue-600 hover:text-blue-700 text-sm">{country.name}</a>
                  </div>
                  <span className={`font-semibold text-sm ${country.color}`}>{country.change}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recently Added Products */}
        <div
          className={`bg-white rounded-lg border border-gray-200 overflow-hidden transition-all duration-700 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          style={{ transitionDelay: '1300ms' }}
        >
          <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-base font-semibold text-gray-900">Recently Added Products</h3>
            <div className="flex items-center gap-1">
              <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
                <Minus className="w-4 h-4 text-gray-600" />
              </button>
              <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
                <X className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>

          <div className="p-4 space-y-3">
            {products.map((product, index) => (
              <div
                key={product.id}
                className={`flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-all duration-500 ${animate ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                  }`}
                style={{ transitionDelay: `${1400 + index * 100}ms` }}
              >
                <img src={product.image} alt={product.name} className="w-14 h-14 rounded border border-gray-200" />
                <div className="flex-1 min-w-0">
                  <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-700">{product.name}</a>
                  <p className="text-xs text-gray-500 mt-0.5 truncate">{product.desc}</p>
                </div>
                <span className={`${product.priceColor} text-white text-xs font-bold px-2.5 py-1 rounded flex-shrink-0`}>
                  {product.price}
                </span>
              </div>
            ))}
          </div>

          <div className="px-4 pb-4">
            <a href="#" className="block text-center text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
              View All Products
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const Dashboard_v2 = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimate(true), 100);
  }, []);

  useEffect(() => {
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext('2d');
    if (chartInstance.current) chartInstance.current.destroy();

    const gradient1 = ctx.createLinearGradient(0, 0, 0, 300);
    gradient1.addColorStop(0, 'rgba(59, 130, 246, 0.5)');
    gradient1.addColorStop(1, 'rgba(59, 130, 246, 0.05)');

    const gradient2 = ctx.createLinearGradient(0, 0, 0, 300);
    gradient2.addColorStop(0, 'rgba(16, 185, 129, 0.5)');
    gradient2.addColorStop(1, 'rgba(16, 185, 129, 0.05)');

    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ["Jan '23", "Feb '23", "Mar '23", "Apr '23", "May '23", "Jun '23"],
        datasets: [
          {
            label: 'Doanh số',
            data: [30, 40, 35, 20, 85, 35],
            backgroundColor: gradient1,
            borderColor: 'rgb(59, 130, 246)',
            borderWidth: 2,
            fill: true,
            tension: 0.4,
            pointRadius: 4,
            pointHoverRadius: 6,
            pointBackgroundColor: 'rgb(59, 130, 246)',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
          },
          {
            label: 'Mục tiêu',
            data: [65, 59, 80, 60, 56, 55],
            backgroundColor: gradient2,
            borderColor: 'rgb(16, 185, 129)',
            borderWidth: 2,
            fill: true,
            tension: 0.4,
            pointRadius: 4,
            pointHoverRadius: 6,
            pointBackgroundColor: 'rgb(16, 185, 129)',
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
            max: 100,
            ticks: { font: { size: 11 }, color: '#6b7280' },
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
          legend: { display: false },
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
      if (chartInstance.current) chartInstance.current.destroy();
    };
  }, []);

  const statsCards = [
    { id: 1, title: 'CPU Traffic', value: '10%', icon: Settings, bgColor: 'bg-blue-500', iconBg: 'bg-blue-600' },
    { id: 2, title: 'Likes', value: '41,410', icon: ThumbsUp, bgColor: 'bg-red-500', iconBg: 'bg-red-600' },
    { id: 3, title: 'Sales', value: '760', icon: ShoppingCart, bgColor: 'bg-green-600', iconBg: 'bg-green-700' },
    { id: 4, title: 'New Members', value: '2,000', icon: Users, bgColor: 'bg-yellow-500', iconBg: 'bg-yellow-600' },
  ];

  const goalCompletions = [
    { id: 1, label: 'Add Products to Cart', current: 160, target: 200, color: 'bg-blue-500', percentage: 80 },
    { id: 2, label: 'Complete Purchase', current: 310, target: 400, color: 'bg-red-500', percentage: 77.5 },
    { id: 3, label: 'Visit Premium Page', current: 480, target: 800, color: 'bg-green-600', percentage: 60 },
    { id: 4, label: 'Send Inquiries', current: 250, target: 500, color: 'bg-yellow-500', percentage: 50 },
  ];

  const summaryStats = [
    { id: 1, label: 'TOTAL REVENUE', value: '$35,210.43', change: '17%', isIncrease: true },
    { id: 2, label: 'TOTAL COST', value: '$10,390.90', change: '0%', isIncrease: null },
    { id: 3, label: 'TOTAL PROFIT', value: '$24,813.53', change: '20%', isIncrease: true },
    { id: 4, label: 'GOAL COMPLETIONS', value: '1200', change: '18%', isIncrease: false },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* title */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold text-gray-900">Dashboard v2</h1>
        <div className="flex items-center gap-2 text-xs">
          <a href="/" className="text-blue-600 hover:text-blue-700 transition-colors">Trang chủ</a>
          <span className="text-gray-400">/</span>
          <span className="text-gray-600">Dashboard v2</span>
        </div>
      </div>

      {/* Stats Grid - 4 columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.id}
              className={`bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-500 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className={`${stat.bgColor} p-4 flex items-center justify-between`}>
                <div className={`${stat.iconBg} p-3 rounded-lg`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-white/90 mt-1">{stat.title}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Chart and Goal Completion */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Section */}
        <div
          className={`lg:col-span-2 bg-white rounded-lg border border-gray-200 overflow-hidden transition-all duration-700 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          style={{ transitionDelay: '400ms' }}
        >
          {/* Header */}
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-gray-900">Monthly Recap Report</h2>
              <p className="text-xs text-gray-500 mt-1">Sales: 1 Jan, 2023 - 30 Jul, 2023</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
                <Minus className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Chart */}
          <div className="p-5">
            <div className="h-64">
              <canvas ref={chartRef}></canvas>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="px-5 py-4 border-t border-gray-100 bg-gray-50">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {summaryStats.map((stat) => (
                <div key={stat.id} className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    {stat.isIncrease === true && <TrendingUp className="w-3 h-3 text-green-600" />}
                    {stat.isIncrease === false && <TrendingDown className="w-3 h-3 text-red-600" />}
                    <span className={`text-xs font-semibold ${stat.isIncrease === true ? 'text-green-600' :
                      stat.isIncrease === false ? 'text-red-600' : 'text-blue-600'
                      }`}>
                      {stat.change}
                    </span>
                  </div>
                  <p className="text-lg font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Goal Completion */}
        <div
          className={`bg-white rounded-lg border border-gray-200 overflow-hidden transition-all duration-700 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          style={{ transitionDelay: '500ms' }}
        >
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="text-base font-semibold text-gray-900">Goal Completion</h2>
          </div>

          <div className="p-5 space-y-6">
            {goalCompletions.map((goal, index) => (
              <div
                key={goal.id}
                className={`transition-all duration-700 ${animate ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                  }`}
                style={{ transitionDelay: `${600 + index * 100}ms` }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-900">{goal.label}</span>
                  <span className="text-sm font-bold text-gray-900">{goal.current}/{goal.target}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                  <div
                    className={`${goal.color} h-full rounded-full transition-all duration-1500 ease-out`}
                    style={{
                      width: animate ? `${goal.percentage}%` : '0%',
                      transitionDelay: `${700 + index * 100}ms`
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section - Chat, Members, Stats */}
      <BottomWidgets animate={animate} />

      {/* Bottom Section 2 - Orders, Browser, Products */}
      <BottomWidgets2 animate={animate} />
    </div>
  );
};

export default Dashboard_v2;
