import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { useArtists } from '../hooks/useArtists';
import { useCart } from '../contexts/CartContext';
import Layout from '../components/layout/Layout';
import ProductCard from '../components/products/ProductCard';
import { Minus, Plus, Heart, ShoppingBag, ArrowLeft } from 'lucide-react';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getProductById, getRelatedProducts } = useProducts();
  const { getArtistById } = useArtists();
  const { addToCart } = useCart();
  
  const [quantity, setQuantity] = useState(1);

  const product = getProductById(Number(id));
  
  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-semibold mb-4">Product Not Found</h1>
          <p className="mb-8">The product you're looking for doesn't exist or has been removed.</p>
          <Link 
            to="/products" 
            className="inline-flex items-center text-forest-green hover:text-forest-green-dark"
          >
            <ArrowLeft size={18} className="mr-2" />
            Back to Products
          </Link>
        </div>
      </Layout>
    );
  }

  const artist = getArtistById(product.artistId);
  const relatedProducts = getRelatedProducts(product);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity > 0 && newQuantity <= product.inStock) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb Navigation */}
        <div className="text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-forest-green">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/products" className="hover:text-forest-green">Products</Link>
          <span className="mx-2">/</span>
          <Link to={`/products?category=${product.category}`} className="hover:text-forest-green capitalize">
            {product.category}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700">{product.name}</span>
        </div>
      
        <div className="flex flex-col lg:flex-row gap-12 mb-16">
          {/* Product Image */}
          <div className="w-full lg:w-1/2">
            <div className="bg-gray-100 rounded-lg overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-auto object-contain aspect-square"
              />
            </div>
          </div>
          
          {/* Product Details */}
          <div className="w-full lg:w-1/2">
            <h1 className="text-3xl font-semibold text-gray-900 mb-2">{product.name}</h1>
            
            {/* Artist Link */}
            {artist && (
              <Link 
                to={`/artist/${artist.id}`} 
                className="text-forest-green hover:text-forest-green-dark inline-block mb-4"
              >
                By {artist.name}
              </Link>
            )}
            
            <p className="text-2xl font-medium text-gray-900 mb-6">${product.price.toFixed(2)}</p>
            
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Description</h3>
              <p className="text-gray-700">{product.description}</p>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Materials</h3>
              <div className="flex flex-wrap gap-2">
                {product.materials.map((material, index) => (
                  <span key={index} className="px-3 py-1 bg-cream text-gray-800 rounded-full text-sm capitalize">
                    {material}
                  </span>
                ))}
              </div>
            </div>
            
            {product.dimensions && (
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Dimensions</h3>
                <p className="text-gray-700">{product.dimensions}</p>
              </div>
            )}
            
            {/* Inventory Status */}
            <div className="mb-6">
              {product.inStock > 0 ? (
                <p className={`${
                  product.inStock <= 3 ? 'text-amber-600' : 'text-green-600'
                }`}>
                  {product.inStock <= 3 
                    ? `Only ${product.inStock} left in stock - order soon` 
                    : 'In Stock'}
                </p>
              ) : (
                <p className="text-red-600">Out of Stock</p>
              )}
            </div>
            
            {/* Quantity Selector */}
            {product.inStock > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Quantity</h3>
                <div className="flex items-center">
                  <button 
                    onClick={() => handleQuantityChange(quantity - 1)}
                    className="p-2 border border-gray-300 rounded-l-md text-gray-500 hover:bg-gray-50 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={16} />
                  </button>
                  <input 
                    type="number"
                    min="1"
                    max={product.inStock}
                    value={quantity}
                    onChange={(e) => handleQuantityChange(Number(e.target.value))}
                    className="w-16 text-center border-t border-b border-gray-300 py-2 focus:outline-none focus:ring-0 focus:border-gray-300"
                  />
                  <button 
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={quantity >= product.inStock}
                    className={`p-2 border border-gray-300 rounded-r-md text-gray-500 transition-colors ${
                      quantity >= product.inStock 
                        ? 'opacity-50 cursor-not-allowed' 
                        : 'hover:bg-gray-50'
                    }`}
                    aria-label="Increase quantity"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            )}
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                onClick={handleAddToCart}
                disabled={product.inStock === 0}
                className={`flex-1 px-6 py-3 rounded-md font-medium flex items-center justify-center ${
                  product.inStock === 0
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-forest-green hover:bg-forest-green-dark text-white'
                }`}
              >
                <ShoppingBag size={18} className="mr-2" />
                Add to Cart
              </button>
              
              <button
                className="flex-1 px-6 py-3 bg-white border border-gray-300 rounded-md font-medium text-gray-700 hover:bg-gray-50 flex items-center justify-center"
              >
                <Heart size={18} className="mr-2" />
                Save for Later
              </button>
            </div>
            
            {/* Custom Order Section */}
            <div className="mt-8 p-6 bg-cream rounded-lg">
              <h3 className="text-lg font-medium mb-2">Want a custom version?</h3>
              <p className="text-gray-700 mb-4">
                Our artisans can create a personalized piece just for you.
              </p>
              <Link 
                to={`/custom-orders?product=${product.id}`}
                className="inline-block px-6 py-2 bg-terracotta hover:bg-terracotta-light text-white rounded-md font-medium transition-colors"
              >
                Request Custom Order
              </Link>
            </div>
          </div>
        </div>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-semibold mb-8">You might also like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(relatedProduct => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetail;