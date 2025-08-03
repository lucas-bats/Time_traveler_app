
"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { getCharacterById, type Character } from "@/lib/characters";
import { ChatArea, type Message } from "@/components/chat-area";
import useLocalStorage from "@/hooks/use-local-storage";

interface ChatClientProps {
  figureId: string;
}

export function ChatClient({ figureId }: ChatClientProps) {
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);
  
  const [messages, setMessages] = useLocalStorage<Message[]>(
    `chat_history_${figureId}`,
    []
  );

  useEffect(() => {
    const foundCharacter = getCharacterById(figureId);
    if (foundCharacter) {
      setCharacter(foundCharacter);
    } else {
      // We still render the component but show a not found message inside,
      // calling notFound() here can cause issues with state hooks.
    }
    setLoading(false);
  }, [figureId]);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p>Loading character...</p>
      </div>
    );
  }
  
  if (!character) {
      // Since notFound() can't be used with client components that use hooks,
      // we render a "not found" state within the client component.
      return (
        <div className="flex-1 flex items-center justify-center">
          <p>Character not found.</p>
        </div>
      );
  }

  return <ChatArea character={character} messages={messages} setMessages={setMessages} />;
}
