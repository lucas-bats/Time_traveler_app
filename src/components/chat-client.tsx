// Defines this as a "Client Component," executed in the browser.
"use client";

// Imports React hooks and Next.js functions.
import { useEffect, useState, type FormEvent, useCallback } from "react";
import { notFound } from "next/navigation";
// Imports data types and functions.
import { getCharacterById, type Character } from "@/lib/characters";
import { getEventById, type Event } from "@/lib/events";
// Imports chat interface components.
import { ChatArea, type Message } from "@/components/chat-area";
// Imports the server actions to get AI responses.
import { getAiResponse, getEventAiResponse } from "@/app/actions";
// Imports custom hooks.
import { useToast } from "@/hooks/use-toast";
import useLocalStorage from "@/hooks/use-local-storage";
import { useLocale } from "@/lib/locale.tsx";

// Defines the interface for the component's props.
interface ChatClientProps {
  figureId?: string;
  eventId?: string;
}

// Defines a generic type for the chat subject (either Character or Event).
type ChatSubject = (Character & { type: 'character' }) | (Event & { type: 'event' });

/**
 * Client component for the chat functionality.
 * Manages the conversation state for both characters and events.
 */
export function ChatClient({ figureId, eventId }: ChatClientProps) {
  const [subject, setSubject] = useState<ChatSubject | null>(null);
  const [loadingSubject, setLoadingSubject] = useState(true);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const { toast } = useToast();
  const { t, locale } = useLocale();
  
  const chatType = figureId ? 'character' : 'event';
  const id = figureId || eventId;
  const storageKey = `chat_history_${chatType}_${id}`;
  
  const [messages, setMessages] = useLocalStorage<Message[]>(storageKey, []);

  // Effect that fetches the subject's data when the ID changes.
  useEffect(() => {
    let foundSubject: ChatSubject | null = null;
    if (figureId) {
      const char = getCharacterById(figureId);
      if (char) foundSubject = { ...char, type: 'character' };
    } else if (eventId) {
      const event = getEventById(eventId);
      if (event) foundSubject = { ...event, type: 'event' };
    }
    
    if (foundSubject) {
      setSubject(foundSubject);
    }
    setLoadingSubject(false);
  }, [figureId, eventId]);

  const handleSendMessage = useCallback(async (messageContent: string) => {
    if (!messageContent.trim() || isLoading || !subject || !id) return;
  
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageContent,
    };
  
    const previousMessages = messages;
    setMessages([...messages, userMessage]);
    setIsLoading(true);
  
    try {
      let result;
      if (subject.type === 'character') {
        result = await getAiResponse({
          historicalFigure: subject.name,
          userMessage: messageContent,
          language: locale,
        });
      } else { // subject.type === 'event'
        result = await getEventAiResponse({
          eventId: id,
          userMessage: messageContent,
          language: locale,
        });
      }
  
      if (result.error || !result.response) {
        toast({
          variant: "destructive",
          title: t.error,
          description: result.error || t.somethingWentWrong,
        });
        setMessages(previousMessages);
      } else {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: result.response,
        };
        setMessages([...messages, userMessage, aiMessage]);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : t.somethingWentWrong;
      toast({
        variant: "destructive",
        title: t.error,
        description: errorMessage,
      });
       setMessages(previousMessages);
    } finally {
      setIsLoading(false);
    }
  }, [subject, id, isLoading, locale, messages, setMessages, t, toast]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await handleSendMessage(input);
    setInput("");
  };
  
  const handleSuggestionClick = async (suggestion: string) => {
    setInput(suggestion);
    await handleSendMessage(suggestion);
    setInput("");
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

  if (loadingSubject) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!subject) {
    notFound();
    return null;
  }

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <ChatArea
        subject={subject}
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