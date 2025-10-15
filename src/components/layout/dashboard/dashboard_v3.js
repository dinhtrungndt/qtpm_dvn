import { Link } from 'react-router-dom';

const Dashboard_v3 = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* title */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold text-gray-900">Dashboard v3</h1>
        <div className="flex items-center gap-2 text-xs">
          <Link to="/" className="text-blue-600 hover:text-blue-700 transition-colors">Trang chủ</Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-600">Dashboard v3</span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard_v3;
