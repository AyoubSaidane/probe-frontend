"use client";

import { useState } from "react";
import { ContentButtons } from "./content-buttons";
import { SlidesDisplay } from "./slides-display";
import { ExpertsDisplay } from "./experts-display";
import { DocumentsDisplay } from "./documents-display";

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

// Sample experts data
const mockExperts = [
  {
    id: "expert1",
    imageUrl: "/experts/marion_duchein.jpeg",
    name: "Marion Duchein",
    title: "VP Business Partners, Paris"
  },
  {
    id: "expert2",
    imageUrl: "/experts/charles_salvanet.jpeg",
    name: "Charles Salvanet",
    title: "Senior Manager, Paris"
  },
  {
    id: "expert3",
    imageUrl: "/experts/jack_fraser.jpeg",
    name: "Jack Fraser",
    title: "Senior Consultant, London"
  },
  {
    id: "expert4",
    imageUrl: "/experts/emma_ventre.jpeg",
    name: "Emma Ventre",
    title: "Junior Consultant, Paris"
  },
  {
    id: "expert5",
    imageUrl: "/experts/alexandre_peymirat.jpeg",
    name: "Alexandre Peymirat",
    title: "Junior Consultant, NYC"
  }
];

// Sample documents data
const mockDocuments = [
  {
    id: "doc1",
    title: "Market Analysis Report 2024",
    url: "https://example.com/documents/market-analysis-2024.pdf",
    description: "Comprehensive market analysis with key insights and trends"
  },
  {
    id: "doc2",
    title: "Annual Financial Report",
    url: "https://example.com/documents/financial-report.pdf",
    description: "Detailed financial performance and projections"
  },
  {
    id: "doc3",
    title: "Strategic Business Plan",
    url: "https://example.com/documents/strategic-plan.pdf",
    description: "5-year strategic roadmap and implementation strategy"
  },
  {
    id: "doc4",
    title: "Competitor Analysis",
    url: "https://example.com/documents/competitor-analysis.pdf",
    description: "In-depth analysis of market competitors and positioning"
  },
  {
    id: "doc5",
    title: "Customer Survey Results",
    url: "https://example.com/documents/customer-survey.pdf",
    description: "Summary of customer feedback and satisfaction metrics"
  },
  {
    id: "doc6",
    title: "Product Development Roadmap",
    url: "https://example.com/documents/product-roadmap.pdf",
    description: "Timeline for upcoming product features and releases"
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
      case "Experts":
        return <ExpertsDisplay experts={mockExperts} />;
      case "Documents":
        return <DocumentsDisplay documents={mockDocuments} />;
      default:
        return <div className="h-full flex items-center justify-center">Select a content type</div>;
    }
  };

  return (
    <div 
      className="absolute right-0 top-4 bottom-4 bg-[var(--main-white)] px-4 pr-8 mr-4 flex flex-col rounded-tr-xl rounded-br-xl"
      style={{ width: "45%" }}
    >
      {/* Navigation buttons */}
      <ContentButtons 
        activeButton={activeButton} 
        setActiveButton={setActiveButton} 
      />
      
      {/* Content area with fixed height */}
      <div className="flex-1 py-4 overflow-hidden">
        {renderContent()}
      </div>
    </div>
  );
}
