'use client'

import React, { useEffect, useState } from 'react';
import { Navbar } from '../../components/app/navbar';
import { HeroSection } from '../../components/app/hero-section';
import { AgentCards } from '../../components/app/agent-cards';
import { VideoTraining } from '../../components/app/video-training';
import { Library } from '../../components/app/library';
import { ChatModal, Message } from '../../components/app/chat-modal';
import { Drawer } from '../../components/app/drawer';
import { useAuth } from '@/context/AuthContext';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { app } from '@/lib/firebase';

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const [isDark, setIsDark] = useState(true);
  const [userName, setUserName] = useState<string | null>(null);
  
  // Chat State
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMode, setChatMode] = useState<'Indoc Agent' | 'Specialist Agent'>('Indoc Agent');
  const [messages, setMessages] = useState<Message[]>([]);
  
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Fetch user data from Firestore
  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        // Try to get name from user.displayName first (if available from Google auth or updateProfile)
        if (user.displayName) {
             setUserName(user.displayName);
        } else {
             // If not, fetch from Firestore
             const db = getFirestore(app);
             const docRef = doc(db, "users", user.uid);
             const docSnap = await getDoc(docRef);
             if (docSnap.exists()) {
                 const data = docSnap.data();
                 if (data.displayName) {
                     setUserName(data.displayName);
                 }
             }
        }
      }
    };
    fetchUserData();
  }, [user]);

  // Handle Dark Mode
  useEffect(() => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);
  
  // Handle Logout
  const handleLogout = async () => {
    await logout();
  };
  
  // Helper to get initials
  const getInitials = (name: string | null) => {
      if (!name) return 'CP';
      const parts = name.trim().split(' ');
      if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  // Initial greeting
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        { 
          id: 'init', 
          role: 'assistant', 
          content: 'Welcome to the FlightDeck Indoc portal. I am your specialized aviation assistant. I can assist with aircraft systems, route planning, and emergency procedures.',
          timestamp: '14:02 ZULU'
        }
      ]);
    }
  }, []);

  const handleStartIndocChat = () => {
    setChatMode('Indoc Agent');
    setIsChatOpen(true);
  };

  const handleStartSpecialistChat = (initialMsg?: string) => {
    setChatMode('Specialist Agent');
    setIsChatOpen(true);
    if (initialMsg) {
       const now = new Date();
       setMessages(prev => [...prev, {
         id: Date.now().toString(),
         role: 'user',
         content: initialMsg,
         timestamp: `${now.getHours()}:${now.getMinutes()} ZULU`
       }]);
    }
  };

  return (
    <div className="text-slate-800 dark:text-slate-300 antialiased h-[100dvh] relative w-full overflow-hidden selection:bg-[#24FF00] dark:selection:bg-[#24FF00] selection:text-white dark:selection:text-black transition-colors duration-500 font-sans">
      
      {/* Immersive Background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-slate-200 dark:bg-black transition-colors duration-500">
        <img 
            src="/assets/Dark%20Mode%20Earth.png" 
            className="absolute inset-0 w-full h-full object-cover opacity-60 dark:opacity-70 transition-opacity duration-500" 
            alt="Orbit View"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/40 to-white/90 dark:from-black/40 dark:via-black/20 dark:to-black/90 transition-colors duration-500"></div>
        <div className="scanline-overlay absolute inset-0 opacity-50 dark:opacity-100"></div>
        <div className="scan-bar opacity-30 dark:opacity-100"></div>
      </div>

      <div className={`transition-all duration-1000 ease-[cubic-bezier(0.32,0.72,0,1)] opacity-100 translate-y-0 z-10 relative h-full flex flex-col`}>
        
        {/* Floating Navigation */}
        <div className="fixed top-2 left-1/2 transform -translate-x-1/2 z-40 w-[92%] md:w-full md:max-w-fit px-0 md:px-4">
          <Navbar 
            isDark={isDark} 
            toggleTheme={toggleTheme} 
            onLogout={handleLogout} 
            userName={userName}
            userInitials={getInitials(userName)}
          />
        </div>

        {/* Main Scrollable Content */}
        <main 
          id="scroll-root" 
          className="flex-1 overflow-y-auto no-scrollbar z-10 relative scroll-smooth"
        >
          {/* Main Content Container */}
          <div className="flex flex-col dark:from-black/40 dark:via-black/40 dark:to-black/40 transition-colors duration-500 bg-gradient-to-b from-white/40 via-white/40 to-white/40 max-w-7xl z-10 mr-auto ml-auto pt-32 pr-6 pb-24 pl-6 relative blur-none gap-y-16 backdrop-blur-sm">
            
            <HeroSection onStartChat={handleStartSpecialistChat} />
            
            <AgentCards />
            
            <VideoTraining />
            
            <Library />

          </div>
            <footer className="w-full text-center pb-2.5 border-t border-black/10 dark:border-white/5 pt-8 transition-colors relative z-20 bg-white/40 dark:bg-black/40 backdrop-blur-sm">
              <p className="text-xs font-normal text-slate-500 tracking-wide">
                AVIATIONCHAT © 2026 • SYSTEM v1.2.5 • 
                <a href="#" className="hover:text-white transition-colors ml-1">Privacy</a> • 
                <a href="#" className="hover:text-white transition-colors ml-1">Terms</a>
              </p>
            </footer>
        </main>
      </div>

      {/* Unified Drawer-Style Chat Interface */}
      <ChatModal 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
        messages={messages}
        setMessages={setMessages}
        agentName={chatMode}
        isDark={isDark}
      />

      {/* System Drawer (Resources) */}
      <Drawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        onOpen={() => setIsDrawerOpen(true)}
      />
    </div>
  );
}
