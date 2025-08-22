// Defines this as a "Client Component," executed in the browser.
"use client";

import { CharacterSelection } from "@/components/character-selection";
import { EventSelection } from "@/components/event-selection";
import { getCharacters } from "@/lib/characters";
import { getEvents } from "@/lib/events";
import { useLocale } from "@/lib/locale";
import { Button } from "@/components/ui/button";
import { Heart, Shuffle } from "lucide-react";
import { useRouter } from "next/navigation";
import { DonationSection } from "@/components/donation-section";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


/**
 * Home page component.
 * Displays the title, subtitle, and tabs for character and event selection.
 */
export default function Home() {
  const characters = getCharacters();
  const events = getEvents();
  const { t } = useLocale();
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
      <SiteHeader />
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
              <div className="flex flex-wrap justify-center gap-4 mt-4">
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
              <p className="text-sm text-muted-foreground mt-2">
                {t.surpriseMeDescription}
              </p>
            </div>
          </div>
        </section>

        <Tabs defaultValue="characters" className="w-full">
            <div className="flex justify-center">
                <TabsList>
                    <TabsTrigger value="characters">{t.characters}</TabsTrigger>
                    <TabsTrigger value="events">{t.events}</TabsTrigger>
                </TabsList>
            </div>
            <TabsContent value="characters">
                <CharacterSelection characters={characters} />
            </TabsContent>
            <TabsContent value="events">
                <EventSelection events={events} />
            </TabsContent>
        </Tabs>

        <DonationSection />
      </main>
      <SiteFooter />
    </div>
  );
}
