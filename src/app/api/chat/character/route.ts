import { getAiResponse } from "@/app/actions";
import { type NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
    try {
        const { historicalFigure, userMessage, language } = await req.json();
        
        if (!historicalFigure || !userMessage || !language) {
            return new Response('Missing required fields', { status: 400 });
        }
        
        const stream = await getAiResponse({ historicalFigure, userMessage, language });
        
        return new Response(stream, {
            headers: {
                'Content-Type': 'text/plain; charset=utf-8',
            },
        });
    } catch (error: any) {
        console.error('Error in character chat API:', error);
        return new Response(error.message || 'An error occurred.', { status: 500 });
    }
}
