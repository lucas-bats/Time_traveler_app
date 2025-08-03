
"use client";

import { Star } from "lucide-react";
import { useLocale } from "@/lib/locale.tsx";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Message } from "./chat-area";

interface FavoritesSidebarProps {
  messages: Message[];
  characterName: string;
}

export function FavoritesSidebar({ messages, characterName }: FavoritesSidebarProps) {
  const { t } = useLocale();
  const favoritedMessages = messages.filter((msg) => msg.favorited);

  return (
    <div className="hidden lg:flex flex-col bg-card rounded-lg border shadow-sm h-full">
      <div className="p-4 border-b">
        <h3 className="font-headline text-lg text-primary">{t.favoriteMessages}</h3>
      </div>
      <ScrollArea className="flex-1 p-4">
        {favoritedMessages.length > 0 ? (
          <div className="space-y-4">
            {favoritedMessages.map((msg) => (
              <div key={msg.id} className="text-sm p-3 rounded-md bg-background border">
                <p className="text-muted-foreground italic">"{msg.content}"</p>
                <div className="text-right mt-1">
                  <span className="text-xs font-medium text-primary">- {characterName}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
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
