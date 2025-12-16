"use client"

import React from 'react';
import { Film } from 'lucide-react';

export const VideoTraining: React.FC = () => {
  const videos = [
    {
      title: "Traffic Pattern Operations",
      subtitle: "Standard entry and exit procedures.",
      time: "04:20",
      image: "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?auto=format&fit=crop&q=80&w=600"
    },
    {
      title: "Weather Theory: Thunderstorms",
      subtitle: "Stages of development and hazards.",
      time: "12:15",
      image: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/917d6f93-fb36-439a-8c48-884b67b35381_1600w.jpg"
    },
    {
      title: "G1000 Essentials",
      subtitle: "PFD layout and basic scanning.",
      time: "08:45",
      image: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/4734259a-bad7-422f-981e-ce01e79184f2_1600w.jpg"
    }
  ];

  return (
    <section className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-normal tracking-tight flex items-center gap-2 text-slate-900 dark:text-white transition-colors">
          <Film className="text-[#00C2FF] w-5 h-5" />
          Flight Briefings
        </h2>
        <a href="#" className="text-xs font-normal text-[#00C2FF] hover:text-white transition-colors uppercase tracking-widest">
          View All
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {videos.map((vid, idx) => (
          <div key={idx} className="group cursor-pointer">
            <div className="relative aspect-video rounded-xl overflow-hidden mb-3 border border-black/10 dark:border-white/10 group-hover:border-[#00C2FF]/50 transition-all bg-white/90 dark:bg-slate-800">
              <img 
                src={vid.image} 
                alt="Video Thumbnail" 
                className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500" 
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-12 h-12 rounded-full bg-white/90 dark:bg-white/10 backdrop-blur-md flex items-center justify-center border border-black/10 dark:border-white/20">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none" className="text-slate-900 dark:text-white ml-1">
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                </div>
              </div>
              <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/70 text-[10px] font-normal text-white">
                {vid.time}
              </span>
            </div>
            <h4 className="text-sm font-normal group-hover:text-[#00C2FF] transition-colors mb-1 text-slate-800 dark:text-slate-200">
              {vid.title}
            </h4>
            <p className="text-xs text-slate-500">{vid.subtitle}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
