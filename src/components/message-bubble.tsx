// Define que este é um "Client Component".
"use client";

// Importa utilitários e componentes.
import { cn } from "@/lib/utils";
import type { Message } from "./chat-area";
import { Button } from "./ui/button";
import { Copy, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLocale } from "@/lib/locale.tsx";

// Define a interface para as props do componente.
interface MessageBubbleProps {
  message: Message;
  onToggleFavorite: (messageId: string) => void;
}

/**
 * Componente que renderiza uma única bolha de mensagem no chat.
 * Inclui o conteúdo da mensagem e ações como copiar e favoritar.
 */
export function MessageBubble({ message, onToggleFavorite }: MessageBubbleProps) {
  // Obtém a função de tradução.
  const { t } = useLocale();
  // Hook para exibir notificações.
  const { toast } = useToast();
  // Verifica se a mensagem é do usuário.
  const isUser = message.role === "user";

  /**
   * Manipulador para copiar o conteúdo da mensagem para a área de transferência.
   */
  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    toast({
      title: t.copiedToClipboard,
      description: t.messageCopied,
    });
  };

  return (
    // Contêiner principal da bolha, alinhado à direita para o usuário e à esquerda para o assistente.
    <div
      className={cn(
        "flex items-end gap-2 group",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {/* Ações (Favoritar, Copiar) - aparecem no hover para mensagens do assistente. */}
      {!isUser && (
         <div className="flex flex-col items-center space-x-2">
            <div className="flex items-center -space-x-2.5 opacity-0 group-hover:opacity-100 transition-opacity">
                {/* Botão de favoritar */}
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => onToggleFavorite(message.id)}>
                    <Star className={cn("h-4 w-4", message.favorited ? "fill-accent text-accent" : "text-muted-foreground")} />
                </Button>
                {/* Botão de copiar */}
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={handleCopy}>
                    <Copy className="h-4 w-4 text-muted-foreground" />
                </Button>
            </div>
         </div>
      )}
      {/* A bolha de mensagem com o conteúdo de texto. */}
      <div
        className={cn(
          "max-w-md rounded-2xl p-4 text-white",
          isUser
            ? "bg-primary rounded-br-md" // Estilo para o usuário
            : "bg-secondary text-secondary-foreground rounded-bl-md" // Estilo para o assistente
        )}
      >
        <p className="whitespace-pre-wrap">{message.content}</p>
      </div>
      {/* Ação de copiar - aparece no hover para mensagens do usuário. */}
       {isUser && (
         <div className="flex flex-col items-center space-x-2">
            <div className="flex items-center -space-x-2.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={handleCopy}>
                    <Copy className="h-4 w-4 text-muted-foreground" />
                </Button>
            </div>
         </div>
      )}
    </div>
  );
}
