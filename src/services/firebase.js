import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { mockAuth, mockDb } from './mockServices';

const useMocks = import.meta.env.VITE_USE_MOCKS === 'true';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "mock",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "mock",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "mock",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "mock",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "mock",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "mock"
};

// Initialisation conditionnelle
let auth, db, storage;

if (useMocks) {
  console.warn("⚠️ Mode TEST LOCAL activé : Utilisation des Mock Services (Sans Firebase)");
  auth = mockAuth;
  db = mockDb;
  storage = {}; // Mock minimal
} else {
  const app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
}

export { auth, db, storage };
