"use client";

import { CharacterSelection } from "@/components/character-selection";
import { getCharacters } from "@/lib/characters";
import { useLocale } from "@/lib/locale.tsx";

export default function Home() {
  const characters = getCharacters();
  const { t } = useLocale();

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tighter text-primary">
                {t.title}
              </h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                {t.subtitle}
              </p>
            </div>
          </div>
        </section>
        <CharacterSelection characters={characters} />
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          &copy; 2024 {t.title}. {t.allRightsReserved}.
        </p>
      </footer>
    </div>
  );
}
