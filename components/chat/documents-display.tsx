"use client";

import { useState, useEffect, useRef } from "react";

// Define document interface
interface Document {
  id: string;
  title: string;
  url: string;
  description?: string;
}

interface DocumentsDisplayProps {
  documents: Document[];
}

export function DocumentsDisplay({ documents = [] }: DocumentsDisplayProps) {
  // Track visible documents count
  const [visibleDocsCount, setVisibleDocsCount] = useState(documents.length);
  // Reference to the container
  const containerRef = useRef<HTMLDivElement>(null);

  // Function to open document URL
  const openDocument = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  // Function to check visibility of document cards
  const checkVisibility = () => {
    if (!containerRef.current) return;
    
    const docCards = containerRef.current.querySelectorAll('.doc-card');
    let visibleCount = 0;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    
    docCards.forEach((card) => {
      const cardRect = card.getBoundingClientRect();
      if (
        cardRect.top >= containerRect.top - cardRect.height/2 && 
        cardRect.bottom <= containerRect.bottom + cardRect.height/2
      ) {
        visibleCount++;
      }
    });
    
    setVisibleDocsCount(visibleCount);
  };

  // Set up visibility check
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Initial check
    setTimeout(checkVisibility, 100);
    
    const container = containerRef.current;
    container.addEventListener('scroll', checkVisibility);
    
    const resizeObserver = new ResizeObserver(() => {
      setTimeout(checkVisibility, 100);
    });
    
    resizeObserver.observe(container);
    
    return () => {
      container.removeEventListener('scroll', checkVisibility);
      resizeObserver.disconnect();
    };
  }, [documents.length]);

  // If no documents are provided, show a placeholder
  if (documents.length === 0) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-gray-500">No documents available</p>
      </div>
    );
  }

  const hiddenDocsCount = Math.max(0, documents.length - visibleDocsCount);

  return (
    <div 
      ref={containerRef}
      className="h-full overflow-y-auto pr-2 relative flex flex-col"
    >
      <div className="flex-1 space-y-4 overflow-y-auto">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="doc-card bg-[var(--secondary-100)] hover:bg-[var(--secondary-300)] rounded-lg p-4 shadow-md hover:shadow-xl cursor-pointer transition-all"
            onClick={() => openDocument(doc.url)}
          >
            <h3 className="font-semibold text-lg mb-1">{doc.title}</h3>
            {doc.description && (
              <p className="text-sm text-gray-600">{doc.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
