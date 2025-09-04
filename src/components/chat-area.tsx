// Defines this as a "Client Component".
"use client";

// Imports React hooks, components, and types.
import { useRef, useEffect, type FormEvent } from "react";
import type { Character } from "@/lib/characters";
import type { Event } from "@/lib/events";
import { MessageBubble } from "./message-bubble";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send, Trash2, MessageSquare, Info } from "lucide-react";
import Image from "next/image";
import { QuillLoader } from "./quill-loader";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLocale } from "@/lib/locale";
import { FavoritesSidebar, FavoritesSidebarContent } from "./favorites-sidebar";
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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getInfluencedBy, getInfluencesFor } from "@/lib/connections";
import { CharacterConnections } from "./character-connections";
import { getCharacterById } from "@/lib/characters";


// Defines the structure of a message in the chat.
export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  favorited?: boolean;
}

// Defines a generic type for the chat subject (either Character or Event).
export type ChatSubject = (Character & { type: 'character' }) | (Event & { type: 'event' });

// Defines the interface for the ChatArea component's props.
interface ChatAreaProps {
  subject: ChatSubject;
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
  subject,
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
  const { t, locale } = useLocale();
  const scrollViewportRef = useRef<HTMLDivElement>(null);
  
  const isCharacter = subject.type === 'character';
  const isEvent = subject.type === 'event';

  const suggestions = isCharacter
    ? [t.tellMeAboutYourLife, t.tellMeAboutYourWork]
    : [t.whatWereTheCauses, t.whatWereTheConsequences];

  const influences = isCharacter ? getInfluencesFor(subject.id) : [];
  const influenced = isCharacter ? getInfluencedBy(subject.id) : [];
  const participants = isEvent ? subject.participants.map(id => getCharacterById(id)).filter(Boolean) as Character[] : [];

  useEffect(() => {
    if (scrollViewportRef.current) {
      scrollViewportRef.current.scrollTo({
        top: scrollViewportRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messageCount]);
  
  const subjectName = locale === 'pt' && 'name_pt' in subject ? subject.name_pt : subject.name;
  
  const placeholderText = isEvent
    ? `${t.askAbout} ${subjectName}...`
    : `${t.ask} ${subjectName}...`;
    
  const subjectArea = isCharacter
    ? locale === 'pt' ? subject.field_pt : subject.field
    : locale === 'pt' ? subject.area_pt : subject.area;

  return (
    <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-6 p-2 md:p-6 min-h-0">
      <div className="flex flex-col h-full bg-card rounded-lg border shadow-sm min-h-0">
        <div className="flex items-center justify-between p-4 border-b shrink-0">
          <div className="flex items-center">
            <Image
              src={subject.image || 'https://placehold.co/128x128.png'}
              alt={subjectName}
              width={48}
              height={48}
              className="rounded-full object-cover w-12 h-12"
              data-ai-hint={isCharacter ? subject.aiHint : 'historical event'}
            />
            <div className="ml-4">
              <h2 className="font-headline text-xl text-primary">{subjectName}</h2>
              <p className="text-sm text-muted-foreground">{subjectArea}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label={t.details}>
                    <Info className="h-5 w-5 text-muted-foreground" />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>{t.details}</SheetTitle>
                  </SheetHeader>
                  <div className="mt-4 h-[calc(100%-4rem)]">
                     <FavoritesSidebarContent 
                        subject={subject}
                        messages={messages} 
                        participants={participants}
                     />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
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
                    <AlertDialogDescription>{t.clearChatConfirmation}</AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>{t.cancel}</AlertDialogCancel>
                    <AlertDialogAction onClick={onClearChat}>{t.clear}</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </div>
        
        <div className="flex-1 flex flex-col min-h-0">
          <Tabs defaultValue="chat" className="flex flex-col flex-1 min-h-0">
            {isCharacter && (
              <div className="px-4 mt-4 shrink-0">
                <TabsList>
                    <TabsTrigger value="chat"><MessageSquare className="mr-2 h-4 w-4"/>{t.chat}</TabsTrigger>
                    <TabsTrigger value="connections">{t.connections}</TabsTrigger>
                </TabsList>
              </div>
            )}

            <div className="flex-1 min-h-0 mt-2">
              <TabsContent value="chat" className="h-full">
                  <ScrollArea className="h-full p-4" viewportRef={scrollViewportRef}>
                      {messages.length === 0 && !isLoading && (
                      <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground p-4">
                          <p className="mb-4">
                            {isEvent 
                                ? `${t.askAbout} ${subjectName}...`
                                : `${t.ask} ${subjectName}...`
                            }
                          </p>
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
                      {messages.map((message) => (
                      <MessageBubble key={message.id} message={message} onToggleFavorite={onToggleFavorite} />
                      ))}
                      {isLoading && <QuillLoader />}
                    </div>
                  </ScrollArea>
              </TabsContent>
              
              {isCharacter && (
                <TabsContent value="connections" className="h-full">
                    <ScrollArea className="h-full p-4">
                        <CharacterConnections influences={influences} influenced={influenced} />
                    </ScrollArea>
                </TabsContent>
              )}
            </div>
          </Tabs>
        </div>
        
        <div className="p-4 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shrink-0">
          <form onSubmit={onFormSubmit} className="flex items-start gap-4">
            <Textarea
              value={input}
              onChange={(e) => onInputChange(e.target.value)}
              placeholder={placeholderText}
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
      
      <div className="hidden lg:block">
        <FavoritesSidebar 
          subject={subject}
          messages={messages} 
          participants={participants}
        />
      </div>
    </div>
  );
}
