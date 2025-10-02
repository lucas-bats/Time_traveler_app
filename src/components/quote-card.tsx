"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface QuoteCardProps {
  id: string;
  quote: string;
  author: string;
  authorImage?: string;
  className?: string;
  disclaimerText: string;
}

/**
 * A component that renders a stylized card for a quote.
 * This is intended to be captured as an image for sharing.
 */
export function QuoteCard({ id, quote, author, authorImage, className, disclaimerText }: QuoteCardProps) {
  return (
    <div
      id={id}
      className={cn(
        "relative w-[500px] h-auto p-8 rounded-2xl shadow-xl font-body flex flex-col justify-center items-center overflow-hidden",
        className
      )}
      style={{
        backgroundImage: `url('${authorImage}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-center text-white w-full">
        <p className="text-xl italic mb-6 leading-relaxed text-center text-white/90">“{quote}”</p>
        <p className="text-lg font-bold self-end w-full text-right pr-4 text-white">— {author}</p>
      </div>

      {/* Disclaimer */}
      <div className="absolute bottom-3 text-xs z-10 text-white/60 w-full text-center">
        {disclaimerText}
      </div>
    </div>
  );
}
