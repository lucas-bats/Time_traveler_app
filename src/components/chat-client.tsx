
"use client";

import { useEffect, useState, type FormEvent } from "react";
import { notFound } from "next/navigation";
import { getCharacterById, type Character } from "@/lib/characters";
import { ChatArea, type Message } from "@/components/chat-area";
import { getAiResponse } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { useLocale } from "@/lib/locale";

interface ChatClientProps {
  figureId: string;
}

export function ChatClient({ figureId }: ChatClientProps) {
  const [character, setCharacter] = useState<Character | null>(null);
  const [loadingCharacter, setLoadingCharacter] = useState(true);

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const { toast } = useToast();
  const { t } = useLocale();
  const storageKey = `chat_history_${figureId}`;

  useEffect(() => {
    const foundCharacter = getCharacterById(figureId);
    if (foundCharacter) {
      setCharacter(foundCharacter);
      const storedMessages = localStorage.getItem(storageKey);
      if (storedMessages) {
        setMessages(JSON.parse(storedMessages));
      } else {
        setMessages([]);
      }
    }
    setLoadingCharacter(false);
  }, [figureId, storageKey]);

  useEffect(() => {
    if(character) {
      localStorage.setItem(storageKey, JSON.stringify(messages));
    }
  }, [messages, character, storageKey]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessageContent = input.trim();
    const newUserMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: userMessageContent,
    };

    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      const result = await getAiResponse({
        historicalFigure: character!.name,
        userMessage: userMessageContent,
      });

      if (result.error || !result.response) {
        toast({
          variant: "destructive",
          title: t.error,
          description: result.error || t.somethingWentWrong,
        });
        // Revert optimistic update
        setMessages((prevMessages) =>
          prevMessages.filter((msg) => msg.id !== newUserMessage.id)
        );
      } else {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: result.response,
        };
        setMessages((prevMessages) => [...prevMessages, aiMessage]);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: t.error,
        description: t.somethingWentWrong,
      });
      // Revert optimistic update
      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg.id !== newUserMessage.id)
      );
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
      input={input}
      isLoading={isLoading}
      onInputChange={setInput}
      onFormSubmit={handleSubmit}
      onToggleFavorite={handleToggleFavorite}
    />
  );
}
