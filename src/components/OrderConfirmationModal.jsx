import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, Mail, Truck, Package, Clock, ShieldCheck, ExternalLink } from 'lucide-react';

export default function OrderConfirmationModal({ 
  order, 
  onClose, 
  onOpenMailgunPreview 
}) {
  useEffect(() => {
    // Trigger celebration confetti on view
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      console.log('Confetti effect executed:', e);
    }
  }, []);

  if (!order) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1200, background: 'rgba(15, 23, 42, 0.92)', backdropFilter: 'blur(12px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
      
      <div 
        className="animate-fade-in"
        style={{
          background: '#1E293B',
          border: '1px solid #334155',
          borderRadius: '24px',
          maxWidth: '750px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7)',
          padding: '2.5rem',
          textAlign: 'center'
        }}
      >
        {/* Success Icon */}
        <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.15)', border: '2px solid #10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
          <CheckCircle2 size={42} color="#10B981" />
        </div>

        <h2 style={{ fontSize: '2rem', fontWeight: '800', color: '#FFF', marginBottom: '0.4rem' }}>
          Order Successfully Placed!
        </h2>
        <p style={{ color: '#94A3B8', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
          Thank you, <strong>{order.shipping_name}</strong>. Your payment was verified and your order is being prepared.
        </p>

        {/* Order ID Pill */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', background: '#0F172A', border: '1px solid #334155', borderRadius: '30px', padding: '0.5rem 1.25rem', marginBottom: '2rem' }}>
          <span style={{ color: '#94A3B8', fontSize: '0.85rem' }}>ORDER NUMBER:</span>
          <span style={{ color: '#FA6400', fontWeight: '800', fontSize: '1rem', letterSpacing: '0.5px' }}>#{order.order_number}</span>
        </div>

        {/* Live Delivery Status Timeline */}
        <div style={{ background: '#0F172A', border: '1px solid #334155', borderRadius: '16px', padding: '1.5rem', marginBottom: '2rem', textAlign: 'left' }}>
          <h4 style={{ fontSize: '0.85rem', color: '#0096FA', fontWeight: '700', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
            Live Fulfillment Timeline
          </h4>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', position: 'relative' }}>
            {[
              { step: 'Order Placed', status: 'completed', icon: CheckCircle2, date: 'Just now' },
              { step: 'Payment Verified', status: 'completed', icon: ShieldCheck, date: 'Confirmed' },
              { step: 'Fulfillment', status: 'active', icon: Package, date: 'In progress' },
              { step: 'Out for Delivery', status: 'pending', icon: Truck, date: 'Estimated 2 days' }
            ].map((st, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', opacity: st.status === 'pending' ? 0.4 : 1 }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: st.status === 'completed' ? '#10B981' : (st.status === 'active' ? '#0096FA' : '#1E293B'),
                  color: '#FFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '0.5rem',
                  border: st.status === 'active' ? '2px solid #0096FA' : 'none'
                }}>
                  <st.icon size={18} />
                </div>
                <span style={{ fontSize: '0.75rem', fontWeight: '700', color: st.status === 'active' ? '#0096FA' : '#FFF' }}>{st.step}</span>
                <span style={{ fontSize: '0.65rem', color: '#94A3B8' }}>{st.date}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Mailgun Trigger Banner */}
        <div style={{ background: 'rgba(50, 0, 100, 0.4)', border: '1px solid rgba(0, 150, 250, 0.4)', borderRadius: '16px', padding: '1.25rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', textAlign: 'left' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#0096FA', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Mail size={20} color="#FFF" />
            </div>
            <div>
              <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#FFF' }}>Mailgun Transactional Email Triggered</div>
              <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Receipt dispatched to: <strong>{order.shipping_email}</strong></div>
            </div>
          </div>

          <button
            onClick={() => onOpenMailgunPreview(order)}
            className="btn-primary"
            style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}
          >
            <span>View Mailgun HTML Payload</span>
            <ExternalLink size={14} />
          </button>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          <button
            onClick={onClose}
            className="btn-secondary"
            style={{ padding: '0.75rem 2rem', fontSize: '0.95rem' }}
          >
            Continue Shopping
          </button>
        </div>

      </div>
    </div>
  );
}
