import { Button } from "@/components/Button";
import { Input } from "@/components/Input";

// Interface para tipagem
interface Friend {
	id: number;
	name: string;
	avatar: string;
	isOnline: boolean;
}

interface FriendRequest {
	id: number;
	name: string;
	avatar: string;
}

// Mock de dados
const mockFriends: Friend[] = [
	{ id: 1, name: "Batata_Assassina", avatar: "src/assets/perfil-inexistente.png", isOnline: true },
	{ id: 2, name: "Tomate_Guerreiro", avatar: "src/assets/perfil-tomate.png", isOnline: false },
	{ id: 3, name: "Tomate_Guerreiro", avatar: "src/assets/perfil-tomate.png", isOnline: false },
	{ id: 4, name: "Tomate_Guerreiro", avatar: "src/assets/perfil-tomate.png", isOnline: false },
	{ id: 5, name: "Tomate_Guerreiro", avatar: "src/assets/perfil-tomate.png", isOnline: false },
	{ id: 6, name: "Tomate_Guerreiro", avatar: "src/assets/perfil-tomate.png", isOnline: false },
	{ id: 7, name: "Tomate_Guerreiro", avatar: "src/assets/perfil-tomate.png", isOnline: false },
	{ id: 8, name: "Tomate_Guerreiro", avatar: "src/assets/perfil-tomate.png", isOnline: false },
	{ id: 9, name: "Tomate_Guerreiro", avatar: "src/assets/perfil-tomate.png", isOnline: false },
	{ id: 10, name: "Tomate_Guerreiro", avatar: "src/assets/perfil-tomate.png", isOnline: false },
	{ id: 11, name: "Tomate_Guerreiro", avatar: "src/assets/perfil-tomate.png", isOnline: false },
	{ id: 12, name: "Tomate_Guerreiro", avatar: "src/assets/perfil-tomate.png", isOnline: false },
	{ id: 13, name: "Tomate_Guerreiro", avatar: "src/assets/perfil-tomate.png", isOnline: false },
	{ id: 14, name: "Tomate_Guerreiro", avatar: "src/assets/perfil-tomate.png", isOnline: false },
	{ id: 15, name: "Mr_Chips", avatar: "src/assets/perfil-batata.png", isOnline: true },
];

const mockRequests: FriendRequest[] = [
	{ id: 102, name: "Dr_Brocolis_O_Destruidor_De_Mundos", avatar: "src/assets/avatar-broc.png" },
	{ id: 101, name: "Cebola_Chorona", avatar: "src/assets/avatar-onion.png" },
	{ id: 105, name: "Capim_maluco", avatar: "src/assets/avatar-broc.png" },
	{ id: 106, name: "Maca_doida", avatar: "src/assets/avatar-broc.png" },
	{ id: 107, name: "jogador_lol", avatar: "src/assets/avatar-broc.png" },
	{ id: 108, name: "amor_alucinante", avatar: "src/assets/avatar-broc.png" },
];

function formatName(name: string): string {
	if (name.length <= 20) return name;
	return name.substring(0, 20) + '...';
}

function renderRequestItem(request: FriendRequest): string {
	const displayName = formatName(request.name);

	const iconCheck = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
	const iconX = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;

	return `
		<div class="flex items-center justify-between p-3 bg-black/20 rounded-lg border border-white/5 mb-2 w-full">
			<div class="flex items-center gap-3 min-w-0 overflow-hidden mr-2">
				<div class="w-8 h-8 shrink-0 rounded-full bg-slate-700 overflow-hidden border border-white/10">
					<img src="${request.avatar}" alt="${request.name}" class="w-full h-full object-cover" onerror="this.src='https://ui-avatars.com/api/?name=${request.name}&background=random'"/>
				</div>
				<span class="text-sm md:text-xs lg:text-sm text-gray-200 font-bold whitespace-nowrap" title="${request.name}">
					${displayName}
				</span>
			</div>

			<div class="flex gap-1 shrink-0">
				${Button({
					text: iconCheck,
					variant: "ghost",
					isIcon: true,
					className: "btn-friends-accept bg-green-500/10 text-green-500 hover:bg-green-500 hover:text-white",
					extraAttributes: `data-request-id="${request.id}" title="Aceitar"`
				})}

				${Button({
					text: iconX,
					variant: "ghost",
					isIcon: true,
					className: "btn-friends-deny bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white",
					extraAttributes: `data-request-id="${request.id}" title="Recusar"`
				})}
			</div>
		</div>
	`;
}

