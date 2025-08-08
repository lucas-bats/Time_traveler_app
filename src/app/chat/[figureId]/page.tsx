// Define que este componente é um "Client Component", ou seja, executa no navegador.
"use client";

// Importa o hook useParams do Next.js para acessar parâmetros da rota.
import { useParams } from "next/navigation";
// Importa o componente do cabeçalho do site.
import { SiteHeader } from "@/components/site-header";
// Importa o componente principal do cliente de chat.
import { ChatClient } from "@/components/chat-client";

/**
 * Componente de página para a tela de chat.
 * Ele é responsável por renderizar a interface de conversa para uma figura histórica específica.
 */
export default function ChatPage() {
  // Usa o hook useParams para obter os parâmetros da URL.
  const params = useParams();
  
  // Extrai o 'figureId' dos parâmetros. Como pode ser uma string ou um array de strings,
  // garantimos que seja sempre uma única string.
  const figureId = Array.isArray(params.figureId) ? params.figureId[0] : params.figureId;

  return (
    // Estrutura principal da página de chat, que ocupa toda a altura da tela.
    <div className="flex flex-col h-screen h-dvh">
      {/* Renderiza o cabeçalho do site. */}
      <SiteHeader />
      
      {/* Verifica se o figureId foi obtido da URL. */}
      {figureId ? (
        // Se houver um figureId, renderiza o componente de chat, passando o ID.
        <div className="flex-1 flex flex-col min-h-0">
          <ChatClient figureId={figureId} />
        </div>
      ) : (
        // Se não houver figureId, mostra uma mensagem de carregamento.
        <div className="flex-1 flex items-center justify-center">
            <p>Loading character...</p>
        </div>
      )}
    </div>
  );
}
