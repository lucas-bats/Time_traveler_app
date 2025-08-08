// Define que este é um "Client Component", executado no navegador.
"use client";

// Importa hooks do React e funções do Next.js.
import { useEffect, useState, type FormEvent, useCallback } from "react";
import { notFound } from "next/navigation";
// Importa funções e tipos de dados de personagens.
import { getCharacterById, type Character } from "@/lib/characters";
// Importa componentes da interface do chat.
import { ChatArea, type Message } from "@/components/chat-area";
// Importa a ação do servidor para obter a resposta da IA.
import { getAiResponse } from "@/app/actions";
// Importa hooks personalizados.
import { useToast } from "@/hooks/use-toast";
import useLocalStorage from "@/hooks/use-local-storage";
import { useLocale } from "@/lib/locale.tsx";

// Define a interface para as props do componente.
interface ChatClientProps {
  figureId: string;
}

/**
 * Componente cliente para a funcionalidade de chat.
 * Gerencia o estado da conversa, incluindo mensagens, input do usuário,
 * e a comunicação com a IA através de Server Actions.
 */
export function ChatClient({ figureId }: ChatClientProps) {
  // Estado para armazenar os dados do personagem atual.
  const [character, setCharacter] = useState<Character | null>(null);
  // Estado para controlar o carregamento dos dados do personagem.
  const [loadingCharacter, setLoadingCharacter] = useState(true);
  // Estado para o texto digitado pelo usuário.
  const [input, setInput] = useState("");
  // Estado para controlar o indicador de carregamento da resposta da IA.
  const [isLoading, setIsLoading] = useState(false);
  
  // Hook para exibir notificações (toasts).
  const { toast } = useToast();
  // Hook para o contexto de localização (idioma).
  const { t, locale } = useLocale();
  // Chave única para o localStorage baseada no ID da figura.
  const storageKey = `chat_history_${figureId}`;
  
  // Hook personalizado para persistir as mensagens do chat no localStorage.
  const [messages, setMessages] = useLocalStorage<Message[]>(storageKey, []);

  // Efeito que busca os dados do personagem quando o figureId muda.
  useEffect(() => {
    const foundCharacter = getCharacterById(figureId);
    if (foundCharacter) {
      setCharacter(foundCharacter);
    }
    setLoadingCharacter(false);
  }, [figureId]);

  /**
   * Função para enviar uma mensagem.
   * Lida com a adição da mensagem do usuário ao estado, chama a IA,
   * e adiciona a resposta do bot.
   */
  const handleSendMessage = useCallback(async (messageContent: string) => {
    // Retorna se a mensagem estiver vazia, se a IA já estiver respondendo, ou se não houver personagem.
    if (!messageContent.trim() || isLoading || !character) return;
  
    // Cria o objeto da mensagem do usuário.
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageContent,
    };
  
    // Captura o estado anterior das mensagens para o caso de erro.
    const previousMessages = messages;
    // Adiciona a mensagem do usuário à lista de forma otimista.
    setMessages([...messages, userMessage]);
    setIsLoading(true);
  
    try {
      // Chama a Server Action para obter a resposta da IA.
      const result = await getAiResponse({
        historicalFigure: character.name,
        userMessage: messageContent,
        language: locale,
      });
  
      // Se houver um erro, exibe um toast e reverte a atualização otimista.
      if (result.error || !result.response) {
        toast({
          variant: "destructive",
          title: t.error,
          description: result.error || t.somethingWentWrong,
        });
        setMessages(previousMessages);
      } else {
        // Se for bem-sucedido, cria o objeto da mensagem da IA.
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: result.response,
        };
        // Adiciona a mensagem da IA à lista de mensagens.
        setMessages([...messages, userMessage, aiMessage]);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : t.somethingWentWrong;
      toast({
        variant: "destructive",
        title: t.error,
        description: errorMessage,
      });
       // Reverte a atualização otimista em caso de exceção.
       setMessages(previousMessages);
    } finally {
      // Garante que o estado de carregamento seja desativado.
      setIsLoading(false);
    }
  }, [character, isLoading, locale, messages, setMessages, t, toast]);

  /**
   * Manipulador para o envio do formulário.
   */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await handleSendMessage(input);
    setInput(""); // Limpa o campo de input após o envio.
  };
  
  /**
   * Manipulador para o clique em uma pergunta sugerida.
   */
  const handleSuggestionClick = async (suggestion: string) => {
    // Define o input com a sugestão para que o usuário veja o que foi enviado.
    setInput(suggestion);
    await handleSendMessage(suggestion);
    setInput(""); // Limpa o campo de input.
  };

  /**
   * Alterna o estado de "favorito" de uma mensagem.
   */
  const handleToggleFavorite = (messageId: string) => {
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.id === messageId ? { ...msg, favorited: !msg.favorited } : msg
      )
    );
  };

  /**
   * Limpa todo o histórico de chat.
   */
  const handleClearChat = () => {
    setMessages([]);
  };

  // Se o personagem ainda estiver carregando, exibe uma mensagem.
  if (loadingCharacter) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p>Loading character...</p>
      </div>
    );
  }

  // Se o personagem não for encontrado, exibe a página de erro 404.
  if (!character) {
    notFound();
    return null;
  }

  // Renderiza a área de chat com todas as props necessárias.
  return (
    <div className="flex-1 flex flex-col min-h-0">
      <ChatArea
        character={character}
        messages={messages}
        messageCount={messages.length}
        input={input}
        isLoading={isLoading}
        onInputChange={setInput}
        onFormSubmit={handleSubmit}
        onToggleFavorite={handleToggleFavorite}
        onClearChat={handleClearChat}
        onSuggestionClick={handleSuggestionClick}
      />
    </div>
  );
}
