import * as React from "react"

// Define o ponto de quebra para a detecção de dispositivos móveis.
const MOBILE_BREAKPOINT = 768

/**
 * Um hook personalizado para detectar se o dispositivo do usuário é móvel.
 * Baseia-se na largura da janela do navegador.
 * @returns {boolean} `true` se a largura da janela for menor que o `MOBILE_BREAKPOINT`, `false` caso contrário.
 */
export function useIsMobile() {
  // O estado para armazenar se é móvel ou não. Começa como `undefined`
  // para evitar problemas de hidratação entre servidor e cliente.
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    // Cria uma Media Query List para observar a mudança no tamanho da tela.
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    // Função para ser chamada quando a condição da media query mudar.
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }

    // Adiciona o listener para o evento de mudança.
    mql.addEventListener("change", onChange)
    
    // Define o estado inicial na primeira renderização no cliente.
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    
    // Função de limpeza: remove o listener quando o componente é desmontado.
    return () => mql.removeEventListener("change", onChange)
  }, []) // O array de dependências vazio garante que o efeito rode apenas uma vez.

  return !!isMobile
}
