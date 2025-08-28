"use client";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { useLocale } from "@/lib/locale.tsx";

export default function AboutPage() {
    const { t } = useLocale();

    return (
        <div className="flex flex-col min-h-screen">
            <SiteHeader />
            <main className="flex-1">
                <div className="container px-4 md:px-6 py-12 md:py-24 lg:py-32">
                    <div className="max-w-3xl mx-auto">
                        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl font-headline text-primary">
                            {t.aboutTitle}
                        </h1>
                        <p className="mt-4 text-lg text-muted-foreground">
                            {t.aboutIntro}
                        </p>
                        <h2 className="mt-12 text-3xl font-bold tracking-tighter font-headline text-primary">
                            {t.ourVisionTitle}
                        </h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                            {t.ourVisionText}
                        </p>
                        <h2 className="mt-12 text-3xl font-bold tracking-tighter font-headline text-primary">
                            {t.howItWorksTitle}
                        </h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                           {t.howItWorksText1}
                        </p>
                        <ul className="mt-4 list-disc list-inside space-y-2 text-lg text-muted-foreground">
                            <li><strong>Next.js & React:</strong> {t.howItWorksTech1}</li>
                            <li><strong>Genkit (Google AI):</strong> {t.howItWorksTech2}</li>
                            <li><strong>Tailwind CSS & ShadCN/UI:</strong> {t.howItWorksTech3}</li>
                        </ul>
                         <p className="mt-4 text-lg text-muted-foreground">
                           {t.howItWorksText2}
                        </p>
                    </div>
                </div>
            </main>
            <SiteFooter />
        </div>
    );
}
