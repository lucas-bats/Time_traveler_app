import { config } from 'dotenv';
config();

// This is a sample file for development of Genkit flows.
// You can edit this file to include any flows you want to develop
// and then run `npm run genkit:watch` to start the development server.
import '@/ai/flows/chat-with-historical-figure.ts';
import '@/ai/flows/chat-with-event.ts';
