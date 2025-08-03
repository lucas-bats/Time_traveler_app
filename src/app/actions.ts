"use server";

import {
  chatWithHistoricalFigure,
  type ChatWithHistoricalFigureInput,
} from "@/ai/flows/chat-with-historical-figure";
import { z } from "zod";

const actionSchema = z.object({
  historicalFigure: z.string(),
  userMessage: z.string(),
  language: z.string(),
});

export async function getAiResponse(input: ChatWithHistoricalFigureInput) {
  const parsedInput = actionSchema.safeParse(input);
  if (!parsedInput.success) {
    return { error: "Invalid input." };
  }
  try {
    const result = await chatWithHistoricalFigure(parsedInput.data);
    return { response: result.response };
  } catch (e: any) {
    console.error(e);
    // Return the specific error message from the flow, or a generic one.
    const errorMessage = e instanceof Error ? e.message : "An error occurred while communicating with the AI. Please try again.";
    return { error: errorMessage };
  }
}
