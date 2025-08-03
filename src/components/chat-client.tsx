
"use client";

import { useEffect, useState, type FormEvent } from "react";
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

  const handleSubmit = async (e: FormEvent) => {
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
        historicalFigure: character!.name,
        userMessage: userMessageContent,
        language: locale,
      });

      if (result.error || !result.response) {
        toast({
          variant: "destructive",
          title: t.error,
          description: result.error || t.somethingWentWrong,
        });
        // In case of an error, we now remove the user message that was optimistically added.
        // This is a design choice. Another option is to keep it and show an error state.
        setMessages((prevMessages) => prevMessages.slice(0, prevMessages.length - 1));
      } else {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: result.response,
        };
        setMessages((prevMessages) => [...prevMessages, aiMessage]);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : t.somethingWentWrong;
      toast({
        variant: "destructive",
        title: t.error,
        description: errorMessage,
      });
       // In case of error, the user message is already in the list.
       // We'll remove it to prevent a hanging user message with no response.
       setMessages((prevMessages) => prevMessages.slice(0, prevMessages.length - 1));
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleFavorite = (messageId: string) => {
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.id === messageId ? { ...msg, favorited: !msg.favorited } : msg
      )
    );
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
    <ChatArea
      character={character}
      messages={messages}
      messageCount={messages.length}
      input={input}
      isLoading={isLoading}
      onInputChange={setInput}
      onFormSubmit={handleSubmit}
      onToggleFavorite={handleToggleFavorite}
    />
  );
}
