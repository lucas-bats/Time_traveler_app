"use client";

import React, { useState, useEffect } from "react";
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
import { Textarea } from "./ui/textarea";

interface ShareModalProps {
  quote: string;
  author: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const QUOTE_CARD_ID = "quote-card-for-sharing";
const MAX_QUOTE_LENGTH = 280;

/**
 * Generates a data URL for the quote card image.
 */
async function generateQuoteImage(quote: string, author: string): Promise<string | undefined> {
    // Create a temporary element to render the card off-screen
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.left = '-9999px';

    const element = document.createElement('div');
    element.id = QUOTE_CARD_ID;
    
    // This is a trick to get around the fact that we can't easily pass props to a temporary component
    const tempCard = document.createElement('div');
    tempCard.innerHTML = `
        <div id="${QUOTE_CARD_ID}" class="w-[500px] p-8 bg-gradient-to-br from-primary via-primary to-secondary rounded-2xl shadow-xl text-primary-foreground font-body flex flex-col justify-center items-center h-[300px]">
            <p class="text-xl italic mb-6 leading-relaxed text-center">“${quote}”</p>
            <p class="text-xl font-bold self-end">— ${author}</p>
            <div class="absolute bottom-4 text-sm opacity-70 text-primary-foreground/80">
                Eternal Minds ✨
            </div>
        </div>
    `;

    document.body.appendChild(tempCard);
    
    const canvas = await html2canvas(document.getElementById(QUOTE_CARD_ID)!, {
        scale: 2,
        useCORS: true,
        backgroundColor: null,
    });
    
    document.body.removeChild(tempCard);

    return canvas.toDataURL("image/png");
}

/**
 * A modal component for sharing a quote as an image.
 */
export function ShareModal({ quote, author, isOpen, onOpenChange }: ShareModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [editableQuote, setEditableQuote] = useState(quote);
  const { toast } = useToast();
  const { t } = useLocale();

  useEffect(() => {
    // Reset the editable quote when the modal is opened with a new quote
    if(isOpen) {
        setEditableQuote(quote);
    }
  }, [isOpen, quote])

  /**
   * Handles downloading the generated image.
   */
  async function downloadImage() {
    setIsLoading(true);
    const dataUrl = await generateQuoteImage(editableQuote, author);
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
    const dataUrl = await generateQuoteImage(editableQuote, author);
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
            text: `"${editableQuote}" - ${author}`,
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
  const isOverLimit = editableQuote.length > MAX_QUOTE_LENGTH;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Share this Quote</DialogTitle>
          <DialogDescription>
            Edit the quote below, then share it with your friends.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="flex flex-col h-full">
                 <Textarea 
                    value={editableQuote}
                    onChange={(e) => setEditableQuote(e.target.value)}
                    className="flex-1 text-base"
                    maxLength={MAX_QUOTE_LENGTH + 20} // Allow some overflow before hard cut
                 />
                 <p className={`text-sm mt-2 text-right ${isOverLimit ? 'text-destructive' : 'text-muted-foreground'}`}>
                    {editableQuote.length} / {MAX_QUOTE_LENGTH}
                 </p>
            </div>
            <div className="flex justify-center items-center p-4 bg-muted/30 rounded-lg">
                 <div className="transform scale-90">
                    <QuoteCard id="quote-card-preview" quote={editableQuote} author={author} />
                </div>
            </div>
        </div>

        <DialogFooter className="sm:justify-center mt-4">
            {canShare ? (
                <Button onClick={shareImage} disabled={isLoading || isOverLimit} className="w-full sm:w-auto">
                    {isLoading ? <Loader2 className="animate-spin" /> : <Share2 />}
                    <span className="ml-2">Share</span>
                </Button>
            ) : (
                <Button onClick={downloadImage} disabled={isLoading || isOverLimit} className="w-full sm:w-auto">
                    {isLoading ? <Loader2 className="animate-spin" /> : <Download />}
                    <span className="ml-2">Download Image</span>
                </Button>
            )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
