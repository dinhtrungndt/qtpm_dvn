import { ArrowLeft, Clock, Construction } from "lucide-react";
import { Link } from "react-router-dom";

const Updating = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">

          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <Construction className="w-10 h-10 text-gray-600 dark:text-gray-300" />
            </div>
          </div>

          {/* Content */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-full">
              <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span className="text-amber-700 dark:text-amber-400 text-sm font-medium">Đang phát triển</span>
            </div>

            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Chức năng chưa sẵn sàng
            </h1>

            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Chúng tôi đang phát triển tính năng này. Vui lòng quay lại sau hoặc liên hệ để biết thêm thông tin.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-3 mt-8">
            <Link
              to="/dashboard/v1"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 dark:bg-gray-700 hover:bg-gray-800 dark:hover:bg-gray-600 text-white rounded-lg font-medium transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              Quay lại trang chủ
            </Link>

            <a
              href="mailto:support@example.com"
              className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-colors duration-200"
            >
              Liên hệ hỗ trợ
            </a>
          </div>

          {/* Footer */}
          <p className="text-center text-sm text-gray-500 dark:text-gray-500 mt-6">
            Cảm ơn sự kiên nhẫn của bạn
          </p>
        </div>
      </div>
    </div>
  );
};

export default Updating;
