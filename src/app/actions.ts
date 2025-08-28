// Defines that this file runs only on the server, never on the client-side.
"use server";

// Import AI flow functions and their input types.
import {
  chatWithHistoricalFigure,
  type ChatWithHistoricalFigureInput,
} from "@/ai/flows/chat-with-historical-figure";
import {
  chatWithEvent,
  type ChatWithEventInput
} from "@/ai/flows/chat-with-event";
// Import data retrieval functions.
import { getEventById } from "@/lib/events";
import { getCharacterById } from "@/lib/characters";
// Import the Zod library for schema validation.
import { z } from "zod";

// Define a validation schema using Zod for the character chat action.
const characterActionSchema = z.object({
  historicalFigure: z.string(),
  userMessage: z.string(),
  language: z.string(),
});

/**
 * Server Action for character chat.
 * It receives input from the client, validates it, and calls the appropriate Genkit flow.
 * @param input The data for the character chat.
 * @returns An object with the AI's response or an error message.
 */
export async function getAiResponse(input: ChatWithHistoricalFigureInput): Promise<ReadableStream<Uint8Array>> {
  // Validate the input against the schema.
  const parsedInput = characterActionSchema.safeParse(input);

  // If validation fails, return an error.
  if (!parsedInput.success) {
    throw new Error("Invalid input.");
  }

  try {
    // Call the Genkit flow for chatting with a historical figure.
    const stream = await chatWithHistoricalFigure(parsedInput.data);
    return stream as ReadableStream<Uint8Array>;
  } catch (e: any) {
    console.error(e);
    // Handle potential errors from the AI flow.
    const errorMessage = e instanceof Error ? e.message : "An error occurred while communicating with the AI. Please try again.";
    throw new Error(errorMessage);
  }
}

// Define a validation schema for the event chat action.
const eventActionSchema = z.object({
  eventId: z.string(),
  userMessage: z.string(),
  language: z.string(),
});

/**
 * Server Action for event chat.
 * It receives an event ID and a user message, fetches event data, and calls the Genkit flow.
 * @param input The data for the event chat.
 * @returns An object with the AI's response or an error message.
 */
export async function getEventAiResponse(input: { eventId: string; userMessage: string; language: string; }): Promise<ReadableStream<Uint8Array>> {
  // Validate the input.
  const parsedInput = eventActionSchema.safeParse(input);

  if (!parsedInput.success) {
     throw new Error("Invalid input.");
  }

  // Retrieve the event details using the provided ID.
  const event = getEventById(parsedInput.data.eventId);
  if (!event) {
     throw new Error("Event not found.");
  }

  // Get the names of the participants for the AI prompt.
  const participants = event.participants
    .map(id => getCharacterById(id)?.name)
    .filter((name): name is string => !!name);

  try {
    // Call the Genkit flow for chatting with an event.
    const stream = await chatWithEvent({
      eventName: event.name,
      eventContext: event.context,
      participants: participants,
      userMessage: parsedInput.data.userMessage,
      language: parsedInput.data.language,
    });
    return stream as ReadableStream<Uint8Array>;
  } catch (e: any) {
    console.error(e);
    // Handle potential errors from the AI flow.
    const errorMessage = e instanceof Error ? e.message : "An error occurred while communicating with the AI. Please try again.";
    throw new Error(errorMessage);
  }
}
