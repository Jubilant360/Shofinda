import React from 'react';
import { X, Clock, Package, Mail, ExternalLink, ChevronRight } from 'lucide-react';
import { dbService } from '../services/supabaseClient.js';

export default function OrderHistoryModal({ isOpen, onClose, onOpenMailgunPreview }) {
  if (!isOpen) return null;

  const orders = dbService.getOrders();

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1350, background: 'rgba(15, 23, 42, 0.88)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
      
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
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8)',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Header */}
        <div style={{ padding: '1.25rem 1.75rem', borderBottom: '1px solid #334155', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#0F172A' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Clock size={22} color="#0096FA" />
            <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#FFF' }}>
              My Order History
            </h3>
          </div>

          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#94A3B8', cursor: 'pointer' }}>
            <X size={22} />
          </button>
        </div>

        {/* Orders List */}
        <div style={{ padding: '1.5rem', flex: 1, overflowY: 'auto' }}>
          {orders.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#94A3B8' }}>
              <Package size={48} color="#334155" style={{ marginBottom: '1rem' }} />
              <h4 style={{ color: '#FFF', fontSize: '1.1rem', marginBottom: '0.4rem' }}>No orders placed yet</h4>
              <p style={{ fontSize: '0.85rem' }}>Place an order using our 3-step checkout to view history here.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {orders.map((ord) => (
                <div
                  key={ord.id}
                  style={{
                    background: '#0F172A',
                    border: '1px solid #334155',
                    borderRadius: '16px',
                    padding: '1.25rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #334155', paddingBottom: '0.75rem' }}>
                    <div>
                      <div style={{ fontSize: '1rem', fontWeight: '800', color: '#FA6400' }}>#{ord.order_number}</div>
                      <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>{new Date(ord.created_at).toLocaleString()}</div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <span style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10B981', fontSize: '0.75rem', fontWeight: '800', padding: '0.2rem 0.6rem', borderRadius: '12px' }}>
                        {ord.status.toUpperCase()}
                      </span>
                      <span style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0096FA' }}>
                        ${ord.total_amount.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Items summary */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {ord.items.map((item, i) => (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                        <span style={{ color: '#E2E8F0' }}>{item.title} x {item.quantity}</span>
                        <span style={{ color: '#94A3B8' }}>${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  {/* Footer trigger for email preview */}
                  <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '0.5rem', borderTop: '1px dashed #334155' }}>
                    <button
                      onClick={() => onOpenMailgunPreview(ord)}
                      className="btn-outline"
                      style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}
                    >
                      <Mail size={14} color="#FA6400" /> View Mailgun Receipt
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
