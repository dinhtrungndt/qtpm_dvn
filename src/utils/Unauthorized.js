import { HouseWifi, TriangleAlert } from 'lucide-react';
import { Link } from 'react-router-dom';

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <div className="flex justify-center">
          <TriangleAlert className="text-6xl text-yellow-500" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Không có quyền truy cập
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Bạn không có quyền truy cập tính năng này.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <HouseWifi className="mr-2" /> Quay về trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
