// Define que este é um "Client Component", executado no navegador.
"use client";

// Importa o componente de seleção de personagens.
import { CharacterSelection } from "@/components/character-selection";
// Importa a função para obter a lista de personagens.
import { getCharacters } from "@/lib/characters";
// Importa o hook para usar o contexto de localização (idioma).
import { useLocale } from "@/lib/locale";
// Importa componentes de UI para o menu suspenso.
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// Importa o componente de botão.
import { Button } from "@/components/ui/button";
// Importa ícones da biblioteca lucide-react.
import { Languages, Shuffle } from "lucide-react";
// Importa o hook useRouter do Next.js para navegação.
import { useRouter } from "next/navigation";

/**
 * Componente da página inicial (Home).
 * Exibe o título, subtítulo, seletor de idioma e a lista de personagens para iniciar o chat.
 */
export default function Home() {
  // Obtém a lista de todos os personagens.
  const characters = getCharacters();
  // Obtém as funções e o estado do contexto de localização (t para traduções, setLocale para mudar o idioma).
  const { t, setLocale } = useLocale();
  // Obtém a instância do roteador para navegar programaticamente.
  const router = useRouter();

  /**
   * Manipulador de evento para o botão "Surpreenda-me".
   * Seleciona um personagem aleatório e navega para a página de chat dele.
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
      {/* Cabeçalho posicionado no canto superior direito para o seletor de idioma. */}
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
        {/* Seção principal com o título e subtítulo da aplicação. */}
        <section className="w-full pt-6 pb-3 md:pt-8 md:pb-4">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tighter text-primary">
                {t.title}
              </h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                {t.subtitle}
              </p>
              {/* Botão para selecionar um personagem aleatório. */}
              <Button onClick={handleRandomCharacter} size="lg" className="mt-4">
                <Shuffle className="mr-2 h-5 w-5" />
                {t.surpriseMe}
              </Button>
              {/* Descrição do botão "Surpreenda-me". */}
              <p className="text-sm text-muted-foreground">
                {t.surpriseMeDescription}
              </p>
            </div>
          </div>
        </section>
        {/* Componente que renderiza a lista de personagens filtrável. */}
        <CharacterSelection characters={characters} />
      </main>
      {/* Rodapé da página. */}
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          &copy; 2024 {t.title}. {t.allRightsReserved}.
        </p>
      </footer>
    </div>
  );
}
