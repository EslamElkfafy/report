import React from 'react';
import { Link } from 'react-router-dom';
import { CartItem as CartItemType } from '../../types';
import { useCart } from '../../contexts/CartContext';
import { X, Minus, Plus } from 'lucide-react';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity } = item;

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity > 0 && newQuantity <= product.inStock) {
      updateQuantity(product.id, newQuantity);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row py-6 border-b border-gray-200 gap-4">
      {/* Product Image */}
      <Link to={`/product/${product.id}`} className="shrink-0 w-full sm:w-24 h-24 bg-gray-100 rounded overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover"
        />
      </Link>
      
      {/* Product Details */}
      <div className="flex-1">
        <div className="flex flex-col sm:flex-row sm:justify-between">
          <div>
            <Link to={`/product/${product.id}`} className="text-lg font-medium text-gray-900 hover:text-forest-green transition-colors">
              {product.name}
            </Link>
            <p className="text-sm text-gray-500 capitalize">{product.category}</p>
          </div>
          
          <div className="mt-2 sm:mt-0 text-right">
            <span className="font-medium text-gray-900">${product.price}</span>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-4">
          {/* Quantity Controls */}
          <div className="flex items-center">
            <button 
              onClick={() => handleQuantityChange(quantity - 1)}
              className="p-1 border border-gray-300 rounded-l-md text-gray-500 hover:bg-gray-50 transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus size={14} />
            </button>
            <input 
              type="number"
              min="1"
              max={product.inStock}
              value={quantity}
              onChange={(e) => handleQuantityChange(Number(e.target.value))}
              className="w-12 text-center border-t border-b border-gray-300 py-1 focus:outline-none focus:ring-0 focus:border-gray-300"
            />
            <button 
              onClick={() => handleQuantityChange(quantity + 1)}
              disabled={quantity >= product.inStock}
              className={`p-1 border border-gray-300 rounded-r-md text-gray-500 transition-colors ${
                quantity >= product.inStock 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:bg-gray-50'
              }`}
              aria-label="Increase quantity"
            >
              <Plus size={14} />
            </button>
          </div>
          
          {/* Subtotal and Remove */}
          <div className="flex justify-between items-center mt-3 sm:mt-0">
            <span className="font-medium text-gray-900">
              ${(product.price * quantity).toFixed(2)}
            </span>
            <button 
              onClick={() => removeFromCart(product.id)}
              className="ml-4 p-1.5 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
              aria-label="Remove item"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;