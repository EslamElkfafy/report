import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="col-span-1">
            <Link to="/" className="text-2xl font-semibold text-forest-green mb-4 block">
              ArtisanCraft
            </Link>
            <p className="text-gray-600 mb-4">
              Supporting artisans and their handcrafted creations since 2020.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-gray-600 hover:text-forest-green transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="#" 
                className="text-gray-600 hover:text-forest-green transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="#" 
                className="text-gray-600 hover:text-forest-green transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Shop Column */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="text-gray-600 hover:text-forest-green transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/products?category=ceramics" className="text-gray-600 hover:text-forest-green transition-colors">
                  Ceramics
                </Link>
              </li>
              <li>
                <Link to="/products?category=textiles" className="text-gray-600 hover:text-forest-green transition-colors">
                  Textiles
                </Link>
              </li>
              <li>
                <Link to="/products?category=jewelry" className="text-gray-600 hover:text-forest-green transition-colors">
                  Jewelry
                </Link>
              </li>
              <li>
                <Link to="/products?category=woodworking" className="text-gray-600 hover:text-forest-green transition-colors">
                  Woodworking
                </Link>
              </li>
            </ul>
          </div>

          {/* About Column */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">About</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/artists" className="text-gray-600 hover:text-forest-green transition-colors">
                  Our Artists
                </Link>
              </li>
              <li>
                <Link to="/custom-orders" className="text-gray-600 hover:text-forest-green transition-colors">
                  Custom Orders
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-forest-green transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-forest-green transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Join Our Newsletter</h3>
            <p className="text-gray-600 mb-4">
              Stay updated on new artisans, products, and special offers.
            </p>
            <form className="mb-4">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-3 py-2 border border-gray-300 rounded-l-md flex-grow focus:outline-none focus:ring-2 focus:ring-forest-green focus:border-transparent"
                  required
                />
                <button
                  type="submit"
                  className="bg-forest-green hover:bg-forest-green-dark text-white px-4 py-2 rounded-r-md transition-colors duration-200 flex items-center"
                >
                  <Mail size={16} className="mr-1" />
                  Join
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm">
            &copy; {new Date().getFullYear()} ArtisanCraft. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-600 hover:text-forest-green text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-600 hover:text-forest-green text-sm transition-colors">
              Terms of Service
            </Link>
            <Link to="/shipping" className="text-gray-600 hover:text-forest-green text-sm transition-colors">
              Shipping Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;