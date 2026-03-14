import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageCircle, Send, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  text: string;
  role: 'user' | 'bot';
  timestamp: Date;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const backendUrl = 'http://localhost:8001/chat';

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const sendMessage = async () => {
    const message = inputValue.trim();
    if (!message || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: message,
      role: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const errorMessage = errorData?.detail || `Server error: ${response.status}`;
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: errorMessage,
          role: 'bot',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, botMessage]);
        return;
      }

      const data = await response.json();
      const aiText = data.response || 'Sorry, I couldn\'t generate a response. Please try again.';

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiText,
        role: 'bot',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, the AI tutor is temporarily unavailable. Please try again.',
        role: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-gradient-to-r from-primary to-accent hover:scale-110 transition-all shadow-lg z-50"
        size="icon"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-20 right-6 w-96 h-[500px] bg-card border border-primary/30 shadow-2xl z-40 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-primary/20 bg-gradient-to-r from-primary/10 to-accent/10">
            <h3 className="font-bold text-foreground">AI Tutor Chat</h3>
            <p className="text-sm text-muted-foreground">Ask me anything about your studies!</p>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
            <div className="space-y-3">
              {messages.length === 0 && (
                <div className="text-center text-muted-foreground py-8">
                  <MessageCircle className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>Start a conversation with your AI tutor!</p>
                </div>
              )}
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    'max-w-[80%] p-3 rounded-lg text-sm',
                    msg.role === 'user'
                      ? 'ml-auto bg-gradient-to-r from-primary to-accent text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  )}
                >
                  <div className="font-semibold text-xs mb-1">
                    {msg.role === 'user' ? 'You' : 'AI Tutor'}
                  </div>
                  <div className="whitespace-pre-wrap">{msg.text}</div>
                </div>
              ))}
              {isLoading && (
                <div className="bg-muted text-muted-foreground max-w-[80%] p-3 rounded-lg text-sm">
                  <div className="font-semibold text-xs mb-1">AI Tutor</div>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="p-4 border-t border-primary/20 bg-background/50">
            <div className="flex gap-2">
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask your question..."
                disabled={isLoading}
                className="flex-1"
              />
              <Button
                onClick={sendMessage}
                disabled={isLoading || !inputValue.trim()}
                size="icon"
                className="bg-gradient-to-r from-primary to-accent hover:scale-105"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  );
};

export default Chatbot;