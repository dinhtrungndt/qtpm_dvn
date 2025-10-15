import { Link } from 'react-router-dom';
import Chartjs from '../ChartJS/chartjs';
import Chat from '../Chat/Chat';
import SmallBox from '../widgets/SmallBox';


const Dashboard_v1 = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* title */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
        <div className="flex items-center gap-2 text-xs">
          <Link to="/" className="text-blue-600 hover:text-blue-700 transition-colors">Trang chủ</Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-600">Dashboard</span>
        </div>
      </div>

      {/* Stats Grid - 4 columns */}
      <SmallBox />

      {/* ChartJS */}
      <Chartjs />

      {/* Chat */}
      <Chat />
    </div>
  );
};

export default Dashboard_v1;
