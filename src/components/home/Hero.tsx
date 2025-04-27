import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative bg-forest-green text-white">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: "url('https://images.pexels.com/photos/6044667/pexels-photo-6044667.jpeg')",
          opacity: 0.4
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center py-16 md:py-24">
          
          {/* Text Content */}
          <div className="w-full lg:w-1/2 lg:pr-12 mb-10 lg:mb-0 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-semibold leading-tight mb-4">
              Discover Unique <span className="text-terracotta-light">Handcrafted</span> Treasures
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-8 max-w-xl">
              Supporting skilled artisans and bringing their exceptional craftsmanship directly to your home.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Link 
                to="/products" 
                className="px-6 py-3 bg-terracotta hover:bg-terracotta-light transition-colors rounded-md text-white font-medium inline-flex items-center justify-center"
              >
                Shop Collection <ArrowRight size={18} className="ml-2" />
              </Link>
              <Link 
                to="/artists" 
                className="px-6 py-3 bg-transparent hover:bg-white/10 transition-colors border border-white rounded-md text-white font-medium inline-flex items-center justify-center"
              >
                Meet Our Artisans
              </Link>
            </div>
          </div>
          
          {/* Feature Cards */}
          <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4 animate-slide-up">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg hover:bg-white/15 transition-colors">
              <h3 className="text-xl font-medium mb-2">Handcrafted Quality</h3>
              <p className="text-white/80">Each item is carefully made by skilled artisans using traditional techniques.</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg hover:bg-white/15 transition-colors">
              <h3 className="text-xl font-medium mb-2">Sustainable Materials</h3>
              <p className="text-white/80">Ethically sourced materials that are better for the planet and your home.</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg hover:bg-white/15 transition-colors">
              <h3 className="text-xl font-medium mb-2">Custom Orders</h3>
              <p className="text-white/80">Work directly with our artisans to create something uniquely yours.</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg hover:bg-white/15 transition-colors">
              <h3 className="text-xl font-medium mb-2">Support Artists</h3>
              <p className="text-white/80">Your purchase directly supports independent artists and their craft.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;