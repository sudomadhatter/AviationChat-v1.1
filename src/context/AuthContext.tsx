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
  signInWithEmailAndPassword,
  sendEmailVerification
} from 'firebase/auth';
import { getFirestore, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { app } from '@/lib/firebase';
import { useRouter, usePathname } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

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
  logout: () => Promise<void>;
  loginWithEmail: (email: string, pass: string) => Promise<void>;
  signUpWithEmail: (email: string, pass: string, name: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
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
     try {
      await signInWithEmailAndPassword(auth, email, pass);
      toast({ title: "Login Successful!", description: "Welcome back." });
      // The effects above will handle the redirect
    } catch (error: any) {
      console.error("Error signing in: ", error);
       if (error.code === 'auth/user-not-found') {
        toast({ title: "Login Failed", description: "No account found with this email. Please sign up.", variant: "destructive" });
      } else if (error.code === 'auth/wrong-password') {
        toast({ title: "Login Failed", description: "Incorrect password. Please try again.", variant: "destructive" });
      } else {
        toast({ title: "Login Failed", description: error.message || 'Failed to sign in.', variant: "destructive" });
      }
    }
  };

  const signUpWithEmail = async (email: string, pass: string, name: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
      await createUserDocument(userCredential.user, name);
      await sendEmailVerification(userCredential.user);
      toast({ title: "Success!", description: "Please check your inbox to verify your email." });
      // The effects above will handle the redirect
    } catch (error: any) {
      console.error("Error signing up: ", error);
      toast({ title: "Sign Up Failed", description: error.message || 'Failed to sign up.', variant: "destructive" });
    }
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const userCredential = await signInWithPopup(auth, provider);
      await createUserDocument(userCredential.user);
      toast({ title: "Login Successful!", description: "Welcome back." });
      // The effects above will handle the redirect
    } catch (error: any) {
      console.error("Error signing in with Google: ", error);
      toast({ title: "Login Failed", description: error.message || 'Failed to sign in with Google.', variant: "destructive" });
    }
  };

  const logout = async () => {
    try {
        await signOut(auth);
        toast({ title: "Logged Out", description: "You have been successfully logged out." });
        // The effects above will handle the redirect.
    } catch (error) {
        console.error("Error signing out: ", error);
        toast({ title: "Logout Failed", description: "Failed to sign out.", variant: "destructive" });
    }
  };

  const value = {
    user,
    loading,
    logout,
    loginWithEmail,
    signUpWithEmail,
    signInWithGoogle,
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? (
        <div className="flex items-center justify-center min-h-screen bg-black text-white">
          Loading...
        </div>
      ) : (
        children
      )}
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
