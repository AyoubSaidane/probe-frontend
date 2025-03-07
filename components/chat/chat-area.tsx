"use client";

import { Separator } from "@/components/ui/separator";
import { SimplifiedChat } from "@/components/ui/simplified-chat";
import { useRef, useEffect } from "react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface ChatAreaProps {
  messages: Message[];
  onSendMessage: (content: string) => void;
}

export function ChatArea({ messages, onSendMessage }: ChatAreaProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div 
      className="absolute left-[3.05rem] top-4 bottom-4 bg-[var(--main-white)] flex flex-col rounded-bl-xl rounded-tl-xl ml-4" 
      style={{ width: "calc(65% - 3.05rem)" }}
    >
      {/* Chat messages area - only this should be scrollable */}
      <div className="flex-1 overflow-y-auto px-4 scrollbarWidth-none msOverflowStyle-none pb-24">
        <style>
        {`
          /* Hide scrollbar for Chrome, Safari, and Edge */
          div::-webkit-scrollbar {
            display: none;
          }
        `}
        </style>
        <div className="flex flex-col space-y-4 w-[77%] mx-auto pt-6">
          {messages.map((message, index) => (
            <div key={message.id}>
              <div className="text-left">
                {message.role === "assistant" && (
                  <div className="text-xl font-bold mb-2">
                    Here's what probe found for you
                  </div>
                )}
                <div className="text-sm">
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
      
      {/* Floating chat input at the bottom */}
      <div className="absolute bottom-6 left-0 right-0 px-4 flex justify-center z-10">
        <SimplifiedChat 
          onSendMessage={onSendMessage}
        />
      </div>
    </div>
  );
}
