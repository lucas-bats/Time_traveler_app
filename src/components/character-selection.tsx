// Defines this as a "Client Component".
"use client";

// Imports React hooks.
import { useState, useMemo } from "react";
// Imports necessary types and components.
import type { Character } from "@/lib/characters";
import { CharacterCard } from "./character-card";
import { useLocale } from "@/lib/locale";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getReligions, type Religion } from "@/lib/religions";

// Defines the interface for the component's props.
interface CharacterSelectionProps {
  characters: Character[];
}

// Desired order for the eras.
const eraOrder = ["Antiquity", "Medieval", "Renaissance", "Modern", "Contemporary"];
const eraOrderPt = ["Antiguidade", "Medieval", "Renascentista", "Moderna", "Contemporânea"];

// Mapping of eras to their time periods for display.
const timeframes = {
  en: {
    "Antiquity": " (Before 476)",
    "Medieval": " (476 - 1450)",
    "Renaissance": " (1450 - 1650)",
    "Modern": " (1650 - 1945)",
    "Contemporary": " (1945 - Present)",
  },
  pt: {
    "Antiguidade": " (Antes de 476)",
    "Medieval": " (476 - 1450)",
    "Renascentista": " (1450 - 1650)",
    "Moderna": " (1650 - 1945)",
    "Contemporânea": " (1945 - Presente)",
  }
};

/**
 * Component for selecting and filtering characters.
 * Includes filters for era and field of expertise.
 */
export function CharacterSelection({ characters }: CharacterSelectionProps) {
  // Gets the localization context.
  const { t, locale } = useLocale();
  // State for the selected era filter.
  const [era, setEra] = useState("all");
  // State for the selected field filter.
  const [field, setField] = useState("all");
  // State for the selected religion filter.
  const [religion, setReligion] = useState("all");

  const religions = useMemo(() => getReligions(), []);

  // useMemo to calculate the list of available eras, correctly sorted.
  const eras = useMemo(() => {
    const uniqueEras = Array.from(new Set(characters.map((c) => (locale === 'pt' ? c.era_pt : c.era))));
    const order = locale === 'pt' ? eraOrderPt : eraOrder;
    uniqueEras.sort((a, b) => order.indexOf(a) - order.indexOf(b));
    return ["all", ...uniqueEras];
  }, [characters, locale]);

  // useMemo to calculate the list of available fields, in alphabetical order.
  const fields = useMemo(() => ["all", ...Array.from(new Set(characters.map((c) => (locale === 'pt' ? c.field_pt : c.field) ))).sort((a,b) => a.localeCompare(b))], [characters, locale]);
  
  // Helper function to get the original (English) 'era' from the translated era.
  const getOriginalEra = (eraWithTimeframe: string) => {
    if (eraWithTimeframe === 'all') return 'all';
    const baseEra = eraWithTimeframe.split(" (")[0];
    const character = characters.find(c => c.era_pt === baseEra || c.era === baseEra);
    return character ? character.era : 'all';
  }

  // Helper function to get the original (English) 'field' from the translated field.
  const getOriginalField = (translatedField: string) => {
    if (translatedField === 'all') return 'all';
    const character = characters.find(c => c.field_pt === translatedField || c.field === translatedField);
    return character ? character.field : 'all';
  }

  // useMemo to filter the character list based on the selected filters.
  const filteredCharacters = useMemo(() => {
    const originalEra = getOriginalEra(era);
    const originalField = getOriginalField(field);
    return characters.filter((character) => {
      const matchesEra = originalEra === "all" || character.era === originalEra;
      const matchesField = originalField === "all" || character.field === originalField;
      const matchesReligion = religion === "all" || character.religion === religion;
      return matchesEra && matchesField && matchesReligion;
    });
  }, [characters, era, field, religion]);

  // Function to get the display name of the era, including the time period.
  const getDisplayName = (e: string) => {
    if (e === 'all') return t.allEras;
    const timeframe = locale === 'pt' ? timeframes.pt[e as keyof typeof timeframes.pt] : timeframes.en[e as keyof typeof timeframes.en];
    return `${e}${timeframe || ''}`;
  }

  return (
    <section className="w-full py-8 md:py-16">
      <div className="container px-4 md:px-6">
        {/* Container for the filter controls. */}
        <div className="mb-8 flex flex-col md:flex-row justify-center items-center gap-4 md:gap-6">
          <div className="flex flex-col items-start gap-2 w-full md:w-auto">
            <label htmlFor="era-filter" className="text-sm font-semibold text-primary">{t.filterByEra}</label>
            <Select value={era} onValueChange={setEra}>
              <SelectTrigger id="era-filter" className="w-full md:w-[280px]">
                <SelectValue placeholder={t.allEras} />
              </SelectTrigger>
              <SelectContent>
                {eras.map((e) => (
                  <SelectItem key={e} value={e}>
                    {getDisplayName(e)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col items-start gap-2 w-full md:w-auto">
            <label htmlFor="field-filter" className="text-sm font-semibold text-primary">{t.filterByField}</label>
            <Select value={field} onValueChange={setField}>
              <SelectTrigger id="field-filter" className="w-full md:w-[240px]">
                <SelectValue placeholder={t.allFields} />
              </SelectTrigger>
              <SelectContent>
                {fields.map((f) => (
                   <SelectItem key={f} value={f}>
                    {f === 'all' ? t.allFields : f}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col items-start gap-2 w-full md:w-auto">
            <label htmlFor="religion-filter" className="text-sm font-semibold text-primary">{t.filterByReligion}</label>
            <Select value={religion} onValueChange={setReligion}>
              <SelectTrigger id="religion-filter" className="w-full md:w-[240px]">
                <SelectValue placeholder={t.allReligions} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t.allReligions}</SelectItem>
                {religions.map((r) => (
                  <SelectItem key={r.id} value={r.id}>
                    {locale === 'pt' ? r.name_pt : r.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Renders the filtered list of characters or a "not found" message. */}
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
