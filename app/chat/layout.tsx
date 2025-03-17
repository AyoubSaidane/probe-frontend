"use client";

import { SessionNavBar } from "@/components/ui/sidebar";
import { connectToDrive } from "@/lib/api";
import { createContext, useState, useContext, ReactNode } from "react";

// Create a context for drive connection state
interface DriveConnectionContextType {
  isConnecting: boolean;
  connectionStatus: 'idle' | 'success' | 'error';
  connectionMessage: string | null;
  connectToDriveHandler: () => Promise<void>;
}

const DriveConnectionContext = createContext<DriveConnectionContextType>({
  isConnecting: false,
  connectionStatus: 'idle',
  connectionMessage: null,
  connectToDriveHandler: async () => {},
});

// Export hook for easy access to the context
export const useDriveConnection = () => useContext(DriveConnectionContext);

export default function ChatLayout({
  children,
}: {
  children: ReactNode
}) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [connectionMessage, setConnectionMessage] = useState<string | null>(null);
  
  // Handle connection to drive
  const connectToDriveHandler = async () => {
    if (isConnecting) return;
    
    try {
      setIsConnecting(true);
      setConnectionStatus('idle');
      
      const result = await connectToDrive();
      
      if (result.response.includes("Successfully")) {
        setConnectionStatus('success');
        setConnectionMessage(result.response);
      } else {
        setConnectionStatus('error');
        setConnectionMessage(result.response);
      }
      
      // Reset status after 3 seconds
      setTimeout(() => {
        setConnectionStatus('idle');
        setConnectionMessage(null);
      }, 3000);
    } catch (error) {
      setConnectionStatus('error');
      setConnectionMessage("Connection failed");
      
      // Reset status after 3 seconds
      setTimeout(() => {
        setConnectionStatus('idle');
        setConnectionMessage(null);
      }, 3000);
    } finally {
      setIsConnecting(false);
    }
  };
  
  return (
    <DriveConnectionContext.Provider value={{
      isConnecting,
      connectionStatus,
      connectionMessage,
      connectToDriveHandler
    }}>
      <div className="h-full">
        <SessionNavBar />
        <div className="h-full">
          {children}
        </div>
      </div>
    </DriveConnectionContext.Provider>
  );
}
