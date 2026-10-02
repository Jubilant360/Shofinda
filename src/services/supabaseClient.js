import { createClient } from '@supabase/supabase-js';
import { PRODUCTS, CATEGORIES } from '../data/products.js';

// Default Supabase config or fallback mock service
const SUPABASE_URL = import.meta.env?.VITE_SUPABASE_URL || 'https://demo-shofinda.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env?.VITE_SUPABASE_ANON_KEY || 'demo-anon-key-shofinda-12345';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// LocalStorage Database Backup / Replica Service
const LOCAL_STORAGE_KEY_ORDERS = 'shofinda_orders_db';
const LOCAL_STORAGE_KEY_USERS = 'shofinda_users_db';
const LOCAL_STORAGE_KEY_TRANSACTIONS = 'shofinda_transactions_db';

const initialUsers = [
  {
    id: 'usr-google-101',
    email: 'alex.vance@gmail.com',
    full_name: 'Alex Vance',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80',
    google_id: 'g-109823471092834',
    created_at: new Date('2026-09-15').toISOString()
  }
];

export const dbService = {
  getUsers: () => {
    try {
      const data = localStorage.getItem(LOCAL_STORAGE_KEY_USERS);
      return data ? JSON.parse(data) : initialUsers;
    } catch {
      return initialUsers;
    }
  },

  saveUser: (user) => {
    const users = dbService.getUsers();
    const existingIndex = users.findIndex(u => u.email === user.email);
    if (existingIndex >= 0) {
      users[existingIndex] = { ...users[existingIndex], ...user };
    } else {
      users.unshift(user);
    }
    localStorage.setItem(LOCAL_STORAGE_KEY_USERS, JSON.stringify(users));
    return user;
  },

  getProducts: () => PRODUCTS,
  getCategories: () => CATEGORIES,

  getOrders: () => {
    try {
      const data = localStorage.getItem(LOCAL_STORAGE_KEY_ORDERS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  createOrder: async (orderData) => {
    const orderId = `SHF-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder = {
      id: crypto.randomUUID ? crypto.randomUUID() : `ord-${Date.now()}`,
      order_number: orderId,
      user_id: orderData.userId || 'usr-guest',
      status: 'paid',
      subtotal: orderData.subtotal,
      tax: orderData.tax,
      shipping_fee: orderData.shippingFee,
      total_amount: orderData.totalAmount,
      shipping_name: orderData.shippingName,
      shipping_email: orderData.shippingEmail,
      shipping_address: orderData.shippingAddress,
      shipping_city: orderData.shippingCity,
      shipping_postal_code: orderData.shippingPostalCode,
      shipping_country: orderData.shippingCountry,
      items: orderData.items,
      created_at: new Date().toISOString()
    };

    // Attempt Supabase insert if configured
    try {
      await supabase.from('orders').insert([
        {
          order_number: newOrder.order_number,
          subtotal: newOrder.subtotal,
          tax: newOrder.tax,
          shipping_fee: newOrder.shipping_fee,
          total_amount: newOrder.total_amount,
          shipping_name: newOrder.shipping_name,
          shipping_email: newOrder.shipping_email,
          shipping_address: newOrder.shipping_address,
          shipping_city: newOrder.shipping_city,
          shipping_postal_code: newOrder.shipping_postal_code,
          shipping_country: newOrder.shipping_country
        }
      ]);
    } catch (e) {
      console.warn('Supabase remote insert fallback to local replica DB:', e);
    }

    // Save to Local Replica
    const currentOrders = dbService.getOrders();
    currentOrders.unshift(newOrder);
    localStorage.setItem(LOCAL_STORAGE_KEY_ORDERS, JSON.stringify(currentOrders));

    // Log Transaction
    const transaction = {
      id: `trx-${Date.now()}`,
      order_id: newOrder.id,
      order_number: newOrder.order_number,
      payment_provider: orderData.paymentMethod || 'card',
      transaction_reference: `TXN-${Math.random().toString(36).substring(2, 12).toUpperCase()}`,
      status: 'success',
      amount: newOrder.total_amount,
      created_at: new Date().toISOString()
    };
    dbService.saveTransaction(transaction);

    return newOrder;
  },

  getTransactions: () => {
    try {
      const data = localStorage.getItem(LOCAL_STORAGE_KEY_TRANSACTIONS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  saveTransaction: (transaction) => {
    const transactions = dbService.getTransactions();
    transactions.unshift(transaction);
    localStorage.setItem(LOCAL_STORAGE_KEY_TRANSACTIONS, JSON.stringify(transactions));
  }
};
