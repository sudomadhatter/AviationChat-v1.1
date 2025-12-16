'use client';

import React, { useState } from 'react';
import { MessageCircle, ArrowUpRight } from 'lucide-react';
import { ChatModal, Message } from './chat-modal';

interface LoginViewProps {
  onLogin: () => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLogin }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init',
      role: 'assistant',
      content:
        'Welcome to the FlightDeck Indoc portal. I am your specialized aviation assistant. I can assist with aircraft systems, route planning, and emergency procedures.',
      timestamp: '14:02 ZULU',
    },
  ]);

  const handleLoginSubmit = () => {
    setIsVisible(false);
    // Delay to allow animation
    setTimeout(() => {
      onLogin();
    }, 700);
  };

  const onOpenIndoc = () => {
    setIsChatOpen(true);
  };

  return (
    <>
      <main
        className={`flex flex-col min-h-screen sm:px-6 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] pt-12 pr-4 pb-12 pl-4 items-center justify-center bg-black ${
          isVisible
            ? 'opacity-100 scale-100 blur-0 relative z-50'
            : 'opacity-0 scale-95 blur-sm pointer-events-none absolute inset-0 -z-10'
        }`}
      >
        {/* Background Image - Orbit View */}
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            src="/assets/Dark%20Mode%20Earth.png"
            className="absolute inset-0 w-full h-full object-cover opacity-60"
            alt="Orbit View"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/90"></div>
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
              backgroundSize: '100% 2px, 3px 100%',
            }}
          ></div>
        </div>

        {/* The Cockpit Card - Enhanced Glassmorphism with Radial Gradient & Green Ring */}
        <div
          className="overflow-hidden w-full max-w-[480px] rounded-[32px] relative z-10 
        bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.03)_0%,rgba(255,255,255,0.005)_50%,rgba(0,0,0,0.2)_100%)]
        backdrop-blur-[12px] 
        border border-white/10
        ring-1 ring-[#24FF00]/15
        shadow-[0_0_60px_-15px_rgba(0,0,0,0.5)]
      "
        >
          {/* Top white gradient for glass sheen */}
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/5 to-transparent opacity-50 pointer-events-none"></div>
          {/* Bottom white gradient for glass reflection */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white/5 to-transparent opacity-30 pointer-events-none"></div>

          {/* Decorative HUD Elements */}
          <div className="absolute top-6 left-6 flex gap-1.5 opacity-80 z-20">
            <div className="w-1.5 h-1.5 rounded-full bg-[#24FF00] shadow-[0_0_8px_#24FF00] animate-pulse"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-[#24FF00]/30"></div>
          </div>
          <div className="absolute top-6 right-6 text-[10px] font-mono text-[#24FF00]/60 tracking-widest uppercase z-20">
            Sys.Lock // 092
          </div>
          <div className="absolute bottom-5 left-5 w-3 h-3 border-b border-l border-[#24FF00]/20 rounded-bl-sm z-30"></div>
          <div className="absolute bottom-5 right-5 w-3 h-3 border-b border-r border-[#24FF00]/20 rounded-br-sm z-30"></div>

          <div className="flex flex-col p-10 items-center relative z-20">
            {/* Header */}
            <div className="flex flex-col text-center mb-10 items-center">
              <div className="relative mb-6">
                <img
                  src="/assets/AviationChat.png"
                  alt="FlightDeck AI"
                  className="w-20 h-20 object-contain relative drop-shadow-[0_0_25px_rgba(0,194,255,0.4)]"
                />
              </div>
              <h1 className="text-3xl font-medium text-white tracking-tight mb-2">
                <span className="font-bold">AVIATION</span>
                <span className="font-normal">CHAT</span>
              </h1>
              <p className="text-sm font-medium text-[#00C2FF] tracking-wide">
                {isSignUp ? 'Create Your Account' : 'Secure Pilot Access'}
              </p>
            </div>

            {/* Login / Sign Up Form */}
            <form
              className="w-full space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                handleLoginSubmit();
              }}
            >
              {isSignUp && (
                <div className="group relative">
                  <input
                    type="text"
                    name="callsign"
                    autoComplete="username"
                    placeholder="Call Sign"
                    className="block w-full rounded-full border border-white/10 bg-black/20 py-4 px-6 text-sm font-light text-white placeholder-slate-400 focus:border-[#00C2FF]/50 focus:ring-1 focus:ring-[#00C2FF]/50 focus:bg-black/40 focus:outline-none transition-all backdrop-blur-sm"
                  />
                </div>
              )}
              <div className="group relative">
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="Email"
                  className="block w-full rounded-full border border-white/10 bg-black/20 py-4 px-6 text-sm font-light text-white placeholder-slate-400 focus:border-[#00C2FF]/50 focus:ring-1 focus:ring-[#00C2FF]/50 focus:bg-black/40 focus:outline-none transition-all backdrop-blur-sm"
                />
              </div>
              <div className="group relative">
                <input
                  type="password"
                  placeholder="Passcode"
                  className="block w-full rounded-full border border-white/10 bg-black/20 py-4 px-6 text-sm font-light text-white placeholder-slate-400 focus:border-[#00C2FF]/50 focus:ring-1 focus:ring-[#00C2FF]/50 focus:bg-black/40 focus:outline-none transition-all backdrop-blur-sm"
                />
              </div>

              <button
                type="submit"
                className="hover:bg-[#33d1ff] hover:shadow-[0_0_30px_rgba(0,194,255,0.4)] transition-all duration-300 text-sm font-medium text-black bg-[#00C2FF] w-full rounded-full py-4 shadow-[0_0_20px_rgba(0,194,255,0.2)] cursor-pointer mt-2"
              >
                {isSignUp ? 'Create Account' : 'Enter Simulator'}
              </button>

              <div className="space-y-4">
                <div className="flex items-center gap-3 pt-4">
                  <div className="h-px bg-white/10 flex-1"></div>
                  <span className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">
                    Or
                  </span>
                  <div className="h-px bg-white/10 flex-1"></div>
                </div>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setIsSignUp(!isSignUp)}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {isSignUp
                      ? 'Already have an account? Sign In'
                      : "Don't have an account? Sign Up"}
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={onLogin}
                    className="flex items-center justify-center gap-2 py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all text-sm font-medium text-slate-300 hover:text-white group backdrop-blur-sm"
                  >
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    <span className="group-hover:text-white">Google</span>
                  </button>
                  <button
                    type="button"
                    onClick={onLogin}
                    className="flex items-center justify-center gap-2 py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all text-sm font-medium text-slate-300 hover:text-white group backdrop-blur-sm"
                  >
                    <svg
                      className="w-4 h-4 fill-current"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.05 20.28c-.98.95-2.05.88-3.08.38-1.09-.53-2.04-.53-3.14 0-1.12.53-2.14.59-3.08-.38-4.04-4.18-3.41-10.4 1.48-10.4 1.5 0 2.58.94 3.38.94 0.78 0 2.22-.97 3.84-.91 1.56.06 2.75.72 3.5 1.78-3.12 1.84-2.59 5.81 0.44 7.03-0.66 1.69-1.66 3.38-2.69 4.38h-0.03l-0.09-0.12z" />
                      <path d="M12.03 7.25c-0.16-2.59 2.09-4.84 4.56-5.06 0.22 2.75-2.47 4.97-4.56 5.06z" />
                    </svg>
                    <span className="group-hover:text-white">Apple</span>
                  </button>
                </div>
              </div>
            </form>
            
            {!isSignUp && (
              <>
                <div className="w-full border-t border-white/10 my-8"></div>

                {/* Indoc Agent Trigger Button */}
                <button
                  onClick={onOpenIndoc}
                  className="group flex hover:border-[#E000FF]/50 transition-all duration-300 cursor-pointer bg-gradient-to-r from-[#E000FF]/10 to-[#E000FF]/5 w-full border-[#E000FF]/20 border rounded-2xl pt-4 pr-4 pb-4 pl-4 relative items-center justify-between backdrop-blur-sm hover:shadow-[0_0_25px_rgba(224,0,255,0.15)]"
                >
                  {/* Animation Beam */}
                  <div className="absolute inset-0 rounded-2xl overflow-hidden [mask-image:linear-gradient(white,white),linear-gradient(white,white)] [-webkit-mask-clip:content-box,border-box] [mask-clip:content-box,border-box] [-webkit-mask-composite:xor] [mask-composite:exclude] p-[1px] pointer-events-none">
                    <div className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,transparent_0_270deg,#E000FF_360deg)] animate-[spin_4s_linear_infinite]"></div>
                  </div>

                  <div className="flex items-center gap-4 z-10">
                    <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-[#E000FF] shadow-lg shrink-0">
                      <MessageCircle className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-mono text-[#E000FF] uppercase tracking-wider mb-0.5">
                        Indoc Agent
                      </p>
                      <p className="text-sm font-medium text-white group-hover:text-[#E000FF]/90 transition-colors">
                        Check In With Questions
                      </p>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 text-slate-400 z-10 group-hover:text-white transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </button>
              </>
            )}

          </div>
        </div>

        <p className="absolute bottom-6 text-[10px] font-mono text-slate-500 tracking-widest opacity-50">
          SYSTEM v1.2.5 // SECURE CONNECTION
        </p>
      </main>

      {/* Chat Modal for Indoc Agent */}
      <ChatModal
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        messages={messages}
        setMessages={setMessages}
        agentName="Indoc Agent"
        isDark={true}
      />
    </>
  );
};
