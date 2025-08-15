// Imports the raw character data from a separate file.
import { charactersData } from "@/lib/characters.data";

// Defines the interface (the "contract" or "shape") for a Character object.
// This helps ensure that all character objects have the same properties and types.
export interface Character {
  id: string; // Unique identifier.
  name: string; // Character's name.
  description: string; // Description in English.
  description_pt: string; // Description in Portuguese.
  image: string; // URL of the character's image.
  aiHint: string; // Hint for the AI to generate related images or content.
  era: string; // Historical period in English.
  era_pt: string; // Historical period in Portuguese.
  field: string; // Field of expertise in English.
  field_pt: string; // Field of expertise in Portuguese.
  country: string; // Country of origin.
}

/**
 * Returns a list of all characters.
 * The data is imported from the `characters.data.ts` file and sorted alphabetically by name.
 * @returns {Character[]} An array of Character objects.
 */
export function getCharacters(): Character[] {
  // Sorts the characters by name in alphabetical order.
  return charactersData.sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Finds and returns a single character by their ID.
 * @param {string} id - The ID of the character to find.
 * @returns {Character | undefined} The character object if found, or undefined if not.
 */
export function getCharacterById(id: string): Character | undefined {
  // Uses the `find` method to search for the character with the matching ID.
  return charactersData.find((character) => character.id === id);
}
