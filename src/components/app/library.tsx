"use client"

import React from 'react';
import { Library as LibraryIcon, BookOpen, Download, FileText, Map as MapIcon, CheckSquare } from 'lucide-react';

export const Library: React.FC = () => {
  const items = [
    {
      title: "PHAK Manual",
      meta: "PDF • 45MB",
      icon: <BookOpen className="w-5 h-5" />
    },
    {
      title: "ACS Guide",
      meta: "Private Pilot",
      icon: <FileText className="w-5 h-5" />
    },
    {
      title: "AFH Manual",
      meta: "PDF • 15MB",
      icon: <BookOpen className="w-5 h-5" />
    },
    {
      title: "CFR 14 Part 91",
      meta: "Regulation",
      icon: <FileText className="w-5 h-5" />
    }
  ];

  return (
    <section className="w-full pb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-normal text-slate-900 dark:text-white tracking-tight flex items-center gap-2 transition-colors">
          <LibraryIcon className="text-[#00C2FF] w-5 h-5" />
          Library & Downloads
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((item, idx) => (
          <div key={idx} className="flex hover:border-black/20 dark:hover:border-white/20 transition-colors group fx-glass bg-gradient-to-b from-white/90 via-white/90 to-white/90 dark:from-white/10 dark:via-white/0 dark:to-white/10 border-black/10 dark:border-white/10 border rounded-xl px-4 py-4 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors">
                {item.icon}
              </div>
              <div>
                <p className="text-sm font-normal group-hover:text-[#00C2FF] transition-colors text-slate-900 dark:text-white">
                  {item.title}
                </p>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider">
                  {item.meta}
                </p>
              </div>
            </div>
            <button className="text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
              <Download className="w-[18px] h-[18px]" />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};
