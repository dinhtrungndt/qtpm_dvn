import { Award, DollarSign, MessageCircle, Minus, Package, Send, ShoppingBag, Target, TrendingUp, Users, X, Zap } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);

  const messages = [
    {
      id: 1,
      sender: 'Nguyễn Văn A',
      content: 'Template này thật sự miễn phí à? Không thể tin được!',
      time: '23 Thg 1 2:00 chiều',
      isOwn: false,
      avatar: 'https://i.pravatar.cc/150?img=12'
    },
    {
      id: 2,
      sender: 'Bạn',
      content: 'Đúng vậy, hoàn toàn miễn phí!',
      time: '23 Thg 1 2:05 chiều',
      isOwn: true,
      avatar: 'https://i.pravatar.cc/150?img=8'
    },
    {
      id: 3,
      sender: 'Nguyễn Văn A',
      content: 'Làm việc với DVN Technology trên ứng dụng mới thật tuyệt! Bạn có muốn tham gia không?',
      time: '23 Thg 1 5:37 chiều',
      isOwn: false,
      avatar: 'https://i.pravatar.cc/150?img=12'
    },
    {
      id: 4,
      sender: 'Bạn',
      content: 'Chắc chắn rồi! Tôi rất hứng thú với cơ hội này.',
      time: '23 Thg 1 5:40 chiều',
      isOwn: true,
      avatar: 'https://i.pravatar.cc/150?img=8'
    },
    {
      id: 5,
      sender: 'Nguyễn Văn A',
      content: 'Tuyệt vời! Tôi sẽ gửi cho bạn thêm chi tiết qua email.',
      time: '23 Thg 1 5:45 chiều',
      isOwn: false,
      avatar: 'https://i.pravatar.cc/150?img=12'
    },
    {
      id: 6,
      sender: 'Bạn',
      content: 'Cảm ơn bạn! Tôi sẽ chờ email của bạn.',
      time: '23 Thg 1 5:50 chiều',
      isOwn: true,
      avatar: 'https://i.pravatar.cc/150?img=8'
    },
    {
      id: 7,
      sender: 'Nguyễn Văn A',
      content: 'Không có gì! Hẹn gặp lại bạn sớm.',
      time: '23 Thg 1 5:55 chiều',
      isOwn: false,
      avatar: 'https://i.pravatar.cc/150?img=12'
    },
    {
      id: 8,
      sender: 'Bạn',
      content: 'Hẹn gặp lại! Chúc bạn một ngày tốt lành.',
      time: '23 Thg 1 6:00 chiều',
      isOwn: true,
      avatar: 'https://i.pravatar.cc/150?img=8'
    }
  ];

  const quickStats = [
    {
      id: 1,
      title: 'Doanh thu hôm nay',
      value: '₫24.5M',
      change: '+15.3%',
      isIncrease: true,
      icon: DollarSign,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200'
    },
    {
      id: 2,
      title: 'Khách truy cập',
      value: '3,247',
      change: '+8.1%',
      isIncrease: true,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      id: 3,
      title: 'Đơn chờ xử lý',
      value: '156',
      change: '-12.4%',
      isIncrease: false,
      icon: ShoppingBag,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200'
    },
    {
      id: 4,
      title: 'Sản phẩm bán chạy',
      value: '89',
      change: '+23.7%',
      isIncrease: true,
      icon: Package,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    }
  ];

  const performanceMetrics = [
    {
      id: 1,
      label: 'Mục tiêu tháng',
      current: 75,
      target: 100,
      icon: Target,
      color: 'bg-blue-500'
    },
    {
      id: 2,
      label: 'Hiệu suất',
      current: 88,
      target: 100,
      icon: TrendingUp,
      color: 'bg-emerald-500'
    },
    {
      id: 3,
      label: 'Đánh giá',
      current: 92,
      target: 100,
      icon: Award,
      color: 'bg-amber-500'
    }
  ];

  const handleSend = () => {
    if (message.trim()) {
      ////  console.log('Sending:', message);
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Chat - Left Side */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            <h3 className="font-semibold">Trò Chuyện Trực Tiếp</h3>
            <span className="bg-white/20 backdrop-blur-sm text-xs font-semibold px-2 py-0.5 rounded-full">
              3
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1 hover:bg-white/20 rounded transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <button className="p-1 hover:bg-white/20 rounded transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Chat Content */}
        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="p-4 space-y-4 h-96 overflow-y-auto bg-gray-50">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex gap-3 ${msg.isOwn ? 'flex-row-reverse' : ''}`}>
                  <img
                    src={msg.avatar}
                    alt={msg.sender}
                    className="w-10 h-10 rounded-full flex-shrink-0 object-cover"
                  />
                  <div className={`flex-1 ${msg.isOwn ? 'items-end' : 'items-start'} flex flex-col`}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold text-gray-900">{msg.sender}</span>
                      <span className="text-xs text-gray-500">{msg.time}</span>
                    </div>
                    <div
                      className={`px-4 py-2 rounded-lg max-w-md text-sm ${msg.isOwn
                        ? 'bg-blue-500 text-white rounded-br-none'
                        : 'bg-white text-gray-900 rounded-bl-none border border-gray-200'
                        }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-gray-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Nhập tin nhắn..."
                  className="flex-1 px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={handleSend}
                  className="px-5 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2 font-medium text-sm"
                >
                  <Send className="w-4 h-4" />
                  Gửi
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Quick Stats & Performance - Right Side */}
      <div className="space-y-6">
        {/* Quick Stats */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              <h3 className="font-semibold">Thống Kê Nhanh</h3>
            </div>
            <button className="p-1 hover:bg-white/20 rounded transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-4 space-y-3">
            {quickStats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.id}
                  className={`flex items-center justify-between p-3 rounded-lg border ${stat.borderColor} ${stat.bgColor} hover:shadow-md transition-all`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg ${stat.bgColor} flex items-center justify-center border ${stat.borderColor}`}>
                      <Icon className={`w-5 h-5 ${stat.color}`} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 font-medium">{stat.title}</p>
                      <p className="text-lg font-bold text-gray-900">{stat.value}</p>
                    </div>
                  </div>
                  <div className={`flex items-center gap-1 text-xs font-semibold ${stat.isIncrease ? 'text-green-600' : 'text-red-600'}`}>
                    <TrendingUp className={`w-3 h-3 ${stat.isIncrease ? '' : 'rotate-180'}`} />
                    {stat.change}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              <h3 className="font-semibold">Hiệu Suất</h3>
            </div>
          </div>

          <div className="p-4 space-y-4">
            {performanceMetrics.map((metric) => {
              const Icon = metric.icon;
              const percentage = (metric.current / metric.target) * 100;
              return (
                <div key={metric.id}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-gray-600" />
                      <span className="text-sm font-medium text-gray-900">{metric.label}</span>
                    </div>
                    <span className="text-sm font-bold text-gray-900">{metric.current}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                    <div
                      className={`${metric.color} h-full rounded-full transition-all duration-1000 ease-out`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="px-4 pb-4">
            <Link
              to="#"
              className="block text-center py-2.5 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
            >
              Xem báo cáo chi tiết →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
