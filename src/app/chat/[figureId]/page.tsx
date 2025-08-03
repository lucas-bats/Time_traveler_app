"use client";

import { getCharacterById } from "@/lib/characters";
import { notFound, useParams } from "next/navigation";
import { ChatArea } from "@/components/chat-area";
import { SiteHeader } from "@/components/site-header";
import { useLocale } from "@/lib/locale.tsx";
import { useEffect, useState } from "react";
import type { Character } from "@/lib/characters";

export default function ChatPage() {
  useLocale(); // Initialize locale context
  const params = useParams();
  const [character, setCharacter] = useState<Character | null>(null);

  useEffect(() => {
    if (params.figureId) {
      const figureId = Array.isArray(params.figureId) ? params.figureId[0] : params.figureId;
      const foundCharacter = getCharacterById(figureId);
      if (foundCharacter) {
        setCharacter(foundCharacter);
      } else {
        notFound();
      }
    }
  }, [params.figureId]);

  if (!character) {
    // You can render a loading state here
    return (
        <div className="flex flex-col h-screen">
            <SiteHeader />
            <div className="flex-1 flex items-center justify-center">
                <p>Loading...</p>
            </div>
        </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <SiteHeader />
      <ChatArea character={character} />
    </div>
  );
}
