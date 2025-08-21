// Imports the raw connections data and character-related functions.
import { connectionsData } from "@/lib/connections.data";
import { getCharacterById, type Character } from "./characters";

// Defines the interface for a Connection object.
export interface Connection {
  sourceId: string;
  targetId: string;
  description: string;
  description_pt: string;
}

// Defines a richer connection object that includes the full character details.
export interface DetailedConnection {
  character: Character;
  description: string;
  description_pt: string;
}

/**
 * Finds all characters that influenced a specific character.
 * @param {string} characterId - The ID of the character.
 * @returns {DetailedConnection[]} An array of detailed connections.
 */
export function getInfluencesFor(characterId: string): DetailedConnection[] {
  return connectionsData
    .filter((conn) => conn.targetId === characterId)
    .map((conn) => {
      const character = getCharacterById(conn.sourceId);
      if (!character) return null;
      return {
        character,
        description: conn.description,
        description_pt: conn.description_pt,
      };
    })
    .filter((c): c is DetailedConnection => c !== null); // Type guard to filter out nulls
}

/**
 * Finds all characters who were influenced by a specific character.
 * @param {string} characterId - The ID of the character.
 * @returns {DetailedConnection[]} An array of detailed connections.
 */
export function getInfluencedBy(characterId: string): DetailedConnection[] {
  return connectionsData
    .filter((conn) => conn.sourceId === characterId)
    .map((conn) => {
      const character = getCharacterById(conn.targetId);
      if (!character) return null;
      return {
        character,
        description: conn.description,
        description_pt: conn.description_pt,
      };
    })
    .filter((c): c is DetailedConnection => c !== null); // Type guard to filter out nulls
}
