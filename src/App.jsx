import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import HeroBanner from './components/HeroBanner.jsx';
import ProductCard from './components/ProductCard.jsx';
import ProductQuickViewModal from './components/ProductQuickViewModal.jsx';
import CartDrawer from './components/CartDrawer.jsx';
import CheckoutModal from './components/CheckoutModal.jsx';
import OrderConfirmationModal from './components/OrderConfirmationModal.jsx';
import GoogleAuthModal from './components/GoogleAuthModal.jsx';
import DatabaseSchemaInspector from './components/DatabaseSchemaInspector.jsx';
import MailgunPreviewModal from './components/MailgunPreviewModal.jsx';
import OrderHistoryModal from './components/OrderHistoryModal.jsx';

import { PRODUCTS, CATEGORIES } from './data/products.js';
import { authService } from './services/authService.js';
import { dbService } from './services/supabaseClient.js';
import { Sparkles, SlidersHorizontal, ShieldCheck, Mail, Database, Zap } from 'lucide-react';

export default function App() {
  // App State
  const [products] = useState(PRODUCTS);
  const [categories] = useState(CATEGORIES);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured'); // featured, price_low, price_high, rating

  // Cart & Promo State
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('shofinda_cart');
      return saved ? JSON.parse(saved) : [
        { ...PRODUCTS[0], quantity: 1 } // Pre-load 1 item for immediate preview
      ];
    } catch {
      return [{ ...PRODUCTS[0], quantity: 1 }];
    }
  });

  const [promoCode, setPromoCode] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState(0);

  // User Auth State
  const [user, setUser] = useState(() => authService.getCurrentUser());

  // Modal Control States
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isDbInspectorOpen, setIsDbInspectorOpen] = useState(false);
  const [mailgunOrder, setMailgunOrder] = useState(null);
  const [isOrderHistoryOpen, setIsOrderHistoryOpen] = useState(false);

  // Sync Cart to LocalStorage
  useEffect(() => {
    localStorage.setItem('shofinda_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Cart Handler Actions
  const handleAddToCart = (product, qty = 1) => {
    setCartItems(prev => {
      const existingIndex = prev.findIndex(item => item.id === product.id);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex].quantity += qty;
        return updated;
      } else {
        return [...prev, { ...product, quantity: qty }];
      }
    });
  };

  const handleUpdateQuantity = (productId, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(productId);
    } else {
      setCartItems(prev => prev.map(item => item.id === productId ? { ...item, quantity: newQty } : item));
    }
  };

  const handleRemoveItem = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const handleApplyPromo = (code, pct) => {
    setPromoCode(code);
    setDiscountPercentage(pct);
  };

  // Login & Logout
  const handleSelectUser = (selectedUser) => {
    const loggedIn = authService.loginWithGoogle(selectedUser);
    setUser(loggedIn);
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
  };

  // Complete Checkout Order
  const handleCompleteOrder = async (orderPayload) => {
    const created = await dbService.createOrder({
      ...orderPayload,
      userId: user ? user.id : 'usr-guest'
    });

    setIsCheckoutOpen(false);
    setCartItems([]);
    setCompletedOrder(created);
  };

  // Filter & Sort Logic
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.categoryId === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.categoryName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'price_low') return a.price - b.price;
    if (sortBy === 'price_high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
  });

  const cartTotalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--neutral-dark)', display: 'flex', flexDirection: 'column' }}>
      
      {/* Top Navbar */}
      <Navbar
        cartCount={cartTotalCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        user={user}
        onLogout={handleLogout}
        onOpenDbInspector={() => setIsDbInspectorOpen(true)}
        onOpenOrderHistory={() => setIsOrderHistoryOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
      />

      {/* Hero Showcase Banner */}
      <HeroBanner onQuickViewFeatured={() => setQuickViewProduct(PRODUCTS[0])} />

      {/* Main Storefront Area */}
      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem 4rem', flex: 1, width: '100%' }}>
        
        {/* Category Filter Pills & Sort Selector */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid #334155', paddingBottom: '1.25rem' }}>
          
          {/* Category Pills */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', overflowX: 'auto', paddingBottom: '0.4rem' }}>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  background: selectedCategory === cat.id ? 'linear-gradient(135deg, #0096FA 0%, #0072ce 100%)' : '#1E293B',
                  color: selectedCategory === cat.id ? '#FFF' : '#94A3B8',
                  border: selectedCategory === cat.id ? 'none' : '1px solid #334155',
                  padding: '0.5rem 1.1rem',
                  borderRadius: '20px',
                  fontSize: '0.85rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  boxShadow: selectedCategory === cat.id ? '0 4px 14px rgba(0, 150, 250, 0.4)' : 'none',
                  transition: 'all 0.2s ease'
                }}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Sort Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <SlidersHorizontal size={16} color="#94A3B8" />
            <span style={{ fontSize: '0.85rem', color: '#94A3B8', fontWeight: '600' }}>Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                background: '#1E293B',
                color: '#FFF',
                border: '1px solid #334155',
                borderRadius: '8px',
                padding: '0.4rem 0.8rem',
                fontSize: '0.85rem',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="featured">Featured First</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

        </div>

        {/* Product Catalog Grid */}
        {filteredProducts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 1rem', background: '#1E293B', borderRadius: '20px', border: '1px solid #334155' }}>
            <h3 style={{ fontSize: '1.25rem', color: '#FFF', marginBottom: '0.5rem' }}>No products match your search</h3>
            <p style={{ color: '#94A3B8', fontSize: '0.9rem', marginBottom: '1.25rem' }}>Try searching for "Headphones", "Watch", or clear your filter.</p>
            <button
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
              className="btn-primary"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.75rem' }}>
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={setQuickViewProduct}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}

      </main>

      {/* Footer */}
      <footer style={{ background: '#0B1120', borderTop: '1px solid #334155', padding: '3rem 1.5rem', color: '#94A3B8', fontSize: '0.875rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
          
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'linear-gradient(135deg, #0096FA 0%, #FA6400 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Sparkles size={18} color="#FFF" />
              </div>
              <span style={{ fontSize: '1.25rem', fontWeight: '800', color: '#FFF' }}>Shofinda</span>
            </div>
            <p style={{ color: '#64748B', lineHeight: 1.6 }}>
              High-performance e-commerce platform built with Vite, React, Supabase PostgreSQL, Google OAuth 2.0, and Mailgun API.
            </p>
          </div>

          <div>
            <h4 style={{ color: '#FFF', fontWeight: '700', marginBottom: '1rem' }}>Architecture Integrations</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.8rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#0096FA' }}>
                <Database size={16} /> Supabase PostgreSQL DB with Row Level Security
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#FA6400' }}>
                <ShieldCheck size={16} /> Google Cloud Console OAuth 2.0 Single Sign-On
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#c084fc' }}>
                <Mail size={16} /> Mailgun Transactional Order Confirmation Pipeline
              </div>
            </div>
          </div>

          <div>
            <h4 style={{ color: '#FFF', fontWeight: '700', marginBottom: '1rem' }}>Brand Specifications</h4>
            <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
              <span style={{ background: '#0096FA', color: '#FFF', padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '700' }}>#0096FA Electric Blue</span>
              <span style={{ background: '#FA6400', color: '#FFF', padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '700' }}>#FA6400 Energy Orange</span>
              <span style={{ background: '#320064', color: '#FFF', padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '700' }}>#320064 Imperial Purple</span>
            </div>
          </div>

        </div>

        <div style={{ maxWidth: '1280px', margin: '2rem auto 0', paddingTop: '1.5rem', borderTop: '1px solid #1E293B', textAlign: 'center', color: '#64748B', fontSize: '0.8rem' }}>
          © 2026 Shofinda Platform. Designed & Engineered for Enterprise E-Commerce Excellence.
        </div>
      </footer>

      {/* Modals & Overlay Drawers */}
      {quickViewProduct && (
        <ProductQuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
        promoCode={promoCode}
        setPromoCode={setPromoCode}
        discountPercentage={discountPercentage}
        onApplyPromo={handleApplyPromo}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        user={user}
        discountPercentage={discountPercentage}
        onCompleteOrder={handleCompleteOrder}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
      />

      <OrderConfirmationModal
        order={completedOrder}
        onClose={() => setCompletedOrder(null)}
        onOpenMailgunPreview={(ord) => setMailgunOrder(ord)}
      />

      <GoogleAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSelectUser={handleSelectUser}
      />

      <DatabaseSchemaInspector
        isOpen={isDbInspectorOpen}
        onClose={() => setIsDbInspectorOpen(false)}
      />

      <MailgunPreviewModal
        isOpen={!!mailgunOrder}
        onClose={() => setMailgunOrder(null)}
        order={mailgunOrder}
      />

      <OrderHistoryModal
        isOpen={isOrderHistoryOpen}
        onClose={() => setIsOrderHistoryOpen(false)}
        onOpenMailgunPreview={(ord) => setMailgunOrder(ord)}
      />

    </div>
  );
}
