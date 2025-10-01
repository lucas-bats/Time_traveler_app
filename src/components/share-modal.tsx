"use client";

import React, { useState } from "react";
import html2canvas from "html2canvas";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { QuoteCard } from "./quote-card";
import { Download, Share2, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLocale } from "@/lib/locale";

interface ShareModalProps {
  quote: string;
  author: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const QUOTE_CARD_ID = "quote-card-for-sharing";

/**
 * Generates a data URL for the quote card image.
 */
async function generateQuoteImage(): Promise<string | undefined> {
  const element = document.getElementById(QUOTE_CARD_ID);
  if (!element) return;

  // Temporarily make it visible to capture
  element.style.display = 'block';
  const canvas = await html2canvas(element, { 
      scale: 2, 
      useCORS: true,
      backgroundColor: null // Use transparent background
  });
  element.style.display = 'none'; // Hide it again

  return canvas.toDataURL("image/png");
}

/**
 * A modal component for sharing a quote as an image.
 */
export function ShareModal({ quote, author, isOpen, onOpenChange }: ShareModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { t } = useLocale();

  /**
   * Handles downloading the generated image.
   */
  async function downloadImage() {
    setIsLoading(true);
    const dataUrl = await generateQuoteImage();
    if (!dataUrl) {
      toast({ variant: "destructive", title: t.error, description: t.somethingWentWrong });
      setIsLoading(false);
      return;
    }

    const link = document.createElement("a");
    link.download = `eternal-minds-quote-${author.toLowerCase().replace(/ /g, "_")}.png`;
    link.href = dataUrl;
    link.click();
    setIsLoading(false);
  }

  /**
   * Handles sharing the image using the Web Share API.
   */
  async function shareImage() {
    setIsLoading(true);
    const dataUrl = await generateQuoteImage();
    if (!dataUrl) {
       toast({ variant: "destructive", title: t.error, description: t.somethingWentWrong });
       setIsLoading(false);
      return;
    }

    try {
        const blob = await (await fetch(dataUrl)).blob();
        const file = new File([blob], "quote.png", { type: "image/png" });

        if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
            await navigator.share({
            files: [file],
            title: `Quote from ${author} - Eternal Minds`,
            text: `"${quote}" - ${author}`,
            });
        } else {
            // Fallback for desktop or unsupported browsers
            downloadImage();
        }
    } catch (error) {
        console.error("Sharing failed", error);
        // If sharing fails (e.g., user cancels), offer download as fallback
        downloadImage();
    } finally {
        setIsLoading(false);
    }
  }
  
  const canShare = typeof navigator !== 'undefined' && !!navigator.share;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share this Quote</DialogTitle>
          <DialogDescription>
            Share this inspirational quote with your friends.
          </DialogDescription>
        </DialogHeader>
        
        {/* Hidden card used for generating the image */}
        <QuoteCard id={QUOTE_CARD_ID} quote={quote} author={author} className="!hidden" />

        {/* Preview of the card */}
        <div className="flex justify-center my-4">
             <div className="transform scale-75 -m-12">
                <QuoteCard id="quote-card-preview" quote={quote} author={author} />
            </div>
        </div>

        <DialogFooter className="sm:justify-center">
            {canShare ? (
                <Button onClick={shareImage} disabled={isLoading} className="w-full sm:w-auto">
                    {isLoading ? <Loader2 className="animate-spin" /> : <Share2 />}
                    <span className="ml-2">Share</span>
                </Button>
            ) : (
                <Button onClick={downloadImage} disabled={isLoading} className="w-full sm:w-auto">
                    {isLoading ? <Loader2 className="animate-spin" /> : <Download />}
                    <span className="ml-2">Download Image</span>
                </Button>
            )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
