'use server';
/**
 * @fileOverview This file defines an AI agent that allows users
 * to chat with a historical event, receiving responses from the perspective
 * of its key participants.
 *
 * Exported Functions:
 * - chatWithEvent: The main function that executes the flow.
 * - ChatWithEventInput: The input type for the function.
 * - ChatWithEventOutput: The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { getEventById } from '@/lib/events';
import { getCharacterById } from '@/lib/characters';

const ChatWithEventInputSchema = z.object({
  eventName: z.string().describe('The name of the historical event.'),
  eventContext: z.string().describe('A brief context of the historical event.'),
  participants: z.array(z.string()).describe('A list of names of the key participants in the event.'),
  userMessage: z.string().describe('The message from the user to the event.'),
  language: z.string().describe('The language for the event to respond in (e.g., "en", "pt").'),
});
export type ChatWithEventInput = z.infer<typeof ChatWithEventInputSchema>;

const ChatWithEventOutputSchema = z.object({
  response: z.string().describe('The response from the historical event, representing multiple perspectives.'),
});
export type ChatWithEventOutput = z.infer<typeof ChatWithEventOutputSchema>;

export async function chatWithEvent(
  input: ChatWithEventInput
): Promise<ChatWithEventOutput> {
  return chatWithEventFlow(input);
}

const prompt = ai.definePrompt({
  name: 'chatWithEventPrompt',
  input: {schema: ChatWithEventInputSchema},
  output: {schema: ChatWithEventOutputSchema},
  prompt: `You are the representation of the historical event: {{eventName}}.
Your personality is that of a "spirit of history," narrating and summarizing the event from a neutral, omniscient perspective.

Your task is to respond to the user's message by orchestrating a dialogue or a "round table" discussion between the key participants.
Bring in the perspectives of the characters involved, explaining the historical context and how each participant would likely react or think.
If asked about consequences, explain the subsequent impacts.

Your response must be in the style of a summarized dialogue, highlighting the different viewpoints.

Event Context: {{eventContext}}
Key Participants: {{#each participants}}- {{this}}
{{/each}}
User Message: {{{userMessage}}}

Respond in the following language: {{language}}.`,
});

const chatWithEventFlow = ai.defineFlow(
  {
    name: 'chatWithEventFlow',
    inputSchema: ChatWithEventInputSchema,
    outputSchema: ChatWithEventOutputSchema,
  },
  async input => {
    let attempts = 0;
    const maxAttempts = 3;

    while (attempts < maxAttempts) {
      attempts++;
      const { output } = await prompt(input);

      if (output?.response) {
        return output;
      }
    }

    throw new Error('The AI was unable to generate a response. Please try rephrasing your question.');
  }
);
