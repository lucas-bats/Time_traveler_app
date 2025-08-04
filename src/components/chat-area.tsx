
"use client";

import { useRef, useEffect, type FormEvent } from "react";
import type { Character } from "@/lib/characters";
import { MessageBubble } from "./message-bubble";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import Image from "next/image";
import { QuillLoader } from "./quill-loader";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLocale } from "@/lib/locale.tsx";
import { FavoritesSidebar } from "./favorites-sidebar";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  favorited?: boolean;
}

interface ChatAreaProps {
  character: Character;
  messages: Message[];
  messageCount: number;
  input: string;
  isLoading: boolean;
  onInputChange: (input: string) => void;
  onFormSubmit: (e: FormEvent) => Promise<void>;
  onToggleFavorite: (messageId: string) => void;
}

export function ChatArea({
  character,
  messages,
  messageCount,
  input,
  isLoading,
  onInputChange,
  onFormSubmit,
  onToggleFavorite,
}: ChatAreaProps) {
  const { t, locale } = useLocale();
  const scrollViewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollViewportRef.current) {
      scrollViewportRef.current.scrollTo({
        top: scrollViewportRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messageCount]);
  
  return (
    <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-6 p-2 md:p-6 min-h-0 h-full">
      <div className="flex flex-col h-full bg-card rounded-lg border shadow-sm">
        <div className="flex items-center p-4 border-b">
          <Image
            src={character.image}
            alt={character.name}
            width={48}
            height={48}
            className="rounded-full object-cover w-12 h-12"
            data-ai-hint={character.aiHint}
          />
          <div className="ml-4">
            <h2 className="font-headline text-xl text-primary">{character.name}</h2>
            <p className="text-sm text-muted-foreground">{locale === 'pt' ? character.field_pt : character.field}</p>
          </div>
        </div>
        
        <ScrollArea className="flex-1 p-4" viewportRef={scrollViewportRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                onToggleFavorite={onToggleFavorite}
              />
            ))}
            {isLoading && <QuillLoader />}
          </div>
        </ScrollArea>
        
        <div className="p-4 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <form onSubmit={onFormSubmit} className="flex items-start gap-4">
            <Textarea
              value={input}
              onChange={(e) => onInputChange(e.target.value)}
              placeholder={`${t.ask} ${character.name} ${t.aQuestion}`}
              className="flex-1 resize-none"
              rows={1}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  onFormSubmit(e);
                }
              }}
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading || !input.trim()} size="icon">
              <Send className="h-5 w-5" />
            </Button>
          </form>
        </div>
      </div>
      
      <FavoritesSidebar messages={messages} characterName={character.name} />
    </div>
  );
}
