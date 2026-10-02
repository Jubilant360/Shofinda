import React, { useState } from 'react';
import { X, Mail, Code, ExternalLink, Check } from 'lucide-react';
import { mailgunService } from '../services/mailgunService.js';

export default function MailgunPreviewModal({ isOpen, onClose, order }) {
  const [viewMode, setViewMode] = useState('rendered'); // rendered, raw_json

  if (!isOpen || !order) return null;

  const mailPayload = mailgunService.sendOrderConfirmationEmail(order);

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1500, background: 'rgba(15, 23, 42, 0.92)', backdropFilter: 'blur(12px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
      
      <div 
        className="animate-fade-in"
        style={{
          background: '#1E293B',
          border: '1px solid #334155',
          borderRadius: '24px',
          maxWidth: '820px',
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
            <Mail size={22} color="#FA6400" />
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#FFF' }}>
                Mailgun Transactional Email Engine
              </h3>
              <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>
                Endpoint: <code>POST https://api.mailgun.net/v3/mg.shofinda.com/messages</code>
              </div>
            </div>
          </div>

          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#94A3B8', cursor: 'pointer' }}>
            <X size={22} />
          </button>
        </div>

        {/* View Switcher */}
        <div style={{ display: 'flex', gap: '1rem', padding: '0.75rem 1.75rem', background: 'rgba(50, 0, 100, 0.4)', borderBottom: '1px solid #334155' }}>
          <button
            onClick={() => setViewMode('rendered')}
            style={{
              background: viewMode === 'rendered' ? '#FA6400' : 'transparent',
              color: '#FFF',
              border: 'none',
              padding: '0.45rem 0.9rem',
              borderRadius: '8px',
              fontSize: '0.85rem',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <Mail size={16} /> Rendered HTML Template
          </button>

          <button
            onClick={() => setViewMode('raw_json')}
            style={{
              background: viewMode === 'raw_json' ? '#0096FA' : 'transparent',
              color: '#FFF',
              border: 'none',
              padding: '0.45rem 0.9rem',
              borderRadius: '8px',
              fontSize: '0.85rem',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <Code size={16} /> Raw API Payload (JSON)
          </button>
        </div>

        {/* Content Body */}
        <div style={{ padding: '1.5rem', flex: 1, overflowY: 'auto' }}>
          {viewMode === 'rendered' ? (
            <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid #334155' }}>
              <iframe
                title="Mailgun HTML Preview"
                srcDoc={mailPayload.html}
                style={{ width: '100%', height: '520px', border: 'none', background: '#0F172A' }}
              />
            </div>
          ) : (
            <div style={{ background: '#0B1120', border: '1px solid #334155', borderRadius: '12px', padding: '1.25rem' }}>
              <pre style={{ color: '#FA6400', fontSize: '0.85rem', margin: 0, fontFamily: 'monospace', lineHeight: 1.5 }}>
                {JSON.stringify(mailPayload, null, 2)}
              </pre>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
