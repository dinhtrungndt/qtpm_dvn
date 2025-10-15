import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import FooterDashBoard from '../components/footer/FooterDashBoard';
import DashboardHeader from '../components/header/Dashboard';
import Dashboard_v1 from '../components/layout/dashboard/dashboard_v1';
import Dashboard_v2 from '../components/layout/dashboard/dashboard_v2';
import Dashboard_v3 from '../components/layout/dashboard/dashboard_v3';
import ThemeGenerate from '../components/layout/themegenerate';
import Cards from '../components/layout/widgets/Cards';
import InforBox from '../components/layout/widgets/InforBox';
import SmallBox from '../components/layout/widgets/SmallBox';
import HomePageStart from '../pages/home/index_v1';
import LoginPage from '../pages/user/LoginPage';
import SignupPage from '../pages/user/SignupPage';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const location = useLocation();

  if (!isAuthenticated && location.pathname !== '/login' && location.pathname !== '/signup' && location.pathname !== '/') {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

const Routers = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && (location.pathname === '/login' || location.pathname === '/signup')) {
      navigate('/dashboard/v1', { replace: true });
    }
  }, [isAuthenticated, location.pathname, navigate]);

  const hideLayoutRoutes = ['/login', '/signup', '/'];

  const shouldHideLayout = hideLayoutRoutes.includes(location.pathname);

  return (
    <div>
      {!shouldHideLayout && <DashboardHeader />}

      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/" element={<HomePageStart />} />

        <Route path="/dashboard/v1" element={<PrivateRoute><Dashboard_v1 /></PrivateRoute>} />
        <Route path="/dashboard/v2" element={<PrivateRoute><Dashboard_v2 /></PrivateRoute>} />
        <Route path="/dashboard/v3" element={<PrivateRoute><Dashboard_v3 /></PrivateRoute>} />
        <Route path="/theme-generate" element={<PrivateRoute><ThemeGenerate /></PrivateRoute>} />
        <Route path="/widgets/small-box" element={<PrivateRoute><SmallBox /></PrivateRoute>} />
        <Route path="/widgets/info" element={<PrivateRoute><InforBox /></PrivateRoute>} />
        <Route path="/widgets/card" element={<PrivateRoute><Cards /></PrivateRoute>} />

        <Route path="*" element={<Navigate to={isAuthenticated ? '/' : '/login'} replace />} />
      </Routes>

      {!shouldHideLayout && <FooterDashBoard />}
    </div>
  );
};

export default Routers;
