import React from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../../hooks/useProducts';
import ProductCard from '../products/ProductCard';
import { ArrowRight } from 'lucide-react';

const FeaturedProducts: React.FC = () => {
  const { getFeaturedProducts } = useProducts();
  const featuredProducts = getFeaturedProducts();

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-semibold text-gray-900">Featured Products</h2>
          <Link 
            to="/products" 
            className="flex items-center text-forest-green hover:text-forest-green-dark transition-colors"
          >
            View all products <ArrowRight size={18} className="ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredProducts.slice(0, 4).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;