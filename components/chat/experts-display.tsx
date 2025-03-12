"use client";

import { useState, useRef, useEffect } from "react";

interface Expert {
  id: string;
  imageUrl: string;
  name: string;
  title?: string;
}

interface ExpertsDisplayProps {
  experts: Expert[];
}

export function ExpertsDisplay({ experts }: ExpertsDisplayProps) {
  // State for selected expert
  const [selectedExpert, setSelectedExpert] = useState<string | null>(experts[0]?.id || null);
  // Track visible experts count
  const [visibleExpertsCount, setVisibleExpertsCount] = useState(experts.length);
  // Reference to the grid container
  const gridRef = useRef<HTMLDivElement>(null);

  // Find the selected expert object
  const selectedExpertData = experts.find(expert => expert.id === selectedExpert);
  
  // Function to check visibility of experts in grid
  const checkVisibility = () => {
    if (!gridRef.current) return;
    
    const expertCards = gridRef.current.querySelectorAll('.expert-card');
    let visibleCount = 0;
    
    const containerRect = gridRef.current.getBoundingClientRect();
    
    expertCards.forEach((card) => {
      const cardRect = card.getBoundingClientRect();
      if (
        cardRect.top >= containerRect.top - cardRect.height/2 && 
        cardRect.bottom <= containerRect.bottom + cardRect.height/2
      ) {
        visibleCount++;
      }
    });
    
    setVisibleExpertsCount(visibleCount);
  };

  // Set up visibility check
  useEffect(() => {
    if (!gridRef.current) return;
    
    // Initial check
    setTimeout(checkVisibility, 100);
    
    const container = gridRef.current;
    container.addEventListener('scroll', checkVisibility);
    
    const resizeObserver = new ResizeObserver(() => {
      setTimeout(checkVisibility, 100);
    });
    
    resizeObserver.observe(container);
    
    return () => {
      container.removeEventListener('scroll', checkVisibility);
      resizeObserver.disconnect();
    };
  }, [experts.length]);

  // Filter out the selected expert from the grid display
  const gridExperts = experts.filter(expert => expert.id !== selectedExpert);
  const hiddenExpertsCount = Math.max(0, gridExperts.length - visibleExpertsCount);

  return (
    <div className="h-full overflow-y-auto pr-2 space-y-6">
      {/* Main expert display */}
      {selectedExpertData && (
        <div className="bg-white rounded-xl p-4 shadow-lg">
          <div className="flex flex-row gap-4 items-center">
            {/* Expert image - round */}
            <div className="h-24 w-24 min-w-24 rounded-full overflow-hidden border">
              <img
                src={selectedExpertData.imageUrl}
                alt={selectedExpertData.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Expert details */}
            <div className="flex-1">
              <h2 className="text-lg font-bold mb-1">{selectedExpertData.name}</h2>
              {selectedExpertData.title && (
                <p className="text-sm text-gray-600">{selectedExpertData.title}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Adaptive expert grid */}
      <div 
        ref={gridRef}
        className="flex-1 overflow-y-auto mb-10 relative"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: "0.75rem",
          alignItems: "start",
          gridAutoRows: "min-content",
        }}
      >
        {gridExperts.map((expert) => (
          <div 
            key={expert.id} 
            className={`expert-card rounded-lg p-3 m-3 bg-transparent
                shadow-sm hover:shadow-lg cursor-pointer transition-all ${
              expert.id === selectedExpert ? "ring-2 ring-blue-500" : ""
            }`}
            onClick={() => setSelectedExpert(expert.id)}
          >
            <div className="flex items-center gap-3">
              {/* Expert round image */}
              <div className="h-16 w-16 rounded-full overflow-hidden border flex-shrink-0">
                <img
                  src={expert.imageUrl}
                  alt={expert.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Expert details */}
              <div className="flex-1">
                <h3 className="font-semibold text-sm">{expert.name}</h3>
                {expert.title && (
                  <p className="text-xs text-gray-600">{expert.title}</p>
                )}
              </div>
            </div>
          </div>
        ))}
        
        {/* More experts indicator */}
        {hiddenExpertsCount > 0 && (
          <div className="sticky bottom-0 left-0 right-0 bg-[var(--secondary-500)] text-[var(--main-text-bg)] p-2 text-center rounded-md mt-1 shadow-md">
            +{hiddenExpertsCount} more experts
          </div>
        )}
      </div>
    </div>
  );
}
