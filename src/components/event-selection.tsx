// Defines this as a "Client Component".
"use client";

import { useState, useMemo } from "react";
import type { Event } from "@/lib/events";
import { EventCard } from "./event-card";
import { useLocale } from "@/lib/locale";

interface EventSelectionProps {
  events: Event[];
}

/**
 * Component for displaying the list of historical events.
 */
export function EventSelection({ events }: EventSelectionProps) {
  const { t } = useLocale();

  return (
    <section className="w-full py-8 md:py-16">
      <div className="container px-4 md:px-6">
        {events.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-muted-foreground">
            <h3 className="text-2xl font-headline">{t.noEventsFound}</h3>
            <p>{t.checkBackLater}</p>
          </div>
        )}
      </div>
    </section>
  );
}
