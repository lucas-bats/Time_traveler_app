// Importa os dados brutos dos personagens de um arquivo separado.
import { charactersData } from "@/lib/characters.data";

// Define a interface (o "contrato" ou a "forma") para um objeto Character.
// Isso ajuda a garantir que todos os objetos de personagem tenham as mesmas propriedades e tipos.
export interface Character {
  id: string; // Identificador único.
  name: string; // Nome do personagem.
  description: string; // Descrição em inglês.
  description_pt: string; // Descrição em português.
  image: string; // URL da imagem do personagem.
  aiHint: string; // Dica para a IA gerar imagens ou conteúdo relacionado.
  era: string; // Período histórico em inglês.
  era_pt: string; // Período histórico em português.
  field: string; // Campo de atuação em inglês.
  field_pt: string; // Campo de atuação em português.
  country: string; // País de origem.
}

/**
 * Retorna uma lista de todos os personagens.
 * Os dados são importados do arquivo `characters.data.ts` e ordenados alfabeticamente pelo nome.
 * @returns {Character[]} Um array de objetos Character.
 */
export function getCharacters(): Character[] {
  // Ordena os personagens pelo nome em ordem alfabética.
  return charactersData.sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Encontra e retorna um único personagem pelo seu ID.
 * @param {string} id - O ID do personagem a ser encontrado.
 * @returns {Character | undefined} O objeto do personagem se encontrado, ou undefined se não.
 */
export function getCharacterById(id: string): Character | undefined {
  // Usa o método `find` para procurar o personagem com o ID correspondente.
  return charactersData.find((character) => character.id === id);
}
