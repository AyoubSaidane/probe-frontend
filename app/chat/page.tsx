import { ChatInterface } from '@/components/layout/ChatInterface'

export default function Home() {
  return (
    <main className="h-screen bg-[var(--secondary-500)] flex">
      <div className="flex-1 flex justify-center pl-[3.05rem]">
      <ChatInterface />
      </div>
    </main>
  )
}
