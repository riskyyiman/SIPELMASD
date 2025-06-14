// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, TwitterAuthProvider, UserCredential, User } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAhQohySkJnhbKVfDkccgHBfZPcn4fEIfI',
  authDomain: 'sipelmasd-1d702.firebaseapp.com',
  projectId: 'sipelmasd-1d702',
  storageBucket: 'sipelmasd-1d702.appspot.com',
  messagingSenderId: '540363132648',
  appId: '1:540363132648:web:dfe73cf4b11d4ad9db435d',
  measurementId: 'G-FFF8YWDJ3Z',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

// Auth Providers
const googleProvider = new GoogleAuthProvider();
const twitterProvider = new TwitterAuthProvider();

// Sign Up with Email and Password
const signUpWithEmail = async (email: string, password: string): Promise<UserCredential> => {
  try {
    return await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw error;
  }
};

// Sign In with Email and Password
const signInWithEmail = async (email: string, password: string): Promise<UserCredential> => {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw error;
  }
};

// Sign In with Google
const signInWithGoogle = async (): Promise<UserCredential> => {
  try {
    return await signInWithPopup(auth, googleProvider);
  } catch (error) {
    throw error;
  }
};

// Sign In with Twitter
const signInWithTwitter = async (): Promise<UserCredential> => {
  try {
    return await signInWithPopup(auth, twitterProvider);
  } catch (error) {
    throw error;
  }
};

// Get current user
const getCurrentUser = (): User | null => {
  return auth.currentUser;
};

// Sign Out
const signOut = async (): Promise<void> => {
  try {
    await auth.signOut();
  } catch (error) {
    throw error;
  }
};

export { app, analytics, auth, signUpWithEmail, signInWithEmail, signInWithGoogle, signInWithTwitter, getCurrentUser, signOut };
