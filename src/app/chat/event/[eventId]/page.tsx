// Defines this component as a "Client Component," meaning it executes in the browser.
"use client";

// Imports the useParams hook from Next.js to access route parameters.
import { useParams } from "next/navigation";
// Imports the site header component.
import { SiteHeader } from "@/components/site-header";
// Imports the main chat client component.
import { ChatClient } from "@/components/chat-client";

/**
 * Page component for the event chat screen.
 * It is responsible for rendering the conversation interface for a specific historical event.
 * This component acts as a wrapper, extracting the event ID from the URL
 * and passing it to the main ChatClient component.
 */
export default function EventChatPage() {
  // Uses the useParams hook to get parameters from the URL.
  const params = useParams();
  
  // Extracts the 'eventId' from the parameters.
  const eventId = Array.isArray(params.eventId) ? params.eventId[0] : params.eventId;

  return (
    // Main structure of the chat page, which takes up the full screen height.
    <div className="flex flex-col h-screen h-dvh">
      {/* Renders the site header. */}
      <SiteHeader />
      
      {/* Checks if the eventId was obtained from the URL. */}
      {eventId ? (
        // If there is an eventId, render the chat component for an event.
        <div className="flex-1 flex flex-col min-h-0">
          <ChatClient eventId={eventId} />
        </div>
      ) : (
        // If there is no eventId, show a loading message.
        <div className="flex-1 flex items-center justify-center">
            <p>Loading event...</p>
        </div>
      )}
    </div>
  );
}
