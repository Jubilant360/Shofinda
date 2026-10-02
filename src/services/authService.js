import { dbService } from './supabaseClient.js';

const AUTH_STORAGE_KEY = 'shofinda_current_user';

export const authService = {
  getCurrentUser: () => {
    try {
      const userStr = localStorage.getItem(AUTH_STORAGE_KEY);
      return userStr ? JSON.parse(userStr) : null;
    } catch {
      return null;
    }
  },

  loginWithGoogle: async (demoAccount = null) => {
    const defaultUser = demoAccount || {
      id: 'usr-google-101',
      email: 'alex.vance@gmail.com',
      full_name: 'Alex Vance',
      avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80',
      google_id: 'g-109823471092834',
      created_at: new Date().toISOString()
    };

    dbService.saveUser(defaultUser);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(defaultUser));
    return defaultUser;
  },

  logout: () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }
};
