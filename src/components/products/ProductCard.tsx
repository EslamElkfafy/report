import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { useCart } from '../../contexts/CartContext';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="group relative bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
      {/* Product Image with Link */}
      <Link to={`/product/${product.id}`} className="block aspect-square overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>
      
      {/* Out of Stock Badge */}
      {product.inStock === 0 && (
        <div className="absolute top-2 right-2 bg-gray-800 text-white px-2 py-1 text-xs font-medium rounded">
          Out of Stock
        </div>
      )}
      
      {/* Low Stock Badge */}
      {product.inStock > 0 && product.inStock <= 3 && (
        <div className="absolute top-2 right-2 bg-amber-500 text-white px-2 py-1 text-xs font-medium rounded">
          Only {product.inStock} left
        </div>
      )}

      {/* Product Info */}
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-medium text-lg mb-1 text-gray-900 hover:text-forest-green transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <div className="text-gray-500 text-sm mb-2 capitalize">
          {product.category}
        </div>
        
        <div className="flex justify-between items-center mt-3">
          <span className="font-semibold text-gray-900">${product.price}</span>
          
          <button
            onClick={() => addToCart(product)}
            disabled={product.inStock === 0}
            className={`p-2 rounded-full transition-colors ${
              product.inStock === 0 
                ? 'bg-gray-200 cursor-not-allowed' 
                : 'bg-forest-green/10 hover:bg-forest-green/20 text-forest-green'
            }`}
            aria-label={product.inStock === 0 ? "Out of stock" : "Add to cart"}
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;