import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Input } from "@/components/Input";
import { state } from "@/main";

const StatItem = (label: string, valueId: string, colorClass: string = "text-white") => `
	<div class="bg-black/30 p-4 rounded-xl border border-white/5 text-center hover:border-white/10 transition">
		<p class="text-xs text-gray-500 uppercase tracking-widest mb-1">${label}</p>
		<p id="${valueId}" class="text-2xl font-bold ${colorClass}">-</p>
	</div>
`;

export function getProfileHtml() {
	const selectedGang = state.user?.gang;
	const bgSrc = selectedGang ? `src/assets/bg-login-${selectedGang}.png` : "src/assets/bg-login.png";
	const headerColor = selectedGang === "tomatoes" ? "text-red-500" : selectedGang === "potatoes" ? "text-yellow-500" : "text-cyan-500";

	const nick = state.user ? state.user.nick : "Visitante";
	const avatarSrc = selectedGang === "potatoes" ? "src/assets/perfil-batata.png" : "src/assets/perfil-tomate.png";
	const avatarBorder = selectedGang === "potatoes" ? "border-yellow-500" : selectedGang === "tomatoes" ? "border-red-500" : "border-cyan-500";

	return `
		<img id="bg-image" src="${bgSrc}" alt="Background" class="fixed inset-0 w-full h-full object-cover -z-10 opacity-30" />

		<div class="min-h-screen p-4 md:p-6 flex flex-col items-center w-full max-w-5xl mx-auto">
	<div class="w-full flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-6 md:mb-8 border-b border-white/10 pb-4">
		<h2 class="${headerColor} text-2xl sm:text-3xl md:text-4xl font-bold tracking-widest drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]">
			CONFIGURAÇÕES DO PERFIL
		</h2>
		<div class="self-end sm:self-auto">
			${Button({
				id: "btn-profile-back",
				text: "← VOLTAR",
				variant: "ghost",
				className: "w-auto min-w-[120px] max-w-[200px]",
			})}
		</div>
	</div>

	${Card({
		className: "max-w-5xl w-full",
		children: `
			<div class="flex flex-col md:flex-row gap-10">
				<div class="flex flex-col items-center gap-4 min-w-[200px]">
					<div class="relative w-48 h-48 rounded-full overflow-hidden border-4 ${avatarBorder} shadow-[0_0_30px_rgba(6,182,212,0.2)] bg-black group cursor-pointer">
						<img id="profile-img" src="${avatarSrc}" class="w-full h-full object-cover transition duration-500 group-hover:scale-110" />
						<div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition duration-300">
							<span class="text-sm font-bold text-white uppercase tracking-wider">Trocar Foto</span>
						</div>
						<input type="file" id="upload-avatar" class="hidden" accept="image/*">
					</div>
					<p class="text-gray-400 text-sm bg-slate-800 px-3 py-1 rounded-full">Ranking Global: <span class="text-cyan-400 font-bold">#42</span></p>
				</div>

				<div class="flex-1 w-full flex flex-col justify-between">
					<div>
						<label class="block text-sm text-gray-400 mb-2 ml-1">Nome de Exibição</label>
						${Input({ id: "input-profile-name",
							value: `${nick}`,
							className: "mb-8 bg-slate-800/50 border-white/10 focus:bg-black/60"
						})}

						<h3 class="text-lg text-white mb-4 font-bold flex items-center gap-2">
							<span class="w-2 h-8 bg-purple-500 rounded-full inline-block"></span>
							Estatísticas da Temporada
						</h3>

						<div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
							${StatItem("Jogos", "stat-games")}
							${StatItem("Vitórias", "stat-wins", "text-green-400")}
							${StatItem("Derrotas", "stat-losses", "text-red-400")}
							${StatItem("Win Rate", "stat-wr", "text-cyan-400")}
						</div>
					</div>

					<div class="mt-8 flex justify-end">
						${Button({ id: "btn-profile-save", text: "Salvar Alterações", variant: "primary", className: "w-full md:w-auto md:px-12" })}
					</div>
				</div>
			</div>
		`
	})}
</div>
	`;
}
