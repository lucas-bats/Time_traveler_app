// Importa componentes do Next.js e React.
import Image from "next/image";
import Link from "next/link";
// Importa componentes de UI (Card, Button).
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// Importa o tipo de dados do personagem.
import type { Character } from "@/lib/characters";
// Importa ícone.
import { ArrowRight } from "lucide-react";
// Importa o hook de localização para traduções.
import { useLocale } from "@/lib/locale.tsx";

// Define a interface para as props do componente.
interface CharacterCardProps {
  character: Character; // O objeto do personagem a ser exibido.
}

/**
 * Componente que exibe um card de um personagem individual.
 * Contém a imagem, nome, descrição e um link para iniciar a conversa.
 */
export function CharacterCard({ character }: CharacterCardProps) {
  // Obtém o estado da localização (idioma) e a função de tradução.
  const { t, locale } = useLocale();

  return (
    // O componente Card com animação de hover.
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <CardHeader className="p-0">
        {/* O link envolve a imagem, levando para a página de chat do personagem. */}
        <Link href={`/chat/${character.id}`} aria-label={`${t.chatWith} ${character.name}`}>
          <Image
            src={character.image}
            alt={`${t.portraitOf} ${character.name}`}
            width={400}
            height={400}
            className="w-full h-64 object-contain bg-black/5"
            // Atributo para dica de IA, usado para gerar imagens.
            data-ai-hint={character.aiHint}
          />
        </Link>
      </CardHeader>
      <CardContent className="p-6">
        {/* Título com o nome do personagem. */}
        <CardTitle className="font-headline text-2xl mb-2 text-primary">
          {character.name}
        </CardTitle>
        {/* Descrição do personagem, traduzida com base no locale. */}
        <CardDescription className="line-clamp-3 mb-4 text-muted-foreground h-[60px]">
          {locale === 'pt' ? character.description_pt : character.description}
        </CardDescription>
        {/* Botão com link para iniciar a conversa. */}
        <Button asChild variant="link" className="p-0 h-auto">
          <Link href={`/chat/${character.id}`}>
            {t.startConversation} <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
