import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Tag, Check, Sparkles } from 'lucide-react';

export default function CartDrawer({ 
  isOpen, 
  onClose, 
  cartItems, 
  onUpdateQuantity, 
  onRemoveItem, 
  onProceedToCheckout,
  promoCode,
  setPromoCode,
  discountPercentage,
  onApplyPromo
}) {
  const [promoInput, setPromoInput] = useState(promoCode || '');
  const [promoError, setPromoError] = useState('');
  const [promoAppliedMsg, setPromoAppliedMsg] = useState(discountPercentage > 0 ? `Promo applied (${discountPercentage}% OFF)` : '');

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountAmount = (subtotal * (discountPercentage / 100));
  const discountedSubtotal = Math.max(0, subtotal - discountAmount);
  const freeShippingThreshold = 100;
  const progressToFreeShipping = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const handlePromoSubmit = (e) => {
    e.preventDefault();
    setPromoError('');
    if (!promoInput.trim()) return;

    if (promoInput.trim().toUpperCase() === 'SHOFINDA20') {
      onApplyPromo('SHOFINDA20', 20);
      setPromoAppliedMsg('Code SHOFINDA20 applied: 20% OFF!');
    } else if (promoInput.trim().toUpperCase() === 'WELCOME10') {
      onApplyPromo('WELCOME10', 10);
      setPromoAppliedMsg('Code WELCOME10 applied: 10% OFF!');
    } else {
      setPromoError('Invalid promo code. Try SHOFINDA20 for 20% OFF.');
    }
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(8px)', display: 'flex', justifyContent: 'flex-end' }}>
      
      <div 
        className="animate-slide-right"
        style={{
          width: '100%',
          maxWidth: '460px',
          height: '100%',
          background: '#1E293B',
          borderLeft: '1px solid #334155',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-10px 0 40px rgba(0,0,0,0.6)',
          position: 'relative'
        }}
      >
        {/* Header */}
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #334155', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#0F172A' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <ShoppingBag size={20} color="#0096FA" />
            <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#FFF' }}>Your Shopping Cart</h3>
            <span style={{ background: 'rgba(0, 150, 250, 0.15)', color: '#0096FA', fontSize: '0.75rem', fontWeight: '700', padding: '0.15rem 0.5rem', borderRadius: '12px' }}>
              {cartItems.reduce((acc, i) => acc + i.quantity, 0)} Items
            </span>
          </div>

          <button
            onClick={onClose}
            style={{ background: 'transparent', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: '4px' }}
            onMouseEnter={(e) => e.target.style.color = '#FFF'}
            onMouseLeave={(e) => e.target.style.color = '#94A3B8'}
          >
            <X size={22} />
          </button>
        </div>

        {/* Free Shipping Progress Bar */}
        <div style={{ padding: '0.75rem 1.5rem', background: 'rgba(50, 0, 100, 0.4)', borderBottom: '1px solid #334155' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: '600', marginBottom: '0.4rem' }}>
            <span style={{ color: subtotal >= freeShippingThreshold ? '#10B981' : '#FA6400' }}>
              {subtotal >= freeShippingThreshold ? '🎉 Congratulations! Free Shipping Unlocked!' : `Add $${(freeShippingThreshold - subtotal).toFixed(2)} more for FREE Shipping`}
            </span>
            <span style={{ color: '#94A3B8' }}>{Math.round(progressToFreeShipping)}%</span>
          </div>
          <div style={{ width: '100%', height: '6px', background: '#0F172A', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ width: `${progressToFreeShipping}%`, height: '100%', background: 'linear-gradient(90deg, #0096FA 0%, #FA6400 100%)', transition: 'width 0.4s ease' }} />
          </div>
        </div>

        {/* Item List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem' }}>
          {cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 1rem', color: '#94A3B8' }}>
              <ShoppingBag size={48} color="#334155" style={{ marginBottom: '1rem' }} />
              <h4 style={{ fontSize: '1.1rem', color: '#FFF', marginBottom: '0.5rem' }}>Your cart is empty</h4>
              <p style={{ fontSize: '0.875rem' }}>Explore our flagship items and add them to your cart!</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {cartItems.map((item) => (
                <div 
                  key={item.id}
                  style={{
                    display: 'flex',
                    gap: '1rem',
                    background: '#0F172A',
                    padding: '0.85rem',
                    borderRadius: '14px',
                    border: '1px solid #334155'
                  }}
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    style={{ width: '70px', height: '70px', borderRadius: '10px', objectFit: 'cover' }}
                  />

                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: '#FFF', lineHeight: 1.2 }}>
                        {item.title}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        style={{ background: 'transparent', border: 'none', color: '#EF4444', cursor: 'pointer', padding: '2px' }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                      <span style={{ fontSize: '0.95rem', fontWeight: '800', color: '#0096FA' }}>
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>

                      {/* Quantity Selector */}
                      <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #334155', borderRadius: '6px', background: '#1E293B' }}>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          style={{ width: '26px', height: '26px', background: 'transparent', border: 'none', color: '#FFF', cursor: 'pointer' }}
                        >
                          -
                        </button>
                        <span style={{ padding: '0 0.5rem', fontSize: '0.85rem', fontWeight: '700', color: '#FFF' }}>{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          style={{ width: '26px', height: '26px', background: 'transparent', border: 'none', color: '#FFF', cursor: 'pointer' }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer & Checkout Call */}
        {cartItems.length > 0 && (
          <div style={{ padding: '1.25rem 1.5rem', borderTop: '1px solid #334155', background: '#0F172A' }}>
            
            {/* Promo Code Form */}
            <form onSubmit={handlePromoSubmit} style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem' }}>
              <div style={{ position: 'relative', flex: 1 }}>
                <Tag size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                <input
                  type="text"
                  placeholder="Promo code (e.g. SHOFINDA20)"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  style={{
                    width: '100%',
                    background: '#1E293B',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    padding: '0.45rem 0.6rem 0.45rem 2rem',
                    color: '#FFF',
                    fontSize: '0.8rem',
                    textTransform: 'uppercase'
                  }}
                />
              </div>
              <button type="submit" className="btn-outline" style={{ padding: '0.45rem 0.85rem', fontSize: '0.8rem' }}>
                Apply
              </button>
            </form>

            {promoAppliedMsg && (
              <div style={{ fontSize: '0.75rem', color: '#10B981', fontWeight: '700', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <Check size={14} /> {promoAppliedMsg}
              </div>
            )}
            {promoError && (
              <div style={{ fontSize: '0.75rem', color: '#EF4444', marginBottom: '0.75rem' }}>
                {promoError}
              </div>
            )}

            {/* Calculations */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.875rem', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94A3B8' }}>
                <span>Subtotal</span>
                <span style={{ color: '#FFF' }}>${subtotal.toFixed(2)}</span>
              </div>

              {discountAmount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#FA6400', fontWeight: '700' }}>
                  <span>Promo Discount ({discountPercentage}%)</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94A3B8' }}>
                <span>Shipping</span>
                <span style={{ color: subtotal >= freeShippingThreshold ? '#10B981' : '#FFF', fontWeight: '600' }}>
                  {subtotal >= freeShippingThreshold ? 'FREE' : '$0.00 (Calculated at step 2)'}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.15rem', fontWeight: '800', color: '#FFF', paddingTop: '0.6rem', borderTop: '1px solid #334155' }}>
                <span>Estimated Total</span>
                <span style={{ color: '#0096FA' }}>${discountedSubtotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={() => { onClose(); onProceedToCheckout(); }}
              className="btn-secondary"
              style={{ width: '100%', justifyContent: 'center', padding: '0.85rem', fontSize: '1rem' }}
            >
              <span>Proceed to 3-Step Checkout</span>
              <ArrowRight size={18} />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
