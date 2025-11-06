import { AlertCircle, Calendar, Camera, Edit2, Mail, Save, Shield, User, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword, updateProfile } from '../../../stores/redux/actions/userActions';

const AccountUser = () => {
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

  const handlePasswordChange = async () => {
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

    try {
      await dispatch(changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      }));
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      return true;
    } catch (err) {
      return false;
    }
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => dispatch({ type: 'CLEAR_MESSAGE' }), 4000);
      return () => clearTimeout(timer);
    }
  }, [message, dispatch]);

  useEffect(() => {
    setTimeout(() => setAnimate(true), 100);
    if (user) {
      setFormData({
        username: user.username || '',
        email: user.email || '',
        full_name: user.full_name || '',
        avatar: user.avatar || 'https://dvntechnology.com/icons/Logo.png',
        file: null,
      });
    }
  }, [user]);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);

      if (passwordData.currentPassword || passwordData.newPassword) {
        const ok = await handlePasswordChange();
        if (!ok) {
          setIsSaving(false);
          return;
        }
      }

      await dispatch(updateProfile({
        username: formData.username,
        email: formData.email,
        full_name: formData.full_name,
        ...(formData.file && { file: formData.file }),
      }));

      setIsSaving(false);
      setIsEditing(false);

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
      });
    }
  };

  const stats = [
    { id: 1, label: 'Đơn hàng', value: '24', icon: 'Box', color: 'bg-blue-500' },
    { id: 2, label: 'Dự án', value: '12', icon: 'Rocket', color: 'bg-emerald-500' },
    { id: 3, label: 'Nhiệm vụ', value: '48', icon: 'CheckSquare', color: 'bg-amber-500' },
    { id: 4, label: 'Hoàn thành', value: '36', icon: 'Target', color: 'bg-purple-500' },
  ];

  return (
    <div className="p-4 mx-auto max-w-7xl">
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

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Thông tin tài khoản</h1>
          <p className="text-sm text-gray-500 mt-1">Quản lý thông tin cá nhân của bạn</p>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <a href="/" className="text-blue-600 hover:text-blue-700">Trang chủ</a>
          <span className="text-gray-400">/</span>
          <span className="text-gray-600">Tài khoản</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Avatar + Stats */}
        <div className={`lg:col-span-1 transition-all duration-700 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600 relative">
              <div className="absolute inset-0 bg-black/10"></div>
            </div>

            <div className="px-6 pb-6">
              <div className="flex flex-col items-center -mt-16">
                <div className="relative group">
                  <div className="w-32 h-32 rounded-full border-4 border-white bg-white overflow-hidden shadow-lg">
                    {formData.avatar ? (
                      <img src={formData.avatar} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold">
                        {formData.username?.[0]?.toUpperCase() || 'U'}
                      </div>
                    )}
                  </div>
                  {isEditing && (
                    <>
                      <button
                        onClick={() => document.getElementById('avatarInput').click()}
                        className="absolute bottom-2 right-2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-lg"
                      >
                        <Camera className="w-4 h-4" />
                      </button>
                      <input
                        id="avatarInput"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={e => {
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
                </div>

                <h2 className="mt-4 text-xl font-bold text-gray-900">
                  {formData.full_name || formData.username}
                </h2>
                <p className="text-sm text-gray-500">@{formData.username}</p>

                <div className="mt-4 flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-full">
                  <Shield className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-700 capitalize">
                    {user?.role || 'user'}
                  </span>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span>{formData.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span>Tham gia: Tháng 1, 2024</span>
                </div>
              </div>

              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="mt-6 w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium flex items-center justify-center gap-2"
                >
                  <Edit2 className="w-4 h-4" />
                  Chỉnh sửa thông tin
                </button>
              )}
            </div>
          </div>

          <div className={`mt-6 bg-white rounded-xl border border-gray-200 p-6 transition-all duration-700 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '200ms' }}>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Thống kê</h3>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <div key={stat.id} className={`text-center p-4 rounded-lg ${stat.color} bg-opacity-10 border border-gray-200`} style={{ transitionDelay: `${300 + i * 100}ms` }}>
                  <div className="text-2xl mb-2">{stat.icon}</div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-xs text-gray-600 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Form */}
        <div className={`lg:col-span-2 transition-all duration-700 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '100ms' }}>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
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
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 disabled:opacity-50"
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
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                  />
                </div>
              </div>

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
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Họ và tên</label>
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                />
              </div>

              {isEditing && (
                <div className="pt-6 border-t border-gray-200">
                  <h4 className="text-base font-semibold text-gray-900 mb-4">Đổi mật khẩu</h4>
                  <div className="space-y-4">
                    {/* Mật khẩu hiện tại */}
                    <div>
                      <input
                        type="password"
                        placeholder="Mật khẩu hiện tại"
                        value={passwordData.currentPassword}
                        onChange={e => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      {passwordErrors.current && (
                        <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {passwordErrors.current}
                        </p>
                      )}
                    </div>

                    {/* Mật khẩu mới */}
                    <div>
                      <input
                        type="password"
                        placeholder="Mật khẩu mới"
                        value={passwordData.newPassword}
                        onChange={e => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      {passwordErrors.newMatchOld && (
                        <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {passwordErrors.newMatchOld}
                        </p>
                      )}
                    </div>

                    {/* Xác nhận */}
                    <div>
                      <input
                        type="password"
                        placeholder="Xác nhận mật khẩu mới"
                        value={passwordData.confirmPassword}
                        onChange={e => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
        </div>
      </div>
    </div>
  );
};

export default AccountUser;
