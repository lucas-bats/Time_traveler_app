// Defines this as a "Client Component," executed in the browser.
"use client";

// Imports React hooks and Next.js functions.
import { useEffect, useState, type FormEvent, useCallback } from "react";
import { notFound } from "next/navigation";
// Imports character data types and functions.
import { getCharacterById, type Character } from "@/lib/characters";
// Imports chat interface components.
import { ChatArea, type Message } from "@/components/chat-area";
// Imports the server action to get the AI response.
import { getAiResponse } from "@/app/actions";
// Imports custom hooks.
import { useToast } from "@/hooks/use-toast";
import useLocalStorage from "@/hooks/use-local-storage";
import { useLocale } from "@/lib/locale.tsx";

// Defines the interface for the component's props.
interface ChatClientProps {
  figureId: string;
}

/**
 * Client component for the chat functionality.
 * Manages the conversation state, including messages, user input,
 * and communication with the AI through Server Actions.
 */
export function ChatClient({ figureId }: ChatClientProps) {
  // State to store the data of the current character.
  const [character, setCharacter] = useState<Character | null>(null);
  // State to control the loading of character data.
  const [loadingCharacter, setLoadingCharacter] = useState(true);
  // State for the text typed by the user.
  const [input, setInput] = useState("");
  // State to control the loading indicator for the AI's response.
  const [isLoading, setIsLoading] = useState(false);
  
  // Hook to display notifications (toasts).
  const { toast } = useToast();
  // Hook for the localization (language) context.
  const { t, locale } = useLocale();
  // Unique key for localStorage based on the figure's ID.
  const storageKey = `chat_history_${figureId}`;
  
  // Custom hook to persist chat messages in localStorage.
  const [messages, setMessages] = useLocalStorage<Message[]>(storageKey, []);

  // Effect that fetches the character's data when the figureId changes.
  useEffect(() => {
    const foundCharacter = getCharacterById(figureId);
    if (foundCharacter) {
      setCharacter(foundCharacter);
    }
    setLoadingCharacter(false);
  }, [figureId]);

  /**
   * Function to send a message.
   * Handles adding the user's message to the state, calls the AI,
   * and adds the bot's response.
   */
  const handleSendMessage = useCallback(async (messageContent: string) => {
    // Returns if the message is empty, if the AI is already responding, or if there is no character.
    if (!messageContent.trim() || isLoading || !character) return;
  
    // Creates the user's message object.
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageContent,
    };
  
    // Captures the previous state of messages in case of an error.
    const previousMessages = messages;
    // Adds the user's message to the list optimistically.
    setMessages([...messages, userMessage]);
    setIsLoading(true);
  
    try {
      // Calls the Server Action to get the AI's response.
      const result = await getAiResponse({
        historicalFigure: character.name,
        userMessage: messageContent,
        language: locale,
      });
  
      // If there is an error, displays a toast and reverts the optimistic update.
      if (result.error || !result.response) {
        toast({
          variant: "destructive",
          title: t.error,
          description: result.error || t.somethingWentWrong,
        });
        setMessages(previousMessages);
      } else {
        // If successful, creates the AI's message object.
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: result.response,
        };
        // Adds the AI's message to the message list.
        setMessages([...messages, userMessage, aiMessage]);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : t.somethingWentWrong;
      toast({
        variant: "destructive",
        title: t.error,
        description: errorMessage,
      });
       // Reverts the optimistic update in case of an exception.
       setMessages(previousMessages);
    } finally {
      // Ensures the loading state is turned off.
      setIsLoading(false);
    }
  }, [character, isLoading, locale, messages, setMessages, t, toast]);

  /**
   * Handler for form submission.
   */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await handleSendMessage(input);
    setInput(""); // Clears the input field after sending.
  };
  
  /**
   * Handler for clicking on a suggested question.
   */
  const handleSuggestionClick = async (suggestion: string) => {
    // Sets the input with the suggestion so the user sees what was sent.
    setInput(suggestion);
    await handleSendMessage(suggestion);
    setInput(""); // Clears the input field.
  };

  /**
   * Toggles the "favorite" state of a message.
   */
  const handleToggleFavorite = (messageId: string) => {
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.id === messageId ? { ...msg, favorited: !msg.favorited } : msg
      )
    );
  };

  /**
   * Clears the entire chat history.
   */
  const handleClearChat = () => {
    setMessages([]);
  };

  // If the character is still loading, displays a message.
  if (loadingCharacter) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p>Loading character...</p>
      </div>
    );
  }

  // If the character is not found, displays the 404 error page.
  if (!character) {
    notFound();
    return null;
  }

  // Renders the chat area with all necessary props.
  return (
    <div className="flex-1 flex flex-col min-h-0">
      <ChatArea
        character={character}
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
