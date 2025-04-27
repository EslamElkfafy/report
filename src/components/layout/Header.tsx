import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { ShoppingBag, Menu, X, Search } from 'lucide-react';

const Header: React.FC = () => {
  const { getItemCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to products page with search query
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="font-semibold text-2xl text-forest-green">
            ArtisanCraft
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-800 hover:text-forest-green transition-colors duration-200">
              Home
            </Link>
            <Link to="/products" className="text-gray-800 hover:text-forest-green transition-colors duration-200">
              Shop
            </Link>
            <Link to="/artists" className="text-gray-800 hover:text-forest-green transition-colors duration-200">
              Artists
            </Link>
            <Link to="/custom-orders" className="text-gray-800 hover:text-forest-green transition-colors duration-200">
              Custom Orders
            </Link>
          </nav>

          {/* Search, Cart, and Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            {/* Search Form */}
            <form onSubmit={handleSearch} className="hidden md:flex items-center relative">
              <input
                type="text"
                placeholder="Search products..."
                className="pl-3 pr-10 py-1 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-forest-green focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                type="submit" 
                className="absolute right-2 text-gray-500 hover:text-forest-green"
                aria-label="Search"
              >
                <Search size={16} />
              </button>
            </form>

            {/* Cart Link */}
            <Link to="/cart" className="relative text-gray-800 hover:text-forest-green transition-colors duration-200">
              <ShoppingBag size={24} />
              {getItemCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-terracotta text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getItemCount()}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-gray-800" 
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white py-4 px-2 mt-2 rounded-lg shadow-lg">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-gray-800 hover:text-forest-green transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/products" 
                className="text-gray-800 hover:text-forest-green transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Shop
              </Link>
              <Link 
                to="/artists" 
                className="text-gray-800 hover:text-forest-green transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Artists
              </Link>
              <Link 
                to="/custom-orders" 
                className="text-gray-800 hover:text-forest-green transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Custom Orders
              </Link>
              
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="flex items-center relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-forest-green focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button 
                  type="submit" 
                  className="absolute right-3 text-gray-500 hover:text-forest-green"
                  aria-label="Search"
                >
                  <Search size={16} />
                </button>
              </form>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;