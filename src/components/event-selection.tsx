// Defines this as a "Client Component".
"use client";

import type { Event } from "@/lib/events";
import { EventCard } from "./event-card";
import { useLocale } from "@/lib/locale";

// Defines the interface for the component's props.
interface EventSelectionProps {
  events: Event[];
}

/**
 * A component that displays a grid of historical events.
 * It takes a list of events and renders an EventCard for each one.
 */
export function EventSelection({ events }: EventSelectionProps) {
  // Gets the localization context for translations.
  const { t } = useLocale();

  return (
    <section className="w-full py-8 md:py-16">
      <div className="container px-4 md:px-6">
        {/* Checks if there are any events to display. */}
        {events.length > 0 ? (
          // Renders a grid of event cards.
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          // Displays a message if no events are found.
          <div className="text-center py-16 text-muted-foreground">
            <h3 className="text-2xl font-headline">{t.noEventsFound}</h3>
            <p>{t.checkBackLater}</p>
          </div>
        )}
      </div>
    </section>
  );
}
