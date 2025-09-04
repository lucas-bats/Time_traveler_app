
"use client";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { useLocale } from "@/lib/locale";

export default function TermsOfServicePage() {
    const { t } = useLocale();
    
    return (
        <div className="flex flex-col min-h-screen">
            <SiteHeader />
            <main className="flex-1">
                <div className="container px-4 md:px-6 py-12 md:py-24 lg:py-32">
                    <div className="max-w-3xl mx-auto">
                        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl font-headline text-primary">
                            {t.termsOfService}
                        </h1>
                        <p className="mt-4 text-lg text-muted-foreground">
                            {t.lastUpdated}
                        </p>
                        
                        <h2 className="mt-12 text-3xl font-bold tracking-tighter font-headline text-primary">
                           {t.termsIntroductionTitle}
                        </h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                           {t.termsIntroductionText}
                        </p>
                        
                        <h2 className="mt-12 text-3xl font-bold tracking-tighter font-headline text-primary">
                           {t.termsUseOfServiceTitle}
                        </h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                           {t.termsUseOfServiceText}
                        </p>

                        <h2 className="mt-12 text-3xl font-bold tracking-tighter font-headline text-primary">
                            {t.termsDisclaimerTitle}
                        </h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                            {t.termsDisclaimerText}
                        </p>

                         <h2 className="mt-12 text-3xl font-bold tracking-tighter font-headline text-primary">
                            {t.termsLimitationTitle}
                        </h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                            {t.termsLimitationText}
                        </p>
                    </div>
                </div>
            </main>
             <SiteFooter />
        </div>
    );
}
