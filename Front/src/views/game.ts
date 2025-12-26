// Front/src/views/game.ts
import { Button } from "@/components/Button";
import { Socket } from 'socket.io-client';
import confetti from 'canvas-confetti';

// Imports de Tipos
import { PowerUpType } from '../types/game'; 
import type { GameState } from '../types/game';

// --- 1. A ESTRUTURA HTML (Visual) ---
export function getGameHtml() {
    return `
        <div id="game-root" class="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-slate-900">
            
            <div id="stadium-bg" class="absolute inset-0 bg-cover bg-center opacity-40 z-0 transition-all duration-1000"></div>

            <div class="relative z-10 w-full max-w-6xl flex justify-between items-end mb-6 px-8">
                
                <div class="flex flex-col items-center gap-2">
                    <div class="relative group">
                        <img id="p1-photo" src="" class="w-20 h-20 rounded-full border-4 border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.6)] bg-slate-800 object-cover">
                        <div id="p1-shield-badge" class="hidden absolute -top-2 -right-2 bg-cyan-400 text-xs font-bold px-2 py-1 rounded-full animate-bounce">SHIELD</div>
                    </div>
                    <span id="p1-nick" class="text-red-400 font-bold font-mono text-lg shadow-black drop-shadow-md">Player 1</span>
                </div>

                <div class="flex flex-col items-center">
                    <h1 class="text-3xl text-yellow-500 font-bold drop-shadow-[0_2px_0px_rgba(0,0,0,1)] uppercase tracking-widest mb-2">Potato Pong War</h1>
                    <div class="bg-slate-950/80 border-2 border-orange-500/50 px-10 py-4 rounded-xl backdrop-blur-md shadow-2xl flex items-center gap-6">
                        <span id="p1-score" class="text-5xl font-mono font-bold text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]">0</span>
                        <img src="/assets/vs_icon.png" class="w-8 h-8 opacity-80" alt="VS"> 
                        <span id="p2-score" class="text-5xl font-mono font-bold text-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]">0</span>
                    </div>
                </div>

                <div class="flex flex-col items-center gap-2">
                    <div class="relative group">
                        <img id="p2-photo" src="" class="w-20 h-20 rounded-full border-4 border-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.6)] bg-slate-800 object-cover">
                        <div id="p2-shield-badge" class="hidden absolute -top-2 -left-2 bg-cyan-400 text-xs font-bold px-2 py-1 rounded-full animate-bounce">SHIELD</div>
                    </div>
                    <span id="p2-nick" class="text-amber-400 font-bold font-mono text-lg shadow-black drop-shadow-md">Player 2</span>
                </div>
            </div>

            <div class="relative z-10">
                <div class="relative bg-slate-950 rounded-xl border-4 border-slate-700 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                    
                    <div id="p1-game-avatar" class="absolute left-[-60px] w-[50px] h-[50px] transition-all duration-75 pointer-events-none z-20">
                         <img id="p1-skin-img" src="" class="w-full h-full drop-shadow-lg filter brightness-110">
                    </div>

                    <canvas id="pongCanvas" width="800" height="600" class="block rounded-lg cursor-none bg-slate-900/50"></canvas>

                    <div id="p2-game-avatar" class="absolute right-[-60px] w-[50px] h-[50px] transition-all duration-75 pointer-events-none z-20">
                        <img id="p2-skin-img" src="" class="w-full h-full drop-shadow-lg filter brightness-110 transform scale-x-[-1]">
                    </div>

                    <div id="game-overlay" class="absolute inset-0 flex flex-col items-center justify-center bg-black/90 z-50 rounded-lg">
                        <h2 id="overlay-title" class="text-3xl font-bold text-white mb-4 animate-pulse">Aguardando Oponente...</h2>
                        <p id="overlay-msg" class="text-gray-400 mb-6 text-sm">Convide um amigo ou aguarde na fila.</p>

                        <button id="btn-restart" class="hidden px-6 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded font-bold transition">
                            Jogar Novamente
                        </button>
                    </div>
                </div>
            </div>

            <div class="w-full max-w-4xl mt-8 flex justify-between items-center bg-slate-900/80 p-4 rounded-xl border border-white/10 backdrop-blur-sm shadow-lg z-10">
                <div class="flex gap-12 text-sm font-mono text-gray-400">
                    <div class="flex items-center gap-2">
                        <div class="w-8 h-8 rounded bg-slate-700 flex items-center justify-center text-white font-bold border-b-2 border-slate-500">W</div>
                        <div class="w-8 h-8 rounded bg-slate-700 flex items-center justify-center text-white font-bold border-b-2 border-slate-500">S</div>
                        <span class="text-red-400 font-bold ml-2">Movimento P1</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <div class="w-8 h-8 rounded bg-slate-700 flex items-center justify-center text-white font-bold border-b-2 border-slate-500">⬆</div>
                        <div class="w-8 h-8 rounded bg-slate-700 flex items-center justify-center text-white font-bold border-b-2 border-slate-500">⬇</div>
                        <span class="text-amber-400 font-bold ml-2">Movimento P2</span>
                    </div>
                </div>

                <div class="w-auto">
                    ${Button({
                        id: "btn-quit-game",
                        text: "Abandonar Partida",
                        variant: "danger",
                        className: "py-2 px-6 text-sm hover:bg-red-900/80 transition-colors"
                    })}
                </div>
            </div>
        </div>
    `;
}

