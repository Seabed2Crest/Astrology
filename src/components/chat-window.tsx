'use client';

import { useState, useEffect, useRef } from 'react';
import type { Astrologer, ChatMessage } from '@/lib/types';
import { chatMessages as initialMessages } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, Phone, Video, Loader2, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { chatWithAstrologer } from '@/ai/flows/chat-flow';
import { RechargeModal } from './recharge-modal';
import { useRouter } from 'next/navigation';

interface ChatWindowProps {
  astrologer: Astrologer;
}

export function ChatWindow({ astrologer }: ChatWindowProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [timer, setTimer] = useState(120);
  const [isThinking, setIsThinking] = useState(false);
  const [showRechargeModal, setShowRechargeModal] = useState(false);
  const [viewportHeight, setViewportHeight] = useState(0);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    timerIntervalRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev > 0) {
          return prev - 1;
        }
        if (timerIntervalRef.current) {
          clearInterval(timerIntervalRef.current);
        }
        return 0;
      });
    }, 1000);

    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, []);

  // Improved viewport height handling for mobile keyboards
  useEffect(() => {
    const setVH = () => {
      // Use visualViewport if available (modern browsers)
      if (window.visualViewport) {
        setViewportHeight(window.visualViewport.height);
      } else {
        // Fallback for older browsers
        setViewportHeight(window.innerHeight);
      }
    };

    // Initial setup
    setVH();

    // Listen to visualViewport changes (better for keyboard detection)
    if (window.visualViewport) {
      const handleViewportChange = () => {
        setVH();
        // Scroll to bottom when keyboard state changes
        setTimeout(() => {
          scrollToBottom();
        }, 100);
      };

      window.visualViewport.addEventListener('resize', handleViewportChange);
      window.visualViewport.addEventListener('scroll', handleViewportChange);

      return () => {
        window.visualViewport?.removeEventListener('resize', handleViewportChange);
        window.visualViewport?.removeEventListener('scroll', handleViewportChange);
      };
    } else {
      // Fallback for browsers without visualViewport
      const handleResize = () => {
        setVH();
        setTimeout(() => {
          scrollToBottom();
        }, 100);
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  useEffect(() => {
    if (timer === 0) {
      setShowRechargeModal(true);
    }
  }, [timer]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isThinking]);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.querySelector('div');
      if (viewport) {
        requestAnimationFrame(() => {
          viewport.scrollTop = viewport.scrollHeight;
        });
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (timer <= 0) {
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

  const handleBack = () => {
    router.back();
  };

  // Calculate the container height based on actual viewport
  const containerHeight = viewportHeight || window.innerHeight;

  return (
    <>
      <style jsx global>{`
        /* Prevent zooming on iOS when focusing input */
        @supports (-webkit-touch-callout: none) {
          input[type="text"], input[type="email"], input[type="number"], textarea {
            font-size: 16px !important;
          }
        }

        /* Ensure proper viewport behavior */
        html {
          height: 100%;
          overflow: hidden;
        }

        body {
          height: 100%;
          overflow: hidden;
        }

        /* Hide scrollbars but keep functionality */
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }

        /* Smooth hardware acceleration */
        .chat-container {
          transform: translateZ(0);
          -webkit-transform: translateZ(0);
          backface-visibility: hidden;
        }
      `}</style>

      <div 
        className="flex flex-col bg-card chat-container"
        style={{ 
          height: `${containerHeight}px`,
          maxHeight: `${containerHeight}px`,
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        <RechargeModal 
          isOpen={showRechargeModal}
          onClose={() => setShowRechargeModal(false)}
          astrologer={astrologer}
        />
        
        {/* Header - Fixed height */}
        <header className="flex items-center p-3 border-b bg-header text-header-foreground shrink-0">
          {/* Back Button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-10 w-10 mr-2 shrink-0 hover:bg-header-hover"
            onClick={handleBack}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>

          {/* Profile Section */}
          <Avatar 
            className="h-10 w-10 mr-3 shrink-0 cursor-pointer"
            onClick={handleBack}
          >
            <AvatarImage src={astrologer.avatar} alt={astrologer.name} />
            <AvatarFallback>{astrologer.name.charAt(0)}</AvatarFallback>
          </Avatar>
          
          <div className="flex-grow min-w-0 cursor-pointer" onClick={handleBack}>
            <h2 className="font-semibold text-base font-headline truncate">{astrologer.name}</h2>
            <div className="text-xs text-green-400 font-medium">Online</div>
          </div>
          
          {/* Timer */}
          <div className="text-center px-2 shrink-0">
            <div className="font-mono text-sm font-bold">{formatTime(timer)}</div>
            <div className="text-xs text-muted-foreground">₹{astrologer.price}/min</div>
          </div>
          
          {/* Action Buttons */}
          <div className="ml-3 flex gap-1 shrink-0">
            <a href="tel:8897631939">
              <Button variant="ghost" size="icon" className="h-9 w-9 hover:bg-header-hover">
                <Video className="h-4 w-4" />
              </Button>
            </a>
            <a href="tel:8897631939">
              <Button variant="ghost" size="icon" className="h-9 w-9 hover:bg-header-hover">
                <Phone className="h-4 w-4" />
              </Button>
            </a>
          </div>
        </header>

        {/* Chat Area - Flexible height */} 
<div className="flex-1 overflow-hidden chat-bg-pattern">
          <ScrollArea 
            className="h-full w-full px-4 py-2 hide-scrollbar" 
            ref={scrollAreaRef}
          >
            <div className="space-y-3 pb-2">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    'flex items-end gap-2 animate-in slide-in-from-bottom-2 duration-200',
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  {message.sender === 'astrologer' && (
                    <Avatar className="h-7 w-7 mb-1">
                      <AvatarImage src={astrologer.avatar} alt={astrologer.name} />
                      <AvatarFallback className="text-xs">{astrologer.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={cn(
                      'max-w-[85%] md:max-w-md rounded-2xl px-3 py-2 relative',
                      message.sender === 'user'
                        ? 'bg-primary text-primary-foreground rounded-br-md'
                        : 'bg-secondary rounded-bl-md'
                    )}
                  >
                    <p className="text-sm leading-relaxed break-words">{message.text}</p>
                    <p className={cn(
                      "text-xs opacity-60 mt-1 text-right",
                      message.sender === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                    )}>
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}
              
              {isThinking && (
                <div className="flex items-end gap-2 justify-start animate-in slide-in-from-bottom-2 duration-200">
                  <Avatar className="h-7 w-7 mb-1">
                    <AvatarImage src={astrologer.avatar} alt={astrologer.name} />
                    <AvatarFallback className="text-xs">{astrologer.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="bg-secondary rounded-2xl rounded-bl-md px-4 py-3 flex items-center">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              {timer === 0 && (
                <div className="text-center my-4 animate-in fade-in duration-300">
                  <div className="inline-block text-sm text-destructive bg-destructive/10 px-4 py-2 rounded-full border border-destructive/20">
                    Your 2 minutes of free chat have ended
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>

        {/* Footer - Fixed height */}
        <footer className="p-3 border-t bg-background shrink-0">
          <form onSubmit={handleSendMessage} className="flex gap-2 items-center">
            <div className="flex-1 relative">
              <Input
                ref={inputRef}
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                autoComplete="off"
                disabled={isThinking || timer === 0}
                className="pr-12 rounded-full border-2 focus:border-primary transition-colors"
                style={{ 
                  fontSize: '16px'
                }}
                onFocus={() => {
                  // Delay scroll to ensure keyboard detection
                  setTimeout(() => {
                    scrollToBottom();
                  }, 300);
                }}
              />
            </div>
            <Button 
              type="submit" 
              disabled={isThinking || timer === 0 || !newMessage.trim()}
              size="icon"
              className="h-10 w-10 rounded-full shrink-0 transition-all duration-200"
            >
              {isThinking ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </footer>
      </div>
    </>
  );
}