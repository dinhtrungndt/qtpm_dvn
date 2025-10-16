import { lazy, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import ContactPage from '../components/contact/ContactPage';
import FooterDashBoard from '../components/footer/FooterDashBoard';
import DashboardHeader from '../components/header/Dashboard';
import AccountAdmin from '../components/layout/admin/accountAdmin';
import ManageProduct from '../components/layout/admin/manageProduct';
import ManageUser from '../components/layout/admin/manageUser';
import DashboardV1 from '../components/layout/dashboard/dashboardV1';
import DashboardV3 from '../components/layout/dashboard/dashboardV3';
import HistoryOrder from '../components/layout/orders/historyOrder';
import Settings from '../components/layout/setting';
import ThemeGenerate from '../components/layout/themegenerate';
import AccountUser from '../components/layout/user/AccountUser';
import CartPage from '../components/layout/user/cart';
import Checkout from '../components/layout/user/checkout';
import Cards from '../components/layout/widgets/Cards';
import InforBox from '../components/layout/widgets/InforBox';
import SmallBox from '../components/layout/widgets/SmallBox';
import DetailProduct from '../components/start/DetailProduct';
import HomePageStart from '../pages/home/HomePageStart';
import LoginPage from '../pages/user/LoginPage';
import SignupPage from '../pages/user/SignupPage';
import Unauthorized from '../utils/Unauthorized';

// Lazy load components
const DashboardV2 = lazy(() => import("../components/layout/dashboard/dashboardV2"));

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const location = useLocation();

  if (!isAuthenticated && location.pathname !== '/login' && location.pathname !== '/signup' && location.pathname !== '/') {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

const RoleRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user || !allowedRoles.includes(user.role?.toLowerCase())) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};


const Routers = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && (location.pathname === '/login' || location.pathname === '/signup')) {
      if (isAuthenticated?.role === 'Admin') {
        navigate('/theme-generate', { replace: true });
      } else {
        navigate('/dashboard/v1', { replace: true });
      }
    }
  }, [isAuthenticated, location.pathname, navigate]);

  const hideLayoutRoutes = ['/login', '/signup', '/'];

  const shouldHideLayout = hideLayoutRoutes.includes(location.pathname);

  return (
    <div>
      {!shouldHideLayout && <DashboardHeader />}

      <Routes>
        <Route path="/" element={<HomePageStart />} />
        <Route path="/detail/product/:id" element={<DetailProduct />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        <Route path="/cart" element={<PrivateRoute><CartPage /></PrivateRoute>} />
        <Route path="/checkout/:id" element={<PrivateRoute><Checkout /></PrivateRoute>} />
        <Route path="/dashboard/v1" element={<PrivateRoute><DashboardV1 /></PrivateRoute>} />
        <Route path="/dashboard/v2" element={<PrivateRoute><DashboardV2 /></PrivateRoute>} />
        <Route path="/dashboard/v3" element={<PrivateRoute><DashboardV3 /></PrivateRoute>} />
        {/* <Route path="/theme-generate" element={<PrivateRoute><ThemeGenerate /></PrivateRoute>} /> */}
        <Route path="/widgets/small-box" element={<PrivateRoute><SmallBox /></PrivateRoute>} />
        <Route path="/widgets/info" element={<PrivateRoute><InforBox /></PrivateRoute>} />
        <Route path="/widgets/card" element={<PrivateRoute><Cards /></PrivateRoute>} />
        <Route path="/history/orders" element={<PrivateRoute><HistoryOrder /></PrivateRoute>} />
        <Route path="/contact" element={<PrivateRoute><ContactPage /></PrivateRoute>} />
        <Route path="/user" element={<PrivateRoute><AccountUser /></PrivateRoute>} />
        <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />

        {/* Route chỉ dành cho Admin */}
        <Route path="/theme-generate" element={<RoleRoute allowedRoles={['admin']}><ThemeGenerate /></RoleRoute>} />
        <Route path="/admin" element={<RoleRoute allowedRoles={['admin']}><AccountAdmin /></RoleRoute>} />
        <Route path="/manage/users" element={<RoleRoute allowedRoles={['admin']}><ManageUser /></RoleRoute>} />
        <Route path="/manage/products" element={<RoleRoute allowedRoles={['admin']}><ManageProduct /></RoleRoute>} />

        <Route path="*" element={<Navigate to={isAuthenticated ? '/' : '/login'} replace />} />
      </Routes>

      {!shouldHideLayout && <FooterDashBoard />}
    </div>
  );
};

export default Routers;
