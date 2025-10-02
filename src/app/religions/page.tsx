"use client";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getReligions, type Religion } from "@/lib/religions";
import { useLocale } from "@/lib/locale";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

function ReligionCard({ religion }: { religion: Religion }) {
  const { t, locale } = useLocale();
  const name = locale === 'pt' ? religion.name_pt : religion.name;
  const description = locale === 'pt' ? religion.description_pt : religion.description;

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full flex flex-col">
      <CardHeader className="p-0">
        <Link href={`/religions/${religion.id}`} aria-label={`${t.exploreReligion} ${name}`}>
          <Image
            src={religion.image}
            alt={name}
            width={400}
            height={400}
            className="w-full h-48 object-cover bg-black/5"
            data-ai-hint="religion symbol"
          />
        </Link>
      </CardHeader>
      <CardContent className="p-6 flex-1 flex flex-col">
        <CardTitle className="font-headline text-2xl mb-2 text-primary">
          {name}
        </CardTitle>
        <CardDescription className="line-clamp-3 mb-4 text-muted-foreground flex-1">
          {description}
        </CardDescription>
        <Button asChild variant="link" className="p-0 h-auto mt-auto self-start">
          <Link href={`/religions/${religion.id}`}>
            {t.exploreReligion} <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}


export default function ReligionsPage() {
    const { t } = useLocale();
    const religions = getReligions();

    return (
        <div className="flex flex-col min-h-screen">
            <SiteHeader />
            <main className="flex-1">
                <section className="w-full pt-6 pb-12 md:pt-12">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center space-y-4 text-center">
                            <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tighter text-primary">
                                {t.religions}
                            </h1>
                            <p className="max-w-[700px] text-muted-foreground md:text-xl">
                                {t.subtitle}
                            </p>
                        </div>
                    </div>
                </section>
                
                <section className="w-full pb-12 md:pb-24">
                    <div className="container px-4 md:px-6">
                        {religions.length > 0 ? (
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                            {religions.map((religion) => (
                              <ReligionCard key={religion.id} religion={religion} />
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-16 text-muted-foreground">
                            <h3 className="text-2xl font-headline">{t.noReligionsFound}</h3>
                            <p>{t.checkBackLater}</p>
                          </div>
                        )}
                    </div>
                </section>
            </main>
            <SiteFooter />
        </div>
    );
}
