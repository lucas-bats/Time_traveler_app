// Imports the raw event data.
import { eventsData } from "@/lib/events.data";

// Defines the interface for an Event object to ensure data consistency.
export interface Event {
  id: string; // Unique identifier for the event.
  name: string; // Name of the event in English.
  name_pt: string; // Name of the event in Portuguese.
  date?: string; // Date or period of the event.
  era: string; // Historical era in English.
  era_pt: string; // Historical era in Portuguese.
  area: string; // General area or field (e.g., Politics) in English.
  area_pt: string; // General area in Portuguese.
  description: string; // Description in English.
  description_pt: string; // Description in Portuguese.
  participants: string[]; // An array of character IDs who were involved in the event.
  context: string; // A more detailed context for the AI prompt in English.
  context_pt: string; // Detailed context in Portuguese.
  image?: string; // URL for the event's image.
}

/**
 * Returns a list of all historical events, sorted alphabetically by name.
 * @returns {Event[]} An array of Event objects.
 */
export function getEvents(): Event[] {
  return eventsData.sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Finds and returns a single event by its ID.
 * @param {string} id - The ID of the event to find.
 * @returns {Event | undefined} The event object if found, or undefined if not.
 */
export function getEventById(id: string): Event | undefined {
  return eventsData.find((event) => event.id === id);
}
