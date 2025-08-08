// Define que este é um "Client Component".
"use client";

// Importa ícones e hooks.
import { Star } from "lucide-react";
import { useLocale } from "@/lib/locale.tsx";
import { ScrollArea } from "@/components/ui/scroll-area";
// Importa o tipo de dados da mensagem.
import type { Message } from "./chat-area";

// Define a interface para as props do componente.
interface FavoritesSidebarProps {
  messages: Message[];
  characterName: string;
}

/**
 * Componente da barra lateral que exibe as mensagens favoritadas.
 */
export function FavoritesSidebar({ messages, characterName }: FavoritesSidebarProps) {
  // Obtém a função de tradução do contexto de localização.
  const { t } = useLocale();
  // Filtra a lista de mensagens para obter apenas as favoritadas.
  const favoritedMessages = messages.filter((msg) => msg.favorited);

  return (
    // O contêiner da barra lateral, que é oculto em telas menores (lg:flex).
    <div className="hidden lg:flex flex-col bg-card rounded-lg border shadow-sm h-full">
      <div className="p-4 border-b">
        <h3 className="font-headline text-lg text-primary">{t.favoriteMessages}</h3>
      </div>
      <ScrollArea className="flex-1 p-4">
        {/* Verifica se existem mensagens favoritadas. */}
        {favoritedMessages.length > 0 ? (
          // Se houver, mapeia e exibe cada uma.
          <div className="space-y-4">
            {favoritedMessages.map((msg) => (
              <div key={msg.id} className="text-sm p-3 rounded-md bg-background border">
                <p className="text-muted-foreground italic">"{msg.content}"</p>
                <div className="text-right mt-1">
                  {/* Exibe o nome do personagem que disse a mensagem (sempre o assistente). */}
                  <span className="text-xs font-medium text-primary">- {characterName}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Se não houver, exibe uma mensagem de placeholder.
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
