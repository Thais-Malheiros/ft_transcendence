import { FastifyInstance, FastifyRequest } from 'fastify'

import { PlayerController } from '../database/controllers/player.controller'
import { nickSchema, UpdateNickInput } from '../schemas/common.schemas'
import { updateNickRouteSchema } from '../schemas/swagger/users.schemas'
import { AuthService } from '../services/authServices'

export async function usersRoutes(app: FastifyInstance) {

    // --- ATUALIZAR NICK ---
    app.patch('/me', {
        onRequest: [app.authenticate],
        schema: updateNickRouteSchema,
        preHandler: app.validateBody(nickSchema)
    }, async (req: FastifyRequest, reply) => {
        const { nick } = req.body as UpdateNickInput

        const user = await PlayerController.findById(req.user.id)
        if (!user) return reply.code(404).send({ error: 'Usuário não encontrado' })

        const existingUser = await PlayerController.findByNick(nick)
        if (existingUser && existingUser.id !== user.id) {
            return reply.code(400).send({ error: 'Nick já em uso' })
        }

        const updatedUser = await PlayerController.update(user.id, { nick })

        // Garante a tipagem para o JWT
        const userGang = updatedUser.gang as 'potatoes' | 'tomatoes';

        const token = app.jwt.sign({
            id: updatedUser.id,
            email: updatedUser.email,
            nick: updatedUser.nick,
            isAnonymous: updatedUser.isAnonymous,
            gang: userGang
        })

        return reply.code(200).send({
            message: 'Nick atualizado com sucesso',
            // Usa o sanitizePlayer atualizado que criamos acima
            user: AuthService.sanitizePlayer(updatedUser),
            token: token
        })
    })

    // --- ATUALIZAR AVATAR ---
    app.patch('/me/avatar', {
        onRequest: [app.authenticate],
        // Descomente se tiver validação schemas
        // schema: updateAvatarRouteSchema,
    }, async (req: FastifyRequest, reply) => {
        const { avatarId } = req.body as { avatarId: string }

        const user = await PlayerController.findById(req.user.id)
        if (!user) return reply.code(404).send({ error: 'Usuário não encontrado' })

        // Atualiza no banco
        const updatedUser = await PlayerController.update(user.id, { avatar: avatarId })

        // Retorna o usuário limpo (COM o avatar novo)
        return reply.code(200).send({
            message: 'Avatar atualizado com sucesso',
            user: AuthService.sanitizePlayer(updatedUser)
        })
    })

    // --- ROTA ME (Chamada no refresh da página) ---
    app.get('/me', {
        onRequest: [app.authenticate],
    }, async (req: FastifyRequest, reply) => {
        const player = await PlayerController.findById(req.user.id)

        if (!player) return reply.code(404).send({ error: 'Usuário não encontrado' })

        // NÃO converta para 'as User'. Use o player direto.
        return reply.send({
            user: AuthService.sanitizePlayer(player),
            profile: {
                avatar: player.avatar || null,
                score: player.score || 0,
            }
        })
    })
}
