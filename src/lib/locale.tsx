"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import useLocalStorage from '@/hooks/use-local-storage';

type Locale = 'en' | 'pt';

const translations = {
  en: {
    title: 'Time Traveler Talks',
    subtitle: 'Engage in enlightening conversations with iconic figures from the past. Who will you talk to first?',
    allRightsReserved: 'All rights reserved',
    searchPlaceholder: 'Search for a figure...',
    filterByEra: 'Filter by Era',
    allEras: 'All Eras',
    filterByField: 'Filter by Field',
    allFields: 'All Fields',
    noFiguresFound: 'No Figures Found',
    adjustFilters: 'Try adjusting your search or filters.',
    startConversation: 'Start Conversation',
    chatWith: 'Chat with',
    portraitOf: 'Portrait of',
    home: 'Home',
    favoriteMessages: 'Favorite Messages',
    yourFavoriteMessages: 'Your favorite messages will appear here.',
    clickStarToSave: 'Click the star on a message to save it.',
    ask: 'Ask',
    aQuestion: 'a question...',
    error: 'Error',
    somethingWentWrong: 'Something went wrong.',
    copiedToClipboard: 'Copied to clipboard!',
    messageCopied: 'The message has been copied.',
  },
  pt: {
    title: 'Conversas com Viajantes do Tempo',
    subtitle: 'Participe de conversas esclarecedoras com figuras icônicas do passado. Com quem você vai falar primeiro?',
    allRightsReserved: 'Todos os direitos reservados',
    searchPlaceholder: 'Procure por uma figura...',
    filterByEra: 'Filtrar por Época',
    allEras: 'Todas as Épocas',
    filterByField: 'Filtrar por Área',
    allFields: 'Todas as Áreas',
    noFiguresFound: 'Nenhuma Figura Encontrada',
    adjustFilters: 'Tente ajustar sua busca ou filtros.',
    startConversation: 'Começar Conversa',
    chatWith: 'Conversar com',
    portraitOf: 'Retrato de',
    home: 'Início',
    favoriteMessages: 'Mensagens Favoritas',
    yourFavoriteMessages: 'Suas mensagens favoritas aparecerão aqui.',
    clickStarToSave: 'Clique na estrela em uma mensagem para salvá-la.',
    ask: 'Faça uma pergunta para',
    aQuestion: '...',
    error: 'Erro',
    somethingWentWrong: 'Algo deu errado.',
    copiedToClipboard: 'Copiado para a área de transferência!',
    messageCopied: 'A mensagem foi copiada.',
  }
};

type LocaleContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: typeof translations.en;
};

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export const LocaleProvider = ({ children }: { children: React.ReactNode }) => {
  const [storedLocale, setStoredLocale] = useLocalStorage<Locale>('locale', 'en');
  const [locale, setLocale] = useState<Locale>(storedLocale);

  useEffect(() => {
    setLocale(storedLocale);
  }, [storedLocale]);
  
  const handleSetLocale = (newLocale: Locale) => {
    setStoredLocale(newLocale);
    setLocale(newLocale);
  };
  
  const t = translations[locale];

  return (
    <LocaleContext.Provider value={{ locale, setLocale: handleSetLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
};

export const useLocale = () => {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
};
