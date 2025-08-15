// Defines that this file runs only on the server, never on the client-side.
"use server";

// Import the AI flow function and its input type.
import {
  chatWithHistoricalFigure,
  type ChatWithHistoricalFigureInput,
} from "@/ai/flows/chat-with-historical-figure";
// Import the Zod library for schema validation.
import { z } from "zod";

// Define a validation schema using Zod for the action's input.
// This ensures that the received data has the expected format before being processed.
const actionSchema = z.object({
  historicalFigure: z.string(),
  userMessage: z.string(),
  language: z.string(),
});

/**
 * Server Action function that interacts with the AI flow.
 * It receives input from the client, validates it, and calls the Genkit flow.
 * @param input - The data for the conversation, including the historical figure, user message, and language.
 * @returns An object containing the AI's response or an error message.
 */
export async function getAiResponse(input: ChatWithHistoricalFigureInput) {
  // Validate the received input against the defined schema.
  const parsedInput = actionSchema.safeParse(input);

  // If validation fails, return an error.
  if (!parsedInput.success) {
    return { error: "Invalid input." };
  }

  try {
    // If validation is successful, call the AI flow with the validated data.
    const result = await chatWithHistoricalFigure(parsedInput.data);
    // Return the AI's response.
    return { response: result.response };
  } catch (e: any) {
    // In case of an error during the AI flow execution, catch the exception.
    console.error(e);
    // Return the specific error message from the flow or a generic message.
    const errorMessage = e instanceof Error ? e.message : "An error occurred while communicating with the AI. Please try again.";
    return { error: errorMessage };
  }
}
