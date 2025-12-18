'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { LoginView } from './login-view';

const UserAuth = () => {
  const { 
    error, 
    setError, 
    loginWithEmail, 
    signUpWithEmail, 
    signInWithGoogle 
  } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await loginWithEmail(email, password);
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signUpWithEmail(email, password, name);
  };

  return (
    <LoginView
      onLogin={handleLogin}
      onSignUp={handleSignUp}
      onGoogleSignIn={signInWithGoogle}
      onAppleSignIn={() => setError('Apple Sign-In is not implemented yet.')}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      name={name}
      setName={setName}
      isSignUp={isSignUp}
      setIsSignUp={setIsSignUp}
      error={error}
    />
  );
};

export default UserAuth;
