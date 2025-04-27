import React from 'react';
import { Link } from 'react-router-dom';
import { useArtists } from '../../hooks/useArtists';
import ArtistCard from '../artists/ArtistCard';
import { ArrowRight } from 'lucide-react';

const FeaturedArtists: React.FC = () => {
  const { getFeaturedArtists } = useArtists();
  const featuredArtists = getFeaturedArtists;

  return (
    <section className="py-16 bg-cream">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-semibold text-gray-900">Meet Our Artisans</h2>
          <Link 
            to="/artists" 
            className="flex items-center text-forest-green hover:text-forest-green-dark transition-colors"
          >
            View all artists <ArrowRight size={18} className="ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredArtists.slice(0, 4).map(artist => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedArtists;