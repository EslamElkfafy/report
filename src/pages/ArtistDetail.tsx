import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useArtists } from '../hooks/useArtists';
import Layout from '../components/layout/Layout';
import ProductCard from '../components/products/ProductCard';
import { ArrowLeft, MapPin, Mail } from 'lucide-react';

const ArtistDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getArtistById, getArtistProducts } = useArtists();
  
  const artist = getArtistById(Number(id));
  
  if (!artist) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-semibold mb-4">Artist Not Found</h1>
          <p className="mb-8">The artist you're looking for doesn't exist or has been removed.</p>
          <Link 
            to="/artists" 
            className="inline-flex items-center text-forest-green hover:text-forest-green-dark"
          >
            <ArrowLeft size={18} className="mr-2" />
            Back to Artists
          </Link>
        </div>
      </Layout>
    );
  }

  const artistProducts = getArtistProducts(artist.id);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-10">
        {/* Breadcrumb Navigation */}
        <div className="text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-forest-green">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/artists" className="hover:text-forest-green">Artists</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700">{artist.name}</span>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-10 mb-16">
          {/* Artist Image and Details */}
          <div className="w-full lg:w-1/3">
            <div className="bg-gray-100 rounded-lg overflow-hidden mb-6">
              <img 
                src={artist.avatar} 
                alt={artist.name} 
                className="w-full h-auto object-cover aspect-square"
              />
            </div>
            
            <div className="bg-white shadow-md rounded-lg p-6">
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">{artist.name}</h1>
              
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin size={16} className="mr-2" />
                {artist.location}
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Specialties</h3>
                <div className="flex flex-wrap gap-2">
                  {artist.specialties.map((specialty, index) => (
                    <span key={index} className="px-3 py-1 bg-cream text-gray-800 rounded-full text-sm capitalize">
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <a 
                  href={`/custom-orders?artist=${artist.id}`} 
                  className="block w-full py-3 bg-forest-green text-white text-center rounded-md font-medium hover:bg-forest-green-dark transition-colors mb-3"
                >
                  Request Custom Work
                </a>
                
                <a 
                  href="#" 
                  className="block w-full py-3 bg-white border border-gray-300 text-gray-700 text-center rounded-md font-medium hover:bg-gray-50 transition-colors flex items-center justify-center"
                >
                  <Mail size={16} className="mr-2" />
                  Contact Artist
                </a>
              </div>
            </div>
          </div>
          
          {/* Artist Bio and Products */}
          <div className="w-full lg:w-2/3">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">About {artist.name}</h2>
              <div className="prose max-w-none">
                {artist.bio.split('.').map((sentence, index) => (
                  <p key={index} className="mb-4 text-gray-700">
                    {sentence.trim()}{index < artist.bio.split('.').length - 2 ? '.' : ''}
                  </p>
                ))}
              </div>
            </div>
            
            {/* Artist's Products */}
            {artistProducts.length > 0 ? (
              <div>
                <h2 className="text-2xl font-semibold mb-6">Products by {artist.name}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {artistProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <p className="text-gray-600">No products currently available from this artist.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ArtistDetail;