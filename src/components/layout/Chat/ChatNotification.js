const ChatNotification = () => {
  return (
    <div className="w-64 md:w-80 bg-white border border-gray-300 rounded-lg rounded-tr-none shadow-lg p-2">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
          <img src="https://via.placeholder.com/40" alt="Brad Diesel" className="w-10 h-10 rounded-full" />
          <div>
            <div className="font-semibold">Brad Diesel</div>
            <div className="text-sm text-gray-500">Call me whenever you can...</div>
            <div className="text-xs text-gray-400">4 Hours Ago</div>
          </div>
          <span className="ml-auto text-yellow-500">★</span>
        </div>
        <div className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
          <img src="https://via.placeholder.com/40" alt="John Pierce" className="w-10 h-10 rounded-full" />
          <div>
            <div className="font-semibold">John Pierce</div>
            <div className="text-sm text-gray-500">I got your message bro</div>
            <div className="text-xs text-gray-400">4 Hours Ago</div>
          </div>
          <span className="ml-auto text-gray-400">★</span>
        </div>
        <div className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
          <img src="https://via.placeholder.com/40" alt="Nora Silvester" className="w-10 h-10 rounded-full" />
          <div>
            <div className="font-semibold">Nora Silvester</div>
            <div className="text-sm text-gray-500">The subject goes here</div>
            <div className="text-xs text-gray-400">4 Hours Ago</div>
          </div>
          <span className="ml-auto text-yellow-500">★</span>
        </div>
      </div>
      <div className="text-center mt-2 text-blue-500 cursor-pointer hover:underline">See All Messages</div>
    </div>
  );
};

export default ChatNotification;
