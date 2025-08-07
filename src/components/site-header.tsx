
import Link from "next/link";
import { Button } from "./ui/button";
import { Home, Languages } from "lucide-react";
import { useLocale } from "@/lib/locale.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function SiteHeader() {
  const { t, setLocale } = useLocale();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="flex flex-1 items-center gap-2 md:gap-4">
          <Link href="/" className="flex items-center space-x-2 mr-4">
            <span className="font-bold font-headline text-primary text-xl">
              {t.title}
            </span>
          </Link>
          <nav className="flex items-center space-x-1">
            <Button variant="ghost" asChild>
              <Link href="/">
                <Home className="h-5 w-5 md:mr-2" />
                <span className="hidden md:inline">{t.home}</span>
              </Link>
            </Button>
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
          </nav>
        </div>
      </div>
    </header>
  );
}
