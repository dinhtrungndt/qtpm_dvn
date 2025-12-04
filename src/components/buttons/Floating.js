import { LogIn, MessageCircle, Phone, Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { connectWebSocketChat, getChatHistory, sendMessage, setActiveChat } from '../../stores/redux/actions/chatActions';

const Floating = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { messages } = useSelector((state) => state.chat);

  const [isOpen, setIsOpen] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [msgContent, setMsgContent] = useState("");
  const messagesEndRef = useRef(null);

  const ADMIN_ID = 7;

  useEffect(() => {
    if (isAuthenticated && user?.id) {
      dispatch(connectWebSocketChat(user.id));
    }
  }, [isAuthenticated, user, dispatch]);

  useEffect(() => {
    if (showChat && isAuthenticated) {
      dispatch(setActiveChat({ id: ADMIN_ID }));
      dispatch(getChatHistory(ADMIN_ID));
    }
  }, [showChat, isAuthenticated, dispatch]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!msgContent.trim()) return;

    sendMessage({
      receiver_id: ADMIN_ID,
      content: msgContent
    });
    setMsgContent("");
  };

  const handleOpenChat = () => {
    setShowChat(!showChat);
    setIsOpen(false);
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleZalo = () => {
    window.open("https://zalo.me/0889541507", "_blank");
  };

  const handleCall = () => {
    window.location.href = "tel:+84889541507";
  };

  return (
    <>
      {/* Chat Box */}
      {showChat && (
        <div className="fixed bottom-24 right-6 w-80 bg-white rounded-2xl shadow-2xl z-40 animate-slideUp flex flex-col overflow-hidden h-[450px]">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 flex justify-between items-center shrink-0">
            <h3 className="text-white font-semibold flex items-center gap-2">
              <MessageCircle size={18} /> Hỗ trợ trực tuyến
            </h3>
            <button onClick={() => setShowChat(false)} className="text-white hover:bg-white/20 rounded-full p-1 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 bg-gray-50 p-4 overflow-y-auto flex flex-col">
            {!isAuthenticated ? (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                <LogIn className="w-12 h-12 text-blue-300" />
                <p className="text-gray-600 text-sm">Vui lòng đăng nhập để chat với nhân viên hỗ trợ.</p>
                <Link to="/login" className="px-4 py-2 bg-blue-500 text-white rounded-full text-sm font-medium hover:bg-blue-600">
                  Đăng nhập ngay
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {messages.map((msg, idx) => {
                  const isMe = msg.sender_id === user.id;
                  return (
                    <div key={idx} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] px-3 py-2 rounded-xl text-sm ${isMe ? 'bg-blue-500 text-white rounded-br-none' : 'bg-white text-gray-800 shadow-sm rounded-bl-none'
                        }`}>
                        {msg.content}
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Input Area (Chỉ hiện khi đã login) */}
          {isAuthenticated && (
            <div className="p-3 bg-white border-t border-gray-100 shrink-0">
              <div className="flex gap-2">
                <input
                  value={msgContent}
                  onChange={(e) => setMsgContent(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Nhập tin nhắn..."
                  className="flex-1 px-4 py-2 bg-gray-100 border-none rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <button
                  onClick={handleSendMessage}
                  className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors flex-shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Floating Menu */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Sub buttons */}
        <div
          className={`absolute bottom-16 right-0 flex flex-col gap-3 transition-all duration-300 ${isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
            }`}
        >
          {/* Message Button */}
          <button
            onClick={handleOpenChat}
            className="group relative bg-white hover:bg-blue-50 text-blue-500 p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
            style={{ animationDelay: "0.1s" }}
          >
            <MessageCircle className="w-6 h-6" />
            <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-800 text-white text-sm px-3 py-1 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
              Nhắn tin
            </span>
          </button>

          {/* Zalo Button */}
          <button
            onClick={handleZalo}
            className="group relative bg-white hover:bg-blue-50 text-blue-500 p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
            style={{ animationDelay: "0.2s" }}
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.373 0 0 4.973 0 11.111c0 3.498 1.814 6.614 4.638 8.656-.234 1.696-1.038 5.274-1.087 5.497-.061.283.083.278.183.203.065-.05 3.935-2.661 5.587-3.776C10.203 21.906 11.09 22 12 22c6.627 0 12-4.973 12-11.111C24 4.973 18.627 0 12 0zm.24 14.43l-2.688-2.859-5.234 2.859 5.758-6.116 2.754 2.858 5.168-2.858-5.758 6.116z" />
            </svg>
            <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-800 text-white text-sm px-3 py-1 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
              Chat Zalo
            </span>
          </button>

          {/* Call Button */}
          <button
            onClick={handleCall}
            className="group relative bg-white hover:bg-green-50 text-green-500 p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
            style={{ animationDelay: "0.3s" }}
          >
            <Phone className="w-6 h-6" />
            <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-800 text-white text-sm px-3 py-1 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
              Gọi điện
            </span>
          </button>
        </div>

        {/* Main Button */}
        <button
          onClick={handleToggle}
          className={`relative bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 ${isOpen ? "rotate-45" : ""
            }`}
        >
          {/* Ripple Effect */}
          <span className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-75"></span>
          <span className="absolute inset-0 rounded-full bg-blue-400 animate-pulse"></span>

          {/* Icon */}
          {
            isOpen ? (
              <X className="w-6 h-6 relative z-10 transition-transform duration-300" />
            ) : (
              <Phone
                className={`w-6 h-6 relative z-10 transition-transform duration-300 ${isOpen ? "" : "animate-wiggle"
                  }`}
              />
            )
          }
        </button>
      </div>

      <style>{`
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

        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-10deg); }
          75% { transform: rotate(10deg); }
        }

        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }

        .animate-wiggle {
          animation: wiggle 1s ease-in-out infinite;
        }

        @keyframes ping {
          75%, 100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }

        .animate-ping {
          animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.1);
          }
        }

        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </>
  );
};

export default Floating;
