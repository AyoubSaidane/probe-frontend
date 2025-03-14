"use client";

import { VercelV0Chat } from "@/components/chat/v0-ai-chat";

export function ChatInterface() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-[var(--secondary-500)] overflow-auto">
      <div className="w-full max-w-4xl px-4">
        <VercelV0Chat />
      </div>
    </div>
  );
}
