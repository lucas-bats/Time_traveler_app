import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function AboutPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <SiteHeader />
            <main className="flex-1">
                <div className="container px-4 md:px-6 py-12 md:py-24 lg:py-32">
                    <div className="max-w-3xl mx-auto">
                        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl font-headline text-primary">
                            About Eternal Minds
                        </h1>
                        <p className="mt-4 text-lg text-muted-foreground">
                            Eternal Minds is an interactive web application that allows users to chat with historical figures, powered by cutting-edge generative AI. Our mission is to make history more accessible, engaging, and personal.
                        </p>
                        <h2 className="mt-12 text-3xl font-bold tracking-tighter font-headline text-primary">
                            Our Vision
                        </h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                            We believe that the best way to learn about the past is to interact with it. Instead of just reading about historical figures in a textbook, Eternal Minds allows you to ask them questions directly. You can learn about their lives, their work, their perspectives, and the times they lived in, all through natural conversation.
                        </p>
                        <h2 className="mt-12 text-3xl font-bold tracking-tighter font-headline text-primary">
                            How It Works
                        </h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                            This application is built using a modern technology stack to provide a seamless and responsive experience:
                        </p>
                        <ul className="mt-4 list-disc list-inside space-y-2 text-lg text-muted-foreground">
                            <li><strong>Next.js & React:</strong> For a fast and dynamic user interface.</li>
                            <li><strong>Genkit (Google AI):</strong> To power the intelligent and context-aware conversations with our historical figures.</li>
                            <li><strong>Tailwind CSS & ShadCN/UI:</strong> For a clean, modern, and accessible design.</li>
                        </ul>
                         <p className="mt-4 text-lg text-muted-foreground">
                            When you send a message to a figure like Cleopatra or Leonardo da Vinci, our AI model, powered by Genkit, generates a response that emulates the personality, knowledge, and linguistic style of that specific historical person.
                        </p>
                    </div>
                </div>
            </main>
            <SiteFooter />
        </div>
    );
}
