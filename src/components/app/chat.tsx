"use client";

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import QuizCard from './quiz-card';

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
    text: "Welcome back, Captain. I'm the Indoc agent. Based on your records, you haven't had a systems knowledge check-in for over 90 days. We should review some procedures. Are you ready?",
  },
  {
    id: 2,
    sender: 'user',
    text: "I'm ready. Let's do it.",
  },
  {
    id: 3,
    sender: 'ai',
    text: "Excellent. Let's start with a basic question on hydraulic systems.",
    isQuiz: true,
  },
];

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const userAvatar = PlaceHolderImages.find(p => p.id === 'user-avatar');
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setMessages([...messages, { id: Date.now(), sender: 'user', text: inputValue }]);
      setInputValue('');
      setTimeout(() => {
        setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'ai', text: "Acknowledged. Let's proceed to the next topic: emergency procedures."}])
      }, 1000);
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
            <h2 className="font-headline text-lg font-medium">Indoc Agent</h2>
            <p className="text-sm text-muted-foreground">Specialist AI: Systems & Procedures</p>
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
                  <p className="text-sm leading-relaxed">{message.text}</p>
                ) : (
                  <div>
                    <p className="mb-4 text-sm leading-relaxed">{message.text}</p>
                    <QuizCard />
                  </div>
                )}
              </div>
              {message.sender === 'user' && (
                <Avatar className="h-10 w-10 border">
                  {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt="User Avatar" data-ai-hint="person portrait" />}
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
      <footer className="border-t p-4">
        <form onSubmit={handleSendMessage} className="flex items-center gap-4">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Message Indoc Agent..."
            className="flex-1"
            autoComplete="off"
          />
          <Button type="submit" size="icon" className="h-10 w-10 flex-shrink-0 transition-transform active:scale-95" disabled={!inputValue.trim()}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </footer>
    </div>
  );
}
