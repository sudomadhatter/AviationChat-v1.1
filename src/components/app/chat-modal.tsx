import React, { useEffect, useRef, useState } from 'react';
import { X, Send, Paperclip, Mic } from 'lucide-react';

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  agentName: string;
  isDark?: boolean;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp?: string;
}

export const ChatModal: React.FC<ChatModalProps> = ({ isOpen, onClose, messages, setMessages, agentName, isDark = true }) => {
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Define accent colors based on agent (Purple for Indoc, Cyan for Specialist)
  const isIndoc = agentName.includes('Indoc');
  const accentColor = isIndoc ? '#E000FF' : '#00C2FF';
  const accentClass = isIndoc ? 'text-[#E000FF]' : 'text-[#00C2FF]';
  const accentBgClass = isIndoc ? 'bg-[#E000FF]' : 'bg-[#00C2FF]';
  const accentBorderClass = isIndoc ? 'border-[#E000FF]' : 'border-[#00C2FF]';

  const handleSend = async () => {
    if (!inputValue.trim()) return;
    
    const now = new Date();
    const timeString = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')} ZULU`;

    const newUserMsg: Message = { 
      id: Date.now().toString(), 
      role: 'user', 
      content: inputValue,
      timestamp: timeString
    };
    
    setMessages(prev => [...prev, newUserMsg]);
    const currentInput = inputValue;
    setInputValue('');
    setIsTyping(true);

    try {
      // Map UI name to Backend Agent ID
      // "Indoc Agent" -> "indoc_agent"
      const agentId = agentName.toLowerCase().includes('indoc') ? 'indoc_agent' : 'specialist_agent';
      
      // Use a demo session ID for now. In a real app, this should come from AuthContext.
      const sessionId = 'demo-session-001';

      // Call the ADK Agent Backend (Proxied via Next.js to avoid CORS/Mixed Content)
      const response = await fetch(`/api/agents/${agentId}/sessions/${sessionId}/turn`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: currentInput }), 
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // ADK response usually contains 'text' or 'content'
      const data = await response.json();
      const agentResponse = data.text || data.content || "I received your message but couldn't process the response.";
      
      setMessages(prev => [...prev, { 
        id: Date.now().toString(), 
        role: 'assistant', 
        content: agentResponse,
        timestamp: timeString
      }]);
    } catch (error) {
      console.error("Error connecting to Agent:", error);
      setMessages(prev => [...prev, { 
        id: Date.now().toString(), 
        role: 'assistant', 
        content: "I'm sorry, I'm having trouble connecting to the flight deck (Backend). Please ensure the backend server is running.",
        timestamp: timeString
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, isOpen]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Drawer Animation Logic: Bottom-anchored, slides up
  const drawerClasses = isOpen 
    ? 'translate-y-0 opacity-100 pointer-events-auto' 
    : 'translate-y-[110%] opacity-0 pointer-events-none';

  return (
    <div className={isDark ? 'dark' : ''}>
      {/* Backdrop for click-to-close and visual dimming */}
      <div 
        className={`fixed inset-0 z-40 transition-opacity duration-500 bg-black/60 dark:bg-black/60 backdrop-blur-sm ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
        onTouchMove={(e) => e.preventDefault()} // Prevent scroll on backdrop
      />

      <div 
        id="chat-drawer" 
        className={`fixed inset-x-0 bottom-0 top-[5%] md:top-[15%] md:inset-x-[5%] z-50 transform transition-all duration-700 cubic-bezier(0.16, 1, 0.3, 1) flex flex-col rounded-t-3xl md:rounded-3xl overflow-hidden shadow-2xl ring-1 ring-black/5 dark:ring-white/10 ${drawerClasses} bg-white/95 dark:bg-[#0a0a0c]/90 backdrop-blur-xl border border-black/5 dark:border-white/10`}
        // Prevent background scrolling when touch/scroll interactions occur within the modal
        onTouchMove={(e) => e.stopPropagation()}
        onWheel={(e) => e.stopPropagation()}
      >
        {/* PFD Grid Overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(100,100,100,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(100,100,100,0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

        {/* Header */}
        <header className="relative z-10 flex items-center justify-between px-6 py-5 border-b border-black/5 dark:border-white/5 bg-white/50 dark:bg-black/20 backdrop-blur-md shrink-0">
          {/* Left: Agent Status */}
          <div className="flex items-center gap-4">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br from-[${accentColor}]/20 to-white/5 border border-black/5 dark:border-white/10 flex items-center justify-center relative overflow-hidden`}>
              <div className="absolute inset-0 bg-black/5 dark:bg-white/5 animate-pulse"></div>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-900 dark:text-white relative z-10">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight leading-none">
                {agentName}
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#24FF00] shadow-[0_0_6px_#24FF00]"></span>
                <span className="text-[10px] font-mono font-bold text-[#24FF00] tracking-widest uppercase">
                  Online // 128ms
                </span>
              </div>
            </div>
          </div>

          {/* Center: Visual Decorative */}
          <div className="hidden md:flex flex-col items-center opacity-30">
            <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-black dark:via-white to-transparent"></div>
            <div className="text-[9px] font-mono mt-1 text-center tracking-[0.3em] font-bold text-slate-900 dark:text-white">
              FLIGHT DECK INTERFACE
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-3">
            <button onClick={onClose} className="w-9 h-9 flex items-center justify-center rounded-lg bg-black/5 dark:bg-white/5 hover:bg-red-500/10 dark:hover:bg-red-500/20 text-slate-600 dark:text-slate-300 hover:text-red-500 dark:hover:text-red-400 transition-colors border border-black/10 dark:border-white/10 hover:border-red-500/30">
              <X className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Chat Body */}
        <div 
          className="flex-1 overflow-y-auto no-scrollbar relative p-4 md:p-8 space-y-8 z-10 overscroll-contain"
          // Ensure this container captures scroll events
          onTouchMove={(e) => e.stopPropagation()}
          onWheel={(e) => e.stopPropagation()}
        >
          {/* HUD Watermark - Responsive Sizing & Light Mode Visibility */}
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.03] w-full flex items-center justify-center">
            <img 
              src="/assets/AviationChat.png" 
              className="w-[60%] max-w-[280px] md:max-w-[384px] h-auto grayscale object-contain" 
              alt="Watermark"
            />
          </div>

          {messages.map((msg) => (
            <div key={msg.id} className={`flex items-start gap-4 max-w-3xl ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}>
               {/* Avatar */}
               <div className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 mt-1 ${
                  msg.role === 'assistant' 
                  ? `${accentBgClass}/10 dark:${accentBgClass}/20 border border-black/10 dark:${accentBorderClass}/30` 
                  : 'bg-[#24FF00]/10 dark:bg-[#24FF00]/20 border border-[#24FF00]/20 dark:border-[#24FF00]/30'
               }`}>
                  {msg.role === 'assistant' ? (
                     <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={accentClass}>
                      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                      <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                      <line x1="12" x2="12" y1="19" y2="22"></line>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#24FF00]">
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  )}
               </div>

               {/* Content */}
               <div className={`space-y-2 ${msg.role === 'user' ? 'text-right' : ''}`}>
                  <div className={`flex items-baseline gap-2 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                    <span className={`text-xs font-bold tracking-wide ${msg.role === 'user' ? 'text-[#24FF00]' : accentClass}`}>
                      {msg.role === 'user' ? 'PILOT' : agentName.toUpperCase()}
                    </span>
                    <span className="text-[10px] font-mono font-medium text-slate-500">
                      {msg.timestamp || '14:02 ZULU'}
                    </span>
                  </div>
                  <div className={`p-5 backdrop-blur-sm font-medium leading-relaxed shadow-sm text-left transition-colors duration-300 ${
                    msg.role === 'user'
                    ? 'rounded-l-2xl rounded-br-2xl bg-[#24FF00]/10 border border-[#24FF00]/20 text-slate-900 dark:text-white shadow-[0_0_15px_rgba(36,255,0,0.05)]'
                    : 'rounded-r-2xl rounded-bl-2xl bg-white/60 dark:bg-white/5 border border-black/5 dark:border-white/10 text-slate-900 dark:text-white'
                  }`}>
                    <p>{msg.content}</p>
                  </div>
               </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-start gap-4 max-w-3xl">
              <div className={`w-8 h-8 rounded-full ${accentBgClass}/10 dark:${accentBgClass}/20 border border-black/10 dark:${accentBorderClass}/30 flex items-center justify-center shrink-0 mt-1`}>
                 <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={accentClass}>
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                </svg>
              </div>
              <div className="p-5 rounded-r-2xl rounded-bl-2xl bg-white/60 dark:bg-white/5 border border-black/5 dark:border-white/10 backdrop-blur-sm">
                 <div className="flex gap-1">
                  <span className={`w-1 h-1 ${accentBgClass} rounded-full animate-bounce`} style={{ animationDelay: '0ms' }}></span>
                  <span className={`w-1 h-1 ${accentBgClass} rounded-full animate-bounce`} style={{ animationDelay: '150ms' }}></span>
                  <span className={`w-1 h-1 ${accentBgClass} rounded-full animate-bounce`} style={{ animationDelay: '300ms' }}></span>
                </div>
              </div>
            </div>
          )}

          {/* Spacer for input area */}
          <div className="h-32"></div>
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="absolute bottom-0 left-0 right-0 p-6 z-20 bg-gradient-to-t from-white/90 via-white/60 to-transparent dark:from-black/90 dark:via-black/60 dark:to-transparent transition-colors duration-300">
          <div className="relative max-w-4xl mx-auto group">
            <div className={`absolute -inset-0.5 bg-gradient-to-r from-[#00C2FF] to-[${accentColor}] rounded-full opacity-10 dark:opacity-20 group-hover:opacity-30 dark:group-hover:opacity-40 blur transition duration-500`}></div>
            <div className="relative flex items-center bg-white dark:bg-[#0a0a0c] rounded-full border border-black/10 dark:border-white/10 shadow-xl transition-colors duration-300">
               <div className="pl-5 pr-3 text-slate-400 dark:text-slate-500">
                <Paperclip className="w-5 h-5" />
              </div>

              <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={`Ask ${agentName}...`} 
                className="w-full bg-transparent border-none py-4 px-2 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:ring-0 focus:outline-none text-base font-medium"
              />

              <button onClick={handleSend} className="m-2 p-2.5 rounded-full bg-[#24FF00]/10 dark:bg-[#24FF00]/20 text-[#1eb300] dark:text-[#24FF00] hover:bg-[#24FF00] hover:text-white dark:hover:text-black border border-[#24FF00]/20 transition-all hover:scale-105 shadow-[0_0_15px_rgba(36,255,0,0.1)]">
                {inputValue ? <Send className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>
            </div>
            <div className="flex justify-between items-center px-4 mt-2">
              <span className="text-[9px] font-mono font-medium text-slate-400 dark:text-slate-600">ENCRYPTED // TLS 1.3</span>
              <span className="text-[9px] font-mono font-medium text-slate-400 dark:text-slate-600">LAT: 34.0522 N // LON: 118.2437 W</span>
            </div>
          </div>
        </div>

        {/* Decorative Corners for PFD look */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#00C2FF]/20 dark:border-[#00C2FF]/30 rounded-tl-2xl pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#00C2FF]/20 dark:border-[#00C2FF]/30 rounded-tr-2xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#00C2FF]/20 dark:border-[#00C2FF]/30 rounded-bl-2xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#00C2FF]/20 dark:border-[#00C2FF]/30 rounded-br-2xl pointer-events-none"></div>
      </div>
    </div>
  );
};
