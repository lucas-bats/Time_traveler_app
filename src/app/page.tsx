import { CharacterSelection } from "@/components/character-selection";
import { getCharacters } from "@/lib/characters";

export default function Home() {
  const characters = getCharacters();

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tighter text-primary">
                Time Traveler Talks
              </h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Engage in enlightening conversations with iconic figures from
                the past. Who will you talk to first?
              </p>
            </div>
          </div>
        </section>
        <CharacterSelection characters={characters} />
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          &copy; 2024 Time Traveler Talks. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
