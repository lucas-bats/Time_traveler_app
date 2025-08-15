// Imports the 'clsx' and 'tailwind-merge' libraries.
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * A utility function to build class names conditionally and safely.
 * It combines the functionalities of `clsx` and `tailwind-merge`.
 * - `clsx`: Allows building class strings from objects and arrays.
 * - `tailwind-merge`: Intelligently resolves conflicts in Tailwind CSS classes.
 *
 * @param {...ClassValue[]} inputs - A sequence of classes, objects, or arrays.
 * @returns {string} A final string with merged and conflict-free classes.
 *
 * @example
 * cn("p-4", "font-bold", { "bg-red-500": isError });
 * // If isError is false, returns: "p-4 font-bold"
 * // If isError is true, returns: "p-4 font-bold bg-red-500"
 *
 * @example
 * cn("p-4", "p-2");
 * // Returns: "p-2" (tailwind-merge resolves the conflict, keeping the last one).
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
