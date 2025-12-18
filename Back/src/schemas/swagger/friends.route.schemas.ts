import {
	friendRequestBodySchema,
	friendResponseBodySchema,
	userIdParamSchema
} from './friends.request.schemas'
import {
	friendErrorResponseSchema,
	friendMessageResponseSchema,
	friendsListResponseSchema,
	friendUserSchema
} from './friends.response.schemas'

export const friendsListRouteSchema = {
	tags: ['friends'],
	summary: 'Listar amigos',
	description: 'Retorna a lista de amigos do usuário autenticado',
	security: [{ bearerAuth: [] }],
	response: {
		200: {
			description: 'Lista de amigos retornada com sucesso',
			...friendsListResponseSchema
		},
		401: {
			description: 'Não autorizado',
			...friendErrorResponseSchema
		},
		404: {
			description: 'Usuário não autenticado',
			...friendErrorResponseSchema
		}
	}
} as const

export const getUserByIdRouteSchema = {
	tags: ['friends'],
	summary: 'Buscar usuário por ID',
	description: 'Retorna informações de um usuário específico pelo ID',
	security: [{ bearerAuth: [] }],
	params: userIdParamSchema,
	response: {
		200: {
			description: 'Usuário encontrado',
			...friendUserSchema
		},
		400: {
			description: 'Validação falhou',
			type: 'object',
			properties: {
				error: { type: 'string', examples: ['Validação falhou'] },
				details: {
					type: 'array',
					items: {
						type: 'object',
						properties: {
							field: { type: 'string', examples: ['id'] },
							message: { type: 'string', examples: ['ID deve conter apenas números', 'ID deve ser maior que zero'] }
						}
					}
				}
			}
		},
		401: {
			description: 'Não autorizado',
			...friendErrorResponseSchema
		},
		404: {
			description: 'Usuário não encontrado',
			...friendErrorResponseSchema
		}
	}
} as const

export const sendFriendRequestRouteSchema = {
	tags: ['friends'],
	summary: 'Enviar solicitação de amizade',
	description: 'Envia uma solicitação de amizade para outro usuário',
	security: [{ bearerAuth: [] }],
	body: friendRequestBodySchema,
	response: {
		200: {
			description: 'Solicitação enviada com sucesso',
			...friendMessageResponseSchema
		},
		400: {
			description: 'Erro de validação ou regra de negócio',
			...friendErrorResponseSchema
		},
		401: {
			description: 'Não autorizado',
			...friendErrorResponseSchema
		},
		404: {
			description: 'Usuário alvo não encontrado',
			...friendErrorResponseSchema
		}
	}
} as const

export const respondFriendRequestRouteSchema = {
	tags: ['friends'],
	summary: 'Responder solicitação de amizade',
	description: 'Aceita ou recusa uma solicitação de amizade recebida',
	security: [{ bearerAuth: [] }],
	body: friendResponseBodySchema,
	response: {
		200: {
			description: 'Solicitação processada com sucesso',
			...friendMessageResponseSchema
		},
		400: {
			description: 'Erro de validação ou regra de negócio',
			...friendErrorResponseSchema
		},
		401: {
			description: 'Não autorizado',
			...friendErrorResponseSchema
		},
		404: {
			description: 'Usuário não encontrado',
			...friendErrorResponseSchema
		}
	}
} as const

export const removeFriendRouteSchema = {
	tags: ['friends'],
	summary: 'Remover amigo',
	description: 'Remove um usuário da lista de amigos',
	security: [{ bearerAuth: [] }],
	params: userIdParamSchema,
	response: {
		200: {
			description: 'Amizade desfeita com sucesso',
			...friendMessageResponseSchema
		},
		400: {
			description: 'Validação falhou ou vocês não são amigos',
			...friendErrorResponseSchema
		},
		401: {
			description: 'Não autorizado',
			...friendErrorResponseSchema
		},
		404: {
			description: 'Usuário não encontrado',
			...friendErrorResponseSchema
		}
	}
} as const
