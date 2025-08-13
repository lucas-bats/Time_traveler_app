// Importa componentes do Next.js e da UI.
import Link from "next/link";
import { Button } from "./ui/button";
import { Home, Languages, Heart } from "lucide-react";
import { useLocale } from "@/lib/locale.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

/**
 * Componente do cabeçalho do site.
 * É exibido em todas as páginas e contém a navegação principal,
 * como o link para a Home e o seletor de idioma.
 */
export function SiteHeader() {
  // Obtém o contexto de localização.
  const { t, setLocale } = useLocale();

  return (
    // O elemento header é fixo no topo da página.
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        {/* Contêiner principal que alinha os itens à esquerda. */}
        <div className="flex flex-1 items-center gap-2 md:gap-4">
          {/* Link para a página inicial com o logo e título do site. */}
          <Link href="/" className="flex items-center space-x-2 mr-4">
            <Image 
              src="https://firebasestorage.googleapis.com/v0/b/time-traveler-talks.firebasestorage.app/o/20250813_1429_Timeless%20Wisdom%20Logo_simple_compose_01k2j7m0tafhqvhhfv2k43r466.png?alt=media&token=a89a742f-8ae5-482c-8a43-ce8890ad3d2d" 
              alt="Eternal Minds Logo" 
              width={32} 
              height={32}
              className="h-8 w-8"
            />
            <span className="font-bold font-headline text-primary text-xl">
              {t.title}
            </span>
          </Link>
          {/* Navegação principal com os botões. */}
          <nav className="flex items-center space-x-1">
            {/* Botão de link para a Home. */}
            <Button variant="ghost" asChild>
              <Link href="/">
                <Home className="h-5 w-5 md:mr-2" />
                <span className="hidden md:inline">{t.home}</span>
              </Link>
            </Button>
            {/* Menu suspenso para a seleção de idioma. */}
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
            {/* Botão de link para a seção de doação. */}
            <Button variant="ghost" size="icon" asChild>
                <Link href="/#donation-section">
                    <Heart className="h-5 w-5 text-destructive" />
                    <span className="sr-only">{t.supportTheProject}</span>
                </Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
