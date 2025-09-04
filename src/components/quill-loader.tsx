// Defines this as a "Client Component".
"use client";

// Imports the localization hook to get the translated text.
import { useLocale } from "@/lib/locale";

/**
 * Loader component that simulates a "writing quill".
 * Displayed while the AI is processing a response.
 */
export function QuillLoader() {
  // Gets the 't' translation function.
  const { t } = useLocale();
  return (
    <div className="flex items-center justify-start p-4">
      <div className="flex items-center space-x-2">
        {/* SVG of the quill animation. */}
        <svg
          width="40"
          height="40"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M85.7,29.9c0.2-1.1-0.4-2.2-1.3-2.7c-0.3-0.2-0.7-0.2-1-0.2c-0.7,0-1.4,0.3-1.9,0.8l-15.1,15.1l0.5-0.5c-2-2-5.1-2-7.1,0 l-2.6,2.6c-2,2-2,5.1,0,7.1l0.5-0.5L34.2,74.9L22.4,63.1c-2-2-5.1-2-7.1,0l-1.9,1.9c-2,2-2,5.1,0,7.1l11.8,11.8 c1,1,2.3,1.5,3.5,1.5s2.6-0.5,3.5-1.5l1.9-1.9c2-2,2-5.1,0-7.1L25.8,63.1l22.7-22.7l-0.5,0.5c2-2,2-5.1,0-7.1l-2.6-2.6 c-2-2-5.1-2-7.1,0l-0.5,0.5L22.6,46.9c-0.9-0.5-2-0.4-2.7,0.4c-0.9,0.9-1.1,2.3-0.4,3.4l15.1,22.7c0.5,0.8,1.4,1.3,2.4,1.3 c0.3,0,0.7-0.1,1-0.2c1.1-0.5,1.8-1.6,1.6-2.7L37,49.1l15.1-15.1l-0.5,0.5c2-2,2-5.1,0-7.1l-2.6-2.6c-2-2-5.1-2-7.1,0l-0.5,0.5 L26.3,39.6c-0.9-0.5-2-0.4-2.7,0.4c-0.9,0.9-1.1,2.3-0.4,3.4l15.1,22.7c0.5,0.8,1.4,1.3,2.4,1.3c0.3,0,0.7-0.1,1-0.2 c1.1-0.5,1.8-1.6,1.6-2.7L39.8,44l15.1-15.1l0.5-0.5c2-2,5.1-2,7.1,0l2.6,2.6c2,2,2,5.1,0,7.1l-0.5,0.5l15.1,15.1 c0.5,0.5,1.2,0.8,1.9,0.8c0.3,0,0.7-0.1,1-0.2c1.1-0.5,1.8-1.6,1.6-2.7L73.1,39.6L58,24.5l0.5-0.5c-2-2-5.1-2-7.1,0l-2.6,2.6 c-2,2-2,5.1,0,7.1l0.5-0.5l15.1,15.1c0.5,0.8,1.4,1.3,2.4,1.3c0.3,0,0.7-0.1,1-0.2c1.1-0.5,1.8-1.6,1.6-2.7L67.4,44l15.1-15.1 C84.4,27.1,86.2,27.8,85.7,29.9z"
            // The 'writing-animation' class applies the animation defined in globals.css.
            className="writing-animation"
            stroke="hsl(var(--primary))"
            strokeWidth="3"
            strokeDasharray="250"
            strokeDashoffset="250"
            fill="hsl(var(--primary))"
            fillOpacity="0"
          />
        </svg>
        {/* "Thinking..." text that appears next to the animation. */}
        <span className="text-muted-foreground italic">{t.thinking}</span>
      </div>
    </div>
  );
}
