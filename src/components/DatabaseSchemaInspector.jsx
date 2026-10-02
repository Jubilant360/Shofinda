import React, { useState } from 'react';
import { X, Database, Table, Code, RefreshCw, Check, Layers } from 'lucide-react';
import { dbService } from '../services/supabaseClient.js';

export default function DatabaseSchemaInspector({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('tables'); // tables, sql_ddl, erd
  const [selectedTable, setSelectedTable] = useState('orders'); // users, categories, products, orders, transactions

  if (!isOpen) return null;

  const users = dbService.getUsers();
  const categories = dbService.getCategories();
  const products = dbService.getProducts();
  const orders = dbService.getOrders();
  const transactions = dbService.getTransactions();

  const getTableData = () => {
    switch (selectedTable) {
      case 'users': return users;
      case 'categories': return categories;
      case 'products': return products;
      case 'orders': return orders;
      case 'transactions': return transactions;
      default: return [];
    }
  };

  const sqlDDL = `-- PostgreSQL / Supabase Schema DDL Script (Shofinda Platform)

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. USERS TABLE (Google SSO)
CREATE TABLE public.users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255),
    avatar_url TEXT,
    google_id VARCHAR(255) UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. CATEGORIES TABLE
CREATE TABLE public.categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. PRODUCTS TABLE
CREATE TABLE public.products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
    stock_quantity INT NOT NULL DEFAULT 0 CHECK (stock_quantity >= 0),
    image_url TEXT,
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. ORDERS TABLE
CREATE TABLE public.orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    order_number VARCHAR(50) UNIQUE NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'pending',
    subtotal NUMERIC(10, 2) NOT NULL,
    tax NUMERIC(10, 2) DEFAULT 0.00,
    shipping_fee NUMERIC(10, 2) DEFAULT 0.00,
    total_amount NUMERIC(10, 2) NOT NULL,
    shipping_name VARCHAR(255) NOT NULL,
    shipping_email VARCHAR(255) NOT NULL,
    shipping_address TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. ORDER ITEMS TABLE
CREATE TABLE public.order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    unit_price NUMERIC(10, 2) NOT NULL,
    total_price NUMERIC(10, 2) NOT NULL
);

-- 6. TRANSACTIONS TABLE
CREATE TABLE public.transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    payment_provider VARCHAR(50) DEFAULT 'stripe',
    transaction_reference VARCHAR(255) UNIQUE NOT NULL,
    status VARCHAR(30) NOT NULL,
    amount NUMERIC(10, 2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
`;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1400, background: 'rgba(15, 23, 42, 0.92)', backdropFilter: 'blur(12px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
      
      <div 
        className="animate-fade-in"
        style={{
          background: '#1E293B',
          border: '1px solid #334155',
          borderRadius: '24px',
          maxWidth: '1000px',
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
            <Database size={22} color="#0096FA" />
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#FFF' }}>
                PostgreSQL & Supabase Database Inspector
              </h3>
              <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>
                Live Schema, ERD Diagrams & Table State Explorer
              </div>
            </div>
          </div>

          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#94A3B8', cursor: 'pointer' }}>
            <X size={22} />
          </button>
        </div>

        {/* Tab Controls */}
        <div style={{ display: 'flex', gap: '1rem', padding: '0.75rem 1.75rem', background: 'rgba(50, 0, 100, 0.4)', borderBottom: '1px solid #334155' }}>
          {[
            { id: 'tables', label: 'Live Data Tables', icon: Table },
            { id: 'sql_ddl', label: 'PostgreSQL DDL Schema', icon: Code },
            { id: 'erd', label: 'ERD Structure', icon: Layers }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: activeTab === tab.id ? '#0096FA' : 'transparent',
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
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Body */}
        <div style={{ padding: '1.75rem', flex: 1, overflowY: 'auto' }}>
          
          {/* TAB 1: LIVE TABLES */}
          {activeTab === 'tables' && (
            <div>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem' }}>
                {['orders', 'users', 'products', 'categories', 'transactions'].map(tbl => (
                  <button
                    key={tbl}
                    onClick={() => setSelectedTable(tbl)}
                    style={{
                      background: selectedTable === tbl ? 'rgba(250, 100, 0, 0.2)' : '#0F172A',
                      color: selectedTable === tbl ? '#FA6400' : '#94A3B8',
                      border: selectedTable === tbl ? '1px solid #FA6400' : '1px solid #334155',
                      padding: '0.4rem 0.8rem',
                      borderRadius: '8px',
                      fontSize: '0.8rem',
                      fontWeight: '700',
                      textTransform: 'uppercase',
                      cursor: 'pointer'
                    }}
                  >
                    public.{tbl} ({getTableData().length})
                  </button>
                ))}
              </div>

              {/* Data Table */}
              <div style={{ background: '#0F172A', border: '1px solid #334155', borderRadius: '12px', overflowX: 'auto' }}>
                <pre style={{ color: '#0096FA', fontSize: '0.8rem', padding: '1.25rem', margin: 0, fontFamily: 'monospace', lineHeight: 1.5 }}>
                  {JSON.stringify(getTableData(), null, 2)}
                </pre>
              </div>
            </div>
          )}

          {/* TAB 2: SQL DDL SCRIPT */}
          {activeTab === 'sql_ddl' && (
            <div style={{ background: '#0B1120', border: '1px solid #334155', borderRadius: '12px', padding: '1.25rem' }}>
              <pre style={{ color: '#38BDF8', fontSize: '0.85rem', margin: 0, fontFamily: 'Consolas, Monaco, monospace', lineHeight: 1.6 }}>
                {sqlDDL}
              </pre>
            </div>
          )}

          {/* TAB 3: ERD DIAGRAM */}
          {activeTab === 'erd' && (
            <div style={{ background: '#0F172A', border: '1px solid #334155', borderRadius: '12px', padding: '1.5rem', color: '#FFF' }}>
              <h4 style={{ color: '#FA6400', marginBottom: '1rem' }}>Relational Data Mapping</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                {[
                  { name: 'USERS', fields: ['id (PK)', 'email', 'full_name', 'google_id'] },
                  { name: 'PRODUCTS', fields: ['id (PK)', 'category_id (FK)', 'title', 'price', 'stock_quantity'] },
                  { name: 'ORDERS', fields: ['id (PK)', 'user_id (FK)', 'order_number', 'total_amount', 'status'] },
                  { name: 'TRANSACTIONS', fields: ['id (PK)', 'order_id (FK)', 'transaction_reference', 'amount'] }
                ].map(entity => (
                  <div key={entity.name} style={{ background: '#1E293B', border: '1px solid #334155', borderRadius: '10px', padding: '1rem' }}>
                    <div style={{ fontSize: '0.9rem', fontWeight: '800', color: '#0096FA', borderBottom: '1px solid #334155', paddingBottom: '0.4rem', marginBottom: '0.6rem' }}>
                      {entity.name}
                    </div>
                    {entity.fields.map((f, i) => (
                      <div key={i} style={{ fontSize: '0.75rem', color: '#94A3B8', marginBottom: '0.2rem' }}>• {f}</div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
