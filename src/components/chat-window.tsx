'use client';

import { useState, useEffect, useRef } from 'react';
import type { Astrologer, ChatMessage } from '@/lib/types';
import { chatMessages as initialMessages } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, Phone, Video, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { chatWithAstrologer } from '@/ai/flows/chat-flow';
import { RechargeModal } from './recharge-modal';

interface ChatWindowProps {
  astrologer: Astrologer;
}

export function ChatWindow({ astrologer }: ChatWindowProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [timer, setTimer] = useState(0);
  const [isThinking, setIsThinking] = useState(false);
  const [showRechargeModal, setShowRechargeModal] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.querySelector('div');
      if (viewport) {
        viewport.scrollTop = viewport.scrollHeight;
      }
    }
  }, [messages, isThinking]);


  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (timer >= 120) {
      setShowRechargeModal(true);
      return;
    }

    if (newMessage.trim() === '' || isThinking) return;

    const userMessage: ChatMessage = {
      id: `msg${messages.length + 1}`,
      sender: 'user',
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setNewMessage('');
    setIsThinking(true);

    try {
      const result = await chatWithAstrologer({
        astrologer,
        messages: updatedMessages,
      });

      if (result.response) {
        const astrologerResponse: ChatMessage = {
          id: `msg${updatedMessages.length + 1}`,
          sender: 'astrologer',
          text: result.response,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages(prev => [...prev, astrologerResponse]);
      }
    } catch (error) {
      console.error("Error calling chat flow:", error);
      const errorResponse: ChatMessage = {
          id: `msg${updatedMessages.length + 1}`,
          sender: 'astrologer',
          text: 'Sorry, I am having trouble connecting right now. Please try again in a moment.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-5.5rem)] bg-card">
       <RechargeModal 
        isOpen={showRechargeModal}
        onClose={() => setShowRechargeModal(false)}
        astrologer={astrologer}
      />
      <header className="flex items-center p-2 sm:p-4 border-b bg-header text-header-foreground">
        <Avatar className="h-10 w-10 sm:h-12 sm:w-12 mr-2 sm:mr-4 shrink-0">
          <AvatarImage src={astrologer.avatar} alt={astrologer.name} />
          <AvatarFallback>{astrologer.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-grow min-w-0">
          <h2 className="font-bold text-base sm:text-lg font-headline truncate">{astrologer.name}</h2>
          <div className="text-xs sm:text-sm text-green-500">Online</div>
        </div>
        <div className="text-center px-2 shrink-0">
          <div className="font-mono text-base sm:text-lg">{formatTime(timer)}</div>
          <div className="text-xs text-muted-foreground">₹{astrologer.price}/min</div>
        </div>
        <div className="ml-2 sm:ml-4 flex gap-1 sm:gap-2 shrink-0">
            <a href="tel:8897631939">
              <Button variant="outline" size="icon" className="h-8 w-8 sm:h-10 sm:w-10">
                <Phone className="h-4 w-4" />
              </Button>
            </a>
            <a href="tel:8897631939">
              <Button variant="outline" size="icon" className="h-8 w-8 sm:h-10 sm:w-10">
                <Video className="h-4 w-4" />
              </Button>
            </a>
        </div>
      </header>

      <ScrollArea className="flex-grow p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                'flex items-end gap-2 chat-message-in',
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              {message.sender === 'astrologer' && (
                <Avatar className="h-8 w-8">
                  <AvatarImage src={astrologer.avatar} alt={astrologer.name} />
                  <AvatarFallback>{astrologer.name.charAt(0)}</AvatarFallback>
                </Avatar>
              )}
              <div
                className={cn(
                  'max-w-[85%] md:max-w-md rounded-lg px-3 py-2 sm:px-4',
                  message.sender === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary'
                )}
              >
                <p className="text-sm break-words">{message.text}</p>
                <p className="text-xs opacity-70 mt-1 text-right">{message.timestamp}</p>
              </div>
            </div>
          ))}
          {isThinking && (
            <div className="flex items-end gap-2 justify-start chat-message-in">
              <Avatar className="h-8 w-8">
                <AvatarImage src={astrologer.avatar} alt={astrologer.name} />
                <AvatarFallback>{astrologer.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="bg-secondary rounded-lg px-4 py-2 flex items-center">
                  <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
              </div>
            </div>
          )}
          {timer >= 120 && (
             <div className="text-center my-4">
                <p className="text-sm text-destructive bg-destructive/10 p-2 rounded-md">Your 2 minutes of free chat have ended.</p>
             </div>
          )}
        </div>
      </ScrollArea>

      <footer className="p-2 sm:p-4 border-t bg-background">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            autoComplete="off"
            disabled={isThinking}
          />
          <Button type="submit" disabled={isThinking}>
            {isThinking ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </footer>
    </div>
  );
}