// --- 2. A LÓGICA DO JOGO (Controller) ---
export class GameController {
    private socket: Socket;
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private animationFrameId: number | null = null;
    
    // Elementos DOM cacheados
    private els: Record<string, HTMLElement | HTMLImageElement> = {};
    private images: Record<string, HTMLImageElement> = {};
    private gameState: GameState | null = null;

    constructor(socket: Socket) {
        this.socket = socket;
        
        // Inicializa elementos
        this.canvas = document.getElementById('pongCanvas') as HTMLCanvasElement;
        if (!this.canvas) throw new Error("Canvas não encontrado no DOM");
        
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
        
        this.cacheElements();
        this.loadAssets();
        this.setupListeners();
        this.renderLoop(); // Inicia o loop visual

        // Bind do botão de sair
        document.getElementById('btn-quit-game')?.addEventListener('click', () => {
            this.handleQuit();
        });
    }

    private cacheElements() {
        const ids = [
            'p1-score', 'p2-score', 'p1-nick', 'p2-nick', 
            'p1-photo', 'p2-photo', 'p1-game-avatar', 'p2-game-avatar',
            'p1-skin-img', 'p2-skin-img', 'p1-shield-badge', 'p2-shield-badge',
            'stadium-bg', 'game-overlay', 'overlay-title', 'overlay-msg'
        ];
        
        ids.forEach(id => {
            const el = document.getElementById(id);
            if (el) this.els[id] = el;
        });
    }

    private loadAssets() {
        const assets = {
            'tomato': '/assets/tomato_skin.png',
            'potato': '/assets/potato_skin.png',
            'bg_tomatoes': '/assets/crowd_tomatoes.png',
            'bg_potatoes': '/assets/crowd_potatoes.png',
            'bg_mixed': '/assets/crowd_mixed.png',
            'icon_big': '/assets/powerup_big.png',
            'icon_shield': '/assets/powerup_shield.png',
            'icon_speed': '/assets/powerup_speed.png',
        };

        Object.entries(assets).forEach(([key, src]) => {
            const img = new Image();
            img.src = src;
            this.images[key] = img;
        });
    }

    private toggleOverlay(show: boolean) {
        const overlay = this.els['game-overlay'];
        if (overlay) {
            if (show) overlay.classList.remove('hidden');
            else overlay.classList.add('hidden');
        }
    }

    private showOverlay(titleText: string, msgText: string) {
        this.toggleOverlay(true);
        const title = document.getElementById('overlay-title');
        const msg = document.getElementById('overlay-msg');
        const btn = document.getElementById('btn-restart');
        
        if (title) title.innerText = titleText;
        if (msg) msg.innerText = msgText;
        if (btn) btn.classList.add('hidden');
    }

    private setupListeners() {
        // Recebe o estado do jogo (posições)
        this.socket.on('gameState', (state: GameState) => {
            this.gameState = state;
            this.updateUI(state);
            // Nota: Não chamamos toggleOverlay(false) aqui para respeitar o timer inicial
        });

        // Gerencia Status da Partida (Waiting, Starting, Playing)
        this.socket.on('matchStatus', (status: string) => {
            if (status === 'waiting') {
                this.showOverlay("Aguardando Oponente...", "Convide um amigo ou aguarde na fila.");
            } 
            else if (status.startsWith('starting:')) {
                const count = status.split(':')[1];
                this.showOverlay("Prepare-se!", `A partida começa em ${count}...`);
            }
            else if (status === 'playing') {
                this.toggleOverlay(false); // Libera a tela para jogar
            }
        });

        // Confetes no gol
        this.socket.on('scoreUpdate', (data: { scorer: 'player1' | 'player2' }) => {
            this.triggerConfetti(data.scorer);
        });
        
        // Fim de jogo
        this.socket.on('gameOver', (data) => this.showGameOver(data));
        
        // Inputs
        window.addEventListener('keydown', this.handleInput);
        window.addEventListener('keyup', this.handleInputUp);
    }

