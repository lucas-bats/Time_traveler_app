"use client";

import { getCharacterById } from "@/lib/characters";
import { notFound } from "next/navigation";
import { ChatArea } from "@/components/chat-area";
import { SiteHeader } from "@/components/site-header";
import { useLocale } from "@/lib/locale.tsx";

interface ChatPageProps {
  params: {
    figureId: string;
  };
}

export default function ChatPage({ params }: ChatPageProps) {
  useLocale(); // Initialize locale context
  const character = getCharacterById(params.figureId);

  if (!character) {
    notFound();
  }

  return (
    <div className="flex flex-col h-screen">
      <SiteHeader />
      <ChatArea character={character} />
    </div>
  );
}
