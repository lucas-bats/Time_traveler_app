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
  } catch (e) {
    console.error(e);
    return { error: "An error occurred while communicating with the AI. Please try again." };
  }
}
