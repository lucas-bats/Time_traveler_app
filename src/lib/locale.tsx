// Define que este é um "Client Component".
"use client";

// Importa hooks e tipos do React.
import React, { createContext, useContext, useState, useEffect } from 'react';
// Importa o hook personalizado para interagir com o localStorage.
import useLocalStorage from '@/hooks/use-local-storage';

// Define os tipos de locale (idiomas) suportados.
type Locale = 'en' | 'pt';

// Objeto que contém todas as strings de tradução para cada idioma.
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
    supportTheProject: 'Support the Project',
    supportTheProjectDescription: 'If you enjoy this application, consider making a donation to help cover the maintenance and development costs. Any amount is appreciated!',
    donateWithPix: 'Donate with PIX',
    scanQrCode: 'Scan the QR code with your banking app',
    orCopyKey: 'Or copy the key below',
    pixKeyCopied: 'The PIX key has been copied!',
    orDonateWith: 'Or donate with',
    donateWithPaypal: 'Donate with PayPal',
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
    supportTheProject: 'Apoie o Projeto',
    supportTheProjectDescription: 'Se você gostou desta aplicação, considere fazer uma doação para ajudar a cobrir os custos de manutenção e desenvolvimento. Qualquer valor é bem-vindo!',
    donateWithPix: 'Doe com PIX',
    scanQrCode: 'Escaneie o QR code com seu aplicativo do banco',
    orCopyKey: 'Ou copie a chave abaixo',
    pixKeyCopied: 'A chave PIX foi copiada!',
    orDonateWith: 'Ou doe com',
    donateWithPaypal: 'Doar com PayPal',
  }
};

// Define o tipo para o valor do contexto de localização.
type LocaleContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: typeof translations.en; // 't' terá a forma de um dos objetos de tradução.
};

// Cria o contexto de localização.
const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

/**
 * Provedor de Contexto para Localização.
 * Envolve a aplicação e fornece o estado do idioma e as funções de tradução
 * para todos os componentes filhos.
 */
export const LocaleProvider = ({ children }: { children: React.ReactNode }) => {
  // Usa o hook de localStorage para persistir a seleção de idioma.
  const [storedLocale, setStoredLocale] = useLocalStorage<Locale>('locale', 'en');
  // Estado para saber se o componente está sendo renderizado no cliente.
  const [isClient, setIsClient] = useState(false);

  // Garante que o código a seguir execute apenas no cliente.
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Determina o locale a ser usado, evitando problemas de hidratação.
  const locale = isClient ? storedLocale : 'en';
  
  // Função para atualizar o idioma.
  const handleSetLocale = (newLocale: Locale) => {
    setStoredLocale(newLocale);
  };
  
  // Seleciona o objeto de tradução correto com base no locale atual.
  const t = translations[locale];

  // O valor que será fornecido pelo contexto.
  const value = { locale: storedLocale, setLocale: handleSetLocale, t };

  // Na renderização do servidor (SSR), renderiza um provedor com valores padrão
  // para evitar o erro de "hydration mismatch".
  if (!isClient) {
    const defaultT = translations['en'];
    return (
      <LocaleContext.Provider value={{ locale: 'en', setLocale: () => {}, t: defaultT }}>
        {children}
      </LocaleContext.Provider>
    );
  }

  // No cliente, renderiza o provedor com o valor correto.
  return (
    <LocaleContext.Provider value={value}>
      {children}
    </LocaleContext.Provider>
  );
};

/**
 * Hook personalizado para consumir o contexto de localização.
 * Facilita o acesso ao idioma atual e às traduções nos componentes.
 */
export const useLocale = () => {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
};
