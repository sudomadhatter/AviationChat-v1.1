'use client';

import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, User, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '@/lib/firebase'; // Adjust this path if needed
import { LoginView } from './login-view';

const auth = getAuth(app);

const UserAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSignUp, setIsSignUp] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      // Clear errors and form fields on auth state change
      if (user) {
        setError(null);
        setEmail('');
        setPassword('');
      }
    });

    return () => unsubscribe();
  }, []);

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    setError(null);
    try {
      await signInWithPopup(auth, provider);
    } catch (error: any) {
      console.error("Error signing in with Google: ", error);
      setError(error.message || 'Failed to sign in with Google.');
    }
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      console.error("Error signing up: ", error);
      setError(error.message || 'Failed to sign up.');
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
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

  const signOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  if (user) {
    // In a real app, you'd render your main application here
    // For now, just showing a welcome message and sign out button
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
        <h1 className="text-2xl mb-4">Welcome, {user.displayName || user.email}</h1>
        <button 
          onClick={signOut} 
          className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md transition-colors">
          Sign Out
        </button>
      </div>
    );
  }

  // User is not signed in, show the login/signup form
  return (
    <LoginView
      onLogin={handleLogin}
      onSignUp={handleSignUp}
      onGoogleSignIn={handleGoogleSignIn}
      onAppleSignIn={() => setError('Apple Sign-In is not implemented yet.')} // Placeholder
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      isSignUp={isSignUp}
      setIsSignUp={setIsSignUp}
      error={error}
    />
  );
};

export default UserAuth;
