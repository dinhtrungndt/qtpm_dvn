import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getCurrentUser } from '../../stores/redux/actions/userActions';
import { encryptToken } from '../../utils/cryptoUtils';

const SocialAuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = searchParams.get('token');

    if (token) {
      // 1. Lưu token (Mã hóa nếu cần thiết theo logic app của bạn)
      // Lưu ý: Backend trả về token thô, frontend cần encrypt nếu flow của bạn yêu cầu
      const encryptedToken = encryptToken(token);
      localStorage.setItem('access_token', encryptedToken);

      // 2. Lấy thông tin user để update Redux state
      dispatch(getCurrentUser());

      // 3. Redirect về Dashboard
      navigate('/dashboard/v1');
    } else {
      // Nếu không có token, quay về login
      navigate('/login');
    }
  }, [searchParams, navigate, dispatch]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">Đang xử lý đăng nhập...</h2>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
      </div>
    </div>
  );
};

export default SocialAuthCallback;
