import React, { useState } from 'react';
import { X, Star, ShoppingCart, Shield, Truck, Check } from 'lucide-react';

export default function ProductQuickViewModal({ product, onClose, onAddToCart }) {
  const [selectedImg, setSelectedImg] = useState(product?.imageUrl);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const images = product.secondaryImages?.length ? [product.imageUrl, ...product.secondaryImages] : [product.imageUrl];

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 1000,
      background: 'rgba(15, 23, 42, 0.85)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem'
    }}>
      <div 
        className="animate-fade-in"
        style={{
          background: '#1E293B',
          border: '1px solid #334155',
          borderRadius: '20px',
          maxWidth: '900px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.6)',
          position: 'relative',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            zIndex: 10,
            background: 'rgba(15, 23, 42, 0.7)',
            border: '1px solid #334155',
            color: '#94A3B8',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => e.target.style.color = '#FFF'}
          onMouseLeave={(e) => e.target.style.color = '#94A3B8'}
        >
          <X size={20} />
        </button>

        {/* Left Gallery Section */}
        <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', background: '#0F172A', borderTopLeftRadius: '20px', borderBottomLeftRadius: '20px' }}>
          <div style={{ width: '100%', height: '320px', borderRadius: '14px', overflow: 'hidden', background: '#0B1120', position: 'relative' }}>
            <img
              src={selectedImg || product.imageUrl}
              alt={product.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          {/* Secondary Thumbnails */}
          {images.length > 1 && (
            <div style={{ display: 'flex', gap: '0.75rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImg(img)}
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    border: (selectedImg || product.imageUrl) === img ? '2px solid #0096FA' : '1px solid #334155',
                    cursor: 'pointer',
                    padding: 0,
                    background: 'transparent'
                  }}
                >
                  <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Info Section */}
        <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <span className={`badge-${product.badgeType || 'orange'}`}>{product.badgeText || 'FEATURED'}</span>
              <span style={{ fontSize: '0.8rem', color: '#94A3B8', fontWeight: '600' }}>SKU: {product.id}</span>
            </div>

            <h2 style={{ fontSize: '1.6rem', fontWeight: '800', color: '#FFF', marginBottom: '0.5rem', lineHeight: 1.2 }}>
              {product.title}
            </h2>

            {/* Ratings & Stock */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem', fontSize: '0.875rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#F59E0B' }}>
                <Star size={16} fill="#F59E0B" />
                <strong style={{ color: '#FFF' }}>{product.rating}</strong>
                <span style={{ color: '#94A3B8' }}>({product.reviewsCount} reviews)</span>
              </div>
              <span style={{ color: '#334155' }}>|</span>
              <span style={{ color: product.stockQuantity > 5 ? '#10B981' : '#EF4444', fontWeight: '700' }}>
                {product.stockQuantity > 0 ? `In Stock (${product.stockQuantity} units)` : 'Out of Stock'}
              </span>
            </div>

            {/* Price Box */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <span style={{ fontSize: '2rem', fontWeight: '800', color: '#0096FA' }}>
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span style={{ fontSize: '1.1rem', color: '#64748B', textDecoration: 'line-through' }}>
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            <p style={{ color: '#94A3B8', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              {product.description}
            </p>

            {/* Specs Specs Table */}
            {product.specs && (
              <div style={{ background: '#0F172A', borderRadius: '12px', padding: '1rem', marginBottom: '1.5rem', border: '1px solid #334155' }}>
                <h4 style={{ fontSize: '0.85rem', color: '#0096FA', fontWeight: '700', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
                  Key Specifications
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem', fontSize: '0.8rem' }}>
                  {product.specs.map((spec, i) => (
                    <div key={i} style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ color: '#64748B', fontWeight: '600' }}>{spec.label}</span>
                      <span style={{ color: '#E2E8F0', fontWeight: '500' }}>{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Row */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #334155', borderRadius: '10px', background: '#0F172A' }}>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{ width: '36px', height: '36px', background: 'transparent', border: 'none', color: '#FFF', fontSize: '1.2rem', cursor: 'pointer' }}
                >
                  -
                </button>
                <span style={{ padding: '0 0.8rem', fontWeight: '700', color: '#FFF' }}>{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stockQuantity, quantity + 1))}
                  style={{ width: '36px', height: '36px', background: 'transparent', border: 'none', color: '#FFF', fontSize: '1.2rem', cursor: 'pointer' }}
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className={added ? 'btn-secondary' : 'btn-primary'}
                style={{ flex: 1, padding: '0.75rem', justifyContent: 'center', fontSize: '0.95rem' }}
              >
                {added ? (
                  <>
                    <Check size={18} /> Added to Cart ({quantity})
                  </>
                ) : (
                  <>
                    <ShoppingCart size={18} /> Add {quantity} to Cart — ${(product.price * quantity).toFixed(2)}
                  </>
                )}
              </button>
            </div>

            <div style={{ display: 'flex', gap: '1rem', fontSize: '0.75rem', color: '#94A3B8' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <Truck size={14} color="#0096FA" /> Standard Express 2-Day Delivery
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <Shield size={14} color="#FA6400" /> 30-Day Money Back Guarantee
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
