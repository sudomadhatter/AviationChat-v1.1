'use client'

import React, { useState } from 'react';
import { Sun, Moon, Menu, ChevronRight, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface NavbarProps {
  isDark: boolean;
  toggleTheme: () => void;
  onLogout: () => void;
  userName?: string | null;
  userInitials?: string | null;
}

export const Navbar: React.FC<NavbarProps> = ({ isDark, toggleTheme, onLogout, userName, userInitials }) => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const navItems = ['Voice Agents', 'Briefings', 'Library'];
  
  const displayName = userName || 'Capt. Maverick';
  const displayInitials = userInitials || 'CP';

  return (
    <nav 
      id="top-nav" 
      className="nav-locked flex items-center justify-center gap-5 md:gap-4 px-6 py-2 md:py-3 transition-all duration-500 ease-out dark:bg-black/40 dark:border-white/10 dark:ring-white/5 bg-white/90 border-black/10 border ring-black/5 ring-1 rounded-full backdrop-blur-xl z-50 relative w-fit mx-auto"
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5 group cursor-pointer" onClick={() => router.push('/dashboard')}>
        <div className="relative shrink-0 flex items-center justify-center">
          <div className="absolute inset-0 bg-[#00C2FF] blur-md opacity-20 rounded-full group-hover:opacity-40 transition-opacity"></div>
          {/* Logo Image */}
          <img 
            src="/assets/AviationChat.png" 
            alt="AVIATIONCHAT Logo" 
            className="z-10 w-8 h-8 object-contain relative shrink-0" 
          />
        </div>
        <span className="font-normal tracking-tight text-sm hidden lg:block text-slate-900 dark:text-white">
          AVIATIONCHAT
        </span>
      </div>

      {/* Mobile Menu Toggle */}
      <div className="md:hidden relative group">
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          className="p-1 text-slate-400 hover:text-white transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
        {isMenuOpen && (
          <div className="absolute top-full left-1.5 -translate-x-1/2 mt-6 w-48 bg-white/90 dark:bg-[#0a0a0a]/95 border border-black/10 dark:border-white/10 rounded-xl p-1 flex flex-col gap-0.5 shadow-[0_0_50px_-10px_rgba(36,255,0,0.3)] ring-1 ring-black/5 dark:ring-white/5 backdrop-blur-xl z-50">
            {navItems.map((item) => (
              <a 
                key={item} 
                href="#" 
                className="block px-3 py-2 text-xs text-slate-600 dark:text-slate-300 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 rounded-lg transition-colors text-center font-normal"
              >
                {item}
              </a>
            ))}
             <div className="h-px bg-white/10 my-0.5"></div>
             <button 
                onClick={onLogout}
                className="w-full block px-3 py-2 text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors text-center font-normal"
              >
                Logout
              </button>
          </div>
        )}
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-8">
        {navItems.map((item) => (
          <a 
            key={item} 
            href="#" 
            className="text-xs font-normal text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white hover:drop-shadow-[0_0_8px_rgba(0,0,0,0.2)] dark:hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all"
          >
            {item}
          </a>
        ))}
      </div>

      {/* Profile & Theme */}
      <div className="flex items-center pl-2 border-l border-white/10 ml-0 md:ml-[-10px]">
        <button 
          onClick={toggleTheme} 
          className="dark:text-slate-400 hover:text-black dark:hover:text-white transition-colors text-slate-600 mr-2 p-1 relative" 
          aria-label="Toggle Theme"
        >
          {isDark ? <Moon className="w-[18px] h-[18px]" /> : <Sun className="w-[18px] h-[18px]" />}
        </button>

        <div className="relative">
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="group flex items-center gap-2 ml-2 md:ml-4 pr-1"
          >
            <div className="h-7 w-7 rounded-full bg-gradient-to-br from-[#24FF00] to-green-600 p-[1px] shadow-[0_0_15px_rgba(36,255,0,0.4)] group-hover:scale-110 transition-transform duration-300">
              <div className="h-full w-full rounded-full bg-black flex items-center justify-center">
                <span className="text-[9px] font-semibold text-white">{displayInitials}</span>
              </div>
            </div>
            <ChevronRight className={`w-3.5 h-3.5 text-slate-500 group-hover:text-black dark:group-hover:text-white transition-transform duration-200 hidden md:block ${isProfileOpen ? 'rotate-90' : ''}`} />
          </button>
          
          {isProfileOpen && (
             <div className="absolute top-full right-0 mt-4 w-40 bg-white/90 dark:bg-[#0a0a0a]/95 border border-black/10 dark:border-white/10 rounded-xl p-2 shadow-xl ring-1 ring-black/5 dark:ring-white/5 backdrop-blur-xl z-50">
                <div className="px-3 py-2 text-xs text-slate-500 dark:text-slate-400 border-b border-white/5 mb-1">
                   {displayName}
                </div>
                <button 
                  onClick={onLogout}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-600 dark:text-slate-300 hover:text-red-400 dark:hover:text-red-400 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Logout
                </button>
             </div>
          )}
        </div>
      </div>
    </nav>
  );
};
