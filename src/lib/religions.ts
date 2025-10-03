// Imports the raw religion data.
import { religionsData } from "@/lib/religions.data";

// Defines the interface for a Religion object.
export interface Religion {
  id: string; // Unique identifier.
  name: string; // Name in English.
  name_pt: string; // Name in Portuguese.
  origin: string; // Origin date or period in English.
  origin_pt: string; // Origin date or period in Portuguese.
  region: string; // Geographical region of origin in English.
  region_pt: string; // Geographical region of origin in Portuguese.
  description: string; // Description in English.
  description_pt: string; // Description in Portuguese.
  characters: string[]; // Array of associated character IDs.
  image: string; // Path to the icon or illustration.
}

/**
 * Returns a list of all religions, sorted alphabetically by name.
 * @returns {Religion[]} An array of Religion objects.
 */
export function getReligions(): Religion[] {
  return religionsData.sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Finds and returns a single religion by its ID.
 * @param {string} id - The ID of the religion to find.
 * @returns {Religion | undefined} The religion object if found, or undefined if not.
 */
export function getReligionById(id: string): Religion | undefined {
  return religionsData.find((religion) => religion.id === id);
}
