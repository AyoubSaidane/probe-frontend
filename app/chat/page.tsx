"use client";

import { useRouter } from 'next/navigation';
import { VercelV0Chat } from "@/components/chat/v0-ai-chat";

export default function ChatPage() {
  const router = useRouter();

  // Generate a unique chat ID
  const generateChatId = () => {
    const timestamp = new Date().getTime().toString(36);
    const randomChars = Math.random().toString(36).substring(2, 8);
    return `${timestamp}-${randomChars}`;
  };

  // Handle message submission - redirect to new chat with initial message
  const handleMessageSubmit = (message: string) => {
    const chatId = generateChatId();
    const encodedMessage = encodeURIComponent(message);
    router.push(`/chat/${chatId}?message=${encodedMessage}`);
  };

  return (
    <main className="h-screen bg-[var(--secondary-500)] flex">
      <div className="flex-1 flex justify-center pl-[3.05rem]">
        <div className="flex h-full w-full items-center justify-center bg-[var(--secondary-500)] overflow-auto">
          <div className="w-full max-w-4xl px-4">
            <VercelV0Chat onSubmit={handleMessageSubmit} />
          </div>
        </div>
      </div>
    </main>
  );
}
