import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { useCart } from '../contexts/CartContext';
import { Lock, Check, CreditCard } from 'lucide-react';

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { cart, getCartTotal, clearCart } = useCart();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: ''
  });
  
  const [orderPlaced, setOrderPlaced] = useState(false);
  
  // Calculate totals
  const subtotal = getCartTotal();
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.07; // Assuming 7% tax
  const total = subtotal + shipping + tax;
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Processing order with details:', formData);
    console.log('Cart items:', cart);
    
    // Simulate order processing
    setTimeout(() => {
      setOrderPlaced(true);
      clearCart();
    }, 1500);
  };
  
  // Redirect to confirmation page after order is placed
  if (orderPlaced) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 max-w-3xl">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <Check className="text-green-600" size={32} />
            </div>
            <h1 className="text-2xl font-semibold mb-4">Order Confirmed!</h1>
            <p className="text-gray-700 mb-6">
              Thank you for your order. We've sent a confirmation email to {formData.email}.
            </p>
            <p className="text-gray-700 mb-6">
              Your order number is: <span className="font-medium">ART-{Math.floor(Math.random() * 10000)}</span>
            </p>
            <div className="mb-8 p-4 bg-gray-50 rounded-lg text-left">
              <h3 className="text-lg font-medium mb-2">What's Next?</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-5 h-5 bg-forest-green text-white rounded-full text-xs mr-2 mt-0.5">1</span>
                  <span>Our artisans will begin crafting your items</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-5 h-5 bg-forest-green text-white rounded-full text-xs mr-2 mt-0.5">2</span>
                  <span>You'll receive updates on your order progress</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-5 h-5 bg-forest-green text-white rounded-full text-xs mr-2 mt-0.5">3</span>
                  <span>Your handcrafted items will be carefully packaged and shipped</span>
                </li>
              </ul>
            </div>
            <div className="flex justify-center space-x-4">
              <Link 
                to="/" 
                className="px-6 py-3 bg-forest-green text-white font-medium rounded-md hover:bg-forest-green-dark transition-colors"
              >
                Back to Home
              </Link>
              <Link 
                to="/products" 
                className="px-6 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
  
  // Prevent access to checkout if cart is empty
  if (cart.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-semibold mb-4">Your cart is empty</h1>
          <p className="mb-8">Add some items to your cart before proceeding to checkout.</p>
          <Link 
            to="/products" 
            className="px-6 py-3 bg-forest-green text-white font-medium rounded-md hover:bg-forest-green-dark transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-10">
        <div className="flex items-center justify-center mb-8">
          <div className="relative w-full max-w-3xl">
            <div className="absolute top-1/2 h-0.5 w-full bg-gray-200 -translate-y-1/2"></div>
            <div className="relative flex justify-between">
              <div className="flex flex-col items-center">
                <div className="bg-forest-green text-white w-8 h-8 rounded-full flex items-center justify-center z-10">
                  <Check size={16} />
                </div>
                <span className="text-sm mt-2">Cart</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-forest-green text-white w-8 h-8 rounded-full flex items-center justify-center z-10">
                  <span className="text-sm font-medium">2</span>
                </div>
                <span className="text-sm mt-2">Checkout</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-gray-300 text-gray-600 w-8 h-8 rounded-full flex items-center justify-center z-10">
                  <span className="text-sm font-medium">3</span>
                </div>
                <span className="text-sm mt-2">Confirmation</span>
              </div>
            </div>
          </div>
        </div>
        
        <h1 className="text-3xl font-semibold mb-8">Checkout</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Checkout Form */}
          <div className="lg:w-2/3">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
              {/* Contact Information */}
              <div className="mb-8">
                <h2 className="text-xl font-medium mb-4">Contact Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-forest-green focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-forest-green focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-forest-green focus:border-transparent"
                  />
                </div>
              </div>
              
              {/* Shipping Address */}
              <div className="mb-8 border-t border-gray-200 pt-6">
                <h2 className="text-xl font-medium mb-4">Shipping Address</h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-forest-green focus:border-transparent"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-forest-green focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">State/Province</label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        required
                        value={formData.state}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-forest-green focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">ZIP / Postal</label>
                      <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        required
                        value={formData.zipCode}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-forest-green focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                    <select
                      id="country"
                      name="country"
                      required
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-forest-green focus:border-transparent"
                    >
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="UK">United Kingdom</option>
                      <option value="AU">Australia</option>
                    </select>
                  </div>
                </div>
              </div>
              
              {/* Payment Information */}
              <div className="mb-6 border-t border-gray-200 pt-6">
                <h2 className="text-xl font-medium mb-4">Payment Information</h2>
                <div className="bg-gray-50 p-4 rounded-lg mb-4 flex items-center">
                  <Lock size={16} className="text-gray-600 mr-2" />
                  <span className="text-gray-700 text-sm">Your payment information is encrypted and secure.</span>
                </div>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
                    <input
                      type="text"
                      id="cardName"
                      name="cardName"
                      required
                      value={formData.cardName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-forest-green focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                    <div className="relative">
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        required
                        placeholder="1234 5678 9012 3456"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-forest-green focus:border-transparent"
                      />
                      <CreditCard size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="cardExpiry" className="block text-sm font-medium text-gray-700 mb-1">Expiration Date</label>
                      <input
                        type="text"
                        id="cardExpiry"
                        name="cardExpiry"
                        required
                        placeholder="MM / YY"
                        value={formData.cardExpiry}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-forest-green focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label htmlFor="cardCvc" className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
                      <input
                        type="text"
                        id="cardCvc"
                        name="cardCvc"
                        required
                        placeholder="123"
                        value={formData.cardCvc}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-forest-green focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-6">
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-forest-green text-white font-medium rounded-md hover:bg-forest-green-dark transition-colors"
                >
                  Complete Order
                </button>
              </div>
            </form>
          </div>
          
          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-medium mb-4">Order Summary</h2>
              
              {/* Cart Items */}
              <div className="mb-6 max-h-80 overflow-y-auto pr-2">
                {cart.map(item => (
                  <div key={item.product.id} className="flex py-3 border-b border-gray-200 last:border-0">
                    <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden">
                      <img 
                        src={item.product.image} 
                        alt={item.product.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="text-sm font-medium">{item.product.name}</h3>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      <p className="text-sm font-medium mt-1">${(item.product.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Totals */}
              <div className="space-y-2 border-t border-gray-200 pt-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-medium text-lg pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="mt-6 text-sm text-gray-600">
                <p>By completing your purchase, you agree to our <a href="#" className="text-forest-green hover:text-forest-green-dark">Terms of Service</a> and acknowledge our <a href="#" className="text-forest-green hover:text-forest-green-dark">Privacy Policy</a>.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CheckoutPage;