// Define que este arquivo executa apenas no servidor, nunca no lado do cliente.
"use server";

// Importa a função do fluxo de IA e seu tipo de entrada.
import {
  chatWithHistoricalFigure,
  type ChatWithHistoricalFigureInput,
} from "@/ai/flows/chat-with-historical-figure";
// Importa a biblioteca Zod para validação de esquemas.
import { z } from "zod";

// Define um esquema de validação usando Zod para a entrada da ação.
// Isso garante que os dados recebidos tenham o formato esperado antes de serem processados.
const actionSchema = z.object({
  historicalFigure: z.string(),
  userMessage: z.string(),
  language: z.string(),
});

/**
 * Função de Ação do Servidor (Server Action) que interage com o fluxo de IA.
 * Ela recebe a entrada do cliente, valida-a e chama o fluxo Genkit.
 * @param input - Os dados para a conversa, incluindo a figura histórica, a mensagem do usuário e o idioma.
 * @returns Um objeto contendo a resposta da IA ou uma mensagem de erro.
 */
export async function getAiResponse(input: ChatWithHistoricalFigureInput) {
  // Valida o input recebido contra o esquema definido.
  const parsedInput = actionSchema.safeParse(input);

  // Se a validação falhar, retorna um erro.
  if (!parsedInput.success) {
    return { error: "Invalid input." };
  }

  try {
    // Se a validação for bem-sucedida, chama o fluxo de IA com os dados validados.
    const result = await chatWithHistoricalFigure(parsedInput.data);
    // Retorna a resposta da IA.
    return { response: result.response };
  } catch (e: any) {
    // Em caso de erro durante a execução do fluxo de IA, captura a exceção.
    console.error(e);
    // Retorna a mensagem de erro específica do fluxo ou uma mensagem genérica.
    const errorMessage = e instanceof Error ? e.message : "An error occurred while communicating with the AI. Please try again.";
    return { error: errorMessage };
  }
}
