import { MessageCircle, MoreVertical, Search, Send, User } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  connectWebSocketChat,
  getChatHistory,
  getConversations, markMessagesAsRead,

  sendMessage,
  setActiveChat
} from '../../../stores/redux/actions/chatActions';

const Chats_Admin = () => {
  const dispatch = useDispatch();
  const { user: currentUser } = useSelector(state => state.user);
  const { conversations, activeChatUser, messages } = useSelector(state => state.chat);

  const [messageText, setMessageText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (currentUser?.id) {
      dispatch(connectWebSocketChat(currentUser.id));
      dispatch(getConversations());
    }
  }, [currentUser, dispatch]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSelectUser = (user) => {
    dispatch(setActiveChat(user));
    dispatch(getChatHistory(user.id));

    if (user.unread_count > 0) {
      dispatch(markMessagesAsRead(user.id));
    }
  };

  const handleSendMessage = () => {
    if (messageText.trim() && activeChatUser) {
      sendMessage({
        receiver_id: activeChatUser.id,
        content: messageText
      });
      setMessageText('');
    }
  };

  const formatTime = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    const now = new Date();
    if (date.toDateString() === now.toDateString()) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    return date.toLocaleDateString([], { day: '2-digit', month: '2-digit' });
  };

  const filteredUsers = conversations.filter(u =>
    (u.full_name || u.username).toLowerCase().includes(searchTerm.toLowerCase())

  );

  return (
    <div className="flex h-[calc(100vh-64px)] bg-gray-100 overflow-hidden">
      {/* Sidebar - Danh sách người dùng */}
      <div className="w-full md:w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <MessageCircle className="text-blue-500" /> Chats Care
          </h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Tìm khách hàng..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* User List */}
        <div className="flex-1 overflow-y-auto">
          {filteredUsers.length === 0 ? (
            <p className="text-center text-gray-400 mt-4 text-sm">Chưa có người dùng nào.</p>
          ) : filteredUsers.map((u) => (
            <div
              key={u.id}
              onClick={() => handleSelectUser(u)}
              className={`p-3 border-b border-gray-50 cursor-pointer hover:bg-gray-50 transition-colors relative ${activeChatUser?.id === u.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                }`}
            >
              <div className="flex items-center gap-3">
                <div className="relative shrink-0">
                  {u.avatar ? (
                    <img src={u.avatar} alt={u.username} className="w-12 h-12 rounded-full object-cover" />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                      <User size={24} />
                    </div>
                  )}
                  {/* Status Online (Demo) */}
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className={`font-semibold text-sm truncate ${u.unread_count > 0 ? 'text-gray-900 font-bold' : 'text-gray-700'}`}>
                      {u.full_name || u.username}
                    </h3>
                    <span className={`text-xs ${u.unread_count > 0 ? 'text-blue-600 font-semibold' : 'text-gray-400'}`}>
                      {formatTime(u.last_message_time)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <p className={`text-xs truncate max-w-[140px] ${u.unread_count > 0 ? 'text-gray-800 font-medium' : 'text-gray-500'}`}>
                      {u.last_message || "Chưa có tin nhắn"}
                    </p>

                    {/* Badge đếm số tin chưa đọc */}
                    {u.unread_count > 0 && (
                      <span className="ml-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full min-w-[20px] text-center">
                        {u.unread_count}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area - (Giữ nguyên phần này như cũ) */}
      <div className="flex-1 flex flex-col bg-gray-50">
        {activeChatUser ? (
          <>
            <div className="bg-white border-b border-gray-200 p-3 flex items-center justify-between shadow-sm h-16">
              <div className="flex items-center gap-3">
                {activeChatUser.avatar ? (
                  <img src={activeChatUser.avatar} alt="" className="w-9 h-9 rounded-full object-cover" />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center">
                    <User size={18} />
                  </div>
                )}
                <div>
                  <h2 className="font-semibold text-gray-800 text-sm">{activeChatUser.full_name || activeChatUser.username}</h2>
                  <p className="text-xs text-green-500 flex items-center gap-1">Online</p>
                </div>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-full"><MoreVertical className="w-5 h-5 text-gray-500" /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, idx) => {
                const isAdminSender = msg.sender_id === currentUser.id;
                return (
                  <div key={idx} className={`flex ${isAdminSender ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-md px-4 py-2 rounded-2xl text-sm ${isAdminSender ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white text-gray-800 shadow-sm rounded-bl-none'
                      }`}>
                      <p>{msg.content}</p>
                      <span className={`text-[10px] mt-1 block ${isAdminSender ? 'text-blue-100' : 'text-gray-400'}`}>
                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            <div className="bg-white border-t border-gray-200 p-4">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Nhập tin nhắn..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1 px-4 py-2.5 bg-gray-100 rounded-full border-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                <button
                  onClick={handleSendMessage}
                  className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-transform active:scale-95"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
            <MessageCircle className="w-16 h-16 mb-4 opacity-20" />
            <p>Chọn một người dùng để bắt đầu chat</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chats_Admin;
