import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { Product } from '../../types';
import { Grid, List, SlidersHorizontal } from 'lucide-react';

interface ProductListProps {
  products: Product[];
  title?: string;
  showFilters?: boolean;
  onToggleFilters?: () => void;
}

const ProductList: React.FC<ProductListProps> = ({ 
  products, 
  title, 
  showFilters = false, 
  onToggleFilters 
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  if (products.length === 0) {
    return (
      <div className="py-16 text-center">
        <h2 className="text-2xl font-medium text-gray-900 mb-4">No products found</h2>
        <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        {title && (
          <h2 className="text-2xl font-medium text-gray-900 mb-4 sm:mb-0">{title}</h2>
        )}
        
        <div className="flex items-center space-x-4">
          {showFilters && (
            <button 
              onClick={onToggleFilters}
              className="flex items-center text-gray-700 hover:text-forest-green transition-colors"
            >
              <SlidersHorizontal size={18} className="mr-1" />
              <span className="text-sm">Filters</span>
            </button>
          )}
          
          <div className="flex items-center space-x-2 border-l pl-4 border-gray-200">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-gray-100 text-forest-green' : 'text-gray-500 hover:text-forest-green'}`}
              aria-label="Grid view"
            >
              <Grid size={18} />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-gray-100 text-forest-green' : 'text-gray-500 hover:text-forest-green'}`}
              aria-label="List view"
            >
              <List size={18} />
            </button>
          </div>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {products.map(product => (
            <div key={product.id} className="flex flex-col sm:flex-row bg-white rounded-lg overflow-hidden shadow-md">
              <div className="sm:w-48 h-48">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="font-medium text-lg mb-1 text-gray-900">{product.name}</h3>
                <div className="text-gray-500 text-sm mb-2 capitalize">{product.category}</div>
                <p className="text-gray-700 text-sm mb-auto line-clamp-2">{product.description}</p>
                <div className="flex justify-between items-center mt-3">
                  <span className="font-semibold text-gray-900">${product.price}</span>
                  <button 
                    className="px-3 py-1.5 bg-forest-green text-white text-sm rounded hover:bg-forest-green-dark transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;