import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { Character } from "@/lib/characters";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface CharacterCardProps {
  character: Character;
}

export function CharacterCard({ character }: CharacterCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <CardHeader className="p-0">
        <Link href={`/chat/${character.id}`} aria-label={`Chat with ${character.name}`}>
          <Image
            src={character.image}
            alt={`Portrait of ${character.name}`}
            width={400}
            height={400}
            className="w-full h-64 object-cover object-top"
            data-ai-hint={character.aiHint}
          />
        </Link>
      </CardHeader>
      <CardContent className="p-6">
        <CardTitle className="font-headline text-2xl mb-2 text-primary">
          {character.name}
        </CardTitle>
        <CardDescription className="line-clamp-3 mb-4 text-muted-foreground h-[60px]">
          {character.description}
        </CardDescription>
        <Button asChild variant="link" className="p-0 h-auto">
          <Link href={`/chat/${character.id}`}>
            Start Conversation <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
