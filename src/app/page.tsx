// Defines this as a "Client Component," executed in the browser.
"use client";

// Imports the character selection component.
import { CharacterSelection } from "@/components/character-selection";
// Imports the function to get the list of characters.
import { getCharacters } from "@/lib/characters";
// Imports the hook to use the localization (language) context.
import { useLocale } from "@/lib/locale";
// Imports UI components for the dropdown menu.
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// Imports the button component.
import { Button } from "@/components/ui/button";
// Imports icons from the lucide-react library.
import { Languages, Shuffle, Heart } from "lucide-react";
// Imports the useRouter hook from Next.js for navigation.
import { useRouter } from "next/navigation";
import { DonationSection } from "@/components/donation-section";
import Link from "next/link";


/**
 * Home page component.
 * Displays the title, subtitle, language selector, and the list of characters to start a chat.
 */
export default function Home() {
  // Gets the list of all characters.
  const characters = getCharacters();
  // Gets the functions and state from the localization context (t for translations, setLocale to change language).
  const { t, setLocale } = useLocale();
  // Gets the router instance for programmatic navigation.
  const router = useRouter();

  /**
   * Event handler for the "Surprise Me" button.
   * Selects a random character and navigates to their chat page.
   */
  const handleRandomCharacter = () => {
    if (characters.length > 0) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      const randomCharacter = characters[randomIndex];
      router.push(`/chat/${randomCharacter.id}`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header positioned in the top right corner for the language selector. */}
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
        {/* Main section with the application's title and subtitle. */}
        <section className="w-full pt-6 pb-3 md:pt-8 md:pb-4">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tighter text-primary">
                {t.title}
              </h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                {t.subtitle}
              </p>
              <div className="flex flex-wrap justify-center gap-4 mt-4">
                {/* Button to select a random character. */}
                <Button onClick={handleRandomCharacter} size="lg">
                  <Shuffle className="mr-2 h-5 w-5" />
                  {t.surpriseMe}
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/#donation-section">
                     <Heart className="mr-2 h-5 w-5 text-destructive" />
                     {t.supportTheProject}
                  </Link>
                </Button>
              </div>

              {/* Description for the "Surprise Me" button. */}
              <p className="text-sm text-muted-foreground mt-2">
                {t.surpriseMeDescription}
              </p>
            </div>
          </div>
        </section>
        {/* Component that renders the filterable list of characters. */}
        <CharacterSelection characters={characters} />
        {/* Donation Section */}
        <DonationSection />
      </main>
      {/* Page footer. */}
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          &copy; 2024 {t.title}. {t.allRightsReserved}.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <Link className="text-xs hover:underline underline-offset-4" href="/about">{t.about}</Link>
            <Link className="text-xs hover:underline underline-offset-4" href="/privacy">{t.privacyPolicy}</Link>
        </nav>
      </footer>
    </div>
  );
}
