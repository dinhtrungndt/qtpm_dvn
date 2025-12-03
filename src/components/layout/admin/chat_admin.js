import { MessageCircle, MoreVertical, Search, Send } from 'lucide-react';
import { useState } from 'react';

const Chats_Admin = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const users = [
    { id: 1, name: 'Nguyễn Văn An', avatar: 'https://i.pravatar.cc/150?img=1', lastMessage: 'Cảm ơn bạn nhiều!', time: '10:30', unread: 2, online: true },
    { id: 2, name: 'Trần Thị Bình', avatar: 'https://i.pravatar.cc/150?img=2', lastMessage: 'Sản phẩm rất tốt', time: '09:15', unread: 0, online: true },
    { id: 3, name: 'Lê Hoàng Cường', avatar: 'https://i.pravatar.cc/150?img=3', lastMessage: 'Khi nào giao hàng?', time: '08:45', unread: 5, online: false },
    { id: 4, name: 'Phạm Thị Dung', avatar: 'https://i.pravatar.cc/150?img=4', lastMessage: 'Ok, tôi đồng ý', time: 'Hôm qua', unread: 0, online: false },
    { id: 5, name: 'Hoàng Văn Em', avatar: 'https://i.pravatar.cc/150?img=5', lastMessage: 'Cần hỗ trợ gấp', time: 'Hôm qua', unread: 1, online: true },
    { id: 6, name: 'Đỗ Thị Phương', avatar: 'https://i.pravatar.cc/150?img=6', lastMessage: 'Xin chào!', time: '2 ngày trước', unread: 0, online: false },
  ];

  const messages = {
    1: [
      { id: 1, text: 'Xin chào! Tôi cần hỗ trợ về đơn hàng', sender: 'user', time: '10:25' },
      { id: 2, text: 'Chào bạn! Tôi có thể giúp gì cho bạn?', sender: 'admin', time: '10:26' },
      { id: 3, text: 'Đơn hàng #12345 của tôi đang ở đâu?', sender: 'user', time: '10:27' },
      { id: 4, text: 'Để tôi kiểm tra giúp bạn nhé', sender: 'admin', time: '10:28' },
      { id: 5, text: 'Đơn hàng đang trên đường giao đến bạn', sender: 'admin', time: '10:29' },
      { id: 6, text: 'Cảm ơn bạn nhiều!', sender: 'user', time: '10:30' },
    ],
    2: [
      { id: 1, text: 'Sản phẩm rất tốt, tôi rất hài lòng', sender: 'user', time: '09:15' },
    ],
    3: [
      { id: 1, text: 'Khi nào giao hàng?', sender: 'user', time: '08:45' },
      { id: 2, text: 'Đơn hàng sẽ được giao trong 2-3 ngày', sender: 'admin', time: '08:46' },
      { id: 3, text: 'Có thể giao nhanh hơn không?', sender: 'user', time: '08:47' },
    ],
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessage('');
    }
  };

  return (
    <div className="flex h-[calc(100vh-64px)] bg-gray-100 overflow-hidden">
      {/* Sidebar - Danh sách người dùng */}
      <div className="w-full md:w-96 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <MessageCircle className="text-blue-500" />
            Chats Care
          </h1>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Tìm kiếm người dùng..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
        </div>

        {/* User List */}
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              onClick={() => setSelectedUser(user)}
              className={`p-4 border-b border-gray-100 cursor-pointer transition-all hover:bg-gray-50 ${selectedUser?.id === user.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                }`}
            >
              <div className="flex items-start gap-3">
                <div className="relative">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {user.online && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-gray-800 truncate">{user.name}</h3>
                    <span className="text-xs text-gray-500">{user.time}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600 truncate">{user.lastMessage}</p>
                    {user.unread > 0 && (
                      <span className="ml-2 px-2 py-1 text-xs font-bold text-white bg-blue-500 rounded-full animate-pulse">
                        {user.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-gray-50">
        {selectedUser ? (
          <>
            {/* Chat Header */}
            <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={selectedUser.avatar}
                    alt={selectedUser.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  {selectedUser.online && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                  )}
                </div>
                <div>
                  <h2 className="font-semibold text-gray-800">{selectedUser.name}</h2>
                  <p className="text-xs text-gray-500">
                    {selectedUser.online ? 'Đang hoạt động' : 'Không hoạt động'}
                  </p>
                </div>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <MoreVertical className="text-gray-600" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-gray-100 hover:scrollbar-thumb-blue-400">
              {(messages[selectedUser.id] || []).map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'admin' ? 'justify-end' : 'justify-start'} animate-[slideIn_0.3s_ease-out]`}
                >
                  <div
                    className={`max-w-xs md:max-w-md px-4 py-2 rounded-2xl ${msg.sender === 'admin'
                      ? 'bg-blue-500 text-white rounded-br-none'
                      : 'bg-white text-gray-800 rounded-bl-none shadow-sm'
                      }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <span className={`text-xs mt-1 block ${msg.sender === 'admin' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                      {msg.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="bg-white border-t border-gray-200 p-4">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Nhập tin nhắn..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
                <button
                  onClick={handleSendMessage}
                  className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all hover:scale-105 active:scale-95"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center animate-[fadeIn_0.5s_ease-out]">
              <MessageCircle className="w-20 h-20 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                Chọn một cuộc trò chuyện
              </h3>
              <p className="text-gray-500">
                Chọn người dùng từ danh sách bên trái để bắt đầu chat
              </p>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        /* Custom Scrollbar Styles */
        .scrollbar-thin::-webkit-scrollbar {
          width: 8px;
        }

        .scrollbar-thin::-webkit-scrollbar-track {
          background: #f3f4f6;
          border-radius: 10px;
        }

        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 10px;
          transition: background 0.3s;
        }

        .scrollbar-thin:hover::-webkit-scrollbar-thumb {
          background: #9ca3af;
        }

        .scrollbar-thumb-blue-300::-webkit-scrollbar-thumb {
          background: #93c5fd;
        }

        .scrollbar-thumb-blue-300:hover::-webkit-scrollbar-thumb {
          background: #60a5fa;
        }

        /* Firefox scrollbar */
        .scrollbar-thin {
          scrollbar-width: thin;
          scrollbar-color: #d1d5db #f3f4f6;
        }
      `}</style>
    </div>
  );
};

export default Chats_Admin;
