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
    aboutTitle: 'About Eternal Minds',
    aboutIntro: 'Eternal Minds is an interactive web application that allows users to chat with historical figures, powered by cutting-edge generative AI. Our mission is to make history more accessible, engaging, and personal.',
    ourVisionTitle: 'Our Vision',
    ourVisionText: 'We believe that the best way to learn about the past is to interact with it. Instead of just reading about historical figures in a textbook, Eternal Minds allows you to ask them questions directly. You can learn about their lives, their work, their perspectives, and the times they lived in, all through natural conversation.',
    howItWorksTitle: 'How It Works',
    howItWorksText1: 'This application is built using a modern technology stack to provide a seamless and responsive experience:',
    howItWorksTech1: 'For a fast and dynamic user interface.',
    howItWorksTech2: 'To power the intelligent and context-aware conversations with our historical figures.',
    howItWorksTech3: 'For a clean, modern, and accessible design.',
    howItWorksText2: 'When you send a message to a figure like Cleopatra or Leonardo da Vinci, our AI model, powered by Genkit, generates a response that emulates the personality, knowledge, and linguistic style of that specific historical person.',
    lastUpdated: 'Last Updated: August 14, 2024',
    privacyIntro: 'Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information when you use Eternal Minds.',
    infoWeCollectTitle: 'Information We Collect',
    infoWeCollectText1: "We do not collect any personal information from our users. All interactions and chat histories are stored directly on your device using your browser's local storage. We do not have access to your conversations.",
    chatDataTitle: 'Chat Data',
    chatDataText: "Your conversations with historical figures are saved in your browser's local storage to allow you to continue them later. This data is not transmitted to our servers.",
    analyticsTitle: 'Analytics',
    analyticsText: 'We use Google Analytics to collect anonymous usage data to help us understand how our site is being used and how we can improve it. This includes information like page views and session duration, but does not include any personal identifying information.',
    howWeUseInfoTitle: 'How We Use Information',
    howWeUseInfoText: 'Since we do not collect personal information, we do not use it for any purpose. The anonymous data collected by Google Analytics is used solely for improving our website and services.',
    thirdPartyServicesTitle: 'Third-Party Services',
    thirdPartyServicesText: "We use Google AdSense to display ads on our website. Google may use cookies to serve ads based on a user's prior visits to our website or other websites. You can opt out of personalized advertising by visiting Google's Ad Settings.",
    changesToPolicyTitle: 'Changes to This Policy',
    changesToPolicyText: 'We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.',
    contactUsTitle: 'Contact Us',
    contactUsText: 'If you have any questions about this Privacy Policy, please contact us at: lucaspaesbatista@yahoo.com.br',
    chat: 'Chat',
    connections: 'Connections',
    influencedBy: 'Influenced by',
    influenced: 'Influenced',
    noInfluencesFound: 'No direct influences found for this figure.',
    noInfluencedFound: 'This figure did not directly influence anyone in our records.',
    characters: 'Characters',
    events: 'Events',
    noEventsFound: 'No Events Found',
    checkBackLater: 'Check back later for new historical events.',
    chatWithTheEvent: 'Chat with the Event',
    whatWereTheCauses: 'What were the main causes?',
    whatWereTheConsequences: 'What were the main consequences?',
    participants: 'Participants',
    keyParticipants: 'Key Participants',
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
    aboutTitle: 'Sobre o Eternal Minds',
    aboutIntro: 'Eternal Minds é uma aplicação web interativa que permite aos usuários conversar com figuras históricas, impulsionada por inteligência artificial generativa de ponta. Nossa missão é tornar a história mais acessível, envolvente e pessoal.',
    ourVisionTitle: 'Nossa Visão',
    ourVisionText: 'Acreditamos que a melhor maneira de aprender sobre o passado é interagindo com ele. Em vez de apenas ler sobre figuras históricas em um livro didático, o Eternal Minds permite que você faça perguntas diretamente a elas. Você pode aprender sobre suas vidas, seus trabalhos, suas perspectivas e os tempos em que viveram, tudo através de uma conversa natural.',
    howItWorksTitle: 'Como Funciona',
    howItWorksText1: 'Esta aplicação é construída usando uma pilha de tecnologia moderna para fornecer uma experiência fluida e responsiva:',
    howItWorksTech1: 'Para uma interface de usuário rápida e dinâmica.',
    howItWorksTech2: 'Para potencializar as conversas inteligentes e contextuais com nossas figuras históricas.',
    howItWorksTech3: 'Para um design limpo, moderno e acessível.',
    howItWorksText2: 'Quando você envia uma mensagem para uma figura como Cleópatra ou Leonardo da Vinci, nosso modelo de IA, alimentado pelo Genkit, gera uma resposta que emula a personalidade, o conhecimento e o estilo linguístico daquela pessoa histórica específica.',
    lastUpdated: 'Última Atualização: 14 de Agosto de 2024',
    privacyIntro: 'Sua privacidade é importante para nós. Esta Política de Privacidade explica como coletamos, usamos e protegemos suas informações quando você usa o Eternal Minds.',
    infoWeCollectTitle: 'Informações que Coletamos',
    infoWeCollectText1: 'Não coletamos nenhuma informação pessoal de nossos usuários. Todas as interações e históricos de chat são armazenados diretamente no seu dispositivo usando o armazenamento local do seu navegador. Não temos acesso às suas conversas.',
    chatDataTitle: 'Dados do Chat',
    chatDataText: 'Suas conversas com figuras históricas são salvas no armazenamento local do seu navegador para permitir que você as continue mais tarde. Esses dados não são transmitidos para nossos servidores.',
    analyticsTitle: 'Analytics',
    analyticsText: 'Usamos o Google Analytics para coletar dados de uso anônimos para nos ajudar a entender como nosso site está sendo usado e como podemos melhorá-lo. Isso inclui informações como visualizações de página e duração da sessão, mas não inclui nenhuma informação de identificação pessoal.',
    howWeUseInfoTitle: 'Como Usamos as Informações',
    howWeUseInfoText: 'Como não coletamos informações pessoais, não as usamos para nenhum propósito. Os dados anônimos coletados pelo Google Analytics são usados exclusivamente para melhorar nosso site e serviços.',
    thirdPartyServicesTitle: 'Serviços de Terceiros',
    thirdPartyServicesText: 'Usamos o Google AdSense para exibir anúncios em nosso site. O Google pode usar cookies para veicular anúncios com base nas visitas anteriores de um usuário ao nosso site ou a outros sites. Você pode optar por não receber publicidade personalizada visitando as Configurações de anúncios do Google.',
    changesToPolicyTitle: 'Alterações a Esta Política',
    changesToPolicyText: 'Podemos atualizar esta Política de Privacidade de tempos em tempos. Notificaremos você sobre quaisquer alterações publicando a nova Política de Privacidade nesta página.',
    contactUsTitle: 'Entre em Contato',
    contactUsText: 'Se você tiver alguma dúvida sobre esta Política de Privacidade, entre em contato conosco em: lucaspaesbatista@yahoo.com.br',
    chat: 'Chat',
    connections: 'Conexões',
    influencedBy: 'Influenciado por',
    influenced: 'Influenciou',
    noInfluencesFound: 'Nenhuma influência direta encontrada para esta figura.',
    noInfluencedFound: 'Esta figura não influenciou diretamente ninguém em nossos registros.',
    characters: 'Personagens',
    events: 'Eventos',
    noEventsFound: 'Nenhum Evento Encontrado',
    checkBackLater: 'Volte mais tarde para novos eventos históricos.',
    chatWithTheEvent: 'Conversar com o Evento',
    whatWereTheCauses: 'Quais foram as principais causas?',
    whatWereTheConsequences: 'Quais foram as principais consequências?',
    participants: 'Participantes',
    keyParticipants: 'Principais Participantes',
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
