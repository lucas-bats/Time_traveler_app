"use client";

import { useParams } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { useLocale } from "@/lib/locale.tsx";
import { ChatClient } from "@/components/chat-client";

export default function ChatPage() {
  useLocale(); // Initialize locale context
  const params = useParams();
  const figureId = Array.isArray(params.figureId) ? params.figureId[0] : params.figureId;

  return (
    <div className="flex flex-col h-screen">
      <SiteHeader />
      {figureId ? (
        <ChatClient figureId={figureId} />
      ) : (
        <div className="flex-1 flex items-center justify-center">
            <p>Loading character...</p>
        </div>
      )}
    </div>
  );
}
