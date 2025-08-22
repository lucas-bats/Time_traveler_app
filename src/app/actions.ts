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
 * Server Action function for character chat.
 * It receives input from the client, validates it, and calls the Genkit flow.
 */
export async function getAiResponse(input: ChatWithHistoricalFigureInput) {
  const parsedInput = characterActionSchema.safeParse(input);

  if (!parsedInput.success) {
    return { error: "Invalid input." };
  }

  try {
    const result = await chatWithHistoricalFigure(parsedInput.data);
    return { response: result.response };
  } catch (e: any) {
    console.error(e);
    const errorMessage = e instanceof Error ? e.message : "An error occurred while communicating with the AI. Please try again.";
    return { error: errorMessage };
  }
}

// Define a validation schema for the event chat action.
const eventActionSchema = z.object({
  eventId: z.string(),
  userMessage: z.string(),
  language: z.string(),
});

/**
 * Server Action function for event chat.
 * It receives input, fetches event data, and calls the Genkit flow.
 */
export async function getEventAiResponse(input: { eventId: string; userMessage: string; language: string; }) {
  const parsedInput = eventActionSchema.safeParse(input);

  if (!parsedInput.success) {
    return { error: "Invalid input." };
  }

  const event = getEventById(parsedInput.data.eventId);
  if (!event) {
    return { error: "Event not found." };
  }

  const participants = event.participants
    .map(id => getCharacterById(id)?.name)
    .filter((name): name is string => !!name);

  try {
    const result = await chatWithEvent({
      eventName: event.name,
      eventContext: event.context,
      participants: participants,
      userMessage: parsedInput.data.userMessage,
      language: parsedInput.data.language,
    });
    return { response: result.response };
  } catch (e: any) {
    console.error(e);
    const errorMessage = e instanceof Error ? e.message : "An error occurred while communicating with the AI. Please try again.";
    return { error: errorMessage };
  }
}
