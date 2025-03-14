import '../global.css'
import { Footerdemo } from "@/components/ui/footer-section";

// Footer component
function Footer() {
  return (
    <div className="block">
      <Footerdemo />
    </div>
  );
}

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Main content area, will flex-grow to push footer down */}
      <main className="flex-grow">{children}</main>
      
      {/* Footer will always stay at the bottom */}
      <Footer />
    </div>
  );
}
