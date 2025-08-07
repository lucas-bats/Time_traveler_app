
"use client";

import { useEffect, useState, type FormEvent, useCallback } from "react";
import { notFound } from "next/navigation";
import { getCharacterById, type Character } from "@/lib/characters";
import { ChatArea, type Message } from "@/components/chat-area";
import { getAiResponse } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import useLocalStorage from "@/hooks/use-local-storage";
import { useLocale } from "@/lib/locale.tsx";

interface ChatClientProps {
  figureId: string;
}

export function ChatClient({ figureId }: ChatClientProps) {
  const [character, setCharacter] = useState<Character | null>(null);
  const [loadingCharacter, setLoadingCharacter] = useState(true);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const { toast } = useToast();
  const { t, locale } = useLocale();
  const storageKey = `chat_history_${figureId}`;
  
  const [messages, setMessages] = useLocalStorage<Message[]>(storageKey, []);

  useEffect(() => {
    const foundCharacter = getCharacterById(figureId);
    if (foundCharacter) {
      setCharacter(foundCharacter);
    }
    setLoadingCharacter(false);
  }, [figureId]);

  const handleSendMessage = useCallback(async (messageContent: string) => {
    if (!messageContent.trim() || isLoading || !character) return;
  
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageContent,
    };
  
    // Use functional update to ensure we have the latest state
    setMessages(prevMessages => [...prevMessages, userMessage]);
    
    setIsLoading(true);
  
    try {
      const result = await getAiResponse({
        historicalFigure: character.name,
        userMessage: messageContent,
        language: locale,
      });
  
      if (result.error || !result.response) {
        toast({
          variant: "destructive",
          title: t.error,
          description: result.error || t.somethingWentWrong,
        });
        // Revert optimistic update on error
        setMessages(prevMessages => prevMessages.filter(msg => msg.id !== userMessage.id));
      } else {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: result.response,
        };
        // Use functional update to add AI message
        setMessages(prevMessages => [...prevMessages, aiMessage]);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : t.somethingWentWrong;
      toast({
        variant: "destructive",
        title: t.error,
        description: errorMessage,
      });
      // Revert optimistic update on error
       setMessages(prevMessages => prevMessages.filter(msg => msg.id !== userMessage.id));
    } finally {
      setIsLoading(false);
    }
  }, [character, isLoading, locale, setMessages, t, toast]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await handleSendMessage(input);
    setInput("");
  };
  
  const handleSuggestionClick = async (suggestion: string) => {
    await handleSendMessage(suggestion);
  };

  const handleToggleFavorite = (messageId: string) => {
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.id === messageId ? { ...msg, favorited: !msg.favorited } : msg
      )
    );
  };

  const handleClearChat = () => {
    setMessages([]);
  };

  if (loadingCharacter) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p>Loading character...</p>
      </div>
    );
  }

  if (!character) {
    notFound();
    return null;
  }

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
