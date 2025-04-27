import React from 'react';
import { Link } from 'react-router-dom';
import { Artist } from '../../types';

interface ArtistCardProps {
  artist: Artist;
}

const ArtistCard: React.FC<ArtistCardProps> = ({ artist }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 group">
      <Link to={`/artist/${artist.id}`} className="block">
        {/* Artist Image */}
        <div className="aspect-square overflow-hidden">
          <img 
            src={artist.avatar} 
            alt={artist.name} 
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        
        {/* Artist Info */}
        <div className="p-5">
          <h3 className="font-medium text-xl mb-1 text-gray-900 group-hover:text-forest-green transition-colors">
            {artist.name}
          </h3>
          
          <p className="text-gray-600 text-sm mb-3">
            {artist.location}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-3">
            {artist.specialties.map((specialty, index) => (
              <span 
                key={index} 
                className="inline-block px-2.5 py-1 text-xs rounded-full bg-cream text-gray-800 capitalize"
              >
                {specialty}
              </span>
            ))}
          </div>
          
          <p className="text-gray-700 line-clamp-2 text-sm">
            {artist.bio.split('.')[0]}...
          </p>
        </div>
      </Link>
    </div>
  );
};

export default ArtistCard;