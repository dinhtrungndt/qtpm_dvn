import { Camera, ChevronRight, Clock, Home, Mail, MessageCircle, User } from 'lucide-react';
import React from 'react';

const UI_Timeline = () => {
  const timelineData = [
    {
      date: '10 Thg 2, 2023',
      color: 'red',
      items: [
        {
          id: 1,
          icon: <Mail className="w-5 h-5" />,
          iconBg: 'bg-blue-500',
          user: 'Đội hỗ trợ',
          action: 'đã gửi cho bạn một email',
          time: '12:05',
          content: 'Etsy doostang zoodles disqus groupon greplin oooj voxy zoodles, weebly ning heekya handango imeem plugg dopplr jibjab, movity jajah plickers sifteo edmodo ifttt zimbra. Babblely odeo kaboodle quora plaxo ideeli hulu weebly balihoo...',
          buttons: [
            { text: 'Đọc thêm', color: 'bg-blue-600 hover:bg-blue-700' },
            { text: 'Xóa', color: 'bg-red-600 hover:bg-red-700' }
          ]
        },
        {
          id: 2,
          icon: <User className="w-5 h-5" />,
          iconBg: 'bg-green-600',
          user: 'Sarah Young',
          action: 'đã chấp nhận lời mời kết bạn của bạn',
          time: '5 phút trước',
        },
        {
          id: 3,
          icon: <MessageCircle className="w-5 h-5" />,
          iconBg: 'bg-yellow-400',
          user: 'Jay White',
          action: 'đã bình luận bài viết của bạn',
          time: '27 phút trước',
          content: 'Take me to your leader! Switzerland is small and neutral! We are more like Germany, ambitious and misunderstood!',
          buttons: [
            { text: 'Xem bình luận', color: 'bg-yellow-500 hover:bg-yellow-600' }
          ]
        }
      ]
    },
    {
      date: '3 Thg 1, 2023',
      color: 'green',
      items: [
        {
          id: 4,
          icon: <Camera className="w-5 h-5" />,
          iconBg: 'bg-blue-500',
          user: 'Mina Lee',
          action: 'đã tải lên ảnh mới',
          time: '2 ngày trước',
          images: [
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop'
          ]
        },
        {
          id: 5,
          icon: <Clock className="w-5 h-5" />,
          iconBg: 'bg-cyan-400',
          user: 'Ông Doe',
          action: 'đã chia sẻ một video',
          time: '5 ngày trước',
          video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          buttons: [
            { text: 'Xem bình luận', color: 'bg-yellow-500 hover:bg-yellow-600' }
          ]
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      {/* Tiêu đề */}
      <div className="flex items-center justify-between mb-6 animate-slideDown">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">Timeline</h1>
        <div className="flex items-center gap-2 text-sm">
          <a
            href="#"
            className="text-blue-600 hover:text-blue-700 transition-colors duration-200 hover:underline flex items-center gap-1"
          >
            <Home size={14} />
            Trang chủ
          </a>
          <ChevronRight size={14} className="text-gray-400" />
          <span className="text-gray-600">Timeline</span>
        </div>
      </div>

      {/* Dòng thời gian */}
      <div className="relative">
        {/* Đường thẳng dọc */}
        <div className="absolute left-[21px] top-12 bottom-0 w-0.5 bg-gray-300"></div>

        {timelineData.map((section, sectionIdx) => (
          <div key={sectionIdx} className="mb-8 animate-fadeIn" style={{ animationDelay: `${sectionIdx * 0.2}s` }}>
            {/* Nhãn ngày tháng */}
            <div className={`inline-block px-4 py-2 rounded-md text-white font-semibold mb-6 text-sm ${section.color === 'red' ? 'bg-red-600' : 'bg-green-600'
              } animate-slideIn`} style={{ animationDelay: `${sectionIdx * 0.2 + 0.1}s` }}>
              {section.date}
            </div>

            {/* Các mục dòng thời gian */}
            {section.items.map((item, itemIdx) => (
              <div key={item.id} className="relative flex gap-4 mb-6 animate-slideUp" style={{ animationDelay: `${sectionIdx * 0.2 + itemIdx * 0.1}s` }}>
                {/* Biểu tượng */}
                <div className={`flex-shrink-0 w-11 h-11 rounded-full ${item.iconBg} flex items-center justify-center text-white shadow-lg z-10 hover:scale-110 transition-transform duration-300`}>
                  {item.icon}
                </div>

                {/* Thẻ nội dung */}
                <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300">
                  {/* Tiêu đề */}
                  <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-blue-600">{item.user}</span>
                      <span className="text-gray-600 text-sm">{item.action}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-500 text-sm">
                      <Clock size={14} />
                      <span>{item.time}</span>
                    </div>
                  </div>

                  {/* Nội dung */}
                  <div className="p-4">
                    {item.content && (
                      <p className="text-gray-700 mb-4 leading-relaxed text-sm">{item.content}</p>
                    )}

                    {item.images && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                        {item.images.map((img, imgIdx) => (
                          <div key={imgIdx} className="aspect-square rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer">
                            <img src={img} alt="" className="w-full h-full object-cover bg-gray-200" />
                          </div>
                        ))}
                      </div>
                    )}

                    {item.video && (
                      <div className="mb-4 rounded-lg overflow-hidden">
                        <iframe
                          className="w-full aspect-video"
                          src={item.video}
                          title="Video YouTube"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                    )}

                    {item.buttons && (
                      <div className="flex gap-2 flex-wrap">
                        {item.buttons.map((btn, btnIdx) => (
                          <button
                            key={btnIdx}
                            className={`px-4 py-2 text-white text-sm font-medium rounded-md ${btn.color} transition-all duration-200 hover:shadow-md active:scale-95`}
                          >
                            {btn.text}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}

        {/* Chỉ báo kết thúc */}
        <div className="relative flex items-center gap-4 animate-fadeIn" style={{ animationDelay: '0.8s' }}>
          <div className="flex-shrink-0 w-11 h-11 rounded-full bg-gray-400 flex items-center justify-center shadow-lg z-10">
            <Clock className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out backwards;
        }

        .animate-slideDown {
          animation: slideDown 0.4s ease-out;
        }

        .animate-slideIn {
          animation: slideIn 0.5s ease-out backwards;
        }

        .animate-slideUp {
          animation: slideUp 0.5s ease-out backwards;
        }
      `}</style>
    </div>
  );
};

export default UI_Timeline;
