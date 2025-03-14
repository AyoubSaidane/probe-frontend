"use client";
import { Footerdemo } from "@/components/ui/footer-section";
import { Boxes } from "@/components/ui/background-boxes";

export default function WebsiteLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      
      {/* Content container */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Footer */}
      <div className="relative z-10">
        <Footerdemo />
      </div>
    </div>
  );
}