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
        "w-[500px] h-auto p-8 pt-8 pb-12 bg-gradient-to-br from-primary via-primary to-secondary rounded-2xl shadow-xl text-primary-foreground font-body flex flex-col relative",
        className
      )}
    >
       <div className="flex-grow flex flex-col items-center justify-center w-full">
        {authorImage && (
           <div
              style={{ backgroundImage: `url('${authorImage}')` }}
              className="w-20 h-20 rounded-full mb-6 border-2 border-primary-foreground/50 bg-cover bg-center"
              role="img"
              aria-label={author}
           ></div>
        )}
        <p className="text-xl italic mb-6 leading-relaxed text-center">“{quote}”</p>
        <p className="text-lg font-bold self-end w-full text-right pr-4">— {author}</p>
      </div>
      <div className="absolute bottom-3 text-xs opacity-70 text-primary-foreground/80 w-full text-center">
        {disclaimerText}
      </div>
    </div>
  );
}
