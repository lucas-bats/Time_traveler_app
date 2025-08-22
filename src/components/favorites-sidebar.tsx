// Defines this as a "Client Component".
"use client";

import { Star, Users } from "lucide-react";
import { useLocale } from "@/lib/locale.tsx";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Message } from "./chat-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Character } from "@/lib/characters";
import type { Event } from "@/lib/events";
import Image from "next/image";
import Link from "next/link";

type ChatSubject = (Character & { type: 'character' }) | (Event & { type: 'event' });

interface FavoritesSidebarProps {
  subject: ChatSubject;
  messages: Message[];
  participants: Character[];
}

/**
 * Sidebar component that displays favorited messages and event participants.
 */
export function FavoritesSidebar({ subject, messages, participants }: FavoritesSidebarProps) {
  const { t, locale } = useLocale();
  const favoritedMessages = messages.filter((msg) => msg.favorited);

  const isEvent = subject.type === 'event';
  const subjectName = locale === 'pt' && 'name_pt' in subject ? subject.name_pt : subject.name;
  const defaultTab = isEvent ? "participants" : "favorites";

  return (
    <div className="hidden lg:flex flex-col bg-card rounded-lg border shadow-sm h-full">
      <Tabs defaultValue={defaultTab} className="flex flex-col h-full">
        <div className="p-4 border-b">
          <TabsList className="grid w-full grid-cols-2">
            {isEvent && <TabsTrigger value="participants"><Users className="mr-2 h-4 w-4" />{t.participants}</TabsTrigger>}
            <TabsTrigger value="favorites" className={isEvent ? "" : "col-span-2"}><Star className="mr-2 h-4 w-4" />{t.favoriteMessages}</TabsTrigger>
          </TabsList>
        </div>

        {isEvent && (
          <TabsContent value="participants" className="flex-1 overflow-auto">
            <ScrollArea className="h-full p-4">
              <div className="space-y-4">
                {participants.map(p => (
                  <div key={p.id} className="flex items-start gap-4 p-3 rounded-md border bg-background">
                    <Image src={p.image} alt={p.name} width={40} height={40} className="rounded-full w-10 h-10 object-cover" />
                    <div className="flex-1">
                      <Link href={`/chat/${p.id}`} className="font-bold hover:underline">{p.name}</Link>
                      <p className="text-sm text-muted-foreground line-clamp-2">{locale === 'pt' ? p.description_pt : p.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        )}

        <TabsContent value="favorites" className="flex-1 overflow-auto">
          <ScrollArea className="h-full p-4">
            {favoritedMessages.length > 0 ? (
              <div className="space-y-4">
                {favoritedMessages.map((msg) => (
                  <div key={msg.id} className="text-sm p-3 rounded-md bg-background border">
                    <p className="text-muted-foreground italic">"{msg.content}"</p>
                    <div className="text-right mt-1">
                      <span className="text-xs font-medium text-primary">- {subjectName}</span>
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
        </TabsContent>
      </Tabs>
    </div>
  );
}
