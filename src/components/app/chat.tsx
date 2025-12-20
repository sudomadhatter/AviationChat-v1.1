"use client";

import { useState, useRef, useEffect } from 'react';
import { Send, Bot } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import QuizCard from './quiz-card';

// --- CONFIG ---
// Now pointing to the Next.js Proxy instead of localhost direct
const API_ENDPOINT = '/api/chat';

type Message = {
  id: number;
  sender: 'user' | 'ai';
  text: string;
  isQuiz?: boolean;
};

const initialMessages: Message[] = [
  {
    id: 1,
    sender: 'ai',
    text: "Welcome to AviationChat! I'm Cap, your concierge. How can I help you get started with your flight training today?",
  }
];

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const userAvatar = PlaceHolderImages.find(p => p.id === 'user-avatar');
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    // Small timeout to allow DOM to update before scrolling
    setTimeout(() => {
        if (scrollAreaRef.current) {
            const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
             if (scrollContainer) {
                scrollContainer.scrollTop = scrollContainer.scrollHeight;
            }
        }
    }, 100);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userText = inputValue.trim();
    setInputValue('');
    
    // 1. Add User Message
    const newMessage: Message = { id: Date.now(), sender: 'user', text: userText };
    setMessages(prev => [...prev, newMessage]);
    setIsLoading(true);

    try {
      // 2. Call Backend API (via Next.js Proxy)
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userText }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // 3. Add AI Response
      setMessages(prev => [
        ...prev, 
        { id: Date.now() + 1, sender: 'ai', text: data.response }
      ]);

    } catch (error) {
      console.error("Failed to send message:", error);
      setMessages(prev => [
        ...prev, 
        { id: Date.now() + 1, sender: 'ai', text: "Negative contact. I'm having trouble reaching the tower (Backend API). Please check your connection." }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen flex-col bg-background">
      <header className="flex h-16 shrink-0 items-center border-b px-6">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar className="h-10 w-10 border-2 border-accent">
              <AvatarFallback><Bot className="text-accent" /></AvatarFallback>
            </Avatar>
            <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-secondary ring-2 ring-background" />
          </div>
          <div>
            <h2 className="font-headline text-lg font-medium">Cap (Greeting Agent)</h2>
            <p className="text-sm text-muted-foreground">Concierge & Support</p>
          </div>
        </div>
      </header>
      
      <ScrollArea className="flex-1" ref={scrollAreaRef}>
        <div className="space-y-6 p-6">
          {messages.map((message) => (
            <div key={message.id} className={cn('flex items-start gap-4', message.sender === 'user' && 'justify-end')}>
              {message.sender === 'ai' && (
                <Avatar className="h-10 w-10 border">
                  <AvatarFallback><Bot /></AvatarFallback>
                </Avatar>
              )}
              <div className={cn('max-w-xl rounded-lg p-3', message.sender === 'user' ? 'rounded-br-none bg-primary text-primary-foreground' : 'rounded-bl-none bg-card')}>
                {!message.isQuiz ? (
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
                ) : (
                  <div>
                    <p className="mb-4 text-sm leading-relaxed">{message.text}</p>
                    <QuizCard />
                  </div>
                )}
              </div>
              {message.sender === 'user' && (
                <Avatar className="h-10 w-10 border">
                  {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt="User Avatar" />}
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          {isLoading && (
             <div className="flex items-start gap-4">
               <Avatar className="h-10 w-10 border">
                  <AvatarFallback><Bot /></AvatarFallback>
                </Avatar>
                <div className="max-w-xl rounded-lg p-3 rounded-bl-none bg-card">
                   <p className="text-sm leading-relaxed animate-pulse">...</p>
                </div>
             </div>
          )}
        </div>
      </ScrollArea>
      
      <footer className="border-t p-4">
        <form onSubmit={handleSendMessage} className="flex items-center gap-4">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Message Cap..."
            className="flex-1"
            autoComplete="off"
            disabled={isLoading}
          />
          <Button type="submit" size="icon" className="h-10 w-10 flex-shrink-0 transition-transform active:scale-95" disabled={!inputValue.trim() || isLoading}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </footer>
    </div>
  );
}
