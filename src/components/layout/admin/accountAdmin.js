import {
  Activity,
  AlertCircle,
  Calendar,
  Camera,
  Edit2, Mail,
  Save,
  Settings,
  Shield,
  Trash2,
  User,
  UserCheck,
  Users,
  UserX,
  X
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword, updateProfile } from '../../../stores/redux/actions/userActions';

const AccountAdmin = () => {
  const dispatch = useDispatch();
  const { user, message, messageType, isLoading } = useSelector(state => state.user);

  const [isEditing, setIsEditing] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    full_name: '',
    avatar: '',
    file: null,
    role: 'admin',
    is_active: true,
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [passwordErrors, setPasswordErrors] = useState({
    current: '',
    newMatchOld: '',
    confirm: ''
  });

  // Xử lý thông báo tự động tắt
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => dispatch({ type: 'CLEAR_MESSAGE' }), 4000);
      return () => clearTimeout(timer);
    }
  }, [message, dispatch]);

  // Khởi tạo dữ liệu từ user
  useEffect(() => {
    setTimeout(() => setAnimate(true), 100);
    if (user) {
      setFormData({
        username: user.username || '',
        email: user.email || '',
        full_name: user.full_name || '',
        avatar: user.avatar || 'https://dvntechnology.com/icons/Logo.png',
        file: null,
        role: user.role || 'admin',
        is_active: user.is_active !== undefined ? user.is_active : true,
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const validatePassword = () => {
    setPasswordErrors({ current: '', newMatchOld: '', confirm: '' });

    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      setPasswordErrors(prev => ({ ...prev, current: 'Vui lòng nhập đầy đủ' }));
      return false;
    }
    if (passwordData.newPassword === passwordData.currentPassword) {
      setPasswordErrors(prev => ({ ...prev, newMatchOld: 'Mật khẩu mới không được trùng mật khẩu cũ' }));
      return false;
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordErrors(prev => ({ ...prev, confirm: 'Xác nhận mật khẩu không khớp' }));
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    setIsSaving(true);

    try {
      // CHỈ gọi đổi mật khẩu nếu có nhập
      const hasPasswordInput =
        passwordData.currentPassword?.trim() &&
        passwordData.newPassword?.trim();

      if (hasPasswordInput) {
        if (!validatePassword()) {
          setIsSaving(false);
          return;
        }
        await dispatch(changePassword({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        }));
      }

      // Cập nhật profile
      await dispatch(updateProfile({
        username: formData.username,
        email: formData.email,
        full_name: formData.full_name,
        ...(formData.file && { file: formData.file }),
      }));

      setIsSaving(false);
      setIsEditing(false);
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });

    } catch (error) {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setPasswordErrors({ current: '', newMatchOld: '', confirm: '' });

    if (user) {
      setFormData({
        username: user.username || '',
        email: user.email || '',
        full_name: user.full_name || '',
        avatar: user.avatar || 'https://dvntechnology.com/icons/Logo.png',
        file: null,
        role: user.role || 'admin',
        is_active: user.is_active !== undefined ? user.is_active : true,
      });
    }
  };

  const adminStats = [
    { id: 1, label: 'Tổng người dùng', value: '156', icon: Users, color: 'bg-blue-500', change: '+12%' },
    { id: 2, label: 'Hoạt động', value: '142', icon: UserCheck, color: 'bg-emerald-500', change: '+8%' },
    { id: 3, label: 'Bị khóa', value: '14', icon: UserX, color: 'bg-red-500', change: '-3%' },
    { id: 4, label: 'Đang online', value: '48', icon: Activity, color: 'bg-purple-500', change: '+15%' },
  ];

  const recentActivities = [
    { id: 1, action: 'Đăng nhập hệ thống', time: '2 phút trước', type: 'login' },
    { id: 2, action: 'Cập nhật người dùng #156', time: '15 phút trước', type: 'update' },
    { id: 3, action: 'Xóa sản phẩm #45', time: '1 giờ trước', type: 'delete' },
    { id: 4, action: 'Thêm danh mục mới', time: '2 giờ trước', type: 'create' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4 mx-auto max-w-7xl">
        {/* Toast Notification */}
        {message && (
          <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg text-white font-medium animate-slide-in
            ${messageType === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
            {message}
            <button
              onClick={() => dispatch({ type: 'CLEAR_MESSAGE' })}
              className="ml-3 text-white hover:opacity-80"
            >
              ×
            </button>
          </div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Tài khoản quản trị</h1>
            <p className="text-sm text-gray-500 mt-1">Quản lý thông tin và quyền hạn của bạn</p>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <a href="/" className="text-blue-600 hover:text-blue-700">Trang chủ</a>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">Tài khoản Admin</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Profile Card */}
          <div className={`lg:col-span-1 transition-all duration-700 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
              <div className="h-32 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 relative">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-xs font-semibold text-white">ADMINISTRATOR</span>
                </div>
              </div>

              <div className="px-6 pb-6">
                <div className="flex flex-col items-center -mt-16">
                  <div className="relative group">
                    <div className="w-32 h-32 rounded-full border-4 border-white bg-white overflow-hidden shadow-lg">
                      {formData.avatar ? (
                        <img src={formData.avatar} alt="Avatar" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white text-4xl font-bold">
                          {formData.username?.[0]?.toUpperCase() || 'A'}
                        </div>
                      )}
                    </div>

                    {isEditing && (
                      <>
                        <button
                          onClick={() => document.getElementById('adminAvatarInput').click()}
                          className="absolute bottom-2 right-2 bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-full shadow-lg"
                        >
                          <Camera className="w-4 h-4" />
                        </button>
                        <input
                          id="adminAvatarInput"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              setFormData(prev => ({
                                ...prev,
                                file,
                                avatar: URL.createObjectURL(file),
                              }));
                            }
                          }}
                        />
                      </>
                    )}
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                      Admin
                    </div>
                  </div>

                  <h2 className="mt-6 text-xl font-bold text-gray-900">
                    {formData.full_name || formData.username}
                  </h2>
                  <p className="text-sm text-gray-500">@{formData.username}</p>

                  <div className="mt-4 flex items-center gap-2">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-50 border border-purple-200 rounded-full">
                      <Shield className="w-4 h-4 text-purple-600" />
                      <span className="text-sm font-medium text-purple-700 capitalize">
                        {formData.role}
                      </span>
                    </div>
                    {formData.is_active && (
                      <div className="flex items-center gap-1 px-3 py-1.5 bg-green-50 border border-green-200 rounded-full">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-xs font-medium text-green-700">Active</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="truncate">{formData.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>Tham gia: Tháng 1, 2024</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Activity className="w-4 h-4 text-gray-400" />
                    <span>Đăng nhập gần nhất: Hôm nay</span>
                  </div>
                </div>

                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="mt-6 w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium flex items-center justify-center gap-2"
                  >
                    <Edit2 className="w-4 h-4" />
                    Chỉnh sửa thông tin
                  </button>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className={`mt-6 bg-white rounded-xl border border-gray-200 p-6 shadow-sm transition-all duration-700 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '200ms' }}>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Thống kê hệ thống</h3>
              <div className="grid grid-cols-2 gap-3">
                {adminStats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={stat.id} className={`p-3 rounded-lg border border-gray-200 hover:shadow-md transition-all ${animate ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`} style={{ transitionDelay: `${300 + index * 100}ms` }}>
                      <div className={`inline-flex p-2 rounded-lg ${stat.color} bg-opacity-10 mb-2`}>
                        <Icon className={`w-4 h-4 ${stat.color.replace('bg-', 'text-')}`} />
                      </div>
                      <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                      <div className="flex items-center justify-between mt-1">
                        <div className="text-xs text-gray-600">{stat.label}</div>
                        <div className="text-xs text-green-600 font-medium">{stat.change}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className={`lg:col-span-2 space-y-6 transition-all duration-700 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '100ms' }}>
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Thông tin chi tiết</h3>
                {isEditing && (
                  <div className="flex items-center gap-2">
                    <button onClick={handleCancel} className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg flex items-center gap-2">
                      <X className="w-4 h-4" /> Hủy
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={isSaving}
                      className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg flex items-center gap-2 disabled:opacity-50"
                    >
                      {isSaving ? (
                        <>Spinner Đang lưu...</>
                      ) : (
                        <><Save className="w-4 h-4" /> Lưu thay đổi</>
                      )}
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                {/* Username */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tên đăng nhập</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-50"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-50"
                    />
                  </div>
                </div>

                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Họ và tên</label>
                  <input
                    type="text"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-50"
                  />
                </div>

                {/* Role & Status */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Vai trò</label>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-50"
                    >
                      <option value="admin">Admin</option>
                      <option value="moderator">Moderator</option>
                      <option value="user">User</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Trạng thái</label>
                    <div className="flex items-center h-12">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name="is_active"
                          checked={formData.is_active}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                        <span className="ml-3 text-sm font-medium text-gray-700">
                          {formData.is_active ? 'Hoạt động' : 'Bị khóa'}
                        </span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Avatar URL */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">URL Avatar</label>
                  <input
                    type="url"
                    name="avatar"
                    value={formData.avatar}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-50"
                  />
                </div>

                {/* Change Password Section */}
                {isEditing && (
                  <div className="pt-6 border-t border-gray-200">
                    <h4 className="text-base font-semibold text-gray-900 mb-4">Đổi mật khẩu</h4>
                    <div className="space-y-4">
                      <div>
                        <input
                          type="password"
                          placeholder="Mật khẩu hiện tại"
                          name="currentPassword"
                          value={passwordData.currentPassword}
                          onChange={handlePasswordChange}
                          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        {passwordErrors.current && (
                          <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {passwordErrors.current}
                          </p>
                        )}
                      </div>
                      <div>
                        <input
                          type="password"
                          placeholder="Mật khẩu mới"
                          name="newPassword"
                          value={passwordData.newPassword}
                          onChange={handlePasswordChange}
                          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        {passwordErrors.newMatchOld && (
                          <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {passwordErrors.newMatchOld}
                          </p>
                        )}
                      </div>
                      <div>
                        <input
                          type="password"
                          placeholder="Xác nhận mật khẩu mới"
                          name="confirmPassword"
                          value={passwordData.confirmPassword}
                          onChange={handlePasswordChange}
                          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        {passwordErrors.confirm && (
                          <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {passwordErrors.confirm}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Hoạt động gần đây</h3>
              <div className="space-y-3">
                {recentActivities.map((activity, index) => (
                  <div
                    key={activity.id}
                    className={`flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all ${animate ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
                    style={{ transitionDelay: `${400 + index * 100}ms` }}
                  >
                    <div className={`p-2 rounded-lg ${activity.type === 'login' ? 'bg-green-100 text-green-600' :
                      activity.type === 'update' ? 'bg-blue-100 text-blue-600' :
                        activity.type === 'delete' ? 'bg-red-100 text-red-600' :
                          'bg-purple-100 text-purple-600'
                      }`}>
                      {activity.type === 'login' && <Activity className="w-4 h-4" />}
                      {activity.type === 'update' && <Edit2 className="w-4 h-4" />}
                      {activity.type === 'delete' && <Trash2 className="w-4 h-4" />}
                      {activity.type === 'create' && <Settings className="w-4 h-4" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-in {
          from { opacity: 0; transform: translateX(100%); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-slide-in { animation: slide-in 0.3s ease-out; }
      `}</style>
    </div>
  );
};

export default AccountAdmin;
