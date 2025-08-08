// Diretiva que marca este módulo para ser executado apenas no servidor.
'use server';
/**
 * @fileOverview Este arquivo define um agente de IA que permite aos usuários
 * conversar com figuras históricas. Ele usa o Genkit para criar um fluxo (flow)
 * que recebe uma mensagem do usuário e o nome de uma figura histórica, e retorna
 * uma resposta no estilo dessa figura.
 *
 * Funções exportadas:
 * - chatWithHistoricalFigure: A função principal que executa o fluxo.
 * - ChatWithHistoricalFigureInput: O tipo de entrada para a função.
 * - ChatWithHistoricalFigureOutput: O tipo de retorno da função.
 */

// Importa a instância configurada do Genkit e a biblioteca Zod para validação.
import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Define o esquema de entrada (input) para o fluxo usando Zod.
// Isso garante que os dados de entrada tenham a forma e os tipos corretos.
const ChatWithHistoricalFigureInputSchema = z.object({
  historicalFigure: z.string().describe('The name of the historical figure to chat with.'),
  userMessage: z.string().describe('The message from the user to the historical figure.'),
  language: z.string().describe('The language for the historical figure to respond in (e.g., "en", "pt").'),
});
// Exporta o tipo TypeScript inferido do esquema Zod.
export type ChatWithHistoricalFigureInput = z.infer<typeof ChatWithHistoricalFigureInputSchema>;

// Define o esquema de saída (output) para o fluxo.
const ChatWithHistoricalFigureOutputSchema = z.object({
  response: z.string().describe('The response from the historical figure.'),
});
// Exporta o tipo TypeScript inferido do esquema Zod.
export type ChatWithHistoricalFigureOutput = z.infer<typeof ChatWithHistoricalFigureOutputSchema>;

/**
 * Função assíncrona exportada que serve como um wrapper para o fluxo.
 * Os componentes do lado do cliente chamarão esta função.
 * @param input Os dados de entrada, contendo a figura, mensagem e idioma.
 * @returns A resposta gerada pelo fluxo de IA.
 */
export async function chatWithHistoricalFigure(
  input: ChatWithHistoricalFigureInput
): Promise<ChatWithHistoricalFigureOutput> {
  // Chama o fluxo principal e retorna seu resultado.
  return chatWithHistoricalFigureFlow(input);
}

// Define o prompt de IA usando `ai.definePrompt`.
const prompt = ai.definePrompt({
  name: 'chatWithHistoricalFigurePrompt', // Nome único para o prompt.
  input: {schema: ChatWithHistoricalFigureInputSchema}, // Define o esquema de entrada.
  output: {schema: ChatWithHistoricalFigureOutputSchema}, // Define o esquema de saída.
  // O template do prompt que será enviado ao modelo de linguagem.
  // Usa a sintaxe Handlebars ({{...}}) para inserir os dados de entrada.
  prompt: `You are {{historicalFigure}}, a historical figure. Respond to the following message as if you were them, using their personality, vocabulary, and historical context.

Respond in the following language: {{language}}.

Message: {{{userMessage}}}`,
});

// Define o fluxo de IA usando `ai.defineFlow`.
// Um fluxo orquestra uma ou mais etapas, como chamar um prompt ou uma ferramenta.
const chatWithHistoricalFigureFlow = ai.defineFlow(
  {
    name: 'chatWithHistoricalFigureFlow', // Nome único para o fluxo.
    inputSchema: ChatWithHistoricalFigureInputSchema, // Esquema de entrada.
    outputSchema: ChatWithHistoricalFigureOutputSchema, // Esquema de saída.
  },
  // A função de implementação do fluxo.
  async input => {
    // Implementa uma lógica de repetição para robustez.
    let attempts = 0;
    const maxAttempts = 3;

    while (attempts < maxAttempts) {
      attempts++;
      // Chama o prompt definido acima com a entrada do fluxo.
      const { output } = await prompt(input);

      // Se o prompt retornar uma resposta válida, retorna o output.
      if (output?.response) {
        return output;
      }
    }

    // Se o número máximo de tentativas for atingido sem sucesso, lança um erro.
    throw new Error('The AI was unable to generate a response. Please try rephrasing your question.');
  }
);
