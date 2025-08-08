// Define que este código deve ser executado no cliente.
"use client";

// Importa hooks do React.
import { useState, useEffect, useCallback } from "react";

/**
 * Um hook personalizado que funciona como `useState`, mas persiste o valor no `localStorage`.
 * Ele também sincroniza o estado entre abas/janelas abertas.
 * @param key A chave a ser usada no localStorage.
 * @param initialValue O valor inicial a ser usado se não houver nada no localStorage.
 * @returns Uma tupla contendo o valor armazenado e uma função para atualizá-lo.
 */
export default function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
  // O estado que armazena nosso valor.
  // A função passada para useState só é executada na primeira renderização.
  const [storedValue, setStoredValue] = useState<T>(() => {
    // Se estiver no servidor (SSR), retorna o valor inicial.
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      // Tenta obter o item do localStorage.
      const item = window.localStorage.getItem(key);
      // Retorna o item parseado ou o valor inicial se não existir.
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // Em caso de erro, loga e retorna o valor inicial.
      console.log(error);
      return initialValue;
    }
  });

  // Uma versão "envelopada" do `setValue` do useState que também persiste no localStorage.
  // useCallback é usado para memorizar a função e evitar recriações desnecessárias.
  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      // Permite que o valor seja uma função, como no `useState` original.
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Atualiza o estado.
      setStoredValue(valueToStore);
      // Salva no localStorage.
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
        // Dispara um evento personalizado para notificar outras abas.
        window.dispatchEvent(new Event("local-storage"));
      }
    } catch (error) {
      console.log(error);
    }
  }, [key, storedValue]);


  // Efeito para ouvir mudanças no localStorage vindas de outras abas.
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent | CustomEvent) => {
      // Se o evento é de 'storage', verifica se a chave é a que estamos observando.
      if ((e as StorageEvent).key && (e as StorageEvent).key !== key) {
        return;
      }
      
      try {
        // Atualiza o estado com o novo valor do localStorage.
        const item = window.localStorage.getItem(key);
        setStoredValue(item ? JSON.parse(item) : initialValue);
      } catch (error) {
        console.log(error);
      }
    };

    // Adiciona o listener para o evento 'storage' (outras abas).
    window.addEventListener("storage", handleStorageChange);
    // Adiciona o listener para nosso evento personalizado 'local-storage' (mesma aba).
    window.addEventListener("local-storage", handleStorageChange);

    // Função de limpeza: remove os listeners quando o componente é desmontado.
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("local-storage", handleStorageChange);
    };
  }, [key, initialValue]);


  return [storedValue, setValue];
}
