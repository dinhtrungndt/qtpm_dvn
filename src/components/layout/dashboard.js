import { BookOpen, Box, ChevronDown, Circle, Code, Download, FileCheck, FileText, Globe, HelpCircle, Layers, LayoutDashboard, Lock, Palette, Settings, Table, Users, X } from "lucide-react";
import { useState } from "react";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const DashboardMenu = ({ isOpen, onClose }) => {
  const [openMenus, setOpenMenus] = useState({});
  const { user } = useSelector((state) => state.user);

  const toggleMenu = (menuId) => {
    setOpenMenus(prev => ({
      ...prev,
      [menuId]: !prev[menuId]
    }));
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 z-40 ${isOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Sidebar Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 shadow-2xl z-50 transform transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-4 border-b border-gray-700">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                <img src="https://dvntechnology.com/icons/Logo.png" alt="Logo" className="w-6 h-6" />
              </div>
              <span className="text-white font-semibold text-lg">DVN Technology</span>
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-700 rounded transition-colors"
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
                    <span className="text-sm">Dashboard</span>
                  </div>
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${openMenus['dashboard'] ? 'rotate-180' : ''}`} />
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
                <span className="text-sm">Theme Generate</span>
              </Link>

              {/* Widgets with submenu */}
              <div>
                <button
                  onClick={() => toggleMenu('widgets')}
                  className="w-full flex items-center justify-between px-4 py-2.5 text-gray-200 hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Box className="h-4 w-4" />
                    <span className="text-sm">Widgets</span>
                  </div>
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${openMenus['widgets'] ? 'rotate-180' : ''}`} />
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
                    <span className="text-sm">Layout Options</span>
                    <span className="bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded">6</span>
                  </div>
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${openMenus['layout'] ? 'rotate-180' : ''}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-200 ${openMenus['layout'] ? 'max-h-80' : 'max-h-0'}`}>
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
                    Fixed Complete
                  </Link>
                </div>
              </div>

              {/* UI Elements */}
              <Link to="/ui-elements" className="flex items-center justify-between px-4 py-2.5 text-gray-200 hover:bg-gray-700 transition-colors">
                <div className="flex items-center gap-3">
                  <Layers className="h-4 w-4" />
                  <span className="text-sm">UI Elements</span>
                </div>
              </Link>

              {/* Forms */}
              <Link to="/forms" className="flex items-center justify-between px-4 py-2.5 text-gray-200 hover:bg-gray-700 transition-colors">
                <div className="flex items-center gap-3">
                  <FileText className="h-4 w-4" />
                  <span className="text-sm">Forms</span>
                </div>
              </Link>

              {/* Tables */}
              <Link to="/tables" className="flex items-center justify-between px-4 py-2.5 text-gray-200 hover:bg-gray-700 transition-colors">
                <div className="flex items-center gap-3">
                  <Table className="h-4 w-4" />
                  <span className="text-sm">Tables</span>
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
                      <span className="text-sm">Auth</span>
                    </div>
                  </Link>

                  {/* Section Header */}
                  <div className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Documentations
                  </div>

                  {/* Documentation Items */}
                  <Link to="/docs/installation" className="flex items-center gap-3 px-4 py-2.5 text-gray-200 hover:bg-gray-700 transition-colors">
                    <Download className="h-4 w-4" />
                    <span className="text-sm">Installation</span>
                  </Link>
                  <Link to="/docs/layout" className="flex items-center gap-3 px-4 py-2.5 text-gray-200 hover:bg-gray-700 transition-colors">
                    <BookOpen className="h-4 w-4" />
                    <span className="text-sm">Layout</span>
                  </Link>
                  <Link to="/docs/components" className="flex items-center gap-3 px-4 py-2.5 text-gray-200 hover:bg-gray-700 transition-colors">
                    <Code className="h-4 w-4" />
                    <span className="text-sm">Components</span>
                  </Link>
                  <Link to="/docs/browser" className="flex items-center gap-3 px-4 py-2.5 text-gray-200 hover:bg-gray-700 transition-colors">
                    <Globe className="h-4 w-4" />
                    <span className="text-sm">Browser Support</span>
                  </Link>
                  <Link to="/docs/contribute" className="flex items-center gap-3 px-4 py-2.5 text-gray-200 hover:bg-gray-700 transition-colors">
                    <Users className="h-4 w-4" />
                    <span className="text-sm">How To Contribute</span>
                  </Link>
                  <Link to="/docs/faq" className="flex items-center gap-3 px-4 py-2.5 text-gray-200 hover:bg-gray-700 transition-colors">
                    <HelpCircle className="h-4 w-4" />
                    <span className="text-sm">FAQ</span>
                  </Link>
                  <Link to="/docs/license" className="flex items-center gap-3 px-4 py-2.5 text-gray-200 hover:bg-gray-700 transition-colors">
                    <FileCheck className="h-4 w-4" />
                    <span className="text-sm">License</span>
                  </Link>


                </>
              )}

              {/* Orders */}
              <div className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Management
              </div>
              <Link to="/orders" className="flex items-center gap-3 px-4 py-2.5 text-gray-200 hover:bg-gray-700 transition-colors">
                <FileText className="h-4 w-4" />
                <span className="text-sm">Đơn hàng</span>
              </Link>
              {/* ADMIN */}

              {user?.role === 'admin' && (
                <>
                  <div className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    ADMIN
                  </div>
                  <Link to="/users" className="flex items-center gap-3 px-4 py-2.5 text-gray-200 hover:bg-gray-700 transition-colors">
                    <Users className="h-4 w-4" />
                    <span className="text-sm">Quản lý Users</span>
                  </Link>
                  <Link to="/products" className="flex items-center gap-3 px-4 py-2.5 text-gray-200 hover:bg-gray-700 transition-colors">
                    <Box className="h-4 w-4" />
                    <span className="text-sm">Quản lý Products</span>
                  </Link>
                </>
              )}

              {/* Section Header */}
              <div className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Labels
              </div>

              {/* Labels */}
              <div className="px-4 py-2 space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-gray-200">Important</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <span className="text-gray-200">Warning</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full bg-cyan-500"></div>
                  <span className="text-gray-200">Informational</span>
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
