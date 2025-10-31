// Import necessary functions from the Genkit library.
import {genkit} from 'genkit';
// Import the Google AI plugin for Genkit, which allows using Gemini models.
import {googleAI} from '@genkit-ai/google-genai';

/**
 * Central configuration point for Genkit in the application.
 * This `ai` object will be used throughout the application to define and run
 * AI flows, prompts, and other Genkit functionalities.
 */
export const ai = genkit({
  // List of plugins to be used by Genkit.
  plugins: [
    // The Google AI plugin is registered to allow access to Gemini models.
    googleAI(),
  ],
});
