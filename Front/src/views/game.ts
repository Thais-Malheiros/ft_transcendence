import { Button } from "@/components/Button";

export function getGameHtml() {
	return `
		<div class="min-h-screen flex flex-col justify-center items-center p-4">

			<div class="w-full max-w-5xl flex justify-between items-end mb-4 px-4">
				<h1 class="text-4xl text-cyan-500 font-bold drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]">PONG</h1>

				<div class="bg-slate-900/80 border border-cyan-500/30 px-8 py-2 rounded-lg backdrop-blur-sm">
					<span id="p1-score" class="text-4xl font-mono font-bold text-white">0</span>
					<span class="text-2xl text-gray-500 mx-2">-</span>
					<span id="p2-score" class="text-4xl font-mono font-bold text-white">0</span>
				</div>
			</div>

			<div class="relative w-full max-w-5xl aspect-video bg-black rounded-xl border-4 border-cyan-500/50 shadow-[0_0_50px_rgba(6,182,212,0.15)] overflow-hidden">
				<canvas id="pongCanvas" class="w-full h-full block"></canvas>

				<div id="start-overlay" class="absolute inset-0 flex flex-col items-center justify-center bg-black/70 z-10 pointer-events-none">
					<p class="text-white text-2xl font-bold animate-pulse">Aguardando Início...</p>
				</div>
			</div>

			<div class="w-full max-w-5xl mt-6 flex justify-between items-center bg-slate-900/50 p-4 rounded-xl border border-white/5 backdrop-blur-sm">
				<div class="flex gap-8 text-sm font-mono text-gray-400">
					<div><strong class="text-cyan-400">P1:</strong> W / S</div>
					<div><strong class="text-purple-400">P2:</strong> ⬆ / ⬇</div>
				</div>

				<div class="w-auto">
					${Button({
						id: "btn-quit-game",
						text: "Abandonar Partida",
						variant: "danger",
						className: "py-2 px-6 text-sm"
					})}
				</div>
			</div>
		</div>
	`;
}
