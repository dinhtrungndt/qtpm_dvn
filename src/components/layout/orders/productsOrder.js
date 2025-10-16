import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../../../stores/redux/actions/orderActions';

const ProductsOrder = () => {
  const dispatch = useDispatch();
  const { isLoading, error, message } = useSelector((state) => state.order);

  const [formData, setFormData] = useState({
    product_id: '',
    quantity: 1,
    total_price: 0,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createOrder(formData));
    setFormData({ product_id: '', quantity: 1, total_price: 0 });
  };

  return (
    <div>
      <h2>Đặt hàng sản phẩm</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="ID sản phẩm"
          value={formData.product_id}
          onChange={(e) =>
            setFormData({ ...formData, product_id: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Số lượng"
          value={formData.quantity}
          onChange={(e) =>
            setFormData({ ...formData, quantity: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Tổng tiền"
          value={formData.total_price}
          onChange={(e) =>
            setFormData({ ...formData, total_price: e.target.value })
          }
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Đang đặt...' : 'Đặt hàng'}
        </button>
      </form>

      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default ProductsOrder;
