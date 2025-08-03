
"use client";

import { useState, useRef, useEffect } from "react";
import type { Character } from "@/lib/characters";
import { getAiResponse } from "@/app/actions";
import useLocalStorage from "@/hooks/use-local-storage";
import { MessageBubble } from "./message-bubble";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send, Star } from "lucide-react";
import Image from "next/image";
import { QuillLoader } from "./quill-loader";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { useLocale } from "@/lib/locale.tsx";

interface ChatAreaProps {
  character: Character;
}

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  favorited?: boolean;
}

export function ChatArea({ character }: ChatAreaProps) {
  const { t } = useLocale();
  const [messages, setMessages] = useLocalStorage<Message[]>(
    `chat_history_${character.id}`,
    []
  );
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
      if (viewport) {
        viewport.scrollTo({ top: viewport.scrollHeight, behavior: "smooth" });
      }
    }
  }, [messages.length]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessageContent = input.trim();
    const newUserMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: userMessageContent,
    };

    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const result = await getAiResponse({
        historicalFigure: character.name,
        userMessage: userMessageContent,
      });

      if (result.error || !result.response) {
        toast({
          variant: "destructive",
          title: t.error,
          description: result.error || t.somethingWentWrong,
        });
        // On error, remove the optimistically added user message
        setMessages((prevMessages) =>
          prevMessages.filter((msg) => msg.id !== newUserMessage.id)
        );
      } else {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: result.response,
        };
        // On success, add the AI response
        setMessages((prevMessages) => [...prevMessages, aiMessage]);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: t.error,
        description: t.somethingWentWrong,
      });
       // On catastrophic error, also remove the optimistically added user message
       setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg.id !== newUserMessage.id)
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleFavorite = (messageId: string) => {
    setMessages(
      messages.map((msg) =>
        msg.id === messageId ? { ...msg, favorited: !msg.favorited } : msg
      )
    );
  };

  const hasFavorites = messages.some(msg => msg.favorited);

  return (
    <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-6 p-4 md:p-6 h-[calc(100%-4rem)]">
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
            <p className="text-sm text-muted-foreground">{character.field}</p>
          </div>
        </div>
        
        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
            {isLoading && <QuillLoader />}
          </div>
        </ScrollArea>
        
        <div className="p-4 border-t">
          <form onSubmit={handleSubmit} className="flex items-start gap-4">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`${t.ask} ${character.name} ${t.aQuestion}`}
              className="flex-1 resize-none"
              rows={1}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
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
      
      <div className="hidden lg:flex flex-col bg-card rounded-lg border shadow-sm h-full">
        <div className="p-4 border-b">
          <h3 className="font-headline text-lg text-primary">{t.favoriteMessages}</h3>
        </div>
        <ScrollArea className="flex-1 p-4">
          {hasFavorites ? (
            <div className="space-y-4">
              {messages.filter(msg => msg.favorited).map(msg => (
                <div key={msg.id} className="text-sm p-3 rounded-md bg-background border">
                  <p className="text-muted-foreground italic">"{msg.content}"</p>
                  <div className="text-right mt-1">
                    <span className="text-xs font-medium text-primary">- {character.name}</span>
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
    </div>
  );
}
