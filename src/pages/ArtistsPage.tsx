import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import ArtistCard from '../components/artists/ArtistCard';
import { useArtists } from '../hooks/useArtists';

const ArtistsPage: React.FC = () => {
  const { artists } = useArtists();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-semibold mb-6">Meet Our Artisans</h1>
        <p className="text-lg text-gray-700 max-w-3xl mb-10">
          Each of our artisans brings unique skills and perspectives to their craft. 
          From traditional techniques passed down through generations to innovative approaches, 
          our makers create pieces that are truly special.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {artists.map(artist => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
        
        {/* Become an Artist CTA */}
        <div className="mt-16 bg-forest-green text-white rounded-lg p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Are you an artisan?</h2>
              <p className="text-white/90 max-w-xl">
                Join our community of skilled makers and share your craft with customers who value handmade quality.
              </p>
            </div>
            <Link 
              to="/join-as-artist" 
              className="px-6 py-3 bg-white text-forest-green font-medium rounded-md hover:bg-gray-100 transition-colors whitespace-nowrap"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ArtistsPage;