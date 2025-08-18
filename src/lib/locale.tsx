// Defines this as a "Client Component".
"use client";

// Imports React hooks and types.
import React, { createContext, useContext, useState, useEffect } from 'react';
// Imports the custom hook for interacting with localStorage.
import useLocalStorage from '@/hooks/use-local-storage';

// Defines the supported locale types.
type Locale = 'en' | 'pt';

// Object containing all translation strings for each language.
const translations = {
  en: {
    title: 'Eternal Minds',
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
    supportTheProject: 'Support the Project',
    supportTheProjectDescription: 'If you enjoy this application, consider making a donation to help cover the maintenance and development costs. Any amount is appreciated!',
    donateWithPix: 'Donate with PIX',
    scanQrCode: 'Scan the QR code with your banking app',
    orCopyKey: 'Or copy the key below',
    pixKeyCopied: 'The PIX key has been copied!',
    orDonateWith: 'Or donate with',
    donateWithPaypal: 'Donate with PayPal',
    about: 'About',
    privacyPolicy: 'Privacy Policy',
  },
  pt: {
    title: 'Eternal Minds',
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
    supportTheProject: 'Apoie o Projeto',
    supportTheProjectDescription: 'Se você gostou desta aplicação, considere fazer uma doação para ajudar a cobrir os custos de manutenção e desenvolvimento. Qualquer valor é bem-vindo!',
    donateWithPix: 'Doe com PIX',
    scanQrCode: 'Escaneie o QR code com seu aplicativo do banco',
    orCopyKey: 'Ou copie a chave abaixo',
    pixKeyCopied: 'A chave PIX foi copiada!',
    orDonateWith: 'Ou doe com',
    donateWithPaypal: 'Doar com PayPal',
    about: 'Sobre',
    privacyPolicy: 'Política de Privacidade',
  }
};

// Defines the type for the localization context value.
type LocaleContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: typeof translations.en; // 't' will have the shape of one of the translation objects.
};

// Creates the localization context.
const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

/**
 * Context Provider for Localization.
 * Wraps the application and provides the language state and translation functions
 * to all child components.
 */
export const LocaleProvider = ({ children }: { children: React.ReactNode }) => {
  // Uses the localStorage hook to persist the language selection.
  const [storedLocale, setStoredLocale] = useLocalStorage<Locale>('locale', 'en');
  // State to know if the component is being rendered on the client.
  const [isClient, setIsClient] = useState(false);

  // Ensures the following code only runs on the client.
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Determines the locale to be used, avoiding hydration issues.
  const locale = isClient ? storedLocale : 'en';
  
  // Function to update the language.
  const handleSetLocale = (newLocale: Locale) => {
    setStoredLocale(newLocale);
  };
  
  // Selects the correct translation object based on the current locale.
  const t = translations[locale];

  // The value that will be provided by the context.
  const value = { locale: storedLocale, setLocale: handleSetLocale, t };

  // On server-side rendering (SSR), renders a provider with default values
  // to avoid a "hydration mismatch" error.
  if (!isClient) {
    const defaultT = translations['en'];
    return (
      <LocaleContext.Provider value={{ locale: 'en', setLocale: () => {}, t: defaultT }}>
        {children}
      </LocaleContext.Provider>
    );
  }

  // On the client, render the provider with the correct value.
  return (
    <LocaleContext.Provider value={value}>
      {children}
    </LocaleContext.Provider>
  );
};

/**
 * Custom hook to consume the localization context.
 * Facilitates access to the current language and translations in components.
 */
export const useLocale = () => {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
};
