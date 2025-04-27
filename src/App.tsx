import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';

// Import pages
import Home from './pages/Home';
import ProductsPage from './pages/ProductsPage';
import ProductDetail from './pages/ProductDetail';
import ArtistsPage from './pages/ArtistsPage';
import ArtistDetail from './pages/ArtistDetail';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import CustomOrderPage from './pages/CustomOrderPage';

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/artists" element={<ArtistsPage />} />
          <Route path="/artist/:id" element={<ArtistDetail />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/custom-orders" element={<CustomOrderPage />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;