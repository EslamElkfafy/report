import { useMemo } from 'react';
import { artists } from '../data/artists';
import { products } from '../data/products';

export const useArtists = () => {
  const getFeaturedArtists = useMemo(() => {
    return artists.filter(artist => artist.featured);
  }, []);

  const getArtistById = (id: number) => {
    return artists.find(artist => artist.id === id);
  };

  const getArtistProducts = (artistId: number) => {
    return products.filter(product => product.artistId === artistId);
  };

  return {
    artists,
    getFeaturedArtists,
    getArtistById,
    getArtistProducts
  };
};