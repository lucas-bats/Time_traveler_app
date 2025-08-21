// Defines this as a "Client Component".
"use client";

// Imports React hooks, components, and types.
import { useRef, useEffect, type FormEvent } from "react";
import type { Character } from "@/lib/characters";
import { MessageBubble } from "./message-bubble";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send, Trash2 } from "lucide-react";
import Image from "next/image";
import { QuillLoader } from "./quill-loader";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLocale } from "@/lib/locale.tsx";
import { FavoritesSidebar } from "./favorites-sidebar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getInfluencedBy, getInfluencesFor, type DetailedConnection } from "@/lib/connections";
import { CharacterConnections } from "./character-connections";

// Defines the structure of a message in the chat.
export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  favorited?: boolean;
}

// Defines the interface for the ChatArea component's props.
interface ChatAreaProps {
  character: Character;
  messages: Message[];
  messageCount: number;
  input: string;
  isLoading: boolean;
  onInputChange: (input: string) => void;
  onFormSubmit: (e: FormEvent) => void;
  onToggleFavorite: (messageId: string) => void;
  onClearChat: () => void;
  onSuggestionClick: (suggestion: string) => void;
}

/**
 * Main component for the chat area.
 * It is responsible for displaying messages, the input field, and the favorites sidebar.
 */
export function ChatArea({
  character,
  messages,
  messageCount,
  input,
  isLoading,
  onInputChange,
  onFormSubmit,
  onToggleFavorite,
  onClearChat,
  onSuggestionClick,
}: ChatAreaProps) {
  // Gets the localization context.
  const { t, locale } = useLocale();
  // Ref for the scroll area to control scrolling.
  const scrollViewportRef = useRef<HTMLDivElement>(null);
  
  // Defines the initial question suggestions.
  const suggestions = [t.tellMeAboutYourLife, t.tellMeAboutYourWork];

  // Gets connection data for the character.
  const influences = getInfluencesFor(character.id);
  const influenced = getInfluencedBy(character.id);

  // Effect that scrolls the chat area to the bottom whenever a new message is added.
  useEffect(() => {
    if (scrollViewportRef.current) {
      scrollViewportRef.current.scrollTo({
        top: scrollViewportRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messageCount]);
  
  return (
    // Main layout that divides the chat area and the favorites sidebar.
    <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-6 p-2 md:p-6 min-h-0 h-full">
      <div className="flex flex-col h-full bg-card rounded-lg border shadow-sm flex-1 min-h-0">
        {/* Header of the chat area with the character's image and name. */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center">
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
          {/* Button to clear the chat, visible only if there are messages. */}
          {messages.length > 0 && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon" aria-label={t.clearChat}>
                  <Trash2 className="h-5 w-5 text-muted-foreground" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>{t.areYouSure}</AlertDialogTitle>
                  <AlertDialogDescription>
                    {t.clearChatConfirmation}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>{t.cancel}</AlertDialogCancel>
                  <AlertDialogAction onClick={onClearChat}>
                    {t.clear}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
        
        <Tabs defaultValue="chat" className="flex-1 flex flex-col min-h-0">
          <TabsList className="mx-4 mt-4">
            <TabsTrigger value="chat">{t.chat}</TabsTrigger>
            <TabsTrigger value="connections">{t.connections}</TabsTrigger>
          </TabsList>
          <TabsContent value="chat" className="flex-1 flex flex-col min-h-0">
            {/* Scrollable area where messages are displayed. */}
            <ScrollArea className="flex-1 p-4" viewportRef={scrollViewportRef}>
                {/* If there are no messages and it's not loading, display suggestions. */}
                {messages.length === 0 && !isLoading && (
                  <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground p-4">
                      <p className="mb-4">{`${t.ask} ${character.name} ${t.aQuestion}`}</p>
                      <div className="flex flex-col sm:flex-row gap-2">
                        {suggestions.map((suggestion, i) => (
                          <Button key={i} variant="outline" size="sm" onClick={() => onSuggestionClick(suggestion)}>
                            "{suggestion}"
                          </Button>
                        ))}
                      </div>
                  </div>
                )}
              <div className="space-y-4">
                {/* Maps and renders each message. */}
                {messages.map((message) => (
                  <MessageBubble
                    key={message.id}
                    message={message}
                    onToggleFavorite={onToggleFavorite}
                  />
                ))}
                {/* Shows the "typing" loader while the AI is responding. */}
                {isLoading && <QuillLoader />}
              </div>
            </ScrollArea>
          </TabsContent>
          <TabsContent value="connections" className="flex-1 min-h-0">
             <ScrollArea className="h-full p-4">
                <CharacterConnections influences={influences} influenced={influenced} />
             </ScrollArea>
          </TabsContent>
        </Tabs>
        
        {/* Bottom section with the message submission form. */}
        <div className="p-4 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <form onSubmit={onFormSubmit} className="flex items-start gap-4">
            <Textarea
              value={input}
              onChange={(e) => onInputChange(e.target.value)}
              placeholder={`${t.ask} ${character.name} ${t.aQuestion}`}
              className="flex-1 resize-none"
              rows={1}
              onKeyDown={(e) => {
                // Allows sending with "Enter" and line break with "Shift + Enter".
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
      
      {/* Sidebar to display favorited messages. */}
      <FavoritesSidebar messages={messages} characterName={character.name} />
    </div>
  );
}
