import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import ProductList from '../components/products/ProductList';
import ProductFilter from '../components/products/ProductFilter';
import { useProducts } from '../hooks/useProducts';
import { FilterOptions } from '../types';
import { Filter } from 'lucide-react';

const ProductsPage: React.FC = () => {
  const location = useLocation();
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const { products, filterOptions, setFilterOptions } = useProducts();
  
  // Extract search query from URL if present
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    const search = params.get('search');
    const artistId = params.get('artistId');
    
    const newFilters: FilterOptions = { ...filterOptions };
    
    if (category) {
      newFilters.category = category;
    }
    
    if (search) {
      newFilters.searchQuery = search;
    }
    
    if (artistId) {
      newFilters.artistId = Number(artistId);
    }
    
    setFilterOptions(newFilters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);
  
  const toggleMobileFilter = () => {
    setIsMobileFilterOpen(!isMobileFilterOpen);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-semibold mb-8">Our Handcrafted Collection</h1>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Mobile Filter Toggle */}
          <div className="md:hidden flex justify-between items-center mb-4">
            <button
              onClick={toggleMobileFilter}
              className="flex items-center gap-2 py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
            >
              <Filter size={18} />
              <span>Filter Products</span>
            </button>
            
            <p className="text-gray-600">{products.length} products</p>
          </div>
          
          {/* Filters - Desktop (always visible) / Mobile (toggle) */}
          <div className="md:w-1/4 lg:w-1/5">
            <div className="hidden md:block sticky top-24">
              <ProductFilter 
                filterOptions={filterOptions} 
                setFilterOptions={setFilterOptions}
                isMobileFilterOpen={isMobileFilterOpen}
                closeMobileFilter={() => setIsMobileFilterOpen(false)}
              />
            </div>
            
            {/* Mobile Filter */}
            <div className="md:hidden">
              <ProductFilter 
                filterOptions={filterOptions} 
                setFilterOptions={setFilterOptions}
                isMobileFilterOpen={isMobileFilterOpen}
                closeMobileFilter={() => setIsMobileFilterOpen(false)}
              />
            </div>
          </div>
          
          {/* Product Listing */}
          <div className="md:w-3/4 lg:w-4/5">
            <ProductList 
              products={products}
              showFilters={true}
              onToggleFilters={toggleMobileFilter}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductsPage;