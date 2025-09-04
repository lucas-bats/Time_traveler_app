
"use client";

import Link from "next/link";
import { useLocale } from "@/lib/locale";

/**
 * Site footer component.
 * It is displayed on all pages and contains secondary navigation,
 * such as links to About and Privacy Policy.
 */
export function SiteFooter() {
  // Gets the localization context.
  const { t } = useLocale();

  return (
    <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
      <p className="text-xs text-muted-foreground">
        &copy; 2024 {t.title}. {t.allRightsReserved}.
      </p>
      <nav className="sm:ml-auto flex gap-4 sm:gap-6">
        <Link className="text-xs hover:underline underline-offset-4" href="/about">
          {t.about}
        </Link>
         <Link className="text-xs hover:underline underline-offset-4" href="/contact">
          {t.contactUsTitle}
        </Link>
        <Link className="text-xs hover:underline underline-offset-4" href="/terms">
          {t.termsOfService}
        </Link>
        <Link className="text-xs hover:underline underline-offset-4" href="/privacy">
          {t.privacyPolicy}
        </Link>
      </nav>
    </footer>
  );
}
