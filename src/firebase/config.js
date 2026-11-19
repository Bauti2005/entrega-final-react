
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyA635H3bgt2c2z_eunGd2mpsqsTF7jWeUk",
  authDomain: "pokemarket-43c49.firebaseapp.com",
  projectId: "pokemarket-43c49",
  storageBucket: "pokemarket-43c49.firebasestorage.app",
  messagingSenderId: "929829750931",
  appId:"1:929829750931:web:d63d58bfae87ff07b42566",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

