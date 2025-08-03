
import { charactersData } from "@/lib/characters.data";

export interface Character {
  id: string;
  name: string;
  description: string;
  description_pt: string;
  image: string;
  aiHint: string;
  era: string;
  era_pt: string;
  field: string;
  field_pt: string;
  country: string;
}

// This function now fetches characters from a local data file
export function getCharacters(): Character[] {
  return charactersData.sort((a, b) => a.name.localeCompare(b.name));
}

// This function now fetches a single character from a local data file by ID
export function getCharacterById(id: string): Character | undefined {
  return charactersData.find((character) => character.id === id);
}
