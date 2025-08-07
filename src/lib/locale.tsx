
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
    thinking: 'Thinking...',
    clearChat: 'Clear chat',
    areYouSure: 'Are you sure?',
    clearChatConfirmation: 'This will permanently delete the chat history. This action cannot be undone.',
    cancel: 'Cancel',
    clear: 'Clear',
    surpriseMe: 'Surprise Me',
    surpriseMeDescription: 'Click to chat with a random historical figure.',
    tellMeAboutYourLife: 'Tell me about your life',
    tellMeAboutYourWork: 'Tell me about your work',
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
    thinking: 'Pensando...',
    clearChat: 'Limpar conversa',
    areYouSure: 'Você tem certeza?',
    clearChatConfirmation: 'Isso excluirá permanentemente o histórico do chat. Esta ação não pode ser desfeita.',
    cancel: 'Cancelar',
    clear: 'Limpar',
    surpriseMe: 'Surpreenda-me',
    surpriseMeDescription: 'Clique para conversar com uma figura histórica aleatória.',
    tellMeAboutYourLife: 'Conte-me sobre sua vida',
    tellMeAboutYourWork: 'Conte-me sobre sua obra',
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
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const locale = isClient ? storedLocale : 'en';
  
  const handleSetLocale = (newLocale: Locale) => {
    setStoredLocale(newLocale);
  };
  
  const t = translations[locale];

  const value = { locale: storedLocale, setLocale: handleSetLocale, t };

  if (!isClient) {
    // Render a placeholder or nothing on the server to avoid mismatch
    // Or render with default locale
    const defaultT = translations['en'];
    return (
      <LocaleContext.Provider value={{ locale: 'en', setLocale: () => {}, t: defaultT }}>
        {children}
      </LocaleContext.Provider>
    );
  }

  return (
    <LocaleContext.Provider value={value}>
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
