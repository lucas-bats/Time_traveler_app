// Defines this as a "Client Component".
"use client";

// Imports utilities and components.
import { cn } from "@/lib/utils";
import type { Message } from "./chat-area";
import { Button } from "./ui/button";
import { Copy, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLocale } from "@/lib/locale.tsx";

// Defines the interface for the component's props.
interface MessageBubbleProps {
  message: Message;
  onToggleFavorite: (messageId: string) => void;
}

/**
 * Component that renders a single message bubble in the chat.
 * Includes the message content and actions like copy and favorite.
 */
export function MessageBubble({ message, onToggleFavorite }: MessageBubbleProps) {
  // Gets the translation function.
  const { t } = useLocale();
  // Hook to display notifications.
  const { toast } = useToast();
  // Checks if the message is from the user.
  const isUser = message.role === "user";

  /**
   * Handler to copy the message content to the clipboard.
   */
  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    toast({
      title: t.copiedToClipboard,
      description: t.messageCopied,
    });
  };

  return (
    // Main container of the bubble, aligned right for the user and left for the assistant.
    <div
      className={cn(
        "flex items-end gap-2 group",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {/* Actions (Favorite, Copy) - appear on hover for assistant messages. */}
      {!isUser && (
         <div className="flex flex-col items-center space-x-2 self-end">
            <div className="flex items-center -space-x-2.5 opacity-0 group-hover:opacity-100 transition-opacity">
                {/* Favorite button */}
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => onToggleFavorite(message.id)}>
                    <Star className={cn("h-4 w-4", message.favorited ? "fill-accent text-accent" : "text-muted-foreground")} />
                </Button>
                {/* Copy button */}
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={handleCopy}>
                    <Copy className="h-4 w-4 text-muted-foreground" />
                </Button>
            </div>
         </div>
      )}
      {/* The message bubble with the text content. */}
      <div
        className={cn(
          "max-w-md rounded-2xl p-4",
          isUser
            ? "bg-primary text-primary-foreground rounded-br-md" // Style for the user
            : "bg-secondary text-secondary-foreground rounded-bl-md" // Style for the assistant
        )}
      >
        <p className="whitespace-pre-wrap">{message.content}</p>
      </div>
      {/* Copy action - appears on hover for user messages. */}
       {isUser && (
         <div className="flex flex-col items-center space-x-2 self-end">
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
