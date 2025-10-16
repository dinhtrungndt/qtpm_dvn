import { Check, Edit2, Loader, Plus, Search, Trash2, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createProduct, deleteProduct, getProducts, updateProduct
} from '../../../stores/redux/actions/productActions';

const ManageProduct = () => {
  const dispatch = useDispatch();
  const { products, isLoading, error, message } = useSelector(
    (state) => state.product
  );

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock: '',
    description: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    if (message) {
      setNotification({ msg: message, type: 'success' });
      setTimeout(() => setNotification(''), 3000);
    }
    if (error) {
      setNotification({ msg: error, type: 'error' });
      setTimeout(() => setNotification(''), 3000);
    }
  }, [message, error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.stock) {
      setNotification({ msg: 'Vui lòng nhập đầy đủ thông tin', type: 'error' });
      return;
    }

    if (editingId) {
      dispatch(updateProduct(editingId, formData));
    } else {
      dispatch(createProduct(formData));
    }
    setFormData({ name: '', price: '', stock: '', description: '' });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      price: product.price,
      stock: product.stock,
      description: product.description,
    });
    setEditingId(product.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn chắc chắn muốn xóa sản phẩm này?')) {
      dispatch(deleteProduct(id));
    }
  };

  const handleCancel = () => {
    setFormData({ name: '', price: '', stock: '', description: '' });
    setEditingId(null);
    setShowForm(false);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8">
      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg animate-slide-in z-50 flex items-center gap-2 ${notification.type === 'success'
          ? 'bg-green-500 text-white'
          : 'bg-red-500 text-white'
          }`}>
          {notification.type === 'success' ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
          {notification.msg}
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Quản Lý Sản Phẩm</h1>
          <p className="text-slate-400">Quản lý danh sách sản phẩm hệ thống</p>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 animate-fade-in" style={{ animationDelay: '100ms' }}>
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-lg font-medium transition-all hover:shadow-lg hover:shadow-green-500/20 transform hover:scale-105"
          >
            <Plus className="w-5 h-5" />
            Thêm Sản Phẩm
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-slate-700 rounded-xl border border-slate-600 p-6 mb-8 animate-slide-down shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">
                {editingId ? 'Chỉnh Sửa Sản Phẩm' : 'Tạo Sản Phẩm Mới'}
              </h2>
              <button
                onClick={handleCancel}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Tên sản phẩm"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="px-4 py-2 rounded-lg bg-slate-600 border border-slate-500 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
                <input
                  type="number"
                  placeholder="Giá"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="px-4 py-2 rounded-lg bg-slate-600 border border-slate-500 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
                <input
                  type="number"
                  placeholder="Tồn kho"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  className="px-4 py-2 rounded-lg bg-slate-600 border border-slate-500 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>
              <textarea
                placeholder="Mô tả sản phẩm"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows="3"
                className="w-full px-4 py-2 rounded-lg bg-slate-600 border border-slate-500 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
              />
              <div className="flex gap-2 justify-end pt-2">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-2 bg-slate-600 hover:bg-slate-500 text-white rounded-lg font-medium transition-all"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-all hover:shadow-lg disabled:opacity-50 transform hover:scale-105"
                >
                  {isLoading ? 'Đang xử lý...' : editingId ? 'Cập nhật' : 'Thêm mới'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Products Table */}
        <div className="bg-slate-700 rounded-xl border border-slate-600 overflow-hidden shadow-xl animate-fade-in" style={{ animationDelay: '200ms' }}>
          {isLoading && !showForm && (
            <div className="flex items-center justify-center py-12">
              <Loader className="w-8 h-8 text-green-500 animate-spin" />
            </div>
          )}

          {!isLoading && filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-400 text-lg">Không có sản phẩm nào</p>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-800 border-b border-slate-600">
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">ID</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Tên Sản Phẩm</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Giá</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Tồn Kho</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Mô Tả</th>
                      <th className="px-6 py-4 text-right text-sm font-semibold text-slate-300">Hành Động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((product, idx) => (
                      <tr
                        key={product.id}
                        className="border-b border-slate-600 hover:bg-slate-600/50 transition-colors animate-fade-in"
                        style={{ animationDelay: `${idx * 50}ms` }}
                      >
                        <td className="px-6 py-4 text-slate-300 text-sm">{product.id}</td>
                        <td className="px-6 py-4 text-white font-medium">{product.name}</td>
                        <td className="px-6 py-4 text-slate-300 font-semibold text-green-400">
                          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${product.stock > 10
                            ? 'bg-green-500/20 text-green-300'
                            : product.stock > 0
                              ? 'bg-yellow-500/20 text-yellow-300'
                              : 'bg-red-500/20 text-red-300'
                            }`}>
                            {product.stock} cái
                          </span>
                        </td>
                        <td className="px-6 py-4 text-slate-300 text-sm truncate max-w-xs" title={product.description}>
                          {product.description || '-'}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => handleEdit(product)}
                              className="p-2 hover:bg-blue-600 text-blue-400 rounded-lg transition-all transform hover:scale-110"
                              title="Sửa"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(product.id)}
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
                {filteredProducts.map((product, idx) => (
                  <div
                    key={product.id}
                    className="bg-slate-600 p-4 rounded-lg border border-slate-500 space-y-2 animate-fade-in"
                    style={{ animationDelay: `${idx * 50}ms` }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <p className="font-semibold text-white">{product.name}</p>
                        <p className="text-green-400 font-bold text-lg">
                          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
                        </p>
                      </div>
                      <span className="text-xs text-slate-400">ID: {product.id}</span>
                    </div>
                    <p className="text-slate-400 text-sm">{product.description || '-'}</p>
                    <div className="flex justify-between items-center pt-2 border-t border-slate-500">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${product.stock > 10
                        ? 'bg-green-500/20 text-green-300'
                        : product.stock > 0
                          ? 'bg-yellow-500/20 text-yellow-300'
                          : 'bg-red-500/20 text-red-300'
                        }`}>
                        {product.stock} cái
                      </span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="p-2 hover:bg-blue-600 text-blue-400 rounded transition-all"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-2 hover:bg-red-600 text-red-400 rounded transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
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

export default ManageProduct;
