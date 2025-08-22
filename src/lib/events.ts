import { eventsData } from "@/lib/events.data";

export interface Event {
  id: string;
  name: string;
  name_pt: string;
  date?: string;
  era: string;
  era_pt: string;
  area: string;
  area_pt: string;
  description: string;
  description_pt: string;
  participants: string[]; // Array of character IDs
  context: string;
  context_pt: string;
  image?: string;
}

/**
 * Returns a list of all historical events.
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
