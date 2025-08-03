"use client";

import { useState, useMemo } from "react";
import type { Character } from "@/lib/characters";
import { CharacterCard } from "./character-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useLocale } from "@/lib/locale.tsx";

interface CharacterSelectionProps {
  characters: Character[];
}

export function CharacterSelection({ characters }: CharacterSelectionProps) {
  const { t } = useLocale();
  const [searchTerm, setSearchTerm] = useState("");
  const [era, setEra] = useState("all");
  const [field, setField] = useState("all");

  const eras = useMemo(() => ["all", ...new Set(characters.map((c) => c.era))], [characters]);
  const fields = useMemo(() => ["all", ...new Set(characters.map((c) => c.field))], [characters]);

  const filteredCharacters = useMemo(() => {
    return characters.filter((character) => {
      const matchesSearch = character.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesEra = era === "all" || character.era === era;
      const matchesField = field === "all" || character.field === field;
      return matchesSearch && matchesEra && matchesField;
    });
  }, [characters, searchTerm, era, field]);

  return (
    <section className="w-full py-12 md:py-16">
      <div className="container px-4 md:px-6">
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <Input
            type="search"
            placeholder={t.searchPlaceholder}
            className="flex-1"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="flex gap-4">
            <Select value={era} onValueChange={setEra}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder={t.filterByEra} />
              </SelectTrigger>
              <SelectContent>
                {eras.map((e) => (
                  <SelectItem key={e} value={e} className="capitalize">{e === 'all' ? t.allEras : e}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={field} onValueChange={setField}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder={t.filterByField} />
              </SelectTrigger>
              <SelectContent>
                {fields.map((f) => (
                  <SelectItem key={f} value={f} className="capitalize">{f === 'all' ? t.allFields : f}</SelectItem>
                ))}
              </SelectContent>
            </Select>
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
