import React, { useState } from 'react';
import { Star, Eye, ShoppingCart, Check } from 'lucide-react';

export default function ProductCard({ product, onQuickView, onAddToCart }) {
  const [added, setAdded] = useState(false);

  const handleAdd = (e) => {
    e.stopPropagation();
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div 
      className="card-glass"
      onClick={() => onQuickView(product)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        cursor: 'pointer',
        position: 'relative'
      }}
    >
      {/* Product Image Container */}
      <div style={{ position: 'relative', width: '100%', paddingTop: '75%', overflow: 'hidden', background: '#0B1120' }}>
        <img
          src={product.imageUrl}
          alt={product.title}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease'
          }}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.08)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        />

        {/* Badge Tag */}
        {product.badgeText && (
          <div style={{ position: 'absolute', top: '12px', left: '12px', zIndex: 2 }}>
            <span className={`badge-${product.badgeType || 'orange'}`}>
              {product.badgeText}
            </span>
          </div>
        )}

        {/* Quick View Hover Button */}
        <button
          onClick={(e) => { e.stopPropagation(); onQuickView(product); }}
          title="Quick View Details"
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: '#FFF',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 2,
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => e.target.style.background = '#0096FA'}
          onMouseLeave={(e) => e.target.style.background = 'rgba(15, 23, 42, 0.75)'}
        >
          <Eye size={16} />
        </button>
      </div>

      {/* Product Body */}
      <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
            <span style={{ fontSize: '0.75rem', color: '#94A3B8', fontWeight: '600', textTransform: 'uppercase' }}>
              {product.categoryName}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', fontSize: '0.8rem', color: '#F59E0B' }}>
              <Star size={13} fill="#F59E0B" />
              <span style={{ fontWeight: '700', color: '#F8FAFC' }}>{product.rating}</span>
              <span style={{ color: '#64748B' }}>({product.reviewsCount})</span>
            </div>
          </div>

          <h3 style={{ fontSize: '1rem', fontWeight: '700', color: '#FFFFFF', marginBottom: '0.75rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', minHeight: '2.5rem' }}>
            {product.title}
          </h3>
        </div>

        {/* Footer Price & Add Button */}
        <div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '1rem' }}>
            <span style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0096FA' }}>
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span style={{ fontSize: '0.85rem', color: '#64748B', textDecoration: 'line-through' }}>
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <button
            onClick={handleAdd}
            className={added ? 'btn-secondary' : 'btn-primary'}
            style={{ width: '100%', justifyContent: 'center', padding: '0.65rem' }}
          >
            {added ? (
              <>
                <Check size={16} /> Added to Cart!
              </>
            ) : (
              <>
                <ShoppingCart size={16} /> Add to Cart
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
