
"use client";

import { useState, useMemo } from "react";
import type { Character } from "@/lib/characters";
import { CharacterCard } from "./character-card";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/lib/locale";
import { cn } from "@/lib/utils";

interface CharacterSelectionProps {
  characters: Character[];
}

export function CharacterSelection({ characters }: CharacterSelectionProps) {
  const { t, locale } = useLocale();
  const [era, setEra] = useState("all");
  const [field, setField] = useState("all");

  const eras = useMemo(() => ["all", ...new Set(characters.map((c) => (locale === 'pt' ? c.era_pt : c.era)))], [characters, locale]);
  const fields = useMemo(() => ["all", ...new Set(characters.map((c) => (locale === 'pt' ? c.field_pt : c.field) ))], [characters, locale]);
  
  const getOriginalEra = (translatedEra: string) => {
    if (translatedEra === 'all') return 'all';
    const character = characters.find(c => c.era_pt === translatedEra || c.era === translatedEra);
    return character ? character.era : 'all';
  }

  const getOriginalField = (translatedField: string) => {
    if (translatedField === 'all') return 'all';
    const character = characters.find(c => c.field_pt === translatedField || c.field === translatedField);
    return character ? character.field : 'all';
  }

  const filteredCharacters = useMemo(() => {
    const originalEra = getOriginalEra(era);
    const originalField = getOriginalField(field);
    return characters.filter((character) => {
      const matchesEra = originalEra === "all" || character.era === originalEra;
      const matchesField = originalField === "all" || character.field === originalField;
      return matchesEra && matchesField;
    });
  }, [characters, era, field, locale]);

  return (
    <section className="w-full py-12 md:py-16">
      <div className="container px-4 md:px-6">
        <div className="mb-8 flex flex-col gap-6">
          <div className="flex flex-col items-center gap-3">
            <h3 className="text-lg font-semibold text-primary">{t.filterByEra}</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {eras.map((e) => (
                <Button
                  key={e}
                  variant={era === e ? "default" : "outline"}
                  onClick={() => setEra(e)}
                  className={cn("capitalize rounded-full px-4 py-1 h-auto text-sm", era === e && "bg-primary text-primary-foreground")}
                >
                  {e === 'all' ? t.allEras : e}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center gap-3">
            <h3 className="text-lg font-semibold text-primary">{t.filterByField}</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {fields.map((f) => (
                 <Button
                    key={f}
                    variant={field === f ? "default" : "outline"}
                    onClick={() => setField(f)}
                    className={cn("capitalize rounded-full px-4 py-1 h-auto text-sm", field === f && "bg-primary text-primary-foreground")}
                >
                  {f === 'all' ? t.allFields : f}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {filteredCharacters.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {filteredCharacters.map((character) => (
              <CharacterCard key={character.id} character={character} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-muted-foreground">
            <h3 className="text-2xl font-headline">{t.noFiguresFound}</h3>
            <p>{t.adjustFilters}</p>
          </div>
        )}
      </div>
    </section>
  );
}
