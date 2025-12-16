import React, { useState } from 'react';
import { X, CheckCircle, BookOpen, Layers, ExternalLink, GraduationCap, GripHorizontal, ChevronUp } from 'lucide-react';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

interface DrawerItem {
  id: string;
  type: 'source' | 'quiz' | 'assessment';
  title: string;
  subtitle: string;
  tag: string;
  date: string;
}

export const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, onOpen }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'sources' | 'assessments'>('all');

  const items: DrawerItem[] = [
    {
      id: '1',
      type: 'source',
      title: '14 CFR § 91.113 - Right-of-way rules',
      subtitle: 'Federal Aviation Regulations',
      tag: 'REGULATION',
      date: 'Generated 2m ago'
    },
    {
      id: '2',
      type: 'source',
      title: 'PHAK Chapter 5: Aerodynamics',
      subtitle: 'Pilot’s Handbook of Aeronautical Knowledge',
      tag: 'MANUAL',
      date: 'Generated 2m ago'
    },
    {
      id: '3',
      type: 'quiz',
      title: 'VFR Weather Minimums Quiz',
      subtitle: '10 Questions • Multiple Choice',
      tag: 'QUIZ',
      date: 'Ready to start'
    },
    {
      id: '4',
      type: 'assessment',
      title: 'Pre-Solo Written Assessment',
      subtitle: 'Comprehensive Knowledge Check',
      tag: 'EXAM',
      date: 'Pending'
    }
  ];

  const filteredItems = activeTab === 'all' 
    ? items 
    : activeTab === 'sources' 
      ? items.filter(i => i.type === 'source')
      : items.filter(i => i.type === 'quiz' || i.type === 'assessment');

  return (
    <>
      {/* TRIGGER BAR */}
      <div 
        onClick={onOpen}
        className={`fixed z-[90] bg-white/95 dark:bg-[#0a0a0a]/95 backdrop-blur-xl border-black/10 dark:border-white/10
          cursor-pointer group transition-all duration-500 cubic-bezier(0.32, 0.72, 0, 1)
          hover:bg-white dark:hover:bg-black/80 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] dark:shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.5)]
          flex items-center justify-center gap-2
          
          /* Mobile/Tablet: Bottom Right Tab - Compact & Offset */
          bottom-0 right-6 left-auto h-8 w-auto px-4 rounded-t-xl border-t border-x border-b-0
          ${isOpen ? 'translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'}

          /* Desktop (lg): Right Side Tab */
          lg:bottom-auto lg:left-auto lg:top-1/2 lg:right-0 lg:h-auto lg:w-12 lg:py-8 lg:px-0
          lg:rounded-l-2xl lg:rounded-tr-none lg:rounded-br-none lg:rounded-tl-2xl lg:rounded-bl-2xl 
          lg:border-y lg:border-l lg:border-r-0 lg:border-t lg:flex-col
          lg:-translate-y-1/2
          ${isOpen ? 'lg:translate-x-full lg:opacity-0' : 'lg:translate-x-0 lg:opacity-100'}
        `}
      >
        <div className="flex items-center gap-2 group-hover:-translate-y-0.5 lg:group-hover:translate-y-0 lg:group-hover:-translate-x-0.5 transition-transform duration-300 lg:flex-col">
           <span className="font-geist-mono text-[10px] tracking-[0.2em] uppercase text-[#24FF00]/80 font-medium drop-shadow-[0_0_8px_rgba(36,255,0,0.2)] lg:[writing-mode:vertical-rl] lg:rotate-180">
             Flight.Logs
           </span>
           <ChevronUp className="w-3.5 h-3.5 text-[#24FF00]/80 drop-shadow-[0_0_5px_rgba(36,255,0,0.2)] lg:-rotate-90" />
        </div>
      </div>

      {/* BACKDROP */}
      <div 
        className={`fixed inset-0 z-[190] bg-white/20 dark:bg-black/40 backdrop-blur-sm transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* DRAWER CONTAINER */}
      <div 
        className={`
          fixed z-[200] transform transition-transform duration-500 cubic-bezier(0.32, 0.72, 0, 1) shadow-2xl
          
          /* Mobile/Tablet: Bottom Sheet */
          bottom-0 left-0 right-0 flex justify-center
          ${isOpen ? 'translate-y-0' : 'translate-y-[110%]'}

          /* Desktop (lg): Right Sidebar */
          lg:bottom-0 lg:top-0 lg:left-auto lg:right-0 lg:w-[480px] lg:h-screen lg:block lg:translate-y-0
          ${isOpen ? 'lg:translate-x-0' : 'lg:translate-x-[110%]'}
        `}
      >
        <div className="w-full lg:w-full lg:h-full lg:mx-0">
          <div className={`
            bg-white/90 dark:bg-[#0a0a0a]/95 backdrop-blur-2xl border-black/10 dark:border-white/10 overflow-hidden flex flex-col
            
            /* Mobile/Tablet Styles */
            rounded-t-3xl border-t border-x shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] dark:shadow-[0_-10px_40px_-15px_rgba(255,255,255,0.05)]
            h-[85vh]

            /* Desktop Styles */
            lg:h-full lg:max-h-full lg:rounded-none lg:rounded-l-3xl lg:border-l lg:border-y-0 lg:border-r-0 lg:shadow-[-10px_0_40px_-15px_rgba(0,0,0,0.1)]
          `}>
            
            {/* Header / Handle */}
            <div className="flex-shrink-0 relative pt-3 pb-4 px-6 border-b border-black/5 dark:border-white/5">
              <div 
                className="absolute top-3 left-1/2 transform -translate-x-1/2 text-slate-300 dark:text-slate-600 cursor-pointer hover:text-slate-500 dark:hover:text-slate-400 lg:hidden"
                onClick={onClose}
              >
                <div className="w-12 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700/50"></div>
              </div>
              
              <div className="mt-8 lg:mt-2 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#24FF00]/10 text-[#24FF00]">
                    <Layers className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-medium text-slate-900 dark:text-white tracking-tight">Mission Data</h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-mono uppercase tracking-wider">Generated Resources & References</p>
                  </div>
                </div>
                
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex gap-2 mt-6 overflow-x-auto no-scrollbar">
                {[
                  { id: 'all', label: 'All Items' },
                  { id: 'sources', label: 'Sources' },
                  { id: 'assessments', label: 'Quizzes & Exams' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'bg-slate-900 dark:bg-white text-white dark:text-black shadow-lg'
                        : 'bg-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 scroll-smooth bg-slate-50/50 dark:bg-black/20 pb-24 lg:pb-6 relative">
               {/* Watermark for Light Mode */}
               <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none dark:hidden">
                  <img src="/assets/AviationChat.png" alt="Watermark" className="w-64 h-64 object-contain grayscale" />
               </div>

              <div className="grid grid-cols-1 gap-4 relative z-10">
                {filteredItems.map((item) => (
                  <div 
                    key={item.id}
                    className="group relative bg-white/60 dark:bg-white/5 border border-black/5 dark:border-white/5 hover:border-[#24FF00]/30 dark:hover:border-[#24FF00]/30 rounded-xl p-4 transition-all duration-300 hover:shadow-lg hover:shadow-[#24FF00]/5 backdrop-blur-sm flex flex-col gap-3"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-start gap-3">
                        <div className={`mt-1 p-2 rounded-lg ${
                          item.type === 'source' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-500' :
                          item.type === 'quiz' ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-500' :
                          'bg-green-50 dark:bg-green-900/20 text-green-500'
                        }`}>
                          {item.type === 'source' ? <BookOpen className="w-4 h-4" /> : 
                           item.type === 'quiz' ? <CheckCircle className="w-4 h-4" /> : 
                           <GraduationCap className="w-4 h-4" />}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${
                              item.type === 'source' ? 'border-blue-200 text-blue-600 dark:border-blue-800 dark:text-blue-400' :
                              item.type === 'quiz' ? 'border-purple-200 text-purple-600 dark:border-purple-800 dark:text-purple-400' :
                              'border-green-200 text-green-600 dark:border-green-800 dark:text-green-400'
                            }`}>
                              {item.tag}
                            </span>
                            <span className="text-[10px] text-slate-400">{item.date}</span>
                          </div>
                          <h3 className="text-base font-medium text-slate-900 dark:text-white leading-tight mb-0.5 group-hover:text-[#24FF00] transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {item.subtitle}
                          </p>
                        </div>
                      </div>
                      <button className="text-slate-300 hover:text-[#24FF00] transition-colors">
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
