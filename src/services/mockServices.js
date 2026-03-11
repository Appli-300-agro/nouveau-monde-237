// Simulation des services Firebase pour le test local sans compte Firebase
import { MOCK_PRODUCTS } from '../data/mockData';

const MOCK_USERS = {
  'admin@assequip.cm': { uid: 'admin-001', email: 'admin@assequip.cm', displayName: 'Aubry Admin', role: 'admin' },
  'user@assequip.cm': { uid: 'user-001', email: 'user@assequip.cm', displayName: 'Client Test', role: 'user' }
};

// Système de souscription simple pour simuler onAuthStateChanged
let authListener = null;

// --- Mock Auth ---
export const mockAuth = {
  get currentUser() {
    return JSON.parse(localStorage.getItem('mockUser'));
  },
  onAuthStateChanged: (callback) => {
    authListener = callback;
    const user = JSON.parse(localStorage.getItem('mockUser'));
    callback(user);
    return () => { authListener = null; };
  },
  signInWithEmailAndPassword: async (email, password) => {
    if ((email === 'admin@assequip.cm' && password === 'admin123') || 
        (email === 'user@assequip.cm' && password === 'user123')) {
      const user = MOCK_USERS[email];
      localStorage.setItem('mockUser', JSON.stringify(user));
      if (authListener) authListener(user); // Notifier l'application
      return { user };
    }
    throw new Error("Identifiants de test invalides.");
  },
  signOut: async () => {
    localStorage.removeItem('mockUser');
    if (authListener) authListener(null); // Notifier l'application
    window.location.href = '/';
  }
};

// --- Mock Firestore ---
export const mockDb = {
  collection: (name) => {
    return {
      getDocs: async () => ({
        docs: MOCK_PRODUCTS.map(p => ({ id: p.id, data: () => p }))
      }),
      addDoc: async (data) => {
        return { id: Math.random().toString(36).substr(2, 9) };
      }
    };
  }
};
