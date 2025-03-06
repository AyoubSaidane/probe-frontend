"use client";

import { notFound } from "next/navigation";
import { SimplifiedChat } from "@/components/ui/simplified-chat";
import { useState, useEffect, useRef } from "react";
import { Separator } from "@/components/ui/separator";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface ChatPageProps {
  params: { chatId: string };
}

export default function ChatPage({ params }: ChatPageProps) {
  const { chatId } = params;
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Fetch messages when component mounts
  useEffect(() => {
    // This would be replaced with an actual API call
    const initialMessages: Message[] = [
      { id: "1", role: "user", content: "I'd like to learn about machine learning." },
      { id: "2", role: "assistant", content: "That's great! Machine learning is a fascinating field. What specific aspect are you interested in?" },
      { id: "3", role: "user", content: "Tell me more about RAG." },
      { id: "4", role: "assistant", content: "Retrieval-Augmented Generation (RAG) is an AI framework that enhances the output of large language models (LLMs) by retrieving relevant external knowledge before generating a response. Instead of relying only on pre-trained knowledge, RAG dynamically fetches relevant information from external sources (e.g., databases, documents, APIs, or knowledge bases) and then integrates it into the response. This makes RAG more factual, up-to-date, and domain-specific compared to standard LLMs." },
      { id: "5", role: "user", content: "Tell me more about RAG." },
      { id: "6", role: "assistant", content: "Retrieval-Augmented Generation (RAG) is an AI framework that enhances the output of large language models (LLMs) by retrieving relevant external knowledge before generating a response. Instead of relying only on pre-trained knowledge, RAG dynamically fetches relevant information from external sources (e.g., databases, documents, APIs, or knowledge bases) and then integrates it into the response. This makes RAG more factual, up-to-date, and domain-specific compared to standard LLMs." },
      { id: "7", role: "user", content: "Tell me more about RAG." },
      { id: "8", role: "assistant", content: "Retrieval-Augmented Generation (RAG) is an AI framework that enhances the output of large language models (LLMs) by retrieving relevant external knowledge before generating a response. Instead of relying only on pre-trained knowledge, RAG dynamically fetches relevant information from external sources (e.g., databases, documents, APIs, or knowledge bases) and then integrates it into the response. This makes RAG more factual, up-to-date, and domain-specific compared to standard LLMs." },
      { id: "9", role: "user", content: "Tell me more about RAG." },
      { id: "10", role: "assistant", content: "Retrieval-Augmented Generation (RAG) is an AI framework that enhances the output of large language models (LLMs) by retrieving relevant external knowledge before generating a response. Instead of relying only on pre-trained knowledge, RAG dynamically fetches relevant information from external sources (e.g., databases, documents, APIs, or knowledge bases) and then integrates it into the response. This makes RAG more factual, up-to-date, and domain-specific compared to standard LLMs." },
      { id: "11", role: "user", content: "Tell me more about RAG." },
      { id: "12", role: "assistant", content: "Retrieval-Augmented Generation (RAG) is an AI framework that enhances the output of large language models (LLMs) by retrieving relevant external knowledge before generating a response. Instead of relying only on pre-trained knowledge, RAG dynamically fetches relevant information from external sources (e.g., databases, documents, APIs, or knowledge bases) and then integrates it into the response. This makes RAG more factual, up-to-date, and domain-specific compared to standard LLMs." },
      { id: "13", role: "user", content: "Tell me more about RAG." },
      { id: "14", role: "assistant", content: "Retrieval-Augmented Generation (RAG) is an AI framework that enhances the output of large language models (LLMs) by retrieving relevant external knowledge before generating a response. Instead of relying only on pre-trained knowledge, RAG dynamically fetches relevant information from external sources (e.g., databases, documents, APIs, or knowledge bases) and then integrates it into the response. This makes RAG more factual, up-to-date, and domain-specific compared to standard LLMs." }
    ];
    
    setMessages(initialMessages);
  }, [chatId]);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  // Handle sending a new message
  const handleSendMessage = (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Simulate AI response (would be replaced with actual API call)
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `I received your message: "${content}". This is a simulated response.`
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    }, 1000);
  };

  return (
    <div className="h-screen w-screen bg-[var(--secondary-500)] fixed inset-0 overflow-hidden">
      {/* Left div - 65% width, starting at 3.05rem from left */}
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
            onSendMessage={handleSendMessage}
          />
        </div>
      </div>
      
      {/* Right div - 35% width */}
      <div 
        className="absolute right-0 top-4 bottom-4 bg-[var(--main-white)] px-4 pr-8 mr-4 flex flex-col rounded-tr-xl rounded-br-xl"
        style={{ width: "35%" }}
      >
        {/* Navigation buttons */}
        <div className="flex space-x-4 mt-6 mb-6">
          <button className="flex-1 py-2 px-4 bg-[var(--primary-500)] text-white rounded-md hover:bg-[var(--primary-600)] transition-colors">
            Slides
          </button>
          <button className="flex-1 py-2 px-4 bg-[var(--primary-500)] text-white rounded-md hover:bg-[var(--primary-600)] transition-colors">
            Experts
          </button>
          <button className="flex-1 py-2 px-4 bg-[var(--primary-500)] text-white rounded-md hover:bg-[var(--primary-600)] transition-colors">
            Documents
          </button>
        </div>
        
        {/* Content area */}
        <div className="flex-1 overflow-y-auto">
          {/* Content will go here */}
        </div>
      </div>
    </div>
  );
}
