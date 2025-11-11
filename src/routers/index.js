import { lazy, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';

// ===== COMPONENTS =====
import ContactPage from '../components/contact/ContactPage';
import ContactPageStart from '../components/contact/ContactPageStart';
import FooterDashBoard from '../components/footer/FooterDashBoard';
import DashboardHeader from '../components/header/Dashboard';
import IntroduceStart from '../components/introduce/IntroduceStart';
import AccountAdmin from '../components/layout/admin/accountAdmin';
import ManageProduct from '../components/layout/admin/manageProduct';
import ManageUser from '../components/layout/admin/manageUser';
import Lockscreen from '../components/layout/auth/lockscreen';
import LoginPageAuthV1 from '../components/layout/auth/version1/LoginPageAuthV1';
import RegisterPageAuthV1 from '../components/layout/auth/version1/RegisterPageAuthV1';
import LoginPageAuthV2 from '../components/layout/auth/version2/LoginPageAuthV2';
import RegisterPageAuthV2 from '../components/layout/auth/version2/RegisterPageAuthV2';
import DashboardV1 from '../components/layout/dashboard/dashboardV1';
import DashboardV3 from '../components/layout/dashboard/dashboardV3';
import FAQ_Docs from '../components/layout/docs/FAQ';
import License_Docs from '../components/layout/docs/License';
import FormElements from '../components/layout/form/FormElements';
import Collapsed_Sidebar from '../components/layout/layout_options/collapsed_sidebar';
import Complete_Layout from '../components/layout/layout_options/complete_layout';
import Default_Sidebar from '../components/layout/layout_options/default_sidebar';
import Fixed_Footer from '../components/layout/layout_options/fixed_footer';
import Fixed_Header from '../components/layout/layout_options/fixed_header';
import Fixed_Sidebar from '../components/layout/layout_options/fixed_sidebar';
import RTL_Sidebar from '../components/layout/layout_options/rTL_sidebar';
import Sidebar_Mini from '../components/layout/layout_options/sidebar_Mmni';
import HistoryOrder from '../components/layout/orders/historyOrder';
import Settings from '../components/layout/setting';
import Simple_Tables from '../components/layout/table/tables';
import ThemeGenerate from '../components/layout/themegenerate';
import UI_General from '../components/layout/ui/General';
import UI_Icons from '../components/layout/ui/Icons';
import UI_Timeline from '../components/layout/ui/Timeline';
import AccountUser from '../components/layout/user/AccountUser';
import BuyNow from '../components/layout/user/BuyNow';
import CartPage from '../components/layout/user/cart';
import Checkout from '../components/layout/user/checkout';
import Cards from '../components/layout/widgets/Cards';
import InforBox from '../components/layout/widgets/InforBox';
import SmallBox from '../components/layout/widgets/SmallBox';
import SeeMore from '../components/products/SeeMore';
import DetailProduct from '../components/start/DetailProduct';
import HomePageStart from '../pages/home/HomePageStart';
import LoginPage from '../pages/user/LoginPage';
import SignupPage from '../pages/user/SignupPage';
import Unauthorized from '../utils/Unauthorized';
import Updating from '../utils/updating';

// Lazy load components
const DashboardV2 = lazy(() => import("../components/layout/dashboard/dashboardV2"));

// ===== PRIVATE ROUTE =====
const PrivateRoute = ({ children }) => {
  const { isAuthenticated, checkedAuth } = useSelector((state) => state.user);
  const location = useLocation();

  if (!checkedAuth) return <div>Loading...</div>;

  if (!isAuthenticated && !['/login', '/signup', '/'].includes(location.pathname)) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

// ===== ROLE ROUTE =====
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

// ===== MAIN ROUTER =====
const Routers = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();

  // Redirect user sau login
  useEffect(() => {
    if (isAuthenticated && (location.pathname === '/login' || location.pathname === '/signup')) {
      if (isAuthenticated?.role === 'Admin') {
        navigate('/theme-generate', { replace: true });
      } else {
        navigate('/dashboard/v1', { replace: true });
      }
    }
  }, [isAuthenticated, location.pathname, navigate]);

  // ✅ Chỉ ẩn layout cho login/signup
  const isAuthPage = ['/login', '/signup'].includes(location.pathname);

  // ✅ Các route public (home, contact-start, introduce,...)
  const isPublicPage =
    ['/', '/contact-start', '/introduce', '/seemore', '/unauthorized'].includes(location.pathname) ||
    location.pathname.startsWith('/detail/product');

  return (
    <div>
      {/* Ẩn DashboardHeader cho login/signup và public pages */}
      {!isAuthPage && !isPublicPage && <DashboardHeader />}

      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<HomePageStart />} />
        <Route path="/detail/product/:id" element={<DetailProduct />} />
        <Route path="/contact-start" element={<ContactPageStart />} />
        <Route path="/seemore" element={<SeeMore />} />
        <Route path="/introduce" element={<IntroduceStart />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* AUTH ROUTES */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* PRIVATE ROUTES */}
        <Route path="/cart" element={<PrivateRoute><CartPage /></PrivateRoute>} />
        <Route path="/buynow/:id" element={<PrivateRoute><BuyNow /></PrivateRoute>} />
        <Route path="/checkout" element={<PrivateRoute><Checkout /></PrivateRoute>} />
        <Route path="/dashboard/v1" element={<PrivateRoute><DashboardV1 /></PrivateRoute>} />
        <Route path="/dashboard/v2" element={<PrivateRoute><DashboardV2 /></PrivateRoute>} />
        <Route path="/dashboard/v3" element={<PrivateRoute><DashboardV3 /></PrivateRoute>} />
        <Route path="/theme-generate" element={<PrivateRoute><ThemeGenerate /></PrivateRoute>} />
        <Route path="/widgets/small-box" element={<PrivateRoute><SmallBox /></PrivateRoute>} />
        <Route path="/widgets/info" element={<PrivateRoute><InforBox /></PrivateRoute>} />
        <Route path="/widgets/card" element={<PrivateRoute><Cards /></PrivateRoute>} />
        <Route path="/layout/default" element={<PrivateRoute><Default_Sidebar /></PrivateRoute>} />
        <Route path="/layout/fixed-sidebar" element={<PrivateRoute><Fixed_Sidebar /></PrivateRoute>} />
        <Route path="/layout/fixed-header" element={<PrivateRoute><Fixed_Header /></PrivateRoute>} />
        <Route path="/layout/fixed-footer" element={<PrivateRoute><Fixed_Footer /></PrivateRoute>} />
        <Route path="/layout/complete" element={<PrivateRoute><Complete_Layout /></PrivateRoute>} />
        <Route path="/layout/sidebar-mini" element={<PrivateRoute><Sidebar_Mini /></PrivateRoute>} />
        <Route path="/layout/collapsed-sidebar" element={<PrivateRoute><Collapsed_Sidebar /></PrivateRoute>} />
        <Route path="/layout/rtl-sidebar" element={<PrivateRoute><RTL_Sidebar /></PrivateRoute>} />
        <Route path="/ui/general" element={<PrivateRoute><UI_General /></PrivateRoute>} />
        <Route path="/ui/icons" element={<PrivateRoute><UI_Icons /></PrivateRoute>} />
        <Route path="/ui/timeline" element={<PrivateRoute><UI_Timeline /></PrivateRoute>} />
        <Route path="/form-elements" element={<PrivateRoute><FormElements /></PrivateRoute>} />
        <Route path="/simple-tables" element={<PrivateRoute><Simple_Tables /></PrivateRoute>} />
        <Route path="/auth-v1-login" element={<PrivateRoute><LoginPageAuthV1 /></PrivateRoute>} />
        <Route path="/auth-v1-register" element={<PrivateRoute><RegisterPageAuthV1 /></PrivateRoute>} />
        <Route path="/auth-v2-login" element={<PrivateRoute><LoginPageAuthV2 /></PrivateRoute>} />
        <Route path="/auth-v2-register" element={<PrivateRoute><RegisterPageAuthV2 /></PrivateRoute>} />
        <Route path="/lock-screen" element={<PrivateRoute><Lockscreen /></PrivateRoute>} />
        <Route path="/docs/faq" element={<PrivateRoute><FAQ_Docs /></PrivateRoute>} />
        <Route path="/docs/license" element={<PrivateRoute><License_Docs /></PrivateRoute>} />
        <Route path="/history/orders" element={<PrivateRoute><HistoryOrder /></PrivateRoute>} />
        <Route path="/contact" element={<PrivateRoute><ContactPage /></PrivateRoute>} />
        <Route path="/user" element={<PrivateRoute><AccountUser /></PrivateRoute>} />
        <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
        <Route path="/updating" element={<PrivateRoute><Updating /></PrivateRoute>} />

        {/* ADMIN ROUTES */}
        <Route path="/admin" element={<RoleRoute allowedRoles={['admin']}><AccountAdmin /></RoleRoute>} />
        <Route path="/manage/users" element={<RoleRoute allowedRoles={['admin']}><ManageUser /></RoleRoute>} />
        <Route path="/manage/products" element={<RoleRoute allowedRoles={['admin']}><ManageProduct /></RoleRoute>} />

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to={isAuthenticated ? '/' : '/login'} replace />} />
      </Routes>

      {/* Footer cũng ẩn với login/signup và public pages */}
      {!isAuthPage && !isPublicPage && <FooterDashBoard />}
    </div>
  );
};

export default Routers;
