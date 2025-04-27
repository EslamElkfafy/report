import { useState, useMemo } from 'react';
import { Product, FilterOptions } from '../types';
import { products } from '../data/products';

export const useProducts = () => {
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    category: null,
    priceRange: null,
    artistId: null,
    searchQuery: ''
  });

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Filter by category
      if (filterOptions.category && filterOptions.category !== 'all' && product.category !== filterOptions.category) {
        return false;
      }

      // Filter by price range
      if (filterOptions.priceRange) {
        const [min, max] = filterOptions.priceRange;
        if (product.price < min || product.price > max) {
          return false;
        }
      }

      // Filter by artist
      if (filterOptions.artistId && product.artistId !== filterOptions.artistId) {
        return false;
      }

      // Filter by search query
      if (filterOptions.searchQuery) {
        const query = filterOptions.searchQuery.toLowerCase();
        return (
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
        );
      }

      return true;
    });
  }, [filterOptions]);

  const getFeaturedProducts = (): Product[] => {
    return products.filter(product => product.featured);
  };

  const getProductById = (id: number): Product | undefined => {
    return products.find(product => product.id === id);
  };

  const getRelatedProducts = (product: Product, limit = 4): Product[] => {
    // Get products in the same category but exclude the current product
    return products
      .filter(p => p.category === product.category && p.id !== product.id)
      .slice(0, limit);
  };

  return {
    products: filteredProducts,
    filterOptions,
    setFilterOptions,
    getFeaturedProducts,
    getProductById,
    getRelatedProducts
  };
};