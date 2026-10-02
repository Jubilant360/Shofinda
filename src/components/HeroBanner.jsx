import React from 'react';
import { ArrowRight, ShieldCheck, Truck, Zap, Star } from 'lucide-react';

export default function HeroBanner({ onQuickViewFeatured }) {
  return (
    <div style={{ maxWidth: '1280px', margin: '1.5rem auto 2.5rem', padding: '0 1.5rem' }}>
      <div 
        style={{
          background: 'linear-gradient(135deg, rgba(50, 0, 100, 0.95) 0%, rgba(15, 23, 42, 0.95) 60%, rgba(0, 150, 250, 0.4) 100%)',
          borderRadius: '24px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5), 0 0 30px rgba(0, 150, 250, 0.2)',
          overflow: 'hidden',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          alignItems: 'center',
          minHeight: '380px'
        }}
      >
        {/* Left Content Area */}
        <div style={{ padding: '2.5rem 3rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(250, 100, 0, 0.15)', border: '1px solid rgba(250, 100, 0, 0.4)', borderRadius: '20px', padding: '0.35rem 0.85rem', marginBottom: '1.25rem' }}>
            <Zap size={14} color="#FA6400" />
            <span style={{ color: '#FA6400', fontSize: '0.75rem', fontWeight: '800', letterSpacing: '0.5px' }}>
              SPECIAL PROMO CODE: <strong style={{ color: '#FFF' }}>SHOFINDA20</strong> (20% OFF)
            </span>
          </div>

          <h1 style={{ fontSize: '2.75rem', fontWeight: '800', lineHeight: 1.1, marginBottom: '1rem', color: '#FFFFFF' }}>
            Elevate Your Setup with <span style={{ background: 'linear-gradient(135deg, #0096FA 0%, #FA6400 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Next-Gen Tech</span>
          </h1>

          <p style={{ color: '#94A3B8', fontSize: '1rem', marginBottom: '1.75rem', maxWidth: '480px', lineHeight: 1.6 }}>
            Discover flagship smart electronics, studio acoustics, and luxury gear with instant 3-step checkout and automated transactional receipts.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button 
              onClick={() => onQuickViewFeatured()}
              className="btn-primary" 
              style={{ padding: '0.8rem 1.6rem', fontSize: '0.95rem' }}
            >
              <span>Explore Flagship Studio Headphones</span>
              <ArrowRight size={18} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#F8FAFC', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', color: '#F59E0B' }}>
                {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="#F59E0B" />)}
              </div>
              <span style={{ fontWeight: '700' }}>4.9/5</span>
              <span style={{ color: '#94A3B8' }}>(2,400+ Verified Reviews)</span>
            </div>
          </div>

          {/* Value Badges */}
          <div style={{ display: 'flex', gap: '1.5rem', marginTop: '2.25rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)', color: '#94A3B8', fontSize: '0.8rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Truck size={16} color="#0096FA" /> Free Express Shipping over $50
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <ShieldCheck size={16} color="#FA6400" /> Google OAuth 2.0 SSO Verified
            </div>
          </div>
        </div>

        {/* Right Product Banner Image */}
        <div style={{ position: 'relative', height: '100%', minHeight: '320px', overflow: 'hidden' }}>
          <img
            src="/images/hero.jpg"
            alt="Shofinda Flagship Tech Collection"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center'
            }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(15, 23, 42, 0.9) 0%, transparent 40%)' }} />
        </div>

      </div>
    </div>
  );
}
