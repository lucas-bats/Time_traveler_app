// Define que este é um "Client Component".
"use client";

// Importa componentes do Next.js e React.
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useLocale } from "@/lib/locale.tsx";
import { Heart, CreditCard } from "lucide-react";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { Copy } from "lucide-react";
import { Separator } from "./ui/separator";

/**
 * Componente para exibir a seção de doação via PIX e PayPal.
 */
export function DonationSection() {
  const { t } = useLocale();
  const { toast } = useToast();
  const pixKey = "06e37bed-6cbc-4901-97f1-c5b7f1e154b1"; // Chave PIX
  const paypalEmail = "lucaspaesbatista@yahoo.com.br";
  const paypalUrl = `https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=${paypalEmail}&item_name=Donation+for+Time+Traveler+Talks&currency_code=BRL`;

  const handleCopy = () => {
    navigator.clipboard.writeText(pixKey);
    toast({
      title: t.copiedToClipboard,
      description: t.pixKeyCopied,
    });
  };

  return (
    <section className="w-full py-8 md:py-16 bg-muted/40">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="inline-block rounded-lg bg-primary text-primary-foreground p-3">
            <Heart className="h-6 w-6" />
          </div>
          <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tighter text-primary">
            {t.supportTheProject}
          </h2>
          <p className="max-w-[600px] text-muted-foreground md:text-lg">
            {t.supportTheProjectDescription}
          </p>
        </div>
        <div className="mx-auto max-w-sm mt-8">
            <Card className="text-center">
                <CardHeader>
                    <CardTitle>{t.donateWithPix}</CardTitle>
                    <CardDescription>{t.scanQrCode}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center gap-4">
                    <Image
                        src="https://firebasestorage.googleapis.com/v0/b/time-traveler-talks.firebasestorage.app/o/8f40ec9d-e457-4987-b792-c9d3dbd30b59.jpg?alt=media&token=c6ae6803-3306-433d-bd73-82b1f39e9284"
                        alt="PIX QR Code"
                        width={250}
                        height={250}
                        className="rounded-md"
                        data-ai-hint="qr code"
                    />
                    <p className="text-sm text-muted-foreground">{t.orCopyKey}</p>
                    <div className="flex w-full max-w-xs items-center space-x-2 rounded-md bg-background border p-2">
                        <p className="text-sm font-mono flex-1 truncate">{pixKey}</p>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleCopy}>
                            <Copy className="h-4 w-4" />
                            <span className="sr-only">Copiar chave PIX</span>
                        </Button>
                    </div>

                    <Separator className="my-4" />

                    <div className="flex flex-col items-center gap-2">
                       <p className="text-sm text-muted-foreground">{t.orDonateWith}</p>
                       <Button asChild className="w-full max-w-xs">
                          <a href={paypalUrl} target="_blank" rel="noopener noreferrer">
                              <CreditCard className="mr-2 h-4 w-4" />
                              {t.donateWithPaypal}
                          </a>
                       </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </section>
  );
}
