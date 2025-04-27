import React from 'react';
import { FilterOptions } from '../../types';
import { categories, priceRanges } from '../../data/products';
import { artists } from '../../data/artists';
import { X } from 'lucide-react';

interface ProductFilterProps {
  filterOptions: FilterOptions;
  setFilterOptions: (options: FilterOptions) => void;
  isMobileFilterOpen: boolean;
  closeMobileFilter: () => void;
}

const ProductFilter: React.FC<ProductFilterProps> = ({ 
  filterOptions, 
  setFilterOptions,
  isMobileFilterOpen,
  closeMobileFilter
}) => {
  const handleCategoryChange = (categoryId: string) => {
    setFilterOptions({
      ...filterOptions,
      category: categoryId === 'all' ? null : categoryId
    });
  };

  const handlePriceRangeChange = (rangeId: number) => {
    const selectedRange = priceRanges.find(range => range.id === rangeId);
    setFilterOptions({
      ...filterOptions,
      priceRange: selectedRange ? selectedRange.range : null
    });
  };

  const handleArtistChange = (artistId: number | null) => {
    setFilterOptions({
      ...filterOptions,
      artistId
    });
  };

  const resetFilters = () => {
    setFilterOptions({
      category: null,
      priceRange: null,
      artistId: null,
      searchQuery: ''
    });
  };

  const filterClasses = `
    bg-white p-6 rounded-lg shadow-md space-y-6 
    ${isMobileFilterOpen ? 
      'fixed inset-0 z-50 overflow-auto transform translate-x-0 transition-transform duration-300 ease-in-out md:static md:transform-none md:duration-0' : 
      'fixed inset-0 z-50 overflow-auto transform -translate-x-full transition-transform duration-300 ease-in-out md:static md:transform-none md:duration-0'
    }
  `;

  return (
    <div className={filterClasses}>
      {/* Mobile Filter Header */}
      <div className="flex justify-between items-center md:hidden mb-4">
        <h3 className="font-medium text-xl">Filters</h3>
        <button 
          onClick={closeMobileFilter}
          className="p-1.5 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200"
          aria-label="Close filters"
        >
          <X size={18} />
        </button>
      </div>

      {/* Categories */}
      <div>
        <h3 className="font-medium text-gray-900 mb-3">Categories</h3>
        <div className="space-y-2">
          {categories.map(category => (
            <label key={category.id} className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="category"
                checked={filterOptions.category === category.id || (category.id === 'all' && filterOptions.category === null)}
                onChange={() => handleCategoryChange(category.id)}
                className="h-4 w-4 text-forest-green border-gray-300 focus:ring-forest-green rounded transition-colors"
              />
              <span className="ml-2 text-gray-700">{category.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-medium text-gray-900 mb-3">Price Range</h3>
        <div className="space-y-2">
          {priceRanges.map(range => (
            <label key={range.id} className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="price-range"
                checked={filterOptions.priceRange === range.range || (range.id === 4 && filterOptions.priceRange === null)}
                onChange={() => handlePriceRangeChange(range.id)}
                className="h-4 w-4 text-forest-green border-gray-300 focus:ring-forest-green rounded transition-colors"
              />
              <span className="ml-2 text-gray-700">{range.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Artists */}
      <div>
        <h3 className="font-medium text-gray-900 mb-3">Artists</h3>
        <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="artist"
              checked={filterOptions.artistId === null}
              onChange={() => handleArtistChange(null)}
              className="h-4 w-4 text-forest-green border-gray-300 focus:ring-forest-green rounded transition-colors"
            />
            <span className="ml-2 text-gray-700">All Artists</span>
          </label>
          {artists.map(artist => (
            <label key={artist.id} className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="artist"
                checked={filterOptions.artistId === artist.id}
                onChange={() => handleArtistChange(artist.id)}
                className="h-4 w-4 text-forest-green border-gray-300 focus:ring-forest-green rounded transition-colors"
              />
              <span className="ml-2 text-gray-700">{artist.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Reset Filters */}
      <div className="pt-2 border-t border-gray-200">
        <button
          onClick={resetFilters}
          className="text-sm text-forest-green hover:text-forest-green-dark transition-colors"
        >
          Reset all filters
        </button>
      </div>
    </div>
  );
};

export default ProductFilter;