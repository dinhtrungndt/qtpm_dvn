const OpenUser = ({ userMenuRef, handleLogout }) => {
  return (
    <div
      ref={userMenuRef}
      className="absolute top-10 right-4 bg-white border rounded shadow-lg w-48 z-50 border-blue-300"
    >
      <a href="/" className="block px-4 py-2 text-gray-800 hover:bg-gray-300">Trang chủ</a>
      <a href="/dashboard" className="block px-4 py-2 text-gray-800 hover:bg-gray-300">Dashboard</a>
      <a href="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-300">Hồ sơ</a>
      <a href="/settings" className="block px-4 py-2 text-gray-800 hover:bg-gray-300">Cài đặt</a>
      <button
        onClick={handleLogout}
        className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-300"
      >
        Đăng xuất
      </button>
    </div>
  );
};

export default OpenUser;
