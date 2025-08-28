import { getEventAiResponse } from "@/app/actions";
import { type NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
    try {
        const { eventId, userMessage, language } = await req.json();

        if (!eventId || !userMessage || !language) {
            return new Response('Missing required fields', { status: 400 });
        }

        const stream = await getEventAiResponse({ eventId, userMessage, language });
        
        return new Response(stream, {
            headers: {
                'Content-Type': 'text/plain; charset=utf-8',
            },
        });
    } catch (error: any) {
        console.error('Error in event chat API:', error);
        return new Response(error.message || 'An error occurred.', { status: 500 });
    }
}
