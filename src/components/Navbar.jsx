import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Search, 
  User, 
  LogOut, 
  Database, 
  Clock, 
  Sparkles,
  ChevronDown
} from 'lucide-react';

export default function Navbar({ 
  cartCount, 
  onOpenCart, 
  onOpenAuthModal, 
  user, 
  onLogout,
  onOpenDbInspector,
  onOpenOrderHistory,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  categories
}) {
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  return (
    <header className="glass-header">
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0.75rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
        
        {/* Brand Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <div 
            onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
            style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer', userSelect: 'none' }}
          >
            <div style={{ 
              width: '42px', 
              height: '42px', 
              borderRadius: '12px', 
              background: 'linear-gradient(135deg, #0096FA 0%, #FA6400 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 15px rgba(0, 150, 250, 0.4)'
            }}>
              <Sparkles size={24} color="#FFF" />
            </div>
            <div>
              <span style={{ fontSize: '1.5rem', fontWeight: '800', background: 'linear-gradient(135deg, #FFFFFF 0%, #0096FA 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Shofinda
              </span>
              <span style={{ display: 'block', fontSize: '0.65rem', color: '#FA6400', fontWeight: '700', letterSpacing: '1px' }}>
                NEXT-GEN SHOPPING
              </span>
            </div>
          </div>

          {/* Category Dropdown */}
          <div style={{ position: 'relative' }} className="desktop-only">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{
                background: 'rgba(30, 41, 59, 0.8)',
                color: '#F8FAFC',
                border: '1px solid #334155',
                borderRadius: '10px',
                padding: '0.55rem 2.2rem 0.55rem 0.85rem',
                fontSize: '0.875rem',
                fontWeight: '500',
                cursor: 'pointer',
                outline: 'none',
                appearance: 'none'
              }}
            >
              {categories.map(cat => (
                <option key={cat.id} value={cat.id} style={{ background: '#0F172A', color: '#FFF' }}>
                  {cat.name}
                </option>
              ))}
            </select>
            <ChevronDown size={14} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#94A3B8' }} />
          </div>
        </div>

        {/* Search Bar */}
        <div style={{ flex: '1', maxWidth: '480px', position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
          <input
            type="text"
            placeholder="Search products, brands, tech..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              background: 'rgba(15, 23, 42, 0.6)',
              border: '1px solid #334155',
              borderRadius: '24px',
              padding: '0.6rem 1rem 0.6rem 2.6rem',
              color: '#F8FAFC',
              fontSize: '0.875rem',
              outline: 'none',
              transition: 'all 0.2s ease'
            }}
            onFocus={(e) => e.target.style.borderColor = '#0096FA'}
            onBlur={(e) => e.target.style.borderColor = '#334155'}
          />
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          
          {/* Database DDL Inspector Button */}
          <button
            onClick={onOpenDbInspector}
            title="Inspect PostgreSQL DDL & Live DB Tables"
            style={{
              background: 'rgba(50, 0, 100, 0.4)',
              border: '1px solid rgba(0, 150, 250, 0.3)',
              color: '#0096FA',
              padding: '0.55rem 0.85rem',
              borderRadius: '10px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.8rem',
              fontWeight: '600',
              transition: 'all 0.2s ease'
            }}
          >
            <Database size={16} />
            <span className="desktop-only">DB Inspector</span>
          </button>

          {/* User Auth Section */}
          {user ? (
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                style={{
                  background: 'rgba(30, 41, 59, 0.8)',
                  border: '1px solid #334155',
                  borderRadius: '24px',
                  padding: '0.35rem 0.85rem 0.35rem 0.4rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  cursor: 'pointer',
                  color: '#F8FAFC'
                }}
              >
                <img 
                  src={user.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80'} 
                  alt={user.full_name} 
                  style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover', border: '1px solid #0096FA' }} 
                />
                <span style={{ fontSize: '0.85rem', fontWeight: '600' }} className="desktop-only">{user.full_name.split(' ')[0]}</span>
                <ChevronDown size={14} color="#94A3B8" />
              </button>

              {/* User Dropdown */}
              {showUserDropdown && (
                <div 
                  className="animate-fade-in"
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: '120%',
                    width: '220px',
                    background: '#1E293B',
                    border: '1px solid #334155',
                    borderRadius: '14px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                    padding: '0.5rem',
                    zIndex: 200
                  }}
                >
                  <div style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid #334155', marginBottom: '0.4rem' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#FFF' }}>{user.full_name}</div>
                    <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>{user.email}</div>
                    <div style={{ display: 'inline-block', background: 'rgba(0, 150, 250, 0.15)', color: '#0096FA', fontSize: '0.65rem', fontWeight: '700', padding: '0.1rem 0.4rem', borderRadius: '4px', marginTop: '0.3rem' }}>
                      Google SSO Verified
                    </div>
                  </div>

                  <button
                    onClick={() => { setShowUserDropdown(false); onOpenOrderHistory(); }}
                    style={{ width: '100%', textAlign: 'left', background: 'transparent', border: 'none', color: '#E2E8F0', padding: '0.5rem 0.75rem', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.85rem' }}
                    onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.05)'}
                    onMouseLeave={(e) => e.target.style.background = 'transparent'}
                  >
                    <Clock size={16} color="#0096FA" /> My Order History
                  </button>

                  <button
                    onClick={() => { setShowUserDropdown(false); onLogout(); }}
                    style={{ width: '100%', textAlign: 'left', background: 'transparent', border: 'none', color: '#EF4444', padding: '0.5rem 0.75rem', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.85rem', marginTop: '0.2rem' }}
                    onMouseEnter={(e) => e.target.style.background = 'rgba(239, 68, 68, 0.1)'}
                    onMouseLeave={(e) => e.target.style.background = 'transparent'}
                  >
                    <LogOut size={16} /> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenAuthModal}
              className="btn-outline"
              style={{ padding: '0.5rem 0.9rem', fontSize: '0.85rem' }}
            >
              <User size={16} />
              <span>Google Sign-In</span>
            </button>
          )}

          {/* Cart Trigger */}
          <button
            onClick={onOpenCart}
            className="btn-primary"
            style={{ position: 'relative', padding: '0.55rem 0.95rem' }}
          >
            <ShoppingBag size={18} />
            <span className="desktop-only">Cart</span>
            {cartCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-6px',
                right: '-6px',
                background: '#FA6400',
                color: '#FFF',
                fontSize: '0.75rem',
                fontWeight: '800',
                width: '22px',
                height: '22px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(250, 100, 0, 0.6)',
                border: '2px solid #0F172A'
              }}>
                {cartCount}
              </span>
            )}
          </button>
        </div>

      </div>
    </header>
  );
}
