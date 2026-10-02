import React from 'react';
import { X, Check } from 'lucide-react';

export default function GoogleAuthModal({ isOpen, onClose, onSelectUser }) {
  if (!isOpen) return null;

  const demoAccounts = [
    {
      id: 'usr-google-101',
      email: 'alex.vance@gmail.com',
      full_name: 'Alex Vance',
      avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80',
      google_id: 'g-109823471092834',
      badge: 'PRO MEMBER'
    },
    {
      id: 'usr-google-102',
      email: 'sophia.reed@gmail.com',
      full_name: 'Sophia Reed',
      avatar_url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&q=80',
      google_id: 'g-9988112233',
      badge: 'VERIFIED'
    },
    {
      id: 'usr-google-103',
      email: 'marcus.chen@gmail.com',
      full_name: 'Marcus Chen',
      avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80',
      google_id: 'g-5566778899',
      badge: 'VIP TECH'
    }
  ];

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1300, background: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
      
      <div 
        className="animate-fade-in"
        style={{
          background: '#1E293B',
          border: '1px solid #334155',
          borderRadius: '24px',
          maxWidth: '440px',
          width: '100%',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7)',
          padding: '2rem',
          position: 'relative',
          textAlign: 'center'
        }}
      >
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: '16px', right: '16px', background: 'transparent', border: 'none', color: '#94A3B8', cursor: 'pointer' }}
        >
          <X size={20} />
        </button>

        {/* Google Cloud Logo Header */}
        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '56px', height: '56px', borderRadius: '50%', background: '#FFF', boxShadow: '0 4px 15px rgba(0,0,0,0.3)', marginBottom: '1rem' }}>
          <svg width="28" height="28" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
            <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.15C3.26 21.3 7.31 24 12 24z"/>
            <path fill="#FBBC05" d="M5.28 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.61H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.39l3.99-3.15z"/>
            <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.61l3.99 3.15c.95-2.85 3.6-4.96 6.72-4.96z"/>
          </svg>
        </div>

        <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#FFF', marginBottom: '0.4rem' }}>
          Sign in with Google
        </h3>
        <p style={{ fontSize: '0.85rem', color: '#94A3B8', marginBottom: '1.5rem' }}>
          Configured via GCP OAuth 2.0 Client ID for instant profile sync & checkout autofill.
        </p>

        {/* Demo Accounts List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
          {demoAccounts.map((acc) => (
            <div
              key={acc.id}
              onClick={() => { onSelectUser(acc); onClose(); }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.75rem 1rem',
                borderRadius: '14px',
                background: '#0F172A',
                border: '1px solid #334155',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = '#0096FA'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = '#334155'}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <img src={acc.avatar_url} alt="" style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover' }} />
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '0.875rem', fontWeight: '700', color: '#FFF' }}>{acc.full_name}</div>
                  <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>{acc.email}</div>
                </div>
              </div>

              <span style={{ fontSize: '0.65rem', fontWeight: '800', background: 'rgba(0, 150, 250, 0.15)', color: '#0096FA', padding: '0.15rem 0.5rem', borderRadius: '10px' }}>
                {acc.badge}
              </span>
            </div>
          ))}
        </div>

        <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
          Authorized Redirect URI: <code>https://shofinda.supabase.co/auth/v1/callback</code>
        </div>
      </div>
    </div>
  );
}
