'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { 
  getAuth, 
  onAuthStateChanged, 
  signOut, 
  User, 
  signInWithPopup, 
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth';
import { getFirestore, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { app } from '@/lib/firebase';
import { useRouter, usePathname } from 'next/navigation';

const auth = getAuth(app);
const db = getFirestore(app);

// Helper function to create a user document in Firestore
const createUserDocument = async (user: User, name?: string) => {
  if (!user) return;
  const userRef = doc(db, "users", user.uid);
  try {
    await setDoc(userRef, {
      email: user.email,
      displayName: name || user.displayName || '',
      createdAt: serverTimestamp(),
    }, { merge: true });
  } catch (error) {
    console.error("Error creating user document: ", error);
  }
};


interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  setError: (error: string | null) => void;
  logout: () => Promise<void>;
  loginWithEmail: (email: string, pass: string) => Promise<void>;
  signUpWithEmail: (email: string, pass: string, name: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  // Effect 1: Sync Firebase auth state to React state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Effect 2: React to state changes and route accordingly
  useEffect(() => {
    if (loading) return; // Don't do anything until auth state is resolved

    const onLoginPage = pathname === '/';

    // If user is logged in and they are on the login page, redirect to dashboard
    if (user && onLoginPage) {
      router.replace('/dashboard');
    }
    // If user is not logged in and they are not on the login page, redirect to login
    else if (!user && !onLoginPage) {
      router.replace('/');
    }
  }, [user, loading, pathname, router]);


  const loginWithEmail = async (email: string, pass: string) => {
     setError(null);
     try {
      await signInWithEmailAndPassword(auth, email, pass);
      // The effects above will handle the redirect
    } catch (error: any) {
      console.error("Error signing in: ", error);
       if (error.code === 'auth/user-not-found') {
        setError("No account found with this email. Please sign up.");
      } else if (error.code === 'auth/wrong-password') {
        setError('Incorrect password. Please try again.');
      } else {
        setError(error.message || 'Failed to sign in.');
      }
    }
  };

  const signUpWithEmail = async (email: string, pass: string, name: string) => {
    setError(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
      await createUserDocument(userCredential.user, name);
      // The effects above will handle the redirect
    } catch (error: any) {
      console.error("Error signing up: ", error);
      setError(error.message || 'Failed to sign up.');
    }
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    setError(null);
    try {
      const userCredential = await signInWithPopup(auth, provider);
      await createUserDocument(userCredential.user);
      // The effects above will handle the redirect
    } catch (error: any) {
      console.error("Error signing in with Google: ", error);
      setError(error.message || 'Failed to sign in with Google.');
    }
  };

  const logout = async () => {
    try {
        await signOut(auth);
        // The effects above will handle the redirect.
    } catch (error) {
        console.error("Error signing out: ", error);
        setError("Failed to sign out.");
    }
  };

  const value = {
    user,
    loading,
    error,
    setError,
    logout,
    loginWithEmail,
    signUpWithEmail,
    signInWithGoogle,
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? <div className="flex items-center justify-center min-h-screen bg-black text-white">Loading...</div> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
