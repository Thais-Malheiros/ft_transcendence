import { DashboardItem } from "@/components/DashboardItem";

export function getDashboardHtml() {
  return `
		<img src="src/assets/bg-login.png" alt="Background" class="fixed inset-0 w-full h-full object-cover -z-10 opacity-30" />

		<div class="min-h-screen p-6 flex flex-col items-center max-w-6xl mx-auto">

			<div class="w-full flex justify-between items-end mb-10 border-b border-white/10 pb-4">
				<h2 class="text-cyan-500 text-5xl font-bold tracking-widest drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]">
					DASHBOARD
				</h2>
				<button id="btn-dashboard-logout" class="text-red-500 hover:text-red-400 hover:underline transition font-bold cursor-pointer">
					SAIR
				</button>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">

				${DashboardItem({
					id: "btn-dashboard-multiplayer",
					title: "Multiplayer",
					subtitle: "Jogar Online",
					icon: "⚔️",
					colorTheme: "purple"
				})}

				${DashboardItem({
					id: "btn-dashboard-solo",
					title: "Solo / IA",
					subtitle: "Treinar Habilidades",
					icon: "🤖",
					colorTheme: "indigo"
				})}

				${DashboardItem({
					id: "btn-dashboard-champ",
					title: "Campeonatos",
					subtitle: "Suba no Ranking",
					icon: "🏆",
					colorTheme: "green"
				})}

				${DashboardItem({
					id: "btn-dashboard-friends",
					title: "Amigos",
					subtitle: "Gerenciar Lista",
					icon: "👥",
					colorTheme: "blue"
				})}

				${DashboardItem({
					id: "btn-dashboard-profile",
					title: "Perfil",
					subtitle: "Estatísticas",
					icon: "📊",
					colorTheme: "gray"
				})}

				${DashboardItem({
					id: "btn-dashboard-config",
					title: "Configurações",
					subtitle: "Ajustes do Sistema",
					icon: "⚙️",
					colorTheme: "yellow"
				})}

			</div>
		</div>
  `;
}
