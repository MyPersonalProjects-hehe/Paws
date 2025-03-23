import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDo-f6bW1ImSR6wyktAeWSK4xwlShwmRDo',
  authDomain: 'paws-7984e.firebaseapp.com',
  projectId: 'paws-7984e',
  storageBucket: 'paws-7984e.firebasestorage.app',
  messagingSenderId: '558645793745',
  appId: '1:558645793745:web:e90cc6617cb83f16cb86f0',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
