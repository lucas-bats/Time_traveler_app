// Define que este é um "Client Component".
"use client";

// Importa hooks do React.
import { useState, useMemo } from "react";
// Importa tipos e componentes necessários.
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

// Define a interface para as props do componente.
interface CharacterSelectionProps {
  characters: Character[];
}

// Ordem desejada para as eras.
const eraOrder = ["Antiquity", "Medieval", "Renaissance", "Modern", "Contemporary"];
const eraOrderPt = ["Antiguidade", "Medieval", "Renascentista", "Moderna", "Contemporânea"];

// Mapeamento de eras para seus períodos de tempo, para exibição.
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
 * Componente para selecionar e filtrar personagens.
 * Inclui filtros por era e campo de atuação.
 */
export function CharacterSelection({ characters }: CharacterSelectionProps) {
  // Obtém o contexto de localização.
  const { t, locale } = useLocale();
  // Estado para o filtro de era selecionado.
  const [era, setEra] = useState("all");
  // Estado para o filtro de campo selecionado.
  const [field, setField] = useState("all");

  // useMemo para calcular a lista de eras disponíveis, ordenadas corretamente.
  const eras = useMemo(() => {
    const uniqueEras = [...new Set(characters.map((c) => (locale === 'pt' ? c.era_pt : c.era)))];
    const order = locale === 'pt' ? eraOrderPt : eraOrder;
    uniqueEras.sort((a, b) => order.indexOf(a) - order.indexOf(b));
    return ["all", ...uniqueEras];
  }, [characters, locale]);

  // useMemo para calcular a lista de campos disponíveis, em ordem alfabética.
  const fields = useMemo(() => ["all", ...new Set(characters.map((c) => (locale === 'pt' ? c.field_pt : c.field) ))].sort((a,b) => a.localeCompare(b)), [characters, locale]);
  
  // Função auxiliar para obter a 'era' original (em inglês) a partir da era traduzida.
  const getOriginalEra = (eraWithTimeframe: string) => {
    if (eraWithTimeframe === 'all') return 'all';
    const baseEra = eraWithTimeframe.split(" (")[0];
    const character = characters.find(c => c.era_pt === baseEra || c.era === baseEra);
    return character ? character.era : 'all';
  }

  // Função auxiliar para obter o 'field' original (em inglês) a partir do campo traduzido.
  const getOriginalField = (translatedField: string) => {
    if (translatedField === 'all') return 'all';
    const character = characters.find(c => c.field_pt === translatedField || c.field === translatedField);
    return character ? character.field : 'all';
  }

  // useMemo para filtrar a lista de personagens com base nos filtros selecionados.
  const filteredCharacters = useMemo(() => {
    const originalEra = getOriginalEra(era);
    const originalField = getOriginalField(field);
    return characters.filter((character) => {
      const matchesEra = originalEra === "all" || character.era === originalEra;
      const matchesField = originalField === "all" || character.field === originalField;
      return matchesEra && matchesField;
    });
  }, [characters, era, field, locale]);

  // Função para obter o nome de exibição da era, incluindo o período de tempo.
  const getDisplayName = (e: string) => {
    if (e === 'all') return t.allEras;
    const timeframe = locale === 'pt' ? timeframes.pt[e as keyof typeof timeframes.pt] : timeframes.en[e as keyof typeof timeframes.en];
    return `${e}${timeframe || ''}`;
  }

  return (
    <section className="w-full py-8 md:py-16">
      <div className="container px-4 md:px-6">
        {/* Contêiner para os controles de filtro. */}
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
        </div>

        {/* Renderiza a lista de personagens filtrada ou uma mensagem de "nenhum encontrado". */}
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
