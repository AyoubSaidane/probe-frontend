"use client";

import { useState } from "react";
import { ContentButtons } from "./content-buttons";
import { SlidesDisplay } from "./slides-display";

// Sample data for demonstration
const mockSlides = [
  {
    id: "slide1",
    imageUrl: "/screenshot-dataset/slide1.png",
    title: "Introduction"
  },
  {
    id: "slide2",
    imageUrl: "/screenshot-dataset/slide2.png",
    title: "Key Points"
  },
  {
    id: "slide3",
    imageUrl: "/screenshot-dataset/slide3.png",
    title: "Market Analysis"
  },
  {
    id: "slide4",
    imageUrl: "/screenshot-dataset/slide4.png",
    title: "Strategy"
  },
  {
    id: "slide5",
    imageUrl: "/screenshot-dataset/slide5.png",
    title: "Financials"
  },
  {
    id: "slide6",
    imageUrl: "/screenshot-dataset/slide6.png",
    title: "Conclusion"
  }
];

interface ContentAreaProps {
  // Add props here as needed
}

export function ContentArea({}: ContentAreaProps) {
  // Add state to track the active button
  const [activeButton, setActiveButton] = useState<string>("Slides");

  // Render different content based on active button
  const renderContent = () => {
    switch (activeButton) {
      case "Slides":
        return <SlidesDisplay slides={mockSlides} />;
      case "Q&A":
        return <div className="h-full flex items-center justify-center">Q&A content</div>;
      case "Summary":
        return <div className="h-full flex items-center justify-center">Summary content</div>;
      default:
        return <div className="h-full flex items-center justify-center">Select a content type</div>;
    }
  };

  return (
    <div 
      className="absolute right-0 top-4 bottom-4 bg-[var(--main-white)] px-4 pr-8 mr-4 flex flex-col rounded-tr-xl rounded-br-xl"
      style={{ width: "35%" }}
    >
      {/* Navigation buttons */}
      <ContentButtons 
        activeButton={activeButton} 
        setActiveButton={setActiveButton} 
      />
      
      {/* Content area */}
      <div className="flex-1 py-4 overflow-hidden">
        {renderContent()}
      </div>
    </div>
  );
}
