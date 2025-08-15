// Defines this component as a "Client Component," meaning it executes in the browser.
"use client";

// Imports the useParams hook from Next.js to access route parameters.
import { useParams } from "next/navigation";
// Imports the site header component.
import { SiteHeader } from "@/components/site-header";
// Imports the main chat client component.
import { ChatClient } from "@/components/chat-client";

/**
 * Page component for the chat screen.
 * It is responsible for rendering the conversation interface for a specific historical figure.
 */
export default function ChatPage() {
  // Uses the useParams hook to get parameters from the URL.
  const params = useParams();
  
  // Extracts the 'figureId' from the parameters. Since it can be a string or an array of strings,
  // we ensure it is always a single string.
  const figureId = Array.isArray(params.figureId) ? params.figureId[0] : params.figureId;

  return (
    // Main structure of the chat page, which takes up the full screen height.
    <div className="flex flex-col h-screen h-dvh">
      {/* Renders the site header. */}
      <SiteHeader />
      
      {/* Checks if the figureId was obtained from the URL. */}
      {figureId ? (
        // If there is a figureId, render the chat component, passing the ID.
        <div className="flex-1 flex flex-col min-h-0">
          <ChatClient figureId={figureId} />
        </div>
      ) : (
        // If there is no figureId, show a loading message.
        <div className="flex-1 flex items-center justify-center">
            <p>Loading character...</p>
        </div>
      )}
    </div>
  );
}
