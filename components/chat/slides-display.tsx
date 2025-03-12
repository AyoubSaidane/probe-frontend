"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { SlidePreviewModal } from "./slide-preview-modal";

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
  // Track visible slides count
  const [visibleSlidesCount, setVisibleSlidesCount] = useState(slides.length);
  // Reference to the grid container
  const gridRef = useRef<HTMLDivElement>(null);
  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [previewSlide, setPreviewSlide] = useState<Slide | null>(null);

  // Function to handle click on main preview
  const handleMainPreviewClick = (slide: Slide) => {
    setPreviewSlide(slide);
    setModalOpen(true);
  };

  // Function to check visibility of thumbnails
  const checkVisibility = () => {
    if (!gridRef.current) return;
    
    // Get all thumbnails
    const thumbnails = gridRef.current.querySelectorAll('.slide-thumbnail');
    let visibleCount = 0;
    
    // Use getBoundingClientRect to check if thumbnails are within the container's viewport
    const containerRect = gridRef.current.getBoundingClientRect();
    
    thumbnails.forEach((thumbnail) => {
      const thumbRect = thumbnail.getBoundingClientRect();
      // Check if the thumbnail is visible within the container
      if (
        thumbRect.top >= containerRect.top - thumbRect.height/2 && 
        thumbRect.bottom <= containerRect.bottom + thumbRect.height/2
      ) {
        visibleCount++;
      }
    });
    
    setVisibleSlidesCount(visibleCount);
  };

  // Set up visibility check
  useEffect(() => {
    if (!gridRef.current) return;
    
    // Initial check
    setTimeout(checkVisibility, 100); // Slight delay to ensure rendering is complete
    
    // Set up scroll event listener
    const container = gridRef.current;
    container.addEventListener('scroll', checkVisibility);
    
    // Set up resize observer
    const resizeObserver = new ResizeObserver(() => {
      setTimeout(checkVisibility, 100);
    });
    
    resizeObserver.observe(container);
    
    return () => {
      container.removeEventListener('scroll', checkVisibility);
      resizeObserver.disconnect();
    };
  }, [slides.length]);

  // If no slides are provided, show a placeholder
  if (slides.length === 0) {
    return (
      <div className="h-full flex flex-col p-2">
        <div className="bg-gray-100 rounded-lg h-1/4 mb-4 flex items-center justify-center">
          <p className="text-gray-500">No slides available</p>
        </div>
        <div className="grid grid-cols-2 gap-2 h-3/5">
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
  const hiddenSlidesCount = Math.max(0, slides.length - visibleSlidesCount);
  
  return (
    <div className="h-full flex flex-col">
      {/* Main preview area - with adaptive height */}
      <div className="bg-white shadow-sm rounded-lg mb-4 overflow-hidden">
        <div 
          className="relative w-full" 
          style={{ minHeight: "100px" }}
          onClick={() => handleMainPreviewClick(currentSlide)}
        >
          <Image
            src={currentSlide.imageUrl}
            alt={currentSlide.title || "Slide preview"}
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-auto cursor-pointer"
            priority
          />
        </div>
        {currentSlide.title && (
          <div className="p-2 border-t border-gray-100">
            <p className="text-sm font-medium">{currentSlide.title}</p>
          </div>
        )}
      </div>

      {/* Adaptive thumbnail grid - takes remaining space */}
      <div 
        ref={gridRef}
        className="flex-1 overflow-y-auto relative grid-container"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
          gap: "0.5rem",
          alignItems: "start", // Align items to start (top)
          gridAutoRows: "min-content", // Ensure rows only take the needed height
        }}
      >
        {slides.map((slide) => (
          <div 
            key={slide.id}
            onClick={() => setSelectedSlide(slide.id)}
            className={`
              slide-thumbnail relative rounded-md overflow-hidden cursor-pointer aspect-video
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
        
        {/* More slides indicator */}
        {hiddenSlidesCount > 0 && (
          <div className="sticky bottom-0 left-0 right-0 bg-[var(--secondary-500)] text-[var(--main-text-bg)] p-2 text-center rounded-md mt-1 shadow-md">
            +{hiddenSlidesCount} more relevant slides
          </div>
        )}
      </div>

      {/* Preview Modal */}
      {previewSlide && (
        <SlidePreviewModal
          imageUrl={previewSlide.imageUrl}
          title={previewSlide.title}
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
}
