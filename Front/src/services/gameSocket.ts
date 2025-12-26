// src/services/gameSocket.ts
import { io, Socket } from 'socket.io-client';
import { GameController } from '../views/game';

// Estado interno do módulo (não acessível diretamente de fora)
let socket: Socket | null = null;
let controller: GameController | null = null;

export function initGameSocket() {
    // 1. Limpeza de segurança (caso chame init duas vezes seguidas)
    if (socket) {
        disconnectGame();
    }

    console.log("Iniciando nova conexão de jogo...");
    
    // Conecta ao Backend (ajuste a URL se necessário)
    socket = io('http://localhost:3333'); 

    socket.on('connect', () => {
        console.log("Conectado ao servidor do jogo! ID:", socket?.id);
        
        // Instancia o Controller apenas se o socket existir e ainda não tivermos um controller
        if (socket && !controller) {
            // O GameController assume que o HTML já existe no DOM (renderizado pelo main.ts)
            try {
                controller = new GameController(socket);
            } catch (e) {
                console.error("Falha ao iniciar GameController:", e);
            }
        }
    });

    socket.on('connect_error', (err) => {
        console.error("Erro de conexão com o jogo:", err);
        // Opcional: Adicionar lógica de reconexão ou aviso visual aqui
    });
}

export function disconnectGame() {
    // Destrói o controller (para animações, remove listeners do DOM)
    if (controller) {
        console.log("Destruindo GameController...");
        controller.destroy();
        controller = null;
    }

    // Desconecta o socket
    if (socket) {
        console.log("Desconectando Socket...");
        if (socket.connected) {
            socket.disconnect();
        }
        socket = null;
    }
}