    private handleInput = (e: KeyboardEvent) => {
        if (e.repeat) return; 
        let direction = '';
        if (e.key === 'ArrowUp' || e.key === 'w') direction = 'UP';
        if (e.key === 'ArrowDown' || e.key === 's') direction = 'DOWN';
        
        if (direction) this.socket.emit('movePaddle', { direction });
    };

    private handleInputUp = (e: KeyboardEvent) => {
        if (['ArrowUp', 'w', 'ArrowDown', 's'].includes(e.key)) {
             this.socket.emit('movePaddle', { direction: 'STOP' });
        }
    };

    private updateUI(state: GameState) {
        if (this.els['p1-score']) this.els['p1-score'].innerText = state.player1.score.toString();
        if (this.els['p2-score']) this.els['p2-score'].innerText = state.player2.score.toString();
        if (this.els['p1-nick']) this.els['p1-nick'].innerText = state.player1.nick;
        if (this.els['p2-nick']) this.els['p2-nick'].innerText = state.player2.nick;

        const bgKey = this.getBgKey(state.player1.skin, state.player2.skin);
        if (this.images[bgKey] && this.els['stadium-bg']) {
             this.els['stadium-bg'].style.backgroundImage = `url(${this.images[bgKey].src})`;
        }

        const p1Top = state.player1.y; 
        const p2Top = state.player2.y;

        if (this.els['p1-game-avatar']) this.els['p1-game-avatar'].style.top = `${p1Top}px`;
        if (this.els['p2-game-avatar']) this.els['p2-game-avatar'].style.top = `${p2Top}px`;

        if (this.els['p1-skin-img']) (this.els['p1-skin-img'] as HTMLImageElement).src = this.images[state.player1.skin]?.src || '';
        if (this.els['p2-skin-img']) (this.els['p2-skin-img'] as HTMLImageElement).src = this.images[state.player2.skin]?.src || '';

        if (this.els['p1-shield-badge']) this.els['p1-shield-badge'].classList.toggle('hidden', !state.player1.shield);
        if (this.els['p2-shield-badge']) this.els['p2-shield-badge'].classList.toggle('hidden', !state.player2.shield);
    }

    private getBgKey(s1: string, s2: string) {
        if (s1 === 'tomato' && s2 === 'tomato') return 'bg_tomatoes';
        if (s1 === 'potato' && s2 === 'potato') return 'bg_potatoes';
        return 'bg_mixed';
    }

    // --- LOOP PRINCIPAL DE DESENHO ---
    private renderLoop = () => {
        // Se ainda não recebeu dados do servidor, espera.
        if (!this.gameState) {
            this.animationFrameId = requestAnimationFrame(this.renderLoop);
            return;
        }

        try {
            const { width, height } = this.canvas;
            this.ctx.clearRect(0, 0, width, height);

            // 1. Desenhar Mesa (Linha Central)
            this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
            this.ctx.lineWidth = 4;
            this.ctx.setLineDash([15, 15]);
            this.ctx.beginPath();
            this.ctx.moveTo(width / 2, 0);
            this.ctx.lineTo(width / 2, height);
            this.ctx.stroke();
            this.ctx.setLineDash([]);

            // 2. Raquetes
            this.drawPaddle(this.gameState.player1, 10);
            this.drawPaddle(this.gameState.player2, width - 20);

            // 3. Bola
            this.ctx.beginPath();
            this.ctx.arc(this.gameState.ball.x, this.gameState.ball.y, 10, 0, Math.PI * 2);
            this.ctx.fillStyle = '#fff';
            this.ctx.shadowBlur = 15;
            this.ctx.shadowColor = '#fff';
            this.ctx.fill();
            this.ctx.shadowBlur = 0;

            // 4. PowerUps
            if (this.gameState.powerUp && this.gameState.powerUp.active) {
                this.drawPowerUp(this.gameState.powerUp);
            }

        } catch (error) {
            console.error("Erro no renderLoop:", error);
        }

        this.animationFrameId = requestAnimationFrame(this.renderLoop);
    };

