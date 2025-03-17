"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { ChatArea } from "@/components/chat/chat-area";
import { ContentArea } from "@/components/chat/content-area";
import { sendQuery, Document, Expert, QueryResponseData } from "@/lib/api";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  documents?: Document[];
  experts?: Expert[];
}

interface ChatPageProps {
  params: { chatId: string };
}

export default function ChatPage({ params }: ChatPageProps) {
  const { chatId } = params;
  const searchParams = useSearchParams();
  const initialMessage = searchParams.get('message');
  const [messages, setMessages] = useState<Message[]>([]);
  const [initialized, setInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeResponseData, setActiveResponseData] = useState<QueryResponseData | null>(null);
  const messageIdCounterRef = useRef(1);
  const apiRequestSentRef = useRef(false); // Track if API request has been sent
  
  // Function to get next sequential message ID
  const getNextMessageId = () => {
    const id = messageIdCounterRef.current.toString();
    messageIdCounterRef.current += 1;
    return id;
  };
  
  // Send message to API
  const sendMessageToApi = async (content: string): Promise<QueryResponseData> => {
    try {
      setIsLoading(true);
      const responseData = await sendQuery({
        message: content,
        chat_id: chatId
      });
      
      // Update active response data for displaying in ContentArea
      setActiveResponseData(responseData);
      
      return responseData;
    } catch (error) {
      console.error("Error sending message to API:", error);
      return {
        text: "I'm sorry, I encountered an error processing your request. Please try again later.",
        documents: [],
        experts: []
      };
    } finally {
      setIsLoading(false);
    }
  };
  
  // Initialize messages, either from URL query param or default messages
  useEffect(() => {
    if (initialized) return;

    // Check if there's an initial message from the URL
    if (initialMessage) {
      const decodedMessage = decodeURIComponent(initialMessage);
      
      // Create initial user message with sequential ID
      const userMessage: Message = {
        id: getNextMessageId(),
        role: "user",
        content: decodedMessage
      };
      
      setMessages([userMessage]);
      setInitialized(true);
      
      // Prevent duplicate API requests using ref
      if (!apiRequestSentRef.current) {
        apiRequestSentRef.current = true;
        
        // Send to API and get response
        (async () => {
          const responseData = await sendMessageToApi(decodedMessage);
          
          const assistantMessage: Message = {
            id: getNextMessageId(),
            role: "assistant",
            content: responseData.text,
            documents: responseData.documents,
            experts: responseData.experts
          };
          
          setMessages(prev => [...prev, assistantMessage]);
        })();
      }
    } else {
      // No initial message, use default messages with sequential IDs
      messageIdCounterRef.current = 1; // Reset counter
      const initialMessages: Message[] = [
        { id: getNextMessageId(), role: "user", content: "I'd like to learn something new." },
        { 
          id: getNextMessageId(), 
          role: "assistant", 
          content: "That's great! What specific subject are you interested in?",
          documents: [],
          experts: []
        },
      ];
      
      setMessages(initialMessages);
      setInitialized(true);
    }
  }, [chatId, initialMessage, initialized]);
  
  // Handle sending a new message
  const handleSendMessage = async (content: string) => {
    // Add user message with sequential ID
    const userMessage: Message = {
      id: getNextMessageId(),
      role: "user",
      content
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Get response from API
    const responseData = await sendMessageToApi(content);
    
    // Add assistant response with sequential ID
    const assistantMessage: Message = {
      id: getNextMessageId(),
      role: "assistant",
      content: responseData.text,
      documents: responseData.documents,
      experts: responseData.experts
    };
    
    setMessages(prev => [...prev, assistantMessage]);
  };

  // Get the latest assistant message for content display
  const latestAssistantMessage = messages
    .filter(msg => msg.role === "assistant")
    .slice(-1)[0];

  return (
    <div className="h-screen w-screen bg-[var(--secondary-500)] fixed inset-0 overflow-hidden">
      <ChatArea 
        messages={messages}
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
      />
      <ContentArea 
        documents={latestAssistantMessage?.documents || []}
        experts={latestAssistantMessage?.experts || []}
      />
    </div>
  );
}
