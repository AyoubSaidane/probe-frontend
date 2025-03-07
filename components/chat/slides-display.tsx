"use client";

import { useState } from "react";
import Image from "next/image";

// Define our slide interface
interface Slide {
  id: string;
  imageUrl: string;
  title?: string;
}

interface SlidesDisplayProps {
  slides: Slide[];
}

export function SlidesDisplay({ slides = [] }: SlidesDisplayProps) {
  // Track which slide is currently selected for the main preview
  const [selectedSlide, setSelectedSlide] = useState<string>(slides[0]?.id || "");

  // If no slides are provided, show a placeholder
  if (slides.length === 0) {
    return (
      <div className="h-full flex flex-col p-2">
        <div className="bg-gray-100 rounded-lg h-2/3 mb-4 flex items-center justify-center">
          <p className="text-gray-500">No slides available</p>
        </div>
        <div className="grid grid-cols-2 gap-2 h-1/3">
          {[1, 2, 3, 4].map((placeholder) => (
            <div 
              key={placeholder} 
              className="bg-gray-100 rounded-md flex items-center justify-center"
            >
              <p className="text-gray-400 text-xs">Empty</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const currentSlide = slides.find(slide => slide.id === selectedSlide) || slides[0];
  
  return (
    <div className="h-full flex flex-col p-2">
      {/* Main preview area - adjusted for landscape format */}
      <div className="bg-white shadow-sm rounded-lg h-3/5 mb-4 overflow-hidden">
        <div className="relative w-full h-full">
          <Image
            src={currentSlide.imageUrl}
            alt={currentSlide.title || "Slide preview"}
            fill
            style={{ objectFit: "contain" }}
            priority
          />
          {currentSlide.title && (
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2">
              <p className="text-white text-sm">{currentSlide.title}</p>
            </div>
          )}
        </div>
      </div>

      {/* Thumbnail grid - adjusted to take remaining space */}
      <div className="grid grid-cols-3 gap-2 flex-1 overflow-y-auto">
        {slides.map((slide) => (
          <div 
            key={slide.id}
            onClick={() => setSelectedSlide(slide.id)}
            className={`
              relative rounded-md overflow-hidden cursor-pointer aspect-video
              ${selectedSlide === slide.id ? 'ring-2 ring-blue-500' : ''}
            `}
          >
            <Image
              src={slide.imageUrl}
              alt={slide.title || "Thumbnail"}
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
