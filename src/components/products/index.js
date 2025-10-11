import { products } from '../../stores/data/products';

const ProductPage = () => {
  return (
    <div>
      {products.map((product) => (
        <div key={product.id} className="border rounded-lg p-4">
          <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded" />
          <h3 className="font-semibold mt-2">{product.name}</h3>
          <div className="flex items-center gap-2">
            <span className="text-red-500 font-bold">
              {product.price.toLocaleString('vi-VN')}đ
            </span>
            {product.originalPrice && (
              <span className="text-gray-400 line-through text-sm">
                {product.originalPrice.toLocaleString('vi-VN')}đ
              </span>
            )}
          </div>
          {product.badge && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
              {product.badge}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProductPage;
