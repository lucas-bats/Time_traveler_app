# Time Traveler Talks

Bem-vindo ao **Time Traveler Talks**, uma aplicação web interativa que permite conversar com figuras históricas icônicas, tudo isso com o poder da Inteligência Artificial generativa.

## Visão Geral

Este projeto é uma aplicação full-stack construída com Next.js, projetada para ser uma experiência de chat imersiva e educativa. Os usuários podem selecionar um personagem de uma lista, filtrar por época ou área de atuação, e iniciar uma conversa. A IA assume a personalidade da figura histórica, respondendo às perguntas do usuário com o tom, vocabulário e contexto da época.

## Stack de Tecnologias

- **Framework:** [Next.js](https://nextjs.org/) (com App Router)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **UI:** [React](https://reactjs.org/)
- **Componentes de UI:** [ShadCN/UI](https://ui.shadcn.com/)
- **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
- **Inteligência Artificial:** [Genkit (Google AI)](https://firebase.google.com/docs/genkit)
- **Internacionalização (i18n):** Contexto React para inglês e português.

## Como Executar o Projeto

Para rodar este projeto localmente, siga os passos abaixo:

1. **Instale as dependências:**
   ```bash
   npm install
   ```

2. **Configure suas variáveis de ambiente:**
   - Crie um arquivo chamado `.env` na raiz do projeto.
   - Adicione sua chave de API do Gemini:
     ```
     GEMINI_API_KEY=SUA_CHAVE_DE_API_AQUI
     ```

3. **Inicie o servidor de desenvolvimento do Genkit:**
   - Este comando inicia a API local que serve os modelos de IA.
   ```bash
   npm run genkit:dev
   ```

4. **Inicie o servidor de desenvolvimento do Next.js:**
   - Em um **novo terminal**, inicie a aplicação front-end.
   ```bash
   npm run dev
   ```

5. **Abra no seu navegador:**
   - Acesse [http://localhost:9002](http://localhost:9002) para ver a aplicação.

## Estrutura do Projeto

- **/src/app/**: Contém as páginas e layouts principais da aplicação, seguindo o App Router do Next.js.
- **/src/components/**: Abriga os componentes React reutilizáveis.
  - **/src/components/ui/**: Componentes de UI da biblioteca ShadCN.
- **/src/ai/**: Responsável por toda a lógica de Inteligência Artificial.
  - **/src/ai/flows/**: Onde os fluxos do Genkit são definidos (ex: a lógica de chat).
- **/src/lib/**: Funções de utilidade, dados de personagens e a lógica de internacionalização (i18n).
- **/src/hooks/**: Hooks personalizados do React para funcionalidades como `useLocalStorage`.
