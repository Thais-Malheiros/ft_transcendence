import { Button } from "../components/Button";
import { state, type Route } from "../store/appState";

// imgs
import bgPotatoes from "../assets/bg-login-potatoes.png";
import bgTomatoes from "../assets/bg-login-tomatoes.png";

// --- CONFIGURAÇÃO VISUAL ---
const backgroundByGang = {
    potatoes: bgPotatoes,
    tomatoes: bgTomatoes,
};

export async function getMultiplayerHtml() {
    const userGang = state.user?.gang || 'potatoes';
    const isPotato = userGang === 'potatoes';

    // Estilos dinâmicos
    const headerColor = isPotato ? 'text-yellow-500' : 'text-red-500';
    const titleDropShadow = isPotato 
        ? 'drop-shadow-[0_0_15px_rgba(234,179,8,0.5)]' 
        : 'drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]';
    const backgroundImage = backgroundByGang[userGang];

    return `
        <!-- Background -->
        <img src="${backgroundImage}" alt="Background" 
             class="fixed inset-0 w-full h-full object-cover -z-10 opacity-30" />

        <!-- Container principal -->
        <div id="multiplayer-view-root" class="min-h-screen p-4 md:p-6 flex flex-col items-center w-full max-w-7xl mx-auto">

            <!-- Topo da tela -->
            <div class="w-full flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-6 md:mb-8 border-b border-white/10 pb-4">
                <h2 class="${headerColor} text-4xl md:text-5xl font-bold tracking-widest ${titleDropShadow}">
                    MULTIPLAYER
                </h2>
                <div class="self-end sm:self-auto">
                    ${Button({
                        id: "btn-multiplayer-back",
                        text: "← VOLTAR",
                        variant: "ghost",
                        className: "w-auto min-w-[120px] max-w-[200px]",
                    })}
                </div>
            </div>

            <!-- Aqui começa o layout das colunas (Rankeada / Casual) -->
            <div class="w-full flex flex-col lg:flex-row gap-4 md:gap-6 lg:gap-8 h-auto lg:h-[calc(100vh-200px)]">
                <!-- Colunas vão aqui -->
            </div>

        </div>
    `;
}

export function setupMultiplayerEvents(navigate: (route: Route) => void) {

    // 1. Navegação Voltar
    document.getElementById('btn-multiplayer-back')?.addEventListener('click', () => {
        navigate('dashboard');
    });
}
