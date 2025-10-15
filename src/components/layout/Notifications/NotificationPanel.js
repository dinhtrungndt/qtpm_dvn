const NotificationPanel = () => {
  return (
    <div className="w-64 md:w-80 bg-white border border-gray-300 rounded-lg shadow-lg p-2">
      <div className="text-lg font-semibold">15 Notifications</div>
      <div className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
        <span className="text-xl">✉️</span>
        <div>
          <div className="font-semibold">4 new messages</div>
          <div className="text-sm text-gray-500">3 mins</div>
        </div>
      </div>
      <div className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
        <span className="text-xl">👥</span>
        <div>
          <div className="font-semibold">8 friend requests</div>
          <div className="text-sm text-gray-500">12 hours</div>
        </div>
      </div>
      <div className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
        <span className="text-xl">📄</span>
        <div>
          <div className="font-semibold">3 new reports</div>
          <div className="text-sm text-gray-500">2 days</div>
        </div>
      </div>
      <div className="text-center mt-2 text-blue-500 cursor-pointer hover:underline">See All Notifications</div>
    </div>
  );
};

export default NotificationPanel;
