"use client";

import { Separator } from "@/components/ui/separator";
import { SimplifiedChat } from "@/components/chat/simplified-chat";
import { useRef, useEffect } from "react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface ChatAreaProps {
  messages: Message[];
  onSendMessage: (content: string) => void;
  isLoading?: boolean;
}

export function ChatArea({ messages, onSendMessage, isLoading = false }: ChatAreaProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div 
      className="absolute left-[3.05rem] top-4 bottom-4 bg-[var(--main-white)] flex flex-col rounded-bl-xl rounded-tl-xl ml-4" 
      style={{ width: "calc(55% - 3.05rem)" }}
    >
      {/* Chat messages area - only this should be scrollable */}
      <div className="flex-1 overflow-y-auto px-4 scrollbarWidth-none msOverflowStyle-none pb-4">
        <div className="flex flex-col space-y-4 w-[70%] mx-auto pt-6">
          {messages.map((message, index) => (
            <div key={message.id}>
              <div className="text-left">
                {/* Make user messages bold instead of assistant messages */}
                <div className={`text-sm ${message.role === "user" ? "text-xl font-bold mb-2" : ""}`}>
                  {message.content}
                </div>
              </div>
              {message.role === "assistant" && index < messages.length - 1 && (
                <div className="py-4 flex justify-center">
                  <Separator className="w-full bg-[var(--primary-500)]" />
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {isLoading && (
        <div className="flex items-center justify-center my-2">
          <div className="animate-pulse text-sm">Probe is thinking...</div>
        </div>
      )}
      
      {/* Chat input at the bottom - not floating anymore */}
      <div className="px-4 py-2 border-t border-gray-100 bg-white rounded-bl-xl">
        <SimplifiedChat 
          onSendMessage={onSendMessage}
        />
      </div>
    </div>
  );
}
