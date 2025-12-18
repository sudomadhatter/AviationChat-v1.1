"use client"

import React, { useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  onStartChat: (message: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onStartChat }) => {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onStartChat(inputValue);
      setInputValue(''); // Optional: clear after sending
    }
  };

  const handleSendClick = () => {
    onStartChat(inputValue);
    setInputValue('');
  };

  return (
    <section className="flex flex-col min-h-[50vh] animate-in fade-in slide-in-from-bottom-8 duration-700 text-center w-full max-w-3xl mr-auto ml-auto items-center justify-center">
      {/* System Status Pill - Updated to Green */}
      <div className="inline-flex uppercase text-xs font-normal text-[#24FF00] tracking-wide bg-[#24FF00]/10 border-[#24FF00]/20 border rounded-full mb-6 pt-1 pr-3 pb-1 pl-3 gap-x-2 gap-y-2 items-center shadow-[0_0_15px_rgba(36,255,0,0.2)]">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#24FF00] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#24FF00]"></span>
        </span>
        SYSTEM.ACTIVE
      </div>

      <h1 className="md:text-6xl text-5xl font-normal text-slate-900 dark:text-white tracking-tight mb-4 drop-shadow-2xl transition-colors">
        Specialist Agent
      </h1>
      <p className="md:text-xl leading-relaxed text-lg font-light text-slate-600 dark:text-slate-400 max-w-xl mb-10 transition-colors">
        Ask questions to prepare for your Checkride Oral. Take Personalized Assessments or Quizzes
      </p>

      {/* Interactive Input */}
      <div className="w-full relative group">
        <div className="-inset-1 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-[#24FF00]/20 via-purple-500/20 to-[#24FF00]/20 opacity-0 rounded-full absolute blur-md"></div>
        <div className="flex transition-all duration-300 group-hover:border-black/20 dark:group-hover:border-white/20 group-focus-within:border-[#24FF00]/50 group-focus-within:bg-white/90 dark:group-focus-within:bg-black/40 group-focus-within:ring-1 group-focus-within:ring-[#24FF00]/50 bg-white/90 dark:bg-white/5 border-black/10 dark:border-white/10 border rounded-full relative shadow-2xl backdrop-blur-md items-center">
          
          <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none z-0" style={{ padding: '2px', mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', maskComposite: 'exclude', WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor' }}>
            {/* Keeping the purple spinner as requested */}
            <div className="absolute top-1/2 left-1/2 w-[200%] h-[200%] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,transparent_0_60%,#E000FF_100%)] animate-[spin_4s_linear_infinite] opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
          </div>

          <div className="z-10 text-slate-500 pl-6 relative">
            <Sparkles className="w-6 h-6" />
          </div>
          
          <input 
            type="text" 
            placeholder="Ask Specialist...." 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="border-none placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-0 dark:text-white z-10 transition-colors text-lg font-light text-slate-900 bg-transparent w-full pt-6 pr-4 pb-6 pl-4 relative" 
          />
          
          <button 
            onClick={handleSendClick}
            className="mr-2 p-3 bg-[#24FF00]/60 hover:bg-[#24FF00] text-black rounded-full transition-all duration-300 glow-green relative z-10 backdrop-blur-sm"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Suggestions */}
      <div className="mt-6 w-full max-w-full">
        <div className="flex gap-3 overflow-x-auto whitespace-nowrap pb-2 no-scrollbar">
          {['What is Vso?', 'What Regs do I need to know to solo', 'Airspace requirements', 'Quiz me on Weather'].map(tag => (
            <button 
              key={tag} 
              onClick={() => setInputValue(tag)}
              className="px-4 py-2 rounded-full border border-black/10 dark:border-white/5 bg-white/90 dark:bg-white/5 hover:bg-white/90 dark:hover:bg-white/10 hover:border-[#24FF00]/30 hover:text-[#24FF00] text-sm font-light text-slate-600 dark:text-slate-400 transition-all backdrop-blur-md flex-shrink-0"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
