"use client";

import { useEffect } from "react";
import Image from "next/image";

interface SlidePreviewModalProps {
  imageUrl: string;
  title?: string;
  isOpen: boolean;
  onClose: () => void;
}

export function SlidePreviewModal({
  imageUrl,
  title,
  isOpen,
  onClose,
}: SlidePreviewModalProps) {
  // Close modal on ESC key press
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey);
      // Prevent body scrolling when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      // Restore body scrolling when modal is closed
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
      onClick={onClose}
    >
      <div className="max-w-[90vw] max-h-[90vh] bg-transparent rounded-lg overflow-hidden shadow-xl">
        <div className="relative w-full" style={{ maxHeight: "85vh" }}>
          <Image
            src={imageUrl}
            alt={title || "Full screen preview"}
            width={1200}
            height={900}
            className="w-full h-auto object-contain max-h-[85vh]"
            priority
            onClick={(e) => e.stopPropagation()}
          />
        </div>
        {title && (
          <div className="p-4 bg-white border-t">
            <h3 className="text-lg font-semibold">{title}</h3>
          </div>
        )}
      </div>
    </div>
  );
}
