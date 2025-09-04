// Imports components from Next.js and React.
import Image from "next/image";
import Link from "next/link";
// Imports UI components (Card, Button).
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// Imports the character data type.
import type { Character } from "@/lib/characters";
// Imports an icon.
import { ArrowRight } from "lucide-react";
// Imports the localization hook for translations.
import { useLocale } from "@/lib/locale";

// Defines the interface for the component's props.
interface CharacterCardProps {
  character: Character; // The character object to be displayed.
}

/**
 * Component that displays a card for an individual character.
 * Contains the image, name, description, and a link to start the conversation.
 */
export function CharacterCard({ character }: CharacterCardProps) {
  // Gets the localization state (language) and the translation function.
  const { t, locale } = useLocale();

  return (
    // The Card component with hover animation.
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <CardHeader className="p-0">
        {/* The link wraps the image, leading to the character's chat page. */}
        <Link href={`/chat/${character.id}`} aria-label={`${t.chatWith} ${character.name}`}>
          <Image
            src={character.image}
            alt={`${t.portraitOf} ${character.name}`}
            width={400}
            height={400}
            className="w-full h-64 object-contain bg-black/5"
            // Attribute for AI hint, used for image generation.
            data-ai-hint={character.aiHint}
          />
        </Link>
      </CardHeader>
      <CardContent className="p-6">
        {/* Title with the character's name. */}
        <CardTitle className="font-headline text-2xl mb-2 text-primary">
          {character.name}
        </CardTitle>
        {/* Character's description, translated based on the locale. */}
        <CardDescription className="line-clamp-3 mb-4 text-muted-foreground h-[60px]">
          {locale === 'pt' ? character.description_pt : character.description}
        </CardDescription>
        {/* Button with a link to start the conversation. */}
        <Button asChild variant="link" className="p-0 h-auto">
          <Link href={`/chat/${character.id}`}>
            {t.startConversation} <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
