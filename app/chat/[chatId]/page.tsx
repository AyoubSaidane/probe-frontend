"use client";

import { useState, useEffect } from "react";
import { ChatArea } from "@/components/chat/chat-area";
import { ContentArea } from "@/components/chat/content-area";

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
      <ChatArea 
        messages={messages}
        onSendMessage={handleSendMessage}
      />
      <ContentArea />
    </div>
  );
}
