// Importa as bibliotecas 'clsx' e 'tailwind-merge'.
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Uma função de utilidade para construir nomes de classes de forma condicional e segura.
 * Ela combina as funcionalidades de `clsx` e `tailwind-merge`.
 * - `clsx`: Permite construir strings de classes a partir de objetos e arrays.
 * - `tailwind-merge`: Resolve conflitos de classes do Tailwind CSS de forma inteligente.
 *
 * @param {...ClassValue[]} inputs - Uma sequência de classes, objetos ou arrays.
 * @returns {string} Uma string final com as classes mescladas e sem conflitos.
 *
 * @example
 * cn("p-4", "font-bold", { "bg-red-500": isError });
 * // Se isError for false, retorna: "p-4 font-bold"
 * // Se isError for true, retorna: "p-4 font-bold bg-red-500"
 *
 * @example
 * cn("p-4", "p-2");
 * // Retorna: "p-2" (tailwind-merge resolve o conflito, mantendo a última).
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
