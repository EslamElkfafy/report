export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  artistId: number;
  featured: boolean;
  materials: string[];
  dimensions?: string;
  inStock: number;
}

export interface Artist {
  id: number;
  name: string;
  avatar: string;
  bio: string;
  location: string;
  specialties: string[];
  featured: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type CartContextType = {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getItemCount: () => number;
};

export type FilterOptions = {
  category: string | null;
  priceRange: [number, number] | null;
  artistId: number | null;
  searchQuery: string;
};