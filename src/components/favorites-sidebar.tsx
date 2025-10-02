"use client";

import { Star, Users, Share2 } from "lucide-react";
import { useLocale } from "@/lib/locale";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Message } from "./chat-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Character } from "@/lib/characters";
import type { Event } from "@/lib/events";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { useState } from "react";
import { ShareModal } from "./share-modal";


type ChatSubject = (Character & { type: 'character' }) | (Event & { type: 'event' });

interface FavoritesSidebarProps {
  subject: ChatSubject;
  messages: Message[];
  participants: Character[];
}

/**
 * Reusable content component for the sidebar/sheet.
 */
export function FavoritesSidebarContent({ subject, messages, participants }: FavoritesSidebarProps) {
  const { t, locale } = useLocale();
  const favoritedMessages = messages.filter((msg) => msg.favorited);

  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState<{ quote: string; author: string, authorImage?: string } | null>(null);

  const handleShareClick = (quote: string, author: string, authorImage?: string) => {
    setSelectedQuote({ quote, author, authorImage });
    setShareModalOpen(true);
  };

  const isEvent = subject.type === 'event';
  const subjectName = locale === 'pt' && 'name_pt' in subject ? subject.name_pt : subject.name;
  const subjectImage = subject.image;
  const defaultTab = isEvent ? "participants" : "favorites";

  return (
    <>
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
                  <div key={msg.id} className="text-sm p-3 rounded-md bg-background border group">
                    <p className="text-muted-foreground italic">"{msg.content}"</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs font-medium text-primary">- {subjectName}</span>
                       <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleShareClick(msg.content, subjectName, subjectImage)}
                        >
                          <Share2 className="h-4 w-4" />
                       </Button>
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
      {selectedQuote && (
        <ShareModal 
            isOpen={shareModalOpen}
            onOpenChange={setShareModalOpen}
            quote={selectedQuote.quote}
            author={selectedQuote.author}
            authorImage={selectedQuote.authorImage}
        />
      )}
    </>
  )
}


/**
 * Sidebar container component for desktop view.
 */
export function FavoritesSidebar(props: FavoritesSidebarProps) {
  return (
    <div className="flex flex-col bg-card rounded-lg border shadow-sm h-full">
      <FavoritesSidebarContent {...props} />
    </div>
  );
}
