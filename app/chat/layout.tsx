import { SessionNavBar } from "@/components/ui/sidebar"

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-full">
      <SessionNavBar />
      <div className="h-full">
        {children}
      </div>
    </div>
  );
}
