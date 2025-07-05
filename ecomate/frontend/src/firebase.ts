
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA69ZbBw24K_PRCC1vvI_Z15Z2WABZXIwc",
  authDomain: "ecomate-8e532.firebaseapp.com",
  projectId: "ecomate-8e532",
  storageBucket: "ecomate-8e532.appspot.com",
  messagingSenderId: "821181722979",
  appId: "1:821181722979:web:1be7c9d7a0fbc4518ba356"
};

// Initialize Firebase app
export const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase Auth service
const auth = getAuth(firebaseApp);

// Create Google Auth provider instance
const provider = new GoogleAuthProvider();

// Export everything your service needs
export { auth, provider, signInWithPopup, signOut, onAuthStateChanged };
