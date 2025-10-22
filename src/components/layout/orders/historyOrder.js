import { Eye, Loader, Search, Trash2, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Notification from '../../../constants/notifications/notifi';
import useNotification from '../../../hooks/useNotification';
import { deleteOrder, getOrders } from '../../../stores/redux/actions/orderActions';

const HistoryOrder = () => {
  const dispatch = useDispatch();
  const { listOrders, isLoading, error } = useSelector(state => state.order);
  const { user: currentUser } = useSelector(state => state.user);

  const [searchTerm, setSearchTerm] = useState('');
  const { message, messageType, showMessage } = useNotification();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetail, setShowDetail] = useState(false);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const handleDelete = id => {
    if (window.confirm('Bạn chắc chắn muốn xóa đơn hàng này?')) {
      dispatch(deleteOrder(id));
      showMessage('Xóa đơn hàng thành công', 'success');
    }
  };

  const handleViewDetail = order => {
    setSelectedOrder(order);
    setShowDetail(true);
  };

  const getStatusColor = status => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-300';
      case 'completed':
        return 'bg-green-500/20 text-green-300';
      case 'cancelled':
        return 'bg-red-500/20 text-red-300';
      case 'shipped':
        return 'bg-blue-500/20 text-blue-300';
      default:
        return 'bg-slate-500/20 text-slate-300';
    }
  };

  const getStatusLabel = status => {
    const labels = {
      pending: 'Chờ xử lý',
      completed: 'Hoàn thành',
      cancelled: 'Hủy',
      shipped: 'Đã giao',
    };
    return labels[status?.toLowerCase()] || status;
  };

  const filteredOrders = listOrders.filter(
    order =>
      order.id.toString().includes(searchTerm) ||
      order.product_id.toString().includes(searchTerm) ||
      (order.username && order.username.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8">
      {/* Notification */}
      <Notification message={message} messageType={messageType} />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Lịch Sử Đơn Hàng</h1>
          <p className="text-slate-400">Xem chi tiết tất cả các đơn hàng đã tạo</p>
        </div>

        {/* Search */}
        <div
          className="flex flex-col md:flex-row gap-4 mb-8 animate-fade-in"
          style={{ animationDelay: '100ms' }}
        >
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder={
                currentUser?.role === 'admin'
                  ? 'Tìm kiếm theo ID, mã sản phẩm hoặc username...'
                  : 'Tìm kiếm theo ID hoặc mã sản phẩm...'
              }
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
            />
          </div>
          <div className="px-6 py-2 bg-slate-700 rounded-lg border border-slate-600 text-slate-300 font-medium">
            Tổng: <span className="text-purple-400">{filteredOrders.length}</span> đơn
          </div>
        </div>

        {/* Orders Table */}
        <div
          className="bg-slate-700 rounded-xl border border-slate-600 overflow-hidden shadow-xl animate-fade-in"
          style={{ animationDelay: '200ms' }}
        >
          {isLoading && (
            <div className="flex items-center justify-center py-12">
              <Loader className="w-8 h-8 text-purple-500 animate-spin" />
            </div>
          )}

          {!isLoading && error && (
            <div className="text-center py-12">
              <p className="text-red-400 text-lg">{error}</p>
            </div>
          )}

          {!isLoading && filteredOrders.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-400 text-lg">Không có đơn hàng nào</p>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-800 border-b border-slate-600">
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                        ID
                      </th>
                      {currentUser?.role === 'admin' && (
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                          Username
                        </th>
                      )}
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                        Sản Phẩm
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                        Số Lượng
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                        Tổng Tiền
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                        Trạng Thái
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                        Ngày Tạo
                      </th>
                      <th className="px-6 py-4 text-right text-sm font-semibold text-slate-300">
                        Hành Động
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order, idx) => (
                      <tr
                        key={order.id}
                        className="border-b border-slate-600 hover:bg-slate-600/50 transition-colors animate-fade-in"
                        style={{ animationDelay: `${idx * 50}ms` }}
                      >
                        <td className="px-6 py-4 text-white font-semibold text-sm">#{order.id}</td>
                        {currentUser?.role === 'admin' && (
                          <td className="px-6 py-4 text-slate-300 font-medium">
                            <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-xs font-semibold">
                              {order.username || '-'}
                            </span>
                          </td>
                        )}
                        {order.product_id == null ? (
                          <td className="px-6 py-4 text-slate-300 font-medium">
                            {order.product_ids}
                          </td>
                        ) : (
                          <td className="px-6 py-4 text-slate-300 font-medium">
                            {order.product_id}
                          </td>
                        )}
                        <td className="px-6 py-4 text-slate-300 font-medium">{order.quantity} x</td>
                        <td className="px-6 py-4 text-green-400 font-bold">
                          {new Intl.NumberFormat('vi-VN', {
                            style: 'currency',
                            currency: 'VND',
                          }).format(order.total_price)}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                              order.status
                            )}`}
                          >
                            {getStatusLabel(order.status)}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-slate-400 text-sm">
                          {new Date(order.created_at).toLocaleString('vi-VN')}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => handleViewDetail(order)}
                              className="p-2 hover:bg-purple-600 text-purple-400 rounded-lg transition-all transform hover:scale-110"
                              title="Chi tiết"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(order.id)}
                              className="p-2 hover:bg-red-600 text-red-400 rounded-lg transition-all transform hover:scale-110"
                              title="Xóa"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden space-y-3 p-4">
                {filteredOrders.map((order, idx) => (
                  <div
                    key={order.id}
                    className="bg-slate-600 p-4 rounded-lg border border-slate-500 space-y-2 animate-fade-in"
                    style={{ animationDelay: `${idx * 50}ms` }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <p className="font-semibold text-white">
                          Đơn #<span className="text-purple-400">{order.id}</span>
                        </p>
                        {currentUser?.role === 'admin' && (
                          <p className="text-cyan-300 text-sm font-semibold">
                            User: {order.username || '-'}
                          </p>
                        )}
                        <p className="text-slate-400 text-sm">Sản phẩm: {order.product_id}</p>
                      </div>
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {getStatusLabel(order.status)}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-500">
                      <div>
                        <p className="text-slate-400 text-xs">Số lượng</p>
                        <p className="text-white font-bold">{order.quantity} x</p>
                      </div>
                      <div>
                        <p className="text-slate-400 text-xs">Tổng tiền</p>
                        <p className="text-green-400 font-bold text-sm">
                          {new Intl.NumberFormat('vi-VN', {
                            style: 'currency',
                            currency: 'VND',
                          }).format(order.total_price)}
                        </p>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-500">
                      <p className="text-slate-400 text-xs mb-1">Ngày tạo</p>
                      <p className="text-slate-300 text-sm">
                        {new Date(order.created_at).toLocaleString('vi-VN')}
                      </p>
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        onClick={() => handleViewDetail(order)}
                        className="p-2 hover:bg-purple-600 text-purple-400 rounded transition-all"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(order.id)}
                        className="p-2 hover:bg-red-600 text-red-400 rounded transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Detail Modal */}
        {showDetail && selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fade-in">
            <div className="bg-slate-700 rounded-xl border border-slate-600 p-6 max-w-md w-full animate-slide-down shadow-2xl">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-white">Chi Tiết Đơn Hàng</h2>
                <button
                  onClick={() => setShowDetail(false)}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="bg-slate-600 p-3 rounded-lg">
                  <p className="text-slate-400 text-sm">Mã đơn hàng</p>
                  <p className="text-white font-bold text-lg">#{selectedOrder.id}</p>
                </div>

                {currentUser?.role === 'admin' && (
                  <div className="bg-slate-600 p-3 rounded-lg">
                    <p className="text-slate-400 text-sm">Username</p>
                    <p className="text-cyan-300 font-bold">{selectedOrder.username || '-'}</p>
                  </div>
                )}

                <div className="bg-slate-600 p-3 rounded-lg">
                  <p className="text-slate-400 text-sm">Mã sản phẩm</p>
                  <p className="text-white font-bold">{selectedOrder.product_id}</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-600 p-3 rounded-lg">
                    <p className="text-slate-400 text-sm">Số lượng</p>
                    <p className="text-white font-bold text-lg">{selectedOrder.quantity} x</p>
                  </div>
                  <div className="bg-slate-600 p-3 rounded-lg">
                    <p className="text-slate-400 text-sm">Tổng tiền</p>
                    <p className="text-green-400 font-bold">
                      {new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      }).format(selectedOrder.total_price)}
                    </p>
                  </div>
                </div>

                <div className="bg-slate-600 p-3 rounded-lg">
                  <p className="text-slate-400 text-sm">Trạng thái</p>
                  <span
                    className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      selectedOrder.status
                    )}`}
                  >
                    {getStatusLabel(selectedOrder.status)}
                  </span>
                </div>

                <div className="bg-slate-600 p-3 rounded-lg">
                  <p className="text-slate-400 text-sm">Ngày tạo</p>
                  <p className="text-white font-medium">
                    {new Date(selectedOrder.created_at).toLocaleString('vi-VN')}
                  </p>
                </div>

                <button
                  onClick={() => setShowDetail(false)}
                  className="w-full px-4 py-2 bg-slate-600 hover:bg-slate-500 text-white rounded-lg font-medium transition-all mt-4"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
          opacity: 0;
        }
        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default HistoryOrder;
