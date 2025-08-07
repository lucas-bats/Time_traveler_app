
"use client";

import { CharacterSelection } from "@/components/character-selection";
import { getCharacters, type Character } from "@/lib/characters";
import { useLocale } from "@/lib/locale";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Languages, Shuffle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const characters = getCharacters();
  const { t, setLocale } = useLocale();
  const router = useRouter();

  const handleRandomCharacter = () => {
    if (characters.length > 0) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      const randomCharacter = characters[randomIndex];
      router.push(`/chat/${randomCharacter.id}`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
       <header className="absolute top-0 right-0 p-4 z-10">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Languages className="h-5 w-5" />
              <span className="sr-only">Change language</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setLocale("en")}>
              English
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLocale("pt")}>
              Português
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      <main className="flex-1">
        <section className="w-full pt-6 pb-3 md:pt-8 md:pb-4">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tighter text-primary">
                {t.title}
              </h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                {t.subtitle}
              </p>
               <Button onClick={handleRandomCharacter} size="lg" className="mt-4">
                <Shuffle className="mr-2 h-5 w-5" />
                {t.surpriseMe}
              </Button>
               <p className="text-sm text-muted-foreground">
                {t.surpriseMeDescription}
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
