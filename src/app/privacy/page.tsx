import { SiteHeader } from "@/components/site-header";
import Link from "next/link";

export default function PrivacyPolicyPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <SiteHeader />
            <main className="flex-1">
                <div className="container px-4 md:px-6 py-12 md:py-24 lg:py-32">
                    <div className="max-w-3xl mx-auto">
                        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl font-headline text-primary">
                            Privacy Policy
                        </h1>
                        <p className="mt-4 text-lg text-muted-foreground">
                            Last Updated: August 14, 2024
                        </p>
                        <p className="mt-4 text-lg text-muted-foreground">
                            Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information when you use Eternal Minds.
                        </p>
                        
                        <h2 className="mt-12 text-3xl font-bold tracking-tighter font-headline text-primary">
                           Information We Collect
                        </h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                           We do not collect any personal information from our users. All interactions and chat histories are stored directly on your device using your browser's local storage. We do not have access to your conversations.
                        </p>
                        <ul className="mt-4 list-disc list-inside space-y-2 text-lg text-muted-foreground">
                            <li><strong>Chat Data:</strong> Your conversations with historical figures are saved in your browser's local storage to allow you to continue them later. This data is not transmitted to our servers.</li>
                            <li><strong>Analytics:</strong> We use Google Analytics to collect anonymous usage data to help us understand how our site is being used and how we can improve it. This includes information like page views and session duration, but does not include any personal identifying information.</li>
                        </ul>

                        <h2 className="mt-12 text-3xl font-bold tracking-tighter font-headline text-primary">
                            How We Use Information
                        </h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                           Since we do not collect personal information, we do not use it for any purpose. The anonymous data collected by Google Analytics is used solely for improving our website and services.
                        </p>

                        <h2 className="mt-12 text-3xl font-bold tracking-tighter font-headline text-primary">
                           Third-Party Services
                        </h2>
                         <p className="mt-4 text-lg text-muted-foreground">
                           We use Google AdSense to display ads on our website. Google may use cookies to serve ads based on a user's prior visits to our website or other websites. You can opt out of personalized advertising by visiting Google's Ad Settings.
                        </p>

                        <h2 className="mt-12 text-3xl font-bold tracking-tighter font-headline text-primary">
                            Changes to This Policy
                        </h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
                        </p>

                         <h2 className="mt-12 text-3xl font-bold tracking-tighter font-headline text-primary">
                            Contact Us
                        </h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                            If you have any questions about this Privacy Policy, please contact us at: lucaspaesbatista@yahoo.com.br
                        </p>
                    </div>
                </div>
            </main>
             <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
                <p className="text-xs text-muted-foreground">
                &copy; 2024 Eternal Minds. All rights reserved.
                </p>
                <nav className="sm:ml-auto flex gap-4 sm:gap-6">
                    <Link className="text-xs hover:underline underline-offset-4" href="/about">About</Link>
                    <Link className="text-xs hover:underline underline-offset-4" href="/privacy">Privacy Policy</Link>
                </nav>
            </footer>
        </div>
    );
}
