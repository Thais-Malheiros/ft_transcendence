import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import dotenv from 'dotenv'
import fastify, { FastifyReply, FastifyRequest } from 'fastify'
import { Server, Socket } from 'socket.io'

import { PongMatch } from './game/PongMatch'
import swaggerPlugin from './plugins/swagger'
import zodValidator from './plugins/zod-validator'
import { authRoutes } from './routes/auth.routes'
import { friendsRoutes } from './routes/friends.routes'
import { gameRoutes } from './routes/game.routes'
import { leaderboardRoutes } from './routes/leaderboard.routes'
import { usersRoutes } from './routes/users.routes'

import { PlayerController } from './database/controllers/player.controller'

dotenv.config()

declare module 'fastify' {
	interface FastifyJWT {
		payload: {
			id: number
			email: string
			nick: string
			isAnonymous: boolean
			gang: string
			temp2FA?: boolean
		}
		user: {
			id: number
			email: string
			nick: string
			isAnonymous: boolean
			gang: string
			temp2FA?: boolean
		}
	}
}

const app = fastify({ logger: false })

let waitingPlayer: Socket | null = null

const activeMatches: Map<string, PongMatch> = new Map()

// Configuração do CORS
app.register(cors, {
	origin: '*',
	methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
	allowedHeaders: ['Content-Type', 'Authorization']
})

app.register(jwt, { secret: process.env.JWT_SECRET || 'JWT_SECRET' })
app.register(swaggerPlugin)


// --- DECORATORS DE AUTENTICAÇÃO ---
app.decorate('authenticate', async function (req: FastifyRequest, reply: FastifyReply) {
	try {
		await req.jwtVerify()
		if (req.user.temp2FA) {
			return reply.code(401).send({ error: 'Token temporário. Complete o 2FA.' })
		}
	} catch (err) {
		return reply.code(401).send({ error: 'Token Inválido ou Expirado' })
	}
})

app.decorate('authenticate2FA', async function (req: FastifyRequest, reply: FastifyReply) {
	try {
		await req.jwtVerify()
		if (!req.user.temp2FA) {
			return reply.code(401).send({ error: 'Token inválido para etapa 2FA' })
		}
	} catch (err) {
		return reply.code(401).send({ error: 'Token Inválido' })
	}
})

// --- REGISTRO DE ROTAS ---
app.register(zodValidator)

app.register(authRoutes, { prefix: '/auth' })
app.register(friendsRoutes, { prefix: '/friends' })
app.register(leaderboardRoutes, { prefix: '/leaderboards' })
app.register(usersRoutes, { prefix: '/users' })


// --- INICIALIZAÇÃO DO SERVIDOR E SOCKET.IO ---
const start = async () => {
	try {

		const io = new Server(app.server, {
			cors: {
				origin: '*',
				methods: ['GET', 'POST']
			}
		})
		app.register(gameRoutes, { prefix: '/game', io: io })
		await app.ready()

		io.on('connection', async (socket: Socket) => {
			console.log(`\n[SOCKET] Nova conexão recebida: ${socket.id}`);

			const tokenRecebido = socket.handshake.auth.token;
			console.log(`[SOCKET] Token recebido:`, tokenRecebido ? "Sim (Ocultado)" : "NÃO RECEBIDO (Undefined)");

			let userData: any = {};

			try {
				if (tokenRecebido) {
					const decoded = app.jwt.decode(tokenRecebido) as any;
					if (decoded && decoded.id) {
						const userFromDb = await PlayerController.findById(decoded.id);

						if (userFromDb) {
							userData = {
								id: userFromDb.id,
								nick: userFromDb.nick,
								avatar: userFromDb.avatar || '',
								skin: userFromDb.gang === 'potatoes' ? 'potato' : 'tomato',
								gang: userFromDb.gang
							};
						}
					}
				}
			} catch (e) {
				console.error(`[SOCKET] Erro ao decodificar token:`, e);
			}

			socket.data = { ...userData, socketId: socket.id };


			// ---------------------------------------------------------
			// EVENTO 1: Entrar em Sala Específica (Ranked ou Convite)
			// O frontend emite isso após receber o 'roomId' da API HTTP
			// ---------------------------------------------------------
			socket.on('joinGame', (data: { roomId: string }) => {
				const roomId = data.roomId;
				console.log(`[SOCKET] ${socket.data.nick} entrando na sala: ${roomId}`); // LOG NOVO

				socket.join(roomId);

				const room = io.sockets.adapter.rooms.get(roomId);

				if (room) {
					console.log(`[SOCKET] Sala ${roomId} agora tem ${room.size} jogadores.`);

					if (room.size === 2) {
						console.log(`[GAME START] Iniciando partida na sala ${roomId}`);
						const [id1, id2] = Array.from(room);

						const p1Socket = io.sockets.sockets.get(id1);

						const p2Socket = io.sockets.sockets.get(id2);

						if (p1Socket && p2Socket) {
							console.log(`Iniciando Partida Específica [${roomId}]`);

							const isRanked = roomId.startsWith('ranked_');

							const match = new PongMatch(
								io,
								roomId,
								p1Socket.data,
								p2Socket.data,
								isRanked
							);

							activeMatches.set(p1Socket.id, match);
							activeMatches.set(p2Socket.id, match);
						}
					} else {
						console.log(`[SOCKET] Aguardando segundo jogador...`);
					}
				} else {
					console.log(`[SOCKET] Erro ao entrar na sala ${roomId}`);
				}
			});

			// ---------------------------------------------------------
			// EVENTO 2: Fila Casual Rápida (FIFO)
			// O frontend emite isso se clicar em "Jogar Casual" direto
			// ---------------------------------------------------------
			socket.on('joinQueue', () => {
				if (waitingPlayer && waitingPlayer.id !== socket.id) {
					console.log(`Iniciando Casual (FIFO): ${waitingPlayer.data.nick} vs ${socket.data.nick}`);

					const roomId = `casual_fifo_${waitingPlayer.id}_${socket.id}`;

					waitingPlayer.join(roomId);
					socket.join(roomId);

					const match = new PongMatch(
						io,
						roomId,
						waitingPlayer.data,
						socket.data,
						false
					);

					activeMatches.set(waitingPlayer.id, match);
					activeMatches.set(socket.id, match);

					waitingPlayer = null;
				} else {
					console.log('Entrou na fila casual rápida...');
					waitingPlayer = socket;
					socket.emit('matchStatus', 'waiting');
				}
			});

			// ---------------------------------------------------------
			// EVENTO 3: Desconexão
			// ---------------------------------------------------------
			socket.on('disconnect', () => {
				console.log(`[SOCKET] Cliente desconectado: ${socket.id} (User ID: ${socket.data.id})`);

				if (waitingPlayer === socket) {
					waitingPlayer = null;
				}

				const match = activeMatches.get(socket.id);
				if (match) {
					match.handleDisconnection(socket.id);

					activeMatches.delete(match.p1SocketId);
					activeMatches.delete(match.p2SocketId);
				}
			});
		});

		await app.listen({ port: 3333, host: '0.0.0.0' })
		console.log('🚀 Servidor rodando em http://localhost:3333')

	} catch (err) {
		app.log.error(err)
		process.exit(1)
	}
}

start()
