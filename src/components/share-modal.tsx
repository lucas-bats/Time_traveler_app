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

const QUOTE_CARD_ID_CAPTURE = "quote-card-for-capture";
const MAX_QUOTE_LENGTH = 280;

/**
 * Generates a data URL for the quote card image by rendering it off-screen.
 */
async function generateQuoteImage(quote: string, author: string): Promise<string | undefined> {
    const cardContainer = document.createElement("div");
    cardContainer.style.position = "absolute";
    cardContainer.style.left = "-9999px"; // Position off-screen
    cardContainer.style.top = "0";
    
    // Create a temporary element to render the QuoteCard into
    const tempElement = document.createElement("div");
    tempElement.id = QUOTE_CARD_ID_CAPTURE;
    
    // We need to use React's render method to get the component into the DOM
    const { render } = await import("react-dom");

    document.body.appendChild(cardContainer);
    cardContainer.appendChild(tempElement);
    
    // Use React.createElement to create the QuoteCard instance
    const quoteCardElement = React.createElement(QuoteCard, {
      id: QUOTE_CARD_ID_CAPTURE,
      quote: quote,
      author: author,
      // Add explicit classes to ensure styling is correct outside the modal context
      className: "w-[500px] h-[300px] p-8 bg-gradient-to-br from-primary via-primary to-secondary rounded-2xl shadow-xl text-primary-foreground font-body flex flex-col justify-center items-center"
    });

    // Render the component into the temporary element
    render(quoteCardElement, tempElement);

    // Allow a moment for rendering and font loading
    await new Promise(resolve => setTimeout(resolve, 100));

    try {
        const elementToCapture = document.getElementById(QUOTE_CARD_ID_CAPTURE);
        if (!elementToCapture) {
             console.error(`Element with id ${QUOTE_CARD_ID_CAPTURE} not found.`);
             return undefined;
        }
        const canvas = await html2canvas(elementToCapture, {
            scale: 2,
            useCORS: true,
            backgroundColor: null,
        });
        return canvas.toDataURL("image/png");
    } catch (error) {
        console.error("Error generating canvas:", error);
        return undefined;
    } finally {
        // Clean up by removing the temporary container from the DOM
        document.body.removeChild(cardContainer);
    }
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
      toast({ variant: "destructive", title: t.error, description: t.generatingImageError });
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
       toast({ variant: "destructive", title: t.error, description: t.generatingImageError });
       setIsLoading(false);
      return;
    }

    try {
        const blob = await (await fetch(dataUrl)).blob();
        const file = new File([blob], "quote.png", { type: "image/png" });
        
        const shareTitle = t.quoteBy.replace('{author}', author);

        if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
            await navigator.share({
            files: [file],
            title: shareTitle,
            text: `"${editableQuote}" - ${author}`,
            });
        } else {
            downloadImage();
        }
    } catch (error) {
        console.error("Sharing failed", error);
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
          <DialogTitle>{t.shareQuoteTitle}</DialogTitle>
          <DialogDescription>
            {t.shareQuoteDescription}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="flex flex-col h-full">
                 <Textarea 
                    value={editableQuote}
                    onChange={(e) => setEditableQuote(e.target.value)}
                    className="flex-1 text-base min-h-[300px]"
                    maxLength={MAX_QUOTE_LENGTH + 20}
                 />
                 <p className={`text-sm mt-2 text-right ${isOverLimit ? 'text-destructive' : 'text-muted-foreground'}`}>
                    {editableQuote.length} / {MAX_QUOTE_LENGTH}
                 </p>
            </div>
            <div className="flex justify-center items-center p-4 bg-muted/30 rounded-lg h-full">
                <QuoteCard id="quote-card-preview" quote={editableQuote} author={author} />
            </div>
        </div>

        <DialogFooter className="sm:justify-center mt-4">
            {canShare ? (
                <Button onClick={shareImage} disabled={isLoading || isOverLimit} className="w-full sm:w-auto">
                    {isLoading ? <Loader2 className="animate-spin" /> : <Share2 />}
                    <span className="ml-2">{t.shareAction}</span>
                </Button>
            ) : (
                <Button onClick={downloadImage} disabled={isLoading || isOverLimit} className="w-full sm:w-auto">
                    {isLoading ? <Loader2 className="animate-spin" /> : <Download />}
                    <span className="ml-2">{t.downloadAction}</span>
                </Button>
            )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
