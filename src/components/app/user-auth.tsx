'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { LoginView } from './login-view';
import { useToast } from '@/hooks/use-toast';

const UserAuth = () => {
  const { 
    loginWithEmail, 
    signUpWithEmail, 
    signInWithGoogle 
  } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const { toast } = useToast();

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
      onAppleSignIn={() => toast({ title: "Not Implemented", description: "Apple Sign-In is coming soon!", variant: "destructive" })}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      name={name}
      setName={setName}
      isSignUp={isSignUp}
      setIsSignUp={setIsSignUp}
      error={null}
    />
  );
};

export default UserAuth;
