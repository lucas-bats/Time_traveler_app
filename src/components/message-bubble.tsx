"use client";

import { cn } from "@/lib/utils";
import type { Message } from "./chat-area";
import { Button } from "./ui/button";
import { Copy, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MessageBubbleProps {
  message: Message;
  onToggleFavorite: (messageId: string) => void;
}

export function MessageBubble({ message, onToggleFavorite }: MessageBubbleProps) {
  const { toast } = useToast();
  const isUser = message.role === "user";

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    toast({
      title: "Copied to clipboard!",
      description: "The message has been copied.",
    });
  };

  return (
    <div
      className={cn(
        "flex items-end gap-2 group",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && (
         <div className="flex flex-col items-center space-x-2">
            <div className="flex items-center -space-x-2.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => onToggleFavorite(message.id)}>
                    <Star className={cn("h-4 w-4", message.favorited ? "fill-accent text-accent" : "text-muted-foreground")} />
                </Button>
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={handleCopy}>
                    <Copy className="h-4 w-4 text-muted-foreground" />
                </Button>
            </div>
         </div>
      )}
      <div
        className={cn(
          "max-w-md rounded-2xl p-4 text-white",
          isUser
            ? "bg-primary rounded-br-md"
            : "bg-secondary text-secondary-foreground rounded-bl-md"
        )}
      >
        <p className="whitespace-pre-wrap">{message.content}</p>
      </div>
       {isUser && (
         <div className="flex flex-col items-center space-x-2">
            <div className="flex items-center -space-x-2.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={handleCopy}>
                    <Copy className="h-4 w-4 text-muted-foreground" />
                </Button>
            </div>
         </div>
      )}
    </div>
  );
}
