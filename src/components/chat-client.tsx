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
// Imports custom hooks.
import { useToast } from "@/hooks/use-toast";
import useLocalStorage from "@/hooks/use-local-storage";
import { useLocale } from "@/lib/locale.tsx";
import { getAiResponse, getEventAiResponse } from "@/app/actions";

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
  
    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: "",
    };

    setMessages(prevMessages => [...prevMessages, userMessage, aiMessage]);
    setIsLoading(true);
  
    try {
      let stream: ReadableStream<Uint8Array>;
      if (subject.type === 'character') {
        stream = await getAiResponse({
          historicalFigure: subject.name,
          userMessage: messageContent,
          language: locale,
        });
      } else {
        stream = await getEventAiResponse({
          eventId: id,
          userMessage: messageContent,
          language: locale,
        });
      }

      const reader = stream.getReader();
      const decoder = new TextDecoder();
      
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value, { stream: true });
        setMessages(prevMessages => {
          const lastMessage = prevMessages[prevMessages.length - 1];
          if (lastMessage.role === 'assistant') {
            return [
              ...prevMessages.slice(0, -1),
              { ...lastMessage, content: lastMessage.content + chunk }
            ];
          }
          return prevMessages;
        });
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : t.somethingWentWrong;
      toast({
        variant: "destructive",
        title: t.error,
        description: errorMessage,
      });
      // Remove the empty user and AI messages if an error occurs
      setMessages(prevMessages => prevMessages.slice(0, -2));
    } finally {
      setIsLoading(false);
    }
  }, [subject, id, isLoading, locale, setMessages, t, toast]);

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
