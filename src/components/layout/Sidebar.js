import { BookOpen, Box, ChevronDown, Circle, Code, Download, FileCheck, FileText, Globe, HelpCircle, Layers, LayoutDashboard, Lock, Palette, Settings, ShoppingCart, Table, UserCog, Users, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { toggleSidebarCollapsed } from '../../stores/redux/actions/themeActions';

const DashboardMenu = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [openMenus, setOpenMenus] = useState({});
  const [hovered, setHovered] = useState(false);
  const { user } = useSelector((state) => state.user);
  const { sidebar } = useSelector((state) => state.theme);
  const location = useLocation();

  const isCollapsedPage = location.pathname === "/layout/collapsed-sidebar";
  const isRTLPage = location.pathname === "/layout/rtl-sidebar";

  useEffect(() => {
    if (isCollapsedPage && !sidebar.collapsed) {
      dispatch(toggleSidebarCollapsed());
    }
  }, [isCollapsedPage]);

  const toggleMenu = (menuId) => {
    setOpenMenus(prev => ({
      ...prev,
      [menuId]: !prev[menuId]
    }));
  };

  const handleMouseEnter = () => {
    if (isCollapsedPage && sidebar.collapsed) {
      setHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (isCollapsedPage && sidebar.collapsed) {
      setHovered(false);
    }
  };

  const isMini = sidebar.collapsed && !hovered;
  const widthClass = isMini ? 'w-16' : 'w-64';

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 z-40 ${isOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Sidebar Menu */}
      <div
        className={`fixed top-0 ${isRTLPage ? 'right-0' : 'left-0'} h-full ${widthClass}
    ${sidebar.color || 'bg-gray-800'} shadow-2xl z-50 transform transition-all duration-300 ease-in-out
    ${isRTLPage
            ? isOpen
              ? 'translate-x-0'
              : 'translate-x-full md:translate-x-0'
            : isOpen
              ? 'translate-x-0'
              : '-translate-x-full md:translate-x-0'
          }`}
        data-bs-theme={sidebar.theme?.toLowerCase() || 'light'}
        onMouseEnter={isCollapsedPage ? handleMouseEnter : undefined}
        onMouseLeave={isCollapsedPage ? handleMouseLeave : undefined}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-4 border-b border-gray-700">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                <img src="https://dvntechnology.com/icons/Logo.png" alt="Logo" className="w-6 h-6" />
              </div>
              {!isMini && (
                <span className="text-white font-semibold text-lg">DVN Technology</span>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-700 rounded transition-colors md:hidden"
              title="Close menu"
            >
              <X className="h-5 w-5 text-gray-300" />
            </button>
          </div>

          {/* Menu Items */}
          <div className="flex-1 overflow-y-auto py-2">
            <nav>
              {/* Dashboard with submenu */}
              <div>
                <button
                  onClick={() => toggleMenu('dashboard')}
                  className="w-full flex items-center justify-between px-4 py-2.5 text-gray-200 hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <LayoutDashboard className="h-4 w-4" />
                    {!isMini && <span className="text-sm">Dashboard</span>}
                  </div>
                  {!isMini && (
                    <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${openMenus['dashboard'] ? 'rotate-180' : ''}`} />
                  )}
                </button>
                <div className={`overflow-hidden transition-all duration-200 ${openMenus['dashboard'] ? 'max-h-48' : 'max-h-0'}`}>
                  <Link to="/dashboard/v1" className="flex items-center gap-3 px-4 py-2 pl-12 text-gray-300 hover:bg-gray-700 text-sm transition-colors">
                    <Circle className="h-2 w-2" />
                    Dashboard v1
                  </Link>
                  <Link to="/dashboard/v2" className="flex items-center gap-3 px-4 py-2 pl-12 text-gray-300 hover:bg-gray-700 text-sm transition-colors">
                    <Circle className="h-2 w-2" />
                    Dashboard v2
                  </Link>
                  <Link to="/dashboard/v3" className="flex items-center gap-3 px-4 py-2 pl-12 text-gray-300 hover:bg-gray-700 text-sm transition-colors">
                    <Circle className="h-2 w-2" />
                    Dashboard v3
                  </Link>
                </div>
              </div>

              {/* Theme Generate */}
              <Link to="/theme-generate" className="flex items-center gap-3 px-4 py-2.5 text-gray-200 hover:bg-gray-700 transition-colors">
                <Palette className="h-4 w-4" />
                {!isMini && <span className="text-sm">Theme Generate</span>}
              </Link>

              {/* Widgets with submenu */}
              <div>
                <button
                  onClick={() => toggleMenu('widgets')}
                  className="w-full flex items-center justify-between px-4 py-2.5 text-gray-200 hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Box className="h-4 w-4" />
                    {!isMini && <span className="text-sm">Widgets</span>}
                  </div>
                  {!isMini && (
                    <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${openMenus['widgets'] ? 'rotate-180' : ''}`} />
                  )}
                </button>
                <div className={`overflow-hidden transition-all duration-200 ${openMenus['widgets'] ? 'max-h-48' : 'max-h-0'}`}>
                  <Link to="/widgets/small-box" className="flex items-center gap-3 px-4 py-2 pl-12 text-gray-300 hover:bg-gray-700 text-sm transition-colors">
                    <Circle className="h-2 w-2" />
                    Small Box
                  </Link>
                  <Link to="/widgets/info" className="flex items-center gap-3 px-4 py-2 pl-12 text-gray-300 hover:bg-gray-700 text-sm transition-colors">
                    <Circle className="h-2 w-2" />
                    Info Box
                  </Link>
                  <Link to="/widgets/card" className="flex items-center gap-3 px-4 py-2 pl-12 text-gray-300 hover:bg-gray-700 text-sm transition-colors">
                    <Circle className="h-2 w-2" />
                    Cards
                  </Link>
                </div>
              </div>

              {/* Layout Options with badge and submenu */}
              <div>
                <button
                  onClick={() => toggleMenu('layout')}
                  className="w-full flex items-center justify-between px-4 py-2.5 text-gray-200 hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Settings className="h-4 w-4" />
                    {!isMini && (
                      <>
                        <span className="text-sm">Layout Options</span>
                        <span className="bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded">8</span>
                      </>
                    )}
                  </div>
                  {!isMini && (
                    <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${openMenus['layout'] ? 'rotate-180' : ''}`} />
                  )}
                </button>
                <div className={`overflow-hidden transition-all duration-200 ${openMenus['layout'] && !isMini ? 'max-h-80' : 'max-h-0'}`}>
                  <Link to="/layout/default" className="flex items-center gap-3 px-4 py-2 pl-12 text-gray-300 hover:bg-gray-700 text-sm transition-colors">
                    <Circle className="h-2 w-2" />
                    Default Sidebar
                  </Link>
                  <Link to="/layout/fixed-sidebar" className="flex items-center gap-3 px-4 py-2 pl-12 text-gray-300 hover:bg-gray-700 text-sm transition-colors">
                    <Circle className="h-2 w-2" />
                    Fixed Sidebar
                  </Link>
                  <Link to="/layout/fixed-header" className="flex items-center gap-3 px-4 py-2 pl-12 text-gray-300 hover:bg-gray-700 text-sm transition-colors">
                    <Circle className="h-2 w-2" />
                    Fixed Header
                  </Link>
                  <Link to="/layout/fixed-footer" className="flex items-center gap-3 px-4 py-2 pl-12 text-gray-300 hover:bg-gray-700 text-sm transition-colors">
                    <Circle className="h-2 w-2" />
                    Fixed Footer
                  </Link>
                  <Link to="/layout/complete" className="flex items-center gap-3 px-4 py-2 pl-12 text-gray-300 hover:bg-gray-700 text-sm transition-colors">
                    <Circle className="h-2 w-2" />
                    {!isMini && <span className="text-sm">Fixed Complete</span>}
                  </Link>
                  <Link to="/layout/sidebar-mini" className="flex items-center gap-3 px-4 py-2 pl-12 text-gray-300 hover:bg-gray-700 text-sm transition-colors">
                    <Circle className="h-2 w-2" />
                    {!isMini && <span className="text-sm">Sidebar Mini</span>}
                  </Link>
                  <Link to="/layout/collapsed-sidebar" className="flex items-center gap-3 px-4 py-2 pl-12 text-gray-300 hover:bg-gray-700 text-sm transition-colors">
                    <Circle className="h-2 w-2" />
                    {!isMini && <span className="text-sm">Collapsed Sidebar</span>}
                  </Link>
                  <Link to="/layout/rtl-sidebar" className="flex items-center gap-3 px-4 py-2 pl-12 text-gray-300 hover:bg-gray-700 text-sm transition-colors">
                    <Circle className="h-2 w-2" />
                    {!isMini && <span className="text-sm">Layout RTL</span>}
                  </Link>
                </div>
              </div>

              {/* UI Elements */}
              <div>
                <button
                  onClick={() => toggleMenu('ui-elements')}
                  className="w-full flex items-center justify-between px-4 py-2.5 text-gray-200 hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Layers className="h-4 w-4" />
                    {!isMini && <span className="text-sm">UI Elements</span>}
                  </div>
                  {!isMini && (
                    <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${openMenus['ui-elements'] ? 'rotate-180' : ''}`} />
                  )}
                </button>
                <div className={`overflow-hidden transition-all duration-200 ${openMenus['ui-elements'] ? 'max-h-48' : 'max-h-0'}`}>
                  <Link to="/updating" className="flex items-center gap-3 px-4 py-2 pl-12 text-gray-300 hover:bg-gray-700 text-sm transition-colors">
                    <Circle className="h-2 w-2" />
                    {!isMini && <span className="text-sm">General</span>}
                  </Link>
                  <Link to="/updating" className="flex items-center gap-3 px-4 py-2 pl-12 text-gray-300 hover:bg-gray-700 text-sm transition-colors">
                    <Circle className="h-2 w-2" />
                    {!isMini && <span className="text-sm">Icons</span>}
                  </Link>
                  <Link to="/updating" className="flex items-center gap-3 px-4 py-2 pl-12 text-gray-300 hover:bg-gray-700 text-sm transition-colors">
                    <Circle className="h-2 w-2" />
                    {!isMini && <span className="text-sm">Timeline</span>}
                  </Link>
                </div>
              </div>

              {/* Forms */}
              <Link to="/updating" className="flex items-center justify-between px-4 py-2.5 text-gray-200 hover:bg-gray-700 transition-colors">
                <div className="flex items-center gap-3">
                  <FileText className="h-4 w-4" />
                  {!isMini && <span className="text-sm">Forms</span>}
                </div>
              </Link>

              {/* Tables */}
              <Link to="/updating" className="flex items-center justify-between px-4 py-2.5 text-gray-200 hover:bg-gray-700 transition-colors">
                <div className="flex items-center gap-3">
                  <Table className="h-4 w-4" />
                  {!isMini && <span className="text-sm">Tables</span>}
                </div>
              </Link>

              {/* Tạm ẩn */}
              {false && (
                <>

                  {/* Section Header */}
                  <div className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Examples
                  </div>

                  {/* Auth */}
                  <Link to="/auth" className="flex items-center justify-between px-4 py-2.5 text-gray-200 hover:bg-gray-700 transition-colors">
                    <div className="flex items-center gap-3">
                      <Lock className="h-4 w-4" />
                      {!isMini && <span className="text-sm">Auth</span>}
                    </div>
                  </Link>

                  {/* Section Header */}
                  <div className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    {!isMini && <span className="text-sm">Documentations</span>}
                  </div>

                  {/* Documentation Items */}
                  <Link to="/docs/installation" className="flex items-center gap-3 px-4 py-2.5 text-gray-200 hover:bg-gray-700 transition-colors">
                    <Download className="h-4 w-4" />
                    {!isMini && <span className="text-sm">Installation</span>}
                  </Link>
                  <Link to="/docs/layout" className="flex items-center gap-3 px-4 py-2.5 text-gray-200 hover:bg-gray-700 transition-colors">
                    <BookOpen className="h-4 w-4" />
                    {!isMini && <span className="text-sm">Layout</span>}
                  </Link>
                  <Link to="/docs/components" className="flex items-center gap-3 px-4 py-2.5 text-gray-200 hover:bg-gray-700 transition-colors">
                    <Code className="h-4 w-4" />
                    {!isMini && <span className="text-sm">Components</span>}
                  </Link>
                  <Link to="/docs/browser" className="flex items-center gap-3 px-4 py-2.5 text-gray-200 hover:bg-gray-700 transition-colors">
                    <Globe className="h-4 w-4" />
                    {!isMini && <span className="text-sm">Browser Support</span>}
                  </Link>
                  <Link to="/docs/contribute" className="flex items-center gap-3 px-4 py-2.5 text-gray-200 hover:bg-gray-700 transition-colors">
                    <Users className="h-4 w-4" />
                    {!isMini && <span className="text-sm">How To Contribute</span>}
                  </Link>
                  <Link to="/docs/faq" className="flex items-center gap-3 px-4 py-2.5 text-gray-200 hover:bg-gray-700 transition-colors">
                    <HelpCircle className="h-4 w-4" />
                    {!isMini && <span className="text-sm">FAQ</span>}
                  </Link>
                  <Link to="/docs/license" className="flex items-center gap-3 px-4 py-2.5 text-gray-200 hover:bg-gray-700 transition-colors">
                    <FileCheck className="h-4 w-4" />
                    {!isMini && <span className="text-sm">License</span>}
                  </Link>


                </>
              )}

              {/* Orders */}
              <div className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Management
              </div>

              {
                user?.role === 'admin' && (
                  <Link to="/admin" className="flex items-center gap-3 px-4 py-2.5 text-gray-200 hover:bg-gray-700 transition-colors">
                    <UserCog className="h-4 w-4" />
                    {!isMini && <span className="text-sm">Tài khoản</span>}
                  </Link>
                )
              }
              {
                user?.role === 'user' && (
                  <Link to="/user" className="flex items-center gap-3 px-4 py-2.5 text-gray-200 hover:bg-gray-700 transition-colors">
                    <UserCog className="h-4 w-4" />
                    {!isMini && <span className="text-sm">Tài khoản</span>}
                  </Link>
                )
              }
              {
                user?.role === 'user' && (
                  <Link to="/cart" className="flex items-center gap-3 px-4 py-2.5 text-gray-200 hover:bg-gray-700 transition-colors">
                    <ShoppingCart className="h-4 w-4" />
                    {!isMini && <span className="text-sm">Giỏ hàng</span>}
                  </Link>
                )
              }
              <Link to="/history/orders" className="flex items-center gap-3 px-4 py-2.5 text-gray-200 hover:bg-gray-700 transition-colors">
                <FileText className="h-4 w-4" />
                {!isMini && <span className="text-sm">Đơn hàng</span>}
              </Link>
              {/* ADMIN */}

              {user?.role === 'admin' && (
                <>
                  <div className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    ADMIN
                  </div>
                  <Link to="/manage/users" className="flex items-center gap-3 px-4 py-2.5 text-gray-200 hover:bg-gray-700 transition-colors">
                    <Users className="h-4 w-4" />
                    {!isMini && <span className="text-sm">Quản lý Users</span>}
                  </Link>
                  <Link to="/manage/products" className="flex items-center gap-3 px-4 py-2.5 text-gray-200 hover:bg-gray-700 transition-colors">
                    <Box className="h-4 w-4" />
                    {!isMini && <span className="text-sm">Quản lý Products</span>}
                  </Link>
                </>
              )}

              {/* Section Header */}
              <div className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                {!isMini && <span className="text-sm">Labels</span>}
              </div>

              {/* Labels */}
              <div className="px-4 py-2 space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  {!isMini && <span className="text-gray-200">Important</span>}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  {!isMini && <span className="text-gray-200">Warning</span>}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full bg-cyan-500"></div>
                  {!isMini && <span className="text-gray-200">Informational</span>}
                </div>
              </div>

            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardMenu;
