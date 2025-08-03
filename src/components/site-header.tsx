import Link from "next/link";
import { Button } from "./ui/button";
import { Home } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="inline-block font-bold font-headline text-primary text-xl">
              Time Traveler Talks
            </span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <Button variant="ghost" asChild>
              <Link href="/">
                <Home className="h-5 w-5 mr-2" />
                Home
              </Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
