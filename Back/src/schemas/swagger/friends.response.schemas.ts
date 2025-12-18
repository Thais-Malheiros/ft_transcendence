export const friendUserSchema = {
	type: 'object',
	properties: {
		id: { type: 'number', examples: [1] },
		name: { type: 'string', examples: ['João Silva'] },
		nick: { type: 'string', examples: ['joao123'] },
		email: { type: 'string', examples: ['joao@example.com'] },
		isAnonymous: { type: 'boolean', examples: [false] },
		gang: {
			type: 'string',
			enum: ['potatoes', 'tomatoes'],
			examples: ['potatoes']
		}
	}
} as const

export const friendsListResponseSchema = {
	type: 'array',
	items: friendUserSchema
} as const

export const friendMessageResponseSchema = {
	type: 'object',
	properties: {
		message: {
			type: 'string',
			examples: [
				'Solicitação enviada para batata123',
				'Agora você e batata123 são amigos!',
				'Solicitação recusada',
				'Amizade desfeita com sucesso'
			]
		}
	}
} as const

export const friendErrorResponseSchema = {
	type: 'object',
	properties: {
		error: {
			type: 'string',
			examples: [
				'Usuário não autenticado',
				'Usuário não encontrado',
				'Você não pode adicionar a si mesmo',
				'Vocês já são amigos',
				'Solicitação já enviada',
				'Este usuário já te enviou uma solicitação. Aceite-a.',
				'Não há solicitação pendente deste usuário',
				'Vocês não são amigos'
			]
		}
	}
} as const
