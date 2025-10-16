"use client";

import { useParams, notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getReligionById } from "@/lib/religions";
import { getCharacterById, type Character } from "@/lib/characters";
import { useLocale } from "@/lib/locale";
import Image from "next/image";
import { CharacterCard } from "@/components/character-card";

export default function ReligionDetailPage() {
  const params = useParams();
  const { t, locale } = useLocale();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  
  if (!id) {
    notFound();
  }

  const religion = getReligionById(id);

  if (!religion) {
    notFound();
    return null;
  }
  
  const relatedCharacters = religion.characters
    .map(charId => getCharacterById(charId))
    .filter((c): c is Character => c !== undefined);

  const name = locale === 'pt' ? religion.name_pt : religion.name;
  const description = locale === 'pt' ? religion.description_pt : religion.description;
  const origin = locale === 'pt' ? religion.origin_pt : religion.origin;
  const region = locale === 'pt' ? religion.region_pt : religion.region;

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        <section className="relative w-full h-80">
          <Image
            src={religion.image}
            alt={name}
            fill
            className="object-cover"
            data-ai-hint="religion symbol"
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative container px-4 md:px-6 h-full flex flex-col justify-end pb-12">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl font-headline text-white">
              {name}
            </h1>
            <p className="text-lg text-white/80 mt-2">{origin} - {region}</p>
          </div>
        </section>

        <section className="w-full py-12 md:py-16">
          <div className="container px-4 md:px-6 max-w-3xl mx-auto">
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                {description}
            </p>
          </div>
        </section>

        {relatedCharacters.length > 0 && (
          <section className="w-full py-12 md:py-16 bg-muted/40">
            <div className="container px-4 md:px-6">
              <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tighter text-primary text-center mb-8">
                {t.relatedCharacters}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                {relatedCharacters.map((character) => (
                  <CharacterCard key={character.id} character={character} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
