import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
// Safe to keep public — Firebase web config keys are not secret.
// Data is protected separately via Firestore Security Rules.
const firebaseConfig = {
  apiKey: 'AIzaSyCueKFn25LLpjNyHPjQBpD5A-8IOrMcCFs',
  authDomain: 'vsl-icecompany.firebaseapp.com',
  projectId: 'vsl-icecompany',
  storageBucket: 'vsl-icecompany.firebasestorage.app',
  messagingSenderId: '519145119009',
  appId: '1:519145119009:web:b9caae153e12d0d12e3260',
  measurementId: 'G-GV49ZMV9DB',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore Database — import { db } from './firebase' anywhere you need it
export const db = getFirestore(app);

// Initialize Firebase Auth — used for the password-protected /admin dashboard
export const auth = getAuth(app);
