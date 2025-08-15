import * as React from "react"

// Defines the breakpoint for mobile device detection.
const MOBILE_BREAKPOINT = 768

/**
 * A custom hook to detect if the user's device is mobile.
 * It is based on the browser's window width.
 * @returns {boolean} `true` if the window width is less than `MOBILE_BREAKPOINT`, `false` otherwise.
 */
export function useIsMobile() {
  // The state to store whether it's mobile or not. Starts as `undefined`
  // to avoid hydration issues between server and client.
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    // Creates a Media Query List to observe changes in screen size.
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    // Function to be called when the media query condition changes.
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }

    // Adds the listener for the change event.
    mql.addEventListener("change", onChange)
    
    // Sets the initial state on the first client-side render.
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    
    // Cleanup function: removes the listener when the component unmounts.
    return () => mql.removeEventListener("change", onChange)
  }, []) // The empty dependency array ensures the effect runs only once.

  return !!isMobile
}
