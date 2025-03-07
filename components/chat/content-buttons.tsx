"use client";

import { useState } from "react";

interface ContentButtonsProps {
  activeButton: string;
  setActiveButton: (button: string) => void;
}

export function ContentButtons({ activeButton, setActiveButton }: ContentButtonsProps) {
  // Function to determine button styles based on active state
  const getButtonStyles = (buttonName: string) => {
    const isActive = activeButton === buttonName;
    return {
      backgroundColor: isActive ? "var(--primary-500)" : "var(--main-white)",
      color: isActive ? "var(--main-white)" : "var(--main-text-bg)",
    };
  };

  return (
    <div className="flex space-x-4 mt-6 mb-6">
      <button 
        className="flex-1 py-2 px-4 rounded-3xl transition-colors"
        style={getButtonStyles("Slides")}
        onClick={() => setActiveButton("Slides")}
      >
        Slides
      </button>
      <button 
        className="flex-1 py-2 px-4 rounded-3xl transition-colors"
        style={getButtonStyles("Experts")}
        onClick={() => setActiveButton("Experts")}
      >
        Experts
      </button>
      <button 
        className="flex-1 py-2 px-4 rounded-3xl transition-colors"
        style={getButtonStyles("Documents")}
        onClick={() => setActiveButton("Documents")}
      >
        Documents
      </button>
    </div>
  );
}
