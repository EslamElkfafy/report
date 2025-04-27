import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import CartItem from '../components/cart/CartItem';
import { useCart } from '../contexts/CartContext';
import { ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';

const CartPage: React.FC = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  
  // Calculate shipping (for demo, free shipping over $100)
  const subtotal = getCartTotal();
  const shipping = subtotal > 100 ? 0 : 10;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <h1 className="text-3xl font-semibold mb-6">Your Cart</h1>
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="inline-block p-6 bg-gray-100 rounded-full mb-4">
              <ShoppingBag size={32} className="text-gray-400" />
            </div>
            <h2 className="text-xl font-medium mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Looks like you haven't added any items to your cart yet.</p>
            <Link 
              to="/products" 
              className="inline-block px-6 py-3 bg-forest-green text-white rounded-md font-medium hover:bg-forest-green-dark transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-semibold mb-8">Your Cart</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-medium">Items ({cart.length})</h2>
                <button 
                  onClick={clearCart}
                  className="text-red-500 hover:text-red-700 flex items-center"
                >
                  <Trash2 size={16} className="mr-1" />
                  <span>Clear Cart</span>
                </button>
              </div>
              
              <div className="divide-y divide-gray-200">
                {cart.map(item => (
                  <CartItem key={item.product.id} item={item} />
                ))}
              </div>
            </div>
            
            {/* Continue Shopping */}
            <div className="mt-4">
              <Link 
                to="/products" 
                className="text-forest-green hover:text-forest-green-dark flex items-center"
              >
                <span>Continue shopping</span>
              </Link>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-medium mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                {shipping === 0 && (
                  <div className="text-green-600 text-sm">
                    You've qualified for free shipping!
                  </div>
                )}
                {shipping > 0 && (
                  <div className="text-gray-600 text-sm">
                    Add ${(100 - subtotal).toFixed(2)} more to qualify for free shipping
                  </div>
                )}
                <div className="border-t border-gray-200 pt-4 mt-2">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <Link 
                to="/checkout" 
                className="block w-full py-3 bg-forest-green text-white text-center rounded-md font-medium hover:bg-forest-green-dark transition-colors flex items-center justify-center"
              >
                Proceed to Checkout <ArrowRight size={18} className="ml-2" />
              </Link>
              
              <div className="mt-6 text-sm text-gray-600">
                <p className="mb-2">
                  We accept credit cards, PayPal, and bank transfers.
                </p>
                <p>
                  All items are handmade to order, please allow 3-5 business days for your items to be created before shipping.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;