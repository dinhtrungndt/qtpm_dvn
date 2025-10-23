import { ChevronDown, Minus, Sparkles, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFooterThemeActions, setNavbarThemeActions, setSidebarThemeActions } from '../../../stores/redux/actions/themeActions';

const ThemeGenerate = () => {
  const dispatch = useDispatch();
  const { sidebar, navbar, footer } = useSelector((state) => state.theme);

  const [sidebarTheme, setSidebarTheme] = useState(sidebar.theme || "---Select---");
  const [sidebarColor, setSidebarColor] = useState(sidebar.color || "bg-gray-600");
  const [navbarTheme, setNavbarTheme] = useState(navbar.theme || "---Select---");
  const [navbarColor, setNavbarColor] = useState(navbar.color || "bg-gray-600");
  const [footerTheme, setFooterTheme] = useState(footer.theme || "---Select---");
  const [footerColor, setFooterColor] = useState(footer.color || "bg-gray-600");

  const [sidebarThemeOpen, setSidebarThemeOpen] = useState(false);
  const [sidebarColorOpen, setSidebarColorOpen] = useState(false);
  const [navbarThemeOpen, setNavbarThemeOpen] = useState(false);
  const [navbarColorOpen, setNavbarColorOpen] = useState(false);
  const [footerThemeOpen, setFooterThemeOpen] = useState(false);
  const [footerColorOpen, setFooterColorOpen] = useState(false);

  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [navbarExpanded, setNavbarExpanded] = useState(true);
  const [footerExpanded, setFooterExpanded] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);

  const themeOptions = ["---Select---", "Dark", "Light"];

  const colorOptions = [
    { value: "bg-blue-600", label: "Blue", color: "bg-blue-600" },
    { value: "bg-green-600", label: "Green", color: "bg-green-600" },
    { value: "bg-red-600", label: "Red", color: "bg-red-600" },
    { value: "bg-gray-600", label: "Gray", color: "bg-gray-600" },
    { value: "bg-indigo-600", label: "Indigo", color: "bg-indigo-600" },
    { value: "bg-purple-600", label: "Purple", color: "bg-purple-600" },
    { value: "bg-teal-600", label: "Teal", color: "bg-teal-600" },
    { value: "bg-cyan-600", label: "Cyan", color: "bg-cyan-600" },
    { value: "bg-pink-600", label: "Pink", color: "bg-pink-600" },
    { value: "bg-rose-600", label: "Rose", color: "bg-rose-600" },
    { value: "bg-orange-600", label: "Orange", color: "bg-orange-600" },
    { value: "bg-amber-600", label: "Amber", color: "bg-amber-600" },
    { value: "bg-emerald-600", label: "Emerald", color: "bg-emerald-600" },
    { value: "bg-violet-600", label: "Violet", color: "bg-violet-600" },
    { value: "bg-sky-600", label: "Sky", color: "bg-sky-600" },
  ];

  const handleApplyTheme = () => {
    dispatch(setSidebarThemeActions({ theme: sidebarTheme, color: sidebarColor }));
    dispatch(setNavbarThemeActions({ theme: navbarTheme, color: navbarColor }));
    dispatch(setFooterThemeActions({ theme: footerTheme, color: footerColor }));

    if (sidebarTheme === 'Dark' || navbarTheme === 'Dark' || footerTheme === 'Dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const handleResetTheme = () => {
    const defaultTheme = "---Select---";
    const defaultColor = "bg-gray-600";

    setSidebarTheme(defaultTheme);
    setSidebarColor(defaultColor);
    setNavbarTheme(defaultTheme);
    setNavbarColor(defaultColor);
    setFooterTheme(defaultTheme);
    setFooterColor(defaultColor);

    dispatch(setSidebarThemeActions({ theme: defaultTheme, color: defaultColor }));
    dispatch(setNavbarThemeActions({ theme: defaultTheme, color: defaultColor }));
    dispatch(setFooterThemeActions({ theme: defaultTheme, color: defaultColor }));

    document.documentElement.classList.remove('dark');
  };

  useEffect(() => {
    setSidebarTheme(sidebar.theme || "---Select---");
    setSidebarColor(sidebar.color || "bg-gray-600");
    setNavbarTheme(navbar.theme || "---Select---");
    setNavbarColor(navbar.color || "bg-gray-600");
    setFooterTheme(footer.theme || "---Select---");
    setFooterColor(footer.color || "bg-gray-600");
  }, []);

  const CustomSelect = ({ value, onChange, options, isOpen, setIsOpen, isColorSelect = false }) => {
    return (
      <div className="relative w-full">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-2.5 text-left bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-gray-300 dark:hover:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 flex items-center justify-between transition-colors duration-200"
        >
          <span className="text-gray-900 dark:text-gray-200 font-medium">{isColorSelect ? options.find(o => o.value === value)?.label || value : value}</span>
          <ChevronDown className={`w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        <div className={`absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden transition-all duration-200 ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
          <div className="max-h-56 overflow-y-auto">
            {isColorSelect ? (
              options.map((option, index) => (
                <div
                  key={option.value}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  style={{ animationDelay: `${index * 20}ms` }}
                  className={`px-4 py-2.5 cursor-pointer transition-colors duration-150 flex items-center gap-2 ${option.color} hover:opacity-90`}
                >
                  <div className={`w-5 h-5 rounded-full ${option.color} border border-gray-300 dark:border-gray-600`}></div>
                  <span className="text-white font-medium text-sm">{option.label}</span>
                  {value === option.value && (
                    <span className="ml-auto text-white">✓</span>
                  )}
                </div>
              ))
            ) : (
              options.map((option, index) => (
                <div
                  key={option}
                  onClick={() => {
                    onChange(option);
                    setIsOpen(false);
                  }}
                  style={{ animationDelay: `${index * 20}ms` }}
                  className={`px-4 py-2.5 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150 ${value === option ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-gray-200'}`}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {value === option && <span className="text-blue-600 dark:text-blue-400">✓</span>}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    );
  };

  const ThemeSection = ({
    title,
    themeValue,
    setThemeValue,
    colorValue,
    setColorValue,
    themeOpen,
    setThemeOpen,
    colorOpen,
    setColorOpen,
    codeSnippet,
    expanded,
    setExpanded,
  }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 mb-4 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-blue-500 rounded-full"></span>
          {title}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors duration-200"
            title={expanded ? "Thu gọn" : "Mở rộng"}
          >
            <Minus className={`w-4 h-4 text-gray-500 dark:text-gray-400 ${expanded ? '' : 'rotate-90'}`} />
          </button>
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors duration-200"
            title="Đóng"
          >
            <X className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          </button>
        </div>
      </div>

      <div className={`transition-all duration-300 ${expanded ? 'max-h-96 opacity-100 p-4' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Chế độ hiển thị</label>
            <CustomSelect
              value={themeValue}
              onChange={setThemeValue}
              options={themeOptions}
              isOpen={themeOpen}
              setIsOpen={setThemeOpen}
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Màu sắc chủ đạo</label>
            <CustomSelect
              value={colorValue}
              onChange={setColorValue}
              options={colorOptions}
              isOpen={colorOpen}
              setIsOpen={setColorOpen}
              isColorSelect={true}
            />
          </div>
        </div>

        {codeSnippet && (
          <div className="mt-4 bg-gray-50 dark:bg-gray-900 rounded-lg p-3">
            <code className="text-sm text-gray-700 dark:text-gray-300 font-mono block whitespace-pre">
              {codeSnippet}
            </code>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out forwards; }
      `}</style>

      {showSuccess && (
        <div className="fixed top-4 right-4 z-50 animate-fadeIn">
          <div className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            <span className="font-medium">Áp dụng giao diện thành công!</span>
          </div>
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 lg:px-8 py-4 top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <img src="https://dvntechnology.com/icons/Logo.png" alt="Logo" className="h-8 w-8" />
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                Tùy chỉnh giao diện
              </h1>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
                Trang chủ
              </a>
              <span>/</span>
              <span className="font-medium">Tùy chỉnh giao diện</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-4">
          <ThemeSection
            title="Sidebar"
            themeValue={sidebarTheme}
            setThemeValue={setSidebarTheme}
            colorValue={sidebarColor}
            setColorValue={setSidebarColor}
            themeOpen={sidebarThemeOpen}
            setThemeOpen={setSidebarThemeOpen}
            colorOpen={sidebarColorOpen}
            setColorOpen={setSidebarColorOpen}
            codeSnippet={`<aside class="app-sidebar ${sidebarColor} dark:bg-gray-900">...</aside>`}
            expanded={sidebarExpanded}
            setExpanded={setSidebarExpanded}
          />

          <ThemeSection
            title="Navbar"
            themeValue={navbarTheme}
            setThemeValue={setNavbarTheme}
            colorValue={navbarColor}
            setColorValue={setNavbarColor}
            themeOpen={navbarThemeOpen}
            setThemeOpen={setNavbarThemeOpen}
            colorOpen={navbarColorOpen}
            setColorOpen={setNavbarColorOpen}
            codeSnippet={`<nav class="app-header navbar navbar-expand ${navbarColor} dark:bg-gray-900">...</nav>`}
            expanded={navbarExpanded}
            setExpanded={setNavbarExpanded}
          />

          <ThemeSection
            title="Footer"
            themeValue={footerTheme}
            setThemeValue={setFooterTheme}
            colorValue={footerColor}
            setColorValue={setFooterColor}
            themeOpen={footerThemeOpen}
            setThemeOpen={setFooterThemeOpen}
            colorOpen={footerColorOpen}
            setColorOpen={setFooterColorOpen}
            codeSnippet={`<footer class="app-footer ${footerColor} dark:bg-gray-900">...</footer>`}
            expanded={footerExpanded}
            setExpanded={setFooterExpanded}
          />
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8 mb-6">
          <button
            onClick={handleResetTheme}
            className="px-6 py-2.5 bg-gray-500 text-white rounded-lg font-medium shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors duration-200"
          >
            <span className="flex items-center gap-2">
              <X className="w-4 h-4" />
              Đặt lại mặc định
            </span>
          </button>

          <button
            onClick={handleApplyTheme}
            className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
          >
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Áp dụng giao diện
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThemeGenerate;
