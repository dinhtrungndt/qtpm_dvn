import { MessageCircle, Phone, Send, X } from "lucide-react";
import { useState } from "react";

const Floating = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [message, setMessage] = useState("");

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleZalo = () => {
    window.open("https://zalo.me/0889541507", "_blank");
  };

  const handleCall = () => {
    window.location.href = "tel:+84889541507";
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log("Tin nhắn:", message);
      alert("Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất.");
      setMessage("");
      setShowChat(false);
    }
  };

  return (
    <>
      {/* Chat Box */}
      {showChat && (
        <div className="fixed bottom-24 right-6 w-80 bg-white rounded-2xl shadow-2xl z-40 animate-slideUp">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-t-2xl flex justify-between items-center">
            <h3 className="text-white font-semibold">Nhắn tin cho chúng tôi</h3>
            <button
              onClick={() => setShowChat(false)}
              className="text-white hover:bg-white/20 rounded-full p-1 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-4">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Nhập tin nhắn của bạn..."
              className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSendMessage}
              className="w-full mt-3 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors font-medium flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              Gửi tin nhắn
            </button>
          </div>
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
            onClick={() => {
              setShowChat(!showChat);
              setIsOpen(false);
            }}
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
