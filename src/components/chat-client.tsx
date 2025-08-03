
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundCharacter = getCharacterById(figureId);
    if (foundCharacter) {
      setCharacter(foundCharacter);
    } else {
      notFound();
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
      // This case should ideally not be reached if notFound() is called correctly.
      // It's here as a safeguard.
      return null;
  }

  return <ChatArea character={character} />;
}
