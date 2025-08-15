// Defines this as a "Client Component".
"use client";

// Imports icons and hooks.
import { Star } from "lucide-react";
import { useLocale } from "@/lib/locale.tsx";
import { ScrollArea } from "@/components/ui/scroll-area";
// Imports the message data type.
import type { Message } from "./chat-area";

// Defines the interface for the component's props.
interface FavoritesSidebarProps {
  messages: Message[];
  characterName: string;
}

/**
 * Sidebar component that displays favorited messages.
 */
export function FavoritesSidebar({ messages, characterName }: FavoritesSidebarProps) {
  // Gets the translation function from the localization context.
  const { t } = useLocale();
  // Filters the message list to get only the favorited ones.
  const favoritedMessages = messages.filter((msg) => msg.favorited);

  return (
    // The sidebar container, which is hidden on smaller screens (lg:flex).
    <div className="hidden lg:flex flex-col bg-card rounded-lg border shadow-sm h-full">
      <div className="p-4 border-b">
        <h3 className="font-headline text-lg text-primary">{t.favoriteMessages}</h3>
      </div>
      <ScrollArea className="flex-1 p-4">
        {/* Checks if there are any favorited messages. */}
        {favoritedMessages.length > 0 ? (
          // If there are, map and display each one.
          <div className="space-y-4">
            {favoritedMessages.map((msg) => (
              <div key={msg.id} className="text-sm p-3 rounded-md bg-background border">
                <p className="text-muted-foreground italic">"{msg.content}"</p>
                <div className="text-right mt-1">
                  {/* Displays the name of the character who said the message (always the assistant). */}
                  <span className="text-xs font-medium text-primary">- {characterName}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // If not, display a placeholder message.
          <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground p-4">
            <Star className="w-10 h-10 mb-2" />
            <p>{t.yourFavoriteMessages}</p>
            <p className="text-xs">{t.clickStarToSave}</p>
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
