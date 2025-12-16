"use client"

import React from 'react';
import { Mic } from 'lucide-react';

export const AgentCards: React.FC = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 w-full perspective-container gap-x-6 gap-y-6">
      
      {/* INSTRUCTOR CARD */}
      <div className="floating-card delay-anim-1 group overflow-hidden hover:border-[#00C2FF]/30 transition-all duration-500 flex flex-col 
        dark:from-white/20 dark:via-white/0 dark:to-white/20 dark:ring-gray-400/50 
        bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] 
        from-white/40 via-white/10 to-white/40 
        backdrop-blur-xl h-[640px] z-10 border-sky-500/20 border rounded-3xl ring-gray-200/50 ring-2 relative shadow-2xl pb-32 fx-glass">
        {/* Card UI Overlays */}
        <div className="absolute top-5 left-5 flex gap-1.5 z-30 opacity-80">
          <div className="w-1.5 h-1.5 rounded-full bg-[#00C2FF]"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-[#00C2FF]/40 animate-pulse"></div>
        </div>
        <div className="absolute top-5 right-5 z-30 opacity-90">
          <span className="font-geist-mono text-[10px] tracking-widest text-[#00C2FF] uppercase font-normal drop-shadow-[0_0_8px_rgba(0,194,255,0.6)]">Sys.Online</span>
        </div>
        <div className="absolute bottom-5 left-5 w-3 h-3 border-b border-l border-[#00C2FF]/40 rounded-bl-sm z-30"></div>
        <div className="absolute bottom-5 right-5 w-3 h-3 border-b border-r border-[#00C2FF]/40 rounded-br-sm z-30"></div>
        
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-transparent dark:to-black pointer-events-none"></div>

        {/* Content */}
        <div className="flex flex-1 w-full z-10 mt-6 relative items-center justify-center">
          <div className="absolute w-[280px] h-[280px] bg-[#00C2FF]/10 blur-[90px] rounded-full pointer-events-none"></div>
          <img 
            src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/a3225bd1-8bf6-4ce1-8f53-bbdba21154b3_800w.png" 
            alt="Aviation Headset" 
            className="transform group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] object-auto z-10 opacity-100 w-[95%] h-auto max-w-[340px] relative drop-shadow-2xl" 
          />
        </div>

        <div className="z-20 flex flex-col text-center px-8 relative items-center mb-4">
          <span className="uppercase text-xs font-normal text-[#00C2FF] tracking-widest opacity-90 mb-3">AI Voice Agent</span>
          <h3 className="text-3xl font-medium text-slate-900 dark:text-white tracking-tight mb-3 transition-colors">The Instructor</h3>
          <p className="text-slate-600 dark:text-slate-400 font-light text-lg leading-relaxed max-w-sm mx-auto transition-colors">
            Interactive Socratic training. Review concepts in a low-pressure environment with guided mentorship.
          </p>
        </div>

        <div className="absolute bottom-0 left-0 w-full z-20 px-8 pb-10">
          <button 
            disabled
            className="flex transition-all duration-300 transform font-normal text-slate-900 dark:text-white bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-sky-400 to-[#125273] opacity-50 w-full rounded-full pt-4 pb-4 gap-x-2 gap-y-2 items-center justify-center cursor-not-allowed"
          >
            <Mic className="w-4 h-4" />
            Coming Soon
          </button>
        </div>
      </div>

      {/* DPE CARD */}
      <div className="floating-card delay-anim-2 group overflow-hidden hover:border-[#E000FF]/30 transition-all duration-500 flex flex-col 
        dark:from-white/20 dark:via-white/0 dark:to-white/20 dark:ring-zinc-400/50 
        bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] 
        from-white/40 via-white/10 to-white/40 
        backdrop-blur-xl h-[640px] z-10 border-fuchsia-500/20 border rounded-3xl ring-gray-200/50 ring-2 relative shadow-2xl pb-32 fx-glass">
        {/* Card UI Overlays */}
        <div className="absolute top-5 left-5 flex gap-1.5 z-30 opacity-80">
          <div className="w-1.5 h-1.5 rounded-full bg-[#E000FF]"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-[#E000FF]/40 animate-pulse"></div>
        </div>
        <div className="absolute top-5 right-5 z-30 opacity-90">
          <span className="font-geist-mono text-[10px] tracking-widest text-[#E000FF] uppercase font-normal drop-shadow-[0_0_8px_rgba(224,0,255,0.6)]">Sys.Ready</span>
        </div>
        <div className="absolute bottom-5 left-5 w-3 h-3 border-b border-l border-[#E000FF]/40 rounded-bl-sm z-30"></div>
        <div className="absolute bottom-5 right-5 w-3 h-3 border-b border-r border-[#E000FF]/40 rounded-br-sm z-30"></div>
        
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-transparent dark:to-black pointer-events-none"></div>

        {/* Content */}
        <div className="flex flex-1 z-10 w-full rounded-3xl mt-6 mb-0 relative items-center justify-center">
          <div className="absolute w-[280px] h-[280px] bg-[#E000FF]/10 blur-[90px] rounded-full pointer-events-none"></div>
          <img 
            src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/fba27af6-31dc-4cd1-8995-e24df92d2d57_800w.png" 
            alt="DPE Clipboard" 
            className="transform group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] w-[95%] h-auto max-w-[340px] object-contain z-10 relative drop-shadow-2xl" 
          />
        </div>

        <div className="z-20 flex flex-col text-center px-8 relative items-center mb-4">
          <span className="uppercase text-xs font-normal text-[#E000FF] tracking-widest opacity-90 mb-3">AI Voice Agent</span>
          <h3 className="text-3xl font-medium text-slate-900 dark:text-white tracking-tight mb-3 transition-colors">The DPE</h3>
          <p className="leading-relaxed text-lg font-light text-slate-600 dark:text-slate-400 max-w-sm mr-auto ml-auto transition-colors">
            High-stakes check ride simulation. Prepare for your oral exam with rigorous, standard-based questioning.
          </p>
        </div>

        <div className="absolute bottom-0 left-0 w-full z-20 px-8 pb-10">
          <button 
            disabled
            className="flex transition-all duration-300 transform font-normal text-slate-900 dark:text-white bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-[#e648fe]/40 to-[#71117e]/40 opacity-50 w-full rounded-full pt-4 pb-4 items-center justify-center cursor-not-allowed gap-2"
          >
            <Mic className="w-4 h-4" />
            Coming Soon
          </button>
        </div>
      </div>
    </section>
  );
};
