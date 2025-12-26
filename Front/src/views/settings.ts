// src/views/settings.ts
import { state, type Route } from "../store/appState";

//imgs
import bgPotatoes from '../assets/bg-login-potatoes.png';
import bgTomatoes from '../assets/bg-login-tomatoes.png';
import bgDefault from '../assets/bg-login.png';

// --- HTML ---
export function getSettingsHtml() {
    const user = state.user;
    // Fallback para evitar erro se user for null (embora o router proteja)
	const selectedGang = (user?.gang || 'potatoes') as 'potatoes' | 'tomatoes';

    // Ajuste de caminho para pasta public
	const backgrounds = {
        potatoes: bgPotatoes,
        tomatoes: bgTomatoes,
    };

	const bgSrc = backgrounds[selectedGang] || bgDefault;

    const settingsColor =
        selectedGang === "tomatoes"
            ? "text-red-500"
            : selectedGang === "potatoes"
            ? "text-yellow-500"
            : "text-cyan-500";

    // --- 2FA state ---
    const has2FA = user?.has2FA ?? false;

    const twoFAStatusText = has2FA
        ? "Autenticação em duas etapas está ativa."
        : "Autenticação em duas etapas está desativada.";

    return `
        <img
            src="${bgSrc}"
            alt="Background"
            class="fixed inset-0 w-full h-full object-cover -z-10 opacity-30"
        />

        <div class="min-h-screen p-6 flex flex-col items-center max-w-6xl mx-auto">

            <div class="w-full flex justify-between items-end mb-10 border-b border-white/10 pb-4">
                <h2 class="${settingsColor} text-5xl font-bold tracking-widest">
                    CONFIGURAÇÕES
                </h2>

                <button
                    id="btn-settings-back"
                    class="text-gray-400 hover:text-white font-bold cursor-pointer transition-colors"
                >
                    VOLTAR
                </button>
            </div>

            <div class="w-full grid grid-cols-1 gap-6">

                <div class="bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-xl p-6">
                    <h3 class="text-xl font-bold text-white mb-4">
                        Segurança 🔒
                    </h3>

                    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                        <div>
                            <p class="text-gray-300 font-medium">
                                Autenticação em duas etapas (2FA)
                            </p>
                            <p class="text-gray-400 text-sm">
                                ${twoFAStatusText}
                            </p>
                        </div>

                        <div class="flex flex-col gap-2 min-w-[160px]">

                            ${
                                has2FA
                                    ? `
                                        <button
                                            id="btn-settings-2fa-status"
                                            class="px-5 py-2 rounded-lg font-bold bg-green-600/20 text-green-400 cursor-default border border-green-500/30"
                                        >
                                            ✅ 2FA Ativo
                                        </button>

                                        <button
                                            id="btn-settings-2fa-disable"
                                            class="px-5 py-2 rounded-lg font-bold bg-red-600 hover:bg-red-500 text-white transition shadow-[0_0_10px_rgba(220,38,38,0.3)]"
                                        >
                                            Desativar 2FA
                                        </button>
                                    `
                                    : `
                                        <button
                                            id="btn-settings-2fa-enable"
                                            class="px-5 py-2 rounded-lg font-bold bg-cyan-600 hover:bg-cyan-500 text-white transition shadow-[0_0_10px_rgba(8,145,178,0.3)]"
                                        >
                                            Ativar 2FA
                                        </button>
                                    `
                            }

                        </div>

                    </div>
                </div>

            </div>
        </div>
    `;
}

// --- LÓGICA ---
export function setupSettingsEvents(navigate: (route: Route) => void) {
    
    // Voltar
    document.getElementById('btn-settings-back')?.addEventListener('click', () => {
        navigate('dashboard');
    });

    // Ativar 2FA
    document.getElementById('btn-settings-2fa-enable')?.addEventListener('click', () => {
        navigate('2fa');
    });

    // Desativar 2FA
    document.getElementById('btn-settings-2fa-disable')?.addEventListener('click', () => {
        navigate('2fa-disable');
    });
}