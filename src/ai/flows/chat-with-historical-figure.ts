'use server';
/**
 * @fileOverview An AI agent that allows users to chat with historical figures.
 *
 * - chatWithHistoricalFigure - A function that handles the chat with a historical figure.
 * - ChatWithHistoricalFigureInput - The input type for the chatWithHistoricalFigure function.
 * - ChatWithHistoricalFigureOutput - The return type for the chatWithHistoricalFigure function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChatWithHistoricalFigureInputSchema = z.object({
  historicalFigure: z.string().describe('The name of the historical figure to chat with.'),
  userMessage: z.string().describe('The message from the user to the historical figure.'),
});
export type ChatWithHistoricalFigureInput = z.infer<typeof ChatWithHistoricalFigureInputSchema>;

const ChatWithHistoricalFigureOutputSchema = z.object({
  response: z.string().describe('The response from the historical figure.'),
});
export type ChatWithHistoricalFigureOutput = z.infer<typeof ChatWithHistoricalFigureOutputSchema>;

export async function chatWithHistoricalFigure(
  input: ChatWithHistoricalFigureInput
): Promise<ChatWithHistoricalFigureOutput> {
  return chatWithHistoricalFigureFlow(input);
}

const prompt = ai.definePrompt({
  name: 'chatWithHistoricalFigurePrompt',
  input: {schema: ChatWithHistoricalFigureInputSchema},
  output: {schema: ChatWithHistoricalFigureOutputSchema},
  prompt: `You are {{historicalFigure}}, a historical figure. Respond to the following message as if you were them, using their personality, vocabulary, and historical context.\n\nMessage: {{{userMessage}}}`,
});

const chatWithHistoricalFigureFlow = ai.defineFlow(
  {
    name: 'chatWithHistoricalFigureFlow',
    inputSchema: ChatWithHistoricalFigureInputSchema,
    outputSchema: ChatWithHistoricalFigureOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