function renderFriendItem(friend: Friend): string {
	const statusColor = friend.isOnline ? "bg-green-500 shadow-[0_0_10px_#22c55e]" : "bg-gray-500";
	const statusText = friend.isOnline ? "Online" : "Offline";

	const iconTrash = `
		<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
			<path d="M3 6h18"></path>
			<path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
			<path d="M8 6V4c0-1 1-1 1-1h6c1 0 1 1 1 1v2"></path>
			<line x1="10" y1="11" x2="10" y2="17"></line>
			<line x1="14" y1="11" x2="14" y2="17"></line>
		</svg>
	`;

	return `
		<div class="group flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 hover:border-cyan-500/30 transition-all duration-300 mb-3 backdrop-blur-sm">
			<div class="flex items-center gap-4">
				<div class="relative">
					<div class="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center overflow-hidden border-2 border-white/10">
						<img src="${friend.avatar}" alt="${friend.name}" class="w-full h-full object-cover" onerror="this.src='https://ui-avatars.com/api/?name=${friend.name}&background=random'"/>
					</div>
					<div class="absolute bottom-0 right-0 w-3.5 h-3.5 ${statusColor} rounded-full border-2 border-slate-900" title="${statusText}"></div>
				</div>

				<div class="flex flex-col">
					<span class="text-white font-bold tracking-wide">${friend.name}</span>
					<span class="text-xs ${friend.isOnline ? "text-green-400" : "text-gray-400"} uppercase font-semibold tracking-wider">
						${statusText}
					</span>
				</div>
			</div>

			<div class="opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-200">
				${Button({
					text: iconTrash,
					variant: "ghost",
					isIcon: true,
					className: "text-red-500 hover:text-red-400 hover:bg-red-500/10",
					extraAttributes: `id="btn-friend-remove" data-friend-id="${friend.id}" title="Remover Amigo"`
				})}
			</div>
		</div>
	`;
}

export function getFriendsHtml() {
	const friendsListHtml = mockFriends.length > 0
		? mockFriends.map(renderFriendItem).join('')
		: `<div class="flex flex-col items-center justify-center py-12 text-center opacity-60">
				 <span class="text-4xl mb-4">Forever Alone? 🥔</span>
				 <p class="text-gray-400 text-lg">Você ainda não tem amigos adicionados.</p>
			 </div>`;

	const requestsListHtml = mockRequests.length > 0
		? mockRequests.map(renderRequestItem).join('')
		: `<div class="text-center py-4 text-gray-500 text-sm italic">Nenhuma solicitação pendente.</div>`;

	return `
		<img src="src/assets/bg-login.png" alt="Background" class="fixed inset-0 w-full h-full object-cover -z-10 opacity-30" />

		<div class="min-h-screen p-6 flex flex-col items-center max-w-4xl mx-auto">

			<div class="w-full flex justify-between items-end mb-8 border-b border-white/10 pb-4">
				<h2 class="text-cyan-500 text-4xl md:text-5xl font-bold tracking-widest drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]">
					AMIGOS
				</h2>
				${Button({
					id: "btn-friends-back",
					text: "← VOLTAR",
					variant: "ghost",
					isIcon: true,
					className: "w-auto px-2 text-gray-300 hover:text-white hover:bg-transparent shadow-none hover:underline"
				})}
			</div>

			<div class="w-full grid grid-cols-1 md:grid-cols-3 gap-8">

				<!-- Coluna Esquerda: Adicionar e Solicitações -->
				<div class="md:col-span-1 flex flex-col gap-6">

					<!-- Card Adicionar -->
					<div class="bg-slate-900/60 backdrop-blur-md p-6 rounded-xl border border-white/10 shadow-xl">
						<h3 class="text-xl text-white font-bold mb-4 flex items-center gap-2">
							<span class="text-yellow-400">⚡</span> Adicionar
						</h3>
						<p class="text-gray-400 text-sm mb-4">Busque pelo nome exato para enviar um convite.</p>

						<div class="flex flex-col gap-4">
							${Input({
								id: "input-friends-add",
								placeholder: "Nome do usuário...",
								type: "text"
							})}

							${Button({
								id: "btn-friends-add",
								text: "Adicionar +",
								type: "button"
							})}
						</div>
					</div>

					<!-- Card Solicitações -->
					<div class="bg-slate-900/60 backdrop-blur-md p-6 rounded-xl border border-white/10 shadow-xl">
						<div class="flex justify-between items-center mb-4">
							<h3 class="text-lg text-white font-bold flex items-center gap-2">
								<span class="text-pink-400">💌</span> Solicitações
							</h3>
							${mockRequests.length > 0 ? `<span class="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse">${mockRequests.length}</span>` : ''}
						</div>

						<div class="flex flex-col max-h-[200px] overflow-y-auto overflow-x-hidden pr-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-white/[0.02] [&::-webkit-scrollbar-track]:rounded [&::-webkit-scrollbar-thumb]:bg-cyan-600/30 [&::-webkit-scrollbar-thumb]:rounded [&::-webkit-scrollbar-thumb]:hover:bg-cyan-600/80">
							${requestsListHtml}
						</div>
					</div>

				</div>

				<!-- Coluna Direita: Lista de Amigos -->
				<div class="md:col-span-2">
					<div class="bg-slate-900/60 backdrop-blur-md p-6 rounded-xl border border-white/10 shadow-xl min-h-[500px] flex flex-col">
						<div class="flex justify-between items-center mb-6">
							<h3 class="text-xl text-white font-bold flex items-center gap-2">
								<span class="text-blue-400">👥</span> Sua Lista
							</h3>
							<span class="text-xs font-mono text-cyan-500 bg-cyan-900/30 px-2 py-1 rounded border border-cyan-500/30">
								${mockFriends.length} / 50
							</span>
						</div>

						<div class="overflow-y-auto flex-1 pr-2 max-h-[400px] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-white/[0.02] [&::-webkit-scrollbar-track]:rounded [&::-webkit-scrollbar-thumb]:bg-cyan-600/30 [&::-webkit-scrollbar-thumb]:rounded [&::-webkit-scrollbar-thumb]:hover:bg-cyan-600/80">
							${friendsListHtml}
						</div>
					</div>
				</div>

			</div>
		</div>
	`;
}
