"use client";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { useLocale } from "@/lib/locale";

export default function PrivacyPolicyPage() {
    const { t } = useLocale();
    
    return (
        <div className="flex flex-col min-h-screen">
            <SiteHeader />
            <main className="flex-1">
                <div className="container px-4 md:px-6 py-12 md:py-24 lg:py-32">
                    <div className="max-w-3xl mx-auto">
                        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl font-headline text-primary">
                            {t.privacyPolicy}
                        </h1>
                        <p className="mt-4 text-lg text-muted-foreground">
                            {t.lastUpdated}
                        </p>
                        <p className="mt-4 text-lg text-muted-foreground">
                           {t.privacyIntro}
                        </p>
                        
                        <h2 className="mt-12 text-3xl font-bold tracking-tighter font-headline text-primary">
                           {t.infoWeCollectTitle}
                        </h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                           {t.infoWeCollectText1}
                        </p>
                        <ul className="mt-4 list-disc list-inside space-y-2 text-lg text-muted-foreground">
                            <li><strong>{t.chatDataTitle}:</strong> {t.chatDataText}</li>
                            <li><strong>{t.analyticsTitle}:</strong> {t.analyticsText}</li>
                        </ul>

                        <h2 className="mt-12 text-3xl font-bold tracking-tighter font-headline text-primary">
                            {t.howWeUseInfoTitle}
                        </h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                           {t.howWeUseInfoText}
                        </p>

                        <h2 className="mt-12 text-3xl font-bold tracking-tighter font-headline text-primary">
                           {t.thirdPartyServicesTitle}
                        </h2>
                         <p className="mt-4 text-lg text-muted-foreground">
                           {t.thirdPartyServicesText}
                        </p>

                        <h2 className="mt-12 text-3xl font-bold tracking-tighter font-headline text-primary">
                            {t.changesToPolicyTitle}
                        </h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                            {t.changesToPolicyText}
                        </p>

                         <h2 className="mt-12 text-3xl font-bold tracking-tighter font-headline text-primary">
                            {t.contactUsTitle}
                        </h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                            {t.contactUsText}
                        </p>
                    </div>
                </div>
            </main>
             <SiteFooter />
        </div>
    );
}
