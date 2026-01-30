// Firebase Configuration
// Replace these values with your actual Firebase project credentials
// You can get these from Firebase Console -> Project Settings -> General -> Your apps

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5_Kb0PUvTGujIXCuKPGluAgrsW6OYquY",
  authDomain: "multilingual-app-8fffb.firebaseapp.com",
  projectId: "multilingual-app-8fffb",
  storageBucket: "multilingual-app-8fffb.firebasestorage.app",
  messagingSenderId: "345348285704",
  appId: "1:345348285704:web:89890764e0c9dcebf0f8bd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;

