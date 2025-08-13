// Importa o tipo Metadata do Next.js para definir os metadados da página.
import type { Metadata } from "next";
// Importa o componente Toaster para exibir notificações.
import { Toaster } from "@/components/ui/toaster";
// Importa o arquivo de estilos globais.
import "./globals.css";
// Importa a função de utilidade cn para mesclar classes do Tailwind.
import { cn } from "@/lib/utils";
// Importa o provedor de contexto para o gerenciamento de localidade (idioma).
import { LocaleProvider } from "@/lib/locale.tsx";

// Define os metadados da aplicação, como título e descrição, para SEO.
export const metadata: Metadata = {
  title: "Eternal Minds",
  description: "Chat with historical figures, powered by AI.",
};

/**
 * Componente de Layout Raiz (Root Layout) da aplicação.
 * Ele envolve todas as páginas e é responsável por definir a estrutura HTML base,
 * carregar fontes, e prover contextos globais.
 * @param {object} props - As propriedades do componente.
 * @param {React.ReactNode} props.children - Os componentes filhos que serão renderizados dentro do layout.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Define a tag <html> com o idioma e suprime avisos de hidratação.
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Pré-conecta aos servidores de fontes do Google para otimizar o carregamento. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Importa as fontes Literata e Playfair Display do Google Fonts. */}
        <link
          href="https://fonts.googleapis.com/css2?family=Literata:ital,opsz,wght@0,7..72,200..900;1,7..72,200..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap"
          rel="stylesheet"
        />
        {/* Script do Google AdSense */}
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8372729948864720"
     crossOrigin="anonymous"></script>
      </head>
      {/* Define a tag <body> com classes de estilo base. */}
      <body className={cn("font-body antialiased min-h-screen")}>
        {/* O LocaleProvider envolve a aplicação para fornecer o contexto de idioma. */}
        <LocaleProvider>
          {/* Renderiza os componentes filhos (as páginas). */}
          {children}
          {/* O Toaster é renderizado aqui para estar disponível em toda a aplicação. */}
          <Toaster />
        </LocaleProvider>
      </body>
    </html>
  );
}
