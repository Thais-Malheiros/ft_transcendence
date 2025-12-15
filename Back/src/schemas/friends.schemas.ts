import { z } from 'zod'

export const FriendRequestSchema = z.object({
	nick: z.string()
		.min(3, 'Nick deve ter no mínimo 3 caracteres')
		.max(20, 'Nick deve ter no máximo 20 caracteres')
		.regex(/^[a-zA-Z0-9_]+$/, 'Nick deve conter apenas letras, números e underscores')
})

export const FriendResponseSchema = z.object({
	nick: z.string()
		.min(3, 'Nick deve ter no mínimo 3 caracteres')
		.max(20, 'Nick deve ter no máximo 20 caracteres')
		.regex(/^[a-zA-Z0-9_]+$/, 'Nick deve conter apenas letras, números e underscores'),

	action: z.enum(['accept', 'decline'], {
		message: 'Ação deve ser "accept" ou "decline"'
	})
})

export const UserIDSchema = z.object({
	id: z.string()
		.regex(/^\d+$/, 'ID deve conter apenas números')
		.transform(Number)
		.refine(val => val > 0, 'ID deve ser maior que zero')
})

export type FriendRequestInput = z.infer<typeof FriendRequestSchema>
export type FriendResponseInput = z.infer<typeof FriendResponseSchema>
export type UserIDSchemaInput = z.infer<typeof UserIDSchema>
