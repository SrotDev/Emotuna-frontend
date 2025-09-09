import { useState } from "react";
import { Send, X, Bot, User } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface TrainingSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const initialMessages: Message[] = [
  {
    id: "1",
    text: "Hi! I'm your AI training assistant. I'm here to help you improve how I handle your messages. What would you like to work on today?",
    isBot: true,
    timestamp: new Date(),
  },
];

export function TrainingSessionModal({ isOpen, onClose }: TrainingSessionModalProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");

    // Simulate AI response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "Thanks for that feedback! I understand you want me to be more specific in my responses. Let me practice with a similar scenario...",
        isBot: true,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl h-[600px] bg-card border-border">
        <DialogHeader className="flex flex-row items-center justify-between border-b border-border pb-4">
          <div>
            <DialogTitle className="text-lg font-semibold text-foreground">
              Training Session – Chat with AI
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground mt-1">
              Interact with your AI assistant to improve its responses and categorization
            </DialogDescription>
          </div>
          <DialogClose asChild>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
              <X className="h-4 w-4" />
            </Button>
          </DialogClose>
        </DialogHeader>

        <div className="flex flex-col h-full">
          <ScrollArea className="flex-1 px-4">
            <div className="space-y-4 py-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start gap-3 ${
                    message.isBot ? "justify-start" : "justify-end"
                  }`}
                >
                  {message.isBot && (
                    <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                      <Bot className="h-4 w-4 text-primary-foreground" />
                    </div>
                  )}
                  
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      message.isBot
                        ? "bg-secondary text-secondary-foreground"
                        : "bg-primary text-primary-foreground"
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>

                  {!message.isBot && (
                    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                      <User className="h-4 w-4 text-muted-foreground" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="border-t border-border pt-4">
            <div className="flex items-center gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 bg-input-background border-border"
              />
              <Button 
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className="bg-primary hover:bg-primary/90"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}