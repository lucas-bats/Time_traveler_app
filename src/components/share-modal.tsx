"use client";

import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
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
  authorImage?: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const QUOTE_CARD_ID_CAPTURE = "quote-card-for-capture";
const MAX_QUOTE_LENGTH = 280;

/**
 * Generates a data URL for the quote card image by rendering it off-screen using the modern createRoot API.
 */
async function generateQuoteImage(quote: string, author: string, authorImage: string | undefined, disclaimerText: string): Promise<string | undefined> {
  const cardContainer = document.createElement("div");
  // Position it off-screen
  cardContainer.style.position = "absolute";
  cardContainer.style.left = "-9999px";
  cardContainer.style.top = "-9999px";
  document.body.appendChild(cardContainer);

  const root = createRoot(cardContainer);

  try {
    // Render the component and wait for it to be committed to the DOM
    await new Promise<void>((resolve) => {
      root.render(
        <React.StrictMode>
          <QuoteCard
            id={QUOTE_CARD_ID_CAPTURE}
            quote={quote}
            author={author}
            authorImage={authorImage}
            disclaimerText={disclaimerText}
            className="w-[500px] h-[300px]"
          />
        </React.StrictMode>
      );
      // Use a short timeout to allow the browser to paint the component
      setTimeout(resolve, 100);
    });

    const elementToCapture = document.getElementById(QUOTE_CARD_ID_CAPTURE);
    if (!elementToCapture) {
      console.error("Element to capture not found.");
      return undefined;
    }

    const canvas = await html2canvas(elementToCapture, {
      scale: 2,
      useCORS: true,
      backgroundColor: null,
      allowTaint: true,
    });
    return canvas.toDataURL("image/png");
  } catch (error) {
    console.error("Error generating canvas:", error);
    return undefined;
  } finally {
    // Unmount the component and remove the container
    root.unmount();
    document.body.removeChild(cardContainer);
  }
}


/**
 * A modal component for sharing a quote as an image.
 */
export function ShareModal({ quote, author, authorImage, isOpen, onOpenChange }: ShareModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [editableQuote, setEditableQuote] = useState(quote);
  const { toast } = useToast();
  const { t } = useLocale();

  useEffect(() => {
    if(isOpen) {
        setEditableQuote(quote);
    }
  }, [isOpen, quote])

  const disclaimer = t.aiGeneratedBy.replace('{appName}', 'Eternal Minds ✨');

  async function handleAction(action: 'share' | 'download') {
    setIsLoading(true);
    try {
      const dataUrl = await generateQuoteImage(editableQuote, author, authorImage, disclaimer);
      if (!dataUrl) {
        toast({ variant: "destructive", title: t.error, description: t.generatingImageError });
        return;
      }
      
      const blob = await(await fetch(dataUrl)).blob();
      const file = new File([blob], "quote.png", { type: "image/png" });

      if (action === 'share' && navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        const shareTitle = t.quoteBy.replace('{author}', author);
        await navigator.share({
            files: [file],
            title: shareTitle,
            text: `"${editableQuote}" - ${author}`,
        });
      } else {
        // Fallback to download
        const link = document.createElement("a");
        link.download = `eternal-minds-quote-${author.toLowerCase().replace(/ /g, "_")}.png`;
        link.href = dataUrl;
        link.click();
      }
    } catch (error) {
      if (!(error instanceof DOMException && error.name === 'AbortError')) {
        console.error("Sharing/Downloading failed", error);
        toast({ variant: "destructive", title: t.error, description: t.generatingImageError });
      }
    } finally {
      setIsLoading(false);
    }
  }
  
  const canShare = typeof navigator !== 'undefined' && !!navigator.share;
  const isOverLimit = editableQuote.length > MAX_QUOTE_LENGTH;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t.shareQuoteTitle}</DialogTitle>
          <DialogDescription>
            {t.shareQuoteDescription}
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col gap-4">
             <Textarea 
                value={editableQuote}
                onChange={(e) => setEditableQuote(e.target.value)}
                className="text-base min-h-[200px]"
                maxLength={MAX_QUOTE_LENGTH + 20}
             />
             <p className={`text-sm mt-2 text-right ${isOverLimit ? 'text-destructive' : 'text-muted-foreground'}`}>
                {editableQuote.length} / {MAX_QUOTE_LENGTH}
             </p>
        </div>

        <DialogFooter>
            {canShare ? (
                <Button onClick={() => handleAction('share')} disabled={isLoading || isOverLimit} className="w-full sm:w-auto">
                    {isLoading ? <Loader2 className="animate-spin" /> : <Share2 className="mr-2 h-4 w-4" />}
                    {t.shareAction}
                </Button>
            ) : (
                <Button onClick={() => handleAction('download')} disabled={isLoading || isOverLimit} className="w-full sm:w-auto">
                    {isLoading ? <Loader2 className="animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
                    {t.downloadAction}
                </Button>
            )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
