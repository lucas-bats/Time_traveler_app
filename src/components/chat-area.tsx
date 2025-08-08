// Define que este é um "Client Component".
"use client";

// Importa hooks do React, componentes e tipos.
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

// Define a estrutura de uma mensagem no chat.
export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  favorited?: boolean;
}

// Define a interface para as props do componente ChatArea.
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
 * Componente principal da área de chat.
 * É responsável por exibir as mensagens, o campo de entrada e a barra lateral de favoritos.
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
  // Obtém o contexto de localização.
  const { t, locale } = useLocale();
  // Ref para a área de rolagem para controlar o scroll.
  const scrollViewportRef = useRef<HTMLDivElement>(null);
  
  // Define as sugestões de perguntas iniciais.
  const suggestions = [t.tellMeAboutYourLife, t.tellMeAboutYourWork];

  // Efeito que rola a área de chat para o final sempre que uma nova mensagem é adicionada.
  useEffect(() => {
    if (scrollViewportRef.current) {
      scrollViewportRef.current.scrollTo({
        top: scrollViewportRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messageCount]);
  
  return (
    // Layout principal que divide a área de chat e a barra lateral de favoritos.
    <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-6 p-2 md:p-6 min-h-0 h-full">
      <div className="flex flex-col h-full bg-card rounded-lg border shadow-sm flex-1 min-h-0">
        {/* Cabeçalho da área de chat com imagem e nome do personagem. */}
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
          {/* Botão para limpar o chat, visível apenas se houver mensagens. */}
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
        
        {/* Área de rolagem onde as mensagens são exibidas. */}
        <ScrollArea className="flex-1 p-4" viewportRef={scrollViewportRef}>
            {/* Se não houver mensagens e não estiver carregando, exibe as sugestões. */}
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
            {/* Mapeia e renderiza cada mensagem. */}
            {messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                onToggleFavorite={onToggleFavorite}
              />
            ))}
            {/* Mostra o loader de "digitando" enquanto a IA responde. */}
            {isLoading && <QuillLoader />}
          </div>
        </ScrollArea>
        
        {/* Seção inferior com o formulário de envio de mensagem. */}
        <div className="p-4 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <form onSubmit={onFormSubmit} className="flex items-start gap-4">
            <Textarea
              value={input}
              onChange={(e) => onInputChange(e.target.value)}
              placeholder={`${t.ask} ${character.name} ${t.aQuestion}`}
              className="flex-1 resize-none"
              rows={1}
              onKeyDown={(e) => {
                // Permite enviar com "Enter" e quebrar linha com "Shift + Enter".
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
      
      {/* Barra lateral para exibir mensagens favoritadas. */}
      <FavoritesSidebar messages={messages} characterName={character.name} />
    </div>
  );
}