    private drawPaddle(player: GameState['player1'], x: number) {
        this.ctx.fillStyle = player.skin === 'tomato' ? '#ef4444' : '#fbbf24';
        
        if (player.shield) {
            this.ctx.shadowBlur = 20;
            this.ctx.shadowColor = 'cyan';
            this.ctx.fillStyle = 'cyan'; 
        }

        this.ctx.beginPath();
        // Fallback se roundRect não existir em navegadores muito antigos (mas moderno suporta)
        if (this.ctx.roundRect) {
            this.ctx.roundRect(x, player.y, 10, player.height, 5);
        } else {
            this.ctx.rect(x, player.y, 10, player.height);
        }
        this.ctx.fill();
        this.ctx.shadowBlur = 0;
    }

    private drawPowerUp(powerUp: NonNullable<GameState['powerUp']>) {
        const { x, y, type } = powerUp;
        
        const radius = 35; 
        const iconSize = 50; // Aumentar ícone (de 40 para 50)
        const offset = iconSize / 2;

        // Fundo do PowerUp
        this.ctx.beginPath();
        this.ctx.arc(x, y, 25, 0, Math.PI * 2);
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
        this.ctx.fill();
        this.ctx.strokeStyle = '#fff';
        this.ctx.stroke();

        // Borda pulsante (opcional, visual extra)
        this.ctx.strokeStyle = `rgba(255, 255, 255, ${0.5 + Math.sin(Date.now() / 200) * 0.2})`;
        this.ctx.lineWidth = 3;
        this.ctx.stroke();

        let icon: HTMLImageElement | null = null;
        let color = '#fff';

        // Cast para string para evitar erros de tipagem em runtime se o Enum falhar
        const typeStr = type as unknown as string;

        if (typeStr === 'BIG_PADDLE' || type === PowerUpType.BIG_PADDLE) { 
            icon = this.images['icon_big']; 
            color = '#22c55e'; 
        }
        else if (typeStr === 'SHIELD' || type === PowerUpType.SHIELD) { 
            icon = this.images['icon_shield']; 
            color = '#06b6d4'; 
        }
        else if (typeStr === 'SPEED_BOOST' || type === PowerUpType.SPEED_BOOST) { 
            icon = this.images['icon_speed']; 
            color = '#f97316'; 
        }

        // Desenha Ícone ou Fallback
        if (icon && icon.complete && icon.naturalWidth > 0) {
            try {
                // MUDANÇA 2: Centralizar imagem maior
                this.ctx.drawImage(icon, x - offset, y - offset, iconSize, iconSize);
            } catch (e) {
                this.drawPowerUpFallback(x, y, color);
            }
        } else {
            this.drawPowerUpFallback(x, y, color);
        }
    }

    private drawPowerUpFallback(x: number, y: number, color: string) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, 15, 0, Math.PI * 2);
        this.ctx.fillStyle = color;
        this.ctx.fill();
        this.ctx.fillStyle = '#000';
        this.ctx.font = 'bold 16px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('?', x, y + 5);
    }

    private triggerConfetti(scorer: 'player1' | 'player2') {
        const isLeft = scorer === 'player1';
        const color = isLeft ? '#ef4444' : '#fbbf24';
        
        confetti({
            particleCount: 100,
            spread: 60,
            origin: { x: isLeft ? 0.2 : 0.8, y: 0.5 },
            colors: [color, '#ffffff']
        });
    }

    private showGameOver(data: { winnerId: string, message: string }) {
        const overlay = this.els['game-overlay'];
        if (overlay) {
            overlay.classList.remove('hidden');
            if (this.els['overlay-msg']) this.els['overlay-msg'].innerText = data.message;
            // Botão reiniciar seria implementado aqui
        }
    }

    private handleQuit() {
        if (confirm("Tem certeza que deseja abandonar a batalha?")) {
            this.socket.disconnect(); 
            window.location.href = '/'; 
        }
    }

    public destroy() {
        if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
        window.removeEventListener('keydown', this.handleInput);
        window.removeEventListener('keyup', this.handleInputUp);
        
        this.socket.off('gameState');
        this.socket.off('scoreUpdate');
        this.socket.off('gameOver');
        this.socket.off('matchStatus');
        
        this.socket.disconnect(); 
    }
}