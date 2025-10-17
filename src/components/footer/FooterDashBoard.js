import { Heart } from 'lucide-react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const FooterDashBoard = () => {
  const currentYear = new Date().getFullYear();
  const { footer } = useSelector((state) => state.theme);

  return (
    <footer
      className={`${footer.color || 'bg-white'} border-t border-gray-300 p-2 md:p-2`}
      data-bs-theme={footer.theme?.toLowerCase() || 'light'}
    >
      {/* Bottom Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3">
        <p className="text-xs text-gray-500 text-center md:text-left">
          © {currentYear} DVN Technology. All rights reserved.
        </p>

        <div className="flex items-center gap-1 text-xs text-gray-500">
          <span>Nguồn</span>
          <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 animate-pulse" />
          <span>DVN Technology</span>
        </div>

        <div className="flex items-center gap-4">
          <Link to="#" className="text-xs text-gray-500 hover:text-gray-900 transition-colors">
            Điều khoản
          </Link>
          <span className="text-gray-300">•</span>
          <Link to="#" className="text-xs text-gray-500 hover:text-gray-900 transition-colors">
            Bảo mật
          </Link>
          <span className="text-gray-300">•</span>
          <Link to="#" className="text-xs text-gray-500 hover:text-gray-900 transition-colors">
            Cookies
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default FooterDashBoard;
