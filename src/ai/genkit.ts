// Importa as funções necessárias da biblioteca Genkit.
import {genkit} from 'genkit';
// Importa o plugin do Google AI para Genkit, que permite usar os modelos Gemini.
import {googleAI} from '@genkit-ai/googleai';

/**
 * Ponto central de configuração do Genkit na aplicação.
 * Este objeto `ai` será usado em toda a aplicação para definir e executar
 * fluxos de IA, prompts, e outras funcionalidades do Genkit.
 */
export const ai = genkit({
  // Lista de plugins a serem usados pelo Genkit.
  plugins: [
    // O plugin do Google AI é registrado para permitir o acesso aos modelos Gemini.
    googleAI()
  ],
  // Define o modelo padrão a ser usado nas operações de geração,
  // a menos que um modelo diferente seja especificado na chamada.
  model: 'googleai/gemini-2.0-flash',
});
