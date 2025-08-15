// Defines that this code should run on the client.
"use client";

// Imports React hooks.
import { useState, useEffect, useCallback } from "react";

/**
 * A custom hook that works like `useState`, but persists the value in `localStorage`.
 * It also synchronizes the state between open tabs/windows.
 * @param key The key to be used in localStorage.
 * @param initialValue The initial value to be used if nothing is in localStorage.
 * @returns A tuple containing the stored value and a function to update it.
 */
export default function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
  // The state that stores our value.
  // The function passed to useState is only executed on the first render.
  const [storedValue, setStoredValue] = useState<T>(() => {
    // If on the server (SSR), return the initial value.
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      // Try to get the item from localStorage.
      const item = window.localStorage.getItem(key);
      // Return the parsed item or the initial value if it doesn't exist.
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // In case of an error, log it and return the initial value.
      console.log(error);
      return initialValue;
    }
  });

  // A "wrapped" version of `setValue` from useState that also persists to localStorage.
  // useCallback is used to memoize the function and avoid unnecessary re-creations.
  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      // Allows the value to be a function, just like in the original `useState`.
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Update the state.
      setStoredValue(valueToStore);
      // Save to localStorage.
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
        // Dispatch a custom event to notify other tabs.
        window.dispatchEvent(new Event("local-storage"));
      }
    } catch (error) {
      console.log(error);
    }
  }, [key, storedValue]);


  // Effect to listen for changes in localStorage from other tabs.
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent | CustomEvent) => {
      // If the event is from 'storage', check if the key is the one we are observing.
      if ((e as StorageEvent).key && (e as StorageEvent).key !== key) {
        return;
      }
      
      try {
        // Update the state with the new value from localStorage.
        const item = window.localStorage.getItem(key);
        setStoredValue(item ? JSON.parse(item) : initialValue);
      } catch (error) {
        console.log(error);
      }
    };

    // Add listener for the 'storage' event (other tabs).
    window.addEventListener("storage", handleStorageChange);
    // Add listener for our custom 'local-storage' event (same tab).
    window.addEventListener("local-storage", handleStorageChange);

    // Cleanup function: remove listeners when the component unmounts.
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("local-storage", handleStorageChange);
    };
  }, [key, initialValue]);


  return [storedValue, setValue];
}
