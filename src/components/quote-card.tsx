"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface QuoteCardProps {
  id: string;
  quote: string;
  author: string;
  className?: string;
}

/**
 * A component that renders a stylized card for a quote.
 * This is intended to be captured as an image for sharing.
 */
export function QuoteCard({ id, quote, author, className }: QuoteCardProps) {
  return (
    <div
      id={id}
      className={cn(
        "w-[500px] p-8 bg-gradient-to-br from-primary via-primary to-secondary rounded-2xl shadow-xl text-primary-foreground font-body flex flex-col justify-center items-center h-[300px]",
        className
      )}
    >
      <p className="text-xl italic mb-6 leading-relaxed text-center">“{quote}”</p>
      <p className="text-xl font-bold self-end">— {author}</p>
      <div className="absolute bottom-4 text-sm opacity-70 text-primary-foreground/80">
        IA-gerado por Eternal Minds ✨
      </div>
    </div>
  );
}
