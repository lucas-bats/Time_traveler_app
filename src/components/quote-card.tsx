"use client";

import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

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
        "w-[500px] h-auto p-8 bg-gradient-to-br from-primary via-primary to-secondary rounded-2xl shadow-xl text-primary-foreground font-body flex flex-col justify-center items-center",
        className
      )}
    >
      {authorImage && (
         <Image
            src={authorImage}
            alt={author}
            width={80}
            height={80}
            className="rounded-full object-cover w-20 h-20 mb-4 border-2 border-primary-foreground/50"
            // This is tricky for html2canvas, may need CORS proxy if images are from different origins
            crossOrigin="anonymous"
          />
      )}
      <p className="text-xl italic mb-6 leading-relaxed text-center">“{quote}”</p>
      <p className="text-lg font-bold self-end">— {author}</p>
      <div className="absolute bottom-4 text-xs opacity-70 text-primary-foreground/80">
        {disclaimerText}
      </div>
    </div>
  );
}
