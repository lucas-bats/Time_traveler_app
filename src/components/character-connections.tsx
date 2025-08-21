"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/lib/locale";
import type { DetailedConnection } from "@/lib/connections";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { ArrowRight } from "lucide-react";

interface CharacterConnectionsProps {
  influences: DetailedConnection[];
  influenced: DetailedConnection[];
}

/**
 * A component to display lists of character connections (influences).
 */
export function CharacterConnections({ influences, influenced }: CharacterConnectionsProps) {
  const { t, locale } = useLocale();

  return (
    <div className="space-y-6">
      {/* Influenced By Section */}
      <div>
        <h3 className="text-xl font-headline text-primary mb-4">{t.influencedBy}</h3>
        {influences.length > 0 ? (
          <div className="space-y-4">
            {influences.map(({ character, description, description_pt }) => (
              <Card key={character.id}>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Image
                      src={character.image}
                      alt={character.name}
                      width={40}
                      height={40}
                      className="rounded-full object-cover w-10 h-10"
                      data-ai-hint={character.aiHint}
                    />
                    <div className="flex-1">
                      <CardTitle className="text-lg">{character.name}</CardTitle>
                      <CardDescription className="text-xs">
                         <Link href={`/chat/${character.id}`} className="flex items-center text-accent hover:underline">
                            {t.chatWith} {character.name} <ArrowRight className="ml-1 h-3 w-3" />
                        </Link>
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground italic">
                    "{locale === 'pt' ? description_pt : description}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">{t.noInfluencesFound}</p>
        )}
      </div>

      {/* Influenced Section */}
      <div>
        <h3 className="text-xl font-headline text-primary mb-4">{t.influenced}</h3>
        {influenced.length > 0 ? (
          <div className="space-y-4">
            {influenced.map(({ character, description, description_pt }) => (
               <Card key={character.id}>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Image
                      src={character.image}
                      alt={character.name}
                      width={40}
                      height={40}
                      className="rounded-full object-cover w-10 h-10"
                      data-ai-hint={character.aiHint}
                    />
                    <div className="flex-1">
                      <CardTitle className="text-lg">{character.name}</CardTitle>
                      <CardDescription className="text-xs">
                        <Link href={`/chat/${character.id}`} className="flex items-center text-accent hover:underline">
                            {t.chatWith} {character.name} <ArrowRight className="ml-1 h-3 w-3" />
                        </Link>
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground italic">
                    "{locale === 'pt' ? description_pt : description}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">{t.noInfluencedFound}</p>
        )}
      </div>
    </div>
  );
}
