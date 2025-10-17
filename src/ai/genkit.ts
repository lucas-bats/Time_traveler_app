// Import necessary functions from the Genkit library.
import {genkit, configureGenkit} from 'genkit';
// Import the Google AI plugin for Genkit, which allows using Gemini models.
import {googleAI} from '@genkit-ai/googleai';

/**
 * Central configuration point for Genkit in the application.
 * This `ai` object will be used throughout the application to define and run
 * AI flows, prompts, and other Genkit functionalities.
 */
configureGenkit({
  // List of plugins to be used by Genkit.
  plugins: [
    // The Google AI plugin is registered to allow access to Gemini models.
    googleAI()
  ],
  // Sets the default model to be used in generation operations,
  // unless a different model is specified in the call.
  // model: 'googleai/gemini-pro',
  logLevel: 'debug',
  enableTracingAndMetrics: true,
});

export const ai = {
  defineFlow: genkit.defineFlow,
  definePrompt: genkit.definePrompt,
};
