// Imports components from Next.js and React.
import Image from "next/image";
import Link from "next/link";
// Imports UI components (Card, Button).
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// Imports the event data type.
import type { Event } from "@/lib/events";
// Imports an icon.
import { ArrowRight } from "lucide-react";
// Imports the localization hook for translations.
import { useLocale } from "@/lib/locale.tsx";

// Defines the interface for the component's props.
interface EventCardProps {
  event: Event; // The event object to be displayed.
}

/**
 * Component that displays a card for a single historical event on the homepage.
 * It shows the event's image, name, description, and a link to start a conversation.
 */
export function EventCard({ event }: EventCardProps) {
  // Gets the localization context for translations.
  const { t, locale } = useLocale();

  return (
    // Card component with a hover effect.
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <CardHeader className="p-0">
        {/* Link wraps the image and leads to the event's chat page. */}
        <Link href={`/chat/event/${event.id}`} aria-label={`${t.chatWith} ${locale === 'pt' ? event.name_pt : event.name}`}>
          <Image
            src={event.image || "https://placehold.co/400x400.png"}
            alt={locale === 'pt' ? event.name_pt : event.name}
            width={400}
            height={400}
            className="w-full h-64 object-cover bg-black/5"
            data-ai-hint="historical event"
          />
        </Link>
      </CardHeader>
      <CardContent className="p-6">
        {/* Displays the event's name, translated if necessary. */}
        <CardTitle className="font-headline text-2xl mb-2 text-primary">
          {locale === 'pt' ? event.name_pt : event.name}
        </CardTitle>
        {/* Displays the event's description, translated. */}
        <CardDescription className="line-clamp-3 mb-4 text-muted-foreground h-[60px]">
          {locale === 'pt' ? event.description_pt : event.description}
        </CardDescription>
        {/* Button with a link to start the conversation about the event. */}
        <Button asChild variant="link" className="p-0 h-auto">
          <Link href={`/chat/event/${event.id}`}>
            {t.chatWithTheEvent} <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
