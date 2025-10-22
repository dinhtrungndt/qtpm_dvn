import {
  AlertCircle,
  Bell,
  Check,
  Eye,
  EyeOff,
  History,
  Lock,
  LogOut,
  Moon,
  Save,
  Trash2,
  User,
  X,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  changePassword,
  deleteAccount,
  updateProfile,
} from '../../stores/redux/actions/userActions';

const Settings = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, isLoading, message, error } = useSelector(state => state.user);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    full_name: '',
    role: '',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    systemNotifications: true,
    promotions: false,
    loginAlerts: true,
    frequencyDaily: true,
  });

  const [displaySettings, setDisplaySettings] = useState({
    theme: 'light',
    language: 'vi',
    timezone: 'Asia/Ho_Chi_Minh',
  });

  const [privacySettings, setPrivacySettings] = useState({
    publicProfile: false,
    showActivity: false,
    allowMessages: true,
  });

  const [sessions, setSessions] = useState([]);
  const [loginHistory, setLoginHistory] = useState([]);

  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('account');
  const [localMessage, setLocalMessage] = useState({ type: '', text: '' });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState('');

  // Initialize từ Redux user
  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || '',
        email: user.email || '',
        full_name: user.full_name || '',
        role: user.role || 'user',
      });
      // Mock sessions data
      setSessions([
        { id: 1, device: 'Chrome - Windows', lastActive: 'Vừa xong', current: true },
        { id: 2, device: 'Safari - MacOS', lastActive: '2 giờ trước', current: false },
      ]);
      // Mock login history
      setLoginHistory([
        {
          id: 1,
          date: '2024-12-19 14:30',
          ip: '192.168.1.1',
          device: 'Chrome/Windows',
          status: 'Thành công',
        },
        {
          id: 2,
          date: '2024-12-18 09:15',
          ip: '192.168.1.1',
          device: 'Chrome/Windows',
          status: 'Thành công',
        },
        {
          id: 3,
          date: '2024-12-17 16:45',
          ip: '192.168.1.2',
          device: 'Safari/MacOS',
          status: 'Thành công',
        },
      ]);
    }
  }, [user]);

  // Handle Redux messages and errors
  useEffect(() => {
    if (message) {
      setLocalMessage({ type: 'success', text: message });
    }
    if (error) {
      setLocalMessage({
        type: 'error',
        text: error.response?.data?.detail || error.message || 'Có lỗi xảy ra!',
      });
    }
  }, [message, error]);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = e => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const handleNotificationChange = e => {
    const { name, type, checked } = e.target;
    setNotificationSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : e.target.value,
    }));
  };

  const handleDisplayChange = e => {
    const { name, value } = e.target;
    setDisplaySettings(prev => ({ ...prev, [name]: value }));
  };

  const handlePrivacyChange = e => {
    const { name, type, checked } = e.target;
    setPrivacySettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : e.target.value,
    }));
  };

  const handleSaveProfile = () => {
    dispatch(
      updateProfile({
        username: formData.username,
        email: formData.email,
        full_name: formData.full_name,
      })
    );
  };

  const handleChangePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setLocalMessage({ type: 'error', text: 'Mật khẩu xác nhận không khớp!' });
      return;
    }
    if (passwordData.newPassword.length < 6) {
      setLocalMessage({ type: 'error', text: 'Mật khẩu mới phải có ít nhất 6 ký tự!' });
      return;
    }
    dispatch(changePassword(passwordData));
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleLogoutDevice = sessionId => {
    setLocalMessage({ type: 'success', text: 'Đã đăng xuất khỏi thiết bị' });
    setSessions(sessions.filter(s => s.id !== sessionId));
  };

  const handleSaveNotifications = () => {
    setLocalMessage({ type: 'success', text: 'Cập nhật cài đặt thông báo thành công!' });
  };

  const handleSaveDisplay = () => {
    setLocalMessage({ type: 'success', text: 'Cập nhật cài đặt hiển thị thành công!' });
  };

  const handleSavePrivacy = () => {
    setLocalMessage({ type: 'success', text: 'Cập nhật cài đặt quyền riêng tư thành công!' });
  };

  const handleDeleteAccount = () => {
    if (deleteConfirm !== formData.username) {
      setLocalMessage({ type: 'error', text: 'Tên đăng nhập không khớp!' });
      return;
    }
    dispatch(deleteAccount(user.id));
    setShowDeleteModal(false);
    setDeleteConfirm('');
  };

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center max-w-md">
          <h2 className="text-xl font-bold text-slate-800 mb-2">Vui lòng đăng nhập</h2>
          <p className="text-slate-600">Bạn cần đăng nhập để truy cập trang cài đặt</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-6 lg:p-8 mb-28">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-fadeIn">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Cài đặt</h1>
          <p className="text-slate-600">Quản lý thông tin cá nhân, bảo mật và các tùy chọn khác</p>
        </div>

        {/* Message Alert */}
        {localMessage.text && (
          <div
            className={`mb-6 p-4 rounded-lg animate-slideDown ${
              localMessage.type === 'success'
                ? 'bg-green-50 text-green-800 border border-green-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}
          >
            <div className="flex items-center gap-2">
              {localMessage.type === 'success' ? (
                <Check className="w-5 h-5" />
              ) : (
                <X className="w-5 h-5" />
              )}
              <span>{localMessage.text}</span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-4 sticky top-4 space-y-2">
              {[
                { id: 'account', label: 'Tài khoản', icon: User },
                { id: 'security', label: 'Bảo mật', icon: Lock },
                { id: 'notifications', label: 'Thông báo', icon: Bell },
                { id: 'display', label: 'Hiển thị', icon: Moon },
                { id: 'privacy', label: 'Quyền riêng tư', icon: Eye },
                { id: 'activity', label: 'Hoạt động', icon: History },
              ].map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      activeTab === tab.id
                        ? 'bg-blue-500 text-white shadow-md'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Account Tab */}
            {activeTab === 'account' && (
              <div className="bg-white rounded-lg shadow-sm p-6 space-y-6 animate-fadeIn">
                <div>
                  <h2 className="text-xl font-bold text-slate-800 mb-4">Thông tin cá nhân</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Tên đăng nhập</label>
                      <input
                        type="text"
                        value={formData.username}
                        disabled
                        className="w-full px-4 py-2 rounded-lg border border-slate-300 bg-slate-50 text-slate-500"
                      />
                      <p className="text-xs text-slate-500">Không thể thay đổi</p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium text-slate-700">Họ và tên</label>
                      <input
                        type="text"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleSaveProfile}
                  disabled={isLoading}
                  className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-all disabled:opacity-50 flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  {isLoading ? 'Đang lưu...' : 'Lưu thay đổi'}
                </button>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="bg-white rounded-lg shadow-sm p-6 space-y-6 animate-fadeIn">
                <div>
                  <h2 className="text-xl font-bold text-slate-800 mb-4">Đổi mật khẩu</h2>
                  <div className="space-y-4 max-w-md">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">
                        Mật khẩu hiện tại
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          name="currentPassword"
                          value={passwordData.currentPassword}
                          onChange={handlePasswordChange}
                          className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                        >
                          {showPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Mật khẩu mới</label>
                      <div className="relative">
                        <input
                          type={showNewPassword ? 'text' : 'password'}
                          name="newPassword"
                          value={passwordData.newPassword}
                          onChange={handlePasswordChange}
                          className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                        >
                          {showNewPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">
                        Xác nhận mật khẩu mới
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                        className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <button
                    onClick={handleChangePassword}
                    disabled={isLoading}
                    className="mt-4 px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-all disabled:opacity-50 flex items-center gap-2"
                  >
                    <Lock className="w-4 h-4" />
                    {isLoading ? 'Đang cập nhật...' : 'Đổi mật khẩu'}
                  </button>
                </div>

                <hr className="border-slate-200" />

                <div>
                  <h3 className="text-lg font-bold text-slate-800 mb-4">Quản lý phiên đăng nhập</h3>
                  <div className="space-y-3">
                    {sessions.map(session => (
                      <div
                        key={session.id}
                        className="flex items-center justify-between p-4 border border-slate-200 rounded-lg"
                      >
                        <div>
                          <p className="font-medium text-slate-800">{session.device}</p>
                          <p className="text-sm text-slate-600">
                            {session.lastActive} {session.current && '(Phiên hiện tại)'}
                          </p>
                        </div>
                        {!session.current && (
                          <button
                            onClick={() => handleLogoutDevice(session.id)}
                            className="px-3 py-1 text-red-600 hover:bg-red-50 rounded-lg transition-all text-sm font-medium flex items-center gap-1"
                          >
                            <LogOut className="w-4 h-4" />
                            Đăng xuất
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <hr className="border-slate-200" />

                <div>
                  <h3 className="text-lg font-bold text-red-600 mb-4 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    Vùng nguy hiểm
                  </h3>
                  <button
                    onClick={() => setShowDeleteModal(true)}
                    className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-all flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Xóa tài khoản
                  </button>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="bg-white rounded-lg shadow-sm p-6 space-y-6 animate-fadeIn">
                <h2 className="text-xl font-bold text-slate-800 mb-4">Cài đặt thông báo</h2>
                <div className="space-y-4">
                  {[
                    {
                      name: 'emailNotifications',
                      label: 'Thông báo qua Email',
                      desc: 'Nhận cập nhật qua email',
                    },
                    {
                      name: 'systemNotifications',
                      label: 'Thông báo trong hệ thống',
                      desc: 'Bật thông báo trên website',
                    },
                    {
                      name: 'promotions',
                      label: 'Thông báo khuyến mãi',
                      desc: 'Nhận thông báo về khuyến mãi',
                    },
                    {
                      name: 'loginAlerts',
                      label: 'Cảnh báo đăng nhập',
                      desc: 'Nhận thông báo khi có đăng nhập mới',
                    },
                  ].map(item => (
                    <div
                      key={item.name}
                      className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-all"
                    >
                      <div>
                        <p className="font-medium text-slate-800">{item.label}</p>
                        <p className="text-sm text-slate-600">{item.desc}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name={item.name}
                          checked={notificationSettings[item.name]}
                          onChange={handleNotificationChange}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  ))}
                  <div className="p-4 border border-slate-200 rounded-lg">
                    <p className="font-medium text-slate-800 mb-3">Tần suất nhận thông báo</p>
                    <select
                      name="frequency"
                      className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="daily">Hàng ngày</option>
                      <option value="weekly">Hàng tuần</option>
                      <option value="monthly">Hàng tháng</option>
                    </select>
                  </div>
                </div>
                <button
                  onClick={handleSaveNotifications}
                  disabled={isLoading}
                  className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-all disabled:opacity-50 flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  {isLoading ? 'Đang lưu...' : 'Lưu thay đổi'}
                </button>
              </div>
            )}

            {/* Display Tab */}
            {activeTab === 'display' && (
              <div className="bg-white rounded-lg shadow-sm p-6 space-y-6 animate-fadeIn">
                <h2 className="text-xl font-bold text-slate-800 mb-4">Cài đặt hiển thị</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Chế độ hiển thị</label>
                    <select
                      name="theme"
                      value={displaySettings.theme}
                      onChange={handleDisplayChange}
                      className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="light">Sáng</option>
                      <option value="dark">Tối</option>
                      <option value="auto">Tự động</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Ngôn ngữ</label>
                    <select
                      name="language"
                      value={displaySettings.language}
                      onChange={handleDisplayChange}
                      className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="vi">Tiếng Việt</option>
                      <option value="en">English</option>
                      <option value="zh">中文</option>
                    </select>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-slate-700">Múi giờ</label>
                    <select
                      name="timezone"
                      value={displaySettings.timezone}
                      onChange={handleDisplayChange}
                      className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Asia/Ho_Chi_Minh">Asia/Ho Chi Minh (UTC+7)</option>
                      <option value="Asia/Bangkok">Asia/Bangkok (UTC+7)</option>
                      <option value="Asia/Singapore">Asia/Singapore (UTC+8)</option>
                      <option value="UTC">UTC (UTC+0)</option>
                    </select>
                  </div>
                </div>
                <button
                  onClick={handleSaveDisplay}
                  disabled={isLoading}
                  className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-all disabled:opacity-50 flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  {isLoading ? 'Đang lưu...' : 'Lưu thay đổi'}
                </button>
              </div>
            )}

            {/* Privacy Tab */}
            {activeTab === 'privacy' && (
              <div className="bg-white rounded-lg shadow-sm p-6 space-y-6 animate-fadeIn">
                <h2 className="text-xl font-bold text-slate-800 mb-4">Quyền riêng tư</h2>
                <div className="space-y-4">
                  {[
                    {
                      name: 'publicProfile',
                      label: 'Hồ sơ công khai',
                      desc: 'Cho phép người khác xem hồ sơ của bạn',
                    },
                    {
                      name: 'showActivity',
                      label: 'Hiển thị hoạt động',
                      desc: 'Cho phép người khác xem hoạt động gần đây',
                    },
                    {
                      name: 'allowMessages',
                      label: 'Cho phép tin nhắn',
                      desc: 'Cho phép người khác gửi tin nhắn cho bạn',
                    },
                  ].map(item => (
                    <div
                      key={item.name}
                      className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-all"
                    >
                      <div>
                        <p className="font-medium text-slate-800">{item.label}</p>
                        <p className="text-sm text-slate-600">{item.desc}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name={item.name}
                          checked={privacySettings[item.name]}
                          onChange={handlePrivacyChange}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
                <button
                  onClick={handleSavePrivacy}
                  disabled={isLoading}
                  className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-all disabled:opacity-50 flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  {isLoading ? 'Đang lưu...' : 'Lưu thay đổi'}
                </button>
              </div>
            )}

            {/* Activity Tab */}
            {activeTab === 'activity' && (
              <div className="bg-white rounded-lg shadow-sm p-6 animate-fadeIn">
                <h2 className="text-xl font-bold text-slate-800 mb-4">Lịch sử đăng nhập</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="border-b border-slate-200">
                      <tr>
                        <th className="text-left py-3 px-4 font-medium text-slate-700">
                          Thời gian
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-slate-700">Thiết bị</th>
                        <th className="text-left py-3 px-4 font-medium text-slate-700">
                          IP Address
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-slate-700">
                          Trạng thái
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {loginHistory.map(item => (
                        <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50">
                          <td className="py-3 px-4 text-slate-700">{item.date}</td>
                          <td className="py-3 px-4 text-slate-700">{item.device}</td>
                          <td className="py-3 px-4 text-slate-700">{item.ip}</td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                              {item.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-6 animate-scaleIn">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-100 rounded-full">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-800">Xóa tài khoản?</h3>
            </div>
            <p className="text-slate-600 mb-4">
              Hành động này không thể hoàn tác. Tất cả dữ liệu của bạn sẽ bị xóa vĩnh viễn.
            </p>
            <div className="mb-4">
              <p className="text-sm text-slate-700 mb-2">Nhập tên đăng nhập để xác nhận:</p>
              <input
                type="text"
                value={deleteConfirm}
                onChange={e => setDeleteConfirm(e.target.value)}
                placeholder={formData.username}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeleteConfirm('');
                }}
                className="flex-1 px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg font-medium transition-all"
              >
                Hủy
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={isLoading || deleteConfirm !== formData.username}
                className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                {isLoading ? 'Đang xóa...' : 'Xóa vĩnh viễn'}
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slideDown {
          from {
            transform: translateY(-20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes scaleIn {
          from {
            transform: scale(0.95);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        .animate-slideDown {
          animation: slideDown 0.5s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Settings;
