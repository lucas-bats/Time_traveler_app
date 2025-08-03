"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { getCharacterById, type Character } from "@/lib/characters";
import { ChatArea } from "@/components/chat-area";

interface ChatClientProps {
  figureId: string;
}

export function ChatClient({ figureId }: ChatClientProps) {
  const [character, setCharacter] = useState<Character | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const foundCharacter = getCharacterById(figureId);
    if (foundCharacter) {
      setCharacter(foundCharacter);
    } else {
      setError(true);
    }
  }, [figureId]);

  if (error) {
    notFound();
  }

  if (!character) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return <ChatArea character={character} />;
}
