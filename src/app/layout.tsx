// Imports the Metadata type from Next.js to define page metadata.
import type { Metadata } from "next";
// Imports the Toaster component to display notifications.
import { Toaster } from "@/components/ui/toaster";
// Imports the global styles file.
import "./globals.css";
// Imports the cn utility function to merge Tailwind classes.
import { cn } from "@/lib/utils";
// Imports the context provider for locale (language) management.
import { LocaleProvider } from "@/lib/locale";
import { ThemeProvider } from "@/components/theme-provider";

// Defines the application's metadata, such as title and description, for SEO.
export const metadata: Metadata = {
  metadataBase: new URL('https://eternalminds.fun'),
  title: "Eternal Minds",
  description: "Chat with historical figures, powered by AI.",
};

/**
 * Root Layout component of the application.
 * It wraps all pages and is responsible for defining the base HTML structure,
 * loading fonts, and providing global contexts.
 * @param {object} props - The component's properties.
 * @param {React.ReactNode} props.children - The child components that will be rendered within the layout.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Defines the <html> tag with the language and suppresses hydration warnings.
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnects to Google's font servers to optimize loading. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Imports the Literata and Playfair Display fonts from Google Fonts. */}
        <link
          href="https://fonts.googleapis.com/css2?family=Literata:ital,opsz,wght@0,7..72,200..900;1,7..72,200..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap"
          rel="stylesheet"
        />
        {/* Google AdSense Script */}
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8372729948864720"
     crossOrigin="anonymous"></script>
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-CNMYM732N3"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-CNMYM732N3');
            `,
          }}
        />
      </head>
      {/* Defines the <body> tag with base style classes. */}
      <body className={cn("font-body antialiased min-h-screen")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* The LocaleProvider wraps the application to provide the language context. */}
          <LocaleProvider>
            {/* Renders the child components (the pages). */}
            {children}
            {/* The Toaster is rendered here to be available throughout the application. */}
            <Toaster />
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
