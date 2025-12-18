export const friendRequestBodySchema = {
	type: 'object',
	required: ['nick'],
	properties: {
		nick: {
			type: 'string',
			minLength: 3,
			maxLength: 20,
			pattern: '^[a-zA-Z0-9_]+$',
			description: 'Nick do usuário para adicionar como amigo',
			examples: ['batata123', 'tomate_pro']
		}
	}
} as const

export const friendResponseBodySchema = {
	type: 'object',
	required: ['nick', 'action'],
	properties: {
		nick: {
			type: 'string',
			minLength: 3,
			maxLength: 20,
			pattern: '^[a-zA-Z0-9_]+$',
			description: 'Nick do usuário que enviou a solicitação',
			examples: ['batata123']
		},
		action: {
			type: 'string',
			enum: ['accept', 'decline'],
			description: 'Ação a ser tomada com a solicitação',
			examples: ['accept', 'decline']
		}
	}
} as const

export const userIdParamSchema = {
	type: 'object',
	required: ['id'],
	properties: {
		id: {
			type: 'string',
			pattern: '^\\d+$',
			description: 'ID do usuário',
			examples: ['1', '42']
		}
	}
} as const
