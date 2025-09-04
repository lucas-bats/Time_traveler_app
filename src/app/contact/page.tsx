
"use client";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { useLocale } from "@/lib/locale";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
    const { t } = useLocale();
    const contactEmail = "lucaspaesbatista@yahoo.com.br";
    
    return (
        <div className="flex flex-col min-h-screen">
            <SiteHeader />
            <main className="flex-1">
                <div className="container px-4 md:px-6 py-12 md:py-24 lg:py-32">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl font-headline text-primary">
                            {t.contactUsTitle}
                        </h1>
                        <p className="mt-4 text-lg text-muted-foreground">
                            {t.contactUsText}
                        </p>
                         <div className="mt-8">
                            <Button asChild size="lg">
                                <a href={`mailto:${contactEmail}`}>
                                    <Mail className="mr-2 h-5 w-5" /> {contactEmail}
                                </a>
                            </Button>
                        </div>
                    </div>
                </div>
            </main>
             <SiteFooter />
        </div>
    );
}
