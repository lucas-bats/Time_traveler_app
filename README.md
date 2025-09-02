# Eternal Minds

Eternal Minds is an interactive web application that allows users to chat with historical figures and pivotal historical events, powered by generative AI. Choose a personality from a curated list, or engage with an event to hear the perspectives of its key participants. Start a conversation to learn about history in a new and interactive way.

This project was built using Firebase Studio.


## Tech Stack

This project is built with a modern, robust, and scalable technology stack:

-   **Framework**: [Next.js](https://nextjs.org/) - A React framework for building full-stack web applications.
-   **Language**: [TypeScript](https://www.typescriptlang.org/) - A statically typed superset of JavaScript that adds type safety.
-   **AI Integration**: [Genkit](https://firebase.google.com/docs/genkit) - An open-source framework from Google to build, deploy, and monitor production-ready AI-powered features.
-   **UI Components**: [ShadCN/UI](https://ui.shadcn.com/) - A collection of re-usable components built on top of Radix UI and Tailwind CSS.
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework for rapid UI development.

## Getting Started

Access the app: https://eternalminds.fun

To get the development environment running, follow these steps:

### Prerequisites

-   Node.js (v20 or higher recommended)
-   npm or another package manager

### Installation

1.  Clone the repository:
    ```bash
    git clone <your-repository-url>
    ```
2.  Navigate to the project directory:
    ```bash
    cd <project-directory>
    ```
3.  Install the dependencies:
    ```bash
    npm install
    ```

### Running the Development Server

Once the dependencies are installed, you can start the development server:

```bash
npm run dev
```

This will start the Next.js application on `http://localhost:9002`.

## Project Structure

-   `src/app/`: Contains the main pages and layouts of the application, following the Next.js App Router structure.
-   `src/components/`: Home to the React components used throughout the application.
    -   `src/components/ui/`: Contains the ShadCN UI components.
-   `src/lib/`: Includes helper functions, data definitions (for characters, events, and their connections), and localization logic.
-   `src/ai/`: Holds the Genkit flows and AI-related logic for both character and event chats.
-   `public/`: Static assets like images and fonts.
